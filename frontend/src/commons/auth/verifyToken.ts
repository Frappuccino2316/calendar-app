import axios from 'axios'

const baseUrl: string = 'http://localhost:8000/api/v1/'

const verifyToken = (jwt: string): boolean => {
  let result = false

  axios
    .post(`${baseUrl}auth/jwt/verify`, {
      token: jwt,
    })
    .then((res) => {
      if (res.status === 200) {
        result = true
      } else {
        result = false
      }
    })
    .catch((e) => {
      result = false
    })
  return result
}

export default verifyToken
