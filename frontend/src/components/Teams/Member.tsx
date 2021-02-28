import React from 'react';

type Props = {
  user: {
    id: number;
    username: string;
    email: string;
    team_of_affiliation: Number;
  };
};

const Member: React.FC<Props> = ({ user }) => {
  return <li key={user.id}>{user.username}</li>;
};

export default Member;
