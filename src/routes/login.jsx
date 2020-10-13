import React from 'react';
import { Typography } from 'antd';
import { LogInButton } from '../server';

const { Title } = Typography;

export default () => (
  <div className="login-screen">
    <Title>Psy Admin</Title>
    <LogInButton />
  </div>
);
