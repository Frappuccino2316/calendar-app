import React from 'react';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import createToken from 'commons/auth/createToken';
import verifyToken from 'commons/auth/verifyToken';
import Title from 'components/Title';

const Login: React.FC = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [cookie, setCookie] = useCookies();
  const history = useHistory();

  React.useEffect(() => {
    const checkAlreadyAuthenticated = async () => {
      if (cookie.hasOwnProperty('calendarJWT')) {
        const isAuthenticated = await verifyToken(cookie.calendarJWT);
        isAuthenticated && history.push('/');
      }
    };
    checkAlreadyAuthenticated();
  }, [cookie, history]);

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const token: string | null = await createToken(username, password);
    if (token === null) {
      setUsername('');
      setPassword('');
      history.push('/login');
    } else {
      setCookie('calendarJWT', token);
      history.push('/');
    }
  };

  return (
    <div>
      <Title title="Login" />
      <form>
        <p>username</p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p>password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={(e) => onSubmit(e)}>ログイン</button>
      </form>
    </div>
  );
};

export default Login;
