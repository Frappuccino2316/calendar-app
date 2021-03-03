import React from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { apiConfig } from 'commons/apiConfig';

const baseUrl: string | undefined = apiConfig.apiUrl;

type Application = {
  id: string;
  applicant: string;
  application_team: string;
};

type Props = {
  myApplication: Application;
  setMyApplication: React.Dispatch<React.SetStateAction<Application>>;
};

const CancelButton: React.FC<Props> = ({ myApplication, setMyApplication }) => {
  const [cookie] = useCookies();

  const DeleteMyApplication = () => {
    axios
      .delete(`${baseUrl}my_application/${myApplication.id}/`, {
        headers: {
          Authorization: `JWT ${cookie.calendarJWT}`,
        },
      })
      .then((res) => {
        setMyApplication({ id: '', applicant: '', application_team: '' });
      });
  };
  return <button onClick={() => DeleteMyApplication()}>取消</button>;
};

export default CancelButton;
