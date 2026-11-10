/**
 * ThocKeebs Universal Theme & Navigation Engine
 * 1. Defaults to: 'light' mode
 * 2. Clean URLs: Cleans /index.html and .html from address bar without reload
 */
(function () {
  'use strict';

  // --- CLEAN URL MANAGER ---
  // Menghilangkan /index.html dan ekstensi .html dari address bar browser tanpa reload
  if (typeof window !== 'undefined' && window.location && window.history && window.history.replaceState) {
    try {
      if (window.location.protocol.startsWith('http')) {
        var path = window.location.pathname;
        if (path === '/index.html' || path.endsWith('/index.html')) {
          var cleanPath = path.replace(/\/index\.html$/, '') || '/';
          window.history.replaceState(null, '', cleanPath + window.location.search + window.location.hash);
        } else if (path.endsWith('.html')) {
          var cleanPath = path.slice(0, -5);
          window.history.replaceState(null, '', cleanPath + window.location.search + window.location.hash);
        }
      }
    } catch (e) {}
  }

  // --- THEME ENGINE ---
  function applyTheme(theme) {
    var isLight = theme === 'light';
    if (isLight) {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
      if (document.body) {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
        document.body.setAttribute('toggle-theme', 'light');
        document.body.setAttribute('data-theme', 'light');
      }
      document.documentElement.setAttribute('toggle-theme', 'light');
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
      if (document.body) {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        document.body.setAttribute('toggle-theme', 'dark');
        document.body.setAttribute('data-theme', 'dark');
      }
      document.documentElement.setAttribute('toggle-theme', 'dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    var buttons = document.querySelectorAll('button[aria-pressed], [data-framer-name="Theme Toggle"] button, .framer-mlk3nv button, .framer-pp1166 button, .framer-1qp33iv-container button, .framer-1afh5j9-container button, .theme-toggle-btn');
    buttons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
      btn.style.background = isLight ? '#252526' : 'rgb(60, 60, 61)';
      var knob = btn.querySelector('span') || btn.querySelector('.theme-toggle-knob');
      if (knob) {
        knob.style.left = isLight ? '18px' : '2px';
        knob.style.background = '#FFFFFF';
      }
    });
  }

  // One-time migration so existing visitors whose browser cached old default 'dark' now get 'light'
  if (!localStorage.getItem('thoc_theme_migrated_light_v1')) {
    localStorage.setItem('thockeebs-theme', 'light');
    localStorage.setItem('thoc_theme_migrated_light_v1', 'true');
  }

  // DEFAULT: 'light'
  var savedTheme = localStorage.getItem('thockeebs-theme') || 'light';
  applyTheme(savedTheme);

  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(localStorage.getItem('thockeebs-theme') || 'light');
  });

  // Global click listener for all theme toggle buttons
  document.addEventListener('click', function (e) {
    var toggleBtn = e.target.closest('[data-framer-name="Theme Toggle"], .framer-mlk3nv, .framer-pp1166, .framer-1qp33iv-container, .framer-1afh5j9-container, button[aria-pressed], .theme-toggle-btn');
    if (toggleBtn) {
      e.preventDefault();
      e.stopPropagation();
      var isCurrentLight = document.documentElement.classList.contains('light-theme') || (document.body && document.body.classList.contains('light-theme'));
      var next = isCurrentLight ? 'dark' : 'light';
      localStorage.setItem('thockeebs-theme', next);
      applyTheme(next);
    }
  }, true);

  window.ThocTheme = {
    applyTheme: applyTheme,
    getTheme: function () {
      return localStorage.getItem('thockeebs-theme') || 'light';
    }
  };
})();
