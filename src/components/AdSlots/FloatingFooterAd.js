// src/components/AdSlots/FloatingFooterAd.js

import { useState } from 'react';
import AdSense from '@/components/AdSense/AdSense';
import styles from './FloatingFooterAd.module.css';

export default function FloatingFooterAd() {
  const [isOpen, setIsOpen] = useState(true);
  const isAdsEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true';

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen || !isAdsEnabled) {
    return null;
  }

  return (
    // Kontainer luar untuk floating footer
    <div className={styles.floatingContainer}>
      <button onClick={handleClose} className={styles.closeButton}>
        &times;
      </button>

      {/* Kontainer dalam responsive */}
      <div className="w-full min-h-[60px] lg:w-[1040px] lg:h-[90px] mx-auto">
        <AdSense
          slotId="3802350886" // GANTI dengan slot ID Anda untuk unit ini
          format="auto"
        />
      </div>
    </div>
  );
}
