import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import LoadingPage from "./Components/UI/loadingPage";
import Context from "./Containers/Context";

const AsyncMainPage = React.lazy(() => {
  return import('./Containers/MainPage');
});

const AsyncLandingPage = React.lazy(() => {
  return import('./Containers/LandingPage');
})

interface userInfoProps {
  Username: string;
  userID: string;
  auth_token: string;
}

interface AuthGuardProps {
  auth_status: boolean;
  userInfo: userInfoProps | null;
  ChangeAuthentication: (type: boolean) => void;
}

const AuthenticationGuard: React.FC<AuthGuardProps> = (props) => {
  const { auth_status, ChangeAuthentication, userInfo } = props;
  if (auth_status) {
    return (
      // @ts-ignore
      <Context.Provider value={{ userInfo }}>
        <Suspense fallback={() => <LoadingPage/>}>
          <BrowserRouter>
            <AsyncMainPage ChangeAuthentication={ChangeAuthentication} />
          </BrowserRouter>
        </Suspense>
      </Context.Provider>
    );
  }
  return (
    <Suspense fallback={() => <LoadingPage/>}>
      <BrowserRouter>
        <AsyncLandingPage ChangeAuthentication={ChangeAuthentication}/>
      </BrowserRouter>
    </Suspense>
  );
};

function App() {
  const [auth_status, SetAuthStatus] = useState<null | boolean>(null);
  const [userInfo, SetUserInfo] = useState<null | userInfoProps>(null);

  useEffect(() => {
    const HandleAuthentication = async () => {
      const Username: string | null = localStorage.getItem("Username");
      const userID: string | null = localStorage.getItem("userID");
      const auth_token: string | null = localStorage.getItem("auth-token");
      if (Username && userID && auth_token) {
        const context = { token: auth_token, userID };
        const response = await axios.post("/check-jwt", context);
        if (response.data.access === true) {
          SetUserInfo({ Username, userID, auth_token });
          SetAuthStatus(true);
          return;
        }
        SetAuthStatus(false);
        return;
      }
      SetAuthStatus(false);
      return;
    };

    HandleAuthentication();
  }, []);

  const ChangeAuthentication = (type: boolean): void => {
    
  };

  if (auth_status === null) {
    return <LoadingPage />;
  }

  return (
    <React.Fragment>
      <AuthenticationGuard
        auth_status={auth_status}
        ChangeAuthentication={(type: boolean) => ChangeAuthentication(type)}
        userInfo={userInfo}
      />
    </React.Fragment>
  );
}

export default App;
