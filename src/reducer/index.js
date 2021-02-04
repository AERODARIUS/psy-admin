import { AUTH_CHANGE, FIREBASE_INIT, SET_PERMISSIONS } from './actions';

const initialState = {
  firebaseInit: false,
  authUser: {},
  permissions: {
    '/consultas': false,
    '/expedientes': false,
    '/mapa': false,
  },
};

export default function appReducer(state = initialState, action) {
  const permissions = Object.entries(action.permissions || {})
    .reduce((pagePermissions, [page, permission]) => (
      { ...pagePermissions, [`/${page}`]: permission }
    ), {});
  switch (action.type) {
    case AUTH_CHANGE:
      return {
        ...state,
        authUser: { ...action.authUser },
      };
    case FIREBASE_INIT:
      return {
        ...state,
        firebaseInit: true,
      };
    case SET_PERMISSIONS:
      localStorage.setItem('permissions', JSON.stringify(permissions));
      return {
        ...state,
        permissions,
      };
    default:
      return state;
  }
}
