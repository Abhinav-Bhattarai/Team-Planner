import { gql } from '@apollo/client';

export const JoinTeamGQL = gql`
    mutation ($teamID: String!, $userID: String!) {
        JoinTeam (teamID: $teamID, userID: $userID) {
            GroupsJoined
        }
    }
`;

export const CreateTeamGQL = gql`
    mutation ($name: String!, $admin: String!, $groupProfile: String!) {
        CreateTeam (Name: $name, Admin: $admin, GroupProfile: $groupProfile) {
            Status
        }
    }
`;

export const AddTodoMutator = gql`
    mutation ($initiator: String!, $todo: String!, $teamID: String!) {
        AddTodo (initiator: $initiator, todo: $todo, teamID: $teamID) {
            Status
        }
    }
`;

export const RemoveTodoMutator = gql`
    mutation ($todoID: String!, $teamID: String!) {
        RemoveTodo (teamID: $teamID, todoID: $todoID) {
            Status
        }
    }
`;