import React from 'react';

type Props = {
  text: string;
  onClickFunction: () => void;
};

const Button: React.FC<Props> = ({ text, onClickFunction }) => {
  return (
    <a className="btn btn--orange" onClick={onClickFunction}>
      {text}
    </a>
  );
};

export default Button;
