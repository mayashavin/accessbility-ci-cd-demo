import React from 'react';

// A11yPlayground.jsx - A component with various elements for accessibility testing
export default function A11yPlayground() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Accessibility Playground</h2>

      <section
        style={{
          marginBottom: '30px',
          border: '1px solid #eee',
          padding: '15px',
        }}
      >
        <h3>Forms & Inputs</h3>
        {/* Missing label */}
        <input
          type='text'
          placeholder='Missing label input'
          style={{ marginRight: '10px' }}
        />

        <label htmlFor='nameInput'>Name:</label>
        <input type='text' id='nameInput' style={{ marginRight: '10px' }} />

        {/* Input with a poorly contrasting placeholder */}
        <input
          type='text'
          placeholder='Low contrast placeholder'
          style={{ color: '#aaa', marginRight: '10px' }}
        />

        {/* Div as a button */}
        <div
          onClick={() => alert('Div button clicked!')}
          style={{
            display: 'inline-block',
            padding: '5px 10px',
            backgroundColor: '#ddd',
            cursor: 'pointer',
            marginRight: '10px',
          }}
        >
          Fake Button
        </div>

        <button type='button'>Real Button</button>
      </section>

      <section
        style={{
          marginBottom: '30px',
          border: '1px solid #eee',
          padding: '15px',
        }}
      >
        <h3>Images & Links</h3>
        {/* Image without alt text */}
        <img
          src='/logo.png'
          style={{ width: '50px', height: '50px', marginRight: '10px' }}
        />

        <img
          src='/logo.png'
          alt='Company Logo'
          style={{ width: '50px', height: '50px', marginRight: '10px' }}
        />

        {/* Link with generic text */}
        <a href='#' style={{ marginRight: '10px' }}>
          Click Here
        </a>

        <a href='#' aria-label='Learn more about our services'>
          More Info
        </a>
      </section>

      <section
        style={{
          marginBottom: '30px',
          border: '1px solid #eee',
          padding: '15px',
        }}
      >
        <h3>Content & Structure</h3>
        {/* Low contrast text */}
        <p style={{ color: '#ccc', backgroundColor: '#f0f0f0' }}>
          This text has very low contrast.
        </p>

        <p style={{ color: '#333', backgroundColor: '#fff' }}>
          This text has good contrast.
        </p>

        {/* Skipping heading levels (e.g., h1 to h3) - this h4 is under an h2 */}
        <h4>Sub-subsection (Potentially skipped level)</h4>

        <div>
          <span>Just a span</span>
          <div
            role='button'
            tabIndex='0'
            onClick={() => alert('ARIA button clicked')}
            onKeyPress={() => alert('ARIA button keypress')}
            style={{
              display: 'inline-block',
              padding: '5px 10px',
              border: '1px solid blue',
              cursor: 'pointer',
              marginLeft: '10px',
            }}
          >
            ARIA Button
          </div>
        </div>
      </section>

      <section
        style={{
          marginBottom: '30px',
          border: '1px solid #eee',
          padding: '15px',
        }}
      >
        <h3>Interactive Elements</h3>
        <div
          tabIndex='0'
          style={{
            padding: '5px',
            border: '1px solid green',
            display: 'inline-block',
            marginRight: '10px',
          }}
        >
          Focusable Div
        </div>
        <div
          style={{
            padding: '5px',
            border: '1px solid red',
            display: 'inline-block',
          }}
        >
          Non-Focusable Div
        </div>
      </section>

      <section
        style={{
          marginBottom: '30px',
          border: '1px solid #eee',
          padding: '15px',
        }}
      >
        <h3>Lists</h3>
        {/* Improper list structure */}
        <div>Item 1 (div instead of li)</div>
        <div>Item 2 (div instead of li)</div>

        <ul>
          <li>Correct List Item 1</li>
          <li>Correct List Item 2</li>
        </ul>
      </section>
    </div>
  );
}
