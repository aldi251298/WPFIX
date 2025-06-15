import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import styles from './archive.module.css';
import Image from 'next/image';

const ALL_POSTS_QUERY = gql`
  query AllPosts($after: String) {
    posts(first: 6, after: $after) {
      nodes { id title uri date 
        featuredImage { node { altText sourceUrl mediaDetails { width height } } }
      }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

export default function ArchivePage() {
  const [allPosts, setAllPosts] = useState([]);
  const [cursor, setCursor] = useState(null);

  const { data, loading, fetchMore } = useQuery(ALL_POSTS_QUERY, {
    variables: { after: null },
    onCompleted: (data) => {
      setAllPosts(data?.posts?.nodes || []);
      setCursor(data?.posts?.pageInfo?.endCursor);
    },
  });

  const handleLoadMore = () => {
    fetchMore({
      variables: { after: cursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        const newPosts = fetchMoreResult.posts.nodes;
        const newCursor = fetchMoreResult.posts.pageInfo.endCursor;

        setAllPosts((prev) => [...prev, ...newPosts]);
        setCursor(newCursor);
      },
    });
  };

  if (loading && allPosts.length === 0) return <p>Loading...</p>;

  return (
    <>
      <Head>
        <title>All Posts Archive</title>
      </Head>
      <main className={styles.container}>
        <h1 className={styles.title}>All Posts</h1>
        <div className={styles.grid}>
          {allPosts.map((post) => (
            <div key={post.id} className={styles.card}>
              <Link href={post.uri}>
                <Image src={image.sourceUrl} alt={image.altText || post.title} width={image.mediaDetails.width} height={image.mediaDetails.height} className={styles.cardImage} />
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
        {data?.posts?.pageInfo?.hasNextPage && (
          <button className={styles.loadMore} onClick={handleLoadMore} disabled={loading}>
            {loading ? 'Loading...' : 'Load More'}
          </button>
        )}
      </main>
    </>
  );
}