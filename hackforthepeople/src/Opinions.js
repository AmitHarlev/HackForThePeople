import React from 'react';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { setUserOpinions } from './firebase';


const Opinions = (props) => {
    const { user } = props;
    const [abortion, setAbortion] = useState(50);
    const [gunControl, setGunControl] = useState(50);

    const gunControlSliderInput = React.createRef(); 
    const abortionSliderInput = React.createRef(); 

    const setUserOpinionsEvent = () => {
        const opinions = [
            {
                name: "Gun Control",
                value: gunControl
            },
            {
                name: "Abortion",
                value: abortion
            }
        ]
        setUserOpinions(opinions);
    }

    return (
    // TODO: Change this to a map instead of hard coding the issues
    <Form>
        <Form.Group controlId="gunControlGroup">
            <Form.Label>Gun Control</Form.Label>
            <Form.Control ref={gunControlSliderInput} value={gunControl} onChange={() => {setGunControl(gunControlSliderInput.current.value)}} type="range" />
        </Form.Group>
        <Form.Group controlId="abortionGroup">
            <Form.Label>Abortion</Form.Label>
            <Form.Control ref={abortionSliderInput} value={abortion} onChange={() => {setAbortion(abortionSliderInput.current.value)}} type="range" />
        </Form.Group>
        <Button onClick={setUserOpinionsEvent} variant="primary" type="button">
            Submit
        </Button>
    </Form>
    )
}

export default Opinions
