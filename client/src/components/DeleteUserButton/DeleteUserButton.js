import React, { Component } from "react";
import axios from "axios";
import { MDBIcon } from "mdbreact";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./DeleteUserButton.css";

export default class DeleteUserButton extends Component {
  handleDeleteUser = e => {
    const accessString = localStorage.getItem("JWT");
    console.log("Deleting userId:", this.props.userId);

    if (accessString === null) {
      this.setState({
        loadingUser: false,
        error: true
      });
    } else {
      e.preventDefault();
      axios
        .delete("/deleteUser", {
          params: {
            userId: this.props.userId
          },
          headers: { Authorization: `JWT ${accessString}` }
        })
        .then(response => {
          console.log(response.data);
          this.props.handleDelete(this.props.userId, true);
        })
        .catch(error => {
          console.error(error.response.data);
          this.setState({
            error: true
          });
        });
    }
  };

  render() {
    return (
      <MDBIcon
        icon="times"
        size="lg"
        // id={index}
        onClick={this.handleDeleteUser}
        className="hover"
      />
    );
  }
}
