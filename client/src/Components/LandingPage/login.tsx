import React from "react";
import "./login.scss";

interface LoginProps {
  username: string;
  username_err: string | any;
  password: string;
  password_err: string | any;
  ChangeUsername: (value: string) => void;
  ChangePassword: (value: string) => void;
  Submit: () => void;
}

const LoginHeader = () => {
  return <header className="LoginCard-Header">Login</header>;
};

const LoginForm: React.FC<LoginProps> = (props) => {
  return (
    <form onSubmit={props.Submit} id='login-form'>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="login-username"
        className="input"
        placeholder="Username"
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="login-password"
        className="input"
        placeholder="Password"
      />

      <button type="submit" id='login-btn'>Login</button>
    </form>
  );
};

const LoginCard: React.FC<{}> = (props) => {
  return <main className="LoginCard"> {props.children} </main>;
};

const Login: React.FC<LoginProps> = (props) => {
  return (
    <React.Fragment>
      <main className="login-container">
        <LoginCard>
          <LoginHeader />
          <LoginForm {...props} />
        </LoginCard>
      </main>
    </React.Fragment>
  );
};

export default Login;
