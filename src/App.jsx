import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as firebase from 'firebase/app';
import 'firebase/database';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.scss';
import { firebaseConfig } from './config';
import { FIREBASE_INIT, SET_PERMISSIONS } from './reducer/actions';
import { getIsFirebaseInit } from './reducer/selectors';
import { NotFound, Login } from './pages';
import * as Routes from './routes';
import LoggedInContent from './pages/loggedInContent';
import { useCurrentUser, usePermissions } from './server';

export default () => {
  const isFirebaseInit = useSelector(getIsFirebaseInit);
  const userData = useCurrentUser();
  const { uid } = userData;
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    if (!isFirebaseInit) {
      dispatch({ type: FIREBASE_INIT });
      firebase.initializeApp(firebaseConfig);
    } else if (uid) {
      usePermissions(uid, (permissions) => {
        dispatch({ type: SET_PERMISSIONS, permissions });
      });
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
};
