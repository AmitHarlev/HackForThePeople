import React from 'react'
import { Navbar, Button } from 'react-bootstrap';
import { signInWithGoogle, signOut} from '../firebase'
import './../index.css';

const HeaderBar = (props) => {
    const { user } = props;

    return (
        <Navbar>
            <Navbar.Brand href="/" className="header-brand">Politalks</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    {!user ? <Button variant="outline-info" onClick={signInWithGoogle} className="button">Log In with Google</Button>: <span>Welcome, {user.displayName}!<Button variant="outline-info" className="button button-header" onClick={signOut}>Sign out</Button></span>}
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default HeaderBar
