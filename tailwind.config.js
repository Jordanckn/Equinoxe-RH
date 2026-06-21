/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        or: '#C9B27C',
        ivory: '#F5F0E8',
        sand: '#DDD6CA',
        sage: '#EDE6DA',
        'sage-dark': '#111111',
        ink: '#111111',
        anthracite: '#444444',
        champagne: '#C9B27C',
        'champagne-dark': '#A8915A',
        rosé: '#EDE6DA'
      },
      fontFamily: {
        serif: ['Source Serif 4', 'Georgia', 'serif'],
        sans: ['Inter', 'Manrope', 'Source Sans 3', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 18px 50px rgba(0, 0, 0, 0.07)'
      }
    }
  },
  plugins: []
};
