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
  username_err: string | any;
  password: string;
  password_err: string | any;
  ChangeUsername: (value: string) => void;
  ChangePassword: (value: string) => void;
  Submit: () => void;
  id?: string;
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
              name="username"
              id="login-username"
              placeholder="Username"
            />
            <FormInput
              type="password"
              name="password"
              id="login-password"
              placeholder="Password"
            />
            <SubmitButton type="Login" />
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

export default Login;
