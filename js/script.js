/* Halo Technologies — haloled.in */
(function () {
  'use strict';

  var WHATSAPP = '917594992523'; // international format, no + or spaces

  /* ── Current year ─────────────────────────────────────── */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Sticky header ────────────────────────────────────── */
  var header = document.getElementById('siteHeader');
  function onScroll() {
    header.classList.toggle('stuck', window.scrollY > 12);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Mobile menu ──────────────────────────────────────── */
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');

  function setMenu(open) {
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  menuBtn.addEventListener('click', function () {
    setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
  });

  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) setMenu(false);
  });

  /* ── Reveal on scroll ─────────────────────────────────── */
  var revealables = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealables.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 70 + 'ms';
      io.observe(el);
    });
  } else {
    revealables.forEach(function (el) { el.classList.add('in'); });
  }

  /* ── Enquiry form → WhatsApp ──────────────────────────── */
  var form = document.getElementById('enquiryForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = form.querySelector('#f-name');
    var phone = form.querySelector('#f-phone');
    var req = form.querySelector('#f-req');
    var msg = form.querySelector('#f-msg');

    var ok = true;
    [name, phone].forEach(function (input) {
      var bad = !input.value.trim();
      input.closest('.field').classList.toggle('invalid', bad);
      if (bad && ok) { input.focus(); ok = false; }
    });
    if (!ok) return;

    var lines = [
      'New enquiry from haloled.in',
      '',
      'Name: ' + name.value.trim(),
      'Phone: ' + phone.value.trim(),
      'Requirement: ' + req.value
    ];
    if (msg.value.trim()) lines.push('Message: ' + msg.value.trim());

    window.open(
      'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(lines.join('\n')),
      '_blank',
      'noopener'
    );
  });

  form.addEventListener('input', function (e) {
    var field = e.target.closest('.field');
    if (field && e.target.value.trim()) field.classList.remove('invalid');
  });

  /* ── Lightbox ─────────────────────────────────────────── */
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbClose = document.getElementById('lbClose');
  var lastFocus = null;

  function openLb(src, alt) {
    lastFocus = document.activeElement;
    lbImg.src = src;
    lbImg.alt = alt || '';
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function closeLb() {
    lb.hidden = true;
    lbImg.src = '';
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll('.shot').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var img = btn.querySelector('img');
      openLb(btn.dataset.full, img ? img.alt : '');
    });
  });

  lbClose.addEventListener('click', closeLb);
  lb.addEventListener('click', function (e) {
    if (e.target === lb) closeLb();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !lb.hidden) closeLb();
  });
})();
