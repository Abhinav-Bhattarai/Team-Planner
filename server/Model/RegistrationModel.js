import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
  },

  Password: {
    type: String,
    required: true,
  },

  Phone: {
    type: Number,
    required: true,
  },

  GroupsJoined: {
    // GroupID and Name
    type: [
      {
        GroupID: String,
        Name: String,
        GroupProfile: {
          type: String,
          data: Buffer,
        },
      },
    ],
    default: [],
  },
});

const RegistrationModel = mongoose.model("Registration", Schema);

export default RegistrationModel;
