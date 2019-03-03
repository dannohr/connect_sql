import React, { Component } from "react";
import axios from "axios";
import { MDBBtn } from "mdbreact";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./SavePasswordButton.css";

export default class SavePasswordButton extends Component {
  updatePassword = e => {
    const accessString = localStorage.getItem("JWT");
    console.log(
      "changing password for ",
      this.props.username,
      " to ",
      this.props.password
    );
    if (accessString === null) {
      this.setState({
        loadingUser: false,
        error: true
      });
    } else {
      //   e.preventDefault();
      axios
        .put(
          "/updatePassword",
          {
            username: this.props.username,
            password: this.props.password
          },
          {
            headers: { Authorization: `JWT ${accessString}` }
          }
        )
        .then(response => {
          if (response.data.message === "password updated") {
            this.setState({
              updated: true,
              error: false,
              loadingUser: false
            });
          }
        })
        .catch(error => {
          console.log(error.response.data);
          this.setState({
            updated: false,
            error: true,
            loadingUser: false
          });
        });
    }
  };

  onClick() {
    console.log("made axios request");
  }
  render() {
    return (
      <MDBBtn
        size="sm"
        outline
        color="primary"
        onClick={() => this.updatePassword()}
      >
        Reset Password
      </MDBBtn>
    );
  }
}
