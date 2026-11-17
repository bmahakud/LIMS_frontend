/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#171717',
          50: '#F5F5F5',
          100: '#E5E5E5',
          200: '#CCCCCC',
          300: '#999999',
          400: '#666666',
          500: '#333333',
          600: '#262626',
          700: '#1F1F1F',
          800: '#171717',
          900: '#0F0F0F',
          950: '#0A0A0A',
        },
        industrial: {
          orange: '#D75D36',
          darkOrange: '#C15431',
          teal: '#367786',
          lightTeal: '#4A92A3',
          darkTeal: '#24525C',
          lightGray: '#F2F2F2',
          border: '#E2E4E7',
          steel: '#64748B',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"SFMono-Regular"', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        display: ['"Cabinet Grotesk"', '"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'industrial': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'industrial-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'industrial-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'industrial-card': '0 0 0 1px rgba(23, 23, 23, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
