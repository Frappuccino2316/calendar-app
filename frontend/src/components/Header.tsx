import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import verifyToken from 'commons/auth/verifyToken';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [login, setLogin] = React.useState(false);
  const history = useHistory();
  const [cookie] = useCookies();
  const removeCookie = useCookies()[2];
  const logout = () => {
    removeCookie('calendarJWT');
    setLogin(false);
    history.push('/login');
  };

  React.useEffect(() => {
    const checkAlreadyAuthenticated = async () => {
      if (cookie.hasOwnProperty('calendarJWT')) {
        const isAuthenticated = await verifyToken(cookie.calendarJWT);
        isAuthenticated && setLogin(isAuthenticated);
      }
    };
    checkAlreadyAuthenticated();
  }, [cookie]);

  const HeaderLink = () => {
    return (
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
    );
  };

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.header_logo_nav}>
        Scrum Calendar
      </NavLink>
      {login && <HeaderLink />}
    </header>
  );
};

export default Header;
