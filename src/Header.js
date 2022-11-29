import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
import LoginButton from './Login.js';
import LogoutButton from './Logout.js';

class Header extends React.Component {
  render() {
    return (
      <header>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
          <NavItem><Link to="/about" className="nav-link">About</Link></NavItem>
          <NavItem><Link to="/profile" className="nav-link">Profile</Link></NavItem>
        </Navbar>
        {this.props.auth0.isAuthenticated ? <LogoutButton/> : <LoginButton/> }
      </header>

    )
  }
}

export default withAuth0(Header);
