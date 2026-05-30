/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F2F6FA',
        sand: '#E4ECF4',
        sage: '#F0DCE5',
        'sage-dark': '#7A2F45',
        ink: '#1F3347',
        anthracite: '#232323',
        champagne: '#7F95AA'
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
