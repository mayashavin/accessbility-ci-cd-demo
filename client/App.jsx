import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import A11yPlayground from './components/A11yPlayground';
import Counter from './components/Counter'; // Import the Counter component

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [currentView, setCurrentView] = useState('tasks'); // 'tasks', 'playground', or 'counter'

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
        maxWidth: '800px',
        margin: '40px auto',
        padding: '30px',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        color: '#333',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <nav
        style={{
          marginBottom: '20px',
          paddingBottom: '10px',
          borderBottom: '1px solid #eee',
        }}
      >
        <button
          onClick={() => setCurrentView('tasks')}
          style={{
            marginRight: '10px',
            padding: '8px 15px',
            cursor: 'pointer',
            backgroundColor: currentView === 'tasks' ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Task Management
        </button>
        <button
          onClick={() => setCurrentView('playground')}
          style={{
            marginRight: '10px', // Added margin for spacing
            padding: '8px 15px',
            cursor: 'pointer',
            backgroundColor:
              currentView === 'playground' ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Accessibility Playground
        </button>
        <button 
          onClick={() => setCurrentView('counter')} // Add button for Counter view
          style={{
            padding: '8px 15px',
            cursor: 'pointer',
            backgroundColor: currentView === 'counter' ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Counter
        </button>
      </nav>

      {currentView === 'tasks' && (
        <>
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
          <button
            type="button"
            onClick={() => alert('Clicked a button!')}
            style={{
              display: 'inline-block',
              marginTop: '30px',
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: '#ffffff',
              borderRadius: '4px',
              border: '1px solid #6c757d',
              fontWeight: 'bold',
            }}
          >
            Another Clickable Element (Accessible)
          </button>
        </>
      )}
      {currentView === 'playground' && <A11yPlayground />}
      {currentView === 'counter' && <Counter />} {/* Conditionally render Counter */}
    </div>
  );
}
