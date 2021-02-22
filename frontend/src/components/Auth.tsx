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
    const checkToken = async () => {
      const result = await verifyToken(cookie.calendarJWT);
      !result && history.push('login');
    };

    if (!cookie.hasOwnProperty('calendarJWT')) {
      history.push('/login');
    } else {
      checkToken();
    }
  }, [cookie, history]);

  return <div>{children}</div>;
};

export default Auth;
