import React from "react";
import "./reusables.scss";
import { FormInputProps } from "../../../LandingPage/Reusables/reusable";

export const PopupContainer: React.FC<{}> = (props) => {
  const { children } = props;
  return <main id="main-container-popup">{children}</main>;
};

export const PopupHeader: React.FC<{}> = (props) => {
  return <React.Fragment></React.Fragment>;
};

const PopupTextInput: React.FC<FormInputProps> = (props) => {
  const { name, placeholder, handleChange, type, value, id } = props;
  return (
    <React.Fragment>
      <label htmlFor={name}>{placeholder}</label>
      <input
        type={type}
        name={name}
        id={id}
        className="input"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </React.Fragment>
  );
};

export const PopupForm: React.FC<{}> = (props) => {
  const { children } = props;
  return (
    <React.Fragment>
      <form>{children}</form>
    </React.Fragment>
  );
};
