const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let todos = [];

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const todo = req.body;
  todos.push(todo);
  res.status(201).json(todo);
});

app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  todos = todos.filter(todo => todo.id !== id);
  res.status(204).send();
});

app.listen(5000, () => {
  console.log('Backend running on http://localhost:5000');
});
