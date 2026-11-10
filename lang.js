/**
 * ThocKeebs - Internationalization & Language Switch Engine
 * Supports: EN (English) & ID (Bahasa Indonesia)
 * Keeps authentic mechanical keyboard terminology: Switch, Keycaps, Stabilizer, Lube, Modding, Thock, etc.
 */

(function() {
  'use strict';

  var DICTIONARY = {
    // --- Navigation & Common ---
    'nav.home': { en: 'Home', id: 'Home' },
    'nav.works': { en: 'Works', id: 'Works' },
    'nav.order': { en: 'Order', id: 'Order' },
    'nav.about': { en: 'About', id: 'About' },
    'nav.location': { en: 'Bandung, Indonesia.', id: 'Bandung, Indonesia.' },

    // --- Footer ---
    'footer.info': { en: 'Info', id: 'Info' },
    'footer.social': { en: 'Social', id: 'Social' },
    'footer.rights': { en: 'ALL RIGHTS RESERVED © 2026 THOCKEEBS', id: 'ALL RIGHTS RESERVED © 2026 THOCKEEBS' },

    // --- Index (Home) ---
    'home.hero.subtitle': { en: 'Mechanical keyboards & keycaps design', id: 'Mechanical keyboards & keycaps design' },
    'home.hero.scroll': { en: 'Scroll down', id: 'Scroll ke bawah' },
    'home.intro.badge': { en: 'About me', id: 'Tentang kami' },
    'home.intro.p1': {
      en: 'Based in Bandung, Indonesia, ThocKeebs is a dedicated mechanical keyboard tuning studio specializing in precision switch lubrication and stabilizer tuning using Krytox to deliver buttery-smooth keystrokes, eliminate rattle, and unlock the deepest acoustic thock for every build.',
      id: 'Berbasis di Bandung, Indonesia, ThocKeebs adalah studio tuning mechanical keyboard berdedikasi yang berspesialisasi dalam pelumasan switch presisi dan tuning stabilizer menggunakan Krytox untuk menghadirkan ketukan buttery-smooth, menghilangkan rattle, serta membuka deep acoustic thock maksimal pada setiap build.'
    },
    'home.intro.p2': {
      en: 'Ever since our journey began, we have been obsessed with the mechanical keyboard hobby—dissecting switch acoustics, leaf ping, spring crunch, and stabilizer wobble to achieve the cleanest keystroke profile possible.',
      id: 'Sejak awal perjalanan, kami memiliki dedikasi mendalam pada hobi mechanical keyboard—membedah akustik switch, leaf ping, spring crunch, hingga stabilizer wobble demi mencapai profil ketukan paling bersih dan konsisten.'
    },
    'home.intro.p3': {
      en: 'We specialize exclusively in precision switch lubing and stabilizer tuning using genuine Krytox. Every switch is carefully disassembled, ultrasonically cleaned if needed, and hand-brushed with an exact coat of Krytox on stem rails, sliders, and spring contacts for unmatched consistency.',
      id: 'Kami berfokus pada pelumasan switch presisi dan tuning stabilizer menggunakan Krytox original. Setiap switch dibongkar teliti, dibersihkan secara ultrasonik bila diperlukan, dan dilumasi manual dengan kuas presisi pada stem rails, sliders, serta kontak spring untuk konsistensi tanpa kompromi.'
    },
    'home.intro.p4': {
      en: 'Our stabilizer tuning eliminates wire ticking, rattle, and hollow bottom-out sounds through meticulous wire balancing, stem clipping, holee modding, and specialized Krytox application, turning everyday typing into a deeply satisfying sensory experience.',
      id: 'Tuning stabilizer kami mengeliminasi wire ticking, rattle, dan suara hollow melalui wire balancing presisi di atas permukaan keramik, stem clipping, holee modding, serta aplikasi Krytox khusus, mengubah setiap ketukan harian menjadi pengalaman sensorik yang memuaskan.'
    },
    'home.intro.p5': {
      en: 'Beyond switch and stabilizer modding, we build custom keyboards, install acoustic foams and dampeners, and provide tailored sound profile optimization for keyboard enthusiasts across the world.',
      id: 'Selain modding switch dan stabilizer, kami melayani perakitan custom keyboard, pemasangan poron/acoustic foam dampener, serta optimasi sound profile khusus bagi para antusias keyboard di Indonesia maupun dunia.'
    },
    'home.intro.p6': {
      en: 'Whether you need switches tuned for competitive gaming, marathon coding, or an acoustically perfect workspace, ThocKeebs is committed to elevating your typing experience to its highest potential.',
      id: 'Baik untuk kebutuhan gaming kompetitif, sesi coding maraton, maupun setup workspace impian dengan akustik sempurna, ThocKeebs berkomitmen membawa pengalaman mengetik Anda ke level tertinggi.'
    },
    'home.works.heading': { en: 'Selected works', id: 'Selected works' },
    'home.works.viewall': { en: 'View all', id: 'Lihat semua' },

    // --- Works Project Cards Metadata ---
    'works.meta.year': { en: 'YEAR', id: 'TAHUN' },
    'works.meta.type': { en: 'TYPE', id: 'TIPE' },
    'works.meta.status': { en: 'STATUS', id: 'STATUS' },
    'works.meta.finished': { en: 'FINISHED', id: 'SELESAI' },
    'works.col.name': { en: 'Project Name', id: 'Project Name' },
    'works.col.status': { en: 'Status', id: 'Status' },
    'works.col.date': { en: 'Date', id: 'Date' },
    'works.modal.specs_label': { en: 'TUNING SPECIFICATIONS & BUILD DETAIL', id: 'SPESIFIKASI TUNING & DETAIL BUILD' },
    'works.modal.wa_btn': { en: 'Consult This Build via WhatsApp →', id: 'Konsultasi Build Ini via WhatsApp →' },

    // --- Order Page ---
    'order.hero.title': { en: 'Order Tuning & Modding', id: 'Order Tuning & Modding' },
    'order.hero.subtitle': {
      en: 'Configure your switch count, Krytox lube package, and keyboard modding options. Estimated cost and turnaround time calculated in real-time.',
      id: 'Tentukan jumlah switch, paket pelumas Krytox, dan opsi modifikasi keyboard Anda. Estimasi biaya serta turnaround time terhitung otomatis secara realtime.'
    },
    'order.batch.badge': { en: '• BATCH #14 • PRE-ORDER OPEN', id: '• BATCH #14 • PRE-ORDER OPEN' },
    'order.step1.title': { en: 'Keyboard Switch Count', id: 'Jumlah Switch Keyboard' },
    'order.step1.desc': { en: 'Choose your keyboard layout preset or adjust the switch count slider below.', id: 'Pilih preset layout keyboard Anda atau atur slider jumlah switch di bawah ini.' },
    'order.step1.sliderlabel': { en: 'Switch Count:', id: 'Jumlah Switch:' },

    'order.step2.title': { en: 'Select Switch Lube Package', id: 'Pilih Paket Lube Switch' },
    'order.step2.desc': { en: 'Every switch is meticulously disassembled, ultrasonically cleaned, and brush-lubricated with precision.', id: 'Setiap switch dibongkar teliti, dibersihkan ultrasonic, dan dilumasi presisi dengan kuas.' },
    'order.step2.pkgtitle': { en: 'Standard Lube', id: 'Lube Standar' },
    'order.step2.pkgdesc': { en: 'Stem sliders, bottom housing rails, and spring bag-lubing using Krytox 205g0 & GPL 105.', id: 'Stem slider, bottom housing rails, dan spring bag-lubing dengan Krytox 205g0 & GPL 105.' },

    'order.step3.title': { en: 'Lube Formula Selection', id: 'Pilihan Formula Lube' },
    'order.step3.desc': { en: 'Choose your preferred acoustic profile and keypress feel.', id: 'Pilih karakter akustik dan feel ketukan yang Anda inginkan.' },
    'order.step3.opt1': { en: 'Krytox GPL 205g0 + GPL 105 (Recommended — Deep Acoustic Thock)', id: 'Krytox GPL 205g0 + GPL 105 (Rekomendasi — Deep Acoustic Thock)' },
    'order.step3.opt2': { en: 'Krytox GPL 205g0 Full (Stem, Housing & Spring)', id: 'Krytox GPL 205g0 Full (Stem, Housing & Spring)' },
    'order.step3.opt3': { en: 'Krytox GPL 105 (Oil Lubing)', id: 'Krytox GPL 105 (Oil Lubing)' },

    'order.step4.title': { en: 'Keyboard Stabilizer Tuning', id: 'Tuning Stabilizer Keyboard' },
    'order.step4.desc': { en: 'Precision wire balancing on ceramic surface, clipping, and rattle-free dampening.', id: 'Wire balancing presisi di atas ceramic surface, clipping, dan rattle-free dampening.' },
    'order.step4.plate.desc': { en: '1 Board Fullset (Wire balancing, stem clipping, housing lube Krytox 205g0 + XHT-BDZ wire).', id: '1 Board Fullset (Wire balancing, stem clipping, housing lube Krytox 205g0 + XHT-BDZ wire).' },
    'order.step4.none.title': { en: 'No Stabilizer Tuning', id: 'Tanpa Stabilizer' },
    'order.step4.none.desc': { en: 'Send loose switches only without keyboard board or stabilizers.', id: 'Hanya kirim switch lepasan tanpa board atau stabilizer keyboard.' },

    'order.step5.title': { en: 'Extra Modding (Optional)', id: 'Extra Modding (Opsional)' },
    'order.step5.desc': { en: 'Additional acoustic modifications for sound profile and typing feel perfection.', id: 'Modifikasi akustik tambahan untuk kesempurnaan suara dan feeling ketukan.' },
    'order.step5.holee.title': { en: 'Fullset Anti-Rattle Holee Mod', id: 'Holee Mod Anti-Rattle Fullset' },
    'order.step5.holee.desc': { en: 'Adhesive micropore/Teflon strips inside stabilizer stem sliders for rattle-free spacebars.', id: 'Pemasangan micropore/teflon strips di dalam stem slider stabs untuk spacebar bebas rattle.' },

    'order.step6.title': { en: 'Customer & Keyboard Information', id: 'Informasi Pemesan & Keyboard' },
    'order.step6.desc': { en: 'Details for workshop labeling and WhatsApp booking confirmation.', id: 'Data detail untuk pelabelan workshop dan konfirmasi WhatsApp.' },
    'order.step6.name': { en: 'Full Name *', id: 'Nama Lengkap *' },
    'order.step6.phone': { en: 'Active WhatsApp Number *', id: 'Nomor WhatsApp Aktif *' },
    'order.step6.keyboard': { en: 'Keyboard Model', id: 'Tipe Keyboard' },
    'order.step6.switch': { en: 'Switch Brand & Model *', id: 'Merk & Tipe Switch *' },
    'order.step6.notes': { en: 'Acoustic Notes / Custom Request (Optional)', id: 'Catatan Suara / Custom Request (Opsional)' },
    'order.step6.address': { en: 'Return Shipping Address (For shipping estimate)', id: 'Alamat Pengiriman Balik (Untuk estimasi ongkir)' },

    'order.ph.name': { en: 'e.g. Alex Rivera', id: 'Contoh: Dimas Arya' },
    'order.ph.phone': { en: 'e.g. 081234567890', id: 'Contoh: 081234567890' },
    'order.ph.keyboard': { en: 'e.g. Aula F75 / Leobog Hi75 / Zoom75', id: 'Contoh: Aula F75 / Leobog Hi75 / Zoom75' },
    'order.ph.switch': { en: 'e.g. Gateron Milky Yellow / Vertex V1', id: 'Contoh: Gateron Milky Yellow / Vertex V1' },
    'order.ph.notes': { en: 'e.g. Deep thock acoustic profile and rattle-free spacebars', id: 'Contoh: Pengen acoustic profile deep thock dan spacebar empuk zero-rattle' },
    'order.ph.address': { en: 'Street name, District, City, Postal code', id: 'Nama Jalan, Kelurahan, Kecamatan, Kota, Kode Pos' },
    'order.summary.title': { en: 'Order Summary', id: 'Ringkasan Pesanan' },
    'order.summary.total': { en: 'ESTIMATED TOTAL', id: 'TOTAL ESTIMASI' },
    'order.summary.subtext': { en: 'Excludes return shipping', id: 'Belum termasuk ongkir balik' },
    'order.summary.etaStandard': {
      en: 'Switches under 100 pcs completed with precision in <strong>0.5 – 1 Day</strong> according to ThocKeebs catalog.',
      id: 'Switch dibawah 100 pcs selesai teliti dalam <strong>0.5 – 1 Hari</strong> sesuai katalog ThocKeebs.'
    },
    'order.summary.etaBulk': {
      en: 'Switches over 100 pcs completed with precision in <strong>1 – 2 Business Days</strong>.',
      id: 'Switch diatas 100 pcs selesai teliti dalam <strong>1 – 2 Hari Kerja</strong>.'
    },
    'order.summary.cta': { en: 'Submit Booking via WhatsApp', id: 'Kirim Booking via WhatsApp' },
    'order.summary.perk1': { en: 'Free video/sound test before return shipment', id: 'Free video/sound test sebelum dikirim balik' },
    'order.summary.perk2': { en: 'Heavy-duty bubble wrap packaging protection', id: 'Packing ekstra bubble wrap tebal anti rusak' },
    'order.summary.perk3': { en: 'Free acoustic sound profile & switch tuning consultation', id: 'Konsultasi gratis sound profile & switch tuning' },
    'order.summary.chat': { en: 'Prefer to consult first without a form? Chat Admin on WhatsApp ↗', id: 'Mau konsultasi dulu tanpa form? Chat Admin WhatsApp ↗' },

    // --- Works Project Pages ---
    'works.back': { en: '← Back to Works', id: '← Kembali ke Works' },
    'works.specs.heading': { en: 'Tuning Specifications & Build Details', id: 'Tuning Specifications & Build Details' },
    'works.watch': { en: 'Watch Modding on TikTok ↗', id: 'Watch Modding on TikTok ↗' },
    'works.request': { en: 'Request Custom Tuning →', id: 'Booking Custom Tuning →' }
  };

  /**
   * Detect visitor initial language:
   * Defaults to 'id' for visitors in Indonesia (by browser locale or Indonesian timezone).
   * Defaults to 'en' for all visitors outside Indonesia.
   */
  function detectVisitorLanguage() {
    var saved = localStorage.getItem('thockeebs-lang');
    if (saved === 'en' || saved === 'id') {
      return saved;
    }

    var isIndonesian = false;
    try {
      var navLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
      var navLangs = navigator.languages || [];
      if (navLang.startsWith('id') || navLang.startsWith('in')) {
        isIndonesian = true;
      }
      if (!isIndonesian && navLangs.length) {
        for (var i = 0; i < navLangs.length; i++) {
          var l = navLangs[i].toLowerCase();
          if (l.startsWith('id') || l.startsWith('in')) {
            isIndonesian = true;
            break;
          }
        }
      }
      // Check timezone
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (tz.includes('Jakarta') || tz.includes('Makassar') || tz.includes('Jayapura') || tz.includes('Pontianak') || tz.toLowerCase().includes('indonesia')) {
        isIndonesian = true;
      }
    } catch (e) {}

    return isIndonesian ? 'id' : 'en';
  }

  var currentLang = detectVisitorLanguage();

  function applyLanguage(lang) {
    currentLang = (lang === 'id' || lang === 'en') ? lang : 'en';
    localStorage.setItem('thockeebs-lang', currentLang);
    document.documentElement.setAttribute('lang', currentLang);

    // Update active label in button (.lang-current-label)
    var labels = document.querySelectorAll('.lang-current-label');
    labels.forEach(function(el) {
      el.textContent = currentLang.toUpperCase();
    });

    // Update active state in dropdown options
    var optBtns = document.querySelectorAll('.lang-opt-btn');
    optBtns.forEach(function(btn) {
      var btnLang = btn.getAttribute('data-lang');
      if (btnLang === currentLang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Translate all elements with data-i18n
    var transEls = document.querySelectorAll('[data-i18n]');
    transEls.forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      if (DICTIONARY[key] && DICTIONARY[key][currentLang]) {
        el.innerHTML = DICTIONARY[key][currentLang];
      }
    });

    // Translate placeholder attributes
    var phEls = document.querySelectorAll('[data-i18n-ph]');
    phEls.forEach(function(el) {
      var key = el.getAttribute('data-i18n-ph');
      if (DICTIONARY[key] && DICTIONARY[key][currentLang]) {
        el.setAttribute('placeholder', DICTIONARY[key][currentLang]);
      }
    });

    // Dispatch custom event for page-specific reactivities (like order calculator)
    try {
      var ev = new CustomEvent('thockeebs-lang-changed', { detail: { lang: currentLang } });
      document.dispatchEvent(ev);
    } catch (e) {}
  }

  // Toggle Dropdown Menu
  function toggleDropdown(show) {
    var menus = document.querySelectorAll('.lang-dropdown-menu');
    menus.forEach(function(menu) {
      if (typeof show === 'boolean') {
        if (show) menu.classList.add('show');
        else menu.classList.remove('show');
      } else {
        menu.classList.toggle('show');
      }
    });
  }

  // Global Click Handlers
  document.addEventListener('click', function(e) {
    var toggleBtn = e.target.closest('.lang-toggle-btn');
    var optBtn = e.target.closest('.lang-opt-btn');

    if (toggleBtn) {
      e.preventDefault();
      e.stopPropagation();
      toggleDropdown();
      return;
    }

    if (optBtn) {
      e.preventDefault();
      e.stopPropagation();
      var selected = optBtn.getAttribute('data-lang');
      if (selected) {
        applyLanguage(selected);
      }
      toggleDropdown(false);
      return;
    }

    // Close dropdown on outside click
    if (!e.target.closest('.thoc-lang-slot')) {
      toggleDropdown(false);
    }
  });

  // Expose on window
  // ==========================================
  // MOBILE & TABLET FLOATING BOTTOM NAV DOCK
  // ==========================================
  function setupMobileFloatingNav() {
    var origParent = null;
    var origNextSibling = null;

    function checkDock() {
      var isMobile = window.innerWidth <= 1024;
      var dock = document.getElementById('thoc-floating-bottom-dock');
      var pill = document.querySelector('.framer-8qYMR, .thoc-nav-pill, .nav-pill');
      if (!pill) return;

      if (!origParent && pill.parentElement && pill.parentElement.id !== 'thoc-floating-bottom-dock') {
        origParent = pill.parentElement;
        origNextSibling = pill.nextSibling;
      }

      if (isMobile) {
        if (!dock) {
          dock = document.createElement('div');
          dock.id = 'thoc-floating-bottom-dock';
          dock.className = 'thoc-floating-bottom-dock';
          document.body.appendChild(dock);
        }
        if (pill.parentElement !== dock) {
          dock.appendChild(pill);
        }
        var allPills = document.querySelectorAll('.framer-8qYMR, .thoc-nav-pill, .nav-pill');
        allPills.forEach(function(p) {
          if (p.parentElement !== dock) {
            p.style.setProperty('display', 'none', 'important');
          }
        });
      } else {
        if (dock) {
          if (origParent && pill.parentElement === dock) {
            if (origNextSibling) {
              origParent.insertBefore(pill, origNextSibling);
            } else {
              origParent.appendChild(pill);
            }
          }
          dock.remove();
        }
        var allPills = document.querySelectorAll('.framer-8qYMR, .thoc-nav-pill, .nav-pill');
        allPills.forEach(function(p) {
          p.style.removeProperty('display');
        });
      }
    }

    window.addEventListener('resize', checkDock);
    checkDock();
  }

  window.ThocLang = {
    get: function() { return currentLang; },
    set: applyLanguage,
    dict: DICTIONARY
  };

  // Run on initial load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      applyLanguage(currentLang);
      setupMobileFloatingNav();
    });
  } else {
    applyLanguage(currentLang);
  }

})();
