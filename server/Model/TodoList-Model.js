import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    GroupID: {
        type: String,
        required: true
    },

    TodoList: {
        // initiator RegisterID
        type: [{todo: String, initiator: String, status: Boolean}],
        default: []
    },
});

const TodoListModel = new mongoose.model('TodoList', Schema);

export default TodoListModel;