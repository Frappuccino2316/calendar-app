import React from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { apiConfig } from 'commons/apiConfig';
import Auth from 'components/Auth';
import Title from 'components/Title';
import MembersList from 'components/Teams/MembersList';
import InvitationForm from 'components/Teams/InvitationForm';
import './Teams.css';

type Team = {
  id: number;
  team_name: string;
  created_at: string;
  updated_at: string;
};

type User = {
  id: number;
  username: string;
  email: string;
  team_of_affiliation: number;
};

type Application = {
  id: number;
  applicant: number;
  application_team: number;
};

const Teams: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const [team, setTeam] = React.useState<Team | null>(null);
  const [members, setMembers] = React.useState<User[] | null>(null);
  const [myApplication, setMyApplication] = React.useState<Application | null>(
    null
  );
  const [cookie] = useCookies();
  const baseUrl = apiConfig.apiUrl;

  React.useEffect(() => {
    axios
      .get(`${baseUrl}team_and_members/`, {
        headers: {
          Authorization: `JWT ${cookie.calendarJWT}`,
        },
      })
      .then((res) => {
        const belongToTeam = res.data.hasOwnProperty('team');
        if (belongToTeam) {
          setTeam(res.data.team);
          setMembers(res.data.members);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });

    axios
      .get(`${baseUrl}my_application/`, {
        headers: {
          Authorization: `JWT ${cookie.calendarJWT}`,
        },
      })
      .then((res) => {
        if (res.data[0] !== undefined) {
          setMyApplication(res.data[0]);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
  }, [baseUrl, cookie]);

  if (loading) {
    return (
      <Auth>
        <Title title="Team" />
        <p>loading...</p>
      </Auth>
    );
  }

  if (!team) {
    return (
      <Auth>
        <Title title="Team" />
        <h3>チームに所属していません</h3>
        {myApplication && <InvitationForm />}
      </Auth>
    );
  }

  return (
    <Auth>
      <Title title="Team" />
      <h3>所属チーム</h3>
      <p>{team.team_name}</p>
      <h3>招待</h3>
      <InvitationForm />
      <h5>所属メンバー</h5>
      {members ? (
        <MembersList membersInformation={members} />
      ) : (
        'メンバーはいません'
      )}
    </Auth>
  );
};

export default Teams;
