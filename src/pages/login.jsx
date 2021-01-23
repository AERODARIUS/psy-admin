import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Typography } from 'antd';
import { LogInButton, useCurrentUser } from '../server';
import { HOME } from '../routes';

const { Title } = Typography;

const useQuery = () => new URLSearchParams(useLocation().search);

export default () => {
  const returnURL = useQuery().get('returnURL');
  const user = useCurrentUser();
  const history = useHistory();

  useEffect(() => {
    if (user.uid) {
      history.push(returnURL || HOME);
    }
  });

  return (
    <div className="general-screen">
      <Title>Psy Admin</Title>
      <LogInButton />
    </div>
  );
};
