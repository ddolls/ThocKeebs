# ⌨️ ThocKeebs — Studio & Tuning Mechanical Keyboard

Website resmi **ThocKeebs**, studio tuning mechanical keyboard berdedikasi yang berbasis di **Bandung, Indonesia**. Website ini mengadopsi estetika minimalis modern, tipografi monospaced presisi (*Space Grotesk* & *IBM Plex Mono*), serta layout responsif yang dioptimalkan untuk desktop, tablet, dan smartphone.

---

## ✨ Fitur Utama

1. **🎨 Dual Theme (Dark & Light Mode)**:
   - Dukungan Dark Mode dan Light Mode instan dengan transisi halus dan status tema tersimpan otomatis di `localStorage`.
2. **🌐 Multi-Language (EN & ID)**:
   - Dropdown toggle switch bahasa Inggris (`EN`) dan Indonesia (`ID`).
   - Deteksi bahasa otomatis berdasarkan browser / zona wilayah pengunjung (default Indonesia untuk pengunjung lokal, English untuk mancanegara).
   - Istilah tuning keyboard tetap dipertahankan secara profesional (e.g. *Switch*, *Keycaps*, *Stabilizer*, *Lube*, *Holee Mod*).
3. **🛒 Interactive Order & Pre-Order Builder (`order.html`)**:
   - Kalkulator estimasi biaya jasa lubing switch, stabilizer tuning, dan extra modding secara live.
   - Pilihan formula lube standar (Krytox GPL 205g0 & GPL 105) dan Holee Mod anti-rattle.
   - Tombol booking otomatis terintegrasi langsung ke WhatsApp Admin (`085722333327`) dengan format pesan rapi dan rincian total biaya.
4. **💼 Works Showcase (`works.html`)**:
   - Tampilan katalog proyek terselesaikan dengan header kolom terstruktur (*Project Name*, *Status*, *Date*) yang sejajar 1:1 di semua ukuran layar.
   - Link langsung ke showcase proyek dan dokumentasi video (TikTok / Instagram).
5. **📱 Mobile & Tablet Responsive Floating Dock**:
   - Navigasi floating bar di bagian bawah layar untuk pengalaman browsing mobile yang ergonomis dan elegan.
   - Dropup menu bahasa yang mudah dijangkau di perangkat layar sentuh.

---

## 📂 Struktur Proyek

```text
ThocKeebs/
├── index.html              # Halaman utama / Home
├── works.html              # Portofolio / Katalog Proyek
├── works-project-1.html    # Detail proyek #1
├── works-project-2.html    # Detail proyek #2
├── order.html              # Halaman Kalkulator Order & Booking WhatsApp
├── about.html              # Profil Studio & Keahlian
├── contact.html            # Halaman Kontak & FAQ
├── style.css               # Styling global, tema, responsivitas, dan floating dock
├── app.js                  # Logika interaktif order builder & estimasi harga
├── lang.js                 # Dictionary i18n & logic switch bahasa EN/ID
├── config.js               # Konfigurasi data studio, harga, dan nomor WhatsApp
├── server.js               # Development server lokal
└── Photo/                  # Direktori aset foto & showcase proyek
```

---

## 🚀 Menjalankan Secara Lokal

Bisa langsung buka file `index.html` di browser favoritmu, atau jalankan server lokal:

```bash
# Menggunakan Node.js
node server.js

# Atau menggunakan Python
python -m http.server 3000

# Atau menggunakan npx serve
npx serve .
```

Buka `http://localhost:3000` di web browser.

---

## 👨‍💻 Author & Credits

- **Studio**: ThocKeebs Bandung, Indonesia
- **WhatsApp Admin**: 085722333327
- **Inspirasi Desain**: Biip Studio
