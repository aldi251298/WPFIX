// src/components/AdSlots/InArticleMiddleAd.js
import AdSense from '../AdSense/AdSense';

const InArticleMiddleAd = () => {
  return (
    <div className="ad-container my-8 text-center min-h-[250px]">
      <AdSense
        slotId="6185420156" // <-- GANTI DENGAN SLOT ID ANDA UNTUK POSISI INI
        format="fluid" // Format 'fluid' seringkali bagus untuk in-article
        layoutKey="-fb+5w+4e-db+86" // <-- GANTI DENGAN LAYOUT KEY ANDA (jika ada)
      />
    </div>
  );
};

export default InArticleMiddleAd;