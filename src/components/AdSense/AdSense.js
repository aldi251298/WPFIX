// src/components/AdSense/AdSense.js

import { useEffect } from 'react';
import AdPlaceholder from './AdPlaceholder';

const AdSense = ({
  slotId,
  format = 'auto',
  layoutKey = '',
  style = { display: 'block' },
  ...props
}) => {
  const showAd = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true';

  // [PERBAIKAN] useEffect sekarang dipanggil tanpa kondisi di top-level
  useEffect(() => {
    // Kondisi pengecekan dipindahkan ke dalam hook
    if (showAd) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error(err);
      }
    }
  }, [showAd]); // Tambahkan showAd sebagai dependency

  // [PERBAIKAN] Gunakan ternary operator untuk menentukan apa yang akan dirender
  return showAd ? (
    <div {...props}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={`ca-pub-4083225081523366`} // GANTI DENGAN PUBLISHER ID ANDA
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
        {...(layoutKey && { 'data-ad-layout-key': layoutKey })}
      ></ins>
    </div>
  ) : (
    <AdPlaceholder />
  );
};

export default AdSense;