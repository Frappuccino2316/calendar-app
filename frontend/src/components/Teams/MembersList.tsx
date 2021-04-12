import React from 'react';
import Member from 'components/Teams/Member';

type User = {
  id: number;
  username: string;
  email: string;
  team_of_affiliation: number;
};

type Props = {
  membersInformation: User[];
};

const MembersList: React.FC<Props> = React.memo(({ membersInformation }) => {
  const members = membersInformation.map((member: User) => {
    return <Member key={member.id} user={member} />;
  });

  return <ul>{members}</ul>;
});

export default MembersList;
