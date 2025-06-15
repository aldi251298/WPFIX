// src/components/Sidebar/Sidebar.js - Menangani variabel error

import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import styles from './Sidebar.module.css';
import SidebarAd from '../AdSlots/SidebarAd';

const GET_POPULAR_POSTS = gql`
  query GetPopularPosts {
    posts(first: 20) {
      nodes {
        id
        title
        uri
        viewCount {
          viewCount
        }
      }
    }
  }
`;

export default function Sidebar() {
  const { data, loading, error } = useQuery(GET_POPULAR_POSTS);
  
  // [PERBAIKAN] Menambahkan blok ini untuk menggunakan variabel 'error'
  if (error) {
    console.error("Error fetching popular posts for sidebar:", error);
    return null; 
  }
  
  const allPosts = data?.posts?.nodes ?? [];

  const sortedPopularPosts = [...allPosts]
    .filter(post => post.viewCount?.viewCount > 0)
    .sort((a, b) => (b.viewCount?.viewCount || 0) - (a.viewCount?.viewCount || 0))
    .slice(0, 6);

  return (
    <>
      {/* Widget Trending Posts */}
      <div className={styles.trendingWidget}>
        <h3 className={styles.widgetTitle}>Trending</h3>
        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading...</p>
        ) : (
          <ol className={styles.popularPostsList}>
            {sortedPopularPosts.map((post, index) => (
              <li key={post.id}>
                <span className={styles.postNumber}>0{index + 1}</span>
                <div className={styles.postInfo}>
                  <Link href={post.uri} className={styles.postTitle}>
                    {post.title}
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* Widget Iklan */}
      <div className={`${styles.adWidget} ${styles.stickyAdWidget}`}>
        <h3 className={styles.adWidgetTitle}>Advertisement</h3>
        <SidebarAd />
      </div>
    </>
  );
}