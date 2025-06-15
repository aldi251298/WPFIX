// src/components/Layout.js
import '../styles/globals.css'; // Impor CSS Global di sini
import Header from './Header/Header';
import Footer from './Footer/Footer';
import UnderHeaderAd from './AdSlots/UnderHeaderAd'; 
import FloatingFooterAd from './AdSlots/FloatingFooterAd';
import { roboto, public_sans } from '../lib/fonts';

// Komponen ini HANYA untuk halaman NON-AMP
export default function Layout({ children }) {
  return (
    <div className={`${roboto.variable} ${public_sans.variable}`}>
      <Header />
      <UnderHeaderAd />
      <main>{children}</main>
      <Footer />
      <FloatingFooterAd />
    </div>
  );
}