/**
 * ThocKeebs - Dynamic Works Engine
 * 1. Menampilkan daftar works di works.html (urutan terbaru di atas)
 * 2. Menampilkan card Selected Works di index.html (Home) secara dinamis
 * 3. Membuka halaman detail penuh (works-project.html) dengan data lengkap
 */

(function () {
  const API_URL = (typeof THOC_CONFIG !== 'undefined' && THOC_CONFIG.worksSheetApi)
    ? THOC_CONFIG.worksSheetApi
    : "https://script.google.com/macros/s/AKfycby-lUbeLyTLZQyMU4ZRaw0GNdfuHV4SYyg4-4ZBk8_zzmlvVmAIF44M1Ge9ea9LBGFe/exec";

  const CACHE_KEY = "thoc_works_cache_data";

  // Proyek dasar / fallback jika sheet offline (urutan kronologis mundur)
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

  function normalizeImageUrl(url) {
    if (!url) return "Photo/photo1.png";
    url = url.trim();
    const gDriveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (gDriveMatch && gDriveMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${gDriveMatch[1]}`;
    }
    return url;
  }

  // Penggabungan data dengan aturan:
  // Data baru yang diinput di Google Sheets (baris terbawah) HARUS muncul paling atas (terbaru)
  function mergeWorks(sheetItems) {
    if (!Array.isArray(sheetItems)) return DEFAULT_WORKS;

    // Di Google Sheets, input baru biasanya di baris paling bawah.
    // Kita reverse agar baris paling baru berada di urutan teratas (paling atas).
    const reversedSheet = [...sheetItems].reverse();

    const finalItems = [...reversedSheet];
    const existingTitles = new Set(sheetItems.map(i => String(i.title || '').trim().toLowerCase()));

    DEFAULT_WORKS.forEach(def => {
      if (!existingTitles.has(def.title.toLowerCase())) {
        finalItems.push(def);
      }
    });

    // Urutkan paling baru di atas (jika ada nomor project #X, urutkan descending; jika tidak, urutan input terbaru di atas)
    finalItems.sort((a, b) => {
      const matchA = (a.title || '').match(/#(\d+)/);
      const matchB = (b.title || '').match(/#(\d+)/);
      if (matchA && matchB) {
        return parseInt(matchB[1], 10) - parseInt(matchA[1], 10);
      }
      return 0;
    });

    return finalItems;
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

  // --- RENDER WORKS.HTML (TABLE LIST) ---
  function renderWorksList(items) {
    const container = document.getElementById("thoc-dynamic-works-list");
    if (!container || !Array.isArray(items) || items.length === 0) return;

    let html = "";
    items.forEach((item, index) => {
      const title = item.title || `Project #${items.length - index}`;
      const status = item.status || "Finished";
      const date = item.date || "";

      // Link langsung ke halaman detail penuh
      const detailUrl = `works-project.html?id=${index}`;

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
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // --- RENDER INDEX.HTML (SELECTED WORKS GRID ON HOME) ---
  function renderHomeSelectedWorks(items) {
    const homeContainer = document.getElementById("thoc-home-selected-works") || document.querySelector(".framer-9dzp8s");
    if (!homeContainer || !Array.isArray(items) || items.length === 0) return;

    // Ambil maksimal 4 project terbaru untuk di home
    const selectedItems = items.slice(0, 4);
    const total = items.length;

    let html = "";
    selectedItems.forEach((item, index) => {
      const title = item.title || `Project #${total - index}`;
      const status = item.status || "Finished";
      const date = item.date || "November 2026";
      const imgUrl = normalizeImageUrl(item.thumbnail);
      const numVal = String(total - index).padStart(2, '0');
      const detailUrl = `works-project.html?id=${index}`;

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
                      <div class="framer-1jpvidd" data-framer-name="Lube Switch, Stab and Modding" data-framer-component-type="RichTextContainer" style="justify-content:center;transform:none">
                        <div class="framer-text framer-styles-preset-2m3oxe" data-styles-preset="cH7EZUIF7" style="text-align:left;color:rgb(157, 157, 159)">Lube Switch, Stab and Modding</div>
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

  function applyAll(items) {
    const merged = mergeWorks(items);
    renderWorksList(merged);
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
      } catch (e) {}
    }

    // 2. Ambil data terbaru dari Google Apps Script
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("HTTP error " + res.status);
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        applyAll(data);
      }
    } catch (err) {
      console.warn("[ThocKeebs Works] Using cached or default works:", err);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fetchWorks);
  } else {
    fetchWorks();
  }
})();
