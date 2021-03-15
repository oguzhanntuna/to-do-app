import React from 'react';
import { Link } from 'react-router-dom';

import './Toolbar.scss';
import Weather from './Weather/Weather';

const Toolbar: React.FC = props => {
    return(
        <header>
            <ul className="toolbar">
                <li className="toolbar-weather">
                    <Weather />
                </li>
                <li className="toolbar-login"><Link to="/login">Log in</Link></li>
                <li className="toolbar-signup"><Link to="/signup">Sign up</Link></li>
            </ul>
        </header>
    );
}

export default Toolbar;