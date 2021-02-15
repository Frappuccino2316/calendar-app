import React from 'react';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Logout: React.FC = () => {
  const history = useHistory();
  // const [cookie, setCookie, removeCookie] = useCookies();
  const removeCookie = useCookies()[2];
  const logout = () => {
    // e.preventDefault()
    removeCookie('calendarJWT');
    history.push('/login');
  };

  return (
    <div>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default Logout;
