import React, { useState, useCallback } from 'react';
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
            .then(() => {
                history.push('/login');
            })
            .catch(() => {
                setError('Failed to log out');
            })
    }

    const renderToolbar = (currentUser: any) => {
        if (currentUser) {
            return (
                <React.Fragment>
                    <li className="toolbar-currentUserName">{currentUser ? currentUser.displayName : null}</li>
                    <li className="toolbar-logout" onClick={logOutHandler}>Log out</li>
                </React.Fragment>
            );
        } else {
           return (
            <React.Fragment>
                <li className="toolbar-login"><Link to="/login">Log in</Link></li>
                <li className="toolbar-signup"><Link to="/signup">Sign up</Link></li>
            </React.Fragment>
           );
        }
    }

    return(
        <header>
            <ul className="toolbar">
                {error}
                <li className="toolbar-weather">
                    <Weather />
                </li>
                {renderToolbar(currentUser)}
            </ul>
        </header>
    );
}

export default Toolbar;