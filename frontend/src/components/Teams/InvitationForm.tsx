import React from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { apiConfig } from 'commons/apiConfig';

const baseUrl: string | undefined = apiConfig.apiUrl;

const InvitationForm = () => {
  const [email, setEmail] = React.useState<string>('');
  const [cookie] = useCookies();

  const invite = () => {
    axios
      .post(
        `${baseUrl}invitation_create/`,
        {
          email: email,
        },
        {
          headers: {
            Authorization: `JWT ${cookie.calendarJWT}`,
          },
        }
      )
      .then((res) => {
        console.log('招待しました');
      });
  };

  return (
    <div>
      <input
        type="text"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      <button onClick={() => invite()}>招待</button>
    </div>
  );
};

export default InvitationForm;
