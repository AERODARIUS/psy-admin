import { AUTH_CHANGE, FIREBASE_INIT } from './actions';

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
    default:
      return state;
  }
}
