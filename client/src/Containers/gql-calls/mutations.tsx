import { gql } from '@apollo/client';

export const JoinTeamGQL = gql`
    mutation ($teamID: String!, $userID: String!) {
        JoinTeam (teamID: $teamID, userID: $userID) {
            _id
        }
    }
`;

export const CreateTeamGQL = gql`
    mutation ($teamID: String!, $userID: String!) {
        CreateTeam (teamID: $teamID, userID: $userID) {
            _id
        }
    }
`;