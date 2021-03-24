import React from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { apiConfig } from 'commons/apiConfig';

const baseUrl: string | undefined = apiConfig.apiUrl;

const InvitationForm = () => {
  const [email, setEmail] = React.useState<string>('');
  const [isInvitation, setIsInvitation] = React.useState<boolean>(false);
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
      .then(() => {
        setIsInvitation(true);
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
      {isInvitation && (
        <div>
          <span>招待しました</span>
          <button onClick={() => setIsInvitation(false)}>×</button>
        </div>
      )}
    </div>
  );
};

export default InvitationForm;
