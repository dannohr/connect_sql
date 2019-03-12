import React, { Component } from "react";
import { connect } from "react-redux";
import { qbActions } from "../../_actions";
import { MDBDataTable } from "mdbreact";

import axios from "axios";

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
    // console.log(this.props.qbConnected);
    // if (this.props.qbConnected) {
    //   console.log("trying to get customers");
    //   let data = {
    //     body: "Select * from Customer startposition 1 maxresults 500"
    //   };
    //   axios
    //     .post("/api/qb/query", data)
    //     .then(response => {
    //       let data = this.createDataTable(response.data.QueryResponse.Customer);
    //       console.log(data);
    //       this.setState({ customerData: data });
    //       console.log(this.state);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       // return res.json(err);
    //     });
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
        }
      ],

      rows: arr.map((customer, index) => {
        return {
          customerId: customer.Id,
          name: customer.DisplayName,
          // city: customer.ShipAddr.City,
          // state: customer.ShipAddr.CountySubDivisionCode,
          SyncToken: customer.SyncToken
        };
      })
    };
    return data;
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
        <MDBDataTable striped bordered hover data={this.state.customerData} />
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
