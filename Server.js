const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/todoList');

const app = express();
app.use(cors());
app.use(express.json());

try {
     mongoose.connect("mongodb://127.0.0.1/todo");
    console.log("MongoDB Connected successfully");
}catch (error){
console.log(error);
}

// Get saved tasks from the database
app.get('/getTodoList', (req, res) => {
  TodoModel.find({})
    .then((todoList) => res.json(todoList))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Add new task to the database
app.post('/addTodoList', (req, res) => {
  TodoModel.create({
    task: req.body.task,
    status: req.body.status,
    deadline: req.body.deadline,
  })
    .then((todo) => res.status(201).json(todo))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Update task fields (including deadline)
app.put('/updateTodoList/:id', (req, res) => {
  const id = req.params.id;
  const updateData = {
    task: req.body.task,
    status: req.body.status,
    deadline: req.body.deadline,
  };
  TodoModel.findByIdAndUpdate(id, updateData, { new: true })
    .then((todo) => res.json(todo))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Delete task from the database
app.delete('/deleteTodoList/:id', (req, res) => {
  const id = req.params.id;
  TodoModel.findByIdAndDelete(id)
    .then((todo) => res.json(todo))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
