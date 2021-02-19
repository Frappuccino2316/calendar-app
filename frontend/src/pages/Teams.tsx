import React from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { apiConfig } from 'commons/apiConfig';
import Auth from 'components/Auth';

const Teams: React.FC = () => {
  const [teamName, setTeamName] = React.useState('');
  const [cookie] = useCookies();
  const baseUrl = apiConfig.apiUrl;

  React.useEffect(() => {
    axios
      .get(`${baseUrl}myself/`, {
        headers: {
          Authorization: `JWT ${cookie.calendarJWT}`,
        },
      })
      .then((res) => {
        setTeamName(res.data.team_of_affiliation.team_name);
      });
  }, [cookie, baseUrl]);

  return (
    <Auth>
      <h1>Teams</h1>
      <p>所属チーム</p>
      <p>{teamName}</p>
    </Auth>
  );
};

export default Teams;
