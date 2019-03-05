import React, { Component } from "react";
import axios from "axios";

import "./App.css";
import Routes from "./Routes";
import NavMenu from "./containers/NavMenu/NavMenu";
import Footer from "./containers/Footer/Footer";

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
      await axios
        .get("/me?companyId=" + companyId, {
          headers: { Authorization: `JWT ${accessString}` }
        })
        .then(response => {
          console.log(response.data);
          this.setState({
            // firstName: response.data.firstName,
            // lastName: response.data.lastName,
            // email: response.data.email,
            username: response.data.username,
            // password: response.data.password,
            isLoading: false,
            isAuthenticated: response.data.isAuthenticated,
            error: false,
            isAuthenticating: false,
            companyName: response.data.companyName
          });
        })
        .catch(error => {
          console.error(error.response.data);
          this.setState({
            error: true,
            isAuthenticating: false
          });
          localStorage.removeItem("JWT"); //clear expired
          localStorage.removeItem("companyId");
        });
    }
  }

  userHasAuthenticated = (authenticated, username, companyId, companyName) => {
    this.setState({
      isAuthenticated: authenticated,
      username: username,
      companyId: companyId,
      companyName: companyName
    });
  };

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      username: this.state.username,
      companyName: this.state.companyName
    };

    return (
      !this.state.isAuthenticating && (
        <div className="App">
          {/* above div creates a fixed width container */}
          <NavMenu childProps={childProps} />
          <Routes childProps={childProps} />
          {this.state.isAuthenticated ? (
            <Footer childProps={childProps} />
          ) : null}
        </div>
      )
    );
  }
}

export default App;
