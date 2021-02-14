import axios from 'axios';
import { apiConfig } from 'commons/apiConfig';

const baseUrl: string | undefined = apiConfig.apiUrl;

const createToken = (username: string, password: string) => {
  let token: string | null = '';

  axios
    .post(`${baseUrl}auth/jwt/create/`, {
      username: username,
      password: password,
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
