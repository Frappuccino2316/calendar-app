import React, { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import verifyToken from 'commons/auth/verifyToken';

type Props = {
  children: ReactNode;
};

const Auth: React.FC<Props> = ({ children }) => {
  const [cookie] = useCookies();
  const history = useHistory();

  React.useEffect(() => {
    if (!cookie.hasOwnProperty('calendarJWT')) {
      history.push('/login');
    } else {
      const isAuthenticated = verifyToken(cookie.calendarJWT);
      !isAuthenticated && history.push('/login');
    }
  }, [cookie, history]);

  return <div>{children}</div>;
};

export default Auth;
