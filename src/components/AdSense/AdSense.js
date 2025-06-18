import React from 'react';
import dynamic from 'next/dynamic';
import Script from 'next/script';

// Hanya render di client
const RawAdSense = ({ slotId, format = 'auto', layoutKey = '', style = {}, className = '' }) => {
  if (typeof window === 'undefined' || process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'false') {
    return null;
  }

  return (
    <>
      {/* Container iklan */}
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
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
        {...(layoutKey && { 'data-ad-layout-key': layoutKey })}
      />

      {/* Push iklan setelah <ins> */}
      <Script id={`adsense-init-${slotId}`} strategy="afterInteractive">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </>
  );
};

export default dynamic(
  () => Promise.resolve(RawAdSense),
  { ssr: false }
);
