// src/components/AdSlots/InArticleBottomAd.js
import AdSense from '../AdSense/AdSense';

export default function InArticleBottomAd() {
  const isAdsEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true';

  if (!isAdsEnabled) {
    return null;
  }
  return (
    <div className="ad-container my-5 text-center min-h-[250px]">
      <AdSense
        slotId="3540730040" // <-- GANTI DENGAN SLOT ID ANDA UNTUK POSISI INI
        format="auto"
      />
    </div>
   );
}