import React from 'react';

import './Layout.scss';
import Toolbar from '../../components/Toolbar/Toolbar';

const Layout: React.FC = props => {
    return(
        <div className="layout">
            <Toolbar />
            <main>
                {props.children}
            </main>
        </div>
    );
}

export default Layout; 