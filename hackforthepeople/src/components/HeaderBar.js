import React, { useState, useEffect } from 'react'
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { signInWithGoogle, signOut } from '../firebase'
import './../index.css';

const HeaderBar = (props) => {
    const { user } = props;
    const [show, setShow] = useState(false);

    const showDropdown = () => {
        setShow(!show);
    }

    const hideDropdown = () => {
        setShow(false);
    }

    return (
        <Navbar>
            <img src={require("./favicon.png")} className="header-logo" />
            <Navbar.Brand href="/" className="header-brand">Politalks</Navbar.Brand>
            <Navbar.Toggle />
            {!user ? <div/> :
            <Nav className="mr-auto">
                <Nav.Link href="/survey">Opinions</Nav.Link>
                <Nav.Link href="/match">Match</Nav.Link>
                <NavDropdown title="Inbox" 
                    id="collasible-nav-dropdown" 
                    show={show}
                    onMouseEnter={showDropdown} 
                    onMouseLeave={hideDropdown}
                >
                    <NavDropdown.Item className="dropdown-item" href="/requests-inbound">Inbound</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item className="dropdown-item" href="/requests-outbound">Outbound</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/resources">Resources</Nav.Link>
            </Nav>
            }
            <Navbar.Collapse className="justify-content-end">
                
                <Navbar.Text>
                    {!user ? <Button variant="outline-info" onClick={signInWithGoogle} className="button">Log In with Google</Button>: <span>Welcome, {user.displayName}!<Button variant="outline-info" className="button button-header" onClick={signOut}>Sign out</Button></span>}
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default HeaderBar
