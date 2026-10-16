/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        celoura: {
          950: '#060608',
          900: '#0b0b0f',
          850: '#111117',
          800: '#171720',
          700: '#22222e',
          600: '#323242',
        },
        gold: {
          100: '#fdf9e8',
          200: '#faefc2',
          300: '#f5df8c',
          400: '#eccb53',
          500: '#d4af37', // Imperial Gold Primary
          600: '#b89025',
          700: '#926d1a',
          800: '#755518',
          900: '#5c4217',
        },
      },
      fontFamily: {
        serif: ['var(--font-cinzel)', 'Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-outfit)', 'Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold-sm': '0 2px 10px rgba(212, 175, 55, 0.15)',
        'gold-md': '0 4px 20px rgba(212, 175, 55, 0.25)',
        'gold-lg': '0 10px 40px rgba(212, 175, 55, 0.35)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.4)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #fcedb6 0%, #d4af37 50%, #9e791b 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #d4af37 0%, #fff4cc 50%, #d4af37 100%)',
        'dark-gradient': 'radial-gradient(ellipse at top, #1a1a24 0%, #08080a 70%)',
        'card-gradient': 'linear-gradient(180deg, rgba(28, 28, 38, 0.7) 0%, rgba(15, 15, 20, 0.9) 100%)',
      },
    },
  },
  plugins: [],
};
