import React from 'react';
import { useCookies } from 'react-cookie';
import { NavLink, useHistory } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import styles from './Header.module.css';

type Props = {
  isLogin: boolean;
  setIsLogin: (param: boolean) => void;
};

const Header: React.FC<Props> = ({ isLogin, setIsLogin }) => {
  const history = useHistory();
  const removeCookie = useCookies()[2];
  const logout = () => {
    removeCookie('calendarJWT');
    setIsLogin(false);
    history.push('/login');
  };

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
      {isLogin && <HeaderLink />}
    </header>
  );
};

export default Header;
