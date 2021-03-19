import React from 'react';

import './Input.scss';

interface IInputProps {
    type: string;
    id: string;
    referance: any;
    required: boolean;
}

const Input: React.FC<IInputProps> = (props) => {
    return (
        <input className="form-input" type={props.type} id={props.id} ref={props.referance} required={props.required} />
    );
}

export default Input;