// src/components/Breadcrumbs/Breadcrumbs.js

import Link from 'next/link';
import styles from './Breadcrumbs.module.css';
import { FaChevronRight } from 'react-icons/fa';

export default function Breadcrumbs({ categories, postTitle }) {
  // Ambil kategori utama (yang pertama) jika ada
  const primaryCategory = categories?.[0];

  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumbNav}>
      <ol className={styles.breadcrumbList}>
        <li>
          <Link href="/">
            Home
          </Link>
        </li>
        {primaryCategory && (
          <li>
            <span className={styles.separator}>
              <FaChevronRight aria-hidden="true" />
            </span>
            <Link href={primaryCategory.uri}>
              {primaryCategory.name}
            </Link>
          </li>
        )}
        {postTitle && (
          <li>
            <span className={styles.separator}>
              <FaChevronRight aria-hidden="true" />
            </span>
            {/* Judul postingan sebagai item terakhir, tidak bisa diklik */}
            <span aria-current="page" className={styles.currentPage}>
              {postTitle}
            </span>
          </li>
        )}
      </ol>
    </nav>
  );
}