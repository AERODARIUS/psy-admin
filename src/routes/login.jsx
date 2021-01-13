import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography } from 'antd';
import { LogInButton, useCurrentUser } from '../server';
import routes from '../routes';

const { Title } = Typography;

export default () => {
  const user = useCurrentUser();
  const history = useHistory();

  useEffect(() => {
    if (user.uid) {
      history.push(routes.HOME);
    }
  });

  return (
    <div className="general-screen">
      <Title>Psy Admin</Title>
      <LogInButton />
    </div>
  );
};
