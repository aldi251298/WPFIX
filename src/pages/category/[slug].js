// src/pages/category/[slug].js - Dengan impor yang sudah dibersihkan

import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SEO from '../../components/SEO'; // Komponen SEO digunakan sebagai pengganti Head
import styles from './category.module.css';
import { useState } from 'react';

const CATEGORY_POSTS_QUERY = gql`
  query CategoryPosts($slug: ID!, $after: String) {
    category(id: $slug, idType: SLUG) {
      name
      seo {
        title
        metaDesc
        canonical
      }
      posts(first: 6, after: $after) {
        nodes {
          id
          title
          uri
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [allPosts, setAllPosts] = useState([]);
  const [cursor, setCursor] = useState(null);
  
  const { data, loading, fetchMore } = useQuery(CATEGORY_POSTS_QUERY, {
    variables: { slug, after: null },
    skip: !slug,
    onCompleted: (data) => {
      setAllPosts(data?.category?.posts?.nodes || []);
      setCursor(data?.category?.posts?.pageInfo?.endCursor);
    },
  });

  const handleLoadMore = () => {
    if (!fetchMore) return;
    fetchMore({
      variables: { after: cursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        const newPosts = fetchMoreResult.category.posts.nodes;
        const newCursor = fetchMoreResult.category.posts.pageInfo.endCursor;
        setAllPosts((prev) => [...prev, ...newPosts]);
        setCursor(newCursor);
      },
    });
  };

  const categoryName = data?.category?.name || 'Loading...';
  const categorySeo = data?.category?.seo;

  if (loading && allPosts.length === 0) return <p>Loading...</p>;
  if (!slug) return <p>Category not found.</p>;

  return (
    <>
      <SEO seo={categorySeo} />
      
      <main className={styles.container}>
        <h1 className={styles.title}>Category: {categoryName}</h1>
        <div className={styles.grid}>
          {allPosts.map((post) => (
            <div key={post.id} className={styles.card}>
              <Link href={post.uri}>
                  <img
                    src={post.featuredImage?.node.sourceUrl || '/placeholder-image.png'}
                    alt={post.title}
                    className={styles.cardImage}
                  />
              </Link>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>
                  <Link href={post.uri}>{post.title}</Link>
                </h3>
                <p className={styles.cardDate}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
        {data?.category?.posts?.pageInfo?.hasNextPage && (
          <button className={styles.loadMore} onClick={handleLoadMore} disabled={loading}>
            {loading ? 'Loading...' : 'Load More'}
          </button>
        )}
      </main>
    </>
  );
}