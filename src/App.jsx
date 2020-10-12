import React, { useState, useEffect } from 'react';
import { Avatar, Layout, Menu, Breadcrumb } from 'antd';
import {
  CalendarOutlined,
  GlobalOutlined,
  TeamOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import {
  initFirebase, useIsLoggedIn, LogInButton, logOut,
} from './server';
import 'antd/dist/antd.css';
import './App.scss';

const { Content, Sider } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(true);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  useEffect(() => {
    initFirebase();
  });

  const userData = useIsLoggedIn();

  if (!userData) {
    return (
      <div className="login-screen">
        <h1>Psy Admin</h1>
        <LogInButton />
      </div>
    );
  }

  const { displayName, photoURL } = userData;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo">
          {collapsed ? <Avatar size="large" src={photoURL} /> : displayName}
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<TeamOutlined />}>
            Expedientes
          </Menu.Item>
          <Menu.Item key="2" icon={<CalendarOutlined />}>
            Reservas
          </Menu.Item>
          <Menu.Item key="3" icon={<GlobalOutlined />}>
            Mapa
          </Menu.Item>
          <Menu.Item key="4" icon={<LoginOutlined />} onClick={logOut}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Expedientes</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            Content Here
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
