import React from 'react';

import './Button.scss';

interface ButtonProps {
    className: string;
    disabled: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
    return (
        <button className={props.className} disabled={props.disabled}>{props.children}</button>
    );
};

export default Button;