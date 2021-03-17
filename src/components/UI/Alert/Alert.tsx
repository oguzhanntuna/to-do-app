import React from 'react';

import './Alert.scss';

interface IAlertProps {
    type: string;
}

const Alert: React.FC<IAlertProps> = (props) => {
    const style = `alert alert-${props.type}`;

    return (
        <div className={style}>
            {props.children}
        </div>
    );
}

export default Alert;