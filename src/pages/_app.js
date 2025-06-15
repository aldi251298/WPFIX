// src/pages/_app.js - Dikembalikan ke Versi Awal

import '../styles/globals.css';
import "@config";
import { useRouter } from "next/router";
import { FaustProvider } from "@faustwp/core";
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Script from 'next/script';
import FloatingFooterAd from '@/components/AdSlots/FloatingFooterAd';
import UnderHeaderAd from '@/components/AdSlots/UnderHeaderAd'; 
import { roboto, public_sans } from '../lib/fonts';

export default function App({ Component, pageProps }) {
	const router = useRouter();
 
	return (
		<FaustProvider pageProps={pageProps}>
			<div className={`${roboto.variable} ${public_sans.variable}`}>
			  
			   {/* Iklan hanya akan dimuat jika variabel bernilai 'true' */}
        {process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true' && (
        <Script
          id="adsense-script"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4083225081523366"
          crossOrigin="anonymous"
        />
		)}
			  <Header />
        <UnderHeaderAd />
			  <Component {...pageProps} key={router.asPath} />
		    <Footer />
			<FloatingFooterAd />
      </div>
		</FaustProvider>
	);
}