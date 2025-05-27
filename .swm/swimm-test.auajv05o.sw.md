---
title: Swimm test
---
# Introduction

This document will walk you through the implementation of the "Swimm test" feature, focusing on the accessibility enhancements and design decisions made in the code.

The "Swimm test" aims to improve accessibility and provide a playground for testing various accessibility features.

We will cover:

1. The integration of the Accessibility Playground component.
2. The mechanism for switching between task management and the playground.
3. The accessibility features and issues highlighted in the playground.

# Integration of the Accessibility Playground component

<SwmSnippet path="/client/App.jsx" line="5">

---

The Accessibility Playground component is introduced to test and demonstrate various accessibility features and issues. It is imported and conditionally rendered based on the current view state.

```
import Counter from './components/Counter'; // Import the Counter component

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [currentView, setCurrentView] = useState('tasks'); // 'tasks', 'playground', or 'counter'
```

---

</SwmSnippet>

# Switching between task management and playground

<SwmSnippet path="/client/App.jsx" line="81">

---

The application allows users to switch between task management and the accessibility playground. This is achieved through a navigation bar with buttons that toggle the <SwmToken path="/client/App.jsx" pos="109:1:1" line-data="              currentView === &#39;playground&#39; ? &#39;#007bff&#39; : &#39;#6c757d&#39;,">`currentView`</SwmToken> state.

```
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
```

---

</SwmSnippet>

# Accessibility features and issues in the playground

The Accessibility Playground component contains sections that highlight common accessibility issues and demonstrate best practices. It includes elements like forms, images, links, and interactive components, each showcasing specific accessibility concerns.

## Forms & inputs

<SwmSnippet path="client/components/A11yPlayground.jsx" line="9">

---

This section demonstrates issues such as missing labels and low contrast placeholders, alongside correct implementations.

```
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
```

---

</SwmSnippet>

## Images & links

<SwmSnippet path="client/components/A11yPlayground.jsx" line="51">

---

Here, the importance of alt text for images and descriptive link text is emphasized.

```
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
```

---

</SwmSnippet>

## Content & structure

<SwmSnippet path="client/components/A11yPlayground.jsx" line="79">

---

This section highlights the importance of text contrast and proper heading structure.

```
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
```

---

</SwmSnippet>

## Interactive elements

<SwmSnippet path="client/components/A11yPlayground.jsx" line="119">

---

The focus is on making interactive elements accessible, such as using ARIA roles and ensuring focusability.

```
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
```

---

</SwmSnippet>

## Lists

<SwmSnippet path="client/components/A11yPlayground.jsx" line="149">

---

Proper list structures are demonstrated, contrasting divs used incorrectly with correct list items.

```
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
```

---

</SwmSnippet>

The Accessibility Playground serves as a practical tool for developers to understand and improve accessibility in their applications.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBYWNjZXNzYmlsaXR5LWNpLWNkLWRlbW8lM0ElM0FtYXlhc2hhdmlu" repo-name="accessbility-ci-cd-demo"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
