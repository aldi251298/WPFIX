// Nama File: pages/sitemap.xml.js
// Kode Lengkap untuk Generate Sitemap Dinamis

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Ganti ini dengan URL domain production Anda
const SITEMAP_BASE_URL = 'https://www.crevalen.xyz/';

// Query GraphQL untuk mengambil semua URL yang dibutuhkan
const GET_ALL_URLS_QUERY = gql`
  query GetAllUrls {
    posts(first: 10000) { # Ambil semua postingan
      nodes {
        uri
        modified
      }
    }
    pages(first: 1000) { # Ambil semua halaman
      nodes {
        uri
        modified
      }
    }
    categories(first: 1000) { # Ambil semua kategori
      nodes {
        uri
        posts(first: 1) { # Cek apakah kategori punya postingan
          nodes {
            id
          }
        }
      }
    }
    # Tambahkan taksonomi lain seperti 'tags' jika perlu
  }
`;

function generateSitemapXml(allUrls) {
  let sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // 1. Tambahkan Halaman Statis (Homepage)
  sitemap += `
    <url>
      <loc>${SITEMAP_BASE_URL}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <priority>1.0</priority>
    </url>
  `;

  // 2. Tambahkan semua Postingan
  allUrls.posts.nodes.forEach(post => {
    sitemap += `
      <url>
        <loc>${SITEMAP_BASE_URL}${post.uri}</loc>
        <lastmod>${post.modified.split('T')[0]}</lastmod>
        <priority>0.8</priority>
      </url>
    `;
  });

  // 3. Tambahkan semua Halaman
  allUrls.pages.nodes.forEach(page => {
    // Hindari duplikat homepage jika URI-nya adalah '/'
    if (page.uri !== '/') {
      sitemap += `
        <url>
          <loc>${SITEMAP_BASE_URL}${page.uri}</loc>
          <lastmod>${page.modified.split('T')[0]}</lastmod>
          <priority>0.7</priority>
        </url>
      `;
    }
  });
  
  // 4. Tambahkan semua Kategori yang memiliki postingan
   allUrls.categories.nodes.forEach(category => {
    if (category.posts.nodes.length > 0) {
      sitemap += `
        <url>
          <loc>${SITEMAP_BASE_URL}${category.uri}</loc>
          <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
          <priority>0.6</priority>
        </url>
      `;
    }
  });


  sitemap += `</urlset>`;
  return sitemap;
}

// Komponen Sitemap tidak me-render apa-apa karena outputnya di-handle di getServerSideProps
function Sitemap() {
  return null;
}

export async function getServerSideProps({ res }) {
  // Buat instance Apollo Client untuk fetch data
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
    cache: new InMemoryCache(),
  });

  // Fetch semua URL dari WordPress
  const { data } = await client.query({
    query: GET_ALL_URLS_QUERY,
  });

  // Generate XML dari data yang didapat
  const sitemapXml = generateSitemapXml(data);

  // Atur header Content-Type menjadi XML
  res.setHeader('Content-Type', 'text/xml');
  // Tulis konten XML ke response
  res.write(sitemapXml);
  res.end();

  // Kembalikan props kosong karena halaman ini tidak me-render komponen
  return {
    props: {},
  };
}

export default Sitemap;