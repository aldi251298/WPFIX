// src/components/AdSense/AdPlaceholder.js

import styles from './AdPlaceholder.module.css';

const AdPlaceholder = () => {
  return (
    // Kontainer utama placeholder
    <div className={styles.placeholderContainer} title="Ad Placeholder">
      
      {/* Kotak putih di tengah dengan tulisan AD */}
      <div className={styles.adLabelBox}>
        <span className={styles.adLabelText}>AD</span>
      </div>

    </div>
  );
};

export default AdPlaceholder;