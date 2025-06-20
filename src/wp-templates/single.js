// src/wp-templates/single.js - Versi dengan struktur layout yang diperbaiki dan tombol share/bookmark

import { gql } from '@apollo/client';
import { useEffect, useState } from 'react'; // Import useState
import Head from 'next/head';
import Image from 'next/image';
import { FiClock, FiBookmark, FiShare2 } from 'react-icons/fi'; // Import new icons
import { FaFacebookF, FaTwitter, FaPinterestP, FaFlipboard, FaThreads, FaTumblr } from 'react-icons/fa6'; // Specific social icons (using fa6 for Threads)
import Comments from '../components/Comments/Comments';
import ShareButtons from '../components/ShareButtons/ShareButtons';
import RelatedPosts from '../components/RelatedPosts/RelatedPosts';
import Sidebar from '../components/Sidebar/Sidebar';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import SEO from '../components/SEO';
import styles from './single.module.css';
import ContentRenderer from '@/components/ContentRenderer/ContentRenderer';
import InArticleTopAd from '@/components/AdSlots/InArticleTopAd';
import InArticleBottomAd from '@/components/AdSlots/InArticleBottomAd';
import Cookies from 'js-cookie'; // For bookmarking

// Komponen Template
export default function Component(props) {
  const { loading, data } = props;
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const BOOKMARK_COOKIE_NAME = 'bookmarkedPosts'; // Using a single cookie for bookmarks

  // useEffect untuk View Counter
  useEffect(() => {
    if (loading || !data?.post?.databaseId) return;
    const databaseId = data.post.databaseId;
    const apiUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/pvc/v1/posts/${databaseId}`;
    fetch(apiUrl, { method: 'POST' }).catch(console.error);
  }, [loading, data?.post?.databaseId]);

  // useEffect untuk membaca status bookmark dari localStorage (atau cookies)
  useEffect(() => {
    if (!data?.post?.databaseId) return;
    const bookmarks = JSON.parse(Cookies.get(BOOKMARK_COOKIE_NAME) || '[]');
    setIsBookmarked(bookmarks.includes(data.post.databaseId));
  }, [data?.post?.databaseId]);

  // Handle closing popup when clicking outside or pressing ESC

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!data?.post) {
      return <div>Postingan tidak ditemukan atau terjadi kesalahan.</div>;
  }

  const { post } = data;
  const { title, content, featuredImage, date, author, categories, comments, databaseId, uri, seo, viewCount } = post;

  const readingTimeText = calculateReadingTime(content);
  const postUrl = (process.env.NEXT_PUBLIC_FRONTEND_URL || (typeof window !== 'undefined' ? window.location.origin : '')) + uri;
  const ampUrl = `${postUrl.replace(/\/$/, '')}/amp`;
  const authorImage = author?.node?.avatar;
  // TAMBAHKAN FUNGSI BARU DI SINI
// >>> KODE FINAL YANG BERSIH <<<
const handleShareClick = (e, shareUrl) => {
  e.preventDefault();
  e.stopPropagation();

  // Langsung buka link di tab baru
  window.open(shareUrl, '_blank', 'noopener,noreferrer');

  // Langsung tutup modal tanpa jeda
  setShowSharePopup(false);
};

  const handleBookmark = () => {
    let bookmarks = JSON.parse(Cookies.get(BOOKMARK_COOKIE_NAME) || '[]');
    if (isBookmarked) {
      bookmarks = bookmarks.filter(id => id !== databaseId);
    } else {
      bookmarks.push(databaseId);
    }
    Cookies.set(BOOKMARK_COOKIE_NAME, JSON.stringify(bookmarks), { expires: 365 }); // Store for 1 year
    setIsBookmarked(!isBookmarked);
  };

  
    const socialPlatforms = [
    { name: 'Facebook', icon: <FaFacebookF />, url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`, className: styles.facebook },
    { name: 'Twitter', icon: <FaTwitter />, url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title + '\n\n' + postUrl)}`, className: styles.twitter },
    { name: 'Pinterest', icon: <FaPinterestP />, url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(postUrl)}&description=${encodeURIComponent(title)}`, className: styles.pinterest },
    { name: 'Flipboard', icon: <FaFlipboard />, url: `https://share.flipboard.com/bookmarklet/popout?v=2&title=${encodeURIComponent(title)}&url=${encodeURIComponent(postUrl)}`, className: styles.flipboard },
    { name: 'Threads', icon: <FaThreads />, url: `https://www.threads.net/share?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(title)}`, className: styles.threads },
    { name: 'Tumblr', icon: <FaTumblr />, url: `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(title)}`, className: styles.tumblr },
];

  return (
    <>
      <SEO seo={seo} post={post} />
      <Head>
        <link rel="amphtml" href={ampUrl} />
      </Head>

      <main className={styles.container}>
        <Breadcrumbs categories={categories?.nodes} postTitle={title} />
        <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />

        {/* [PERUBAHAN BARU] Pemisah visual antara judul dan post meta */}
        <div className={styles.titleMetaSeparator}></div> 

        <div className={styles.metaContainer}>
          <div className={styles.authorBox}>
            {authorImage?.url && (
              <Image
                src={authorImage.url}
                alt={author.node.name}
                width={50}
                height={50}
                className={styles.authorAvatar}
              />
            )}
            <div className={styles.authorDetails}>
              <span className={styles.authorName}>{author.node.name}</span>
              <div className={styles.postDetails}>
                <span className={styles.postDate}>{new Date(date).toLocaleDateString('en-EN', { day: 'numeric', month: 'long', year: 'numeric'})}</span>
                <span className={styles.metaSeparator}>●</span>
                <span className={styles.readingTime}><FiClock size="0.9em" /> {readingTimeText}</span>
                {viewCount?.viewCount && viewCount.viewCount > 0 && ( /* Only show if viewCount is not null and > 0 */
                    <>
                        <span className={styles.metaSeparator}>●</span>
                        <span className={styles.viewCount}>Views: {viewCount.viewCount}</span>
                    </>
                )}
              </div>
            </div>
          </div>
          
          {/* [PERUBAHAN BARU] Tombol Bookmark dan Share di paling kanan */}
          <div className={styles.metaActions}>
            <button 
              className={`${styles.metaActionButton} ${isBookmarked ? styles.bookmarked : ''}`}
              onClick={handleBookmark}
              aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
            >
              <FiBookmark size="1.2em" />
            </button>
            
           
                <button 
                className={styles.metaActionButton} 
                onClick={() => setShowSharePopup(!showSharePopup)}
                aria-label="Share post"
                >
                <FiShare2 size="1.2em" />
                </button>

                
                        
                    
                
            
          </div>

        </div>

        <div className={styles.contentLayout}>
          <article className={styles.postContent}>
            {featuredImage?.node?.sourceUrl && (
              <Image
                src={featuredImage.node.sourceUrl}
                alt={featuredImage.node.altText || title}
                width={featuredImage.node.mediaDetails.width}
                height={featuredImage.node.mediaDetails.height}
                className={styles.featuredImage}
                priority
              />
            )}
            
            <InArticleTopAd />
            <ContentRenderer
  htmlContent={content}
  categories={categories?.nodes}
  currentPostId={databaseId}
  
/>
            <InArticleBottomAd />
          </article>
          
          
          <div className={styles.postFooter}>
           
            <ShareButtons title={title} url={postUrl} />
            <Comments comments={comments?.nodes} postId={databaseId} />
            <RelatedPosts categories={categories?.nodes} currentPostId={databaseId} />
          </div>
        <aside className={styles.sidebar}>
            <Sidebar />
          </aside>

        </div>
      {/* ===== KODE BARU UNTUK MODAL SHARE BOX ===== */}
{showSharePopup && (
  <div className={styles.shareModalOverlay} onClick={() => setShowSharePopup(false)}>
    <div className={styles.shareModalBox} onClick={(e) => e.stopPropagation()}>

      <h3 className={styles.shareModalTitle}>Share this article</h3>

      <button 
        className={styles.shareModalCloseButton} 
        onClick={() => setShowSharePopup(false)}
        aria-label="Close"
      >
        &times;
      </button>

      <div className={styles.shareModalButtons}>
        {socialPlatforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.popupShareButton} ${platform.className}`}
            aria-label={`Share on ${platform.name}`}
            title={`Share on ${platform.name}`}
            onClick={(e) => handleShareClick(e, platform.url)}
          >
            {platform.icon}
          </a>
        ))}
      </div>

    </div>
  </div>
)}
      </main>
    </>
  );
}

// Helper function
function calculateReadingTime(htmlContent) {
  if (!htmlContent) return '1 min read';
  const text = htmlContent.replace(/<[^>]+>/g, '');
  const wordsPerMinute = 225;
  const wordCount = text.split(/\s+/).length;
  return `${Math.ceil(wordCount / wordsPerMinute)} min read`;
}

// Query GraphQL tidak berubah
Component.query = gql`
  fragment GetPostFields on Post {
    title
    content
    date
    modified
    databaseId
    uri
    author {
      node {
        name
        avatar {
          url
        }
      }
    }
    featuredImage {
      node {
        altText
        sourceUrl
        mediaDetails {
          width
          height
        }
      }
    }
    categories {
      nodes {
        id
        name
        uri
      }
    }
    comments(where: { order: ASC }) {
      nodes {
        id
        content
        date
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
      }
    }
    seo {
      title
      metaDesc
      canonical
      opengraphTitle
      opengraphDescription
      opengraphUrl
      opengraphSiteName
      opengraphImage {
        sourceUrl
      }
      twitterTitle
      twitterDescription
      twitterImage {
        sourceUrl
      }
    }
    viewCount {
      viewCount
    }
  }
  query GetPost($databaseId: ID!, $asPreview: Boolean = false) {
    post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      ...GetPostFields
    }
    generalSettings {
      title
      description
    }
  }
`;

// Variabel Query tidak berubah
Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  };
};