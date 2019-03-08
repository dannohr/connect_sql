import React, { Component } from "react";
import { MDBBtn } from "mdbreact";

// import queryString from "query-string";
// import config from "./config";
import axios from "axios";

import "./QBLogin.css";

class QBLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      realmId: "",
      payload: "",
      scope: "",
      oauth2_token: {
        x_refresh_token_expires_in: 0,
        refresh_token: "",
        access_token: "",
        token_type: "",
        expires_in: 0
      },
      redirectUri: "",
      companyInfo: ""
    };
  }

  componentDidMount() {
    const QB = JSON.parse(localStorage.getItem("QB"));

    if (QB) {
      console.log("There is a QB token");
      console.log(QB);
      this.setState({
        oauth2_token: {
          x_refresh_token_expires_in: QB.x_refresh_token_expires_in,
          refresh_token: QB.refresh_token,
          access_token: QB.access_token,
          token_type: QB.token_type,
          expires_in: QB.expires_in
        }
      });
    }
  }

  getAuthUri = async () => {
    try {
      let response = await axios.get("api/qbauth");
      return await response.data;
    } catch (err) {
      console.log(err);
    }
  };

  getRedirectUri = async auth => {
    // Launch Popup using the JS window Object

    //Get the web address for the window that will popup
    auth = await this.getAuthUri();

    var parameters = "location=1,width=600,height=800";
    var win = window.open(auth, "connectPopup", parameters);

    var pollOAuth = window.setInterval(() => {
      try {
        if (win.document.URL.indexOf("code") !== -1) {
          window.clearInterval(pollOAuth);
          const redirectUri = win.document.URL;

          this.setState({ redirectUri });

          win.close();
          this.getCallback();
        }
      } catch (e) {
        //console.log(e);
      }
    }, 100);
  };

  getCallback = async () => {
    try {
      let response = await axios.get(this.state.redirectUri);
      this.setState({ oauth2_token: response.data });
      console.log(this.state.oauth2_token);
      localStorage.setItem("QB", JSON.stringify(this.state.oauth2_token));
    } catch (err) {
      console.log(err);
    }
  };

  handleLogin = async () => {
    console.log(this.state.authUri);
    this.getRedirectUri(this.state.authUri);
  };

  handleRefresh = async () => {
    try {
      let response = await axios.get("/api_call/refresh");
      console.log(response.data);
      // this.setState({ companyInfo: response.data });
      // return await response.data;
    } catch (err) {
      console.log(err);
    }
  };

  handleGetCompanyInfo = async () => {
    try {
      let response = await axios.get("/api_call");
      console.log(response);
      if (response.data.error === "Not authorized") {
        localStorage.removeItem("QB");
        this.setState({
          oauth2_token: {
            x_refresh_token_expires_in: 0,
            refresh_token: "",
            access_token: "",
            token_type: "",
            expires_in: 0
          }
        });
      } else {
        this.setState({ companyInfo: response.data });
      }
      // return await response.data;
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className="container">
        <div className="well text-center">
          <h1>Establish Connection</h1>
        </div>

        <h2>OAuth2.0</h2>
        <h4>
          (Please refer to the
          <a
            target="_balnk"
            href="https://developer.intuit.com/docs/00_quickbooks_online/2_build/10_authentication_and_authorization/10_oauth_2.0"
          >
            OAuth2.0 Documentation
          </a>
          )
        </h4>
        <p>
          If there is no access token or the access token is invalid, click the
          <b> Connect to QuickBooks</b> button below.
        </p>

        <img
          src="./assets/C2QB_green_btn_lg_default.png"
          width="178"
          alt="login button"
          onClick={this.handleLogin.bind(this)}
          // onClick={this.handleRefresh}
        />

        <MDBBtn onClick={this.handleLogin.bind(this)}>Login</MDBBtn>
        <button
          type="button"
          id="refreshToken"
          className="btn btn-success"
          onClick={this.handleRefresh}
        >
          Refresh Token
        </button>

        <button
          type="button"
          className="btn btn-success"
          onClick={this.handleTestCall}
        >
          Testing API
        </button>
        <hr />

        <p>Token</p>
        <pre> {JSON.stringify(this.state.oauth2_token, null, 2)} </pre>

        <p>redirectURI</p>
        <pre> {JSON.stringify(this.state.redirectUri, null, 2)} </pre>
        <hr />
        <button
          type="button"
          className="btn btn-success"
          onClick={this.handleGetCompanyInfo}
        >
          Get Company Info
        </button>

        <pre> {JSON.stringify(this.state.companyInfo, null, 2)} </pre>
      </div>
    );
  }
}

export default QBLogin;
