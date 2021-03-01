import React from 'react';

type User = {
  id: number;
  username: string;
  email: string;
  team_of_affiliation: number;
};

type Props = {
  user: User;
};

const Member: React.FC<Props> = ({ user }) => {
  return <li key={user.id}>{user.username}</li>;
};

export default Member;
