import React, { Component } from "react";
// import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
// import LoaderButton from "../components/LoaderButton";
import "./AllUsers.css";

export default class AllUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      content: ""
    };
  }

  render() {
    return (
      <div className="AllUsers">
        <p>A table showing all users</p>
      </div>
    );
  }
}
