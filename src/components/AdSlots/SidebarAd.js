// src/components/AdSlots/SidebarAd.js

import AdSense from '../AdSense/AdSense';

const SidebarAd = () => {
  return (
    <AdSense
      // PENTING: Ganti "0123456789" dengan ID Slot Iklan Sidebar Anda dari AdSense
      slotId="9933075854"
      format="auto"
    />
  );
};

export default SidebarAd;