import React, { useState } from 'react';

// Intentionally inaccessible AddTaskForm component
export default function AddTaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    if (title.trim()) {
      onAddTask(title);
      setTitle('');
    }
  };

  return (
    <div
      style={{
        marginTop: '20px',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '6px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
      }}
    >
      {/* Input without a label or aria-label/aria-labelledby */}
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Enter new task title...' // Placeholder is not a substitute for a label
        style={{
          padding: '12px',
          marginRight: '10px',
          border: '1px solid #ced4da', // Standard input border color
          borderRadius: '4px',
          color: '#495057', // Standard input text color
          fontSize: '1em',
          flexGrow: 1, // Allow input to take available space if in a flex container
        }}
      />
      {/* Using a div as a button, not keyboard accessible, no role */}
      <div
        onClick={handleSubmit}
        style={{
          display: 'inline-block',
          padding: '12px 20px',
          backgroundColor: '#007bff', // Standard blue, but on a div
          color: 'white',
          cursor: 'pointer',
          borderRadius: '4px',
          fontWeight: 'bold',
          fontSize: '1em',
          textAlign: 'center',
        }}
        // Missing tabIndex, role="button", and keyboard event handlers (onKeyPress)
      >
        Add Task
      </div>
    </div>
  );
}
