import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <header>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
          <NavItem><Link to="/about" className="nav-link">About</Link></NavItem>
        </Navbar>
      </header>

    )
  }
}

export default Header;
