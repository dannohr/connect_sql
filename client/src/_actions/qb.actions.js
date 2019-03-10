import { qbConstants } from "../_constants";
import { authService } from "../_services";
import { alertActions } from "./";

export const authActions = {
  login, //log in new user
  logout, // log existing user out
  getMe // when token and companyId are stored in local starge, look user up
};

function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));

    authService.login(username, password).then(
      user => {
        dispatch(success(user));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request(user) {
    return { type: qbConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: qbConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: qbConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  authService.logout();
  return { type: qbConstants.LOGOUT };
}

function getMe() {
  return dispatch => {
    dispatch(requestMe());

    authService
      .getMe()
      .then(
        users => dispatch(successMe(users)),
        error => dispatch(failureMe(error))
      );
  };

  function requestMe() {
    return { type: qbConstants.GETME_REQUEST };
  }
  function successMe(users) {
    return { type: qbConstants.GETME_SUCCESS, users };
  }
  function failureMe(error) {
    return { type: qbConstants.GETME_FAILURE, error };
  }
}
