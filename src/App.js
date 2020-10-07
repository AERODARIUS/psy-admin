import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  CalendarOutlined,
  GlobalOutlined,
  TeamOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import './App.css';

const { Content, Sider } = Layout;

function App() {
  const [ collapsed, setCollapsed ] = useState(true);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo">
          {collapsed ? 'PA' : 'Psy Admin'}
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
          <Menu.Item key="4" icon={<LoginOutlined />}>
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
            Bill is a cat.
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
