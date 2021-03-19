import React from 'react';

import './Button.scss';

interface IButtonProps {
    className: string;
    disabled: boolean;
}

const Button: React.FC<IButtonProps> = (props) => {
    return (
        <button className={props.className} disabled={props.disabled}>{props.children}</button>
    );
};

export default Button;