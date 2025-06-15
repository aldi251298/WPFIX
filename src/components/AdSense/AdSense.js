// src/components/AdSense/AdSense.js - Versi Universal

import { useEffect } from 'react';
import AdPlaceholder from './AdPlaceholder';
import styles from './AdSense.module.css'; // Impor file CSS yang baru dibuat

const AdSense = ({ slotId, format = 'auto', layoutKey = '', style = { display: 'block' }, ...props }) => {
  const isAdsEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true';

  useEffect(() => {
    // Hanya coba muat iklan jika ads diaktifkan
    if (isAdsEnabled) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense Script Error:', err);
      }
    }
  }, [isAdsEnabled, slotId]); // Tambahkan slotId sebagai dependency

  // Jika Adsense dimatikan total via environment variable, tampilkan placeholder saja.
  if (!isAdsEnabled) {
    return <AdPlaceholder />;
  }

  // Jika Adsense aktif, render wrapper yang berisi slot iklan dan placeholder.
  // CSS akan secara otomatis mengatur mana yang akan ditampilkan.
  return (
    <div className={styles.adWrapper} {...props}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-4083225081523366" // Publisher ID dari _app.js
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
        {...(layoutKey && { 'data-ad-layout-key': layoutKey })}
      ></ins>
      <div className={styles.placeholder}>
        <AdPlaceholder />
      </div>
    </div>
  );
};

export default AdSense;