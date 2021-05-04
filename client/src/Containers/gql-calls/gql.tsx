import { gql } from "@apollo/client";

export const FetchTeams = gql`
  query($userID: String!) {
    FetchTeams(userID: $userID) {
      GroupsJoined
    }
  }
`;

export const FetchTeamData = gql`
  query($teamID: String!) {
    FetchTeamData(teamID: $teamID) {
      _id
      Name
      Members
      Admin
      RegistrationDate
      GroupProfile
    }
  }
`;

export const FetchTeamTodo = gql`
  query($teamID: String!) {
    FetchTeamTodo(teamID: $teamID) {
      TodoList
    }
  }
`;
