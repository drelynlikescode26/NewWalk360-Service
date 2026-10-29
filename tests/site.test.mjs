import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { parseHTML } from 'linkedom';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const routes = ['/', '/about/', '/programs/', '/get-help/', '/get-involved/', '/housing-assistance/', '/resources/', '/donate/', '/contact/', '/privacy/', '/404.html'];
const filename = path => resolve(root, path === '/' ? 'index.html' : path.replace(/^\//, '') + (path.endsWith('/') ? 'index.html' : ''));
const source = await readFile(resolve(root, 'script.js'), 'utf8');
async function page(route) {
  const html = await readFile(filename(route.split('?')[0]), 'utf8');
  const { document, window } = parseHTML(html);
  const context = vm.createContext({document, window: {matchMedia: () => ({addEventListener(){}})}, location: new URL(route, 'http://localhost'), URLSearchParams, Intl, console});
  vm.runInContext(source, context);
  return {document, window};
}

test('All pages have a usable structure, local assets, and resolvable internal links', async () => {
  for (const route of routes) {
    const {document} = await page(route);
    assert.equal(document.querySelectorAll('main h1').length, 1, `${route}: one main heading`);
    assert.ok(document.querySelector('title')?.textContent.includes('New Walk 360'));
    assert.ok(document.querySelector('meta[name="description"]')?.getAttribute('content'));
    assert.ok(document.querySelector('a[href="#main"]'));
    const ids = [...document.querySelectorAll('[id]')].map(el => el.id);
    assert.equal(new Set(ids).size, ids.length, `${route}: unique IDs`);
    for (const img of document.querySelectorAll('img')) {
      assert.ok(img.hasAttribute('alt'), `${route}: image alt attribute`);
      assert.ok(img.getAttribute('alt') || img.closest('[aria-hidden="true"]'), `${route}: informative image text or decorative image`);
      assert.ok((await stat(resolve(root, img.getAttribute('src').slice(1)))).size > 0);
    }
    for (const el of document.querySelectorAll('[href],script[src]')) {
      const url = el.getAttribute('href') || el.getAttribute('src');
      if (url.startsWith('https://')) {
        if (el.tagName === 'A' && el.getAttribute('target') === '_blank') assert.ok(el.getAttribute('rel').includes('noopener'));
        continue;
      }
      if (/^(tel:|mailto:)/.test(url)) continue;
      const dest = new URL(url, `http://localhost${route}`);
      const path = dest.pathname;
      const file = filename(path);
      assert.ok((await stat(file)).isFile(), `${route}: ${url}`);
      if (dest.hash) {
        const target = parseHTML(await readFile(file, 'utf8')).document;
        assert.ok(target.getElementById(dest.hash.slice(1)), `${route}: fragment ${url}`);
      }
    }
  }
});

test('Resource search, category intersections, reset, and deep links', async () => {
  const {document, window} = await page('/resources/');
  const cards = () => [...document.querySelectorAll('.resource-card')].filter(card => !card.hidden);
  const search = document.getElementById('resource-search');
  assert.equal(cards().length, 13);
  document.querySelector('[data-filter="housing"]').click();
  assert.equal(cards().length, 1);
  search.value = 'SNAP'; search.dispatchEvent(new window.Event('input'));
  assert.equal(cards().length, 0);
  assert.equal(document.getElementById('resource-empty').hidden, false);
  document.querySelector('[data-filter="all"]').click();
  assert.equal(cards().length, 2); // SNAP is also mentioned in the Gateway listing.
  document.querySelector('[data-filter="food"]').click();
  assert.equal(cards().length, 1);
  assert.ok(cards()[0].textContent.includes('Georgia SNAP'));
  document.getElementById('reset-resources').click();
  assert.equal(cards().length, 13);
  const deepLink = await page('/resources/?category=legal');
  assert.equal([...deepLink.document.querySelectorAll('.resource-card')].filter(card => !card.hidden).length, 1);
  assert.equal(deepLink.document.querySelector('[data-filter="legal"]').getAttribute('aria-pressed'), 'true');
});

test('Housing selections give appropriate next steps and clear selected states', async () => {
  const {document} = await page('/housing-assistance/');
  for (const type of ['expenses', 'planning', 'shelter']) {
    document.querySelector(`[data-need="${type}"]`).click();
    assert.equal(document.querySelectorAll('[data-need][aria-pressed="true"]').length, 1);
    assert.equal(document.querySelector('[data-need][aria-pressed="true"]').dataset.need, type);
    assert.equal(document.querySelectorAll('#need-links a').length, 2);
  }
  document.querySelector('[data-need="expenses"]').click();
  assert.ok(document.getElementById('need-title').textContent.includes('stay housed'));
  assert.ok(document.querySelector('#need-links a[href="/resources/?category=legal"]'));
});

test('Giving selections, custom amounts, and invalid input do not fake a transaction', async () => {
  const {document, window} = await page('/donate/');
  const summary = document.getElementById('gift-summary');
  document.querySelector('[data-amount="250"]').click();
  assert.ok(summary.textContent.includes('$250'));
  document.querySelector('[data-frequency="monthly"]').click();
  assert.ok(summary.textContent.includes('each month'));
  const custom = document.getElementById('custom-amount');
  custom.value = '75'; custom.dispatchEvent(new window.Event('input'));
  assert.ok(summary.textContent.includes('$75'));
  assert.equal(document.querySelectorAll('[data-amount][aria-pressed="true"]').length, 0);
  custom.value = '-5'; custom.dispatchEvent(new window.Event('input'));
  assert.equal(custom.getAttribute('aria-invalid'), 'true');
  assert.ok(summary.textContent.includes('Please choose'));
  document.querySelector('[data-amount="50"]').click();
  assert.equal(custom.hasAttribute('aria-invalid'), false);
  assert.ok(summary.textContent.includes('$50'));
  assert.equal(document.querySelectorAll('input[type="password"],input[autocomplete="cc-number"],form').length, 0);
});

test('Mobile navigation opens, closes on Escape, and exposes the current state', async () => {
  const {document, window} = await page('/');
  const toggle = document.querySelector('.menu-toggle');
  toggle.click();
  assert.equal(toggle.getAttribute('aria-expanded'), 'true');
  assert.equal(document.querySelector('.primary-nav').classList.contains('open'), true);
  const escape = new window.Event('keydown'); escape.key = 'Escape'; document.dispatchEvent(escape);
  assert.equal(toggle.getAttribute('aria-expanded'), 'false');
  assert.equal(document.querySelector('.primary-nav').classList.contains('open'), false);
});

test('The circle intro runs only on a first homepage visit and honors reduced motion', async () => {
  const html = await readFile(filename('/'), 'utf8');
  const {document} = parseHTML(html);
  const startup = [...document.querySelectorAll('head script:not([src])')].find(script => script.textContent.includes('nw360-intro-seen')).textContent;
  const memory = new Map();
  const storage = {getItem: key => memory.get(key), setItem: (key,value) => memory.set(key,value)};
  const runStartup = (reduced=false, sessionStorage=storage) => {
    const {document} = parseHTML(html);
    vm.runInNewContext(startup, {document, window:{matchMedia:()=>({matches:reduced})}, sessionStorage});
    return document.documentElement.classList.contains('show-intro');
  };
  assert.equal(runStartup(), true);
  assert.equal(runStartup(), false);
  memory.clear();
  assert.equal(runStartup(true), false);
  assert.equal(memory.size, 0);
  assert.equal(runStartup(false, {getItem(){throw new Error('Storage unavailable')}}), true);
  const inner = await page('/resources/');
  assert.equal(inner.document.querySelector('.intro-screen'), null);
});

test('Every page keeps Get Help and Donate outside the collapsible menu', async () => {
  for (const route of routes) {
    const {document}=await page(route);
    for (const href of ['/get-help/','/donate/']) {
      const action=document.querySelector('.nav-actions a[href="'+href+'"]');
      assert.ok(action, route+': visible primary action '+href);
      assert.equal(action.closest('.primary-nav'),null);
    }
  }
});

test('All four programs remain in the draft with unconfirmed availability', async () => {
  const {document}=await page('/programs/');
  for(const id of ['housing','essentials','emergency','support']) {
    const program=document.getElementById(id);
    assert.ok(program);
    assert.equal(program.querySelector('[data-program-status]').dataset.programStatus,'unconfirmed');
    assert.match(program.textContent,/not an open application/);
  }
  assert.match(document.getElementById('emergency').textContent,/Subject to eligibility and available funding/);
  assert.match(document.getElementById('support').textContent,/resources and referrals/);
  const home=await page('/');
  assert.equal(home.document.querySelectorAll('.four-programs .program-card').length,4);
});

test('The directory covers every requested category with an independent next step', async () => {
  const {document}=await page('/resources/');
  for(const category of ['housing','wellbeing','disability','food','expenses','healthcare','employment','shelter']) {
    assert.ok(document.querySelector('[data-filter="'+category+'"]'));
    assert.ok(document.querySelector('.resource-card[data-category="'+category+'"]'));
  }
  for(const card of document.querySelectorAll('.resource-card')) {
    assert.ok(card.querySelector('.resource-eligibility'));
    assert.ok(card.querySelector('.resource-links a[href^="https://"]'));
  }
});

test('Unconnected intake, donations, and newsletter do not collect information or claim success', async () => {
  for(const route of routes) {
    const {document}=await page(route);
    assert.equal(document.querySelectorAll('form,input[type="email"],input[type="file"],input[autocomplete="cc-number"]').length,0);
    assert.ok(document.querySelector('.draft-banner'));
    assert.match(document.querySelector('meta[name="robots"]').getAttribute('content'),/noindex/);
  }
  const help=await page('/get-help/');
  assert.equal(help.document.querySelectorAll('.connection-status').length,2);
  const donate=await page('/donate/');
  assert.match(donate.document.querySelector('.giving-status').textContent,/No payment is collected/);
  assert.ok(donate.document.getElementById('donate-items'));
});

test('Resource videos embed all three supplied IDs with accessible players and fallback links', async () => {
  const {document}=await page('/resources/');
  const section=document.getElementById('video-resources');
  assert.ok(section);
  assert.equal(section.querySelectorAll('iframe').length,3);
  for(const id of ['tEx9Jg-_-0o','uHUpVQ-ziFM','qUEuti4ne3E']) {
    const card=section.querySelector('[data-video-id="'+id+'"]');
    assert.ok(card);
    const frame=card.querySelector('iframe');
    const url=new URL(frame.getAttribute('src'));
    assert.equal(url.hostname,'www.youtube-nocookie.com');
    assert.equal(url.pathname,'/embed/'+id);
    assert.equal(url.searchParams.get('autoplay'),'0');
    assert.equal(url.searchParams.get('playsinline'),'1');
    assert.equal(frame.getAttribute('loading'),'lazy');
    assert.equal(frame.getAttribute('referrerpolicy'),'strict-origin-when-cross-origin');
    assert.ok(frame.getAttribute('title'));
    assert.ok(frame.hasAttribute('allowfullscreen'));
    assert.ok(card.querySelector('a[href="https://www.youtube.com/watch?v='+id+'"]'));
  }
  assert.ok(document.querySelector('nav a[href="#video-resources"]'));
  const privacy=await page('/privacy/');
  assert.match(privacy.document.querySelector('main').textContent,/Loading or playing a video connects to YouTube/);
});
