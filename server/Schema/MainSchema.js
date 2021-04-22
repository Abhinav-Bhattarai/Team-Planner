import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = require('graphql');

const UserSchema = new GraphQLObjectType({
    name: 'UserSchema',
    fields: () => {
        return {
            Username: {type: GraphQLString},
            GroupsJoined:{type: GraphQLString},
            Phone: {type: GraphQLInt}
        }
    }
});

const GroupSchema = new GraphQLObjectType({
    name: 'GroupSchema',
    field: () => {
        return {
            Name: {type: GraphQLString},
            Members: {type: GraphQLString},
            Messages: {type: GraphQLString},
            Admin: {type: GraphQLString},
            GroupProfile: {type: GraphQLString},
            TodoList: {type: GraphQLString},
            RegistrationDate: {type: GraphQLString}
        }
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {

    }
});

const MainSchema = new GraphQLSchema({
    query: RootQuery
});

export default MainSchema;