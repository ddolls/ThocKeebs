/**
 * ThocKeebs - Website Configuration
 * Kamu bisa mengubah nomor WhatsApp, harga jasa, status batch, alamat workshop, dan data antrean di sini!
 */

const THOC_CONFIG = {
  // Informasi Toko
  shopName: "ThocKeebs",
  tagline: "Upgrade Keyboard Anda, Rasakan Perbedaannya.",
  description: "Layanan Jasa Lube Switch & Tuning Stabilizer Mechanical Keyboard Profesional. Menghadirkan feel super smooth dan suara Thock maksimal.",
  
  // Kontak WhatsApp Admin (Format angka tanpa '+' atau spasi, contoh: '6285722333327')
  whatsappNumber: "6285722333327", 
  adminName: "Admin ThocKeebs",
  
  // Lokasi & Alamat Pengiriman Workshop (Tampil di bagian Alamat Kirim & Tombol Salin Label)
  shippingAddress: {
    receiverName: "Workshop ThocKeebs (Admin Lube)",
    phone: "0857-2233-3327",
    city: "Jakarta Selatan, DKI Jakarta",
    fullAddress: "Jl. Tebet Barat Raya No. 42B, RT.05/RW.02, Tebet Barat, Kec. Tebet, Kota Jakarta Selatan, DKI Jakarta 12810",
    benchmarkNotes: "Depan Minimarket Indomaret Tebet Barat, pagar hitam bertuliskan ThocKeebs Lab."
  },
  
  expeditionSupported: ["JNE", "J&T", "SiCepat", "GoSend (Sameday/Instant)", "GrabExpress", "Paxel"],
  
  // Status Pre-Order Batch
  batchInfo: {
    batchNumber: "Batch #14",
    statusBadge: "PRE-ORDER TERBUKA",
    slotsRemaining: 6,
    totalSlots: 10,
    etaStandard: "0.5 - 1 Hari (< 100 pcs)",
    etaBulk: "1 - 2 Hari (> 100 pcs)"
  },

  // Daftar Harga Jasa (dalam Rupiah)
  pricing: {
    // Switch Lubing
    switchLubeStandard: 2000,      // Rp 2.000 / pcs (Sesuai Katalog resmi)
    switchLubeFilm: 2800,          // Rp 2.800 / pcs (Lube + Switch Film)
    switchLubeFullMod: 3500,       // Rp 3.500 / pcs (Lube + Film + Spring Swap)
    
    // Stabilizer Tuning
    stabsPlateMount: 35000,        // 1 Board Fullset Plate-Mount Stabs (Wire balancing + Lube)
    stabsPerWire: 8000,            // Per-wire stabilizer tuning
    
    // Add-on Mods
    holeeModAddon: 10000,          // Holee Mod Fullset (Porous tape / Teflon)
    bandaidPcbMod: 8000,           // Band-Aid Mod / Pad di PCB
    desolderPerSwitch: 1500        // Jasa Desolder per switch (khusus non-hotswap)
  },

  // Database Antrean Pre-Order Demo (Pelanggan bisa cek status dengan ID ini atau No WA)
  sampleQueue: [
    {
      orderId: "THOC-1041",
      customerName: "Dimas Arya",
      phoneTail: "8123",
      switchModel: "Gateron Milky Yellow Pro (70 pcs)",
      packageName: "Lube Standar (Krytox 205g0) + Holee Mod Stabs",
      statusStep: 4, // 1: Booking Diterima, 2: Tiba di Lab, 3: Lubing Progress, 4: Sound Test & QC, 5: Selesai
      statusText: "Sound Test & QC Passed",
      notes: "Suara Thock sangat deep, video sound test telah dikirimkan via WA.",
      eta: "Siap kirim sore ini"
    },
    {
      orderId: "THOC-1042",
      customerName: "Rian Pratama",
      phoneTail: "7762",
      switchModel: "Vertex V1 (90 pcs)",
      packageName: "Lube + Deskeys Film + Plate-Mount Stabs",
      statusStep: 3,
      statusText: "Sedang Dikerjakan (Lubing & Filming)",
      notes: "Proses pengerjaan stem dan housing rails.",
      eta: "Selesai besok siang"
    },
    {
      orderId: "THOC-1043",
      customerName: "Kevin Wijaya",
      phoneTail: "4490",
      switchModel: "Akko Cream Yellow V3 (68 pcs)",
      packageName: "Lube Standar + Plate Stabs Mod",
      statusStep: 2,
      statusText: "Paket Tiba di Workshop",
      notes: "Switch telah diterima dan lolos verifikasi jumlah switch.",
      eta: "Masuk antrean pengerjaan malam ini"
    }
  ],

  // Google Apps Script API endpoint untuk data katalog works otomatis
  worksSheetApi: "https://script.google.com/macros/s/AKfycby-lUbeLyTLZQyMU4ZRaw0GNdfuHV4SYyg4-4ZBk8_zzmlvVmAIF44M1Ge9ea9LBGFe/exec",

  // Akun Sosial Media & Marketplace
  socials: {
    instagram: "https://instagram.com/thockeebs",
    instagramHandle: "@thockeebs",
    tiktok: "https://www.tiktok.com/@thockkeebsofficial",
    tiktokHandle: "@thockkeebsofficial",
    tokopedia: "https://tokopedia.com/thockeebs",
    shopee: "https://shopee.co.id/thockeebs"
  }
};

// Export jika dipakai dalam environment module
if (typeof module !== "undefined" && module.exports) {
  module.exports = THOC_CONFIG;
}
