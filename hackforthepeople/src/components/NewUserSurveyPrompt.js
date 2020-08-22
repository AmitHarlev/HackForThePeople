import React from 'react'
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


const NewUserSurveyPrompt = () => {
    let history = useHistory();
    return (
        <div>
            Please complete the survey:
            <Button onClick={() => {history.push('/survey')}}>Go to Survey</Button>
        </div>
    )
}

export default NewUserSurveyPrompt
