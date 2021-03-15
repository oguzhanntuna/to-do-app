import React from 'react';

import './SignUp.scss';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

const SignUp: React.FC = () => {
    const signupSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
    }

    return (
        <div className="signup">
            <form className="signup-form" onSubmit={signupSubmitHandler}>
                <div className="signup-form-fullName">
                    <label htmlFor="fullname">Full name:</label>
                    <Input type="text" id="fullname" />
                </div>
                <div className="signup-form-password">
                    <label htmlFor="password">Password:</label>
                    <Input type="text" id="password" />
                </div>
                <div className="signup-form-confirmPassword">
                    <label htmlFor="password-again">Confirm Password:</label>
                    <Input type="text" id="password-confirm" />
                </div> 
                <Button className="signup-form-button">Sign up</Button>
            </form>
        </div>
    );
}

export default SignUp;