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
  const [isApplication, setIsApplication] = React.useState<boolean>(false);
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

    axios
      .get(`${baseUrl}my_application/`, {
        headers: {
          Authorization: `JWT ${cookie.calendarJWT}`,
        },
      })
      .then((response) => {
        const myselfApplication = response.data === [] ? false : true;
        if (myselfApplication) {
          setIsApplication(true);
        } else {
          setIsApplication(false);
        }
      });
  }, [cookie]);

  const presenceTeam = teams === [] ? true : false;

  let teamOptions: JSX.Element[] | JSX.Element = [];
  if (presenceTeam) {
    teamOptions = teams.map((team) => {
      return <option value={team.team_name}>{team.team_name}</option>;
    });
  } else {
    teamOptions = (
      <option value="チームが存在しません">チームが存在しません</option>
    );
  }

  let applicationButton: JSX.Element;
  if (presenceTeam) {
    applicationButton = <button>申請</button>;
  } else {
    applicationButton = <button disabled>申請</button>;
  }

  const createApplication = async () => {
    axios
      .post(`${baseUrl}applicant_create/`, {
        headers: {
          Authorization: `JWT ${cookie.calendarJWT}`,
        },
      })
      .then((response) => {});
  };

  return (
    <div>
      <h5>チーム所属申請</h5>
      <select name="team">{teamOptions}</select>
      {applicationButton}
    </div>
  );
};

export default ApplicationForm;
