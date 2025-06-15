// src/components/AdSlots/InArticleTopAd.js
import AdSense from '../AdSense/AdSense';

const InArticleTopAd = () => {
  return (
     <div className="ad-container my-5 text-center min-h-[250px]">
      <AdSense
        slotId="73540730040" // <-- GANTI DENGAN SLOT ID ANDA UNTUK POSISI INI
        format="auto"
      />
    </div>
  );
};

export default InArticleTopAd;