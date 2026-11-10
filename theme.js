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

  // --- INJECT GLOBAL TRANSITION & BASE THEME STYLES ---
  (function injectTransitionStyles() {
    if (typeof document === 'undefined') return;
    var styleId = 'thoc-universal-transition-style';
    if (!document.getElementById(styleId)) {
      var style = document.createElement('style');
      style.id = styleId;
      style.textContent = [
        '@view-transition { navigation: auto; }',
        '::view-transition-old(root) { animation: 160ms cubic-bezier(0.4, 0, 0.2, 1) both thocViewFadeOut; }',
        '::view-transition-new(root) { animation: 200ms cubic-bezier(0.0, 0, 0.2, 1) both thocViewFadeIn; }',
        '@keyframes thocViewFadeOut { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(-4px); } }',
        '@keyframes thocViewFadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }',
        'html { background-color: #f0f0f1; }',
        'body { background-color: #f0f0f1; transition: opacity 0.18s cubic-bezier(0.25, 1, 0.5, 1), transform 0.18s cubic-bezier(0.25, 1, 0.5, 1); }',
        'html.dark-theme, body.dark-theme { background-color: #252526 !important; }',
        'html.light-theme, body.light-theme { background-color: #f0f0f1 !important; }',
        'html.light-theme body, body.light-theme {',
        '  --token-a58b3a81-59cc-45f7-ae05-091785ff903e: #ffffff !important;',
        '  --token-9a61cb06-3a3a-4375-8be8-66b9dda45d4e: #18181b !important;',
        '  --token-b3a4db72-7cd5-441a-86c3-f810b7cadc92: #f0f0f1 !important;',
        '  --token-d752c2e3-4387-4d99-8931-9ec888af3ba1: #71717a !important;',
        '  --token-bc378e3e-7ff2-44fd-a6d1-b4984d382cfe: #52525b !important;',
        '  --token-cd0db9f3-e04f-469f-bf1c-a192982ebe5f: #71717a !important;',
        '  --framer-text-color: #18181b !important;',
        '}',
        'body.light-theme .framer-4rjn7p h2, html.light-theme .framer-4rjn7p h2 { color: #18181b !important; }',
        'body.light-theme .framer-82ks48 .framer-text, html.light-theme .framer-82ks48 .framer-text { color: #52525b !important; }',
        'body.light-theme .framer-31ht2t .framer-text, html.light-theme .framer-31ht2t .framer-text { color: #52525b !important; }',
        'body.thoc-page-leaving { opacity: 0 !important; transform: translateY(-4px) !important; pointer-events: none !important; }',
        'body.thoc-page-entering { animation: thocEnterAnim 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards; }',
        '@keyframes thocEnterAnim { 0% { opacity: 0; transform: translateY(6px); } 100% { opacity: 1; transform: translateY(0); } }'
      ].join('\n');
      (document.head || document.documentElement).appendChild(style);
    }
  })();

  // --- PAGE TRANSITION MANAGER ---
  // Intercept local link clicks to animate out before navigation, eliminating black flicker
  function handleLinkClick(e) {
    var link = e.target.closest('a[href]');
    if (!link) return;

    var href = link.getAttribute('href');
    if (!href) return;

    // Ignore anchors on current page, javascript, mailto, tel, target="_blank", or modifier keys
    if (href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    if (link.getAttribute('target') === '_blank' || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

    // Ignore external URLs
    try {
      var targetUrl = new URL(href, window.location.href);
      if (targetUrl.origin !== window.location.origin) return;
      if (targetUrl.pathname === window.location.pathname && targetUrl.search === window.location.search) {
        if (targetUrl.hash) return; // Same page anchor jump
      }
    } catch (err) {
      return;
    }

    // Smooth page exit animation
    e.preventDefault();
    if (document.body) {
      document.body.classList.add('thoc-page-leaving');
    }

    setTimeout(function () {
      window.location.href = href;
    }, 150);
  }

  document.addEventListener('click', handleLinkClick, false);

  // Restore page visibility if user uses browser Back / Forward (bfcache)
  window.addEventListener('pageshow', function (e) {
    if (document.body) {
      document.body.classList.remove('thoc-page-leaving');
      document.body.classList.add('thoc-page-entering');
      setTimeout(function () {
        document.body.classList.remove('thoc-page-entering');
      }, 250);
    }
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
