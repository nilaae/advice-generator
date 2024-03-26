/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Manrope'],
      },
      fontSize: {
        'clamp-main': 'clamp(0.625rem, 0.1136rem + 2.5568vi, 1.75rem)',
        'clamp-header': 'clamp(0.4375rem, 0.2386rem + 0.9943vi, 0.875rem',
      },
      colors: {
        cyan: { 50: '#CEE3E9' },
        neon: { 50: '#00FF80' },
        grayish: { 60: '#323A49', 80: '#1F2636' },
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      boxShadow: {
        '3xl': '5px 5px 40px #00FF80, inset -5px -5px 10px #00FF80',
      },
    },
  },
  plugins: [],
};
