import React from 'react';
import Nav from 'react-bootstrap/Nav';
import NavBar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';

const CheeseNav = () => (
    <NavBar>
        <Nav>
            {/* exact prop means "exact match" since all other subpaths match "/" */}
            <LinkContainer exact to="/">
                <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            {/* TODO: implement the links */}
            <LinkContainer to="/menus">
                <Nav.Link>Menus</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cheeses">
                <Nav.Link>Cheeses</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/categories">
                <Nav.Link>Categories</Nav.Link>
            </LinkContainer>
        </Nav>
    </NavBar>
);

export default CheeseNav;
