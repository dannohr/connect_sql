import React, { Component } from "react";
import axios from "axios";
import { MDBDataTable, MDBContainer, MDBNavLink, MDBIcon } from "mdbreact";
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

  handleEdit = () => {
    console.log("Edit User");
  };

  render() {
    const users = this.state.allUsers.map((user, index) => {
      return {
        // id: index,
        editUser: (
          <MDBNavLink to={"/user/" + user.userId}>
            <MDBIcon
              far
              icon="edit"
              size="sm"
              id={index}
              onClick={this.handleEdit}
            />
          </MDBNavLink>
        ),
        userId: user.userId,
        name: user.name,
        username: user.username,
        email: user.email
      };
    });

    const data = {
      columns: [
        {
          label: "Edit",
          field: "id",
          width: 15
        },

        {
          label: "User ID",
          field: "userId",
          sort: "asc",
          width: 10
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

    return (
      <MDBContainer>
        <h1>List of all users in database</h1>
        <MDBDataTable striped bordered hover small data={data} />
      </MDBContainer>
    );
  }
}
