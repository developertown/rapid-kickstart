
const session = (state = { loggedIn: false }, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        loggedIn: true,
        authData: action.authData
      };
    case 'LOGOUT':
      return {
        loggedIn: false
      };
    default:
      return state
  }
};

export default session;
