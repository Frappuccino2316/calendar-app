import React from 'react';

type Props = {
  value: string;
  setValueFunction: React.Dispatch<React.SetStateAction<string>>;
};

const TextBox: React.FC<Props> = React.memo(({ value, setValueFunction }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setValueFunction(e.target.value)
      }
    />
  );
});

export default TextBox;
