import React, { useState } from "react";
import { PopupButton, PopupContainer, PopupForm, PopupHeader, PopupTextInput } from "./Reusables/reusables";

const JoinPopup: React.FC<{ SubmitForm: (event: any, teamID: string) => void }> = (props) => {
  const { SubmitForm } = props;
  const [id, SetID] = useState<string>('');
  const HandleIDChange = (event: any) => {
    const value = event.target.value;
    SetID(value);
  };

  return (
    <React.Fragment>
      <PopupContainer>
        <PopupHeader title="Join Team" />
        <PopupForm Submit={(e: any) => SubmitForm(e, id)}>
          <PopupTextInput
            name="group-id"
            placeholder="Group ID"
            type="text"
            value={id}
            handleChange={HandleIDChange}
            id="group-id"
          />
          <PopupButton title='Join Team'/>
        </PopupForm>    
      </PopupContainer>
    </React.Fragment>
  );
};

export default JoinPopup;
