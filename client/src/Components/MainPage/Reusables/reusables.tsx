import React from 'react';
import './reusables.scss';

export const MainContainer: React.FC<{}> = (props) => {
    const { children } = props;
    return (
        <main className='main-page-container'>
            { children }
        </main>
    )
};
