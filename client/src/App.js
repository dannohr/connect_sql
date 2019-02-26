import React, { Component } from "react";
import axios from "axios";

import "./App.css";
import Routes from "./Routes";
import NavMenu from "./containers/NavMenu/NavMenu";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      username: ""
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
      console.log(accessString);

      await axios
        .get("/findUser", {
          headers: { Authorization: `JWT ${accessString}` }
        })
        .then(response => {
          this.setState({
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            email: response.data.email,
            username: response.data.username,
            password: response.data.password,
            isLoading: false,
            isAuthenticated: response.data.isAuthenticated,
            error: false,
            isAuthenticating: false
          });
        })
        .catch(error => {
          console.error(error.response.data);
          this.setState({
            error: true,
            isAuthenticating: false
          });
          localStorage.removeItem("JWT"); //clear expired
        });
    }
  }

  userHasAuthenticated = (authenticated, username) => {
    this.setState({ isAuthenticated: authenticated, username: username });
    console.log(this.state);
  };

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      username: this.state.username
    };

    return (
      !this.state.isAuthenticating && (
        <div className="App container">
          {/* above div creates a fixed width container */}
          <NavMenu childProps={childProps} />
          <Routes childProps={childProps} />
        </div>
      )
    );
  }
}

export default App;
