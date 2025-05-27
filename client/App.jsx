import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';

export default function App() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from API on component mount
  useEffect(() => {
    fetch('/api/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error('Error fetching tasks:', err)); // Basic error handling
  }, []);

  const handleAddTask = (title) => {
    fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    })
      .then((res) => res.json())
      .then((newTask) => {
        if (newTask.error) {
          console.error('Error adding task:', newTask.error); // Basic error handling
          alert('Error: ' + newTask.error); // Alert user
        } else {
          setTasks((prevTasks) => [...prevTasks, newTask]);
        }
      })
      .catch((err) => {
        console.error('Error adding task:', err);
        alert('Failed to add task. See console for details.');
      });
  };

  const handleRemoveTask = (id) => {
    fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        } else {
          res
            .json()
            .then((err) => {
              console.error('Error removing task:', err.error);
              alert('Error: ' + err.error);
            })
            .catch(() => {
              console.error('Error removing task: Status ' + res.status);
              alert('Failed to remove task. Status: ' + res.status);
            });
        }
      })
      .catch((err) => {
        console.error('Error removing task:', err);
        alert('Failed to remove task. See console for details.');
      });
  };

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '40px auto',
        padding: '30px',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        color: '#333', // Darker text for better readability on light backgrounds
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <img
          src='/logo.png'
          style={{ height: '50px', marginBottom: '10px' }}
          alt='Logo'
        />
        <h1 style={{ margin: 0, color: '#007bff' }}>Task Management</h1>
      </div>

      <AddTaskForm onAddTask={handleAddTask} />
      <TaskList tasks={tasks} onRemoveTask={handleRemoveTask} />

      <div
        onClick={() => alert('Clicked a generic div!')}
        style={{
          display: 'inline-block', // To make padding and width behave like a button
          marginTop: '30px',
          padding: '10px 20px', // Standard button padding
          backgroundColor: '#6c757d', // Bootstrap secondary button color
          color: '#ffffff', // White text
          cursor: 'pointer',
          textAlign: 'center',
          borderRadius: '4px', // Rounded corners
          border: '1px solid #6c757d', // Matching border
          fontWeight: 'bold', // Bold text for button feel
          userSelect: 'none', // Prevent text selection on click
        }}
      >
        Another Clickable Div (Inaccessible)
      </div>
    </div>
  );
}
