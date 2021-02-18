import axios from 'axios';

const baseUrl: string = 'http://localhost:8000/api/v1/';

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
