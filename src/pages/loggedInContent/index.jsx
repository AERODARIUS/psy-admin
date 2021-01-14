import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  Switch,
  Route,
  Link,
  useLocation,
  useHistory,
  Redirect,
} from 'react-router-dom';
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
import { LOGIN, HOME, EXPEDIENTES, CONSULTAS, MAPA, NOT_FOUND } from '../../routes';
import Home from './home';
import Consultas from './consultas';
import Expedientes from './expedientes';
import Mapa from './mapa';
import {
  logOut,
} from '../../server';
import { getAuthUser } from '../../reducer/selectors';

const { Content, Sider } = Layout;

const LoggedInContent = ({
  displayName, photoURL, collapsed, onCollapse,
}) => {
  const location = useLocation().pathname.split('/').filter((pathPart) => (pathPart && pathPart !== ''));
  const history = useHistory();
  const currentUser = useSelector(getAuthUser);
  const routesMap = {
    [EXPEDIENTES]: '1',
    [CONSULTAS]: '2',
    [MAPA]: '3',
  };
  const selectedKey = location.length > 0 ? [routesMap[`/${location[0]}`]] : [];

  useEffect(() => {
    if (!currentUser.uid) {
      history.push(LOGIN);
    }
  });

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo">
          {collapsed ? <Avatar size="large" src={photoURL} /> : displayName}
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={selectedKey}>
          <Menu.Item key="1" icon={<TeamOutlined />}>
            <Link to={EXPEDIENTES}>Expedientes</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<CalendarOutlined />}>
            <Link to={CONSULTAS}>Consultas</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<GlobalOutlined />}>
            <Link to={MAPA}>Mapa</Link>
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
              onClick={() => { history.push(HOME); }}
            >
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
              <Route path={EXPEDIENTES}>
                <Expedientes />
              </Route>
              <Route path={CONSULTAS}>
                <Consultas />
              </Route>
              <Route path={MAPA}>
                <Mapa />
              </Route>
              <Route exact path={HOME}>
                <Home />
              </Route>
              <Route path="*">
                <Redirect to={NOT_FOUND} />
              </Route>
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

LoggedInContent.propTypes = {
  displayName: PropTypes.string,
  photoURL: PropTypes.string,
  collapsed: PropTypes.bool.isRequired,
  onCollapse: PropTypes.func.isRequired,
};

LoggedInContent.defaultProps = {
  displayName: '',
  photoURL: '',
};

export default LoggedInContent;
