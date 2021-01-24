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
  isBrowser,
} from 'react-device-detect';
import {
  Avatar, Layout, Menu, Breadcrumb,
} from 'antd';
import {
  LogoutOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import pagesProps from './pagesProps';
import {
  LOGIN, HOME, NOT_FOUND,
} from '../../routes';
import Home from './home';
import NotAuthorized from './notAuthorized';
import {
  logOut,
} from '../../server';
import { getAuthUser, getPermissions } from '../../reducer/selectors';

const { Content, Sider } = Layout;

const getPathNavigation = (location, history) => (
  location.reduce(([pathBreadcrumb, path], pathPart) => {
    const fullPath = `${path}${pathPart}/`;
    return [
      [
        ...pathBreadcrumb,
        (
          <Breadcrumb.Item
            key={pathPart}
            style={{ cursor: 'pointer' }}
            onClick={() => { history.push(fullPath); }}
          >
            {pathPart.toUpperCase()}
          </Breadcrumb.Item>
        ),
      ],
      fullPath,
    ];
  }, [[], '/'])[0]
);

const LoggedInContent = ({
  displayName, photoURL, collapsed, onCollapse,
}) => {
  const { pathname } = useLocation();
  const location = pathname.split('/').filter((pathPart) => (pathPart && pathPart !== ''));
  const history = useHistory();
  const currentUser = useSelector(getAuthUser);
  const permissions = useSelector(getPermissions);
  const { pages, propsByPage } = pagesProps;
  const availablePages = pages.filter((page) => permissions[page]);
  const selectedKey = location.length > 0 ? [`/${location[0]}`] : [];

  useEffect(() => {
    if (!currentUser.uid) {
      history.push(`${LOGIN}?returnURL=${pathname}`);
    }
  });

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {isBrowser ? (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo">
            {collapsed ? <Avatar size="large" src={photoURL} /> : displayName}
          </div>
          <Menu theme="dark" mode="inline" selectedKeys={selectedKey}>
            {availablePages.map((page) => (
              <Menu.Item
                key={page}
                icon={propsByPage[page].icon}
                style={{ textTransform: 'capitalize' }}
              >
                <Link to={page}>
                  {page.substring(1)}
                </Link>
              </Menu.Item>
            ))}
            <Menu.Item key="4" icon={<LogoutOutlined />} onClick={logOut}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
      )
        : (
          <Menu theme="dark" mode="horizontal" selectedKeys={selectedKey}>
            {availablePages.map((page) => (
              <Menu.Item
                key={page}
                icon={propsByPage[page].icon}
                style={{ textTransform: 'capitalize' }}
              >
                <Link to={page}>
                  {page.substring(1)}
                </Link>
              </Menu.Item>
            ))}
            <Menu.Item key="4" icon={<LogoutOutlined />} onClick={logOut}>
              Logout
            </Menu.Item>
          </Menu>
        )}
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item
              style={{ cursor: 'pointer' }}
              onClick={() => { history.push(HOME); }}
            >
              <HomeOutlined />
            </Breadcrumb.Item>
            {getPathNavigation(location, history)}
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Switch>
              {pages.map((page) => (
                <Route
                  path={page}
                  key={page}
                  component={permissions[page] ? propsByPage[page].component : NotAuthorized}
                />
              ))}
              <Route exact path={HOME}>
                <Home availablePages={availablePages} />
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
