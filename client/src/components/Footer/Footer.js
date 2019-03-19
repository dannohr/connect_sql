import React from "react";
import { MDBFooter } from "mdbreact";
import "./Footer.css";

const Footer = props => {
  return (
    <MDBFooter
      color="elegant-color"
      className="fixed-bottom font-small text-center py-2 ml-3 mr-3"
    >
      <strong className="white-text">
        Signed in as: {props.username} {"   ("}
        {props.companyName} {")         QB: "}
        {props.qbConnected ? props.qbCompanyData.CompanyName : "not connected"}
      </strong>
    </MDBFooter>
  );
};

export default Footer;
