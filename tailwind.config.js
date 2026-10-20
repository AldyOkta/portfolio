/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        page: {
          bg: "var(--bg)",
          surface: "var(--surface)",
          surface2: "var(--surface-2)",
          border: "var(--border)",
        },
        text: {
          DEFAULT: "var(--text)",
          body: "var(--text-body)",
          muted: "var(--text-muted)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          dark: "var(--accent-on-dark)",
          hover: "#804618",
        },
        pass: "var(--pass)",
        info: "var(--info)",
        footer: {
          bg: "var(--footer-bg)",
          text: "var(--footer-text)",
          muted: "var(--footer-muted)",
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // taste-skill-ignore
        mono: ['JetBrains Mono', 'monospace'], // taste-skill-ignore
      }
    },
  },
  plugins: [],
}
