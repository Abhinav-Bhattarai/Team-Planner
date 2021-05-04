import React from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
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
            <SimpleBar style={{ flex: 1, marginTop: '15px' }}>
                { children }
            </SimpleBar>
        </React.Fragment>
    )
}

export default TodoList;