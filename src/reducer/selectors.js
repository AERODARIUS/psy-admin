export const getIsFirebaseInit = ({ firebaseInit }) => firebaseInit;
export const getAuthUser = ({ authUser }) => authUser;
export const getPermissions = ({ permissions }) => (
  permissions || JSON.parse(localStorage.getItem('permissions'))
);
export const getFirestoreDB = ({ db }) => db;
