// src/components/Header/Nav.js

import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import styles from './Nav.module.css';

const GET_MENU_BY_LOCATION = gql`
  query GetMenuByLocation($location: MenuLocationEnum!) {
    menuItems(where: { location: $location }) {
      nodes {
        id
        label
        uri
      }
    }
  }
`;

export default function Nav() {
  const { data, loading, error } = useQuery(GET_MENU_BY_LOCATION, {
    variables: { location: 'PRIMARY' },
  });

  if (loading) return <p>Loading menu...</p>;
  if (error) return <p>Error loading menu: {error.message}</p>;
  
  const menuItems = data?.menuItems?.nodes;

  if (!menuItems || menuItems.length === 0) {
    return null; 
  }

  return (
    <nav className={styles.primaryNav}>
      <ul>
        {menuItems.map((item, index) => (
          <li key={item.id}>
            <Link href={item.uri ?? '#'}>
              {item.label}
            </Link>
            {/* [PERUBAHAN] Menambahkan pemisah "/" kecuali untuk item terakhir */}
            {index < menuItems.length - 1 && (
              <span className={styles.separator}>/</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}