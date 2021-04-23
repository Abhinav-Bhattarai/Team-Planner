import axios from "axios";
import React, { Suspense, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useFormik } from 'formik';
import LoadingPage from "../Components/UI/loadingPage";

const AsyncLogin = React.lazy(() => {
  return import("../Components/LandingPage/login");
});

const AsyncSignup = React.lazy(() => {
  return import("../Components/LandingPage/signup");
});

interface PROPS {
  ChangeAuthentication: (type: boolean) => void;
}

interface Error {
  error: string;
  type: string;
}

const LandingPage: React.FC<PROPS> = ({ ChangeAuthentication }) => {
  
  const [username_login, SetUsernameLogin] = useState<string>("");
  const [password_login, SetPasswordLogin] = useState<string>("");
  const [username_signup, SetUsernameSignup] = useState<string>("");
  const [password_signup, SetPasswordSignup] = useState<string>("");
  const [confirm_signup, SetConfirmSignup] = useState<string>("");
  const [phone_signup, SetPhoneSignup] = useState<string>("");
  const [username_login_err, SetUsernameLoginErr] = useState<Error | null>(null);
  const [password_login_err, SetPasswordLoginErr] = useState<Error | null>(null);
  const [username_signup_err, SetUsernameSignupErr] = useState<Error | null>(null);
  const [password_signup_err, SetPasswordSignupErr] = useState<Error | null>(null);
  const [confirm_signup_err, SetConfirmSignupErr] = useState<Error | null>(null);
  const [phone_signup_err, SetPhoneSignupErr] = useState<Error | null>(null);

  const ChangeUsernameSignup = (value: string): void => {
    SetUsernameSignup(value);
  };
  const ChangePasswordSignup = (value: string): void => {
    SetPasswordSignup(value);
  };
  const ChangeCorfirmSignup = (value: string): void => {
    SetConfirmSignup(value);
  };
  const ChangePhoneSignup = (value: string): void => {
    SetPhoneSignup(value);
  };
  const ChangeUsernameLogin = (value: string): void => {
    SetUsernameLogin(value);
  };
  const ChangePasswordLogin = (value: string): void => {
    SetPasswordLogin(value);
  };

  const SignupHandler = async (): Promise<void> => {
    if (
      username_signup.length > 3 &&
      password_signup === confirm_signup &&
      password_signup.length > 7 &&
      phone_signup.length > 9
    ) {
      const number_regex = /[0-9]/;
      if (number_regex.exec(password_signup) !== null) {
        const context = {
          Username: username_signup,
          Password: password_signup,
          Confirm: confirm_signup,
          Phone: phone_signup,
        };
        const { data } = await axios.post("/signup", context);
        if (data.error === false) {
          localStorage.setItem('Username', data.Username);
          localStorage.setItem('auth-token', data.token);
          localStorage.setItem('userID', data.userID);
          ChangeAuthentication(true);
        }
      } else {
        SetPasswordSignupErr({
          error: "Password must contain a number",
          type: "Password-Num",
        });
      }
    }else {
      if (username_signup.length < 4) {
        SetUsernameSignupErr({
          error: "Username must be atleast 4  characters",
          type: "Username-length",
        });
      };

      if (password_signup.length < 8) {
        SetPasswordSignupErr({
          error: "Password must be atleast 8 charactes",
          type: "Password-length",
        });
      }else {
        if (password_signup !== confirm_signup) {
          SetConfirmSignupErr({
            error: 'Passwords donot match',
            type: 'Passwords-match'
          })
        }
      };

      if (phone_signup.length < 10) {
        SetPhoneSignupErr({
          error: 'Phone number should be at least 10 characters',
          type: 'Phone-length'
        })
      }
    }
  };

  const LoginHandler = async (): Promise<void> => {
    if (username_login.length > 3 && password_login.length > 7) {
      const number_regex = /[0-9]/;
      if (number_regex.exec(password_login) !== null) {
        const context = {
          Username: username_login,
          Password: password_login,
        };
        const { data } = await axios.post("/login", context);
        // exception Handling;
        if (data.invalid_credential === false) {
          localStorage.setItem("Username", data.Username);
          localStorage.setItem("userID", data.userID);
          localStorage.setItem("auth-token", data.token);
          ChangeAuthentication(true);
        }
      } else {
        SetPasswordLoginErr({
          error: "Password must contain a number",
          type: "Password-Num",
        });
      }
    } else {
      if (username_login.length < 4) {
        SetUsernameLoginErr({
          error: "Username must be atleast 4  characters",
          type: "Username-length",
        });
      }

      if (password_login.length < 8) {
        SetPasswordLoginErr({
          error: "Password must be atleast 8 charactes",
          type: "Password-length",
        });
      }
    }
  };

  return (
    <React.Fragment>
      <Switch>
        <Route
          exact
          path="/login"
          render={() => {
            return (
              <Suspense fallback={() => <LoadingPage />}>
                <AsyncLogin
                  username={username_login}
                  password={password_login}
                  username_err={username_login_err}
                  password_err={password_login_err}
                  ChangePassword={(value: string) => ChangePasswordLogin(value)}
                  ChangeUsername={(value: string) => ChangeUsernameLogin(value)}
                  Submit={LoginHandler}
                />
              </Suspense>
            );
          }}
        />

        <Route
          exact
          path="/signup"
          render={() => {
            return (
              <Suspense fallback={() => <LoadingPage />}>
                <AsyncSignup
                  username={username_signup}
                  password={password_signup}
                  confirm={confirm_signup}
                  phone={phone_signup}
                  username_err={username_signup_err}
                  password_err={password_signup_err}
                  confirm_err={confirm_signup_err}
                  phone_err={phone_signup_err}
                  ChangeUsername={(value: string) =>ChangeUsernameSignup(value)}
                  ChangePassword={(value: string) =>ChangePasswordSignup(value)}
                  ChangePhone={(value: string) => ChangePhoneSignup(value)}
                  ChangeConfirm={(value: string) => ChangeCorfirmSignup(value)}
                  Submit={SignupHandler}
                />
              </Suspense>
            );
          }}
        />

        <Route
          render={() => {
            return (
              <Suspense fallback={() => <LoadingPage />}>
                <AsyncLogin
                  username={username_login}
                  password={password_login}
                  username_err={username_login_err}
                  password_err={password_login_err}
                  ChangePassword={(value: string) => ChangePasswordLogin(value)}
                  ChangeUsername={(value: string) => ChangeUsernameLogin(value)}
                  Submit={LoginHandler}
                />
              </Suspense>
            );
          }}
        />
      </Switch>
    </React.Fragment>
  );
};

export default LandingPage;
