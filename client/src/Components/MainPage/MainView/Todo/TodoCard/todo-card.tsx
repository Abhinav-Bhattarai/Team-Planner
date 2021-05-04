import React from 'react';
import { TodoListState } from '../../../../../Containers/MainPage';

const TodoCard: React.FC<TodoListState> = (props) => {
    const { _id, todo, initiator } = props;
    console.log(_id, todo, initiator)
    return (
        <React.Fragment>

        </React.Fragment>
    );
};

export default TodoCard;