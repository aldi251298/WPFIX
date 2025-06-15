// src/components/AdSlots/InArticleBottomAd.js
import AdSense from '../AdSense/AdSense';

const InArticleBottomAd = () => {
  return (
    <div className="ad-container my-5 text-center min-h-[250px]">
      <AdSense
        slotId="4213849166" // <-- GANTI DENGAN SLOT ID ANDA UNTUK POSISI INI
        format="auto"
      />
    </div>
  );
};

export default InArticleBottomAd;