/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      sm: '640px', // Start tablet
      md: '1250px', // Start laptop
      lg: '1600px', // Start desktop
      xl: '1950px', // Start high-res
    },
    colors: {
      primary: '#009265',
      white: '#FFFFFD',
      black: '#00000A',
      success: '#009265',
      error: '#E80000',
      info: '#2F80ED',
      transparent: 'transparent',
      current: 'current',
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
