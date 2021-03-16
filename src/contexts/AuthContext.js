import React, { useContext, useState, useEffect } from 'react';
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider(props) {
    const [currentUser, setCurrentUser] = useState();

    function signUp(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function logIn(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        })

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signUp
    }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
}