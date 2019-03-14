import React, { Component } from "react";
import { connect } from "react-redux";
// import { qbActions } from "../../_actions";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";

import axios from "axios";

import "./Customer.css";

class Customer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataLoading: false,
      Active: false,
      Balance: "",
      CustomerName: "",
      SyncToken: "",
      qbId: ""
    };
  }

  handleChange = event => {
    console.log("updating ", event.target.id, " to ", event.target.value);
    // console.log(this.state.customerInfo);
    this.setState({
      ...this.state,
      [event.target.id]: event.target.value
    });
    // console.log(this.state.customerInfo);
  };

  handleAddCustomer = event => {
    console.log(this.state);
    axios({
      method: "post",
      url: "/api/addCustomer",
      data: this.state
      // config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
      .then(function(response) {
        //handle success
        console.log(response);
      })
      .catch(function(response) {
        //handle error
        console.log(response);
      });
  };

  handleActiveCheck = event => {
    console.log(this.state.customerInfo);
    this.setState({
      customerInfo: {
        ...this.state.customerInfo,
        [event.target.id]: event.target.value
      }
    });
  };

  render() {
    return (
      <MDBContainer>
        <h1>Add New Customer</h1>
        <MDBRow>
          <MDBCol md="6">
            <form>
              <div className="grey-text">
                <MDBInput
                  label="Customer Name"
                  group
                  type="text"
                  value={this.state.CustomerName}
                  onChange={this.handleChange}
                  id="CustomerName"
                />
                <MDBInput
                  label="Quickbooks ID"
                  group
                  value={this.state.qbId}
                  onChange={this.handleChange}
                  id="qbId"
                />
                <MDBInput
                  label="Customer Balance"
                  group
                  value={this.state.Balance}
                  onChange={this.handleChange}
                  id="Balance"
                />
                <MDBInput
                  label="Sync Token"
                  group
                  value={this.state.SyncToken}
                  onChange={this.handleChange}
                  id="SyncToken"
                />

                <div className="custom-control custom-checkbox pl-3">
                  <input
                    className="custom-control-input"
                    type="checkbox"
                    checked={this.state.Active}
                    id="Active"
                    required
                    onChange={() => {
                      this.setState({ Active: !this.state.Active });
                    }}
                  />
                  <label className="custom-control-label" htmlFor="Active">
                    Active Customer
                  </label>
                </div>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
        <div className="text-center">
          <MDBBtn color="primary" onClick={this.handleAddCustomer}>
            Add New Customer
          </MDBBtn>
        </div>
      </MDBContainer>
    );
  }
}

function mapStateToProps(state) {
  const { qbConnected } = state.qb;
  return {
    qbConnected
  };
}

// export default QBLogin;
export default connect(mapStateToProps)(Customer);

// handleGetCustomer() {
//   console.log(this.props.qbConnected);
//   if (this.props.qbConnected) {
//     console.log("trying to get customers");

//     axios
//       .get("/api/customer")
//       .then(response => {
//         console.log(response);
//         this.setState({ customerData: response });
//         console.log(this.state);
//       })
//       .catch(err => {
//         console.log(err);
//         // return res.json(err);
//       });
//   }
// }

// handleGetCustomerInfo = async () => {
//   console.log("trying to get customers");
//   // this is checking to see is a user is already logged in
//   const accessString = localStorage.getItem("JWT");
//   if (accessString == null) {
//     console.log("accessString is null");
//     this.setState({
//       isLoading: false,
//       error: true,
//       isAuthenticating: false
//     });
//   } else {
//     await axios
//       .get("/api/customer", {
//         headers: { Authorization: `JWT ${accessString}` }
//       })
//       .then(response => {
//         console.log(response.data);
//         // this.setState({
//         //   allUsers: response.data.allUsers,
//         //   message: response.data.message,
//         //   isAuthenticated: response.data.isAuthenticated,
//         //   isLoading: false
//         // });
//         // console.log(this.state);
//       })
//       .catch(error => {
//         console.error(error.response.data);
//         this.setState({
//           error: true,
//           isAuthenticating: false,
//           isAuthenticated: false
//         });
//         localStorage.removeItem("JWT"); //clear expired
//       });
//   }
// };
