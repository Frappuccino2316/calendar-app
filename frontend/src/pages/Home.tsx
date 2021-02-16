import React from 'react';
import { Link } from 'react-router-dom';
// import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
// import GroupIcon from '@material-ui/icons/Group'
// import SettingsIcon from '@material-ui/icons/Settings'
import 'pages/Home.css';
import Title from 'components/Title';

const Home: React.FC = () => {
  type IconStyle = {
    width: number;
    height: number;
  };

  interface Styles {
    largeStyle: IconStyle;
    normalStyle: IconStyle;
  }

  const styles: Styles = {
    largeStyle: {
      width: 130,
      height: 130,
    },
    normalStyle: {
      width: 70,
      height: 70,
    },
  };

  return (
    <div>
      <Title title="Home" />
      <div className="link_block">
        <Link to="/tasks">
          <div className="block link_tasks">
            Task
            <span className="icon">
              {/* <FormatListBulletedIcon style={styles.largeStyle} /> */}
            </span>
          </div>
        </Link>
        <div className="link_double">
          <Link to="/teams">
            <div className="block link_teams">
              Team
              <span className="icon">
                {/* <GroupIcon style={styles.normalStyle} /> */}
              </span>
            </div>
          </Link>
          <Link to="/settings">
            <div className="block link_settings">
              Setting
              <span className="icon">
                {/* <SettingsIcon style={styles.normalStyle} /> */}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
