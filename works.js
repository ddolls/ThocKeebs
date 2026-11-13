/**
 * ThocKeebs - Dynamic Works Engine
 * 1. Menampilkan daftar works di works.html (urutan terbaru di atas)
 * 2. Search & Filter berdasarkan Project Name dan Tanggal
 * 3. Menampilkan card Selected Works di index.html (Home) secara dinamis
 * 4. Membuka halaman detail penuh (works-project.html) dengan data lengkap
 */

(function () {
  const API_URL = (typeof THOC_CONFIG !== 'undefined' && THOC_CONFIG.worksSheetApi)
    ? THOC_CONFIG.worksSheetApi
    : "https://script.google.com/macros/s/AKfycby-lUbeLyTLZQyMU4ZRaw0GNdfuHV4SYyg4-4ZBk8_zzmlvVmAIF44M1Ge9ea9LBGFe/exec";

  const CACHE_KEY = "thoc_works_cache_data";

  const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const MONTH_NAMES_ID = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  // Proyek dasar / fallback jika sheet offline (urutan kronologis mundur)
  const DEFAULT_WORKS = [
    {
      title: "Lube Project #2 - Pharita",
      type: "Lube Switch, Stab & Modding",
      specs: "Lube Akko Green Fog 81 pcs\nLube KTT Raw Coconut Latte 80 pcs\nLube & Tuning + Holee Mod Leobog Hi75C Pro All Stab\nLube & Tuning + Holee Mod Weikav WK75 All Stab\nAdd Poron foam to Leobog Hi75C Pro\nAdd Poron foam to Weikav WK75",
      status: "Finished",
      date: "November, 02 2026",
      location: "Bandung",
      thumbnail: "Photo/photo1.png",
      tiktok: "https://vt.tiktok.com/ZSpUv18Pb/"
    },
    {
      title: "Lube Project #1 - Deliabluu",
      type: "Lube Switch",
      specs: "Lube Keygeek Hachiware 35 pcs\nLube Jerrzi Misty 30 pcs\nLube BSUN Blue Feather 20 pcs",
      status: "Finished",
      date: "October, 24 2026",
      location: "Malang",
      thumbnail: "Photo/Project 1/02.png",
      tiktok: "https://vt.tiktok.com/ZSpUfwdK5/"
    }
  ];

  let masterWorks = [];
  let isControlsInitialized = false;

  function normalizeImageUrl(url) {
    if (!url) return "Photo/photo1.png";
    url = url.trim();
    const gDriveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (gDriveMatch && gDriveMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${gDriveMatch[1]}`;
    }
    return url;
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

  function parseDateLocation(rawDate, rawLocation) {
    let date = String(rawDate || "").trim();
    let location = String(rawLocation || "").trim();

    if (date.includes("/")) {
      const parts = date.split("/");
      date = parts[0].trim();
      if (!location || location === rawDate || location === "-") {
        location = parts[1] ? parts[1].trim() : "Bandung, Indonesia";
      }
    }

    if (!location || location === "-" || location === date) {
      location = "Bandung, Indonesia";
    }

    return { date: date || "November 2026", location: location || "Bandung, Indonesia" };
  }

  function parseDateObj(raw) {
    if (!raw) return null;
    let s = String(raw).split("/")[0].trim();
    MONTH_NAMES_ID.forEach((idM, idx) => {
      s = s.replace(new RegExp(idM, 'i'), MONTH_NAMES[idx]);
    });
    let d = new Date(s);
    if (!isNaN(d.getTime())) return d;
    let clean = s.replace(/,/g, ' ').replace(/\s+/g, ' ').trim();
    d = new Date(clean);
    if (!isNaN(d.getTime())) return d;
    const parts = s.split(/[-/.]/);
    if (parts.length === 3) {
      if (parts[0].length === 4) {
        d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      } else if (parts[2].length === 4) {
        d = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
      }
      if (!isNaN(d.getTime())) return d;
    }
    return null;
  }

  function formatMonthYearKey(d) {
    if (!d) return "";
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    return `${y}-${m}`;
  }

  function formatMonthYearLabel(d, lang) {
    if (!d) return "";
    const m = d.getMonth();
    const y = d.getFullYear();
    const isId = (lang || localStorage.getItem("thockeebs-lang") || "en") === "id";
    const name = isId ? MONTH_NAMES_ID[m] : MONTH_NAMES[m];
    return `${name} ${y}`;
  }

  function formatIsoDate(d) {
    if (!d) return "";
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  // Penggabungan data dengan aturan:
  // Data baru yang diinput di Google Sheets (baris terbawah) HARUS muncul paling atas (terbaru)
  function mergeWorks(sheetItems) {
    if (!Array.isArray(sheetItems)) return DEFAULT_WORKS;

    const reversedSheet = [...sheetItems].reverse();
    const finalItems = [...reversedSheet];

    DEFAULT_WORKS.forEach(def => {
      const defMatch = (def.title || '').match(/#(\d+)/);
      const isAlreadyInSheet = sheetItems.some(i => {
        const itemMatch = (i.title || '').match(/#(\d+)/);
        if (defMatch && itemMatch) {
          return defMatch[1] === itemMatch[1];
        }
        return (i.title || '').trim().toLowerCase() === def.title.toLowerCase();
      });

      if (!isAlreadyInSheet) {
        finalItems.push(def);
      }
    });

    // Urutkan default: jika ada nomor project #X urutkan descending, jika tidak urutkan berdasarkan tanggal terbaru
    finalItems.sort((a, b) => {
      const matchA = (a.title || '').match(/#(\d+)/);
      const matchB = (b.title || '').match(/#(\d+)/);
      if (matchA && matchB) {
        return parseInt(matchB[1], 10) - parseInt(matchA[1], 10);
      }
      const dateA = parseDateObj(a.date);
      const dateB = parseDateObj(b.date);
      if (dateA && dateB) {
        return dateB.getTime() - dateA.getTime();
      }
      return 0;
    });

    // Berikan metadata pencarian & filter ke tiap item
    finalItems.forEach((it, idx) => {
      it._origIndex = idx;
      it._dateObj = parseDateObj(it.date);
      it._monthYearKey = formatMonthYearKey(it._dateObj);
      it._isoDate = formatIsoDate(it._dateObj);
      it._year = it._dateObj ? it._dateObj.getFullYear() : null;
      if (!it.tiktok && it.title) {
        if (it.title.includes("Pharita")) it.tiktok = "https://vt.tiktok.com/ZSpUv18Pb/";
        else if (it.title.includes("Deliabluu")) it.tiktok = "https://vt.tiktok.com/ZSpUfwdK5/";
      }
    });

    return finalItems;
  }

  // --- RENDER WORKS.HTML (TABLE LIST) ---
  function renderWorksList(items) {
    const container = document.getElementById("thoc-dynamic-works-list");
    if (!container) return;

    if (!Array.isArray(items) || items.length === 0) {
      const isId = (localStorage.getItem("thockeebs-lang") || "en") === "id";
      container.innerHTML = `
        <div class="thoc-works-empty-state">
          <div class="thoc-empty-icon">🔍</div>
          <h3 class="thoc-empty-title" data-i18n="works.empty.title">${isId ? "Project tidak ditemukan" : "No projects found"}</h3>
          <p class="thoc-empty-desc" data-i18n="works.empty.desc">${isId ? "Coba ubah kata kunci pencarian atau filter tanggal" : "Try adjusting your search query or date filter"}</p>
          <button type="button" class="thoc-empty-reset-btn" id="thoc-empty-reset-trigger" data-i18n="works.empty.reset">${isId ? "Reset Filter" : "Reset Filters"}</button>
        </div>
      `;
      const emptyReset = document.getElementById("thoc-empty-reset-trigger");
      if (emptyReset) {
        emptyReset.addEventListener("click", resetAllFilters);
      }
      return;
    }

    let html = "";
    items.forEach((item, index) => {
      const title = item.title || `Project #${items.length - index}`;
      const status = item.status || "Finished";
      const dateLoc = parseDateLocation(item.date, item.location);
      const date = dateLoc.date;

      // Link ke halaman detail penuh dengan referensi index asli dan judul
      const targetId = (item._origIndex !== undefined) ? item._origIndex : index;
      const detailUrl = `works-project?id=${targetId}&title=${encodeURIComponent(title)}`;
      const tiktokUrl = item.tiktok || item.tiktokUrl || "";

      html += `
        <div class="thoc-works-row-wrap" style="position:relative; width:100%;">
          <a class="framer-3Qz7O framer-kVt48 framer-5GVCp framer-1g8niic framer-v-1g8niic framer-1wugrm9" href="${detailUrl}" style="width:100%;will-change:transform;opacity:1;transform:none;text-decoration:none;">
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
          </a>
          ${tiktokUrl ? `
            <a href="${escapeHtml(tiktokUrl)}" target="_blank" rel="noopener noreferrer" title="Watch on TikTok" onclick="event.stopPropagation();" style="position:absolute; right:16px; top:50%; transform:translateY(-50%); width:44px; height:44px; z-index:20; display:flex; align-items:center; justify-content:center; cursor:pointer;" aria-label="Watch on TikTok"></a>
          ` : ''}
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // --- RENDER INDEX.HTML (SELECTED WORKS GRID ON HOME) ---
  function renderHomeSelectedWorks(items) {
    const homeContainer = document.getElementById("thoc-home-selected-works") || document.querySelector(".framer-9dzp8s");
    if (!homeContainer || !Array.isArray(items) || items.length === 0) return;

    const selectedItems = items.slice(0, 4);
    const total = items.length;

    let html = "";
    selectedItems.forEach((item, index) => {
      const title = item.title || `Project #${total - index}`;
      const status = item.status || "Finished";
      const dateLoc = parseDateLocation(item.date, item.location);
      const date = dateLoc.date;
      const itemType = (item.type && item.type.trim() !== '-' && item.type.trim() !== '')
        ? item.type.trim()
        : (item.specs ? item.specs.trim() : "Lube Switch, Stab and Modding");
      const imgUrl = normalizeImageUrl(item.thumbnail);
      const numVal = String(total - index).padStart(2, '0');
      const targetId = (item._origIndex !== undefined) ? item._origIndex : index;
      const detailUrl = `works-project?id=${targetId}&title=${encodeURIComponent(title)}`;

      html += `
        <div class="ssr-variant" style="flex:1 1 48%;min-width:300px;box-sizing:border-box;">
          <div class="framer-1d2jjle-container" style="width:100%;">
            <a class="framer-omK0L framer-VygiK framer-izi8dx framer-v-izi8dx framer-ft9m12" href="${detailUrl}" style="width:100%;display:flex;flex-direction:column;will-change:transform;opacity:1;transform:none;text-decoration:none;">
              <div class="framer-1xtagle" data-border="true" data-framer-name="Head" style="--border-bottom-width:1px;--border-color:var(--border-subtle, rgb(77, 77, 79));--border-left-width:0px;--border-right-width:0px;--border-style:solid;--border-top-width:0px">
                <div class="framer-1o46wmv" data-framer-name="Ellipse" style="background-color:rgb(46, 46, 47);border-radius:100%;"></div>
                <div class="framer-1uahsye" data-framer-name="Title" data-framer-component-type="RichTextContainer" style="justify-content:center;transform:none">
                  <h3 class="framer-text framer-styles-preset-1eexksg" data-styles-preset="C2pMtMY9A">${escapeHtml(title)}</h3>
                </div>
                <div class="framer-191dfzc" data-border="true" data-framer-name="N°" style="border:1px solid rgb(77, 77, 79);border-radius:4px;">
                  <div class="framer-2mfta6" data-framer-name="${numVal}" data-framer-component-type="RichTextContainer" style="justify-content:center;transform:none">
                    <p class="framer-text" style="font-family:'IBM Plex Mono', monospace;font-size:10px;font-weight:500;letter-spacing:0.02em;line-height:16px;text-align:center;color:rgb(138, 138, 140);text-transform:uppercase">${numVal}</p>
                  </div>
                </div>
              </div>
              <div class="framer-yjv5zx" data-framer-name="Content">
                <div class="framer-1wihtfr" data-framer-name="Thumbnail">
                  <figure as="figure" class="framer-s3erso" data-framer-name="Work-Thumbnail" style="transform:translateX(-50%)">
                    <div style="position:absolute;inset:0" data-framer-background-image-wrapper="true">
                      <img decoding="async" loading="lazy" src="${escapeHtml(imgUrl)}" alt="${escapeHtml(title)}" style="display:block;width:100%;height:100%;object-position:center;object-fit:cover" onerror="this.src='Photo/photo1.png'">
                    </div>
                  </figure>
                  <div data-framer-name="Corner Cross" class="framer-tTCNk framer-1ds41wu"></div>
                  <div data-framer-name="Corner Cross" class="framer-tTCNk framer-1typ5j5"></div>
                  <div data-framer-name="Corner Cross" class="framer-tTCNk framer-13ud3op"></div>
                  <div data-framer-name="Corner Cross" class="framer-tTCNk framer-162s4ob"></div>
                </div>
                <div class="framer-o0h0x6-container">
                  <div class="framer-G49qC framer-5GVCp framer-l7z7yz framer-v-l7z7yz" data-framer-name="Variant 1" data-highlight="true" style="width:100%;will-change:transform;opacity:1;transform:none">
                    <div class="framer-153syd6" data-framer-name="Year">
                      <div class="framer-1ee2oe" data-framer-name="Year" data-framer-component-type="RichTextContainer" style="justify-content:center;transform:none">
                        <div class="framer-text framer-styles-preset-2m3oxe" data-styles-preset="cH7EZUIF7" style="text-align:left">Year</div>
                      </div>
                      <div class="framer-1jxoivx" data-framer-name="${escapeHtml(date)}" data-framer-component-type="RichTextContainer" style="justify-content:center;transform:none">
                        <div class="framer-text framer-styles-preset-2m3oxe" data-styles-preset="cH7EZUIF7" style="text-align:left;color:rgb(157, 157, 159)">${escapeHtml(date)}</div>
                      </div>
                      <div class="framer-14ugevt" data-framer-name="Background" style="background-color:rgb(210, 210, 210)"></div>
                    </div>
                    <div class="framer-cduy0i" data-framer-name="Type">
                      <div class="framer-irdjlh" data-framer-name="Type" data-framer-component-type="RichTextContainer" style="justify-content:center;transform:none">
                        <div class="framer-text framer-styles-preset-2m3oxe" data-styles-preset="cH7EZUIF7" style="text-align:left">Type</div>
                      </div>
                      <div class="framer-1jpvidd" data-framer-name="${escapeHtml(itemType)}" data-framer-component-type="RichTextContainer" style="justify-content:center;transform:none">
                        <div class="framer-text framer-styles-preset-2m3oxe" data-styles-preset="cH7EZUIF7" style="text-align:left;color:rgb(157, 157, 159)">${escapeHtml(itemType)}</div>
                      </div>
                      <div class="framer-ehvpa8" data-framer-name="Background" style="background-color:rgb(210, 210, 210)"></div>
                    </div>
                    <div class="framer-1g0806u" data-framer-name="Status">
                      <div class="framer-1rhqjfy" data-framer-name="Status" data-framer-component-type="RichTextContainer" style="justify-content:center;transform:none">
                        <div class="framer-text framer-styles-preset-2m3oxe" data-styles-preset="cH7EZUIF7" style="text-align:left">Status</div>
                      </div>
                      <div class="framer-3w4trz" data-framer-name="${escapeHtml(status)}" data-framer-component-type="RichTextContainer" style="justify-content:center;transform:none">
                        <div class="framer-text framer-styles-preset-2m3oxe" data-styles-preset="cH7EZUIF7" style="text-align:left;color:rgb(157, 157, 159)">${escapeHtml(status)}</div>
                      </div>
                      <div class="framer-75v1ea" data-framer-name="Background" style="position:absolute;bottom:0;left:0;width:0;height:1px;background-color:rgb(210, 210, 210)"></div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      `;
    });

    homeContainer.innerHTML = html;
  }

  // --- SEARCH & FILTER LOGIC ---
  function populateDateFilterOptions(items) {
    const dateSelect = document.getElementById("thoc-works-date-filter");
    if (!dateSelect) return;

    const currentVal = dateSelect.value || "all";
    const isId = (localStorage.getItem("thockeebs-lang") || "en") === "id";

    const monthYearMap = new Map();
    const yearSet = new Set();

    items.forEach(it => {
      if (it._monthYearKey && it._dateObj) {
        const prev = monthYearMap.get(it._monthYearKey);
        const count = prev ? prev.count + 1 : 1;
        monthYearMap.set(it._monthYearKey, {
          key: it._monthYearKey,
          label: formatMonthYearLabel(it._dateObj, isId ? "id" : "en"),
          dateObj: it._dateObj,
          count: count
        });
      }
      if (it._year) {
        yearSet.add(it._year);
      }
    });

    const sortedMonths = Array.from(monthYearMap.values()).sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime());

    let optsHtml = `<option value="all" data-i18n="works.filter.all_dates">${isId ? "Semua Tanggal" : "All Dates"}</option>`;

    sortedMonths.forEach(m => {
      optsHtml += `<option value="${m.key}">${escapeHtml(m.label)} (${m.count})</option>`;
    });

    if (yearSet.size > 1) {
      const sortedYears = Array.from(yearSet).sort((a, b) => b - a);
      sortedYears.forEach(y => {
        optsHtml += `<option value="year-${y}">${isId ? "Tahun" : "Year"} ${y}</option>`;
      });
    }

    optsHtml += `<option value="custom" data-i18n="works.filter.custom_date">${isId ? "Pilih Tanggal Spesifik..." : "Pick Specific Date..."}</option>`;

    dateSelect.innerHTML = optsHtml;

    if (currentVal && Array.from(dateSelect.options).some(o => o.value === currentVal)) {
      dateSelect.value = currentVal;
    } else {
      dateSelect.value = "all";
    }
  }

  function filterAndRenderWorks() {
    const searchInput = document.getElementById("thoc-works-search-input");
    const dateSelect = document.getElementById("thoc-works-date-filter");
    const sortSelect = document.getElementById("thoc-works-sort-filter");
    const exactInput = document.getElementById("thoc-works-exact-date");
    const exactWrap = document.getElementById("thoc-exact-date-wrap");
    const clearBtn = document.getElementById("thoc-works-search-clear");
    const resetBtn = document.getElementById("thoc-works-reset-btn");
    const countText = document.getElementById("thoc-works-count-text");

    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const dateFilter = dateSelect ? dateSelect.value : "all";
    const sortOrder = sortSelect ? sortSelect.value : "newest";
    const exactDate = (exactInput && dateFilter === "custom") ? exactInput.value : "";

    // Toggle custom date picker visibility
    if (exactWrap) {
      if (dateFilter === "custom") {
        exactWrap.classList.add("is-active");
      } else {
        exactWrap.classList.remove("is-active");
      }
    }

    // Toggle clear search button
    if (clearBtn) {
      if (query.length > 0) {
        clearBtn.classList.add("is-active");
        clearBtn.style.display = "flex";
      } else {
        clearBtn.classList.remove("is-active");
        clearBtn.style.display = "none";
      }
    }

    // Filter items
    let filtered = masterWorks.filter(item => {
      // 1. Search Query: Project Name (Title) & Specs
      if (query) {
        const titleMatch = (item.title || "").toLowerCase().includes(query);
        const typeMatch = (item.type || "").toLowerCase().includes(query);
        const specMatch = (item.specs || "").toLowerCase().includes(query);
        if (!titleMatch && !typeMatch && !specMatch) {
          return false;
        }
      }

      // 2. Date Filter
      if (dateFilter === "custom") {
        if (exactDate && item._isoDate !== exactDate) {
          return false;
        }
      } else if (dateFilter.startsWith("year-")) {
        const yr = dateFilter.replace("year-", "");
        if (String(item._year) !== yr) return false;
      } else if (dateFilter !== "all") {
        if (item._monthYearKey !== dateFilter) return false;
      }

      return true;
    });

    // Sort items by date
    filtered.sort((a, b) => {
      const timeA = a._dateObj ? a._dateObj.getTime() : 0;
      const timeB = b._dateObj ? b._dateObj.getTime() : 0;
      if (sortOrder === "oldest") {
        return timeA - timeB;
      }
      return timeB - timeA;
    });

    // Render filtered list
    renderWorksList(filtered);

    // Update count badge
    if (countText) {
      const isId = (localStorage.getItem("thockeebs-lang") || "en") === "id";
      const projWord = isId ? "Project" : (filtered.length === 1 ? "Project" : "Projects");
      const ofWord = isId ? "dari" : "of";
      if (query || dateFilter !== "all" || exactDate) {
        countText.textContent = `${filtered.length} ${ofWord} ${masterWorks.length} ${projWord}`;
      } else {
        countText.textContent = `${masterWorks.length} ${projWord}`;
      }
    }

    // Toggle reset button
    if (resetBtn) {
      const isFiltered = query.length > 0 || dateFilter !== "all" || sortOrder !== "newest" || exactDate !== "";
      if (isFiltered) {
        resetBtn.classList.add("is-active");
        resetBtn.style.display = "inline-flex";
      } else {
        resetBtn.classList.remove("is-active");
        resetBtn.style.display = "none";
      }
    }
  }

  function resetAllFilters() {
    const searchInput = document.getElementById("thoc-works-search-input");
    const dateSelect = document.getElementById("thoc-works-date-filter");
    const sortSelect = document.getElementById("thoc-works-sort-filter");
    const exactInput = document.getElementById("thoc-works-exact-date");
    const exactWrap = document.getElementById("thoc-exact-date-wrap");

    if (searchInput) searchInput.value = "";
    if (dateSelect) dateSelect.value = "all";
    if (sortSelect) sortSelect.value = "newest";
    if (exactInput) exactInput.value = "";
    if (exactWrap) exactWrap.style.display = "none";

    filterAndRenderWorks();
  }

  function initControls() {
    if (isControlsInitialized) return;

    const searchInput = document.getElementById("thoc-works-search-input");
    const dateSelect = document.getElementById("thoc-works-date-filter");
    const sortSelect = document.getElementById("thoc-works-sort-filter");
    const exactInput = document.getElementById("thoc-works-exact-date");
    const clearBtn = document.getElementById("thoc-works-search-clear");
    const resetBtn = document.getElementById("thoc-works-reset-btn");

    if (!searchInput && !dateSelect) return;

    if (searchInput) {
      searchInput.addEventListener("input", filterAndRenderWorks);
      searchInput.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          searchInput.value = "";
          filterAndRenderWorks();
        }
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        if (searchInput) {
          searchInput.value = "";
          searchInput.focus();
        }
        filterAndRenderWorks();
      });
    }

    if (dateSelect) {
      dateSelect.addEventListener("change", function () {
        const exactWrap = document.getElementById("thoc-exact-date-wrap");
        if (dateSelect.value === "custom") {
          if (exactWrap) exactWrap.style.display = "inline-flex";
          if (exactInput) exactInput.focus();
        } else {
          if (exactWrap) exactWrap.style.display = "none";
          if (exactInput) exactInput.value = "";
        }
        filterAndRenderWorks();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener("change", filterAndRenderWorks);
    }

    if (exactInput) {
      exactInput.addEventListener("change", filterAndRenderWorks);
      exactInput.addEventListener("input", filterAndRenderWorks);
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", resetAllFilters);
    }

    isControlsInitialized = true;
  }

  function applyAll(items) {
    const merged = mergeWorks(items);
    masterWorks = merged;

    initControls();
    populateDateFilterOptions(merged);
    filterAndRenderWorks();
    renderHomeSelectedWorks(merged);
  }

  async function fetchWorks() {
    // 1. Render dari cache dulu agar instant 0ms
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          applyAll(parsed);
        }
      } catch (e) { }
    } else {
      applyAll(DEFAULT_WORKS);
    }

    // 2. Ambil data terbaru dari Google Apps Script
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("HTTP error " + res.status);
      const data = await res.json();

      if (Array.isArray(data)) {
        if (data.length > 0) {
          localStorage.setItem(CACHE_KEY, JSON.stringify(data));
          applyAll(data);
        } else {
          localStorage.removeItem(CACHE_KEY);
          applyAll([]);
        }
      }
    } catch (err) {
      console.warn("[ThocKeebs Works] Using cached or default works:", err);
    }
  }

  // Re-apply filter when language is switched
  document.addEventListener("thockeebs-lang-changed", function () {
    if (masterWorks && masterWorks.length > 0) {
      populateDateFilterOptions(masterWorks);
      filterAndRenderWorks();
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fetchWorks);
  } else {
    fetchWorks();
  }
})();
