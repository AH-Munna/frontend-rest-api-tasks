// component isn't used, for now
import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavigationBar.css";
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Dropdown,
} from "react-bootstrap";
import logo from "../../assets/logo.png";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    token: state.state.auth.token,
    userId: state.state.auth.userId,
  };
};

class NavigationBar extends Component {
  render() {
    return (
      <Navbar
        expand="lg"
        className="navbar-dark navBarBG shadow sticky-top fs-5"
      >
        <Container fluid>
          <a className="navbar-brand" href="/">
            <img src={logo} alt="brand" width="40px" />
          </a>
          {/* <Navbar.Brand href="#">Navbar scroll</Navbar.Brand> */}
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {!this.props.token && !this.props.token ? (
                <></>
              ) : (
                <>
                  <NavLink className="nav-link me-3" to="/home" end>
                    Home
                  </NavLink>
                  <NavLink className="nav-link me-3" to="#">
                    Project Teams
                  </NavLink>
                  <NavLink className="nav-link me-3" to="/s-help">
                    Supervisor Help
                  </NavLink>
                  <NavLink className="nav-link me-3" to="#">
                    Forum
                  </NavLink>
                  <NavLink className="nav-link me-3" to="/t-discussion">
                    Team Discussion
                  </NavLink>
                  <NavLink className="nav-link me-3" to="/news">
                    Events
                  </NavLink>
                  <NavLink className="nav-link me-3" to="/news">
                    News
                  </NavLink>
                  {/* <NavLink className="nav-link" to="/checkout">Checkout</NavLink> */}{" "}
                </>
              )}
            </Nav>

            {this.props.token && this.props.token ? (
              <Nav
                className="ms-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <NavDropdown title="Profile" id="navbarScrollingDropdown">
                  <Dropdown.Item as={Link} to="/user">
                    Update Profile
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/">
                    Notifications
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/">
                    My Teams
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/">
                    Settings
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to="/logout">
                    Logout
                  </Dropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav
                className="ms-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <NavLink className="nav-link me-3" to="/auth">
                  Sign Up
                </NavLink>
              </Nav>
            )}

            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-light">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default connect(mapStateToProps)(NavigationBar);
