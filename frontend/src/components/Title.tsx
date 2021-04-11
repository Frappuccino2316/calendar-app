import React from 'react';
import 'components/Title.scss';

type Props = {
  title: string;
};

const Title: React.FC<Props> = React.memo(({ title }) => {
  return <h1>{title}</h1>;
});

export default Title;
