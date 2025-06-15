// Nama File: pages/_app.js
// Status: Diubah (Final)

import '../styles/globals.css';
import "@config";
import { useRouter } from "next/router";
import { FaustProvider } from "@faustwp/core";
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Script from 'next/script'; // <-- PASTIKAN BARIS INI ADA
import FloatingFooterAd from '@/components/AdSlots/FloatingFooterAd'; // <-- INI BENAR
import UnderHeaderAd from '@/components/AdSlots/UnderHeaderAd'; 

// [PERUBAHAN] Impor font yang sudah kita definisikan
import { roboto, public_sans } from '../lib/fonts';

export default function App({ Component, pageProps }) {
	const router = useRouter();
 
	return (
		<FaustProvider pageProps={pageProps}>
      {/* [PERUBAHAN] Bungkus semua komponen dengan div ini.
        Class `variable` dari next/font akan membuat CSS Variable
        (--font-roboto dan --font-public-sans) tersedia secara global.
      */}
			<div className={`${roboto.variable} ${public_sans.variable}`}>
			  
			   {/* Iklan hanya akan dimuat jika variabel bernilai 'true' */}
        {process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true' && (
        <Script
          id="adsense-script"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4083225081523366" // GANTI DENGAN PUBLISHER ID ANDA
          crossOrigin="anonymous"
        />
		)}
			  <Header />
        <UnderHeaderAd />
			  <Component {...pageProps} key={router.asPath} />
		    <Footer />
			<FloatingFooterAd /> {/* <-- Panggil di sini */}
      </div>
		</FaustProvider>
	);
}