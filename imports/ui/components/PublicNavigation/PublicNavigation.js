import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';

const PublicNavigation = () => (
  <Nav pullRight>
    <LinkContainer to="/how-it-works">
      <NavItem eventKey={3} href="/how-it-works">How It Works</NavItem>
    </LinkContainer>
    <LinkContainer to="/create-a-trip">
      <NavItem eventKey={3} href="/create-a-trip">Create A Trip</NavItem>
    </LinkContainer>
    <LinkContainer to="/signup">
      <NavItem eventKey={1} href="/signup">Sign Up</NavItem>
    </LinkContainer>
    <LinkContainer to="/login">
      <NavItem eventKey={2} href="/login">Log In</NavItem>
    </LinkContainer>
  </Nav>
);

export default PublicNavigation;
