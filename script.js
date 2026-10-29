'use strict';

// The homepage intro is decorative, short, and never blocks interaction.
const introScreen = document.querySelector('.intro-screen');
if (introScreen && document.documentElement.classList.contains('show-intro')) {
  let introTimer;
  const dismissIntro = () => {
    document.documentElement.classList.remove('show-intro');
    introScreen.remove();
    window.clearTimeout(introTimer);
    window.removeEventListener('pointerdown', dismissIntro, true);
    window.removeEventListener('keydown', dismissIntro, true);
  };
  window.addEventListener('pointerdown', dismissIntro, {capture:true,once:true});
  window.addEventListener('keydown', dismissIntro, {capture:true,once:true});
  introTimer = window.setTimeout(dismissIntro, 1500);
}

const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');
function closeMenu() {
  if (!menuToggle || !primaryNav) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.querySelector('.sr-only').textContent = 'Open navigation';
  primaryNav.classList.remove('open');
}
menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.querySelector('.sr-only').textContent = open ? 'Close navigation' : 'Open navigation';
  primaryNav.classList.toggle('open', open);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') {
    closeMenu(); menuToggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
primaryNav?.querySelectorAll('a').forEach(anchor => anchor.addEventListener('click', closeMenu));
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);

const searchInput = document.getElementById('resource-search');
const resourceCards = [...document.querySelectorAll('.resource-card')];
const resourceFilters = [...document.querySelectorAll('[data-filter]')];
let activeFilter = 'all';
function filterResources() {
  const words = (searchInput?.value || '').trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  let visible = 0;
  resourceCards.forEach(card => {
    card.hidden = !((activeFilter === 'all' || card.dataset.category === activeFilter) && words.every(word => card.dataset.search.includes(word)));
    if (!card.hidden) visible++;
  });
  const counter = document.getElementById('resource-count');
  if (counter) counter.textContent = `${visible} helpful starting point${visible === 1 ? '' : 's'}`;
  const empty = document.getElementById('resource-empty');
  if (empty) empty.hidden = visible !== 0;
}
resourceFilters.forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  resourceFilters.forEach(filter => { filter.classList.toggle('active', filter === button); filter.setAttribute('aria-pressed', String(filter === button)); });
  filterResources();
}));
searchInput?.addEventListener('input', filterResources);
document.getElementById('reset-resources')?.addEventListener('click', () => {
  searchInput.value = ''; resourceFilters.find(button => button.dataset.filter === 'all').click(); searchInput.focus();
});

const housingNeeds = {
  shelter: {title:'Start with local shelter and housing resources.',copy:'Call 211 to ask about help in your area, or use HUD’s Find Shelter tool to search by location. Availability and intake requirements vary by provider.',links:[['https://www.hud.gov/findshelter','Find shelter'],['tel:211','Call 211']]},
  expenses: {title:'Ask about resources to help you stay housed.',copy:'Your local 211 service can help you look for rent, utility, and other assistance. Ask the provider about current funding, its service area, and the steps to apply. If you have an eviction deadline, seek legal help promptly.',links:[['https://211.org/','Find local assistance'],['/resources/?category=legal','Explore legal help']]},
  planning: {title:'Build a starting point for longer-term stability.',copy:'Explore housing and community services near you, then contact providers to understand their application process. Benefits, food resources, and employment support may also help as you plan your next step.',links:[['/resources/?category=housing','Explore housing resources'],['/resources/','Browse all resources']]}
};
document.querySelectorAll('[data-need]').forEach(button => button.addEventListener('click', () => {
  const need = housingNeeds[button.dataset.need];
  document.querySelectorAll('[data-need]').forEach(option => { option.classList.toggle('active', option === button); option.setAttribute('aria-pressed', String(option === button)); });
  document.getElementById('need-title').textContent = need.title;
  document.getElementById('need-copy').textContent = need.copy;
  const links = document.getElementById('need-links'); links.replaceChildren();
  need.links.forEach(([url,label],index) => {
    const anchor = document.createElement('a'); anchor.href=url; anchor.className=`button ${index ? 'button-outline' : 'button-purple'}`; anchor.textContent=label;
    if (url.startsWith('https:')) { anchor.target='_blank'; anchor.rel='noopener noreferrer'; const sr=document.createElement('span'); sr.className='sr-only'; sr.textContent=' (opens in a new tab)'; anchor.append(sr); }
    links.append(anchor);
  });
}));

// Amounts are a planning aid. No payment or pledge is simulated or submitted.
let giftAmount=50;
let giftFrequency='one-time';
const customAmount=document.getElementById('custom-amount');
const giftSummary=document.getElementById('gift-summary');
const amountButtons=[...document.querySelectorAll('[data-amount]')];
function updateGiftSummary() {
  if (!giftSummary) return;
  if (!Number.isFinite(giftAmount) || giftAmount<1 || giftAmount>100000 || !Number.isInteger(giftAmount)) { giftSummary.textContent='Please choose a whole-dollar amount from $1 to $100,000.'; customAmount?.setAttribute('aria-invalid','true'); return; }
  customAmount?.removeAttribute('aria-invalid');
  const amount=new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(giftAmount);
  giftSummary.textContent=`Your gift: ${amount} · ${giftFrequency==='monthly' ? 'each month' : 'one time'}`;
}
amountButtons.forEach(button => button.addEventListener('click',() => {
  giftAmount=Number(button.dataset.amount); customAmount.value='';
  amountButtons.forEach(option => { option.classList.toggle('active',option===button); option.setAttribute('aria-pressed',String(option===button)); }); updateGiftSummary();
}));
customAmount?.addEventListener('input',() => { giftAmount=Number(customAmount.value); amountButtons.forEach(button => {button.classList.remove('active');button.setAttribute('aria-pressed','false');});updateGiftSummary(); });
document.querySelectorAll('[data-frequency]').forEach(button => button.addEventListener('click',() => {
  giftFrequency=button.dataset.frequency;
  document.querySelectorAll('[data-frequency]').forEach(option => {option.classList.toggle('active',option===button);option.setAttribute('aria-pressed',String(option===button));});updateGiftSummary();
}));
const requestedCategory=new URLSearchParams(location.search).get('category');
if(requestedCategory && resourceFilters.length) resourceFilters.find(button => button.dataset.filter===requestedCategory)?.click();
