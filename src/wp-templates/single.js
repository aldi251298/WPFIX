// src/wp-templates/single.js - Versi dengan struktur layout yang diperbaiki

import { gql } from '@apollo/client';
import { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { FiClock } from 'react-icons/fi';
import Comments from '../components/Comments/Comments';
import RelatedPosts from '../components/RelatedPosts/RelatedPosts';
import Sidebar from '../components/Sidebar/Sidebar';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import ShareButtons from '../components/ShareButtons/ShareButtons';
import SEO from '../components/SEO';
import styles from './single.module.css';
import ContentRenderer from '@/components/ContentRenderer/ContentRenderer';
import InArticleTopAd from '@/components/AdSlots/InArticleTopAd';
import InArticleBottomAd from '@/components/AdSlots/InArticleBottomAd';

// Komponen Template
export default function Component(props) {
  const { loading, data } = props;

  // useEffect untuk View Counter
  useEffect(() => {
    if (loading || !data?.post?.databaseId) return;
    const databaseId = data.post.databaseId;
    const apiUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/pvc/v1/posts/${databaseId}`;
    fetch(apiUrl, { method: 'POST' }).catch(console.error);
  }, [loading, data?.post?.databaseId]);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!data?.post) {
      return <div>Postingan tidak ditemukan atau terjadi kesalahan.</div>;
  }

  const { post } = data;
  const { title, content, featuredImage, date, author, categories, comments, databaseId, uri, seo, viewCount } = post;

  const readingTimeText = calculateReadingTime(content);
  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ''}${uri}`;
  const ampUrl = `${postUrl.replace(/\/$/, '')}/amp`;
  const authorImage = author?.node?.avatar;

  return (
    <>
      <SEO seo={seo} post={post} />
      <Head>
        <link rel="amphtml" href={ampUrl} />
      </Head>

      <main className={styles.container}>
        <Breadcrumbs categories={categories?.nodes} />
        <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />

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
                <span className={styles.postDate}>{new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric'})}</span>
                <span className={styles.metaSeparator}>●</span>
                <span className={styles.readingTime}><FiClock size="0.9em" /> {readingTimeText}</span>
                {viewCount?.viewCount && (
                    <>
                        <span className={styles.metaSeparator}>●</span>
                        <span className={styles.viewCount}>Tayangan: {viewCount.viewCount}</span>
                    </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* [PERUBAHAN UTAMA] Bungkus semua konten dalam div ini */}
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
            <ContentRenderer htmlContent={content} />
            <InArticleBottomAd />
          </article>
          
          {/* [PERUBAHAN UTAMA] Pindahkan Sidebar ke luar dan paling bawah */}
          <aside className={styles.sidebar}>
            <Sidebar />
          </aside>

          {/* [PERUBAHAN UTAMA] Bungkus konten bawah dalam satu div */}
          <div className={styles.postFooter}>
            <ShareButtons title={title} url={postUrl} />
            <Comments comments={comments?.nodes} postId={databaseId} />
            <RelatedPosts categories={categories?.nodes} currentPostId={databaseId} />
          </div>
        </div>
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