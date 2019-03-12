import { qbConstants } from "../_constants";
import { qbService } from "../_services";
import { alertActions } from "./";

export const qbActions = {
  login, //log in new user
  logout, // log existing user out
  getCompany // when token and companyId are stored in local starge, look user up
};

function login() {
  return dispatch => {
    dispatch(request({ type: qbConstants.LOGIN_REQUEST }));

    qbService.login().then(
      data => {
        dispatch(success({ type: qbConstants.LOGIN_SUCCESS }, data));
      },
      error => {
        dispatch(failure({ type: qbConstants.LOGIN_FAILURE }, error));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function request(type) {
  return { ...type };
}
function success(type, data) {
  console.log(data);
  return { ...type, data };
}
function failure(type, error) {
  return { ...type, error };
}

function logout() {
  // qbService.logout();
  return { type: qbConstants.LOGOUT };
}

function getCompany() {
  return dispatch => {
    dispatch(request({ type: qbConstants.GETCOMPANY_REQUEST }));

    qbService.getCompany().then(
      data => {
        console.log(data);
        // console.log(data.CompanyInfo);
        if (data) {
          dispatch(
            success({ type: qbConstants.GETCOMPANY_SUCCESS }, data.CompanyInfo)
          );
        } else {
          console.log("failing");
          failure({ type: qbConstants.GETCOMPANY_FAILURE }, "not working");
        }
      },
      error => {
        dispatch(failure({ type: qbConstants.LOGIN_FAILURE }, error));
        dispatch(alertActions.error(error));
      }
    );
  };
}
