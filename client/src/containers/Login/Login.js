import React, { Component } from "react";
import axios from "axios";
import { FormGroup, FormControl, Form } from "react-bootstrap";
import "./Login.css";
import LoaderButton from "../../components/LoaderButton/LoaderButton";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      username: "",
      loggedIn: false,
      showError: false,
      showNullError: false,
      isLoading: false
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
    this.setState({ isLoading: true });

    const { username, password } = this.state;
    if (username === "" || password === "") {
      this.setState({
        showError: false,
        showNullError: true,
        loggedIn: false
      });
    } else {
      axios
        .post("/loginUser", {
          username,
          password
        })
        .then(response => {
          console.log(response.data);
          localStorage.setItem("JWT", response.data.token);

          this.setState({
            loggedIn: true,
            showError: false,
            showNullError: false
          });
          this.props.userHasAuthenticated(true, username);
          //   coming from app.js
        })
        .catch(error => {
          console.error(error.response.data);
          if (
            error.response.data === "bad username" ||
            error.response.data === "passwords do not match"
          ) {
            this.setState({
              showError: true,
              showNullError: false,
              isLoading: false
            });
          }
        });
    }
  };

  render() {
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
          <LoaderButton
            block
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in…"
          />
        </form>
      </div>
    );
  }
}
