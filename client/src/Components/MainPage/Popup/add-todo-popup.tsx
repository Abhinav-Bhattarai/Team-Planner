import React, { useState } from 'react'
import {
  PopupButton,
  PopupContainer,
  PopupForm,
  PopupHeader,
  PopupTextInput,
} from "./Reusables/reusables";

const AddTodoPopup: React.FC<{Submit: (e: any, todo: string) => void}> = (props) => {
    const { Submit } = props;
    const [name, setName] = useState<string>('');
    const HandleNameChange = (event: any) => {
        const value = event.target.value;
        setName(value);
    };

    return (
        <React.Fragment>
        <PopupContainer>
          <PopupHeader title="Create TodoList" />
          <PopupForm Submit={(e: any) => Submit(e, name)}>
            <PopupTextInput
              name="todo-name"
              placeholder="todo message"
              type="text"
              value={name}
              handleChange={HandleNameChange}
              id="todo-name-input"
            />
            <PopupButton title="Add Todo" />
          </PopupForm>
        </PopupContainer>
      </React.Fragment>
    )
}

export default AddTodoPopup;
