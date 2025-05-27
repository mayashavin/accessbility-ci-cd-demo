const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static('.')); // Serve static files from the root directory
app.use(express.json()); // Middleware to parse JSON bodies

let tasks = [{ id: 1, title: 'Fix alt text' }]; // In-memory "database"
let nextId = 2; // To generate unique IDs for new tasks

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newTask = { id: nextId++, title };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskId = parseInt(id, 10);
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
