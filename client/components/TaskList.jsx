import React from 'react';

// Intentionally inaccessible TaskList component
export default function TaskList({ tasks, onRemoveTask }) {
  if (tasks?.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '20px',
          color: '#888', // Still low contrast, as per original intent for inaccessibility
          backgroundColor: '#fdfdfd',
          borderRadius: '4px',
          border: '1px dashed #eee',
        }}
      >
        No tasks yet. Add one!
      </div>
    );
  }

  return (
    // Using div instead of ul for a list - bad for semantics and screen readers
    <div style={{ marginTop: '30px' }}>
      {tasks.map((task) => (
        // Using div instead of li for list items
        <div
          key={task.id}
          style={{
            padding: '15px',
            border: '1px solid #e0e0e0', // Slightly softer border
            marginBottom: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#fff', // White background for tasks
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          }}
        >
          <span style={{ color: '#555', fontSize: '1.1em' }}>{task.title}</span>{' '}
          {/* Low contrast text */}
          {/* Using a div as a button, not keyboard accessible, no role */}
          <div
            onClick={() => onRemoveTask?.(task.id)}
            style={{
              color: '#fff',
              backgroundColor: '#dc3545', // Bootstrap danger red
              cursor: 'pointer',
              padding: '6px 12px',
              border: 'none',
              borderRadius: '4px',
              fontSize: '0.9em',
              fontWeight: 'bold',
            }}
            // Missing tabIndex, role="button", and keyboard event handlers (onKeyPress)
          >
            Remove{' '}
            {/* Using text instead of an icon, but the element itself is inaccessible */}
          </div>
        </div>
      ))}
    </div>
  );
}
