import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { authActions } from "../../_actions";

import "./NavMenu.css";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBContainer,
  MDBIcon
} from "mdbreact";

class NavMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapseID: ""
    };
  }

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  handleLogout = event => {
    this.props.dispatch(authActions.logout());
    this.props.history.push("/login");
  };

  render() {
    return (
      <MDBContainer fluid>
        <MDBNavbar
          color="elegant-color-dark"
          dark
          expand="md"
          style={{ marginTop: "0px" }}
        >
          <MDBNavbarBrand>App</MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse("navbarCollapse3")} />
          <MDBCollapse
            id="navbarCollapse3"
            isOpen={this.state.collapseID}
            navbar
          >
            {this.props.isAuthenticated ? (
              <Fragment>
                <MDBNavbarNav left>
                  <MDBNavItem>
                    <MDBNavLink to="#!">Home</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="#!">Features</MDBNavLink>
                  </MDBNavItem>

                  <MDBNavItem>
                    <MDBDropdown>
                      <MDBDropdownToggle nav caret>
                        <span>My App</span>
                      </MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <MDBNavLink to="/customer" className="m-0 p-0">
                          <MDBDropdownItem>Customers</MDBDropdownItem>
                        </MDBNavLink>
                        <MDBNavLink to="/vendor" className="m-0 p-0">
                          <MDBDropdownItem>Vendors</MDBDropdownItem>
                        </MDBNavLink>
                        <MDBNavLink to="/accounts" className="m-0 p-0">
                          <MDBDropdownItem>Accounts</MDBDropdownItem>
                        </MDBNavLink>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavItem>

                  <MDBNavItem>
                    <MDBDropdown>
                      <MDBDropdownToggle nav caret>
                        <span>Quickbooks</span>
                      </MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <MDBNavLink to="/qblogin" className="m-0 p-0">
                          <MDBDropdownItem>Login to QB</MDBDropdownItem>
                        </MDBNavLink>
                        <MDBNavLink to="/qbcustomers" className="m-0 p-0">
                          <MDBDropdownItem>QB Customers</MDBDropdownItem>
                        </MDBNavLink>
                        <MDBNavLink to="/qbvendors" className="m-0 p-0">
                          <MDBDropdownItem>QB Vendors</MDBDropdownItem>{" "}
                        </MDBNavLink>
                        <MDBNavLink to="/qbaccounts" className="m-0 p-0">
                          <MDBDropdownItem>QB Accounts</MDBDropdownItem>{" "}
                        </MDBNavLink>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBDropdown>
                      <MDBDropdownToggle nav caret>
                        <span>Users</span>
                      </MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <MDBNavLink to="/user/all">
                          <MDBDropdownItem>View All Users</MDBDropdownItem>
                        </MDBNavLink>
                        <MDBNavLink to="/user/new">
                          <MDBDropdownItem>Create New User</MDBDropdownItem>
                        </MDBNavLink>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                  <MDBNavItem>
                    <MDBDropdown>
                      <MDBDropdownToggle nav caret>
                        <MDBIcon icon="user" className="mr-2" />
                      </MDBDropdownToggle>
                      <MDBDropdownMenu right>
                        <MDBDropdownItem>Edit Profile</MDBDropdownItem>
                        <MDBDropdownItem>Change Password</MDBDropdownItem>
                        <MDBDropdownItem divider />
                        <MDBDropdownItem onClick={this.handleLogout}>
                          Log out
                        </MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavItem>
                </MDBNavbarNav>
              </Fragment>
            ) : (
              <Fragment>
                <MDBNavbarNav right>
                  <MDBNavItem>
                    <MDBNavLink
                      className="waves-effect waves-light"
                      to="/signup"
                    >
                      <MDBIcon icon="pen" className="mr-1" />
                      Signup
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink
                      className="waves-effect waves-light"
                      to="/login"
                    >
                      <MDBIcon icon="sign-in-alt" className="mr-1" />
                      Login
                    </MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>
              </Fragment>
            )}
          </MDBCollapse>
        </MDBNavbar>
      </MDBContainer>
    );
  }
}

export default withRouter(connect()(NavMenu));
