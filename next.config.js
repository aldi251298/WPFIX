// Nama File: next.config.js
// Status: Final dengan Konfigurasi Gravatar

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.techwire.biz', // <-- PASTIKAN INI SUDAH BENAR
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    
      // [PERBAIKAN DI SINI] Tambahkan blok ini untuk mengizinkan Gravatar
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
        port: '',
        pathname: '/avatar/**',
      },
    ],
  },


 // ### TAMBAHKAN BLOK INI ###
  async rewrites() {
    return [
      {
        source: '/:path*/amp', // Tangkap semua URL yang berakhiran /amp
        destination: '/amp?uri=:path*', // Arahkan ke halaman /amp dengan path asli sebagai parameter
      },
    ]
  },
};

module.exports = nextConfig;