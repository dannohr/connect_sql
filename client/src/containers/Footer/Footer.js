import React, { Component } from "react";
import { MDBFooter } from "mdbreact";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      // <MDBContainer fluid>
      <MDBFooter
        color="blue"
        className="fixed-bottom font-small text-center py-2 ml-3 mr-3"
      >
        {this.props.childProps.isAuthenticated ? (
          <strong className="white-text">
            Signed in as: {this.props.childProps.username} {"   ("}
            {this.props.childProps.companyName} {")"}
          </strong>
        ) : null}
      </MDBFooter>
      // </MDBContainer>
    );
  }
}
export default Footer;
