import React from 'react'
import { Form, Button } from 'react-bootstrap';
import { db } from './firebase';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';



const Matcher = (props) => {

    const { user } = props;

    const [userDoc, loading, error] = useDocumentOnce(
        db.collection('users').doc(user.uid),
    );

    const topicRef = React.createRef();

    const findMatches = () => {
        // TODO: IT IS CURRENTLY ARBITRARILY GREATER THAN!!!
        console.log(userDoc.data());
        console.log(topicRef.current.value);
        const matchedUsers = db.collection('users').where(topicRef.current.value, '>=', userDoc.data()[topicRef.current.value]);
        matchedUsers.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log(doc.id, " => ", doc.data());
            });
        });
    }

    return (
    <Form>
        <Form.Group controlId="topic">
            <Form.Label>Topic to Match On</Form.Label>
            <Form.Control ref={topicRef} as="select" custom>
                <option>Gun Control</option>
                <option>Abortion</option>
            </Form.Control>
        </Form.Group>
        <Button onClick={findMatches} variant="primary">
            Match!
        </Button>
    </Form>
    )
}

export default Matcher
