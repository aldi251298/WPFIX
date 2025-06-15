// Nama File: src/components/Header/Header.js
// Kode Lengkap dan Final - Perombakan Header Mobile

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Nav from './Nav';
import SearchForm from '../SearchForm'; // Kita akan gunakan komponen search form
import styles from './Header.module.css';
import { FiMenu, FiSearch, FiX } from 'react-icons/fi'; // Import ikon

export default function Header() {
  const router = useRouter();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Efek untuk menutup panel saat navigasi ke halaman lain
  useEffect(() => {
    setIsNavOpen(false);
    setIsSearchOpen(false);
  }, [router.asPath]);

  // Efek untuk mencegah body di-scroll saat panel terbuka
  useEffect(() => {
    if (isNavOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isNavOpen, isSearchOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContainer}>

          {/* === TAMPILAN DESKTOP === */}
          <div className={styles.desktopHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.logoContainer}>
                <Link href="/">
                  <img src="/logo.png" alt="Site Logo" className={styles.logoImage} />
                </Link>
              </div>
              <SearchForm />
            </div>
            <div className={styles.navContainer}>
              <Nav />
            </div>
          </div>

          {/* === TAMPILAN MOBILE === */}
          <div className={styles.mobileHeader}>
            <div className={styles.mobileNavIcon}>
              <button onClick={() => setIsNavOpen(true)} aria-label="Open navigation menu">
                <FiMenu />
              </button>
            </div>
            <div className={styles.mobileLogo}>
              <Link href="/">
                <img src="/logo.png" alt="Site Logo" className={styles.logoImage} />
              </Link>
            </div>
            <div className={styles.mobileSearchIcon}>
              <button onClick={() => setIsSearchOpen(true)} aria-label="Open search form">
                <FiSearch />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* === PANEL SLIDE-IN NAVIGASI (KIRI) === */}
      <div className={`${styles.slideInPanel} ${styles.leftPanel} ${isNavOpen ? styles.isOpen : ''}`}>
        <div className={styles.panelHeader}>
          <h3>Menu</h3>
          <button onClick={() => setIsNavOpen(false)} aria-label="Close navigation menu">
            <FiX />
          </button>
        </div>
        <div className={styles.panelContent}>
          <Nav />
        </div>
      </div>

      {/* === PANEL SLIDE-IN PENCARIAN (KANAN) === */}
      <div className={`${styles.slideInPanel} ${styles.rightPanel} ${isSearchOpen ? styles.isOpen : ''}`}>
        <div className={styles.panelHeader}>
          <h3>Search</h3>
          <button onClick={() => setIsSearchOpen(false)} aria-label="Close search form">
            <FiX />
          </button>
        </div>
        <div className={styles.panelContent}>
          <p>Search...</p>
          <SearchForm />
        </div>
      </div>

      {/* === BACKDROP (untuk area gelap di belakang panel) === */}
      {(isNavOpen || isSearchOpen) && (
        <div className={styles.backdrop} onClick={() => { setIsNavOpen(false); setIsSearchOpen(false); }} />
      )}
    </>
  );
}