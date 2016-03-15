import { firebase } from '../config';

export const login = (authData) => {
  return {
    type: 'LOGIN',
    authData
  };
};

export const restoreSession = () => {
  return dispatch => {
    let authData = firebase.getAuth();

    if (authData != null) {
      dispatch(login(authData));
    }
  };
};

export const logout = () => {
  return dispatch => {
    firebase.unauth();
    dispatch({ type: 'LOGOUT' });
  };
};
