// src/components/ShareButtons/ShareButtons.js

import { useState } from 'react';
import styles from './ShareButtons.module.css';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaPinterestP, 
  FaRedditAlien,
  FaTumblr, 
  FaVk, 
  FaLink,
  FaWhatsapp,
  FaTelegramPlane,
  FaPlus
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { SiLine } from 'react-icons/si';


export default function ShareButtons({ title, url }) {
  const [copied, setCopied] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const socialPlatforms = [
    // 5 Platform Utama
    { name: 'WhatsApp', icon: <FaWhatsapp />, url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`, className: styles.whatsapp },
    { name: 'Facebook', icon: <FaFacebookF />, url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, className: styles.facebook },
    { name: 'Twitter', icon: <FaTwitter />, url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, className: styles.twitter },
    { name: 'Telegram', icon: <FaTelegramPlane />, url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`, className: styles.telegram },
    { name: 'LinkedIn', icon: <FaLinkedinIn />, url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`, className: styles.linkedin },
    // Platform Tambahan
    { name: 'Pinterest', icon: <FaPinterestP />, url: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`, className: styles.pinterest },
    { name: 'Reddit', icon: <FaRedditAlien />, url: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`, className: styles.reddit },
    { name: 'LINE', icon: <SiLine />, url: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`, className: styles.line },
    { name: 'Tumblr', icon: <FaTumblr />, url: `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${encodedUrl}&title=${encodedTitle}`, className: styles.tumblr },
    { name: 'VK', icon: <FaVk />, url: `https://vk.com/share.php?url=${encodedUrl}`, className: styles.vk },
    { name: 'Email', icon: <MdEmail />, url: `mailto:?subject=${encodedTitle}&body=Check%20out%20this%20article:%20${encodedUrl}`, className: styles.email },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const platformsToShow = showAll ? socialPlatforms : socialPlatforms.slice(0, 5);

  return (
    <div className={styles.shareContainer}>
      <h3 className={styles.shareTitle}>SHARE</h3>
      <div className={styles.buttonsGrid}>
        {platformsToShow.map((platform) => (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.shareButton} ${platform.className}`}
            aria-label={`Share on ${platform.name}`}
            title={platform.name}
          >
            {platform.icon}
          </a>
        ))}

        {!showAll && (
          <button
            onClick={() => setShowAll(true)}
            className={`${styles.shareButton} ${styles.moreButton}`}
            aria-label="Show All"
            title="Others"
          >
            <FaPlus />
          </button>
        )}

        <button
          onClick={handleCopyLink}
          className={`${styles.shareButton} ${styles.copyLink} ${copied ? styles.copied : ''}`}
          aria-label="Copy link"
          title="Salin Link"
        >
          <FaLink />
        </button>
      </div>
      {copied && <p className={styles.copyFeedback}>Link berhasil disalin!</p>}
    </div>
  );
}