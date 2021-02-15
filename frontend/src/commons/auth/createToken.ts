import axios from 'axios';
import { apiConfig } from 'commons/apiConfig';

const baseUrl: string | undefined = apiConfig.apiUrl;

const createToken = (inputUsername: string, inputPassword: string) => {
  let token: string | null = '';

  axios
    .post(`${baseUrl}auth/jwt/create/`, {
      username: inputUsername,
      password: inputPassword,
    })
    .then((res) => {
      if (res.status !== 200) {
        token = null;
      } else {
        token = res.data.access;
      }
    });
  return token;
};

export default createToken;
