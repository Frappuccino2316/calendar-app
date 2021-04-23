import React from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { apiConfig } from 'commons/apiConfig';
import styles from './InvitationList.module.scss';

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

const InvitationList: React.FC<Props> = React.memo(({ invitations }) => {
  const baseUrl: string | undefined = apiConfig.apiUrl;
  const [isDelete, setIsDelete] = React.useState<boolean>(false);
  const [cookie] = useCookies();

  const deleteInvitation = (id: number) => {
    axios
      .delete(`${baseUrl}invitation_delete/${id}/`, {
        headers: {
          Authorization: `JWT ${cookie.calendarJWT}`,
        },
      })
      .then(() => {
        setIsDelete(true);
      });
  };

  const usersList = invitations.map((invitation) => {
    return (
      <tr key={invitation.id}>
        <td className={styles.td}>{invitation.applicant.username}</td>
        <td className={styles.td}>{invitation.applicant.email}</td>
        <td className={styles.td}>
          <button onClick={() => deleteInvitation(invitation.id)}>取消</button>
        </td>
      </tr>
    );
  });

  return (
    <div className="invitation_table">
      {isDelete && <p>招待を取り消しました</p>}
      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            <th>ユーザー名</th>
            <th>メールアドレス</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{usersList}</tbody>
      </table>
    </div>
  );
});

export default InvitationList;
