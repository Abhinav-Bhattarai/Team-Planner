import React from 'react';
import './main-view.scss';

const MainView: React.FC<{}> = (props) => {
    return (
        <React.Fragment>
            <main className='main-view-container'>
                { props.children }
            </main>
        </React.Fragment>
    )
}

export default MainView;
