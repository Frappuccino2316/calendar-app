import React from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { apiConfig } from 'commons/apiConfig';
import Auth from 'components/Auth';

const Settings: React.FC = () => {
  const [username, setUsername] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');

  const [cookie] = useCookies();

  const baseUrl = apiConfig.apiUrl;

  React.useEffect(() => {
    axios
      .get(`${baseUrl}myself/`, {
        headers: {
          Authorization: `JWT ${cookie.calendarJWT}`,
        },
      })
      .then((res) => {
        setUsername(res.data.username);
        setEmail(res.data.email);
      });
    return () => {
      setUsername('');
      setEmail('');
    };
  }, [baseUrl, cookie]);

  const changeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const updateMyself = () => {
    axios.patch(
      `${baseUrl}myself/`,
      {
        username: username,
        email: email,
      },
      {
        headers: {
          Authorization: `JWT ${cookie.calendarJWT}`,
        },
      }
    );
  };

  return (
    <Auth>
      <p>Settings</p>
      <span>ユーザー名</span>
      <input
        type="text"
        value={username}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeUsername(e)}
      />
      <br />
      <span>メールアドレス</span>
      <input
        type="text"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeEmail(e)}
      />
      <br />
      <button onClick={() => updateMyself()}>保存</button>
    </Auth>
  );
};

export default Settings;
