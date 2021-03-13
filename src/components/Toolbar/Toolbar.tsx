import React from 'react';

import './Toolbar.scss';
import Weather from './Weather/Weather';

const Toolbar: React.FC = props => {
    return(
        <header>
            <ul className="toolbar">
                <li className="toolbar-weather">
                    <Weather />
                </li>
                <li className="toolbar-login">Log in</li>
                <li className="toolbar-signup">Sign up</li>
            </ul>
        </header>
    );
}

export default Toolbar;