// src/components/CookieConsent/CookieConsent.js
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import styles from './CookieConsent.module.css';

const COOKIE_NAME = 'cookieConsentGiven';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent has already been given
    const consent = Cookies.get(COOKIE_NAME);
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    // Set a cookie that expires in 365 days (1 year)
    Cookies.set(COOKIE_NAME, 'true', { expires: 365 });
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h3 className={styles.title}>Cookie Policy</h3>
        <p className={styles.text}>
          We use cookies to ensure you get the best experience on our website.
          By clicking "Accept", you agree to our use of cookies.
          For more information, please read our <a href="/privacy-policy" className={styles.privacyLink}>Privacy Policy</a>.
        </p>
        <button onClick={handleAccept} className={styles.acceptButton}>
          Accept
        </button>
      </div>
    </div>
  );
}