import React from 'react';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import createToken from 'commons/auth/createToken';

const Login: React.FC = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [cookie, setCookie] = useCookies();
  const history = useHistory();

  React.useEffect(() => {
    cookie.calendarJWT && history.push('/');
  });

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const token: string | null = await createToken(username, password);
    if (token === null) {
      setUsername('');
      setPassword('');
      history.push('login');
    } else {
      setCookie('calendarJWT', token);
      history.push('/');
    }
  };

  return (
    <div>
      <h1>Login</h1>
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
