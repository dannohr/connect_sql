import React, { Component } from "react";
import { connect } from "react-redux";
import { qbActions } from "../../_actions";
import { qbService } from "../../_services";
import { MDBBtn, MDBAlert, MDBContainer, MDBRow, MDBCol } from "mdbreact";

import "./QBCustomers.css";
import CustomerTable from "../../components/CustomerTable/CustomerTable";

class QBCustomers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataLoading: false,
      customerData: {}
    };
  }

  componentDidMount() {
    this.handleRefresh();
  }

  handleRefresh() {
    this.props.dispatch(qbActions.getAllCustomers());
  }

  handleCopyAllFromQuickbooks() {
    console.log("Copying all customers from quickbooks to local database");
    let allCustomers = this.props.customers.Customer;
    console.log(allCustomers);

    //build an array with only the fields we're going to copy over
    let allCustomerBody = [];
    allCustomers.forEach(customer => {
      allCustomerBody.push({
        qbId: customer.Id,
        Active: customer.Active,
        Balance: customer.Balance,
        CustomerName: customer.DisplayName,
        SyncToken: customer.SyncToken
      });
    });
    console.log(allCustomerBody);

    qbService.copyQBdataToDB(allCustomerBody, "Customer");
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
              onClick={this.handleRefresh.bind(this)}
            >
              Refresh
            </MDBBtn>
          </MDBCol>
          <MDBCol>
            <MDBBtn
              outline
              color="warning"
              size="sm"
              onClick={this.handleCopyAllFromQuickbooks.bind(this)}
              className="float-right"
            >
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
          <h1>Quickbooks Customers</h1>
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
export default connect(mapStateToProps)(QBCustomers);
