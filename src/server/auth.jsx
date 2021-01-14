import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spin } from 'antd';
import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import { AUTH_CHANGE } from '../reducer/actions';
import { getAuthUser, getIsFirebaseInit } from '../reducer/selectors';

const LogInButton = () => {
  const isFirebaseInit = useSelector(getIsFirebaseInit);

  useEffect(() => {
    if (isFirebaseInit) {
      firebase
        .auth()
        .setPersistence(process.env.NODE_ENV === 'test' ? firebase.auth.Auth.Persistence.NONE : firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          const existingUi = firebaseui.auth.AuthUI.getInstance();
          const ui = existingUi || new firebaseui.auth.AuthUI(firebase.auth());

          try {
            const authButtonId = 'firebaseui-auth-container';
            const authButton = document.getElementById(authButtonId);

            if (authButton) {
              ui.start(`#${authButtonId}`, {
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
            }
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

const useCurrentUser = () => {
  const dispatch = useDispatch();
  const isFirebaseInit = useSelector(getIsFirebaseInit);
  const savedUser = useSelector(getAuthUser);

  useEffect(() => {
    if (isFirebaseInit) {
      const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
        if ((authUser || {}).uid !== savedUser.uid) {
          dispatch({ type: AUTH_CHANGE, authUser });
        }
      });

      return () => {
        unsubscribe();
      };
    }

    return undefined;
  });

  return savedUser;
};

export {
  useCurrentUser,
  LogInButton,
  logOut,
};
