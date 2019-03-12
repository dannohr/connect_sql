import React, { Component } from "react";
import { connect } from "react-redux";
import { qbActions } from "../../_actions";
import { MDBBtn } from "mdbreact";

import axios from "axios";

import "./QBCustomers.css";

class QBCustomers extends Component {
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
  }

  handleLogin = e => {
    this.props.dispatch(qbActions.login());
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
          <h1>Quickbooks Customers</h1>
        </div>
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
export default connect(mapStateToProps)(QBCustomers);
