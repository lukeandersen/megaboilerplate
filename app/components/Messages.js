import React, { PropTypes } from 'react';

const Messages = (props) => {
    if (props.messages.success) {
        return (
            <div role="alert" className="text-success">
                {props.messages.success.map((message, index) => <div key={index}>{message.msg}</div>)}
            </div>
        );
    } else if (props.messages.error) {
        return (
            <div role="alert" className="text-danger">
                {props.messages.error.map((message, index) => <div key={index}>{message.msg}</div>)}
            </div>
        );
    } else if (props.messages.info) {
        return (
            <div role="alert" className="text-info">
                {props.messages.info.map((message, index) => <div key={index}>{message.msg}</div>)}
            </div>
        );
    }
    return null;
};

Messages.propTypes = {
    messages: PropTypes.object.isRequired
};

export default Messages;
