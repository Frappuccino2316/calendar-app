import React from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { apiConfig } from 'commons/apiConfig';
import Auth from 'components/Auth';
import Title from 'components/Title';
import TextBox from 'components/TextBox';
import Button from 'components/utils/button/Button';

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
      <Title title="Setting" />
      <span>ユーザー名</span>
      <TextBox value={username} setValueFunction={setUsername} />
      <br />
      <span>メールアドレス</span>
      <TextBox value={email} setValueFunction={setEmail} />
      <br />
      <Button text="保存" onClickFunction={() => updateMyself()} />
    </Auth>
  );
};

export default Settings;
