import React from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { apiConfig } from 'commons/apiConfig';
import Auth from 'components/Auth';
import Title from 'components/Title';
import MembersList from 'components/Teams/MembersList';
import './Team.css';

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

const Teams: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const [team, setTeam] = React.useState<Team | null>(null);
  const [members, setMembers] = React.useState<User[] | null>(null);
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
  }, [baseUrl, cookie]);

  if (loading) {
    return (
      <Auth>
        <Title title="Team" />
        <p>loading...</p>
      </Auth>
    );
  }

  return (
    <Auth>
      <Title title="Team" />
      <h3>所属チーム</h3>
      <p>{team ? team.team_name : 'チームに所属していません'}</p>
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
