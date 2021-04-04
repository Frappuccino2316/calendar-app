import React from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { apiConfig } from 'commons/apiConfig';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getMyself } from 'slices/user/userSlice';
import Auth from 'components/Auth';
import Title from 'components/Title';
import TextBox from 'components/TextBox';
import MembersList from 'components/Teams/MembersList';
import InvitationForm from 'components/Teams/InvitationForm';
import InvitationList from 'components/Teams/InvitationList';
import Button from 'components/utils/button/Button';
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
  applicant: User;
  application_team: number;
};

const Teams: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const [team, setTeam] = React.useState<Team | null>(null);
  const [members, setMembers] = React.useState<User[] | null>(null);
  const [myApplication, setMyApplication] = React.useState<Application | null>(
    null
  );
  const [applicants, setApplicants] = React.useState<Application[] | null>(
    null
  );
  const [newTeamName, setNewTeamName] = React.useState<string>('');
  const [cookie] = useCookies();
  const baseUrl = apiConfig.apiUrl;
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

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
        }
      });

    axios
      .get(`${baseUrl}applicants/`, {
        headers: {
          Authorization: `JWT ${cookie.calendarJWT}`,
        },
      })
      .then((res) => {
        if (res.data[0] !== undefined) {
          setApplicants(res.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
  }, [baseUrl, cookie]);

  React.useEffect(() => {
    dispatch(getMyself(cookie.calendarJWT));
  }, [cookie.calendarJWT, dispatch]);

  const createNewTeam = async () => {
    const res = await axios.post(
      `${baseUrl}teams/`,
      {
        team_name: newTeamName,
      },
      {
        headers: {
          Authorization: `JWT ${cookie.calendarJWT}`,
        },
      }
    );

    await axios.put(
      `${baseUrl}update_myself/`,
      {
        id: user.id,
        username: user.username,
        email: user.email,
        team_of_affiliation: res.data.id,
      },
      {
        headers: {
          Authorization: `JWT ${cookie.calendarJWT}`,
        },
      }
    );
    dispatch(getMyself(cookie.calendarJWT));
    setTeam(res.data);
  };

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
        {myApplication && <p>招待あり</p>}
        <TextBox value={newTeamName} setValueFunction={setNewTeamName} />
        <Button text="作成" onClickFunction={createNewTeam} />
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
      <h3>招待中ユーザー</h3>
      {applicants ? (
        <InvitationList invitations={applicants} />
      ) : (
        <p>招待中のユーザーはいません</p>
      )}
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
