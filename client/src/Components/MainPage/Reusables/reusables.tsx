import React from 'react';
import './reusables.scss';

export const MainContainer: React.FC<{Click: (event: any) => void}> = (props) => {
    const { children, Click } = props;
    return (
        <main className='main-page-container' onClick={Click}>
            { children }
        </main>
    )
};
