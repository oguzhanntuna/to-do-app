import React, { useRef } from 'react';

import './LogIn.scss';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

const LogIn: React.FC = () => {
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();

    const loginSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
    }

    return (
        <div className="login">
            <form className="login-form" onSubmit={loginSubmitHandler}>
                <div className="login-form-email">
                    <label htmlFor="login-email">Email:</label>
                    <Input 
                        type="email" 
                        id="login-email" 
                        referance={emailRef} />
                </div>
                <div className="login-form-password">
                    <label htmlFor="login-password">Password:</label>
                    <Input 
                        type="password" 
                        id="login-password" 
                        referance={passwordRef} />
                </div>
                <Button className="login-form-button">Log in</Button>
            </form>
        </div>
    );
}

export default LogIn;