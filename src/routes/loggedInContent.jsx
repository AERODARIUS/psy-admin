import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
  Link,
  useLocation,
  useHistory,
} from "react-router-dom";
import {
  Avatar, Layout, Menu, Breadcrumb,
} from 'antd';
import {
  CalendarOutlined,
  GlobalOutlined,
  TeamOutlined,
  LogoutOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import Routes, {
  Home, Expedientes, Consultas, Mapa,
} from '../routes';
import {
  logOut,
} from '../server';

const { Content, Sider } = Layout;

const LoggedInContent = ({
  displayName, photoURL, collapsed, onCollapse,
}) => {
  const location = useLocation().pathname.split('/').filter((pathPart) => (pathPart && pathPart !== ''));
  const history = useHistory();
  const routesMap = {
    [Routes.EXPEDIENTES]: '1',
    [Routes.CONSULTAS]: '2',
    [Routes.MAPA]: '3',
  };
  const selectedKey = location.length > 0 ? [routesMap[`/${location[0]}`]] : [];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo">
          {collapsed ? <Avatar size="large" src={photoURL} /> : displayName}
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={selectedKey}>
          <Menu.Item key="1" icon={<TeamOutlined />}>
            <Link to={Routes.EXPEDIENTES}>Expedientes</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<CalendarOutlined />}>
            <Link to={Routes.CONSULTAS}>Consultas</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<GlobalOutlined />}>
            <Link to={Routes.MAPA}>Mapa</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<LogoutOutlined />} onClick={logOut}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item
              style={{ cursor: 'pointer' }}
              onClick={() => { history.push(Routes.HOME); }}>
              <HomeOutlined />
            </Breadcrumb.Item>
            {location.map((pathPart) => (
              <Breadcrumb.Item key={pathPart}>
                {pathPart.toUpperCase()}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}> 
            <Switch>
              <Route path={Routes.EXPEDIENTES}>
                <Expedientes />
              </Route>
              <Route path={Routes.CONSULTAS}>
                <Consultas />
              </Route>
              <Route path={Routes.MAPA}>
                <Mapa />
              </Route>
              <Route exact path={Routes.HOME}>
                <Home />
              </Route>
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

LoggedInContent.propTypes = {
  displayName: PropTypes.string.isRequired,
  photoURL: PropTypes.string.isRequired,
  collapsed: PropTypes.bool.isRequired,
  onCollapse: PropTypes.func.isRequired,
};

export default LoggedInContent;
