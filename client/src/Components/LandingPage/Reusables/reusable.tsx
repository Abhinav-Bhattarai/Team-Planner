import React from "react";
import "./reusable.scss";
import GithubLogo from "../../../assets/github.svg";

interface FormInputProps {
  type: "text" | "password";
  name: string;
  id: string;
  placeholder: string;
  value: string;
  handleChange: () => void;
}

interface FormProps {
  Submit: () => void;
  id: string;
};

export const MainContainer: React.FC<{}> = (props) => {
  return <main className="container">{props.children}</main>;
};

export const Form: React.FC<FormProps> = (props) => {
  return (
    <form onSubmit={props.Submit} id={props.id}>
      {props.children}
    </form>
  );
};

export const Header = () => {
  return (
    <header className="LoginCard-Header">
      <img src={GithubLogo} width="60px" height="60px" alt="github-logo" />
    </header>
  );
};

export const Card: React.FC<{}> = (props) => {
  return <main className="LoginCard"> {props.children} </main>;
};

export const FormInput: React.FC<FormInputProps> = (props) => {
  const { type, name, id, placeholder, value, handleChange } = props;
  return (
    <>
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
    </>
  );
};

export const SubmitButton: React.FC<{ type: string, spinner: boolean }> = ({ type, spinner }) => {
  return (
    <button type="submit" id="login-btn">
      {type}
    </button>
  );
};

export const RouteChanger: React.FC<{ Submit: () => void; type: string }> = ({
  Submit,
  type,
}) => {
  return (
    <button id="create-account-btn" onClick={Submit}>
      {type}
    </button>
  );
};