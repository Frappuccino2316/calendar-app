import React from 'react';
import styles from 'components/tasks/TaskRow.module.scss';

interface TaskProps {
  id: number;
  title: string;
  status: string;
  start_date: string;
  end_date: string;
}

const TaskRow: React.FC<TaskProps> = ({
  id,
  title,
  status,
  start_date,
  end_date,
}) => {
  return (
    <tr key={id} className={styles.tr}>
      <td className={styles.td}>{title}</td>
      <td className={styles.td}>{status}</td>
      <td className={styles.td}>{start_date}</td>
      <td className={styles.td}>{end_date}</td>
    </tr>
  );
};

export default TaskRow;
