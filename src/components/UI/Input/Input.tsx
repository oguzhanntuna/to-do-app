import React from 'react';

import './Input.scss';

interface InputProps {
    type: string;
    id: string;
    referance: any;
}

const Input: React.FC<InputProps> = (props) => {
    return (
        <input className="form-input" type={props.type} id={props.id} ref={props.referance}/>
    );
}

export default Input;