import React, { useState, useEffect } from 'react'; import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.scss';
import { initFirebase, useIsLoggedIn } from './server';
import Routes, {
  Login,
} from './routes';
import LoggedInContent from './routes/loggedInContent';

function App() {
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    initFirebase();
  });

  const userData = useIsLoggedIn();

  const { displayName, photoURL } = userData || {};

  return (
    <Router>
      <Switch>
        <Route path={Routes.LOGIN}>
          {userData ? <Redirect to={Routes.HOME} /> : <Login />}
        </Route>
        {!userData && <Redirect to={Routes.LOGIN} />}
        <Route path={Routes.HOME}>
          {userData
            && (
              <LoggedInContent
                displayName={displayName}
                photoURL={photoURL}
                collapsed={collapsed}
                onCollapse={(isCollapsed) => {
                  setCollapsed(isCollapsed);
                }}
              />
            )}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
