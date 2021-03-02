import React from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { apiConfig } from 'commons/apiConfig';

const baseUrl: string | undefined = apiConfig.apiUrl;

type Team = {
  id: string;
  team_name: string;
  created_at: string;
  updated_at: string;
};

const ApplicationForm = () => {
  const [teams, setTeams] = React.useState<Team[]>([]);
  const [cookie] = useCookies();

  React.useEffect(() => {
    axios
      .get(`${baseUrl}teams/`, {
        headers: {
          Authorization: `JWT ${cookie.calendarJWT}`,
        },
      })
      .then((response) => {
        setTeams(response.data);
      });
  }, []);

  const teamOptions = teams.map((team) => {
    return <option value={team.team_name}>{team.team_name}</option>;
  });

  return (
    <div>
      <h5>チーム所属申請</h5>
      <select name="team">{teamOptions}</select>
      <button>申請</button>
    </div>
  );
};

export default ApplicationForm;
