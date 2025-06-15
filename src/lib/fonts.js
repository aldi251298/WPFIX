// src/lib/fonts.js

import { Roboto, Public_Sans } from 'next/font/google';

// Konfigurasi font ROBOTO untuk isi artikel (body)
export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'], // Berat font: 400 untuk normal, 700 untuk bold
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-roboto', // Membuat CSS Variable
});

// Konfigurasi font PUBLIC SANS untuk judul & menu
export const public_sans = Public_Sans({
  subsets: ['latin'],
  weight: ['700', '800'], // Judul biasanya lebih tebal
  display: 'swap',
  variable: '--font-public-sans', // Membuat CSS Variable
});