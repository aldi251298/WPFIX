// src/components/AdSlots/InArticleTopAd.js

import AdSense from '@/components/AdSense/AdSense';

export default function InArticleTopAd() {
  const isAdsEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true';

  if (!isAdsEnabled) {
    return null;
  }

  return (
    <div className="ad-container my-5 text-center min-h-[250px]">
      <AdSense
        slotId="4213849166"       // GANTI dengan slot ID Anda untuk posisi In-Article Top
        format="auto"
        // Anda juga bisa menambahkan prop layoutKey jika ingin gunakan layout khusus:
        // layoutKey="-fg+5n+6t-e7+1u"
        // style={{ margin: '0 auto', display: 'block' }}
      />
    </div>
  );
}
