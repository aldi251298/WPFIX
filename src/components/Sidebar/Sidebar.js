// src/components/Sidebar/Sidebar.js (Diedit untuk menghapus AdSense)

import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Sidebar.module.css';

// Query untuk mengambil postingan (tidak perlu diubah)
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
  const router = useRouter();
  
  if (error) {
    console.error("Error fetching popular posts for sidebar:", error);
    return null;
  }
  
  const allPosts = data?.posts?.nodes ?? [];

  // Logika untuk mengurutkan dan mengambil 6 postingan teratas
  const sortedPopularPosts = [...allPosts]
    .sort((a, b) => (b.viewCount?.viewCount || 0) - (a.viewCount?.viewCount || 0))
    .slice(0, 6);

  return (
    <aside className={styles.sidebar}>
      {/* === WIDGET 1: TRENDING POSTS === */}
      <div className={styles.widget}>
        <h3 className={styles.widgetTitle}>Trending</h3>
        {loading ? (
          <p>Loading...</p>
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

      {/* Widget Iklan AdSense telah dihapus dari sini */}
      
    </aside>
  );
}