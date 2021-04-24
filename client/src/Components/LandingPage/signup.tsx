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
  username_err: any;
  password_err: any;
  confirm_err: any;
  phone_err: any;
  ChangeUsername: (value: string) => void;
  ChangePassword: (value: string) => void;
  ChangeConfirm: (value: string) => void;
  ChangePhone: (value: string) => void;
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
              name="signup-username"
              id="signup-username"
              placeholder="Username"
            />
            <FormInput
              type="password"
              name="signup-password"
              id="signup-password"
              placeholder="Password"
            />

            <FormInput
              type="password"
              name="signup-confirm"
              id="signup-confirm"
              placeholder="Confirm"
            />

            <FormInput
              type="text"
              name="signup-phone"
              id="signup-phone"
              placeholder="Phone"
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
