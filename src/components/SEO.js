// src/components/SEO.js

import Head from 'next/head';

export default function SEO({ post, seo }) {
  // Gunakan data dari 'seo' jika ada, jika tidak gunakan data dari 'post' sebagai fallback
  const title = seo?.title || post?.title || 'TechWire';
  const metaDesc = seo?.metaDesc || post?.excerpt || 'Default Description';
  const canonical = seo?.canonical || post?.uri || process.env.NEXT_PUBLIC_FRONTEND_URL;
  const opengraphImage = seo?.opengraphImage?.sourceUrl || post?.featuredImage?.node?.sourceUrl || '/default-og-image.jpg';
  const opengraphTitle = seo?.opengraphTitle || title;
  const opengraphDescription = seo?.opengraphDescription || metaDesc;

  // =================================================================
  // LOGIKA BARU UNTUK MEMBUAT STRUCTURED DATA (JSON-LD)
  // =================================================================
  
  // 1. Skema Dasar untuk Organisasi/Website Anda
  const organizationSchema = {
    '@type': 'Organization',
    'name': 'TechWire', // GANTI DENGAN NAMA WEBSITE ANDA
    'url': process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://www.techwire.biz', // PASTIKAN NEXT_PUBLIC_SITE_URL DI .env.local SUDAH BENAR
    'logo': `${process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://www.techwire.biz'}/logo.png` // GANTI DENGAN URL LOGO ANDA
  };

  // Array untuk menampung semua skema yang akan kita render
  const schemas = [organizationSchema];

  // 2. Jika ini adalah halaman artikel, tambahkan skema Article
  if (post) {
    const articleSchema = {
      '@type': 'Article',
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': canonical,
      },
      'headline': post.title,
      'image': opengraphImage,
      'datePublished': post.date,
      'dateModified': post.modified,
      'author': {
        '@type': 'Person',
        'name': post.author?.node?.name || 'TechWire',
      },
      'publisher': organizationSchema,
      'description': metaDesc,
    };
    schemas.push(articleSchema);
  }

  // Gabungkan semua skema menjadi satu skrip JSON-LD
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': schemas,
  };


  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={canonical} />
        
        {/* Open Graph */}
        <meta property="og:title" content={opengraphTitle} />
        <meta property="og:description" content={opengraphDescription} />
        <meta property="og:type" content={post ? 'article' : 'website'} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={opengraphImage} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={metaDesc} />
        <meta name="twitter:image" content={opengraphImage} />

        {/* ================================================================= */}
        {/* INJEKSI SCRIPT JSON-LD DI SINI */}
        {/* ================================================================= */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />

      </Head>
    </>
  );
}