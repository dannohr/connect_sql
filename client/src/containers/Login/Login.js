import React, { Component } from "react";
import axios from "axios";
import { FormGroup, FormControl, Form } from "react-bootstrap";
import "./Login.css";
import LoaderButton from "../../components/LoaderButton/LoaderButton";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";

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
      [event.target.id]: event.target.value
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
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username">
            <Form.Label>Username</Form.Label>
            <FormControl
              autoFocus
              value={this.state.username}
              onChange={this.handleChange}
              type="text"
            />
          </FormGroup>
          <FormGroup controlId="password">
            <Form.Label>Password</Form.Label>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>

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
            <Form.Group controlId="companyId">
              <Form.Label>Select a Company</Form.Label>
              <Form.Control
                as="select"
                // onChange={this.handleChange}
                onChange={this.handleCompanySelect}
                value={this.state.companyId}
              >
                <option value="0" key="0">
                  Select One
                </option>
                {companyList}
              </Form.Control>
            </Form.Group>
          ) : null}
        </form>

        {showError && (
          <div>
            <p>
              That username or password isn&apos;t recognized. Please try again
              or register now.
            </p>
            <p> Maybe add something here to go to Registration screen?</p>
          </div>
        )}

        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <form>
                <p className="h5 text-center mb-4">Sign in</p>
                <div className="grey-text">
                  <MDBInput
                    label="Type your email"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Type your password"
                    icon="lock"
                    group
                    type="password"
                    validate
                  />
                </div>
                <div className="text-center">
                  <MDBBtn>Login</MDBBtn>
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}
