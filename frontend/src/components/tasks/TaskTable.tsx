import React from 'react';
import TaskRow from 'components/tasks/TaskRow';
import styles from 'components/tasks/TaskTable.module.scss';

interface Task {
  id: number;
  title: string;
  status: string;
  start_date: string;
  end_date: string;
}

interface TasksProps {
  tasks: Task[];
}

const TaskTable: React.FC<TasksProps> = ({ tasks }) => {
  const taskRows = tasks.map((task) => <TaskRow {...task} key={task.id} />);
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.tr}>
          <th className={styles.th}>Title</th>
          <th className={styles.th}>Status</th>
          <th className={styles.th}>Start</th>
          <th className={styles.th}>End</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>{taskRows}</tbody>
    </table>
  );
};

export default TaskTable;
