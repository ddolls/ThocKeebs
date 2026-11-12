/**
 * ThocKeebs - Official Web Drivers Navigation & Interactive Dropdown
 * Keyboard Configurators: Leobog Hi75C Pro & Weikav WK75
 * Official Collaboration: Pharita & Mickey Montana
 */

(function () {
  'use strict';

  function initDriversNav() {
    var navItems = document.querySelectorAll('.thoc-drivers-nav-item');

    navItems.forEach(function (item) {
      var btn = item.querySelector('.thoc-drivers-toggle');
      var dropdown = item.querySelector('.thoc-drivers-dropdown');
      if (!btn || !dropdown) return;

      btn.setAttribute('aria-haspopup', 'true');
      btn.setAttribute('aria-expanded', 'false');

      function openMenu() {
        dropdown.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }

      function closeMenu() {
        dropdown.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      }

      function toggleMenu(e) {
        // If clicking on mobile or desktop toggle
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        if (dropdown.classList.contains('is-open')) {
          closeMenu();
        } else {
          // Close other open menus
          document.querySelectorAll('.thoc-drivers-dropdown.is-open').forEach(function (d) {
            d.classList.remove('is-open');
          });
          openMenu();
        }
      }

      btn.addEventListener('click', toggleMenu);

      // Desktop Hover
      item.addEventListener('mouseenter', function () {
        if (window.innerWidth > 1024) {
          openMenu();
        }
      });

      item.addEventListener('mouseleave', function () {
        if (window.innerWidth > 1024) {
          closeMenu();
        }
      });
    });

    // Close when clicking outside
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.thoc-drivers-nav-item')) {
        document.querySelectorAll('.thoc-drivers-dropdown.is-open').forEach(function (d) {
          d.classList.remove('is-open');
          var toggle = d.closest('.thoc-drivers-nav-item')?.querySelector('.thoc-drivers-toggle');
          if (toggle) toggle.setAttribute('aria-expanded', 'false');
        });
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.thoc-drivers-dropdown.is-open').forEach(function (d) {
          d.classList.remove('is-open');
          var toggle = d.closest('.thoc-drivers-nav-item')?.querySelector('.thoc-drivers-toggle');
          if (toggle) toggle.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDriversNav);
  } else {
    initDriversNav();
  }
})();

