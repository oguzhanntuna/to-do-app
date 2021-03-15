import React, { useState, useRef , useEffect } from 'react';

import axios from 'axios';

import './SignUp.scss';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

interface AuthenticationInfo {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignUp: React.FC = () => {
    const [authenticationInfo, setAuthenticationInfo] 
        = useState<AuthenticationInfo>({name: '', email: '', password: '', confirmPassword: ''});
    const [validation, setValidation] = useState<boolean>(false);

    let nameRef = useRef<HTMLInputElement>(null);
    let emailRef = useRef<HTMLInputElement>(null);
    let passwordRef = useRef<HTMLInputElement>(null);
    let confirmPasswordRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (validation) {
            setAuthenticationInfo({
                name: nameRef.current!.value,
                email: emailRef.current!.value,
                password: passwordRef.current!.value,
                confirmPassword: confirmPasswordRef.current!.value
            }); 
            nameRef.current!.value = '';
            emailRef.current!.value = '';
            passwordRef.current!.value = '';
            confirmPasswordRef.current!.value = '';
        }
    }, [validation]);

    const signupSubmitHandler = (event: React.FormEvent): void => {
        event.preventDefault();
        AuthenticationValidation(nameRef.current!.value, emailRef.current!.value, passwordRef.current!.value, confirmPasswordRef.current!.value);
    }

    const AuthenticationValidation = (
        name: string, 
        email: string, 
        password: string, 
        confirmPassword: string
    ) => {
        if (name === '' || email === '' || password === '' || confirmPassword === '') {
            alert('Fill out the empty spaces!');
        } else {
            if (password === confirmPassword) {
                setValidation(true);
            } else {
                alert('Passwords do not match!');
            }
        }
    }

    useEffect(() => {
        console.log(authenticationInfo);
    }, [authenticationInfo]);

    /*
    const authentication = () => {
        axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDq_Nhd-h7EudYW4skt0UozTwSD1GF0qcI`)
    }
    */

    return (
        <div className="signup">
            <form className="signup-form" onSubmit={signupSubmitHandler}>
                <div className="signup-form-fullName">
                    <label htmlFor="signup-fullname">Name:</label>
                    <Input 
                        type="text" 
                        id="signup-fullname" 
                        referance={nameRef} />
                </div>
                <div className="signup-form-email">
                    <label htmlFor="signup-email">Email:</label>
                    <Input 
                        type="email" 
                        id="signup-email" 
                        referance={emailRef} />
                </div>
                <div className="signup-form-password">
                    <label htmlFor="signup-password">Password:</label>
                    <Input 
                        type="text" 
                        id="signup-password" 
                        referance={passwordRef} />
                </div>
                <div className="signup-form-confirmPassword">
                    <label htmlFor="signup-confirmPassword">Confirm Password:</label>
                    <Input 
                        type="text" 
                        id="signup-confirmPassword" 
                        referance={confirmPasswordRef} />
                </div> 
                <Button className="signup-form-button">Sign up</Button>
            </form>
        </div>
    );
}

export default SignUp;