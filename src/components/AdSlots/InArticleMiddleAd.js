// src/components/AdSlots/InArticleMiddleAd.js

import AdSense from '@/components/AdSense/AdSense';

export default function InArticleMiddleAd() {
  const isAdsEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true';

  if (!isAdsEnabled) {
    return null;
  }

  return (
    <div className="ad-container my-8 text-center min-h-[250px]">
      <AdSense
        slotId="8751538392"      // GANTI dengan slot ID Anda untuk posisi In‑Article Middle
        format="fluid"            // 'fluid' cocok untuk in‑article
        layoutKey="-fb+5w+4e-db+86" // GANTI dengan layoutKey Anda jika diperlukan
      />
    </div>
  );
}
