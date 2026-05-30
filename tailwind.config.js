/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F7F9FC',
        sand: '#E6EDF5',
        sage: '#F3DDE4',
        'sage-dark': '#8A354E',
        ink: '#0E1B29',
        anthracite: '#2D3238',
        champagne: '#A95A70',
        'champagne-dark': '#8A354E',
        rosé: '#F7E8EE'
      },
      fontFamily: {
        serif: ['Source Serif 4', 'Georgia', 'serif'],
        sans: ['Inter', 'Manrope', 'Source Sans 3', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 18px 50px rgba(31, 51, 71, 0.08)'
      }
    }
  },
  plugins: []
};
