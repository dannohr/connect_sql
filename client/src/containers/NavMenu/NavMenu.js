import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./NavMenu.css";

class NavMenu extends Component {
  handleLogout = event => {
    this.props.childProps.userHasAuthenticated(false);
    localStorage.removeItem("JWT");
    this.props.history.push("/login");
  };

  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {this.props.childProps.isAuthenticated ? (
            <Navbar.Text>
              Signed in as: {this.props.childProps.username}{" "}
            </Navbar.Text>
          ) : null}

          <Nav className="ml-auto">
            {this.props.childProps.isAuthenticated ? (
              <Fragment>
                <LinkContainer to="/user/all">
                  <Nav.Link>Menu 1</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/edituser">
                  <Nav.Link>Menu 2</Nav.Link>
                </LinkContainer>
                <NavDropdown title="User" id="collasible-nav-dropdown">
                  <LinkContainer to="/user/all">
                    <NavDropdown.Item>All Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/edituser">
                    <NavDropdown.Item>Edit User</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link onClick={this.handleLogout}>Logout</Nav.Link>
              </Fragment>
            ) : (
              <Fragment>
                <LinkContainer to="/signup">
                  <Nav.Link>Signup</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              </Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(NavMenu);
