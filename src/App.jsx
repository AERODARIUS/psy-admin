import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
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
  LoginSuccess,
} from './routes';
import LoggedInContent from './routes/loggedInContent';

function App() {
  const isFirebaseInit = useSelector((state) => state.firebaseInit);
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    if (!isFirebaseInit) {
      dispatch({ type: 'firebase-init' });
      initFirebase();
    }

    return undefined;
  });

  const userData = useIsLoggedIn();

  const { displayName, photoURL } = userData || {};

  return (
    <Router>
      <Switch>
        <Route path={Routes.LOGIN}>
          {userData ? <Redirect to={Routes.HOME} /> : <Login />}
        </Route>
        <Route path={Routes.LOGIN_SUCCESS}>
          <LoginSuccess />
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
        <Route path="*" component={Routes.NOT_FOUND} />
      </Switch>
    </Router>
  );
}

export default App;
