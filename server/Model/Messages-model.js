import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    GroupID: {
        type: String,
        required: true
    },

    Messages: {
        type: [{sender: String, date: String, message: String}],
        default: []
    },
});

const MessagesModel = new mongoose.model('Messages-model', Schema);

export default MessagesModel;