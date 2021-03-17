import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

import './SignUp.scss';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Alert from '../../components/UI/Alert/Alert';
import Banner from '../../components/UI/Banner/Banner';
interface IMessage {
    text: string;
    type: string;
}

const SignUp: React.FC = () => {
    let nameRef = useRef<HTMLInputElement>(null);
    let emailRef = useRef<HTMLInputElement>(null);
    let passwordRef = useRef<HTMLInputElement>(null);
    let confirmPasswordRef = useRef<HTMLInputElement>(null);
    const { signUp } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<IMessage>();
    const history = useHistory();

    const signupSubmitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        if (passwordRef.current!.value.length < 6 || confirmPasswordRef.current!.value.length < 6) {
            return setMessage({text: 'Password should be at least 6 characters!', type: 'warning'});
        }

        if (passwordRef.current!.value !== confirmPasswordRef.current!.value) {
            return setMessage({text: 'Passwords do not match!', type: 'warning'});
        }

        signUp(emailRef.current!.value, passwordRef.current!.value)
            .then((response: any) => {
                setLoading(true);
                response.user.updateProfile({
                    displayName: nameRef.current!.value
                })
                history.push('/login');
            })
            .catch((error: any) => {
                setMessage({text: 'The email address is already in use by another account!', type: 'warning'});
            });

        setLoading(false); 
    }
    
    return (
        <div className="signup">
            <Banner>Sign up</Banner>
            {message && <Alert type={message.type}>{message.text}</Alert>}
            <form className="signup-form" onSubmit={signupSubmitHandler}>
                <div className="signup-form-name">
                    <label htmlFor="signup-name">Name:</label>
                    <Input 
                        type="text" 
                        id="signup-name" 
                        referance={nameRef}
                        required />
                </div>
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
                        type="password" 
                        id="signup-password" 
                        referance={passwordRef}
                        required />
                </div>
                <div className="signup-form-confirmPassword">
                    <label htmlFor="signup-confirmPassword">Confirm Password:</label>
                    <Input 
                        type="password" 
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