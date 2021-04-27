import { gql } from '@apollo/client';

export const JoinTeamGQL = gql`
    mutation ($teamID: String!, $userID: String!) {
        JoinTeam (teamID: $teamID, userID: $userID) {
            _id
        }
    }
`;

export const CreateTeamGQL = gql`
    mutation ($name: String!, $admin: String!, $groupProfile: String!) {
        CreateTeam (Name: $name, Admin: $admin, GroupProfile: $groupProfile) {
            _id
        }
    }
`;