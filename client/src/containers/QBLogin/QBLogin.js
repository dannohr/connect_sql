import React, { Component } from "react";
import { connect } from "react-redux";
import { qbActions } from "../../_actions";
import { MDBBtn } from "mdbreact";

import axios from "axios";

import "./QBLogin.css";

class QBLogin extends Component {
  constructor(props) {
    super(props);
  }

  handleLogin = e => {
    this.props.dispatch(qbActions.loginAndGetCompany());
  };
  handleLogout = () => {
    this.props.dispatch(qbActions.logout());
  };

  handleRefresh = async () => {
    try {
      let response = await axios.get("/api/qb/refresh");
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  handleGet = e => {
    this.props.dispatch(qbActions.getCompany());
  };

  render() {
    return (
      <div className="container">
        <div className="well text-center">
          <h1>Establish Quickbooks Connection</h1>
        </div>
        <div className="text-center">
          {this.props.qbConnected ? (
            <MDBBtn color="info" onClick={this.handleRefresh.bind(this)}>
              Refresh Token
            </MDBBtn>
          ) : (
            <MDBBtn color="success" onClick={this.handleLogin.bind(this)}>
              Login
            </MDBBtn>
          )}

          <MDBBtn outline color="danger" onClick={this.handleLogout.bind(this)}>
            Logout
          </MDBBtn>
        </div>
        <hr />
        <div className="text-center">
          {this.props.qbConnected
            ? "Successfully connected to " + this.props.companyData.CompanyName
            : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { qbConnected, companyData } = state.qb;
  return {
    qbConnected,
    companyData
  };
}

export default connect(mapStateToProps)(QBLogin);
