import React from 'react';
import styles from './Button.module.scss';

type Props = {
  text: string;
  onClickFunction: () => void;
};

const Button: React.FC<Props> = React.memo(({ text, onClickFunction }) => {
  return (
    <div className={styles.btn_orange} onClick={onClickFunction}>
      {text}
    </div>
  );
});

export default Button;
