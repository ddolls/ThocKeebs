/**
 * ThocKeebs - Core Application Script
 * Inspired by biipmk.com (Mechanical Keyboard Designer Portfolio)
 * - Live Ticking Clock (Jakarta, Indonesia) in Navigation Bar
 * - Web Audio API Mechanical Keyboard Sound Synthesizer (Zero External Audio Files)
 * - Realtime Pre-Order Calculator & Live Subtotal Engine
 * - WhatsApp Formatter & 1-Click Shipping Address Copier
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveClock();
  initStoreInfo();
  initAudioTester();
  initOrderCalculator();
  initCatalogModal();
  initAddressCopier();
});

/* ==========================================================================
   1. Biip Live Ticking Clock (Jakarta, Indonesia)
   ========================================================================== */
function initLiveClock() {
  const clockEl = document.getElementById('biip-location-time');
  if (!clockEl) return;

  function updateClock() {
    const now = new Date();
    const options = {
      timeZone: 'Asia/Jakarta',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    const timeFormatted = now.toLocaleString('en-US', options);
    clockEl.textContent = `Jakarta, Indonesia. • ${timeFormatted}`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================================================
   2. Store Info & Header Dynamic Binding
   ========================================================================== */
function initStoreInfo() {
  const config = window.THOC_CONFIG || {};

  const heroBatchBadge = document.getElementById('hero-batch-badge');
  if (heroBatchBadge && config.batchInfo) {
    heroBatchBadge.textContent = `${config.batchInfo.batchNumber.toUpperCase()} • PRE-ORDER OPEN • TURNAROUND: ${config.batchInfo.etaStandard.toUpperCase()}`;
  }

  // Bind WhatsApp Direct Buttons
  const waDirectBtns = document.querySelectorAll('.wa-direct-link');
  waDirectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const num = config.whatsappNumber || "6285722333327";
      const defaultMsg = encodeURIComponent(`Halo Admin ${config.shopName || 'ThocKeebs'}, saya ingin tanya-tanya seputar jasa lube switch dan tuning stabilizer mechanical keyboard.`);
      window.open(`https://wa.me/${num}?text=${defaultMsg}`, '_blank');
    });
  });
}

/* ==========================================================================
   3. Web Audio API Mechanical Keyboard Sound Synthesizer
   Akustik realistis: Krytox 205g0 (Thock), TriboSys 3204 (Clack), Stock (Scratch & Ping), Stabs
   ========================================================================== */
let audioCtx = null;
let currentProfile = 'lubed-thock';

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSwitchSound(profile = currentProfile) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    animateSoundBars();

    switch (profile) {
      case 'lubed-thock':
        synthesizeThock(ctx, now);
        break;
      case 'lubed-clack':
        synthesizeClack(ctx, now);
        break;
      case 'stock-scratch':
        synthesizeStockScratch(ctx, now);
        break;
      case 'stock-stabs':
        synthesizeStockStabRattle(ctx, now);
        break;
      case 'tuned-stabs':
        synthesizeTunedStab(ctx, now);
        break;
      default:
        synthesizeThock(ctx, now);
    }
  } catch (err) {
    console.warn("Audio synthesizer notice:", err);
  }
}

// 1. Deep Thock (Krytox 205g0)
function synthesizeThock(ctx, now) {
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(155, now);
  osc.frequency.exponentialRampToValueAtTime(50, now + 0.08);

  oscGain.gain.setValueAtTime(0.75, now);
  oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

  osc.connect(oscGain);
  oscGain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.1);

  const bufferSize = ctx.sampleRate * 0.06;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(750, now);
  filter.frequency.exponentialRampToValueAtTime(180, now + 0.06);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.55, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start(now);
}

// 2. Crisp Clack (TriboSys 3204)
function synthesizeClack(ctx, now) {
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(440, now);
  osc.frequency.exponentialRampToValueAtTime(130, now + 0.07);

  oscGain.gain.setValueAtTime(0.65, now);
  oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

  osc.connect(oscGain);
  oscGain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.08);

  const bufferSize = ctx.sampleRate * 0.05;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(1800, now);
  filter.Q.value = 1.8;

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.45, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start(now);
}

// 3. Stock Switch (Scratch & High Spring Ping)
function synthesizeStockScratch(ctx, now) {
  const bufferSize = ctx.sampleRate * 0.12;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.setValueAtTime(2600, now);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.6, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);

  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start(now);

  const pingOsc = ctx.createOscillator();
  const pingGain = ctx.createGain();
  pingOsc.type = 'sine';
  pingOsc.frequency.setValueAtTime(3400, now);

  pingGain.gain.setValueAtTime(0.4, now + 0.01);
  pingGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

  pingOsc.connect(pingGain);
  pingGain.connect(ctx.destination);
  pingOsc.start(now);
  pingOsc.stop(now + 0.36);
}

// 4. Stock Stabilizer Rattle
function synthesizeStockStabRattle(ctx, now) {
  [0, 0.02, 0.045, 0.07].forEach((delay, idx) => {
    const tickOsc = ctx.createOscillator();
    const tickGain = ctx.createGain();
    tickOsc.type = 'square';
    tickOsc.frequency.setValueAtTime(2800 - idx * 300, now + delay);

    tickGain.gain.setValueAtTime(0.45 / (idx + 1), now + delay);
    tickGain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.025);

    tickOsc.connect(tickGain);
    tickGain.connect(ctx.destination);
    tickOsc.start(now + delay);
    tickOsc.stop(now + delay + 0.03);
  });
}

// 5. Tuned Stabilizer (Holee Modded, Solid Zero Rattle)
function synthesizeTunedStab(ctx, now) {
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(105, now);
  osc.frequency.exponentialRampToValueAtTime(42, now + 0.14);

  oscGain.gain.setValueAtTime(0.9, now);
  oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

  osc.connect(oscGain);
  oscGain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.16);

  const bufferSize = ctx.sampleRate * 0.08;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(400, now);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.45, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start(now);
}

function animateSoundBars() {
  const bars = document.querySelectorAll('.sound-bar');
  if (!bars.length) return;
  bars.forEach(bar => {
    const randomHeight = Math.floor(Math.random() * 24) + 6;
    bar.style.height = `${randomHeight}px`;
    setTimeout(() => {
      bar.style.height = '6px';
    }, 140);
  });
}

function initAudioTester() {
  const profileBtns = document.querySelectorAll('[data-sound-profile]');
  const activeLabel = document.getElementById('active-sound-label');
  const activeDesc = document.getElementById('active-sound-desc');

  const descriptions = {
    'lubed-thock': {
      title: 'Krytox GPL 205g0 • Deep Thock Profile',
      desc: 'Suara bass empuk, padat, dan sangat memuaskan. 100% bebas scratch dan spring ping!'
    },
    'lubed-clack': {
      title: 'TriboSys 3204 • Crispy Clack Profile',
      desc: 'Snappy dan renyah. Sangat direkomendasikan untuk switch tipe tactile.'
    },
    'stock-scratch': {
      title: 'Stock Switch • Unlubed (Scratch & Ping)',
      desc: 'Kasar berisik gesekan stem plastik dengan per berdenging tajam.'
    },
    'stock-stabs': {
      title: 'Stock Stabilizer • Kawat Berisik (Rattle)',
      desc: 'Kawat kendor beradu dengan rumah stabilizer yang mengganggu estetika ketukan.'
    },
    'tuned-stabs': {
      title: 'Tuned Stabilizer • Holee Mod (Zero Rattle)',
      desc: 'Spacebar hening, padat, dan mantap berkat balancing presisi dan pelumas XHT-BDZ.'
    }
  };

  profileBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      profileBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      currentProfile = btn.getAttribute('data-sound-profile');
      if (descriptions[currentProfile]) {
        if (activeLabel) activeLabel.textContent = descriptions[currentProfile].title;
        if (activeDesc) activeDesc.textContent = descriptions[currentProfile].desc;
      }

      playSwitchSound(currentProfile);
    });
  });

  const keyboardKeys = document.querySelectorAll('.sound-test-key');
  keyboardKeys.forEach(key => {
    key.addEventListener('mousedown', () => {
      key.classList.add('pressed');
      playSwitchSound(currentProfile);
    });
    key.addEventListener('mouseup', () => key.classList.remove('pressed'));
    key.addEventListener('mouseleave', () => key.classList.remove('pressed'));
  });

  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
    playSwitchSound(currentProfile);
  });
}

/* ==========================================================================
   4. Pre-Order Calculator & WhatsApp Formatter
   ========================================================================== */
function initOrderCalculator() {
  const config = window.THOC_CONFIG || {};
  const prices = config.pricing || {
    switchLubeStandard: 2000,
    switchLubeFilm: 2800,
    switchLubeFullMod: 3500,
    stabsPlateMount: 35000,
    stabsScrewIn: 45000,
    holeeModAddon: 10000,
    bandaidPcbMod: 8000,
    desolderPerSwitch: 1500
  };

  let switchCount = 68;
  let selectedPackage = 'standard';
  let selectedLubeType = 'Krytox GPL 205g0 (Recommended - Deep Thock)';
  let selectedStabs = 'plate';
  let holeeModActive = true;
  let bandaidModActive = false;
  let desolderActive = false;

  const slider = document.getElementById('switch-slider');
  const countDisplay = document.getElementById('switch-count-display');
  const presetButtons = document.querySelectorAll('[data-preset-count]');
  const packageCards = document.querySelectorAll('[data-package-card]');
  const lubeTypeSelect = document.getElementById('lube-type-select');
  const stabsCards = document.querySelectorAll('[data-stabs-card]');
  const holeeCheck = document.getElementById('mod-holee');
  const bandaidCheck = document.getElementById('mod-bandaid');
  const desolderCheck = document.getElementById('service-desolder');

  const summarySwitchCount = document.getElementById('sum-switch-count');
  const summarySwitchRate = document.getElementById('sum-switch-rate');
  const summarySwitchTotal = document.getElementById('sum-switch-total');
  const summaryStabsDetail = document.getElementById('sum-stabs-detail');
  const summaryStabsTotal = document.getElementById('sum-stabs-total');
  const summaryAddonsRow = document.getElementById('sum-addons-row');
  const summaryAddonsDetail = document.getElementById('sum-addons-detail');
  const summaryAddonsTotal = document.getElementById('sum-addons-total');
  const summaryGrandTotal = document.getElementById('sum-grand-total');
  const summaryEtaBadge = document.getElementById('sum-eta-badge');
  const etaDetailText = document.getElementById('eta-detail-text');

  function calculate() {
    let ratePerSwitch = prices.switchLubeStandard;
    let packageName = "Lube Standar";
    if (selectedPackage === 'film') {
      ratePerSwitch = prices.switchLubeFilm;
      packageName = "Lube + Switch Film";
    } else if (selectedPackage === 'fullmod') {
      ratePerSwitch = prices.switchLubeFullMod;
      packageName = "Lube + Film + Spring Swap";
    }

    if (desolderActive) {
      ratePerSwitch += prices.desolderPerSwitch;
      packageName += " (+Desolder)";
    }

    const switchTotal = switchCount * ratePerSwitch;

    let stabsPrice = 0;
    let stabsName = "Tanpa Tuning Stabilizer";
    if (selectedStabs === 'plate') {
      stabsPrice = prices.stabsPlateMount;
      stabsName = "Fullset Plate-Mount";
    } else if (selectedStabs === 'screwin') {
      stabsPrice = prices.stabsScrewIn;
      stabsName = "Fullset Screw-In / PCB";
    }

    let addonsTotal = 0;
    const addonNames = [];
    if (selectedStabs !== 'none') {
      if (holeeModActive) {
        addonsTotal += prices.holeeModAddon;
        addonNames.push("Holee Mod Anti-Rattle");
      }
      if (bandaidModActive) {
        addonsTotal += prices.bandaidPcbMod;
        addonNames.push("Band-Aid / Pad Mod PCB");
      }
    }

    const grandTotal = switchTotal + stabsPrice + addonsTotal;

    let etaString = "0.5 – 1 Hari";
    if (switchCount > 100) {
      etaString = "1 – 2 Hari Kerja";
    }

    if (countDisplay) countDisplay.textContent = `${switchCount} Switch`;
    if (summarySwitchCount) summarySwitchCount.textContent = `${switchCount} Switch (${packageName})`;
    if (summarySwitchRate) summarySwitchRate.textContent = `@ Rp ${ratePerSwitch.toLocaleString('id-ID')}`;
    if (summarySwitchTotal) summarySwitchTotal.textContent = `Rp ${switchTotal.toLocaleString('id-ID')}`;

    if (summaryStabsDetail) summaryStabsDetail.textContent = stabsName;
    if (summaryStabsTotal) summaryStabsTotal.textContent = `Rp ${stabsPrice.toLocaleString('id-ID')}`;

    if (summaryAddonsRow) {
      if (addonNames.length > 0) {
        summaryAddonsRow.style.display = 'flex';
        if (summaryAddonsDetail) summaryAddonsDetail.textContent = addonNames.join(" + ");
        if (summaryAddonsTotal) summaryAddonsTotal.textContent = `Rp ${addonsTotal.toLocaleString('id-ID')}`;
      } else {
        summaryAddonsRow.style.display = 'none';
      }
    }

    if (summaryGrandTotal) summaryGrandTotal.textContent = `Rp ${grandTotal.toLocaleString('id-ID')}`;
    if (summaryEtaBadge) summaryEtaBadge.textContent = etaString;
    if (etaDetailText) {
      etaDetailText.innerHTML = switchCount <= 100
        ? `⚡ <strong>TURNAROUND:</strong> Switch dibawah 100 pcs selesai dalam <strong>0.5 – 1 Hari</strong> sesuai katalog resmi ThocKeebs.`
        : `⚡ <strong>BULK BATCH:</strong> Switch diatas 100 pcs selesai teliti dalam <strong>1 – 2 Hari Kerja</strong>.`;
    }

    return {
      switchCount,
      packageName,
      ratePerSwitch,
      switchTotal,
      selectedLubeType,
      selectedStabs,
      stabsName,
      stabsPrice,
      addonNames,
      addonsTotal,
      grandTotal,
      etaString
    };
  }

  if (slider) {
    slider.addEventListener('input', (e) => {
      switchCount = parseInt(e.target.value, 10);
      presetButtons.forEach(btn => btn.classList.remove('active'));
      calculate();
    });
  }

  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const count = parseInt(btn.getAttribute('data-preset-count'), 10);
      switchCount = count;
      if (slider) slider.value = count;

      presetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      calculate();
    });
  });

  packageCards.forEach(card => {
    card.addEventListener('click', () => {
      packageCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      selectedPackage = card.getAttribute('data-package-card');
      calculate();
    });
  });

  if (lubeTypeSelect) {
    lubeTypeSelect.addEventListener('change', (e) => {
      selectedLubeType = e.target.value;
      calculate();
    });
  }

  stabsCards.forEach(card => {
    card.addEventListener('click', () => {
      stabsCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      selectedStabs = card.getAttribute('data-stabs-card');
      calculate();
    });
  });

  if (holeeCheck) {
    holeeCheck.addEventListener('change', (e) => {
      holeeModActive = e.target.checked;
      calculate();
    });
  }

  if (bandaidCheck) {
    bandaidCheck.addEventListener('change', (e) => {
      bandaidModActive = e.target.checked;
      calculate();
    });
  }

  if (desolderCheck) {
    desolderCheck.addEventListener('change', (e) => {
      desolderActive = e.target.checked;
      calculate();
    });
  }

  calculate();

  const orderForm = document.getElementById('preorder-form');
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const customerName = document.getElementById('cust-name').value.trim();
      const customerPhone = document.getElementById('cust-phone').value.trim();
      const customerCity = document.getElementById('cust-city').value.trim();
      const switchModel = document.getElementById('cust-switch-model').value.trim();
      const keyboardModel = document.getElementById('cust-keyboard-model').value.trim();
      const notes = document.getElementById('cust-notes').value.trim();

      if (!customerName || !customerPhone || !switchModel) {
        alert("Mohon lengkapi Nama, No WhatsApp, dan Merk/Tipe Switch Anda.");
        return;
      }

      const orderData = calculate();
      const waNumber = config.whatsappNumber || "6285722333327";

      const message = `Halo Admin *ThocKeebs*! 👋
Saya ingin booking slot *PRE-ORDER JASA LUBE & TUNING*:

📋 *DATA PEMESAN:*
• Nama: ${customerName}
• WhatsApp: ${customerPhone}
• Kota / Ekspedisi: ${customerCity || '-'}

⌨️ *DETAIL KEYBOARD:*
• Tipe Switch: ${switchModel}
• Tipe Keyboard: ${keyboardModel || '-'}

🛠️ *RINCIAN PAKET PRE-ORDER:*
• Jumlah Switch: *${orderData.switchCount} pcs*
• Paket Lube: *${orderData.packageName}* (@ Rp ${orderData.ratePerSwitch.toLocaleString('id-ID')})
• Pilihan Formula: *${orderData.selectedLubeType}*
• Tuning Stabilizer: *${orderData.stabsName}* (Rp ${orderData.stabsPrice.toLocaleString('id-ID')})
${orderData.addonNames.length > 0 ? `• Extra Mod: *${orderData.addonNames.join(', ')}* (Rp ${orderData.addonsTotal.toLocaleString('id-ID')})\n` : ''}• Estimasi Waktu: *${orderData.etaString}*

💰 *TOTAL ESTIMASI:* *Rp ${orderData.grandTotal.toLocaleString('id-ID')}*

📝 *Catatan Tambahan:*
"${notes || 'Mohon dikerjakan rapi ya gan!'}"

Mohon info ketersediaan slot batch dan alamat pengiriman ke workshop ThocKeebs ya. Terima kasih! 🙏`;

      const encodedMsg = encodeURIComponent(message);
      const waUrl = `https://wa.me/${waNumber}?text=${encodedMsg}`;

      if (typeof confetti === 'function') {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      showToast("Formulir siap! Mengalihkan ke WhatsApp...");
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 600);
    });
  }
}

/* ==========================================================================
   5. 1-Click Shipping Address Copier
   ========================================================================== */
function initAddressCopier() {
  const copyBtn = document.getElementById('copy-address-btn');
  const addressText = document.getElementById('shipping-address-text');

  if (copyBtn && addressText) {
    copyBtn.addEventListener('click', () => {
      const textToCopy = addressText.innerText;
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast("Format label pengiriman berhasil disalin ke clipboard!");
      }).catch(() => {
        showToast("Alamat berhasil disalin.");
      });
    });
  }
}

/* ==========================================================================
   6. Catalog Modal (Catalog.png Lightbox)
   ========================================================================== */
function initCatalogModal() {
  const openBtn = document.getElementById('open-catalog-modal');
  const closeBtn = document.getElementById('close-catalog-modal');
  const modal = document.getElementById('catalog-modal');

  if (openBtn && modal) {
    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  }

  function closeModal() {
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
      closeModal();
    }
  });
}

/* ==========================================================================
   Toast Notification System
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('thoc-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'thoc-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 300;
      background-color: #171717;
      color: #fff;
      border: 1px solid var(--biip-border, #2e2e2f);
      padding: 0.85rem 1.5rem;
      border-radius: 9999px;
      font-family: var(--font-mono, monospace);
      font-size: 0.8125rem;
      box-shadow: 0 10px 30px rgba(0,0,0,0.7);
      transition: opacity 0.3s ease, transform 0.3s ease;
      opacity: 0;
      transform: translateY(10px);
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
  }, 3200);
}
