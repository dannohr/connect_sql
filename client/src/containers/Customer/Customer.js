import React, { Component } from "react";
import { connect } from "react-redux";
// import { qbActions } from "../../_actions";
// import { getAllCustomers } from "../../_services/customer.service";
import { customerService } from "../../_services";
import { MDBBtn, MDBAlert, MDBContainer, MDBRow, MDBCol } from "mdbreact";

import "./Customer.css";
import CustomerTable from "../../components/CustomerTable/CustomerTable";

class Customer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataLoading: false,
      customerData: {}
    };
  }

  componentDidMount() {
    // this.handleRefresh();
  }

  handleRefresh() {
    customerService.getAllCustomers();
  }

  render() {
    let alert = this.props.qbConnected ? (
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <MDBBtn
              outline
              color="primary"
              size="sm"
              onClick={this.handleRefresh}
            >
              Refresh
            </MDBBtn>
          </MDBCol>
          <MDBCol>
            <MDBBtn outline color="warning" size="sm" className="float-right">
              Copy all local
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    ) : (
      <MDBAlert color="danger" className="text-center">
        Login in to Quickbooks to access data
      </MDBAlert>
    );

    return (
      <div className="container">
        <div className="well text-center">
          <h1>Customers</h1>
        </div>

        {alert}

        {this.props.customers ? (
          <CustomerTable customerList={this.props.customers.Customer} />
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { qbConnected, customers } = state.qb;

  return {
    qbConnected,
    customers
  };
}

// export default QBLogin;
export default connect(mapStateToProps)(Customer);
