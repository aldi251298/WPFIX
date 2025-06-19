// src/components/InlineRelatedPosts/InlineRelatedPosts.js

import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import styles from './InlineRelatedPosts.module.css';

const GET_INLINE_RELATED_POSTS = gql`
  query GetInlineRelatedPosts($categoryIn: [ID!], $notIn: [ID!]) {
    posts(where: { categoryIn: $categoryIn, notIn: $notIn }, first: 3) {
      nodes {
        id
        title
        uri
      }
    }
  }
`;

export default function InlineRelatedPosts({ categories, currentPostId }) {
  const categoryId = categories?.[0]?.id;

  const { data, loading, error } = useQuery(GET_INLINE_RELATED_POSTS, {
    skip: !categoryId,
    variables: {
      categoryIn: categoryId ? [categoryId] : [],
      notIn: [currentPostId],
    },
  });

  if (loading || error || !data?.posts?.nodes || data.posts.nodes.length === 0) {
    return null; // Jangan tampilkan apa-apa jika loading, error, atau tidak ada post
  }

  const relatedPosts = data.posts.nodes;

  return (
    <aside className={styles.container}>
      <h3 className={styles.title}>Read More:</h3>
      <hr className={styles.separator} />
      <ul className={styles.postList}>
        {relatedPosts.map((post) => (
          <li key={post.id} className={styles.postItem}>
            <Link href={post.uri} className={styles.postLink}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}