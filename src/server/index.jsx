import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';

const firebaseConfig = {
  apiKey: 'AIzaSyDksYcvsfuxT81d5c2_s4byphfUWOZ2P_Q',
  authDomain: 'psy-admin.firebaseapp.com',
  databaseURL: 'https://psy-admin.firebaseio.com',
  projectId: 'psy-admin',
  storageBucket: 'psy-admin.appspot.com',
  messagingSenderId: '242225514848',
  appId: '1:242225514848:web:8c629073783e3b5e6df605',
  measurementId: 'G-9GC3XZLJ1P',
};

const initFirebase = () => {
  firebase.initializeApp(firebaseConfig);
};

const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const isFirebaseInit = useSelector((state) => state.firebaseInit);

  useEffect(() => {
    if (!isFirebaseInit) {
      return undefined;
    }

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setIsLoggedIn(user);
    });

    return () => {
      unsubscribe();
    };
  });

  return isLoggedIn;
};

const LogInButton = () => {
  const isFirebaseInit = useSelector((state) => state.firebaseInit);

  useEffect(() => {
    if (isFirebaseInit) {
      firebase
        .auth()
        .setPersistence(process.env.NODE_ENV === 'test' ? firebase.auth.Auth.Persistence.NONE : firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          const existingUi = firebaseui.auth.AuthUI.getInstance();
          const ui = existingUi || new firebaseui.auth.AuthUI(firebase.auth());

          try {
            ui.start('#firebaseui-auth-container', {
              signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
              ],
              signInSuccessUrl: process.env.REACT_APP_CALLBACK_URL,
              callbacks: {
                signInSuccessWithAuthResult(authResult, redirectUrl) {
                  console.log(authResult);
                  console.log(redirectUrl);
                  // var user = authResult.user;
                  // var credential = authResult.credential;
                  // var isNewUser = authResult.additionalUserInfo.isNewUser;
                  // var providerId = authResult.additionalUserInfo.providerId;
                  // var operationType = authResult.operationType;
                  // Do something with the returned AuthResult.
                  // Return type determines whether we continue the redirect automatically
                  // or whether we leave that to developer to handle.
                  return true;
                },
                // signInFailure callback must be provided to handle merge conflicts which
                // occur when an existing credential is linked to an anonymous user.
                signInFailure(error) {
                // For merge conflicts, the error.code will be
                // 'firebaseui/anonymous-upgrade-merge-conflict'.
                  if (error.code !== 'firebaseui/anonymous-upgrade-merge-conflict') {
                    return Promise.resolve();
                  }
                  // The credential the user tried to sign in with.
                  const cred = error.credential;
                  // Copy data from anonymous user to permanent user and delete anonymous
                  // user.
                  // ...
                  // Finish sign-in after data is copied.
                  return firebase.auth().signInWithCredential(cred);
                },
              },
            });
          } catch (e) {
            console.log(e);
          }
        });
    }

    return undefined;
  });

  return (
    <div id="firebaseui-auth-container">
      {!isFirebaseInit && <Spin size="large" />}
    </div>
  );
};

const logOut = () => {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    console.error(error);
    // An error happened.
  });
};

export {
  initFirebase,
  useIsLoggedIn,
  LogInButton,
  logOut,
};
