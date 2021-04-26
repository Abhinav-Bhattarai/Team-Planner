import React, { useContext, useState } from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useLazyQuery,
  useQuery,
} from "@apollo/client";
import { MainContainer } from "../Components/MainPage/Reusables/reusables";
import SideBar, {
  ActivityContainer,
  PersonalInformationHeader,
  SearchBar,
} from "../Components/MainPage/Sidebar/sidebar";
import MainView from "../Components/MainPage/MainView/main-view";
import HelperBar from "../Components/MainPage/HelperBar/helperbar";
import { Route, Switch } from "react-router";
import { FetchTeamData, FetchTeams } from "./gql-calls/gql";
import TeamCard from "../Components/MainPage/Sidebar/TeamCard/team-card";
import DummyLogo from "../assets/github.svg";
import DefaultLogo from "../assets/default.svg";
import Context from "./Context";

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

interface TeamListObject {
  Name: string;
  GroupProfile: string;
  GroupID: string;
}

const NoDataPage = () => {
  return <main></main>;
};

const NoDataSideBar = () => {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "20px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src={DefaultLogo} alt="default" width="250px" height="250px" />
      <div style={{color: 'grey', fontSize: '16px'}}>No Team Joined ...</div>
    </main>
  );
};

const MainPage: React.FC<PROPS> = (props) => {
  const { userInfo } = useContext(Context);
  const [team_list, SetTeamList] = useState<null | Array<TeamListObject>>([]);
  const [search_value, SetSearchValue] = useState<string>("");

  const TeamListGQL = useQuery(FetchTeams, {
    variables: {
      // @ts-ignore
      userID: userInfo.userID,
    },
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      const { FetchTeams } = data;
      SetTeamList(JSON.parse(FetchTeams.GroupsJoined));
    },
    onError: (err) => {},
  });

  const [TeamData, { loading }] = useLazyQuery(FetchTeamData, {
    onCompleted: (data) => {},
    fetchPolicy: "cache-and-network",
    onError: (err) => {},
  });

  const ChangeSearchValue = (event: any) => {
    const value = event.target.value;
    SetSearchValue(value);
  };

  const JoinTeamHandler = () => {};

  const CreateTeamHandler = () => {};

  const MainViewRouter = () => {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/:teamid/todo" />
          <Route exact path="/:teamid/messages" />
          <Route component={NoDataPage} />
        </Switch>
      </React.Fragment>
    );
  };

  const PressHandler = (teamID: string) => {
    TeamData({
      variables: { teamID },
    });
  };

  let TeamCardContainer: any = <NoDataSideBar />;

  if (team_list) {
    if (team_list.length > 0) {
      TeamCardContainer = team_list.map((team) => {
        return (
          <TeamCard
            TeamProfile={team.GroupProfile}
            TeamName={team.Name}
            TeamID={team.GroupID}
            key={team.GroupID}
            PressHandler={(id: string) => PressHandler(id)}
          />
        );
      });
    }
  }

  console.log(TeamCardContainer);

  return (
    <React.Fragment>
      <MainContainer>
        <SideBar>
          <PersonalInformationHeader username={"hello"} source={DummyLogo} />
          <SearchBar
            value={search_value}
            ChangeValue={(e: any) => ChangeSearchValue(e)}
          />
          <ActivityContainer
            JoinTeamHandler={JoinTeamHandler}
            CreateTeamHandler={CreateTeamHandler}
          />
          {TeamCardContainer}
        </SideBar>
        <MainView>
          {TeamListGQL.loading === false ? <MainViewRouter /> : <NoDataPage />}
        </MainView>
        <HelperBar />
      </MainContainer>
    </React.Fragment>
  );
};

export default MainPageWrapper;
