/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-dark': '#050709',      // background utama, tetap
        'theme-surface': '#0d0d14',   // card/section surface, tetap
        'theme-purple': '#3B82F6',    // primary accent -> blue-500 (tombol, border aktif, icon utama)
        'theme-cyan': '#06B6D4',      // secondary accent -> cyan-500 (highlight, hover text, glow kedua)
        'theme-gray': '#0B1C33',      // deep navy accent (ganti dari '#2a1454' ungu tua)
        'link-hover': '#22D3EE',      // cyan-400, biar link/hover beda tone dari tombol utama
      },
      fontFamily: {
        sans: ['Sora', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-text': 'linear-gradient(to right, #3B82F6 0%, #06B6D4 100%', // blue -> cyan, ganti dari blue->putih
      },
      boxShadow: {
        'neon': '0 0 10px #3B82F6, 0 0 20px #06B6D4', // dual-tone glow, bukan cuma satu warna
      }
    },
  },
  plugins: [],
}