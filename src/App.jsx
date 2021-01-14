import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as firebase from 'firebase/app';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.scss';
import config from './config';
import { FIREBASE_INIT } from './reducer/actions';
import { getIsFirebaseInit } from './reducer/selectors';
import { NotFound, Login } from './pages';
import * as Routes from './routes';
import LoggedInContent from './pages/loggedInContent';
import { useCurrentUser } from './server';

export default () => {
  const isFirebaseInit = useSelector(getIsFirebaseInit);
  const userData = useCurrentUser();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    if (!isFirebaseInit) {
      dispatch({ type: FIREBASE_INIT });
      firebase.initializeApp(config.firebaseConfig);
    }
  });

  const { displayName, photoURL } = userData || {};

  return (
    <Router>
      <Switch>
        <Route exact path={Routes.LOGIN}>
          <Login />
        </Route>
        <Route exact path={Routes.NOT_FOUND} component={NotFound} />
        <Route path={Routes.HOME}>
          <LoggedInContent
            displayName={displayName}
            photoURL={photoURL}
            collapsed={collapsed}
            onCollapse={(isCollapsed) => {
              setCollapsed(isCollapsed);
            }}
          />
        </Route>
      </Switch>
    </Router>
  );
}
