// src/components/Footer/Footer.js

import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import Image from 'next/image'; // [PERBAIKAN] Impor Image
import styles from './Footer.module.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const GET_FOOTER_MENUS = gql`
  query GetFooterMenus {
    footerMenu1: menuItems(where: {location: FOOTER_1}) {
      nodes {
        id
        label
        uri
      }
    }
    footerMenu2: menuItems(where: {location: FOOTER_2}) {
      nodes {
        id
        label
        uri
      }
    }
  }
`;

export default function Footer() {
  // Menghapus 'error' karena tidak digunakan
  const { data, loading } = useQuery(GET_FOOTER_MENUS);

  const footerMenu1 = data?.footerMenu1?.nodes ?? [];
  const footerMenu2 = data?.footerMenu2?.nodes ?? [];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>

        {/* Kolom 1: Tentang & Logo */}
        <div className={styles.footerColumn}>
          <Image src="/logo.png" alt="Logo Situs Anda" width={140} height={35} className={styles.footerLogo} />
          <p>Techwire delivers the latest news, in-depth analysis, and expert insights on emerging technologies, software development, AI, gadgets.</p>
          <div className={styles.socialLinks}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          </div>
        </div>

        {/* Kolom 2: Menu Dinamis 1 */}
        <div className={styles.footerColumn}>
          <h3 className={styles.columnTitle}>Popular Category</h3>
          <ul className={styles.footerLinks}>
            {loading ? <p>Loading...</p> : footerMenu1.map(item => (
              <li key={item.id}>
                <Link href={item.uri}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom 3: Menu Dinamis 2 */}
        <div className={styles.footerColumn}>
          <h3 className={styles.columnTitle}>Information</h3>
          <ul className={styles.footerLinks}>
            {loading ? <p>Loading...</p> : footerMenu2.map(item => (
              <li key={item.id}>
                <Link href={item.uri}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

      </div>
      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} Techwire. All rights reserved.</p>
      </div>
    </footer>
  );
}