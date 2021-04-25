import React from "react";
import { useHistory } from "react-router-dom";
import {
  FormInput,
  Header,
  Form,
  MainContainer,
  SubmitButton,
  Card,
  RouteChanger,
} from "./Reusables/reusable";

interface LoginProps {
  username: string;
  username_err: string | undefined;
  password: string;
  password_err: string | undefined;
  ChangeUsername: any;
  ChangePassword: any;
  Submit: () => void;
  id?: string;
  spinner: boolean;
}

const Login: React.FC<LoginProps> = (props) => {
  const history = useHistory();

  return (
    <React.Fragment>
      <MainContainer>
        <Card>
          <Header />
          <Form Submit={props.Submit} id="form">
            <FormInput
              type="text"
              name="username_login"
              id="login-username"
              placeholder="Username"
              value={props.username}
              handleChange={props.ChangeUsername}
            />
            <FormInput
              type="password"
              name="password_login"
              id="login-password"
              placeholder="Password"
              value={props.password}
              handleChange={props.ChangePassword}
            />
            <SubmitButton type="Login" spinner={props.spinner}/>
          </Form>
          <RouteChanger
            type="Create Account"
            Submit={() => history.push("/signup")}
          />
        </Card>
      </MainContainer>
    </React.Fragment>
  );
};

export default React.memo(Login);
