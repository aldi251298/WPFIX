// src/components/Sidebar/Sidebar.js

import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
// import { useRouter } from 'next/router'; // [PERBAIKAN] Hapus impor yang tidak digunakan
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
  // const router = useRouter(); // [PERBAIKAN] Hapus variabel yang tidak digunakan
  
  if (error) {
    console.error("Error fetching popular posts for sidebar:", error);
    return null;
  }
  
  const allPosts = data?.posts?.nodes ?? [];

  const sortedPopularPosts = [...allPosts]
    .sort((a, b) => (b.viewCount?.viewCount || 0) - (a.viewCount?.viewCount || 0))
    .slice(0, 6);

  return (
    <aside className={styles.sidebar}>
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
    {/* [PERUBAHAN] 2. Tambahkan widget iklan di sini */}
      <div className={styles.widget} style={{ background: '#f9fafb' }}>
        <h3 className={styles.widgetTitle} style={{ color: '#111827', borderColor: '#e5e7eb' }}>
          
        </h3>
        <SidebarAd />
      </div>
    </aside>
  );
}