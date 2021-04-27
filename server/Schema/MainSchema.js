import { createRequire } from "module";
import GroupModel from "../Model/Group-model.js";
import RegistrationModel from "../Model/RegistrationModel.js";
const require = createRequire(import.meta.url);
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = require("graphql");

const UserSchema = new GraphQLObjectType({
  name: "UserSchema",
  fields: () => {
    return {
      Username: { type: GraphQLString },
      GroupsJoined: { type: GraphQLString },
      Phone: { type: GraphQLInt },
    };
  },
});

const GroupSchema = new GraphQLObjectType({
  name: "GroupSchema",
  fields: () => {
    return {
      _id: { type: GraphQLString },
      Name: { type: GraphQLString },
      Members: { type: GraphQLString },
      Messages: { type: GraphQLString },
      Admin: { type: GraphQLString },
      GroupProfile: { type: GraphQLString },
      TodoList: { type: GraphQLString },
      RegistrationDate: { type: GraphQLString },
    };
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    FetchTeams: {
      type: UserSchema,
      args: { userID: { type: GraphQLString } },
      resolve: async (_, args) => {
        const { userID } = args;
        const response = await RegistrationModel.findById(userID);
        if (response !== null) {
          return { GroupsJoined: JSON.stringify(response.GroupsJoined) };
        }
      },
    },

    FetchTeamData: {
      type: GroupSchema,
      args: { teamID: { type: GraphQLString } },
      resolve: async (_, args) => {
        const { teamID } = args;
        const response = await GroupModel.findById(teamID);
        if (response) {
          const data = { ...response };
          delete data.__v;
          return data;
        }
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    JoinTeam: {
      type: UserSchema,
      args: {teamID: {type: GraphQLString}, userID: {type: GraphQLString}},
      resolve: async(_, args) => {
        const { teamID, userID } = args;
        const Team = await GroupModel.findById(teamID);
        if (Team) {
          const User = await RegistrationModel.findOne({_id: userID});
          const Serialized_Data = { GroupID: Team._id, Name: Team.Name, GroupProfile: Team.GroupProfile }
          User.GroupsJoined.push(Serialized_Data);
          const response = await User.save();
          return {GroupsJoined: JSON.stringify(response.GroupsJoined)}
        }
      }
    },

    CreateTeam: {
      type: GroupSchema,
      args: {
        Name: {type: GraphQLString},
        Admin: {type: GraphQLString},
        GroupProfile: {type: GraphQLString},
        Members: {type: GraphQLString}
      },
      resolve: async (_, args) => {
        const { Name, Admin, GroupProfile, Members } = args;
      }
    }
  }
})

const MainSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

export default MainSchema;