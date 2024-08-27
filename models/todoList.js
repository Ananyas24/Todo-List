const mongoose = require('mongoose');

// Define the schema for the to-do item
const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'completed'], // Example status values
    },
    deadline: {
        type: Date,
    },
});

// Create a model from the schema
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;



const todoList = mongoose.model("todo", todoSchema);

module.exports = todoList;
