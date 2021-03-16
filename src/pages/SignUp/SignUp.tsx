import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

import './SignUp.scss';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

const SignUp: React.FC = () => {
    let emailRef = useRef<HTMLInputElement>(null);
    let passwordRef = useRef<HTMLInputElement>(null);
    let confirmPasswordRef = useRef<HTMLInputElement>(null);
    const { signUp } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const signupSubmitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
            return setError('Passwords do not match!');
        }

        try {
            setError('');
            setLoading(true);
            await signUp(emailRef.current?.value, passwordRef.current?.value);
        } catch {
            setError('Failed to create an account!');
        }

        setLoading(false);
    }
    
    return (
        <div className="signup">
            <form className="signup-form" onSubmit={signupSubmitHandler}>
                {error}
                <div className="signup-form-email">
                    <label htmlFor="signup-email">Email:</label>
                    <Input 
                        type="email" 
                        id="signup-email" 
                        referance={emailRef}
                        required />
                </div>
                <div className="signup-form-password">
                    <label htmlFor="signup-password">Password:</label>
                    <Input 
                        type="text" 
                        id="signup-password" 
                        referance={passwordRef}
                        required />
                </div>
                <div className="signup-form-confirmPassword">
                    <label htmlFor="signup-confirmPassword">Confirm Password:</label>
                    <Input 
                        type="text" 
                        id="signup-confirmPassword" 
                        referance={confirmPasswordRef}
                        required />
                </div> 
                <Button className="signup-form-button" disabled={loading}>Sign up</Button>
            </form>
        </div>
    );
}

export default SignUp;