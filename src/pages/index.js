// Nama File: src/pages/index.js
// Status: Final Lengkap dengan `next/image`

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../wp-templates/front-page.module.css';
import SEO from '../components/SEO';
import Sidebar from '../components/Sidebar/Sidebar';
import HomepageLeaderboardAd from '@/components/AdSlots/HomepageLeaderboardAd';

// Utility functions
function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.round((now - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (seconds < 60) return `${seconds} seconds ago`;
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  return `${days} days ago`;
}

function getTrimmedExcerpt(excerpt) {
  if (!excerpt) return '';
  const text = excerpt.replace(/<[^>]+>/g, '');
  const words = text.split(' ');
  if (words.length > 20) {
    return words.slice(0, 20).join(' ') + '...';
  }
  return text;
}

// [PERUBAHAN] Query diupdate untuk mengambil detail gambar (altText, mediaDetails)
const GET_HOMEPAGE_BLUEPRINT_DATA = gql`
  query GetHomepageBlueprintData($listAfter: String) {
    page(id: "home", idType: URI) {
      seo { title metaDesc canonical }
    }
    megaHeroPosts: posts(first: 5) {
      nodes { id title uri excerpt(format: RENDERED) date categories(first: 1) { nodes { name uri } } 
        featuredImage { node { altText sourceUrl(size: LARGE) mediaDetails { width height } } } }
    }
    gridPosts: posts(first: 9, where: {categoryName: "technology"}) {
      nodes { id title uri date categories(first: 1) { nodes { name uri } } 
        featuredImage { node { altText sourceUrl(size: MEDIUM) mediaDetails { width height } } } }
    }
    randomPosts: posts(first: 5, where: {orderby: {field: MODIFIED, order: DESC}}) {
      nodes { id title uri excerpt(format: RENDERED) date categories(first: 1) { nodes { name uri } } 
        featuredImage { node { altText sourceUrl(size: LARGE) mediaDetails { width height } } } }
    }
    latestPostsList: posts(first: 7, after: $listAfter) {
      nodes { id title uri date author { node { name } } 
        featuredImage { node { altText sourceUrl(size: THUMBNAIL) mediaDetails { width height } } } }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

export default function FrontPage({ data }) {
  if (!data) return <p>Halaman sedang dimuat...</p>;

  const seo = data.page?.seo;
  const megaHeroPosts = data.megaHeroPosts?.nodes ?? [];
  const gridPosts = data.gridPosts?.nodes ?? [];
  const latestPostsData = data.latestPostsList;
  const randomPosts = data.randomPosts?.nodes ?? [];

  return (
    <>
      <SEO seo={seo} />
      <main className={styles.container}>
        {megaHeroPosts.length >= 5 && (
          <section className={styles.megaHero}>
            <div className={styles.megaHeroMain}>
              {megaHeroPosts[0].featuredImage?.node && (
                <Link href={megaHeroPosts[0].uri} className={styles.heroImageLink}>
                  <Image src={megaHeroPosts[0].featuredImage.node.sourceUrl} alt={megaHeroPosts[0].featuredImage.node.altText || megaHeroPosts[0].title} width={megaHeroPosts[0].featuredImage.node.mediaDetails.width} height={megaHeroPosts[0].featuredImage.node.mediaDetails.height} priority className={styles.heroImageLink} />
                </Link>
              )}
              <div className={styles.heroMainContent}>
                {megaHeroPosts[0].categories.nodes[0] && (<Link href={megaHeroPosts[0].categories.nodes[0].uri} className={styles.heroMainCategory}>{megaHeroPosts[0].categories.nodes[0].name}</Link>)}
                <h2 className={styles.heroMainTitle}><Link href={megaHeroPosts[0].uri}>{megaHeroPosts[0].title}</Link></h2>
                <p className={styles.heroExcerpt}>{getTrimmedExcerpt(megaHeroPosts[0].excerpt)}</p>
              </div>
            </div>
            <div className={styles.megaHeroSide}>
              {megaHeroPosts.slice(1, 5).map(post => {
                const image = post.featuredImage?.node;
                return (
                  <div key={post.id} className={styles.megaHeroSideCard}>
                    {image && <Link href={post.uri}><Image src={image.sourceUrl} alt={image.altText || post.title} width={image.mediaDetails.width} height={image.mediaDetails.height} /></Link>}
                    <div className={styles.sideCardContent}>
                      <div className={styles.sideCardMeta}>
                        {post.categories.nodes[0] && (<Link href={post.categories.nodes[0].uri} className={styles.sideCardCategory}>{post.categories.nodes[0].name}</Link>)}
                        <span className={styles.metaSeparator}>|</span>
                        <span>{formatRelativeTime(post.date)}</span>
                      </div>
                      <h3><Link href={post.uri}>{post.title}</Link></h3>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}
        <HomepageLeaderboardAd />
        {gridPosts.length > 0 && (
          <section className={styles.gridSection}>
            {/* [PERBAIKAN] Ganti ' dengan &apos; */}
            <h2 className={styles.sectionTitle}>Editor&apos;s Picks</h2>
            <div className={styles.postsGrid}>
              {gridPosts.map(post => {
                 const image = post.featuredImage?.node;
                 return (
                  <div key={post.id} className={styles.gridCard}>
                    {image && <Link href={post.uri}><Image src={image.sourceUrl} alt={image.altText || post.title} width={image.mediaDetails.width} height={image.mediaDetails.height} className={styles.gridCardImage} /></Link>}
                    <div className={styles.gridCardContent}>
                      <div className={styles.gridCardMeta}>
                         {post.categories.nodes[0] && (<Link href={post.categories.nodes[0].uri} className={styles.gridCardCategory}>{post.categories.nodes[0].name}</Link>)}
                        <span className={styles.metaSeparator}>|</span>
                        <span>{formatRelativeTime(post.date)}</span>
                      </div>
                      <h3><Link href={post.uri}>{post.title}</Link></h3>
                    </div>
                  </div>
                 )
              })}
            </div>
          </section>
        )}
        {randomPosts && randomPosts.length >= 5 && (
          <section className={`${styles.megaHero} ${styles.miniHero}`}>
             <div className={styles.megaHeroMain}>
              {randomPosts[0].featuredImage?.node && (
                <Link href={randomPosts[0].uri} className={styles.heroImageLink}>
                  <Image src={randomPosts[0].featuredImage.node.sourceUrl} alt={randomPosts[0].featuredImage.node.altText || randomPosts[0].title} width={randomPosts[0].featuredImage.node.mediaDetails.width} height={randomPosts[0].featuredImage.node.mediaDetails.height} className={styles.heroImageLink} />
                </Link>
              )}
              <div className={styles.heroMainContent}>
                {randomPosts[0].categories.nodes[0] && (<Link href={randomPosts[0].categories.nodes[0].uri} className={styles.heroMainCategory}>{randomPosts[0].categories.nodes[0].name}</Link>)}
                <h2 className={styles.heroMainTitle}><Link href={randomPosts[0].uri}>{randomPosts[0].title}</Link></h2>
                <p className={styles.heroExcerpt}>{getTrimmedExcerpt(randomPosts[0].excerpt)}</p>
              </div>
            </div>
            <div className={styles.megaHeroSide}>
               {randomPosts.slice(1, 5).map(post => {
                const image = post.featuredImage?.node;
                return (
                  <div key={post.id} className={styles.megaHeroSideCard}>
                    {image && <Link href={post.uri}><Image src={image.sourceUrl} alt={image.altText || post.title} width={image.mediaDetails.width} height={image.mediaDetails.height} /></Link>}
                    <div className={styles.sideCardContent}>
                      <div className={styles.sideCardMeta}>
                        {post.categories.nodes[0] && (<Link href={post.categories.nodes[0].uri} className={styles.sideCardCategory}>{post.categories.nodes[0].name}</Link>)}
                        <span className={styles.metaSeparator}>|</span>
                        <span>{formatRelativeTime(post.date)}</span>
                      </div>
                      <h3><Link href={post.uri}>{post.title}</Link></h3>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}
        <div className={styles.listSidebarLayout}>
          <section className={styles.listSection}>
            <h2 className={styles.sectionTitle}>Latest News</h2>
            <div className={styles.postList}>
              {latestPostsData?.nodes.map(post => {
                const image = post.featuredImage?.node;
                return(
                <Link href={post.uri} key={post.id} className={styles.listItem}>
                  {image && <Image src={image.sourceUrl} alt={image.altText || post.title} width={image.mediaDetails.width} height={image.mediaDetails.height} className={styles.listItemImage} />}
                  <div className={styles.listItemContent}>
                    <h3>{post.title}</h3>
                    <p>{new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                </Link>
              )})}
            </div>
            {latestPostsData?.pageInfo.hasNextPage && (<button className={styles.loadMoreButton} disabled={true}>Load More</button>)}
          </section>
          <div className={styles.sidebarColumn}><Sidebar /></div>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: GET_HOMEPAGE_BLUEPRINT_DATA,
    variables: { listAfter: null }
  });
  return {
    props: { data, },
    revalidate: 300, 
  };
}