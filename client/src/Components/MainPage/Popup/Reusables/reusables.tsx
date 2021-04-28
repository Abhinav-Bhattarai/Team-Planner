import React from "react";
import "./reusables.scss";
import { FormInputProps } from "../../../LandingPage/Reusables/reusable";

export const PopupContainer: React.FC<{}> = (props) => {
  const { children } = props;
  return <main id="main-container-popup">{children}</main>;
};

export const PopupHeader: React.FC<{title: string}> = (props) => {
  return (
    <React.Fragment>
      <main className='popup-header-container'>
        <div>{ props.title }</div>
      </main>
    </React.Fragment>
  );
};

export const PopupButton: React.FC<{title: string, Submit?: (e: any) => void}> = (props) => {
  return (
    <React.Fragment>
      <button type='submit' id='popup-btn'> {props.title} </button>
    </React.Fragment>
  )
};

export const PopupSelector: React.FC<{title: string, Submit?: (e: any) => void}> = (props) => {
  const { title, Submit } = props;
  return (
    <React.Fragment>
      <div onClick={Submit} id='popup-selector'>
        {title}
      </div>
    </React.Fragment>
  )
}

export const PopupTextInput: React.FC<FormInputProps> = (props) => {
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

export const PopupForm: React.FC<{Submit: (e: any) => void}> = (props) => {
  const { children, Submit } = props;
  return (
    <React.Fragment>
      <form id='popup-form' onSubmit={Submit}>
        {children}
      </form>
    </React.Fragment>
  );
};