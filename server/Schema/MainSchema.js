import { createRequire } from "module";
import GroupModel from "../Model/Group-model.js";
import MessagesModel from "../Model/Messages-model.js";
import RegistrationModel from "../Model/RegistrationModel.js";
import TodoListModel from '../Model/TodoList-Model.js';
const require = createRequire(import.meta.url);
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLBoolean
} = require("graphql");
import { TeamDataCache, TeamListCache } from '../Cache/Caches.js';
import redis from 'async-redis';
const cache = redis.createClient();

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

const TodoListSchema = new GraphQLObjectType({
  name: 'TodoListSchema',
  fields: () => {
    return {
      _id: {type: GraphQLString},
      GroupID: {type: GraphQLString},
      TodoList: {type: GraphQLString},
      Status: {type: GraphQLBoolean}
    }
  }
});

const MessagesSchema = new GraphQLObjectType({
  name: 'MessagesSchema',
  fields: () => {
    return {
      _id: {type: GraphQLString},
      GroupID: {type: GraphQLString},
      Messages: {type: GraphQLString},
      Status: {type: GraphQLBoolean}
    }
  }
});

const GroupSchema = new GraphQLObjectType({
  name: "GroupSchema",
  fields: () => {
    return {
      _id: { type: GraphQLString },
      Name: { type: GraphQLString },
      Members: { type: GraphQLString },
      Admin: { type: GraphQLString },
      GroupProfile: { type: GraphQLString },
      RegistrationDate: { type: GraphQLString },
      Status: { type: GraphQLBoolean }
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
        const cache_response = await TeamListCache(userID);
        if (cache_response) return JSON.parse(cache_response);
        const response = await RegistrationModel.findById(userID);
        if (response !== null) {
          const data =  { GroupsJoined: JSON.stringify(response.GroupsJoined) };
          await cache.set(`${userID}/todo_list`, JSON.stringify(data));
          return data;
        }
      },
    },

    FetchTeamData: {
      type: GroupSchema,
      args: { teamID: { type: GraphQLString } },
      resolve: async (_, args) => {
        const { teamID } = args;
        const cache_response = await TeamDataCache(teamID);
        if (cache_response ) return JSON.parse(cache_response);
        const response = await GroupModel.findById(teamID);
        if (response) {
          const data = { 
            _id: response._id,
            Members: JSON.stringify(response.Members),
            Admin: response.Admin,
            GroupProfile: response.GroupProfile,
            RegistrationDate: response.RegistrationDate,
            Name: response.Name
          };
          await cache.set(`${teamID}/teamData`, JSON.stringify(data));
          return data;
        }
      },
    },

    FetchTeamTodo: {
      type: TodoListSchema,
      args: { teamID: {type: GraphQLString} },
      resolve: async(_, args) => {
        const { teamID } = args;
        const response = await TodoListModel.findOne({GroupID: teamID});
        if (response) return {TodoList: JSON.stringify(response.TodoList), _id: response._id};
      }
    },

    FetchTeamMessages: {
      type: MessagesSchema,
      args: { teamID: {type: GraphQLString} },
      resolve: async (_, args) => {
        const { teamID } = args;
      }
    }
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
      },
      resolve: async (_, args) => {
        const { Name, Admin, GroupProfile } = args;
        const Data = {
          Name, Admin, GroupProfile
        };
        const User_Info = await RegistrationModel.findOne({_id: Admin});
        if (User_Info) {
          const TeamData = new GroupModel(Data);
          const team_response = await TeamData.save();
          User_Info.GroupsJoined.push({GroupID: team_response._id, GroupProfile, Name});
          await User_Info.save();
          const TodoListData = new TodoListModel({GroupID: team_response._id});
          const MessagesData = new MessagesModel({GroupID: team_response._id});
          await MessagesData.save();
          await TodoListData.save();
          return {Status: true};
        }
      }
    },

    AddTodo: {
      type: TodoListSchema,
      args: {
        initiator: {type: GraphQLString},
        todo: {type: GraphQLString},
        teamID: {type: GraphQLString}
      },
      resolve: async(_, args) => {
        const { initiator, todo, teamID } = args;
        const response = await GroupModel.findOne({_id: teamID});
        if (response) {
          const Serialized_Data = {
            initiator,
            todo,
            status: false
          }
          response.TodoList.push(Serialized_Data);
          await response.save();
          return {Status: true};
        }
        return {Status: false};
      }
    },

    RemoveTodo: {
      type: TodoListSchema,
      args: {
        todoID: {type: GraphQLString},
        teamID: {type: GraphQLString}
      },
      resolve: async(_, args) => {
        const { todoID, teamID } = args;
        const response = await GroupModel.findOne({_id: teamID});
        if (response) {
          if (response.TodoList.length > 0) {
            const data = [...response.TodoList]
            for (let TODO in data) {
              if (data[TODO]._id === todoID) {
                data.splice(TODO, 1);
                break
              }
            }
            response.TodoList = data;
            await response.save();
            return {Status: true};
          } 
          return {Status: false};
        }
        return {Status: false};
      }
    },

    AcceptTodo: {
      type: TodoListSchema,
      args: {
        teamID: {type: GraphQLString},
        todoID: {type: GraphQLString}
      },
      resolve: async(_, args) => {
        const { todoID, teamID } = args;
        const response = await GroupModel.findOne({_id: teamID});
        if (response) {
          if (response.TodoList.length > 0) {
            const data = [...response.TodoList]
            let TODO_INDEX = null;
            for (let TODO in data) {
              if (data[TODO]._id === todoID) {
                TODO_INDEX = TODO;
                break
              }
            };
            if (TODO_INDEX) {
              const MemberCount = response.Members.length;
              const required_todo = data[TODO_INDEX];
              if (required_todo.approval_count >= (1/3) * MemberCount) {
                required_todo.status = true;
                data.splice(TODO_INDEX, 1, required_todo);
                response.TodoList = data;
                await response.save();
                return {Status: true};
              } else {
                required_todo.approval_count += 1;
                data.splice(TODO_INDEX, 1, required_todo);
                response.TodoList = data;
                await response.save();
                return {Status: false};
              }
            }

          } 
          return {Status: false};
        }
        return {Status: false};
      }
    }
  }
})

const MainSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

export default MainSchema;