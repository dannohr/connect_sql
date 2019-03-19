import { qbConstants } from "../_constants";
// import { customerService } from "../_services";
// import { alertActions } from ".";

export const customerActions = {
  getAllCustomers
};

function request(type) {
  return { ...type };
}
// function success(type, data) {
//   // console.log(data);
//   return { ...type, data };
// }
// function failure(type, error) {
//   return { ...type, error };
// }

function getAllCustomers() {
  return dispatch => {
    dispatch(request({ type: qbConstants.GETCOMPANY_REQUEST }));

    // return qbService.getCompany().then(
    //   data => {
    //     if (data) {
    //       dispatch(
    //         success({ type: qbConstants.GETCOMPANY_SUCCESS }, data.CompanyInfo)
    //       );
    //     } else {
    //       dispatch(
    //         failure({ type: qbConstants.GETCOMPANY_FAILURE }, "not working")
    //       );
    //     }
    //   },
    //   error => {
    //     dispatch(failure({ type: qbConstants.LOGIN_FAILURE }, error));
    //     dispatch(alertActions.error(error));
    //   }
    // );
  };
}
