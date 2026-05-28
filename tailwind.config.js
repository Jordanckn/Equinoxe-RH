/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F7F3EA',
        sand: '#E8DED0',
        sage: '#A8B8A0',
        'sage-dark': '#6F8268',
        ink: '#1F3347',
        anthracite: '#232323',
        champagne: '#C6A86B'
      },
      fontFamily: {
        serif: ['Fraunces', 'Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'Manrope', 'Source Sans 3', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 18px 50px rgba(31, 51, 71, 0.08)'
      }
    }
  },
  plugins: []
};
