/**
 * =========================================================================
 * THOCKEEBS - GOOGLE APPS SCRIPT (WORKS & KATALOG ENGINE)
 * =========================================================================
 * Script ini otomatis membaca data spreadsheet tab "Katalog Web", fleksibel
 * terhadap posisi kolom (mendeteksi berdasarkan nama Header), dan otomatis:
 * 1. Mengambil 'Type' dari Kolom Type (jika kosong atau '-', otomatis fallback ke Tuning Specs).
 * 2. Memisahkan 'Date / Location' (contoh: "November, 9 2026 / Bandung, Indonesia")
 *    atau mengambil dari kolom 'Location' jika dibuat terpisah.
 * 3. Otomatis cek centang checkbox Publish (TRUE).
 *
 * CARA UPDATE DI GOOGLE APPS SCRIPT:
 * 1. Buka script.google.com project ThocKeebs kamu.
 * 2. Hapus seluruh isi Code.gs lama, paste kode ini semua.
 * 3. Tekan Simpan (Ctrl + S).
 * 4. Klik "Deploy" (Terapkan) -> "Manage deployments" (Kelola deployment).
 * 5. Klik ikon Pensil ✏️ (Edit) -> Pada "Version", pilih "New version" (Versi baru).
 * 6. Klik "Deploy".
 * =========================================================================
 */

function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    // Prioritaskan sheet bernama 'Katalog Web', atau pakai sheet aktif pertama jika tidak ada
    const sheet = ss.getSheetByName("Katalog Web") || ss.getActiveSheet();
    const data = sheet.getDataRange().getValues();

    if (!data || data.length < 2) {
      return responseJSON([]);
    }

    // Header ada di baris 1 (index 0)
    const rawHeaders = data[0];
    const headers = rawHeaders.map(h => String(h || "").trim().toLowerCase());

    // Helper pencari index kolom otomatis berbasis kata kunci
    const findCol = (keywords, defaultIdx) => {
      for (let i = 0; i < headers.length; i++) {
        for (let kw of keywords) {
          if (headers[i].includes(kw)) return i;
        }
      }
      return defaultIdx;
    };

    const idxTitle = findCol(["judul", "title", "project name", "nama"], 0);
    const idxSpecs = findCol(["tuning", "spec", "build", "detail"], 1);
    const idxType = findCol(["type", "tipe", "kategori", "category"], -1);
    const idxStatus = findCol(["status"], 2);
    const idxDate = findCol(["date", "tanggal", "year", "tahun"], 3);
    const idxLocation = findCol(["location", "lokasi", "kota", "city"], -1);
    const idxThumbnail = findCol(["thumbnail", "foto", "photo", "image", "gambar", "url"], 4);
    const idxPublish = findCol(["publish", "publikasi", "centang", "tampil", "show"], headers.length - 1);

    const results = [];

    // Loop data dari baris ke-2 (index 1) sampai selesai
    for (let r = 1; r < data.length; r++) {
      const row = data[r];
      const title = String(row[idxTitle] || "").trim();

      // Lewati baris jika judul kosong
      if (!title) continue;

      // Cek apakah dicentang Publish (TRUE)
      const publishVal = idxPublish >= 0 ? row[idxPublish] : true;
      const isPublish = publishVal === true || String(publishVal).trim().toUpperCase() === "TRUE";

      if (!isPublish) continue;

      // Specs
      const specs = idxSpecs >= 0 ? String(row[idxSpecs] || "").trim() : "";

      // Type: Jika kolom Type ada isinya dan bukan '-', pakai itu.
      // Kalau kosong atau '-', otomatis fallback ke Specs!
      let typeVal = idxType >= 0 ? String(row[idxType] || "").trim() : "";
      if (!typeVal || typeVal === "-") {
        typeVal = specs || "Lube Switch, Stab and Modding";
      }

      // Date & Location
      let rawDateLoc = idxDate >= 0 ? String(row[idxDate] || "").trim() : "";
      let dateVal = rawDateLoc;
      let locVal = "Bandung, Indonesia";

      // Jika ada kolom Location tersendiri:
      if (idxLocation >= 0 && row[idxLocation] && String(row[idxLocation]).trim() !== "-") {
        locVal = String(row[idxLocation]).trim();
      } else if (rawDateLoc.includes("/")) {
        // Jika formatnya digabung dengan slash, misal: "November, 9 2026 / Bandung, Indonesia"
        const parts = rawDateLoc.split("/");
        dateVal = parts[0].trim();
        if (parts[1] && parts[1].trim() && parts[1].trim() !== "-") {
          locVal = parts[1].trim();
        }
      }

      const statusVal = idxStatus >= 0 ? String(row[idxStatus] || "Finished").trim() : "Finished";
      const thumbVal = idxThumbnail >= 0 ? String(row[idxThumbnail] || "").trim() : "";

      results.push({
        title: title,
        specs: specs,
        type: typeVal,
        status: statusVal || "Finished",
        date: dateVal || "November 2026",
        location: locVal || "Bandung, Indonesia",
        thumbnail: thumbVal
      });
    }

    return responseJSON(results);
  } catch (err) {
    return responseJSON({ error: err.toString() });
  }
}

function responseJSON(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
