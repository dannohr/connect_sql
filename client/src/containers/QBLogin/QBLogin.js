import React, { Component } from "react";
import { connect } from "react-redux";
import { qbActions } from "../../_actions";
import { MDBBtn } from "mdbreact";

import axios from "axios";

import "./QBLogin.css";

class QBLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // qbConnected: false,
      payload: "",
      scope: "",
      companyInfo: ""
    };
  }

  componentDidMount() {
    this.handleGetCompanyInfo();
  }

  handleLogin = e => {
    this.props.dispatch(qbActions.login());
  };

  handleRefresh = async () => {
    try {
      let response = await axios.get("/api/qb/refresh");
      console.log(response.data);
      // this.setState({ companyInfo: response.data });
      // return await response.data;
    } catch (err) {
      console.log(err);
    }
  };

  handleRevoke = async () => {
    try {
      let response = await axios.get("/api/qb/revoke");
      console.log(response.data);
      // this.setState({ companyInfo: response.data });
      // return await response.data;
    } catch (err) {
      console.log(err);
    }
  };

  handleGetCompanyInfo = async () => {
    try {
      let response = await axios.get("/api/qb/company");
      if (response.data.error === "Not authorized") {
        console.log(response.data);
      } else {
        this.setState({ companyInfo: response.data });
      }
      // return await response.data;
    } catch (err) {
      console.log(err);
    }
  };

  handleGet = e => {
    this.props.dispatch(qbActions.getCompany());
  };

  handleGetCustomerInfo = async () => {
    console.log("trying to get customers");
    let data = {
      body: "Select * from Customer startposition 1 maxresults 500"
    };
    axios
      .post("/api/qb/query", data)
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
        // return res.json(err);
      });
  };

  render() {
    return (
      <div className="container">
        <div className="well text-center">
          <h1>Establish Quickbooks Connection</h1>
        </div>

        <img
          src="./assets/C2QB_green_btn_lg_default.png"
          width="178"
          alt="login button"
          onClick={this.handleLogin.bind(this)}
          // onClick={this.handleRefresh}
        />

        <MDBBtn onClick={this.handleLogin.bind(this)}>Login</MDBBtn>

        <MDBBtn onClick={this.handleRefresh.bind(this)}>Refresh Token</MDBBtn>

        <MDBBtn onClick={this.handleRevoke.bind(this)}>Revoke Token</MDBBtn>

        <hr />

        <p>Token</p>
        <pre> {JSON.stringify(this.state.oauth2_token, null, 2)} </pre>

        <hr />
        <button
          type="button"
          className="btn btn-success"
          onClick={this.handleGet}
        >
          Get Company Info
        </button>

        <button
          type="button"
          className="btn btn-success"
          onClick={this.handleGetCustomerInfo}
        >
          Get Customer Info
        </button>

        <pre> {JSON.stringify(this.state.companyInfo, null, 2)} </pre>
      </div>
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
export default connect(mapStateToProps)(QBLogin);
