import axios from "axios";
import React, { Suspense } from "react";
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

// interface Error {
//   error: string;
//   type: string;
// };

interface SignupCred {
  username_signup: string;
  password_signup: string;
  confirm_signup: string;
  phone_signup: string;
};

interface LoginCred {
  username_login: string;
  password_login: string;
}

const LandingPage: React.FC<PROPS> = ({ ChangeAuthentication }) => {

  const formik_signup = useFormik({
    initialValues: {
      confirm_signup: '',
      username_signup: '',
      password_signup: '',
      phone_signup: ''
    },

    onSubmit: (values) => {
      SignupHandler(values);
    },

    validate: (values) => {
      let errors = {};
      return errors
    }
  });

  const formik_login = useFormik({
    initialValues: {
      username_login: '',
      password_login: '',
    },

    onSubmit: (values) => {
      LoginHandler(values)
    }
  });
  
  console.log(formik_signup);

  const SignupHandler = async (credentials: SignupCred): Promise<void> => {
    const { username_signup, password_signup, confirm_signup, phone_signup } = credentials;
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
      } 
    }
  };

  const LoginHandler = async (credentials: LoginCred): Promise<void> => {
    const { username_login, password_login } = credentials;
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
                  username={formik_login.values.username_login}
                  password={formik_login.values.password_login}
                  username_err={formik_login.errors.username_login}
                  password_err={formik_login.errors.password_login}
                  ChangePassword={formik_login.handleChange}
                  ChangeUsername={formik_login.handleChange}
                  Submit={formik_login.handleSubmit}
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
                  username={formik_signup.values.username_signup}
                  password={formik_signup.values.password_signup}
                  confirm={formik_signup.values.confirm_signup}
                  phone={formik_signup.values.phone_signup}
                  username_err={formik_signup.errors.username_signup}
                  password_err={formik_signup.errors.password_signup}
                  confirm_err={formik_signup.errors.confirm_signup}
                  phone_err={formik_signup.errors.phone_signup}
                  ChangeUsername={formik_signup.handleChange}
                  ChangePassword={formik_signup.handleChange}
                  ChangePhone={formik_signup.handleChange}
                  ChangeConfirm={formik_signup.handleChange}
                  Submit={formik_signup.handleSubmit}
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
                  username={formik_login.values.username_login}
                  password={formik_login.values.password_login}
                  username_err={formik_login.errors.username_login}
                  password_err={formik_login.errors.password_login}
                  ChangePassword={formik_login.handleChange}
                  ChangeUsername={formik_login.handleChange}
                  Submit={formik_login.handleSubmit}
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
