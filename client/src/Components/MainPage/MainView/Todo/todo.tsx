import React from 'react';
import LoadingPage from '../../../UI/LoadingPage/loadingPage';

const TodoList: React.FC<{TodoList: any | null}> = (props) => {
    const { TodoList, children } = props;
    if (TodoList === null) {
        return (
            <React.Fragment>
                <LoadingPage/>
            </React.Fragment>
        )
    }
    return (
        <React.Fragment>
            <main style={{ flex: 1, marginTop: '15px', display: 'flex', flexDirection: 'column' }}>
                { children }
            </main>
        </React.Fragment>
    )
}

export default TodoList;
