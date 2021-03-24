import React from 'react';

type User = {
  id: number;
  username: string;
  email: string;
  team_of_affiliation: number | null;
};

type Application = {
  id: number;
  applicant: User;
  application_team: number;
};

type Props = {
  invitations: Application[];
};

const InvitationList: React.FC<Props> = ({ invitations }) => {
  const usersList = invitations.map((invitation) => {
    <tr>
      <td>{invitation.applicant.username}</td>
      <td>
        <button onClick={() => console.log('取消')}>取消</button>
      </td>
    </tr>;
  });

  return <div></div>;
};

export default InvitationList;
