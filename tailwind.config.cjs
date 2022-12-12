/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#080b13',
        gray: 'rgba(60, 55, 55, 0.8)',
        gray2: '#f1f1ef',
        green: '#00ab26',
      },
    },
  },
  plugins: [],
};
