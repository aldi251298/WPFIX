// src/components/AdSlots/FloatingFooterAd.js (Versi Final Responsif)

import { useState } from 'react';
import AdSense from '../AdSense/AdSense';
import styles from './FloatingFooterAd.module.css';

const FloatingFooterAd = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    // Kontainer luar ini hanya bertugas untuk mengambang di bawah
    <div className={styles.floatingContainer}>
      <button onClick={handleClose} className={styles.closeButton}>
        &times;
      </button>

      {/* Kontainer dalam ini yang ukurannya kita atur secara responsif */}
      {/* - w-full: Lebar 100% di mobile
        - lg:w-[1040px]: Lebar 1040px di layar besar (desktop)
        - h-auto: Tinggi otomatis di mobile
        - lg:h-[150px]: Tinggi 150px di layar besar
        - mx-auto: Menengahkan kontainer ini di dalam bar yang full-width
      */}
      <div className="w-full h-auto lg:w-[1040px] lg:h-[150px] mx-auto">
        <AdSense
          slotId="4444444444" // <-- GANTI DENGAN SLOT ID ANDA UNTUK IKLAN INI
          format="auto"
        />
      </div>
    </div>
  );
};

export default FloatingFooterAd;