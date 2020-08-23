import React from 'react';
import Popup from 'react-popup';
import './Popup.css';

const Prompt = (displayText) => {
    [text, setText] = useState(displayText);

    _onChange(e) {
        let value = e.target.value;

        setText(value);
    }

    return <input type="text" 
                    placeholder={this.props.placeholder} 
                    className="mm-popup__input" 
                    value={this.state.value} 
                    onChange={this.onChange} />;
}

/** Prompt plugin */
Popup.registerPlugin('prompt', function (defaultValue, placeholder, callback) {
    let promptValue = null;
    let promptChange = function (value) {
        promptValue = value;
    };

    this.create({
        title: 'Are you sure you want to end your session?',
        content: <Prompt onChange={promptChange} placeholder={placeholder} value={defaultValue} />,
        buttons: {
            left: ['Back'],
            right: [{
                text: 'Continue',
                key: 'enter',
                className: 'success',
                action: function () {
                    callback(promptValue);
                    Popup.close();
                }
            }]
        }
    });
});