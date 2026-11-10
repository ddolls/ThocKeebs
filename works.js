/**
 * ThocKeebs - Dynamic Works List from Google Sheets
 * Otomatis mengambil katalog project dari Google Apps Script API tanpa perlu rebuild/redeploy web.
 */

(function () {
  const API_URL = (typeof THOC_CONFIG !== 'undefined' && THOC_CONFIG.worksSheetApi)
    ? THOC_CONFIG.worksSheetApi
    : "https://script.google.com/macros/s/AKfycby-lUbeLyTLZQyMU4ZRaw0GNdfuHV4SYyg4-4ZBk8_zzmlvVmAIF44M1Ge9ea9LBGFe/exec";

  const CACHE_KEY = "thoc_works_cache_data";

  // Proyek default/fallback jika sheet kosong atau sedang offline
  const DEFAULT_WORKS = [
    {
      title: "Lube Project #2",
      specs: "Krytox GPL 205g0, GPL 105 spring oil, Holee Mod on Plate Stabs",
      status: "Finished",
      date: "November 2026",
      thumbnail: "Photo/photo1.png"
    },
    {
      title: "Lube Project #1",
      specs: "Krytox GPL 205g0 brush lube, Stabilizer Wire Balancing & Tuning",
      status: "Finished",
      date: "October 2026",
      thumbnail: "Photo/Project 1/02.png"
    }
  ];

  let modalOverlay = null;

  function normalizeImageUrl(url) {
    if (!url) return "";
    url = url.trim();

    // Auto-convert Google Drive sharing links to direct Google CDN image URL
    // Format: https://drive.google.com/file/d/FILE_ID/view -> https://lh3.googleusercontent.com/d/FILE_ID
    const gDriveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (gDriveMatch && gDriveMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${gDriveMatch[1]}`;
    }

    return url;
  }

  function initModal() {
    if (document.getElementById("thoc-project-modal")) return;

    modalOverlay = document.createElement("div");
    modalOverlay.id = "thoc-project-modal";
    modalOverlay.className = "thoc-modal-overlay";
    modalOverlay.setAttribute("role", "dialog");
    modalOverlay.setAttribute("aria-modal", "true");
    modalOverlay.innerHTML = `
      <div class="thoc-modal-card">
        <button type="button" class="thoc-modal-close" aria-label="Close modal">&times;</button>
        <div class="thoc-modal-thumb-wrap" id="thoc-modal-thumb-wrap" style="display:none;">
          <img id="thoc-modal-img" src="" alt="Project Thumbnail" class="thoc-modal-img" loading="lazy" />
        </div>
        <div class="thoc-modal-body">
          <div class="thoc-modal-meta">
            <span id="thoc-modal-status" class="thoc-modal-badge status">FINISHED</span>
            <span id="thoc-modal-date" class="thoc-modal-badge date">NOVEMBER 2026</span>
          </div>
          <h2 id="thoc-modal-title" class="thoc-modal-title">Project Title</h2>
          
          <div class="thoc-modal-specs-wrap">
            <div class="thoc-modal-specs-label" data-i18n="works.modal.specs_label">TUNING SPECIFICATIONS & BUILD DETAIL</div>
            <div id="thoc-modal-specs" class="thoc-modal-specs-content">No specifications provided.</div>
          </div>

          <div class="thoc-modal-actions">
            <a id="thoc-modal-wa-btn" href="#" target="_blank" rel="noopener noreferrer" class="thoc-modal-btn wa">
              <span data-i18n="works.modal.wa_btn">Konsultasi Build Ini via WhatsApp &rarr;</span>
            </a>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modalOverlay);

    // Event listeners for close
    modalOverlay.querySelector(".thoc-modal-close").addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", function (e) {
      if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
        closeModal();
      }
    });

    const imgEl = document.getElementById("thoc-modal-img");
    const imgWrap = document.getElementById("thoc-modal-thumb-wrap");
    if (imgEl && imgWrap) {
      imgEl.onerror = function () {
        imgWrap.style.display = "none";
      };
    }
  }

  function openModal(item) {
    initModal();
    if (!modalOverlay) return;

    const imgWrap = document.getElementById("thoc-modal-thumb-wrap");
    const imgEl = document.getElementById("thoc-modal-img");
    const titleEl = document.getElementById("thoc-modal-title");
    const statusEl = document.getElementById("thoc-modal-status");
    const dateEl = document.getElementById("thoc-modal-date");
    const specsEl = document.getElementById("thoc-modal-specs");
    const waBtn = document.getElementById("thoc-modal-wa-btn");

    titleEl.textContent = item.title || "Custom Project";
    statusEl.textContent = (item.status || "FINISHED").toUpperCase();
    dateEl.textContent = item.date || "";
    specsEl.textContent = item.specs || "-";

    const cleanedImg = normalizeImageUrl(item.thumbnail);
    if (cleanedImg && cleanedImg.length > 0) {
      imgWrap.style.display = "block";
      imgEl.src = cleanedImg;
    } else {
      imgWrap.style.display = "none";
    }

    const waNum = (typeof THOC_CONFIG !== 'undefined' && THOC_CONFIG.whatsappNumber)
      ? THOC_CONFIG.whatsappNumber
      : "6285722333327";

    const isId = (localStorage.getItem("thockeebs-lang") || "id") === "id";
    const waText = isId
      ? `Halo Admin ThocKeebs! Saya lihat katalog project "${item.title || 'Custom Build'}" di website. Saya mau tanya / pesan jasa modding serupa.`
      : `Hello ThocKeebs Admin! I saw the "${item.title || 'Custom Build'}" project on your website. I would like to consult or order a similar tuning build.`;

    waBtn.href = `https://wa.me/${waNum}?text=${encodeURIComponent(waText)}`;

    // Re-apply translations if lang helper exists
    if (window.ThocLang && typeof window.ThocLang.applyTranslations === 'function') {
      window.ThocLang.applyTranslations();
    }

    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  function mergeWorks(sheetItems) {
    if (!Array.isArray(sheetItems)) return DEFAULT_WORKS;
    const finalItems = [...sheetItems];
    const existingTitles = new Set(sheetItems.map(i => String(i.title || '').trim().toLowerCase()));

    DEFAULT_WORKS.forEach(def => {
      if (!existingTitles.has(def.title.toLowerCase())) {
        finalItems.push(def);
      }
    });

    return finalItems;
  }

  function renderRows(items) {
    const container = document.getElementById("thoc-dynamic-works-list");
    if (!container || !Array.isArray(items) || items.length === 0) return;

    let html = "";
    items.forEach((item, index) => {
      const title = item.title || `Project #${index + 1}`;
      const status = item.status || "Finished";
      const date = item.date || "";

      html += `
        <div class="thoc-works-row-wrap" style="position:relative; width:100%;" data-project-idx="${index}">
          <div class="framer-3Qz7O framer-kVt48 framer-5GVCp framer-1g8niic framer-v-1g8niic framer-1wugrm9 thoc-clickable-project-row" role="button" tabindex="0" style="width:100%;will-change:transform;opacity:1;transform:none;cursor:pointer;">
            <div class="framer-4rjn7p">
              <div class="framer-nfi2sh" data-framer-name="Title" data-framer-component-type="RichTextContainer" style="justify-content:center;--framer-paragraph-spacing:0px;transform:none">
                <h2 class="framer-text framer-styles-preset-1lmekgs" data-styles-preset="eMBLL3bFK">${escapeHtml(title)}</h2>
              </div>
            </div>
            <div class="framer-82ks48">
              <div class="framer-xiurvb" data-framer-name="Title" data-framer-component-type="RichTextContainer" style="justify-content:center;--extracted-tcooor:var(--token-d752c2e3-4387-4d99-8931-9ec888af3ba1, rgb(157, 157, 159));--framer-paragraph-spacing:0px;transform:none">
                <div class="framer-text framer-styles-preset-2m3oxe" data-styles-preset="cH7EZUIF7" style="--framer-text-color:var(--extracted-tcooor, var(--token-d752c2e3-4387-4d99-8931-9ec888af3ba1, rgb(157, 157, 159)))">${escapeHtml(status)}</div>
              </div>
            </div>
            <div class="framer-31ht2t">
              <div class="framer-1fa9jq5" data-framer-name="Title" data-framer-component-type="RichTextContainer" style="justify-content:center;--extracted-tcooor:var(--token-d752c2e3-4387-4d99-8931-9ec888af3ba1, rgb(157, 157, 159));--framer-paragraph-spacing:0px;transform:none">
                <div class="framer-text framer-styles-preset-2m3oxe" data-styles-preset="cH7EZUIF7" style="--framer-text-color:var(--extracted-tcooor, var(--token-d752c2e3-4387-4d99-8931-9ec888af3ba1, rgb(157, 157, 159)))">${escapeHtml(date)}</div>
              </div>
            </div>
            <div class="framer-17la0sa" data-framer-name="Icon" style="transform:translateY(-50%); z-index: 10;">
              <div class="framer-9jw2q0" data-framer-name="Bounding-Box">
                <div data-framer-component-type="SVG" class="framer-zmzq8k" aria-hidden="true" style="image-rendering:pixelated;flex-shrink:0">
                  <div class="svgContainer" style="width:100%;height:100%;aspect-ratio:inherit">
                    <svg style="width:100%;height:100%;overflow: visible;"><use href="#svg-249169180_429"/></svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="framer-zozh7o" data-framer-name="Background" style="background-color:var(--token-9a61cb06-3a3a-4375-8be8-66b9dda45d4e, rgb(46, 46, 47))"></div>
            <div class="framer-1sge75u" data-framer-name="Background" style="background-color:var(--token-f56b1214-00aa-4536-9ffd-154101bb6be0, rgb(210, 210, 210))"></div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    // Attach click events
    container.querySelectorAll(".thoc-works-row-wrap").forEach(wrap => {
      wrap.addEventListener("click", function () {
        const idx = parseInt(this.getAttribute("data-project-idx"), 10);
        if (!isNaN(idx) && items[idx]) {
          openModal(items[idx]);
        }
      });
    });
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  async function fetchWorks() {
    initModal();

    // 1. Initial render from cache or defaults
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          renderRows(mergeWorks(parsed));
        }
      } catch (e) {}
    }

    // 2. Fetch fresh live data from Google Apps Script
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("HTTP error " + res.status);
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        renderRows(mergeWorks(data));
      }
    } catch (err) {
      console.warn("[ThocKeebs Works] Using cached or default works:", err);
    }
  }

  // Bind initial click handler for pre-rendered fallback items
  function bindFallbackClicks() {
    initModal();
    const container = document.getElementById("thoc-dynamic-works-list");
    if (!container) return;

    container.querySelectorAll(".thoc-works-row-wrap").forEach(wrap => {
      wrap.addEventListener("click", function (e) {
        if (e.target.closest("a[href*='tiktok.com']")) return;
        
        const titleEl = wrap.querySelector("h2");
        const title = titleEl ? titleEl.textContent.trim() : "";
        const item = DEFAULT_WORKS.find(d => d.title === title) || {
          title: title,
          specs: "Custom Krytox Lube & Tuning Build",
          status: "Finished",
          date: "November 2026",
          thumbnail: "Photo/photo1.png"
        };
        openModal(item);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      bindFallbackClicks();
      fetchWorks();
    });
  } else {
    bindFallbackClicks();
    fetchWorks();
  }
})();
