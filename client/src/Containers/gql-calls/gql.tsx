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
        }
    }
`;
