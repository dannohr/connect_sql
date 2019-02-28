import React, { Component } from "react";
import axios from "axios";
import "./Login.css";
import LoaderButton from "../../components/LoaderButton/LoaderButton";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBCardHeader,
  MDBIcon,
  MDBAlert
} from "mdbreact";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      username: "",
      loggedIn: false,
      showError: false,
      isLoading: false,
      companyList: [],
      multipleCompany: false
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
      showError: false
    });
    // console.log("id is: ", event.target.id, " value is: ", event.target.value);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ isLoading: true });

    const { username, password } = this.state;

    axios
      .post("/loginUser", {
        username,
        password
      })
      .then(response => {
        console.log(response.data);

        let companyList = response.data.company.map(company => {
          return {
            companyName: company.Company.name,
            companyId: company.Company.id
          };
        });
        console.log("there are ", companyList.length, " companies");

        console.log(companyList);

        if (companyList.length === 1) {
          // send back logged in, user name, and company
          this.setState({
            loggedIn: true,
            showError: false
          });
          localStorage.setItem("JWT", response.data.token);
          localStorage.setItem("companyId", companyList[0].companyId);
          this.props.userHasAuthenticated(
            true,
            username,
            companyList[0].companyId,
            companyList[0].companyName
          );
          // this.props  coming from app.js
        } else {
          console.log("more than one company");
          // Hide login button and show company list to select from
          this.setState({
            isLoading: false,
            multipleCompany: true,
            companyList: companyList,
            token: response.data.token
          });
        }
      })
      .catch(error => {
        console.error(error.response.data);
        if (
          error.response.data === "bad username" ||
          error.response.data === "passwords do not match"
        ) {
          this.setState({
            showError: true,
            isLoading: false
          });
        }
      });
  };

  handleCompanySelect = e => {
    let compId = Number(e.target.value);

    let companyName = this.state.companyList.find(
      item => item.companyId === compId
    );

    localStorage.setItem("JWT", this.state.token);
    localStorage.setItem("companyId", compId);
    this.props.userHasAuthenticated(
      true,
      this.state.username,
      compId,
      companyName.companyName
    );
  };

  render() {
    const { showError } = this.state;

    let companyList = this.state.companyList.map(company => {
      return (
        <option value={company.companyId} key={company.companyId}>
          {company.companyName}
        </option>
      );
    });

    return (
      <div className="Login">
        <MDBContainer>
          <MDBRow center>
            <MDBCol md="6">
              <MDBCard>
                <MDBCardBody>
                  <MDBCardHeader className="form-header winter-neva-gradient rounded">
                    <h3 className="my-3">
                      <MDBIcon icon="lock" /> Login:
                    </h3>
                  </MDBCardHeader>
                  <form onSubmit={this.handleSubmit}>
                    <div className="grey-text">
                      <MDBInput
                        id="username"
                        label="User Name"
                        icon="user"
                        group
                        type="text"
                        value={this.state.username}
                        onChange={this.handleChange}
                      />

                      <MDBInput
                        id="password"
                        label="Password"
                        icon="lock"
                        group
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                      />
                      {/* </div> */}

                      {/* Hide if there's more than one company after logging in */}
                      {!this.state.multipleCompany ? (
                        <LoaderButton
                          block
                          disabled={!this.validateForm()}
                          type="submit"
                          isLoading={this.state.isLoading}
                          text="Login"
                          loadingText="Logging in…"
                        />
                      ) : null}

                      {/* Show if there's more than one company after logging in */}
                      {this.state.multipleCompany ? (
                        <div>
                          <select
                            className="browser-default custom-select"
                            id="companyId"
                            onChange={this.handleCompanySelect}
                            defaultValue=""
                          >
                            <option value="" disabled hidden>
                              Select Company
                            </option>
                            {companyList}
                          </select>
                        </div>
                      ) : null}
                    </div>
                  </form>

                  <MDBModalFooter>
                    <div className="font-weight-light">
                      <p>Forgot Password?</p>
                    </div>
                  </MDBModalFooter>
                </MDBCardBody>
              </MDBCard>
              {showError && (
                <div className="text-center">
                  <MDBAlert color="danger">
                    That username or password isn&apos;t recognized. Please try
                    again or register now.
                  </MDBAlert>
                </div>
              )}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}
