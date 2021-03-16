import React, { useRef, useState } from 'react';


import './LogIn.scss';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { useAuth } from '../../contexts/AuthContext';

const LogIn: React.FC = () => {
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();  
    const { logIn } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const loginSubmitHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            setError("");
            setLoading(true);
            await logIn(emailRef.current?.value, passwordRef.current?.value);
        } catch {
            setError("Your email and password do not seem to match!");
        }
        
        setLoading(false);
    }

    return (
        <div className="login">
            {error}
            <form className="login-form" onSubmit={loginSubmitHandler}>
                <div className="login-form-email">
                    <label htmlFor="login-email">Email:</label>
                    <Input 
                        type="email" 
                        id="login-email" 
                        referance={emailRef}
                        required />
                </div>
                <div className="login-form-password">
                    <label htmlFor="login-password">Password:</label>
                    <Input 
                        type="password" 
                        id="login-password" 
                        referance={passwordRef}
                        required />
                </div>
                <Button className="login-form-button" disabled={loading}>Log in</Button>
                
            </form>
        </div>
    );
}

export default LogIn;