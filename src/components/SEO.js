// src/components/SEO.js - Ditambahkan Article Schema

import Head from 'next/head';

// Fungsi untuk membuat JSON-LD Schema untuk Artikel
const ArticleSchema = ({ seo, post }) => {
  if (!post || !seo) {
    return null;
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': seo.title,
    'description': seo.metaDesc,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': seo.opengraphUrl || post.uri,
    },
    'datePublished': post.date,
    'dateModified': post.modified || post.date,
    'author': {
      '@type': 'Person',
      'name': post.author?.node?.name || 'Techwire',
    },
    'publisher': {
      '@type': 'Organization',
      'name': seo.opengraphSiteName || 'Techwire',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://www.techwire.biz/logo.png', // GANTI DENGAN URL LOGO ANDA
      },
    },
    'image': {
      '@type': 'ImageObject',
      'url': seo.opengraphImage?.sourceUrl || post.featuredImage?.node?.sourceUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default function SEO({ seo, post }) {
  if (!seo) return null;

  return (
    <Head>
      <title>{seo.title}</title>
      <meta name="description" content={seo.metaDesc} />
      <link rel="canonical" href={seo.canonical} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:title" content={seo.opengraphTitle} />
      <meta property="og:description" content={seo.opengraphDescription} />
      <meta property="og:url" content={seo.opengraphUrl} />
      <meta property="og:site_name" content={seo.opengraphSiteName} />
      {seo.opengraphImage?.sourceUrl && (
        <meta property="og:image" content={seo.opengraphImage.sourceUrl} />
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.twitterTitle} />
      <meta name="twitter:description" content={seo.twitterDescription} />
      {seo.twitterImage?.sourceUrl && (
        <meta name="twitter:image" content={seo.twitterImage.sourceUrl} />
      )}
      
      {/* [BARU] Memanggil Schema untuk Artikel */}
      {post && <ArticleSchema seo={seo} post={post} />}
    </Head>
  );
}