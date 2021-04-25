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
  field: () => {
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
      args: { groupID: { type: GraphQLString } },
      resolve: async (_, args) => {
        const { groupID } = args;
        const response = await GroupModel.findById(groupID);
        if (response) {
          const data = { ...response };
          delete data.__v;
          return data;
        }
      },
    },
  },
});

const MainSchema = new GraphQLSchema({
  query: RootQuery,
});

export default MainSchema;