import axios from 'axios';
import { apiConfig } from 'commons/apiConfig';

const baseUrl: string | undefined = apiConfig.apiUrl;

const verifyToken = async (jwt: string) => {
  const result = await axios
    .post(`${baseUrl}auth/jwt/verify/`, {
      token: jwt,
    })
    .then((res) => {
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch((e) => {
      return false;
    });
  return result;
};

export default verifyToken;
