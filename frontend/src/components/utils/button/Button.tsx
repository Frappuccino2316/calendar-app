import React from 'react';
import './Button.css';

type Props = {
  text: string;
  onClickFunction: () => void;
};

const Button: React.FC<Props> = ({ text, onClickFunction }) => {
  return (
    <div className="btn btn--orange" onClick={onClickFunction}>
      {text}
    </div>
  );
};

export default Button;
