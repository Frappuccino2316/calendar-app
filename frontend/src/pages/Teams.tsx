import React from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { apiConfig } from 'commons/apiConfig';
import Auth from 'components/Auth';
import Title from 'components/Title';
import './Team.css';

type Team = {
  id: Number;
  team_name: string;
  created_at: string;
  updated_at: string;
};

type User = {
  id: Number;
  username: string;
  email: string;
  team_of_affiliation: Team;
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

  const memberInformation = (member: User) => {
    return <li>{member.username}</li>;
  };

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
      <ul>
        {members ? (
          members.map((member: User) => {
            return memberInformation(member);
          })
        ) : (
          <li>所属メンバーはいません</li>
        )}
      </ul>
    </Auth>
  );
};

export default Teams;
