import axios from 'axios';
import { apiConfig } from 'commons/apiConfig';

const baseUrl: string | undefined = apiConfig.apiUrl;

const createToken = async (inputUsername: string, inputPassword: string) => {
  let token: string | null = '';

  await axios
    .post(`${baseUrl}auth/jwt/create/`, {
      username: inputUsername,
      password: inputPassword,
    })
    .then((res) => {
      token = res.data.access;
    })
    .catch((e) => {
      token = null;
    });
  return token;
};

export default createToken;
