import React from 'react';
import Auth from 'components/Auth';

const Teams: React.FC = () => {
  // const [team, setTeam] = React.useState('');

  // React.useEffect(() => {

  // }, [])

  return (
    <Auth>
      <h1>Teams</h1>
      <p>所属チーム</p>
      {/* <p>{teamName}</p> */}
    </Auth>
  );
};

export default Teams;
