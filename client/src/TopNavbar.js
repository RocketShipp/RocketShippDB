import React, { PropTypes } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TopNavbar = (props) => {
  return (
    <Navbar inverse collapseOnSelect id="myNav">
      {
        props.showNavItems ?
          <Nav pullRight activeKey={1}>
            <NavItem className="signOut" eventKey={1} onClick={props.onSignOut}>Sign Out</NavItem>
          </Nav> :
          null
      }
    </Navbar>
  );
};

TopNavbar.propTypes = {
  onSignOut: PropTypes.func.isRequired
};

export default TopNavbar;
