// Nama File: tailwind.config.js
// Status: Diubah (Final)

const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // [PERUBAHAN] Menambahkan definisi font kustom ke Tailwind
      fontFamily: {
        // Ini akan membuat kelas `font-sans` menggunakan Public Sans
        sans: ['var(--font-public-sans)', ...fontFamily.sans],
        // Ini akan membuat kelas `font-roboto` menggunakan Roboto
        roboto: ['var(--font-roboto)', ...fontFamily.sans],
      },
      fontSize: {
        // Ukuran baru untuk menu navigasi
        'nav-menu': ['1rem', { lineHeight: '1.5rem' }], // sekitar 17px

        // Ukuran baru yang lebih besar untuk heading
        'heading-4': ['1.5rem', { lineHeight: '2rem' }],        // 24px
        'heading-3': ['1.875rem', { lineHeight: '2.25rem' }],  // 30px
        'heading-2': ['2.5rem', { lineHeight: '2.75rem' }],      // 40px
        'heading-1': ['3.25rem', { lineHeight: '1.1' }],       // 52px
      }
    },
  },
  plugins: [],
};