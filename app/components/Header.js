import React from 'react';
import { IndexLink, Link } from 'react-router';

const Header = () => (
    <div className="container">
        <ul className="list-inline">
            <li><IndexLink to="/">Home</IndexLink></li>
            <li><Link to="/contact">Contact</Link></li>
        </ul>
    </div>
);

export default Header;
