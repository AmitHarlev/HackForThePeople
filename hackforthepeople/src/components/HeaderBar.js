import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap';
import { signInWithGoogle, signOut} from '../firebase'
import './../index.css';

const HeaderBar = (props) => {
    const { user } = props;

    return (
        <Navbar>
            <img src={require("./favicon.png")} className="header-logo" />
            <Navbar.Brand href="/" className="header-brand">Politalks</Navbar.Brand>
            <Navbar.Toggle />
            {!user ? <div/> :
            <Nav className="mr-auto">
                <Nav.Link href="/survey">Opinions</Nav.Link>
                <Nav.Link href="/match">Match</Nav.Link>
                <Nav.Link href="/requests">Inbox</Nav.Link>
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
