// src/components/AdSlots/UnderHeaderAd.js

import AdSense from '@/components/AdSense/AdSense';

export default function UnderHeaderAd() {
  const isAdsEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true';

  if (!isAdsEnabled) {
    return null;
  }

  return (
    // Kontainer responsif:
    // - mx-auto: center di viewport besar
    // - my-5: margin vertikal
    // - w-full: full-width di mobile
    // - lg:w-[1040px]: fixed width 1040px di layar ≥1024px
    // - min-h-[90px]: minimal tinggi 90px
    // - lg:h-[300px]: tinggi 300px di layar ≥1024px
    <div className="mx-auto my-5 w-full min-h-[90px] lg:w-[1040px] lg:h-[300px]">
      <AdSense
        slotId="3259893788"  // GANTI dengan slot ID Anda
        format="auto"        // ‘auto’ mengikuti ukuran kontainer
      />
    </div>
  );
}
