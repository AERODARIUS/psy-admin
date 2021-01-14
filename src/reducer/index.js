import { AUTH_CHANGE, FIREBASE_INIT, SET_PERMISSIONS } from './actions';

const initialState = {
  firebaseInit: false,
  authUser: {},
};

export default function appReducer(state = initialState, action) {
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
      return {
        ...state,
        authUser: {
          permissions: { ...action.permissions },
        },
      };
    default:
      return state;
  }
}
