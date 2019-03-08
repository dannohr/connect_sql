import React, { Component } from "react";
import { connect } from "react-redux";
import { authActions } from "../../_actions";
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

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { username, password } = this.state;
    const { dispatch } = this.props;

    if (username && password) {
      dispatch(authActions.login(username, password));
    }
  };

  handleCompanySelect = e => {
    let compId = Number(e.target.value);

    localStorage.setItem("companyId", compId);
    this.props.dispatch(authActions.getMe());
  };

  render() {
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

                      {/* Hide if there's more than one company after logging in */}
                      {!this.props.multiCompany ? (
                        <LoaderButton
                          block
                          disabled={!this.validateForm()}
                          type="submit"
                          isLoading={this.props.isLoading}
                          text="Login"
                          loadingText="Logging in…"
                        />
                      ) : null}

                      {/* Show if there's more than one company after logging in */}
                      {this.props.multiCompany ? (
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
                            {this.props.companyList.map(company => (
                              <option value={company.id} key={company.id}>
                                {company.name}
                              </option>
                            ))}
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
              {this.props.showError && (
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

function mapStateToProps(state) {
  const {
    isAuthenticated,
    showError,
    isLoading,
    multiCompany,
    companyList
  } = state.authentication;
  return {
    isAuthenticated,
    showError,
    isLoading,
    multiCompany,
    companyList
  };
}

export default connect(mapStateToProps)(Login);
