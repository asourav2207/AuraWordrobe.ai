/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#FDFBF7',
          100: '#F7F3EA',
          200: '#EFE7D4',
          300: '#DFD1B3',
        },
        indigoIndian: {
          800: '#1C2E4A',
          900: '#0E1B2E',
        },
        terracotta: {
          500: '#E06D53',
          600: '#C7533A',
        },
        saffron: {
          400: '#F6A838',
          500: '#E58A18',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
