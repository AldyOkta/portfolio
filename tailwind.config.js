/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-dark': '#050709',
        'theme-purple': '#8750f7',
        'theme-gray': '#2a1454', // deep purple accent
        'link-hover': '#8750f7',
      },
      fontFamily: {
        sans: ['Sora', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-text': 'linear-gradient(to right, #8750f7 0%, #fff 100%)',
      },
      boxShadow: {
        'neon': '0 0 10px #8750f7, 0 0 20px #8750f7',
      }
    },
  },
  plugins: [],
}
