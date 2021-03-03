import React from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { apiConfig } from 'commons/apiConfig';
import CancelButton from './CancelButton';

const baseUrl: string | undefined = apiConfig.apiUrl;

type Team = {
  id: string;
  team_name: string;
  created_at: string;
  updated_at: string;
};

type Application = {
  id: string;
  applicant: string;
  application_team: string;
};

const ApplicationForm = () => {
  const INITIAL_APPLICATION: Application = {
    id: '',
    applicant: '',
    application_team: '',
  };

  const [teams, setTeams] = React.useState<Team[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [targetTeam, setTargetTeam] = React.useState<string>('');
  const [myApplication, setMyApplication] = React.useState<Application>(
    INITIAL_APPLICATION
  );
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
        if (response.data.length) {
          setTargetTeam(response.data[0].id);
        }
      });

    axios
      .get(`${baseUrl}my_application/`, {
        headers: {
          Authorization: `JWT ${cookie.calendarJWT}`,
        },
      })
      .then((response) => {
        Object.keys(response.data).length
          ? setMyApplication(response.data[0])
          : setMyApplication(INITIAL_APPLICATION);
        setLoading(false);
      });
  }, [cookie]);

  let teamOptions: JSX.Element[] | JSX.Element = [];
  if (!loading) {
    teamOptions = teams.length ? (
      teams.map((team) => {
        return (
          <option key={team.id} value={team.id}>
            {team.team_name}
          </option>
        );
      })
    ) : (
      <option value="チームが存在しません">チームが存在しません</option>
    );
  } else {
    teamOptions = <option value="loading...">loading...</option>;
  }

  const createApplication = () => {
    axios
      .post(
        `${baseUrl}applicants_create/`,
        {
          application_team: targetTeam,
        },
        {
          headers: {
            Authorization: `JWT ${cookie.calendarJWT}`,
          },
        }
      )
      .then((response) => {
        setMyApplication(response.data);
      });
  };

  let applicationButton: JSX.Element;
  if (!loading) {
    applicationButton = teams.length ? (
      <button onClick={() => createApplication()}>申請</button>
    ) : (
      <button disabled>申請</button>
    );
  } else {
    applicationButton = <button disabled>申請</button>;
  }

  return (
    <div>
      <h4>チーム所属申請</h4>
      {myApplication.id !== '' ? (
        <div>
          <p>申請中です</p>
          <CancelButton
            myApplication={myApplication}
            setMyApplication={setMyApplication}
          />
        </div>
      ) : (
        <div>
          <select name="team" onChange={(e) => setTargetTeam(e.target.value)}>
            {teamOptions}
          </select>
          {applicationButton}
        </div>
      )}
    </div>
  );
};

export default ApplicationForm;
