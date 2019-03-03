import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
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
  state = {
    collapseID: ""
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  handleLogout = event => {
    this.props.childProps.userHasAuthenticated(false);
    localStorage.removeItem("JWT");
    this.props.history.push("/login");
  };

  render() {
    return (
      <MDBContainer fluid>
        <MDBNavbar
          color="info-color"
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
            {this.props.childProps.isAuthenticated ? (
              <Fragment>
                <MDBNavbarNav left>
                  <MDBNavItem active>
                    <MDBNavLink to="#!">Home</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="#!">Features</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="#!">Pricing</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBDropdown>
                      <MDBDropdownToggle nav caret>
                        <div className="d-none d-md-inline">Users</div>
                      </MDBDropdownToggle>
                      <MDBDropdownMenu className="dropdown-default" right>
                        <MDBNavLink to="/user/all">
                          <MDBDropdownItem>View All Users</MDBDropdownItem>
                        </MDBNavLink>
                        <MDBNavLink to="/signup">
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
                        <MDBIcon icon="user" className="mr-1" />
                        Profile
                      </MDBDropdownToggle>
                      <MDBDropdownMenu className="dropdown-default" right>
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

export default withRouter(NavMenu);
