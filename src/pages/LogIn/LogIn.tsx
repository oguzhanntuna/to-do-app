import React from 'react';

import './LogIn.scss';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

const LogIn: React.FC = () => {
    const loginSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
    }

    return (
        <div className="login">
            <form className="login-form" onSubmit={loginSubmitHandler}>
                <div className="login-form-fullName">
                    <label htmlFor="fullname">Full name:</label>
                    <Input type="text" id="fullname" />
                </div>
                <div className="login-form-password">
                    <label htmlFor="password">Password:</label>
                    <Input type="text" id="password" />
                </div>
                <Button className="login-form-button">Log in</Button>
            </form>
        </div>
    );
}

export default LogIn;