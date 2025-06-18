// src/components/AdSense/AdSense.js

import React from 'react';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import AdPlaceholder from './AdPlaceholder'; // Import the placeholder component
import styles from './AdSense.module.css'; // Import the AdSense module CSS

// RawAdSense component that is dynamically loaded to ensure client-side rendering
const RawAdSense = ({ slotId, format = 'auto', layoutKey = '', style = {}, className = '' }) => {
  const isAdsEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true';

  // If on server (SSR), and ads are disabled, don't render anything for the ad slot.
  // The placeholder is primarily a client-side visual aid.
  if (typeof window === 'undefined' && !isAdsEnabled) {
    return null;
  }

  // Content to render inside the adWrapper
  let contentToRender;

  if (isAdsEnabled) {
    // If ads are enabled, render the actual AdSense unit and the placeholder.
    // CSS will manage their visibility based on AdSense's data-ad-status.
    contentToRender = (
      <>
        {/* Container iklan AdSense */}
        <ins
          className={`adsbygoogle ${className}`}
          style={{
            display: 'block', // Default display block for AdSense
            width: '100%',
            height: '100%', // Take height from parent adWrapper
            textAlign: 'center',
            position: 'absolute', // Position over the placeholder
            top: 0,
            left: 0,
            zIndex: 2, // Ensure it's above the placeholder
          }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive="true"
          {...(layoutKey && { 'data-ad-layout-key': layoutKey })}
        />

        {/* Placeholder rendered as a sibling, to be hidden by CSS if ad is filled */}
        <AdPlaceholder />

        {/* Push iklan setelah <ins> */}
        <Script id={`adsense-init-${slotId}`} strategy="afterInteractive">
          {`(window.adsbygoogle = window.adsbygoogle || []).push({});`}
        </Script>
      </>
    );
  } else {
    // If ads are explicitly disabled (NEXT_PUBLIC_ADSENSE_ENABLED=false),
    // only render the placeholder.
    contentToRender = <AdPlaceholder />;
  }

  return (
    <div className={styles.adWrapper} style={style}>
      {contentToRender}
    </div>
  );
};

export default dynamic(
  () => Promise.resolve(RawAdSense),
  { ssr: false }
);