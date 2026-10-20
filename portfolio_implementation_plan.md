# Rencana Implementasi: Web Portofolio Interaktif Aldy Oktaviano

Dokumen ini merinci rancangan teknis dan langkah pembangunan web portofolio personal untuk **Aldy Oktaviano** pada domain **`aldyokta.my.id`** berbasis **React (Vite) + Tailwind CSS + Framer Motion + HTML5 Canvas Interactive Dot Grid**.

---

## 1. Goal Description

Membangun web portofolio modern berskala profesional dengan efek animasi interaktif tingkat tinggi (Hero *Interactive Dot Grid Canvas + Spotlight Glow*) yang memamerkan profil ganda Anda (**Quality Assurance Tester & Frontend/Mobile Developer**), didukung bukti proyek nyata (live demo Netlify, internal PT Tiga Serangkai, dan IoT), serta siap dideploy ke **GitHub Pages** dengan custom domain **`aldyokta.my.id`**.

---

## 2. Fitur & Komponen yang Akan Dibuat

### A. Hero Section (Ultra-Interactive & Full Animation)
1. **Interactive Canvas Dot Grid**:
   - Grid titik berbasis HTML5 Canvas yang merespons jarak kursor kursor mouse secara dinamis (*spring physics*).
   - Efek pendaran (*glow particle*) dan perbesaran titik saat didekati mouse.
   - Tetap smooth di 60 FPS dengan fallback sentuhan untuk mobile/touchscreen.
2. **Radial Spotlight Lighting**:
   - Pencahayaan aksen ambient cyan/emerald/indigo yang halus menyinari teks hero.
3. **Headline & Badges**:
   - Badge status: *"🟢 Open to Opportunities • QA Engineer & Frontend Developer"*.
   - Headline nama: **Aldy Oktaviano**.
   - Dual-CTA: Tombol unduh **Download CV** (mengunduh [CV_Aldy_Oktaviano.pdf](file:///E:/Portfolio-Aldy/CV_Aldy_Oktaviano.pdf)) dan tombol **Hubungi via WhatsApp**.

### B. Navigation & Header
- Floating responsive pill navbar (sticky dengan efek backdrop blur).
- Navigasi cepat: *About*, *Skills*, *Experience*, *Projects*, *Certifications*, *Contact*.

### C. Proyek Unggulan (Interactive Showcase Cards)
- **Movie Search & Discovery Web App** (MSIB Hacktiv8): Badge `Team Project`, link live demo langsung ke [chic-sawine-f22630.netlify.app](https://chic-sawine-f22630.netlify.app), deskripsi stack React + Axios + Tailwind + OMDb API.
- **Aksara Assistant** (PT Tiga Serangkai): Chatbot AI data kunjungan sales, Web Chat UI + Socket.io + n8n.
- **Hotel Booking Mobile App** (Hacktiv8 Batch 5): React Native cross-platform booking.
- **Hydroponic Smart Automation System** (BPVP Surakarta): IoT mikrokontroler automation.
- **Asset Management Mobile App** (PT Tiga Serangkai): React Native + Expo performance tuning.

### D. Keahlian & Tech Stack (Bento Grid Style)
- **QA & Testing**: Functional Testing, Integration Testing, UAT Support, API Testing (Postman), Playwright, Selenium, OpenProject bug tracking.
- **Frontend & Mobile**: React.js, React Native, Tailwind CSS, JavaScript ES6+, HTML5/CSS3, Vite, Expo.
- **Tools & Workflow**: Git/GitHub, CI/CD, Figma, Socket.io.

### E. Pengalaman Karier & Pendidikan (Timeline Rail)
- QA Tester di PT Tiga Serangkai Inti Corpora (Des 2025 - Sekarang)
- Project-Based Learning di BPVP Surakarta (Okt 2025)
- Mobile Developer di PT Tiga Serangkai Pustaka Mandiri (Feb 2024 - Jul 2024)
- Front End Developer di Hacktiv8 Academy (Agu 2023 - Jan 2024)
- S1 Teknik Informatika Universitas Tiga Serangkai (IPK 3.63)

### F. Sertifikasi & Kontak Langsung
- Sertifikasi resmi: BNSP, Hacktiv8, Padepokan QA, TOEFL.
- Form/Link Direct WhatsApp (`+62 896-0157-9321`) & Email (`oktavianoaldy777@gmail.com`).

### G. Konfigurasi Domain & Deployment Otomatis
- Pembuatan file `public/CNAME` berisi `aldyokta.my.id`.
- Pembuatan GitHub Actions workflow `.github/workflows/deploy.yml` untuk auto-build & deploy ke GitHub Pages.

---

## 3. User Review Required

> [!NOTE]
> Proyek akan diinisialisasi langsung di root direktori kerja [E:\Portfolio-Aldy](file:///E:/Portfolio-Aldy) menggunakan template Vite React JavaScript + Tailwind CSS + Lucide Icons + Framer Motion. File [CV_Aldy_Oktaviano.pdf](file:///E:/Portfolio-Aldy/CV_Aldy_Oktaviano.pdf) yang sudah ada di workspace akan otomatis disalin ke folder `public/` agar tombol unduh CV berfungsi langsung.

---

## 4. Proposed Changes

```text
E:\Portfolio-Aldy\
├── package.json                    [NEW] Dependensi React, Tailwind, Framer Motion, Lucide
├── vite.config.js                  [NEW] Konfigurasi Vite
├── tailwind.config.js              [NEW] Konfigurasi warna, animasi glow, dan font
├── postcss.config.js               [NEW] PostCSS untuk Tailwind
├── index.html                      [NEW] HTML shell dengan metadata SEO aldyokta.my.id
├── public/
│   ├── CNAME                       [NEW] aldyokta.my.id
│   └── CV_Aldy_Oktaviano.pdf       [NEW] Salinan file CV untuk tombol Download
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              [NEW] Floating navbar dengan responsive blur
│   │   ├── Hero.jsx                [NEW] Hero dengan Interactive Canvas Dot Grid + Spotlight
│   │   ├── DotGridCanvas.jsx       [NEW] Engine Canvas partikel interaktif 60fps
│   │   ├── Spotlight.jsx           [NEW] Dynamic radial spotlight background
│   │   ├── About.jsx               [NEW] Narasi profil QA Tester & Frontend Developer
│   │   ├── Skills.jsx              [NEW] Bento grid keahlian teknis
│   │   ├── Projects.jsx            [NEW] Showcase kartu proyek & link live Netlify
│   │   ├── Experience.jsx          [NEW] Timeline rail karier & edukasi
│   │   ├── Certifications.jsx      [NEW] Sertifikasi resmi
│   │   ├── Contact.jsx             [NEW] WhatsApp & Email direct action
│   │   └── Footer.jsx              [NEW] Footer & credits
│   ├── data/
│   │   └── portfolioData.js        [NEW] Data komprehensif terstruktur
│   ├── App.jsx                     [NEW] Main layout container
│   ├── index.css                   [NEW] Styling Tailwind & custom animations
│   └── main.jsx                    [NEW] React entry point
└── .github/
    └── workflows/
        └── deploy.yml              [NEW] CI/CD deployment ke GitHub Pages
```

---

## 5. Verification Plan

### Automated Tests
1. Menjalankan `npm run build` untuk memvalidasi bahwa seluruh kode ter-bundle tanpa warning atau error sintaks.
2. Memeriksa keberadaan file output di `dist/` termasuk `dist/CNAME` dan `dist/CV_Aldy_Oktaviano.pdf`.

### Manual Verification
1. Menjalankan server lokal `npm run dev` pada `http://localhost:5173`.
2. Menguji interaktivitas mouse pada kanvas Dot Grid (pergerakan titik dan efek glow saat kursor mouse digerakkan).
3. Menguji tombol unduh CV untuk memastikan file PDF berhasil terunduh dengan benar.
4. Menguji klik link live demo proyek [chic-sawine-f22630.netlify.app](https://chic-sawine-f22630.netlify.app) dan chat WhatsApp.
