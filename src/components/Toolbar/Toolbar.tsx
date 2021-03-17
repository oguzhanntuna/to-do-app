import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

import './Toolbar.scss';
import Weather from './Weather/Weather';

const Toolbar: React.FC = () => {
    const [error, setError] = useState<string>('');
    const { currentUser, logOut } = useAuth();
    const history = useHistory();

    const logOutHandler = async () => {
        setError('');

        logOut()
            .then((response: any) => {
                console.log(response);
                history.push('/login');
            })
            .catch(() => {
                setError('Failed to log out');
            })
    }

    let conditionalToolbarRender = null;
    if (currentUser) {
        conditionalToolbarRender = (
            <React.Fragment>
                <li className="toolbar-currentUserName">{currentUser ? currentUser.displayName : null}</li>
                <li className="toolbar-logout" onClick={logOutHandler}>Log out</li>
            </React.Fragment>
        );
    } else {
        conditionalToolbarRender = (
            <React.Fragment>
                <li className="toolbar-login"><Link to="/login">Log in</Link></li>
                <li className="toolbar-signup"><Link to="/signup">Sign up</Link></li>
            </React.Fragment>
        );
    }

    return(
        <header>
            <ul className="toolbar">
                {error}
                <li className="toolbar-weather">
                    <Weather />
                </li>
                {conditionalToolbarRender}
            </ul>
        </header>
    );
}

export default Toolbar;