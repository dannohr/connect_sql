import React, { Component } from "react";
import axios from "axios";
import { MDBDataTable, MDBContainer } from "mdbreact";
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
    // const users = this.state.allUsers;
    const users = this.state.allUsers.map(user => {
      return {
        userId: user.userId,
        name: user.name,
        username: user.username,
        email: user.email
      };
    });

    const data = {
      columns: [
        {
          label: "User ID",
          field: "userId",
          sort: "asc",
          width: 150
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
          width: 270
        },
        {
          label: "Username",
          field: "username",
          sort: "asc",
          width: 200
        },
        {
          label: "email",
          field: "email",
          sort: "asc",
          width: 100
        }
      ],
      rows: users
    };
    console.log(data);
    return (
      <MDBContainer>
        <h1>List of all users in database</h1>
        <MDBDataTable striped bordered hover data={data} />
      </MDBContainer>
    );
  }
}
