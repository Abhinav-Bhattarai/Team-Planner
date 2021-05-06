import React from 'react';
import './todo-card.scss';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { TodoListState } from '../../../../../Containers/MainPage';

export const TodoCardsContainer: React.FC<{}> = (props) => {
    const { children } = props;
    return (
        <SimpleBar style={{maxHeight: '530px', marginTop: '10px'}}>
            { children }
        </SimpleBar>
    )
};

const TodoCardOverlay: React.FC<{}> = (props) => {
    const { children } = props;
    return (
        <main className='todo-card-overlay'>
            { children }
        </main>
    )
};

const TodoCardHeader: React.FC<{count: number | undefined}> = (props) => {
    const { count } = props;
    return (
        <main className='todo-card-header'>
            @TODO #{count}
        </main>
    )
};

const TodoContainer: React.FC<{todo: string}> = (props) => {
    const { todo } = props;
    return (
        <main className='todo-container'>
            {todo}
        </main>
    )
};

const TodoActivityContainer: React.FC<{}> = (props) => {
    const { children } = props;
    return (
        <main className='todo-activity-container'>
            { children }
        </main>
    )
};

const TodoActivityButton: React.FC<{name: string}> = (props) => {
    return <button> { props.name } </button>
}

const TodoCard: React.FC<TodoListState> = (props) => {
    const { _id, todo, initiator, count } = props;
    console.log(_id, todo, initiator, count);
    return (
        <React.Fragment>
            <TodoCardOverlay>
                <TodoCardHeader count={count}/>
                <TodoContainer todo={todo}/>
                <TodoActivityContainer>
                    <TodoActivityButton name='Completed ?'/>
                    <TodoActivityButton name='Completed ?'/>
                </TodoActivityContainer>
            </TodoCardOverlay>
        </React.Fragment>
    );
};

export default TodoCard;