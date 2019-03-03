import React, { Component, Fragment } from "react";
import axios from "axios";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
  MDBIcon,
  MDBNavLink
} from "mdbreact";

import "./EditUser.css";
import SavePasswordButton from "../../../components/SavePasswordButton/SavePasswordButton";

export default class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      userInfo: {},
      newUser: false
    };
  }

  async componentDidMount() {
    console.log("mounting");
    let userId = this.props.match.params.userId;
    console.log(parseInt(userId));
    // this is checking to see is a user is already logged in
    const accessString = localStorage.getItem("JWT");

    if (accessString == null) {
      console.log("accessString is null");
      this.setState({
        isLoading: false,
        error: true,
        isAuthenticating: false
      });
    }
    //check if userId is a number, only make axios call if it is
    else if (userId == parseInt(userId)) {
      await axios
        .get("/user?userId=" + userId, {
          headers: { Authorization: `JWT ${accessString}` }
        })
        .then(response => {
          console.log(response);
          this.setState({
            isLoading: false,
            isAuthenticated: response.data.isAuthenticated,
            userInfo: response.data.userInfo
          });
          // console.log(response.data);
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
    //if userId not a number, treat is as creating a new user
    else {
      console.log("New ");
      this.setState({
        isLoading: false,
        userInfo: {},
        newUser: true
      });
      console.log(this.state);
    }
  }

  handleChange = event => {
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        [event.target.id]: event.target.value
      }
    });
    console.log(this.state.userInfo);
  };

  handleEditUser = () => {
    console.log("API Call to save data");
  };
  handleNewUser = () => {
    console.log("API Call to create new user");
  };

  render() {
    return (
      <MDBContainer>
        {this.state.newUser ? <h1>Create User</h1> : <h1>Edit User</h1>}

        <MDBNavLink to={"/user/all"}>
          <MDBBtn color="primary" size="sm" className="mb-4">
            <MDBIcon icon="arrow-left" className="mr-1" /> Back
          </MDBBtn>
        </MDBNavLink>

        <MDBRow className="border">
          <MDBCol>
            <form>
              <MDBRow center>
                <MDBCol md="4">
                  <MDBInput
                    id="username"
                    label="Username"
                    icon="user"
                    group
                    type="text"
                    size="sm"
                    value={this.state.userInfo.username}
                    onChange={this.handleChange}
                  />
                </MDBCol>
                <MDBCol md="4">
                  <MDBInput
                    id="email"
                    label="Email"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    value={this.state.userInfo.email}
                    onChange={this.handleChange}
                  />
                </MDBCol>
              </MDBRow>

              <MDBRow center>
                <MDBCol md="4">
                  <MDBInput
                    id="first_name"
                    label="First Name"
                    icon="user"
                    group
                    type="text"
                    size="sm"
                    value={this.state.userInfo.first_name}
                    onChange={this.handleChange}
                  />
                </MDBCol>
                <MDBCol md="4">
                  <MDBInput
                    id="last_name"
                    label="Last Name"
                    icon="user"
                    group
                    type="text"
                    size="sm"
                    value={this.state.userInfo.last_name}
                    onChange={this.handleChange}
                  />
                </MDBCol>
              </MDBRow>
              {this.state.newUser ? (
                <Fragment>
                  <MDBRow center>
                    <MDBCol md="4">
                      <MDBInput
                        id="password"
                        label="Password"
                        icon="key"
                        group
                        type="text"
                        size="sm"
                        onChange={this.handleChange}
                      />
                    </MDBCol>
                    <MDBCol md="4" className="my-auto center">
                      <div>
                        <select className="browser-default custom-select">
                          <option>Select Initial Company</option>
                          <option value="1">Option 1</option>
                          <option value="2">Option 2</option>
                          <option value="3">Option 3</option>
                        </select>
                      </div>
                    </MDBCol>
                  </MDBRow>
                </Fragment>
              ) : null}

              <MDBRow center>
                {this.state.newUser ? (
                  <MDBBtn
                    color="primary"
                    onClick={this.handleNewUser}
                    className="center"
                  >
                    Save New User
                  </MDBBtn>
                ) : (
                  <MDBBtn
                    color="primary"
                    onClick={this.handleEditUser}
                    className="center"
                  >
                    Save Changes
                  </MDBBtn>
                )}
              </MDBRow>
            </form>
          </MDBCol>
        </MDBRow>

        {this.state.newUser ? null : (
          <Fragment>
            <MDBRow className="justify-content-md-left my-0 py-0 mt-5">
              <MDBCol>Reset User Password</MDBCol>
            </MDBRow>

            <MDBRow center>
              <MDBCol md="4">
                <MDBInput
                  id="password"
                  label="Password"
                  icon="key"
                  group
                  type="text"
                  size="sm"
                  onChange={this.handleChange}
                />
              </MDBCol>
              <MDBCol md="4" className="my-auto center">
                <SavePasswordButton
                  username={this.state.userInfo.username}
                  password={this.state.userInfo.password}
                />
              </MDBCol>
            </MDBRow>
          </Fragment>
        )}
      </MDBContainer>
    );
  }
}
