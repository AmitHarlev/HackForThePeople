import React from 'react'
import { Form, Button } from 'react-bootstrap';


const Matcher = () => {
    return (
    <Form>
        <Form.Group controlId="topic">
            <Form.Label>Topic to Match On</Form.Label>
            <Form.Control as="select" custom>
                <option>Gun Control</option>
                <option>Abortion</option>
            </Form.Control>
        </Form.Group>
        <Button variant="primary">
            Match!
        </Button>
    </Form>
    )
}

export default Matcher
