// Nav scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Donate amount selector
const donateImpacts = {
  25: '$25 helps feed a family for a week.',
  50: '$50 provides hygiene kits for 3 families.',
  100: '$100 provides school supplies for 5 students.',
  250: '$250 sponsors a youth in our mentorship program for a month.'
};
document.querySelectorAll('.donate-amt').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.donate-amt').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const amount = btn.dataset.amount;
    document.getElementById('donateImpact').textContent = donateImpacts[amount] || '';
  });
});

// Animate stat counters when in view
const statNums = document.querySelectorAll('.stat-num');
const animateCounters = () => {
  statNums.forEach(num => {
    const target = parseInt(num.dataset.target, 10);
    const current = parseInt(num.textContent, 10);
    if (current < target) {
      const increment = Math.ceil(target / 50);
      const next = Math.min(current + increment, target);
      num.textContent = next;
    }
  });
};

const statsSection = document.querySelector('.section-gold-band');
let statsAnimated = false;
const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !statsAnimated) {
    statsAnimated = true;
    const interval = setInterval(() => {
      animateCounters();
      const allDone = Array.from(statNums).every(
        n => parseInt(n.textContent) >= parseInt(n.dataset.target)
      );
      if (allDone) clearInterval(interval);
    }, 30);
  }
}, { threshold: 0.3 });
if (statsSection) observer.observe(statsSection);

// Contact form
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending...';
  setTimeout(() => {
    document.getElementById('formSuccess').style.display = 'block';
    e.target.reset();
    btn.disabled = false;
    btn.textContent = 'Send Message';
    setTimeout(() => {
      document.getElementById('formSuccess').style.display = 'none';
    }, 5000);
  }, 800);
}

// Smooth active nav link highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) current = section.getAttribute('id');
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--gold-light)' : '';
  });
}, { passive: true });
