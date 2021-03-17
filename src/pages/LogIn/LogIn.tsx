import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

import './LogIn.scss';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Alert from '../../components/UI/Alert/Alert';
import Banner from '../../components/UI/Banner/Banner';


interface IMessage {
    text: string;
    type: string;
}

const LogIn: React.FC = () => {
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();  
    const { logIn } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<IMessage>();
    const history = useHistory();

    const loginSubmitHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        logIn(emailRef.current?.value, passwordRef.current?.value)
            .then((response: any) => {
                setLoading(true);
                console.log(response);
                history.push('/');
            }).catch(() => {
                setMessage({text: 'Your email and password do not seem to match!', type: 'warning'});
            });
        
        setLoading(false);
    }

    return (
        <div className="login">
            <Banner>Log in</Banner>
            {message && <Alert type={message.type}>{message.text}</Alert>}
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