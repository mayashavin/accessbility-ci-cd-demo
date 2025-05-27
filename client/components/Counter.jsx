import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  return (
    <div
      style={{
        padding: '20px',
        textAlign: 'center',
        border: '1px solid #ddd',
        borderRadius: '8px',
        marginTop: '20px',
      }}
    >
      <h2>Counter Component</h2>
      <p style={{ fontSize: '2em', margin: '20px 0' }}>Count: {count}</p>
      <button
        onClick={decrement}
        style={{
          padding: '10px 20px',
          fontSize: '1em',
          marginRight: '10px',
          cursor: 'pointer',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        Decrement
      </button>
      <button
        onClick={increment}
        style={{
          padding: '10px 20px',
          fontSize: '1em',
          cursor: 'pointer',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        Increment
      </button>
    </div>
  );
}
