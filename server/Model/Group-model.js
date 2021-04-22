import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },

    Admin: {
        type: String,
        required: true
    },

    Messages: {
        type: [{sender: String, date: String, message: String}],
        default: []
    },

    GroupProfile: {
        type: String,
        data: Buffer,
        required: true
    },

    TodoList: {
        // initiator RegisterID
        type: [{todo: String, initiator: String, status: Boolean}],
        default: []
    },

    Members: {
        // RegisterID of mombers;
        type: [String],
        required: true
    },

    RegistrationDate: {
        type: String,
        default: new Date(parseInt(Date.now())).toLocaleDateString()
    }
});

const GroupModel = mongoose.model('Group-Model', Schema);

export default GroupModel;