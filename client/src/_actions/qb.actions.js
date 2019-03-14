import { qbConstants } from "../_constants";
import { qbService } from "../_services";
import { alertActions } from "./";
import axios from "axios";

export const qbActions = {
  login, //log in new user
  logout, // log existing user out
  loginAndGetCompany,
  getCompany,
  getAllCustomers
};

function login() {
  return dispatch => {
    dispatch(request({ type: qbConstants.LOGIN_REQUEST }));

    return qbService.login().then(
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

function logout() {
  return dispatch => {
    dispatch(request({ type: qbConstants.LOGOUT_REQUEST }));

    return qbService.logout().then(
      data => {
        dispatch(success({ type: qbConstants.LOGOUT_SUCCESS }, data));
      },
      error => {
        console.log(error);
        dispatch(failure({ type: qbConstants.LOGOUT_FAILURE }, "error"));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function request(type) {
  return { ...type };
}
function success(type, data) {
  // console.log(data);
  return { ...type, data };
}
function failure(type, error) {
  return { ...type, error };
}

function getCompany() {
  return dispatch => {
    dispatch(request({ type: qbConstants.GETCOMPANY_REQUEST }));

    return qbService.getCompany().then(
      data => {
        if (data) {
          dispatch(
            success({ type: qbConstants.GETCOMPANY_SUCCESS }, data.CompanyInfo)
          );
        } else {
          dispatch(
            failure({ type: qbConstants.GETCOMPANY_FAILURE }, "not working")
          );
        }
      },
      error => {
        dispatch(failure({ type: qbConstants.LOGIN_FAILURE }, error));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function loginAndGetCompany() {
  return dispatch => {
    return dispatch(login()).then(() => {
      return dispatch(getCompany());
    });
  };
}

function getAllCustomers() {
  return dispatch => {
    dispatch(request({ type: qbConstants.GETALLCUSTOMERS_REQUEST }));

    let config = {
      body: "Select * from Customer startposition 1 maxresults 500"
    };
    axios.post("/api/qb/query", config).then(
      response => {
        if (response) {
          dispatch(
            success(
              { type: qbConstants.GETALLCUSTOMERS_SUCCESS },
              response.data.QueryResponse
            )
          );
        } else {
          console.log("failing");
          dispatch(
            failure(
              { type: qbConstants.GETALLCUSTOMERS_FAILURE },
              "not working"
            )
          );
        }
      },
      error => {
        dispatch(failure({ type: qbConstants.GETALLCUSTOMERS_FAILURE }, error));
        dispatch(alertActions.error(error));
      }
    );
  };
}
