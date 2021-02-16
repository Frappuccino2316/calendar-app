import React from 'react';
import { NavLink } from 'react-router-dom';
import Logout from 'components/Logout';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.header_logo_nav}>
        Scrundar
      </NavLink>
      <div className={styles.header_nav}>
        <NavLink to="/tasks" className={styles.nav}>
          Task
        </NavLink>
        <NavLink to="/teams" className={styles.nav}>
          Team
        </NavLink>
        <NavLink to="/settings" className={styles.nav}>
          Setting
        </NavLink>
        <Logout />
      </div>
    </header>
  );
};

export default Header;
