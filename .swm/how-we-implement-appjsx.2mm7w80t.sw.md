---
title: How we implement App.jsx
---
# Introduction

This document will walk you through the implementation of <SwmPath>[client/App.jsx](/client/App.jsx)</SwmPath> in our client-side application. The <SwmPath>[client/App.jsx](/client/App.jsx)</SwmPath> component is central to managing tasks, providing functionality to fetch, add, and remove tasks. It also handles user interactions and displays the task list.

We will cover:

1. How tasks are fetched and managed within the component.
2. The process of adding a new task.
3. The mechanism for removing a task.
4. The structure and styling of the component.

# Fetching and managing tasks

<SwmSnippet path="/client/App.jsx" line="1">

---

The <SwmPath>[client/App.jsx](/client/App.jsx)</SwmPath> component initializes with an empty task list and fetches tasks from the API when the component mounts. This ensures that the task list is populated with existing tasks from the server.

```
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
```

---

</SwmSnippet>

# Adding a new task

<SwmSnippet path="/client/App.jsx" line="16">

---

The <SwmToken path="/client/App.jsx" pos="16:3:3" line-data="  const handleAddTask = (title) =&gt; {">`handleAddTask`</SwmToken> function is responsible for adding new tasks. It sends a POST request to the server with the task title and updates the task list upon successful addition. Error handling is included to alert the user in case of failure.

```
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
```

---

</SwmSnippet>

# Removing a task

<SwmSnippet path="/client/App.jsx" line="39">

---

The <SwmToken path="/client/App.jsx" pos="39:3:3" line-data="  const handleRemoveTask = (id) =&gt; {">`handleRemoveTask`</SwmToken> function allows users to delete tasks. It sends a DELETE request to the server and updates the task list to reflect the removal. Error handling is implemented to manage any issues during the process.

```
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
```

---

</SwmSnippet>

# Component structure and styling

<SwmSnippet path="/client/App.jsx" line="65">

---

The component returns a structured layout with a task management header, a form to add tasks, and a list to display tasks. Styling is applied directly within the component to ensure a consistent look and feel.

```
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
```

---

</SwmSnippet>

# Task form and list integration

<SwmSnippet path="/client/App.jsx" line="87">

---

The <SwmToken path="/client/App.jsx" pos="3:2:2" line-data="import AddTaskForm from &#39;./components/AddTaskForm&#39;;">`AddTaskForm`</SwmToken> and <SwmToken path="/client/App.jsx" pos="2:2:2" line-data="import TaskList from &#39;./components/TaskList&#39;;">`TaskList`</SwmToken> components are integrated into the <SwmPath>[client/App.jsx](/client/App.jsx)</SwmPath> component. These components handle the addition and display of tasks, respectively, and are crucial for user interaction.

```
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
```

---

</SwmSnippet>

# Conclusion

The <SwmPath>[client/App.jsx](/client/App.jsx)</SwmPath> component is designed to manage tasks effectively by integrating API interactions and user interface elements. The implementation focuses on maintaining a clean and functional code flow, ensuring that tasks can be fetched, added, and removed efficiently.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBYWNjZXNzYmlsaXR5LWNpLWNkLWRlbW8lM0ElM0FtYXlhc2hhdmlu" repo-name="accessbility-ci-cd-demo"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
