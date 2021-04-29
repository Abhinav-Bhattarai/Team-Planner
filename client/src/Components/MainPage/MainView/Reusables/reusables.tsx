import React from 'react';
import './reusables.scss';

export const MainViewHeader: React.FC<{Profile: string | undefined, name: string | undefined}> = (props) => {
    const { Profile, name } = props;
    return (
        <React.Fragment>
            <main id='main-view-header'>
                <img src={Profile} alt='profile' id='main-view-profile'/>
                <div>{ name }</div>
            </main>
        </React.Fragment>
    )
};