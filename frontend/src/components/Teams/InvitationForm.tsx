import React from 'react';

const InvitationForm = () => {
  const [email, setEmail] = React.useState<string>('');

  return (
    <div>
      <input
        type="text"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      <button onClick={() => console.log('招待しました')}>招待</button>
    </div>
  );
};

export default InvitationForm;
