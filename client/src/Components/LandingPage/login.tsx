import React from "react";
import "./login.scss";
import GithubLogo from '../../assets/github.svg';

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
  return (
    <header className="LoginCard-Header">
      <img src={GithubLogo} width='50px' height='50px' alt='github-logo'/>
    </header>
  );
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

const SignupRouter: React.FC<{Submit: () => void}> = ({ Submit }) => {
  return <button id='create-account-btn' onClick={Submit}>Create Account</button>
}

const LoginCard: React.FC<{}> = (props) => {
  return <main className="LoginCard"> {props.children} </main>;
};

const Login: React.FC<LoginProps> = (props) => {
  console.log(props);
  return (
    <React.Fragment>
      <main className="login-container">
        <LoginCard>
          <LoginHeader />
          <LoginForm {...props} />
          <SignupRouter Submit={() => console.log('hello')}/>
        </LoginCard>
      </main>
    </React.Fragment>
  );
};

export default Login;
