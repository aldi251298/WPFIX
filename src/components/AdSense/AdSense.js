// src/components/AdSense/AdSense.js
import { useEffect } from 'react';

// Komponen utama iklan AdSense
const AdSense = ({
  slotId,
  format = 'auto',
  layoutKey = '',
  style = {},
  className = '',
}) => {
  const isAdsEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED !== 'false';

  useEffect(() => {
    if (typeof window !== 'undefined' && isAdsEnabled) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense Script Error:', err);
      }
    }
  }, [isAdsEnabled, slotId]);

  if (!isAdsEnabled) return null;

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{
        display: 'block',
        width: '100%',
        minWidth: '250px',
        height: 'auto',
        textAlign: 'center',
        ...style,
      }}
      data-ad-client="ca-pub-4083225081523366" // Ganti dengan kode kamu jika berbeda
      data-ad-slot={slotId}
      data-ad-format={format}
      data-full-width-responsive="true"
      {...(layoutKey && { 'data-ad-layout-key': layoutKey })}
    ></ins>
  );
};

export default AdSense;
