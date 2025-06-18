// src/components/CookieConsent/CookieConsent.js

import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link'; // Import Link component
import styles from './CookieConsent.module.css';

const COOKIE_NAME = 'cookieConsent';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = Cookies.get(COOKIE_NAME);
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set(COOKIE_NAME, 'true', { expires: 365 });
    setShowConsent(false);
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h3 className={styles.title}>Cookie Policy</h3>
        {/* [PERBAIKAN] Mengatasi Error react/no-unescaped-entities dan @next/next/no-html-link-for-pages */}
        <p className={styles.text}>
          We use cookies to ensure you get the best experience on our website.
          By continuing to use our site, you agree to our use of cookies.
          For more information, please read our{' '} {/* Spasi tetap sebagai entitas atau langsung setelah teks */}
          <Link href="/privacy-policy" passHref> {/* Menggunakan Link dari next/link */}
            <span className={styles.privacyLink}>Privacy Policy</span> {/* Menggunakan span di dalam Link, style diterapkan di span */}
          </Link>
          .
        </p>
        <button onClick={handleAccept} className={styles.acceptButton}>
          Accept
        </button>
      </div>
    </div>
  );
}