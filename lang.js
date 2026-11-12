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
    'nav.drivers': { en: 'Drivers', id: 'Drivers' },
    'nav.anatomy': { en: 'Anatomy', id: 'Anatomy' },
    'nav.order': { en: 'Order', id: 'Order' },
    'nav.about': { en: 'About', id: 'About' },
    'nav.location': { en: 'Bandung, Indonesia.', id: 'Bandung, Indonesia.' },

    // --- Footer ---
    'footer.info': { en: 'Info', id: 'Info' },
    'footer.social': { en: 'Social', id: 'Social' },
    'footer.drivers': { en: 'Web Drivers', id: 'Web Drivers' },
    'footer.anatomy': { en: 'Anatomy', id: 'Anatomy' },
    'footer.rights': { en: 'ALL RIGHTS RESERVED © 2026 THOCKEEBS', id: 'ALL RIGHTS RESERVED © 2026 THOCKEEBS' },

    // --- Anatomy Page ---
    'anatomy.badge': {
      en: 'MECHANICAL KEYBOARD ARCHITECTURE • COMPONENT DISSECTION',
      id: 'ARSITEKTUR MECHANICAL KEYBOARD • PEMBEDAHAN KOMPONEN'
    },
    'anatomy.hero.title': {
      en: 'Anatomy of a Custom Mechanical Keyboard',
      id: 'Anatomy of a Custom Mechanical Keyboard'
    },
    'anatomy.hero.subtitle': {
      en: 'An architectural dissection of physical layout proportions, electrical intelligence, acoustic dampening, precision wire balancing, keycap ergonomics, and switch actuation dynamics.',
      id: 'Pembedahan arsitektur proporsi fisik keyboard, sistem sirkuit digital, isolasi getaran plat, balancing stabilizer, ergonomi ukuran keycap, dan dinamika aktuasi switch mekanikal.'
    },

    // Quick Jump Filters
    'anatomy.filter.all': { en: 'All Modules', id: 'Semua Modul' },
    'anatomy.filter.layout': { en: '02. Layout', id: '02. Layout' },
    'anatomy.filter.pcbmcu': { en: '03. PCB & MCU', id: '03. PCB & MCU' },
    'anatomy.filter.mount': { en: '04. Gasket & Plat Mount', id: '04. Gasket & Plat Mount' },
    'anatomy.filter.stab': { en: '05. Stabilizer', id: '05. Stabilizer' },
    'anatomy.filter.keycaps': { en: '06. Keycaps Size', id: '06. Keycaps Size' },
    'anatomy.filter.switches': { en: '07. Switches Type', id: '07. Switches Type' },

    // Module 02. Layout
    'anatomy.part2.layer': { en: 'MODULE 02 • PHYSICAL DIMENSIONS & ERGONOMICS', id: 'MODUL 02 • DIMENSI FISIK & ERGONOMI' },
    'anatomy.part2.title': { en: '02. Layout', id: '02. Layout' },
    'anatomy.part2.summary': {
      en: 'Explanation of physical keyboard footprints (percentage of full size / 100%). Common standards: TKL (80%), 75%, 65%, 60%, down to 40%. Keep in mind that percentage denotes physical footprint and key cluster grouping, not strictly an identical switch count.',
      id: 'Penjelasan ukuran fisik keyboard (persentase dari ukuran penuh/100%). Contoh umum: TKL (80%), 75%, 65%, 60%, hingga 40%. Perlu diingat bahwa ukuran persentase tidak selalu berarti jumlah switch yang sama persis.'
    },
    'anatomy.part2.pill1': { en: 'Full Size (100%)', id: 'Full Size (100%)' },
    'anatomy.part2.pill2': { en: 'TKL (80%)', id: 'TKL (80%)' },
    'anatomy.part2.pill3': { en: '75% Compact', id: '75% Compact' },
    'anatomy.part2.pill4': { en: '65% / 60% / 40%', id: '65% / 60% / 40%' },
    'anatomy.part2.box1_title': { en: 'Form Factor Hierarchy & Switch Count', id: 'Hierarki Form Factor & Jumlah Tombol' },
    'anatomy.part2.box1_desc': {
      en: 'The percentage naming convention represents the physical footprint relative to standard 104-key IBM Model M keyboards.',
      id: 'Istilah persentase layout mengacu pada perbandingan rasio ukuran fisik relatif terhadap keyboard standar industri 104-tombol.'
    },
    'anatomy.part2.box1_item1': {
      en: '<strong>Full Size (100%):</strong> 104–108 keys. Complete alphanumeric, function row, dedicated navigation cluster, and 10-key numeric pad. Best for financial modeling and data entry.',
      id: '<strong>Full Size (100%):</strong> 104–108 tombol. Dilengkapi Numpad dan navigation cluster lengkap untuk kebutuhan input data dan akuntansi.'
    },
    'anatomy.part2.box1_item2': {
      en: '<strong>Tenkeyless / TKL (80%):</strong> ~87 keys. Eliminates the numeric keypad to bring mouse navigation closer to the body, significantly improving shoulder posture.',
      id: '<strong>Tenkeyless / TKL (80%):</strong> ~87 tombol. Menghilangkan Numpad untuk memberikan area gerak mouse yang jauh lebih luas dan posisi tangan lebih ergonomis.'
    },
    'anatomy.part2.box1_item3': {
      en: '<strong>75% Compact:</strong> 82–84 keys. Retains dedicated F-row (F1–F12) and vertical navigation arrow column in a compressed, borderless form factor.',
      id: '<strong>75% Compact:</strong> 82–84 tombol. Mempertahankan tombol Function (F1–F12) dan navigasi vertikal dalam ukuran ringkas tanpa celah kosong.'
    },
    'anatomy.part2.box1_item4': {
      en: '<strong>65% / 60% / 40%:</strong> 67 to sub-50 keys. Minimalist footprint prioritizing desk mobility, utilizing programmable Fn layers for missing symbols.',
      id: '<strong>65% / 60% / 40%:</strong> 67 hingga sub-50 tombol. Form factor minimalis portabel yang memaksimalkan ruang meja dengan sistem layer Fn terprogram.'
    },
    'anatomy.part2.box2_title': { en: 'Ergonomic Desk Travel & Footprint', id: 'Ergonomi Meja & Efisiensi Ruang' },
    'anatomy.part2.box2_desc': {
      en: 'Choosing the right layout balances typing efficiency against mouse space and desk ergonomics.',
      id: 'Pemilihan layout menentukan keseimbangan antara efisiensi pengetikan harian dan kebebasan ruang gerak mouse.'
    },
    'anatomy.part2.box2_item1': {
      en: '<strong>Shoulder & Wrist Alignment:</strong> Compact layouts (65%–75%–TKL) keep both arms parallel within shoulder width, preventing repetitive strain injury (RSI).',
      id: '<strong>Penyelarasan Bahu & Pergelangan:</strong> Layout kompak menjaga posisi tangan tetap sejajar lebar bahu, mengurangi ketegangan otot leher dan pergelangan tangan.'
    },
    'anatomy.part2.box2_item2': {
      en: '<strong>Switch Count Discrepancies:</strong> Two 75% boards may carry 81 or 84 switches depending on knob placement and spacing blockers (Exploded vs Compact 75%).',
      id: '<strong>Variasi Jumlah Switch:</strong> Dua keyboard 75% bisa memiliki jumlah switch berbeda (81 vs 84 switch) tergantung keberadaan knob volume atau blocker pemisah.'
    },
    'anatomy.part2.note_tag': { en: 'Layout Tip', id: 'Tips Memilih Layout' },
    'anatomy.part2.note_text': {
      en: 'For coding and daily gaming, 75% and 65% layouts are widely considered the ideal sweet spot between functional muscle memory and minimal desk footprint.',
      id: 'Untuk sesi coding dan gaming harian, form factor 75% dan 65% merupakan pilihan paling seimbang antara kelengkapan tombol esensial dan keleluasaan ruang meja.'
    },

    // Module 03. PCB dan MCU
    'anatomy.part3.layer': { en: 'MODULE 03 • ELECTRONIC ARCHITECTURE & LOGIC', id: 'MODUL 03 • ARSITEKTUR ELEKTRONIK & LOGIKA' },
    'anatomy.part3.title': { en: '03. PCB dan MCU', id: '03. PCB dan MCU' },
    'anatomy.part3.summary': {
      en: 'Printed Circuit Board (PCB) as the keyboard\'s "brain" and electrical spine that translates physical switch actuations into instant digital input signals delivered to your device.',
      id: 'Printed Circuit Board sebagai "otak" keyboard yang menerjemahkan input switch menjadi sinyal ke perangkat.'
    },
    'anatomy.part3.pill1': { en: 'Microcontroller (MCU)', id: 'Microcontroller (MCU)' },
    'anatomy.part3.pill2': { en: '5-Pin Hot-Swap Sockets', id: 'Soket Hot-Swap 5-Pin' },
    'anatomy.part3.pill3': { en: 'South-Facing RGB', id: 'South-Facing RGB' },
    'anatomy.part3.pill4': { en: 'WebHID / WebUSB Drivers', id: 'Driver WebHID / WebUSB' },
    'anatomy.part3.box1_title': { en: 'Hardware Processing & Circuitry', id: 'Sirkuit & Pemrosesan Hardware' },
    'anatomy.part3.box1_desc': {
      en: 'The PCB distributes power, routes switch diode matrices, and houses the onboard microcontroller processor.',
      id: 'PCB mendistribusikan jalur daya, matriks diode anti-ghosting, dan menampung chip processor mikrokomputer.'
    },
    'anatomy.part3.box1_item1': {
      en: '<strong>Microcontroller Unit (MCU):</strong> High-speed 32-bit ARM Cortex or RP2040 chip executing switch debouncing, key matrix scanning at 1000Hz–8000Hz, and instantaneous USB report dispatch.',
      id: '<strong>Microcontroller Unit (MCU):</strong> Chip prosesor 32-bit ARM Cortex atau RP2040 berkecepatan tinggi yang memproses scan matriks 1000Hz–8000Hz dengan latensi respon instan.'
    },
    'anatomy.part3.box1_item2': {
      en: '<strong>Kailh Hot-Swap Sockets:</strong> Eliminates soldering completely. Surface-mounted copper leaf sockets allow instantaneous switch replacement rated for over 10,000 insertion cycles.',
      id: '<strong>Soket Hot-Swap Kailh:</strong> Menghilangkan kebutuhan menyolder. Kontak tembaga presisi memungkinkan penggantian switch mekanikal secara instan tanpa solder.'
    },
    'anatomy.part3.box1_item3': {
      en: '<strong>South-Facing LED Orientation:</strong> LEDs placed at the bottom edge of switch sockets to eliminate interference with Cherry profile keycap internal plastic walls.',
      id: '<strong>Orientasi South-Facing:</strong> Posisi LED di sisi bawah lubang switch menjamin tidak terjadi benturan fisik (interference) dengan dinding keycap Cherry profile.'
    },
    'anatomy.part3.box2_title': { en: 'Firmware & Web Driver Ecosystem', id: 'Ekosistem Firmware & Web Driver' },
    'anatomy.part3.box2_desc': {
      en: 'Modern custom keyboards configure layers and remap keys in real time without bulky software installers.',
      id: 'Keyboard modern memungkinkan remap tombol dan pengaturan layer secara realtime tanpa software berat.'
    },
    'anatomy.part3.box2_item1': {
      en: '<strong>WebHID / WebUSB Compatibility:</strong> Seamlessly connects to browser-based web configurators like Leobog Hi75C Pro and Weikav WK75 Web Drivers via Chrome or Edge.',
      id: '<strong>Kompatibilitas WebHID / WebUSB:</strong> Terhubung langsung dengan konfigurator web browser seperti Web Driver Leobog Hi75C Pro dan Weikav WK75.'
    },
    'anatomy.part3.box2_item2': {
      en: '<strong>Onboard EEPROM Memory:</strong> Custom keybindings, macros, and rotary encoder actions are stored directly in the keyboard\'s hardware memory across any operating system.',
      id: '<strong>Memori Internal Onboard:</strong> Semua pengaturan tombol, macro, dan fungsi knob tersimpan di hardware keyboard dan aktif di PC, Mac, maupun Linux.'
    },
    'anatomy.part3.note_tag': { en: 'PCB Safety', id: 'Keamanan PCB' },
    'anatomy.part3.note_text': {
      en: 'Always support the hot-swap socket from the back of the PCB when inserting switches with tight pins to prevent tearing solder pads.',
      id: 'Selalu tahan soket hot-swap dari sisi belakang PCB saat memasang switch baru agar pin yang melengkung tidak merusak jalur solder PCB.'
    },

    // Module 04. Gasket & Plat Mount
    'anatomy.part4.layer': { en: 'MODULE 04 • ACOUSTIC RESONANCE & MOUNTING', id: 'MODUL 04 • RESONANSI AKUSTIK & MOUNTING' },
    'anatomy.part4.title': { en: '04. Gasket & Plat Mount', id: '04. Gasket & Plat Mount' },
    'anatomy.part4.summary': {
      en: 'The switch plate holds mechanical switches perfectly straight and aligned while defining typing feel and acoustic feedback. Materials vary from rigid aluminum to flexible polycarbonate, suspended on soft isolation gaskets.',
      id: 'Penahan switch agar tetap lurus dan memberikan feedback suara/rasa ketikan tertentu. Material bervariasi dari aluminium hingga polikarbonat.'
    },
    'anatomy.part4.pill1': { en: 'Poron / Silicone Gaskets', id: 'Gasket Poron / Silikon' },
    'anatomy.part4.pill2': { en: 'Polycarbonate (PC) / POM', id: 'Polycarbonate (PC) / POM' },
    'anatomy.part4.pill3': { en: 'FR4 Epoxy Glass', id: 'FR4 Epoxy Glass' },
    'anatomy.part4.pill4': { en: 'Aluminum Plate', id: 'Plate Aluminium' },
    'anatomy.part4.box1_title': { en: 'Plate Material Physics & Sound Timbres', id: 'Fisika Material Plate & Karakter Suara' },
    'anatomy.part4.box1_desc': {
      en: 'Plate density and elastic modulus directly shape switch bottom-out vibration and acoustic pitch.',
      id: 'Elastisitas dan densitas plat menentukan pantulan benturan switch dan karakter nada ketikan.'
    },
    'anatomy.part4.box1_item1': {
      en: '<strong>Polycarbonate (PC) & POM:</strong> Flexible, low density thermoplastic. Absorbs harsh high frequencies to deliver authentic deep, bassy "thock".',
      id: '<strong>Polycarbonate (PC) & POM:</strong> Fleksibel dan empuk. Meredam nada tinggi yang menusuk telinga demi menghasilkan suara bas bulat ("deep thock").'
    },
    'anatomy.part4.box1_item2': {
      en: '<strong>FR4 (Fiberglass PCB Grade):</strong> Balanced stiffness. Produces a signature snappy, poppy acoustic profile with subtle flex.',
      id: '<strong>FR4 (Bahan Fiber PCB):</strong> Fleksibilitas seimbang. Menghadirkan karakter suara "poppy" yang garing dan konsisten di setiap tombol.'
    },
    'anatomy.part4.box1_item3': {
      en: '<strong>Aluminum & Brass:</strong> High rigidity metal plates. Delivers instant tactile feedback and bright, crisp high-pitched "clack".',
      id: '<strong>Aluminium & Brass:</strong> Kaku dan padat. Memberikan konfirmasi sentuhan cepat dengan suara ketukan "clack" yang nyaring dan renyah.'
    },
    'anatomy.part4.box2_title': { en: 'Gasket Isolation Mount System', id: 'Sistem Isolasi Gasket Mount' },
    'anatomy.part4.box2_desc': {
      en: 'Gasket structures eliminate metal-to-metal contact between the plate assembly and outer chassis.',
      id: 'Struktur gasket mengisolasi kontak fisik langsung antara susunan plate dengan rangka case luar.'
    },
    'anatomy.part4.box2_item1': {
      en: '<strong>Vibration Dampening:</strong> Soft poron foam or molded silicone socks cradle the plate tabs, swallowing kinetic typing shock waves before they reach the desk.',
      id: '<strong>Peredaman Getaran:</strong> Bantalan poron atau silikon menahan plat keyboard, menyerap kejutan kinetik agar tidak merambat ke meja kerja.'
    },
    'anatomy.part4.box2_item2': {
      en: '<strong>Uniform Typing Cushion:</strong> Provides consistent, fatigue-free keystroke bounce across all quadrants of the keyboard without rigid edge stiffness.',
      id: '<strong>Rasa Ketik Empuk & Seragam:</strong> Memberikan pantulan ketikan yang nyaman dan konsisten di bagian tengah maupun sudut keyboard tanpa rasa kaku.'
    },
    'anatomy.part4.note_tag': { en: 'Tuning Advice', id: 'Saran Tuning' },
    'anatomy.part4.note_text': {
      en: 'Combine a PC plate with gasket mounting and lubed linear switches to achieve the deepest bass thock signature possible.',
      id: 'Padukan plat Polycarbonate (PC) dengan sistem Gasket Mount dan switch linear berpelumas Krytox untuk karakter deep thock paling maksimal.'
    },

    // Module 05. Stabilizer
    'anatomy.part5.layer': { en: 'MODULE 05 • MECHANICAL BALANCING & ANTI-RATTLE', id: 'MODUL 05 • MEKANIKAL BALANCING & ANTI-RATTLE' },
    'anatomy.part5.title': { en: '05. Stabilizer', id: '05. Stabilizer' },
    'anatomy.part5.summary': {
      en: 'Component engineered to stabilize oversized keys (such as Spacebar or Enter) preventing wobble and rattle when pressed off-center.',
      id: 'Komponen untuk menstabilkan tombol besar (seperti Spacebar atau Enter) agar tidak goyang saat ditekan.'
    },
    'anatomy.part5.pill1': { en: 'PCB Screw-In Mount', id: 'PCB Screw-In Mount' },
    'anatomy.part5.pill2': { en: 'Wire Balancing (0.00mm)', id: 'Wire Balancing (0.00mm)' },
    'anatomy.part5.pill3': { en: 'Krytox XHT-BDZ & 205g0', id: 'Krytox XHT-BDZ & 205g0' },
    'anatomy.part5.pill4': { en: 'Anti-Rattle Holee Mod', id: 'Anti-Rattle Holee Mod' },
    'anatomy.part5.box1_title': { en: 'The Mechanics of Large Key Travel', id: 'Mekanika Keseimbangan Tombol Lebar' },
    'anatomy.part5.box1_desc': {
      en: 'Without a stabilizer, pressing the edge of a 6.25u spacebar would tilt the keycap and jam the switch stem.',
      id: 'Tanpa stabilizer, menekan pinggir tombol Spacebar 6.25u akan membuat keycap miring dan macet saat turun.'
    },
    'anatomy.part5.box1_item1': {
      en: '<strong>Torsion Steel Wire:</strong> Transmits downward force simultaneously to both ends of the keycap, keeping key travel perfectly parallel and level.',
      id: '<strong>Kawat Baja Torsi:</strong> Menyalurkan gaya tekan ke kedua sisi tombol secara serentak sehingga pergerakan keycap selalu sejajar sempurna.'
    },
    'anatomy.part5.box1_item2': {
      en: '<strong>PCB Screw-In Architecture:</strong> Fastens securely to the PCB with steel screws, eliminating play and housing lift common in loose clip-in stabilizers.',
      id: '<strong>Konstruksi Screw-In PCB:</strong> Dibaut kokoh langsung ke substrat PCB, mencegah housing terangkat atau oblak saat tombol ditekan cepat.'
    },
    'anatomy.part5.box2_title': { en: 'ThocKeebs Precision Anti-Rattle Tuning', id: 'Protokol Tuning Anti-Rattle ThocKeebs' },
    'anatomy.part5.box2_desc': {
      en: 'Every stabilizer tuned at ThocKeebs undergoes a multi-stage acoustic silencing treatment.',
      id: 'Setiap stabilizer di bengkel ThocKeebs melalui tahapan modifikasi presisi bebas rattle.'
    },
    'anatomy.part5.box2_item1': {
      en: '<strong>Optical Wire Balancing:</strong> Straightening steel wires against precision ceramic flat surfaces until zero tick or light gap remains.',
      id: '<strong>Wire Balancing Kaca Optik:</strong> Meluruskan kawat baja di atas permukaan kaca/keramik optik datar hingga deviasi 0.00mm tanpa celah.'
    },
    'anatomy.part5.box2_item2': {
      en: '<strong>Krytox XHT-BDZ Formulation:</strong> Applying high-viscosity fluorinated PFPE grease to coat wire contact bends, permanently silencing metal-on-plastic chatter.',
      id: '<strong>Grease Krytox XHT-BDZ:</strong> Melumasi tekukan kawat dengan pelumas berdensitas tinggi untuk membungkam gesekan metal dengan plastik selamanya.'
    },
    'anatomy.part5.box2_item3': {
      en: '<strong>Stem Holee Mod:</strong> Dampening internal slider channels with precision teflon strips for solid, cushioned bottom-outs.',
      id: '<strong>Holee Mod:</strong> Memasang lapisan micropore teflon pada rongga stem slider untuk meredam benturan kawat.'
    },
    'anatomy.part5.note_tag': { en: 'Studio Rule', id: 'Standar ThocKeebs' },
    'anatomy.part5.note_text': {
      en: 'A keyboard is only as good as its spacebar. Zero rattle, zero ticking, and solid acoustic thock on all 2u+ keys is our hallmark promise.',
      id: 'Kualitas sebuah keyboard ditentukan oleh kestabilan tombol Spacebar-nya. Bebas rattle, tanpa suara kawat berisik, dan berkarakter thock empuk adalah komitmen utama ThocKeebs.'
    },

    // Module 06. Keycaps Size
    'anatomy.part6.layer': { en: 'MODULE 06 • KEYCAP PROFILES & "U" METRICS', id: 'MODUL 06 • PROFIL KEYCAP & METRIK "U"' },
    'anatomy.part6.title': { en: '06. Keycaps Size', id: '06. Keycaps Size' },
    'anatomy.part6.summary': {
      en: 'Explanation of the "u" (unit) metric used to measure keycap dimensions. Standard alphanumeric keys measure 1u, and any key 2u or wider requires dedicated stabilizers.',
      id: 'Penjelasan istilah "u" (unit) untuk mengukur panjang keycap. Tombol standar adalah 1u, dan kunci 2u ke atas memerlukan stabilizer.'
    },
    'anatomy.part6.pill1': { en: '1u Standard Alpha (19.05mm)', id: 'Standar 1u (19.05mm)' },
    'anatomy.part6.pill2': { en: '2u+ Requires Stabilizer', id: '2u+ Wajib Stabilizer' },
    'anatomy.part6.pill3': { en: '6.25u / 7u Spacebars', id: 'Spacebar 6.25u / 7u' },
    'anatomy.part6.pill4': { en: 'PBT Double-Shot 1.6mm', id: 'PBT Double-Shot 1.6mm' },
    'anatomy.part6.box1_title': { en: 'Understanding the "u" Sizing Scale', id: 'Memahami Standar Ukuran Satuan "u"' },
    'anatomy.part6.box1_desc': {
      en: 'In keyboard engineering, keycap dimensions are calculated using the universal unit "u" (equal to exactly 19.05 mm or 0.75 inches).',
      id: 'Dalam arsitektur keyboard, panjang keycap dihitung menggunakan satuan universal "u" (tepat 19.05 mm atau 0.75 inci).'
    },
    'anatomy.part6.box1_item1': {
      en: '<strong>1u Standard Alpha:</strong> The baseline square dimension of standard letters, numbers, and top function keys.',
      id: '<strong>Tombol Standar 1u:</strong> Ukuran dasar bujur sangkar untuk tombol huruf (A-Z), angka, dan baris Function atas.'
    },
    'anatomy.part6.box1_item2': {
      en: '<strong>Modifier Multiples:</strong> Tab (1.5u), Caps Lock (1.75u), Backspace (2u), Enter (2.25u), Left Shift (2.25u), and Right Shift (2.75u / 1.75u compact).',
      id: '<strong>Ukuran Tombol Modifier:</strong> Tab (1.5u), Caps Lock (1.75u), Backspace (2u), Enter (2.25u), Left Shift (2.25u), dan Right Shift (2.75u / 1.75u).'
    },
    'anatomy.part6.box1_item3': {
      en: '<strong>Spacebars (6.25u vs 7u):</strong> Standard ANSI keyboards utilize 6.25u spacebars; custom vintage-style Tsangan layouts use 7u spacebars with symmetrical 1.5u bottom modifiers.',
      id: '<strong>Spacebar (6.25u vs 7u):</strong> Standar ANSI modern umumnya menggunakan 6.25u, sedangkan layout Tsangan custom menggunakan bilah 7u.'
    },
    'anatomy.part6.box2_title': { en: 'Material Density & Acoustic Chamber Walls', id: 'Densitas Material & Ruang Akustik' },
    'anatomy.part6.box2_desc': {
      en: 'The cavity beneath keycaps acts as an acoustic resonance chamber that tunes the switch bottom-out pitch.',
      id: 'Rongga hampa di bawah keycap bertindak sebagai soundbox akustik yang membentuk nada suara ketukan.'
    },
    'anatomy.part6.box2_item1': {
      en: '<strong>PBT vs ABS Density:</strong> PBT polymer provides dense, textured matte grip resistant to finger shine, producing warm bass tones. ABS delivers vibrant saturation with crisp clack.',
      id: '<strong>PBT vs ABS:</strong> Bahan PBT memiliki tekstur matte tahan minyak dan menghasilkan suara bas berbobot, sedangkan ABS menghasilkan warna cerah dengan karakter suara nyaring.'
    },
    'anatomy.part6.box2_item2': {
      en: '<strong>1.5mm - 1.7mm Wall Thickness:</strong> Heavy-walled keycaps eliminate hollow echo, ensuring every keystroke lands with an authoritative solid thock.',
      id: '<strong>Ketebalan Dinding 1.5mm - 1.7mm:</strong> Dinding keycap tebal mencegah gema plastik kopong, memastikan ketukan terasa padat dan berbobot.'
    },
    'anatomy.part6.note_tag': { en: 'Stabilizer Rule', id: 'Aturan Stabilizer' },
    'anatomy.part6.note_text': {
      en: 'Remember: Any keycap measuring 2u or larger (Backspace, Enter, Shift, Spacebar, Numpad 0) must have a stabilizer underneath to prevent tilt.',
      id: 'Perlu diingat: Setiap tombol dengan panjang 2u atau lebih (Backspace, Enter, Shift, Spacebar) wajib ditopang stabilizer agar tidak oleng.'
    },

    // Module 07. Switches Type
    'anatomy.part7.layer': { en: 'MODULE 07 • SWITCH ACTUATION & PIN ARCHITECTURE', id: 'MODUL 07 • AKTUASI SWITCH & STRUKTUR PIN' },
    'anatomy.part7.title': { en: '07. Switches Type', id: '07. Switches Type' },
    'anatomy.part7.summary': {
      en: 'Explanation of the three primary mechanical switch types: Linear (smooth), Tactile (distinct tactile bump), and Clicky (audible mechanical click). Also covering the crucial difference between 3-pin and 5-pin switches.',
      id: 'Penjelasan tiga tipe utama: Linear (halus), Tactile (ada bump), dan Clicky (ada suara klik). Juga dibahas perbedaan switch 3-pin dan 5-pin.'
    },
    'anatomy.part7.pill1': { en: 'Linear / Tactile / Clicky', id: 'Linear / Tactile / Clicky' },
    'anatomy.part7.pill2': { en: '3-Pin vs 5-Pin PCB Mount', id: 'Perbedaan 3-Pin vs 5-Pin' },
    'anatomy.part7.pill3': { en: 'Krytox Brush Lubed', id: 'Krytox Brush Lubed' },
    'anatomy.part7.pill4': { en: 'Long Pole Bottom-Out', id: 'Long Pole Bottom-Out' },
    'anatomy.part7.box1_title': { en: 'Three Primary Actuation Curves', id: 'Tiga Karakteristik Utama Gerakan Switch' },
    'anatomy.part7.box1_desc': {
      en: 'Mechanical switches differ in how their internal stem interacts with the electrical contact leaf.',
      id: 'Switch mekanikal dibedakan berdasarkan interaksi batang stem dengan daun kontak tembaga di dalamnya.'
    },
    'anatomy.part7.box1_item1': {
      en: '<strong>Linear (Smooth):</strong> Uninterrupted vertical travel from top to bottom. Buttery smooth, fast response, and deeply preferred for gaming and acoustic thock.',
      id: '<strong>Linear (Halus Mulus):</strong> Gerakan lurus tanpa hambatan dari awal tekan hingga dasar. Sangat disukai gamer dan penggemar sensasi ketikan empuk.'
    },
    'anatomy.part7.box1_item2': {
      en: '<strong>Tactile (Bump Feedback):</strong> Features a engineered physical bump at the actuation point, giving tactile confirmation without loud auditory clicks.',
      id: '<strong>Tactile (Ada Bump):</strong> Memiliki tonjolan halus di titik aktuasi, memberi umpan balik sentuhan yang presisi untuk mengetik cepat tanpa bising.'
    },
    'anatomy.part7.box1_item3': {
      en: '<strong>Clicky (Audible Snap):</strong> Incorporates a click jacket or spring click-bar that emits a crisp, loud mechanical snap simultaneously with key actuation.',
      id: '<strong>Clicky (Suara Klik Renyah):</strong> Dilengkapi mekanisme click jacket atau click-bar yang menghasilkan suara klik mekanikal nyaring saat ditekan.'
    },
    'anatomy.part7.box2_title': { en: '3-Pin vs 5-Pin Mounting Architecture', id: 'Perbedaan Switch 3-Pin vs 5-Pin' },
    'anatomy.part7.box2_desc': {
      en: 'The number of pins on the switch base dictates structural alignment and PCB compatibility.',
      id: 'Jumlah pin pada dasar switch menentukan kestabilan kelurusan switch pada papan PCB.'
    },
    'anatomy.part7.box2_item1': {
      en: '<strong>3-Pin (Plate-Mounted):</strong> Features 1 center alignment post and 2 metal electrical contact pins. Relies on the switch plate for alignment.',
      id: '<strong>3-Pin (Plate-Mounted):</strong> Memiliki 1 tiang tengah plastik dan 2 pin kontak tembaga. Mengandalkan lubang plat keyboard agar switch terpasang lurus.'
    },
    'anatomy.part7.box2_item2': {
      en: '<strong>5-Pin (PCB-Mounted):</strong> Adds 2 extra plastic stabilizing legs that insert directly into PCB holes, ensuring perfect 90° alignment and preventing switch crookedness.',
      id: '<strong>5-Pin (PCB-Mounted):</strong> Memiliki 2 kaki pemandu plastik ekstra yang menancap ke lubang PCB, menjamin switch berdiri tegak lurus sempurna tanpa miring.'
    },
    'anatomy.part7.note_tag': { en: 'Studio Lubing', id: 'Pelumasan Krytox' },
    'anatomy.part7.note_text': {
      en: 'Hand-lubing linear switches with Krytox GPL 205g0 eliminates scratchiness and spring ping, unlocking the signature buttery feel and deep acoustic profile.',
      id: 'Pelumasan manual dengan Krytox GPL 205g0 pada stem rails dan bottom housing menghilangkan rasa gesekan kasar (scratchiness), menghasilkan ketukan buttery-smooth yang tenang.'
    },

    // Anatomy CTA
    'anatomy.cta.title': {
      en: 'Ready to Tune or Build Your Custom Keyboard?',
      id: 'Siap Men-tuning atau Merakit Keyboard Custom Anda?'
    },
    'anatomy.cta.desc': {
      en: 'Send your keyboard or loose switches to ThocKeebs Studio in Bandung for precision hand-lubing with Krytox, wire balancing on ceramic surfaces, and acoustic optimization.',
      id: 'Kirimkan keyboard atau switch lepasan Anda ke ThocKeebs Studio di Bandung untuk pelumasan presisi Krytox, balancing stabilizer di atas kaca/keramik datar, dan tuning akustik maksimal.'
    },
    'anatomy.cta.order': {
      en: 'Configure Custom Order →',
      id: 'Konfigurasi Order Tuning →'
    },
    'anatomy.cta.works': {
      en: 'Explore Past Works →',
      id: 'Lihat Portfolio Hasil Build →'
    },

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
