/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        or: '#E3D3C9',
        ivory: '#FAF8F5',
        sand: '#E5DDD6',
        sage: '#6F8F82',
        'sage-dark': '#5E7C70',
        ink: '#30343A',
        anthracite: '#30343A',
        champagne: '#E3D3C9',
        'champagne-dark': '#BCA596',
        rosé: '#E3D3C9'
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Manrope', 'Source Sans 3', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 18px 50px rgba(0, 0, 0, 0.07)'
      }
    }
  },
  plugins: []
};
