import React from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { apiConfig } from 'commons/apiConfig';

const baseUrl: string | undefined = apiConfig.apiUrl;

const InvitationForm = () => {
  const [email, setEmail] = React.useState<string>('');

  const invite = (emailAddress: String) => {};

  return (
    <div>
      <input
        type="text"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      <button onClick={() => console.log('招待しました')}>招待</button>
    </div>
  );
};

export default InvitationForm;
