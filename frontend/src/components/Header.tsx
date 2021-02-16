import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const history = useHistory();
  const removeCookie = useCookies()[2];
  const logout = () => {
    removeCookie('calendarJWT');
    history.push('/login');
  };

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
        <ExitToAppIcon
          className={styles.logout_button}
          onClick={() => logout()}
          fontSize="large"
        />
      </div>
    </header>
  );
};

export default Header;
