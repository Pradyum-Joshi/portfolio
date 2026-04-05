/* ============================================================
   script.js — Pradyum Joshi Portfolio
   Features:
     1. Navbar scroll shadow
     2. Mobile hamburger menu
     3. Typing animation (hero terminal)
     4. Scroll-reveal for cards
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initTyping();
  initScrollReveal();
});

/* ────────────────────────────────────────────────────────────
   1. NAVBAR – add .scrolled shadow when page is scrolled
   ──────────────────────────────────────────────────────────── */
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ────────────────────────────────────────────────────────────
   2. MOBILE MENU – hamburger open / close
   ──────────────────────────────────────────────────────────── */
function initMobileMenu() {
  const btn   = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.querySelector('i').className = open ? 'fas fa-times' : 'fas fa-bars';
    btn.setAttribute('aria-expanded', String(open));
  });

  // Close on any nav link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      btn.querySelector('i').className = 'fas fa-bars';
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ────────────────────────────────────────────────────────────
   3. TYPING ANIMATION – cycles through commands in the terminal
   ──────────────────────────────────────────────────────────── */
function initTyping() {
  const el = document.getElementById('typedText');
  if (!el) return;

  const phrases = [
    'nmap -sV target.local',
    'burpsuite --project portfolio',
    'python3 phish_sim.py',
    'sqlmap -u "target/login"',
    'msfconsole',
  ];

  let pi = 0, ci = 0, deleting = false;

  const TSPD = 75;   // typing ms/char
  const DSPD = 40;   // deleting ms/char
  const HOLD = 1800; // pause before delete
  const GAP  = 350;  // pause before typing next

  function tick() {
    const phrase = phrases[pi];

    if (deleting) {
      ci--;
      el.textContent = phrase.slice(0, ci);
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
        setTimeout(tick, GAP);
        return;
      }
      setTimeout(tick, DSPD);
    } else {
      ci++;
      el.textContent = phrase.slice(0, ci);
      if (ci === phrase.length) {
        deleting = true;
        setTimeout(tick, HOLD);
        return;
      }
      setTimeout(tick, TSPD);
    }
  }

  setTimeout(tick, 800); // initial delay
}

/* ────────────────────────────────────────────────────────────
   4. SCROLL REVEAL – fade/slide-up cards as they enter viewport
   ──────────────────────────────────────────────────────────── */
function initScrollReveal() {
  const items = document.querySelectorAll(
    '.skill-card, .proj-card, .lab-card, .cert-card, .contact-card, .tl-item, .stat-box, .edu-card'
  );
  if (!items.length) return;

  // Apply initial hidden state
  items.forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(22px)';
    // Stagger delay by position within its row (mod 4)
    const delay = (i % 4) * 80;
    el.style.transition = `opacity 0.45s ease ${delay}ms, transform 0.45s ease ${delay}ms`;
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity   = '1';
          e.target.style.transform = 'translateY(0)';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    items.forEach(el => io.observe(el));
  } else {
    // Fallback for old browsers
    items.forEach(el => {
      el.style.opacity   = '1';
      el.style.transform = 'translateY(0)';
    });
  }
}
