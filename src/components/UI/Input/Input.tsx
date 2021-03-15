import React from 'react';

import './Input.scss';

interface InputProps {
    type: string;
    id: string;
}

const Input: React.FC<InputProps> = (props) => {
    return (
        <input className="form-input" type={props.type} id={props.id} />
    );
}

export default Input;