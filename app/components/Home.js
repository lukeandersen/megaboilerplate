import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Messages from './Messages';

const Home = (props) => (
    <div className="container">
        <Messages messages={props.messages} />
        <div className="row">
            <div className="col-sm">
                <h3>Heading</h3>
                <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>
                <a href="#somewhere" role="button">View details</a>
            </div>
            <div className="col-sm">
                <h3>Heading</h3>
                <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>
                <a href="#somewhere" role="button">View details</a>
            </div>
            <div className="col-sm">
                <h3>Heading</h3>
                <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>
                <a href="#somewhere" role="button">View details</a>
            </div>
        </div>
    </div>
);

const mapStateToProps = (state) => ({
    messages: state.messages
});

Home.propTypes = {
    messages: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Home);
