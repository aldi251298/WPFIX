// src/components/AdSlots/UnderHeaderAd.js

import AdSense from '../AdSense/AdSense';

const UnderHeaderAd = () => {
  return (
    // Kontainer pembungkus ini yang akan kita buat responsif.
    // Penjelasan kelas Tailwind:
    // - mx-auto: Menengahkan kontainer di layar besar.
    // - my-5: Memberi jarak atas dan bawah.
    // - w-full: (Default/Mobile) Lebar kontainer adalah 100%.
    // - lg:w-[1040px]: Di layar besar (large, 1024px+), lebar menjadi 1040px.
    // - h-auto: (Default/Mobile) Tinggi otomatis mengikuti iklan responsif.
    // - lg:h-[300px]: Di layar besar, tinggi menjadi 300px.
    <div className="mx-auto my-5 w-full min-h-[90px] lg:w-[1040px] lg:h-[300px]">
      <AdSense
        slotId="3259893788" // <-- GANTI DENGAN SLOT ID ANDA UNTUK IKLAN INI
        format="auto" // Format 'auto' akan membuat iklan mengikuti ukuran kontainer
      />
    </div>
  );
};

export default UnderHeaderAd;