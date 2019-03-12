import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { authActions } from "./_actions/auth.actions";
import { qbActions } from "./_actions/qb.actions";
import "./App.css";
import Routes from "./Routes";
import NavMenu from "./containers/NavMenu/NavMenu";
import Footer from "./components/Footer/Footer";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      username: "",
      companyId: null
    };
  }

  async componentDidMount() {
    // this is checking to see is a user is already logged in
    const accessString = localStorage.getItem("JWT");
    const companyId = localStorage.getItem("companyId");

    console.log("attempting to login to company ", companyId);

    if (accessString == null) {
      console.log("accessString is null");
      this.setState({
        isLoading: false,
        error: true,
        isAuthenticating: false,
        companyId: null,
        isAuthenticated: false
      });
    } else {
      this.props.dispatch(authActions.getMe());
      this.props.dispatch(qbActions.getCompany());
    }
  }

  render() {
    const childProps = {
      isAuthenticated: this.props.isAuthenticated
    };

    return (
      !this.props.isAuthenticating && (
        <div className="App">
          {/* above div creates a fixed width container */}
          <NavMenu isAuthenticated={this.props.isAuthenticated} />
          <Routes childProps={childProps} />
          {this.props.isAuthenticated ? (
            <Footer
              username={this.props.username}
              companyName={this.props.companyLoggedIn.name}
              qbConnected={this.props.qbConnected}
              qbCompanyData={this.props.companyData}
            />
          ) : null}
        </div>
      )
    );
  }
}

function mapStateToProps(state) {
  const { isAuthenticated, companyLoggedIn, username } = state.authentication;
  const { qbConnected, companyData } = state.qb;
  return {
    isAuthenticated,
    companyLoggedIn,
    username,
    qbConnected,
    companyData
  };
}

export default withRouter(connect(mapStateToProps)(App));
