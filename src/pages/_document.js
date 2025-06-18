// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    const isAdsenseEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true'
    const adClient = 'ca-pub-4083225081523366'

    return (
      <Html>
        <Head>
          {/* Google AdSense script loaded in head with client query param */}
          {isAdsenseEnabled && (
            <script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
              crossOrigin="anonymous"
            ></script>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
