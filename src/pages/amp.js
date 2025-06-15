// src/pages/amp.js - Penambahan Manual Boilerplate

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import Head from 'next/head';
import Script from 'next/script';
import parse from 'html-react-parser';

const AmpContentParser = ({ htmlContent }) => {
  if (!htmlContent) return null;
  const options = {
    replace: (domNode) => {
      if (domNode.name === 'img' && domNode.attribs) {
        const src = domNode.attribs.src.replace('http://', 'https://');
        if (domNode.attribs.width && domNode.attribs.height) {
          return (<amp-img src={src} alt={domNode.attribs.alt || ''} width={domNode.attribs.width} height={domNode.attribs.height} layout="responsive" />);
        }
        return <></>;
      }
      if (domNode.name === 'form') return <></>;
    },
  };
  return <>{parse(htmlContent, options)}</>;
};

export default function AmpPost({ post }) {
  if (!post) return null;

  const { title, content, date, author, uri } = post;
  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ''}${uri}`;
  const renderTitle = () => ({ __html: title });

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>{title.replace(/<[^>]+>/g, '')}</title>
        <link rel="canonical" href={postUrl} />

        {/* === [PERBAIKAN FINAL] Menambahkan kembali boilerplate secara manual === */}
        <style amp-boilerplate="">
          {`body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}`}
        </style>
        <noscript>
          <style amp-boilerplate="">
            {`body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}`}
          </style>
        </noscript>
      </Head>

      <Script async src="https://cdn.ampproject.org/v0.js" />
      <Script async custom-element="amp-img" src="https://cdn.ampproject.org/v0/amp-img-0.1.js" />
      
      <main>
        <h1 dangerouslySetInnerHTML={renderTitle()} />
        <div className="meta">
          Oleh {author?.node?.name || 'Penulis'} pada {new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
        <div className="content">
          <AmpContentParser htmlContent={content} />
        </div>
      </main>

      <style jsx>{`
        main {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          line-height: 1.6;
          max-width: 680px;
          margin: 0 auto;
          padding: 1rem;
        }
        h1 {
          font-size: 2.2rem;
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }
        .meta {
          color: #555;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid #eee;
          padding-bottom: 1rem;
        }
        .content {
          font-size: 1.1rem;
        }
        .content p, .content ul, .content ol {
          margin-bottom: 1.2rem;
        }
        a {
          color: #0070f3;
        }
      `}</style>
      <style jsx global>{`
        amp-img, img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
        }
        figure {
          margin: 0 0 1rem 0;
        }
      `}</style>
    </>
  );
}

const GET_POST_FOR_AMP = gql`query GetPostForAmp($id:ID!){post(id:$id,idType:URI){title(format:RENDERED),content(format:RENDERED),date,uri,author{node{name}}}}`;

export async function getServerSideProps({ query }) {
  const client = new ApolloClient({ uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`, cache: new InMemoryCache() });
  const uri = `/${query.uri || ''}/`;
  try {
    const { data } = await client.query({ query: GET_POST_FOR_AMP, variables: { id: uri } });
    if (!data.post) return { notFound: true };
    return { props: { post: data.post } };
  } catch (error) {
    return { notFound: true };
  }
}

export const config = { amp: true };