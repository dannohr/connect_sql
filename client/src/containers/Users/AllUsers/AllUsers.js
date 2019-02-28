import React, { Component } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
// import LoaderButton from "../components/LoaderButton";
import "./AllUsers.css";

export default class AllUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isAuthenticating: false,
      isAuthenticated: false,
      error: false,
      message: "",
      allUsers: []
    };
  }

  async componentDidMount() {
    // this is checking to see is a user is already logged in
    const accessString = localStorage.getItem("JWT");
    if (accessString == null) {
      console.log("accessString is null");
      this.setState({
        isLoading: false,
        error: true,
        isAuthenticating: false
      });
    } else {
      await axios
        .get("/users", {
          headers: { Authorization: `JWT ${accessString}` }
        })
        .then(response => {
          this.setState({
            allUsers: response.data.allUsers,
            message: response.data.message,
            isAuthenticated: response.data.isAuthenticated,
            isLoading: false
          });
          console.log(this.state);
        })
        .catch(error => {
          console.error(error.response.data);
          this.setState({
            error: true,
            isAuthenticating: false,
            isAuthenticated: false
          });
          localStorage.removeItem("JWT"); //clear expired
        });
    }
  }

  render() {
    const users = this.state.allUsers;
    const columns = [
      {
        dataField: "userId",
        text: "User ID"
      },
      {
        dataField: "name",
        text: "Name",
        sort: true
      },
      {
        dataField: "username",
        text: "Username",
        sort: true
      },
      {
        dataField: "email",
        text: "email",
        sort: true
      }
    ];

    return (
      <div>
        <h1>List of all users in database</h1>
        <BootstrapTable
          keyField="userId"
          data={users}
          columns={columns}
          bootstrap4
        />
      </div>
    );
  }
}
