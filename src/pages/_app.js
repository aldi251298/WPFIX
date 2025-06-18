// src/pages/_app.js
import '../styles/globals.css';
import '@config';
import { useRouter } from 'next/router';
import { FaustProvider } from '@faustwp/core';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Script from 'next/script';
import UnderHeaderAd from '@/components/AdSlots/UnderHeaderAd';
import FloatingFooterAd from '@/components/AdSlots/FloatingFooterAd';
import { roboto, public_sans } from '../lib/fonts';
import CookieConsent from '../components/CookieConsent/CookieConsent'; // Import the new component

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isAdsEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true';
  const adsClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT; // e.g. "ca-pub-4083225081523366"

  return (
    <FaustProvider pageProps={pageProps}>
      <div className={`${roboto.variable} ${public_sans.variable}`}>        
        {/* Muat sekali skrip AdSense di client */}
        {isAdsEnabled && (
          <Script
            id="adsense-script"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsClient}`}
            strategy="afterInteractive"
            async
            crossOrigin="anonymous"
          />
        )}

        <Header />

        {/* Slot iklan Under Header */}
        {isAdsEnabled && <UnderHeaderAd />}

        {/* Konten Halaman */}
        <Component {...pageProps} key={router.asPath} />

        {/* Cookie Consent Popup */}
        <CookieConsent /> {/* */}

        <Footer />

        {/* Slot iklan Floating Footer */}
        {isAdsEnabled && <FloatingFooterAd />}
      </div>
    </FaustProvider>
  );
}