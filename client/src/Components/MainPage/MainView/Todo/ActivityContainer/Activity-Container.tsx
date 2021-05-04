import React from "react";
import './Activity-Container.scss';

export const TodoActivityButton: React.FC<{ name: string; Click: () => void, color: string }> = (
  props
) => {
  const { name, Click, color } = props;
  return (
    <button 
        type="button"
        onClick={Click}
        className='activity-btn'
        style={{backgroundColor: color}}
    >
      {name}
    </button>
  );
};

const TodoListActivityContainer: React.FC<{}> = (props) => {
  const { children } = props;
  return (
    <React.Fragment>
      <main id='td-list-activity-container'>{children}</main>
    </React.Fragment>
  );
};

export default TodoListActivityContainer;
