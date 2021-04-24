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

interface SignupProps {
  username: string;
  password: string;
  confirm: string;
  phone: string;
  username_err: string | undefined;
  password_err: string | undefined;
  confirm_err: string | undefined;
  phone_err: string | undefined;
  ChangeUsername: any;
  ChangePassword: any;
  ChangeConfirm: any;
  ChangePhone: any;
  Submit: () => void;
}

const Signup: React.FC<SignupProps> = (props) => {
  const history = useHistory();

  return (
    <React.Fragment>
      <MainContainer>
        <Card>
          <Header/>
          <Form Submit={props.Submit} id="form">
            <FormInput
              type="text"
              name="username_signup"
              id="signup-username"
              placeholder="Username"
              handleChange={props.ChangeUsername}
              value={props.username}
            />
            <FormInput
              type="password"
              name="password_signup"
              id="signup-password"
              placeholder="Password"
              value={props.password}
              handleChange={props.ChangePassword}
            />

            <FormInput
              type="password"
              name="confirm_signup"
              id="signup-confirm"
              placeholder="Confirm"
              value={props.confirm}
              handleChange={props.ChangeConfirm}
            />

            <FormInput
              type="text"
              name="phone_signup"
              id="signup-phone"
              placeholder="Phone"
              value={props.phone}
              handleChange={props.ChangePhone}
            />
            <SubmitButton type="Signup" />
          </Form>
          <RouteChanger
            type="Already have an account ?"
            Submit={() => history.push("/login")}
          />
        </Card>
      </MainContainer>
    </React.Fragment>
  );
};

export default Signup;
