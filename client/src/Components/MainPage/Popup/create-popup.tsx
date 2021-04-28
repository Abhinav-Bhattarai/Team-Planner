import React, { useRef, useState } from "react";
import {
  PopupButton,
  PopupContainer,
  PopupForm,
  PopupHeader,
  PopupSelector,
  PopupTextInput,
} from "./Reusables/reusables";

const CreatePopup: React.FC<{ Submit: (event: any) => void }> = (props) => {
  const { Submit } = props;
  const [name, SetName] = useState<string>("");
  const [profile, SetProfile] = useState<string>("");
  const InputRef = useRef(null);

  const HandleNameChange = (event: any): void => {
    const value = event.target.value;
    SetName(value);
  };

  const ReadFile = (event: any) => {
    const img_file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      // @ts-ignore
      SetProfile(reader.result);
    };
    reader.readAsDataURL(img_file);
  };

  const SelectProfileHandler = () => {
    if (InputRef !== null) {
      // @ts-ignore
      InputRef.current.click();
    }
  };

  return (
    <React.Fragment>
      <PopupContainer>
        <PopupHeader title="Create Team" />
        <PopupForm Submit={Submit}>
          <PopupTextInput
            name="group-name"
            placeholder="Group Name"
            type="text"
            value={name}
            handleChange={HandleNameChange}
            id="group-name-input"
          />
          <input hidden type="file" ref={InputRef} onChange={ReadFile} />
          <PopupSelector title="Select Profile" Submit={SelectProfileHandler} />
          <PopupButton title="Create" />
        </PopupForm>
      </PopupContainer>
    </React.Fragment>
  );
};

export default CreatePopup;
