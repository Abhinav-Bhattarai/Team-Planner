import React, {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useLazyQuery,
  useQuery,
  useMutation,
} from "@apollo/client";
import { MainContainer } from "../Components/MainPage/Reusables/reusables";
import {
  AddTodoMutator,
  CreateTeamGQL,
  JoinTeamGQL,
  RemoveTodoMutator,
} from "./gql-calls/mutations";
import SideBar, {
  ActivityContainer,
  PersonalInformationHeader,
  SearchBar,
} from "../Components/MainPage/Sidebar/sidebar";
import MainView from "../Components/MainPage/MainView/main-view";
import HelperBar from "../Components/MainPage/HelperBar/helperbar";
import { Route, Switch, useHistory } from "react-router";
import { FetchTeamData, FetchTeams, FetchTeamTodo } from "./gql-calls/gql";
import TeamCard from "../Components/MainPage/Sidebar/TeamCard/team-card";
import DummyLogo from "../assets/github.svg";
import DefaultLogo from "../assets/default.svg";
import Context from "./Context";
import Spinner from "../Components/UI/Spinner/spinner";
import JoinPopup from "../Components/MainPage/Popup/join-popup";
import CreatePopup from "../Components/MainPage/Popup/create-popup";
import {
  MainViewHeader,
  MainViewNavbar,
  MainViewNavbarComponents,
  MainViewNavbarContainer,
  MainViewNavbarIndicator,
} from "../Components/MainPage/MainView/Reusables/reusables";
import SocketClient from "socket.io-client";
import LoadingPage from "../Components/UI/LoadingPage/loadingPage";
import TodoCard from "../Components/MainPage/MainView/Todo/TodoCard/todo-card";
import TodoListActivityContainer, {TodoActivityButton} from "../Components/MainPage/MainView/Todo/ActivityContainer/Activity-Container";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});

const AsyncTodoList = React.lazy(
  () => import("../Components/MainPage/MainView/Todo/todo")
);
const AsyncMessages = React.lazy(
  () => import("../Components/MainPage/MainView/Messages/messages")
);
interface PROPS {
  ChangeAuthentication: (type: boolean) => void;
}

export interface TodoListState {
  initiator: string;
  todo: string;
  status: string;
  _id: string;
}

interface SelectedTeam {
  _id?: string;
  Members?: Array<string>;
  Admin?: string;
  GroupProfile?: string;
  RegistrationDate?: string;
  Name?: string;
  error: boolean;
}
interface TeamListObject {
  Name: string;
  GroupProfile: string;
  GroupID: string;
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

const NoDataPage = () => {
  return (
    <main
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <img
        src={DefaultLogo}
        draggable="false"
        alt="default"
        width="60%"
        height="350px"
      />
      <div style={{ color: "grey", fontSize: "18px", fontWeight: 700 }}>
        You are Lonely ...
      </div>
    </main>
  );
};

const MainViewLoader = () => {
  return (
    <main
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner />
    </main>
  );
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
      <div style={{ color: "grey", fontSize: "16px", fontWeight: 600 }}>
        No Team Joined ...
      </div>
    </main>
  );
};

const MainPage: React.FC<PROPS> = (props) => {
  const { userInfo } = useContext(Context);
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
  const [team_list, setTeamList] = useState<null | Array<TeamListObject>>([]);
  const [search_value, setSearchValue] = useState<string>("");
  const [join_team_popup, setJoinTeamPopup] = useState<boolean>(false);
  const [create_team_popup, setCreateTeamPopup] = useState<boolean>(false);
  const [
    selected_team_data,
    setSelectedTeamData,
  ] = useState<null | SelectedTeam>(null);
  const [todo_popup, setTodoPopup] = useState<boolean>(false);
  const [todo_list, setTodoList] = useState<null | Array<TodoListState>>(null);
  // const [todo_input, setTodoInput] = useState<string>('');
  const IndicatorRef = useRef(null);
  const history = useHistory();
  // graphQL queries;
  const TeamListGQL = useQuery(FetchTeams, {
    variables: {
      // @ts-ignore
      userID: userInfo.userID,
    },

    fetchPolicy: "cache-and-network",

    onCompleted: (data: any) => {
      const { FetchTeams } = data;
      if (FetchTeams.GroupsJoined) {
        const SerializedData = JSON.parse(FetchTeams.GroupsJoined);
        const latest_teamID: null | string = localStorage.getItem(
          "latest-teamID"
        );
        setTeamList(SerializedData);
        if (SerializedData.length > 0 && latest_teamID === null) {
          TeamTodoLists({ variables: { teamID: SerializedData[0].GroupID } });
          TeamData({ variables: { teamID: SerializedData[0].GroupID } });
        } 
        SerializedData.length === 0 && setSelectedTeamData({ error: true });
      }else {
        setSelectedTeamData({ error: true });
      }
    },

    onError: (err: any) => {},
  });

  const [TeamData, { loading }] = useLazyQuery(FetchTeamData, {
    onCompleted: (data) => {
      const response = data.FetchTeamData;
      const SerializedData = {
        _id: response._id,
        Members: JSON.parse(response.Members),
        Admin: response.Admin,
        GroupProfile: response.GroupProfile,
        RegistrationDate: response.RegistrationDate,
        Name: response.Name,
        error: false,
      };
      const latest_teamID: string | null = localStorage.getItem(
        "latest-teamID"
      );
      latest_teamID === null &&
        localStorage.setItem("latest-teamID", response._id);
      setSelectedTeamData(SerializedData);
    },

    fetchPolicy: "cache-and-network",

    onError: (err) => {},
  });

  const [TeamTodoLists] = useLazyQuery(FetchTeamTodo, {
    onCompleted: (data) => {
      const { FetchTeamTodo } = data;
      if (FetchTeamTodo) {
        const Serialized_Data = JSON.parse(FetchTeamTodo.TodoList);
        setTodoList(Serialized_Data);
      }
    },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    const latest_teamID: string | null = localStorage.getItem("latest-teamID");
    if (latest_teamID) {
      TeamData({ variables: { teamID: latest_teamID } });
      TeamTodoLists({ variables: { teamID: latest_teamID } });
    }
  }, []);
  // graphQL Mutations

  const [JoinTeam] = useMutation(JoinTeamGQL);
  const [CreateTeam] = useMutation(CreateTeamGQL);
  const [AddTodo] = useMutation(AddTodoMutator);
  const [RemoveTodo] = useMutation(RemoveTodoMutator);

  // graphQL helper functions;

  const ChangeSearchValue = (event: any) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  const JoinTeamHandler = (event: any, teamID: string) => {
    event.preventDefault();
    if (teamID.length > 2) {
      setJoinTeamPopup(false);
      JoinTeam({
        variables: {
          // @ts-ignore
          userID: userInfo.userID,
          teamID: teamID,
        },
      });
    }
  };

  const AddTodoListHandler = () => {
    AddTodo({
      variables: {},
    });
  };

  const RemoveTodoListHandler = () => {
    RemoveTodo({
      variables: {},
    });
  };

  const CreateTeamHandler = (
    event: any,
    team_name: string,
    team_profile: string
  ) => {
    event.preventDefault();
    if (team_name.length > 0 && team_profile.length > 10) {
      setCreateTeamPopup(false);
      CreateTeam({

        variables: {
          // @ts-ignore
          admin: userInfo.userID,
          groupProfile: team_profile,
          name: team_name,
        },
      });
    }
  };

  const MainViewRouter = () => {
    return (
      <React.Fragment>
        <Switch>
          <Route
            exact
            path="/:teamid/todo"
            render={() => {
              return (
                <Suspense fallback={<LoadingPage />}>
                  <AsyncTodoList TodoList={todo_list}>
                    <TodoListActivityContainer>
                      <TodoActivityButton
                        name="Add Todo"
                        Click={() => setTodoPopup(true)}
                        color="#44B581"
                      />
                    </TodoListActivityContainer>
                    {todo_list
                      ? todo_list.length > 0 &&
                        todo_list.map((element) => {
                          return (
                            <TodoCard
                              _id={element._id}
                              initiator={element.initiator}
                              todo={element.todo}
                              status={element.todo}
                              key={element._id}
                            />
                          );
                        })
                      : null}
                  </AsyncTodoList>
                </Suspense>
              );
            }}
          />
          <Route
            exact
            path="/:teamid/messages"
            render={() => {
              return (
                <Suspense fallback={<LoadingPage />}>
                  <AsyncMessages />
                </Suspense>
              );
            }}
          />
          <Route
            render={() => {
              return (
                <Suspense fallback={<LoadingPage />}>
                  <AsyncTodoList TodoList={todo_list}>
                    <TodoListActivityContainer>
                      <TodoActivityButton
                        name="Add Todo"
                        Click={() => setTodoPopup(true)}
                        color="#44B581"
                      />
                    </TodoListActivityContainer>
                    {todo_list
                      ? todo_list.length > 0 &&
                        todo_list.map((element) => {
                          return (
                            <TodoCard
                              key={element._id}
                              _id={element._id}
                              initiator={element.initiator}
                              todo={element.todo}
                              status={element.todo}
                            />
                          );
                        })
                      : null}
                  </AsyncTodoList>
                </Suspense>
              );
            }}
          />
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

  if (team_list && TeamListGQL.loading === false) {
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

  if (TeamListGQL.loading === true) {
    TeamCardContainer = <MainViewLoader />;
  }

  const RemovePopup = (event: any) => {
    join_team_popup && setJoinTeamPopup(false);
    create_team_popup && setCreateTeamPopup(false);
    todo_popup && setTodoPopup(false);
  };

  const HandleTodoClick = (type: "left" | "right"): void => {
    if (IndicatorRef !== null) {
      // @ts-ignore
      IndicatorRef.current.style.transform = "translate(0px)";
    }
    const team_id = selected_team_data?._id;
    history.push(`/${team_id}/todo`);
  };

  const HandleMessageClick = (type: "left" | "right"): void => {
    if (IndicatorRef !== null) {
      // @ts-ignore
      IndicatorRef.current.style.transform = "translate(470px)";
    }
    const team_id = selected_team_data?._id;
    history.push(`/${team_id}/messages`);
  };

  const JoinSocketRoom = useCallback(() => {
    if (socket) {
      socket.disconnect();
    }
    if (selected_team_data) {
      const SocketProxy = "http://localhost:8000";
      const io = SocketClient(SocketProxy);
      // @ts-ignore
      io.emit("join", selected_team_data._id, localStorage.getItem("userID"));
      setSocket(io);
    }
  }, [selected_team_data]);

  useEffect(() => {
    JoinSocketRoom();
  }, [JoinSocketRoom]);

  useEffect(() => {
    if (socket) {
      socket.on("client-joined", (userID: string) => {});
      return () => {
        socket.removeAllListeners();
      };
    }
  });

  return (
    <React.Fragment>
      {join_team_popup && <JoinPopup SubmitForm={JoinTeamHandler} />}
      {create_team_popup && <CreatePopup Submit={CreateTeamHandler} />}
      <MainContainer Click={RemovePopup}>
        <SideBar
          blur={
            join_team_popup === true ||
            create_team_popup === true ||
            todo_popup === true
          }
        >
          <PersonalInformationHeader
            username={localStorage.getItem("Username")}
            source={DummyLogo}
          />
          <SearchBar
            value={search_value}
            ChangeValue={(e: any) => ChangeSearchValue(e)}
          />
          <ActivityContainer
            JoinTeamHandler={() => setJoinTeamPopup(!join_team_popup)}
            CreateTeamHandler={() => setCreateTeamPopup(!create_team_popup)}
          />
          {TeamCardContainer}
        </SideBar>
        <MainView
          blur={
            join_team_popup === true ||
            create_team_popup === true ||
            todo_popup === true
          }
        >
          {loading === true || selected_team_data === null ? (
            <MainViewLoader />
          ) : selected_team_data.error === false ? (
            <>
              <MainViewHeader
                Profile={selected_team_data.GroupProfile}
                name={selected_team_data.Name}
              />
              <MainViewNavbar>
                <MainViewNavbarContainer>
                  <MainViewNavbarComponents
                    type="left"
                    Click={HandleTodoClick}
                    name="TodoList"
                  />
                  <MainViewNavbarComponents
                    type="right"
                    Click={HandleMessageClick}
                    name="Messages"
                  />
                </MainViewNavbarContainer>
                <MainViewNavbarIndicator reference={IndicatorRef} />
              </MainViewNavbar>
              <MainViewRouter />
            </>
          ) : (
            <NoDataPage />
          )}
        </MainView>
        <HelperBar
          blur={join_team_popup === true || create_team_popup === true || todo_popup === true}
        />
      </MainContainer>
    </React.Fragment>
  );
};

export default MainPageWrapper;