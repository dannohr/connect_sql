import React, { Component } from "react";
import { connect } from "react-redux";
import { qbActions } from "../../_actions";
import { MDBDataTable, MDBBtn } from "mdbreact";

import "./QBCustomers.css";

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
    console.log("qbConnected ", this.props.qbConnected);
    // if (this.props.qbConnected) {
    console.log("trying to get customers");
    this.props.dispatch(qbActions.getAllCustomers());
    // }
  }

  createDataTable = arr => {
    let data = {
      columns: [
        {
          label: "id",
          field: "customerId",
          sort: "asc",
          width: 150
        },
        {
          label: "name",
          field: "name",
          sort: "asc",
          width: 270
        },

        {
          label: "SyncToken",
          field: "SyncToken",
          sort: "asc",
          width: 270
        },

        {
          label: "Balance",
          field: "Balance",
          sort: "asc",
          width: 270
        },

        {
          label: "Active",
          field: "Active",
          sort: "asc",
          width: 270
        }
      ],

      rows: arr.map((customer, index) => {
        return {
          customerId: customer.Id,
          name: customer.DisplayName,
          SyncToken: customer.SyncToken,
          Balance: customer.Balance,
          Active: customer.Active ? "yes" : "no"
        };
      })
    };
    return data;
  };

  render() {
    let tableData = this.props.customers
      ? this.createDataTable(this.props.customers.Customer)
      : null;

    return (
      <div className="container">
        <div className="well text-center">
          <h1>Quickbooks Customers</h1>
        </div>
        <MDBBtn
          outline
          color="primary"
          size="sm"
          onClick={this.handleRefresh.bind(this)}
        >
          Refresh
        </MDBBtn>
        {tableData ? (
          <MDBDataTable
            striped
            bordered
            hover
            data={tableData}
            entries={10}
            small
          />
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
