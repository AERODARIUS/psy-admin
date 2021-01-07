const initialState = {
  firebaseInit: false,
  authUser: {},
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'firebase-init':
      return {
        ...state,
        firebaseInit: true,
      };
    case 'auth-change':
      return {
        ...state,
        authUser: action.authUser,
      };
    default:
      return state;
  }
}
