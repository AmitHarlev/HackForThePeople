import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap';
import { signInWithGoogle, signOut} from '../firebase'


const HeaderBar = (props) => {
    const { user } = props;

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Hack for the People</Navbar.Brand>
            <Navbar.Toggle />
            {!user ? <div/> :
            <Nav className="mr-auto">
                <Nav.Link href="/survey">Opinions</Nav.Link>
                <Nav.Link href="/match">Match</Nav.Link>
                <Nav.Link href="/requests">Inbox</Nav.Link>
            </Nav>
            }
            <Navbar.Collapse className="justify-content-end">
                
                <Navbar.Text>
                    {!user ? <Button variant="outline-info" onClick={signInWithGoogle}>Log In with Google</Button>: <span>Signed in as: <a href="#login">{user.displayName}</a> <Button variant="outline-info" onClick={signOut}>Sign out</Button></span>}
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default HeaderBar
