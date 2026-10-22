Konteks:
Project portfolio saya memakai React + Vite + Tailwind CSS. Palet warna ada di src/index.css (CSS variables di :root). Tujuan: memperkuat hierarki visual tanpa mengubah layout, copy, atau struktur komponen.

TAHAP 1 - Tambah token baru di :root pada index.css (jangan hapus token yang sudah ada):
  --accent-soft: #f3e4d3;
  --accent-border: #e2c4a2;
  --pass-soft: #e3f1e9;
  --info-soft: #e4ecf8;
  --border-strong: #b9b0a0;

Jika tailwind.config sudah memetakan CSS variables ke theme.colors, tambahkan token baru ke sana dengan pola yang sama. Jika belum, pakai arbitrary value seperti bg-[var(--accent-soft)].

TAHAP 2 - Terapkan aturan hierarki berikut:
1. Kartu featured (Movie Search & Discovery Web App dan Hydroponic Smart Automation System): beri border var(--accent-border). Kartu proyek lainnya tetap border netral var(--border). Saat hover, kartu pakai var(--border-strong).
2. Chip tipe pekerjaan di section Experience: "Full-time" pakai bg var(--pass-soft) dengan teks var(--pass); "Training & Certification" pakai bg var(--info-soft) dengan teks var(--info); "Internship" dan "Certified Independent Study" tetap pakai var(--surface-2).
3. Pengalaman terbaru (QA Tester, PT Tiga Serangkai Inti Corpora, "Present"): beri badge kecil memakai bg var(--accent-soft) dan teks var(--accent).
4. Tag teknologi (React.js, Tailwind CSS, dll): tetap netral pakai var(--surface-2), jangan diberi warna.
5. Status "Certified Competent" di Hydroponic: bg var(--pass-soft) dengan teks var(--pass).
6. Judul section vs judul kartu: bedakan lewat ukuran dan font-weight (section 700-800, kartu 600), bukan warna.
7. Footer: var(--accent-on-dark) hanya untuk SATU elemen utama (tombol atau link utama), link lain pakai var(--footer-muted).
8. Aksen solid var(--accent) hanya untuk aksi utama (tombol Download CV dan Chat on WhatsApp). Jangan dipakai dekoratif.

ATURAN:
- Jangan ubah teks, layout, atau logic.
- Gunakan CSS variables, jangan hardcode hex.
- Setelah selesai, jalankan build/lint dan pastikan tidak ada error.
- Berikan ringkasan file apa saja yang diubah.
- Cek kontras teks vs background (minimal 4.5:1), terutama var(--accent) di atas var(--accent-soft). Jika kurang, laporkan dulu sebelum mengubah.