import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { submitContactForm } from '../actions/contact';
import Messages from './Messages';

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '', email: '', message: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.dispatch(
            submitContactForm(this.state.name, this.state.email, this.state.message)
        );
    }

    render() {
        return (
            <div className="container">
                <h3>Contact Form</h3>
                <Messages messages={this.props.messages} />
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange} autoFocus />
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" value={this.state.email} onChange={this.handleChange} />
                    <label htmlFor="message">Body</label>
                    <textarea name="message" id="message" rows="7" value={this.state.message} onChange={this.handleChange} />
                    <br />
                    <button type="submit">Send</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    messages: state.messages
});

Contact.propTypes = {
    dispatch: PropTypes.func.isRequired,
    messages: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Contact);
