import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
import { Typography } from 'antd';
import * as firebase from 'firebase/app';

const { Title } = Typography;

export default () => {
  const isFirebaseInit = useSelector((state) => state.firebaseInit);

  useEffect(() => {
    if (isFirebaseInit) {
      firebase.auth().getRedirectResult().then((result) => {
        // The firebase.User instance:
        // var user = result.user;
        // The Facebook firebase.auth.AuthCredential containing the Facebook
        // access token:
        // var credential = result.credential;
        // As this API can be used for sign-in, linking and reauthentication,
        // check the operationType to determine what triggered this redirect
        // operation.
        // var operationType = result.operationType;
        console.log(result);
      }, (error) => {
        console.log(error);
        // TODO:
        // The provider's account email, can be used in case of
        // auth/account-exists-with-different-credential to fetch the providers
        // linked to the email:
        // var credential = error.credential;
        // In case of auth/account-exists-with-different-credential error,
        // you can fetch the providers using this:
        /* if (error.code === 'auth/account-exists-with-different-credential') {
          auth.fetchSignInMethodsForEmail(email).then(function(providers) {
            // The returned 'providers' is a list of the available providers
            // linked to the email address. Please refer to the guide for a more
            // complete explanation on how to recover from this error.
          });
        } */
      });
    }

    return undefined;
  });

  return (
    <div className="login-screen">
      <Title>Wellcome to psy Admin</Title>
      <h2>You are being redirected</h2>
      {!isFirebaseInit && <Redirect to="login" />}
    </div>
  );
};
