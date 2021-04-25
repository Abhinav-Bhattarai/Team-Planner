import React, { useContext } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Context from "./Context";
import { MainContainer } from "../Components/MainPage/Reusables/reusables";
import SideBar from "../Components/MainPage/Sidebar/sidebar";
import MainView from "../Components/MainPage/MainView/main-view";
import HelperBar from "../Components/MainPage/HelperBar/helperbar";
import { Route, Switch } from "react-router";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});

interface PROPS {
  ChangeAuthentication: (type: boolean) => void;
}

const MainPageWrapper: React.FC<PROPS> = (props) => {
  return (
    <React.Fragment>
      <ApolloProvider client={client}>
        <MainPage {...props} />
      </ApolloProvider>
    </React.Fragment>
  );
};

const MainPage: React.FC<PROPS> = (props) => {
  const context = useContext(Context);
  return (
    <React.Fragment>
      <MainContainer>
        <SideBar></SideBar>
        <MainView />
        <HelperBar />
      </MainContainer>
    </React.Fragment>
  );
};

export default MainPageWrapper;