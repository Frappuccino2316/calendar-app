type Url = {
  apiKey: string;
  apiBaseUrl: string;
};

const Config = () => {
  if (process.env.NODE_ENV === 'test') {
    return {
      restful: {
        apiKey: process.env.REACT_APP_TEST_API_KEY,
        apiURL: process.env.REACT_APP_TEST_BASE_URL,
      },
    };
  } else if (process.env.NODE_ENV === 'production') {
    return {
      restful: {
        apiKey: process.env.REACT_APP_PRODUCTION_API_KEY,
        apiURL: process.env.REACT_APP_PRODUCTION_BASE_URL,
      },
    };
  }
  return {
    restful: {
      apiKey: process.env.REACT_APP_DEVELOPMENT_API_KEY,
      apiURL: process.env.REACT_APP_DEVELOPMENT_BASE_URL,
    },
  };
};
export const apiConfig = Config().restful;
