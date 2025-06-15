// src/components/AdSense/AdSense.js (Versi Final dengan Placeholder)

import { useEffect } from 'react';
import AdPlaceholder from './AdPlaceholder'; // <-- 1. Impor komponen placeholder

const AdSense = ({
  slotId,
  format = 'auto',
  layoutKey = '',
  style = { display: 'block' },
  ...props
}) => {
  // 2. Tambahkan kondisi pengecekan di sini
  // Jika variabel lingkungan tidak di-set ke 'true', tampilkan placeholder dan hentikan eksekusi.
  if (process.env.NEXT_PUBLIC_ADSENSE_ENABLED !== 'true') {
    return <AdPlaceholder />;
  }

  // Kode di bawah ini hanya akan berjalan di lingkungan production (live)
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, []);

  const publisherId = "ca-pub-4083225081523366"; // GANTI DENGAN PUBLISHER ID ANDA

  return (
    <div {...props}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={publisherId}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
        {...(layoutKey && { 'data-ad-layout-key': layoutKey })}
      ></ins>
    </div>
  );
};

export default AdSense;