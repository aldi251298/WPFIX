// src/components/Sidebar/Sidebar.js - Menampilkan Postingan Terbaru (Fallback)

import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import styles from './Sidebar.module.css';
import SidebarAd from '../AdSlots/SidebarAd';

// [PERUBAHAN] Query untuk mengambil 6 postingan terbaru (default order by date DESC)
// Menghapus 'orderby' karena menyebabkan error "Unknown argument 'orderby'"
const GET_LATEST_POSTS_FOR_SIDEBAR = gql`
  query GetLatestPostsForSidebar {
    posts(first: 10) { # Ambil 6 postingan, dengan urutan default (biasanya terbaru)
      nodes {
        id
        title
        uri
      }
    }
  }
`;

export default function Sidebar() {
  // [PERUBAHAN] Menggunakan query GET_LATEST_POSTS_FOR_SIDEBAR
  const { data, loading, error } = useQuery(GET_LATEST_POSTS_FOR_SIDEBAR);
  
  if (error) {
    // Log error yang lebih spesifik untuk membantu debugging
    console.error("Apollo Error fetching latest posts for sidebar:", error.message);
    // console.error("Full error details:", error); // For more detailed debugging

    // Menampilkan pesan error yang ramah pengguna
    return <p style={{ textAlign: 'center', color: 'white' }}>Error loading posts. Please check WordPress GraphQL setup.</p>;
  }
  
  // Ambil nodes
  const latestPosts = data?.posts?.nodes ?? [];

  return (
    <>
      {/* Widget Latest Posts */}
      <div className={styles.trendingWidget}> {/* Menggunakan styling yang sama */}
        {/* [PERUBAHAN] Judul widget diubah ke "Latest Posts" */}
        <h3 className={styles.widgetTitle}>Latest Posts</h3>
        {loading ? (
          <p style={{ textAlign: 'center', color: 'white' }}>Loading latest posts...</p>
        ) : latestPosts.length > 0 ? (
          <ol className={styles.popularPostsList}>
            {latestPosts.map((post, index) => (
              <li key={post.id}>
                <span className={styles.postNumber}>{String(index + 1).padStart(2, '0')}</span> {/* Format 01, 02 */}
                <div className={styles.postInfo}>
                  <Link href={post.uri} className={styles.postTitle}>
                    {post.title}
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        ) : (
            <p style={{ textAlign: 'center', color: 'white' }}>No posts found.</p>
        )}
      </div>

      {/* Widget Iklan */}
      <div className={`${styles.adWidget} ${styles.stickyAdWidget}`}>
        {/* Judul Advertisement dikembalikan ke gaya aslinya agar kontras dengan widget random posts */}
        <h3 className={styles.widgetTitle} style={{ color: '#111827', borderBottom: '3px solid #111827' }}>Advertisement</h3> 
        <SidebarAd />
      </div>
    </>
  );
}