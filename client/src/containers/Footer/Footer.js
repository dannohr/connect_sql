import React from "react";
import { MDBFooter } from "mdbreact";
import "./Footer.css";

const Footer = props => {
  return (
    <MDBFooter
      color="blue"
      className="fixed-bottom font-small text-center py-2 ml-3 mr-3"
    >
      <strong className="white-text">
        Signed in as: {props.username} {"   ("}
        {props.companyName} {")"}
      </strong>
    </MDBFooter>
  );
};

export default Footer;
