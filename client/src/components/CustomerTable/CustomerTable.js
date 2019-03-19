import React, { Component } from "react";
import { MDBContainer, MDBDataTable } from "mdbreact";

import "./CustomerTable.css";

class CustomerTable extends Component {
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
    // console.log(this.props.customerList);
    let tableData = this.props.customerList
      ? this.createDataTable(this.props.customerList)
      : null;

    return (
      <MDBContainer>
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
      </MDBContainer>
    );
  }
}

export default CustomerTable;
