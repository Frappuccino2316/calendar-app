import axios from 'axios';
import React from 'react';
import { useCookies } from 'react-cookie';
import { apiConfig } from 'commons/apiConfig';

const Settings: React.FC = () => {
  const [username, setUsername] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');

  const [cookie] = useCookies();

  const baseUrl = apiConfig.apiUrl;

  React.useEffect(() => {
    axios
      .get(`${baseUrl}myself/`, {
        headers: {
          Authorization: cookie.calendarJWT,
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
          Authorization: cookie.calendarJWT,
        },
      }
    );
  };

  return (
    <div>
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
    </div>
  );
};

export default Settings;
