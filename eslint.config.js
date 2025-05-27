import globals from 'globals';
import js from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';

// Workaround for the faulty global key from the 'globals' package
const browserGlobalsSource = globals.browser;
const customCleanedBrowserGlobals = { ...browserGlobalsSource };
const problematicGlobalKey = 'AudioWorkletGlobalScope '; // Note the trailing space
if (
  Object.prototype.hasOwnProperty.call(
    customCleanedBrowserGlobals,
    problematicGlobalKey
  )
) {
  const value = customCleanedBrowserGlobals[problematicGlobalKey];
  delete customCleanedBrowserGlobals[problematicGlobalKey];
  customCleanedBrowserGlobals['AudioWorkletGlobalScope'] = value; // Add it back with the correct key
}

export default [
  {
    ignores: [
      '**/node_modules/',
      'dist/',
      '.DS_Store',
      'eslint.config.js',
      'vite.config.js', // Often good to ignore build tool configs unless specifically linting them
    ],
  },

  // Base configuration applied to all linted files
  {
    languageOptions: {
      ecmaVersion: 'latest', // Use the latest ECMAScript version
      globals: {
        // Define global variables available in all environments
        ...globals.node, // For Node.js environment (server, scripts)
        ...customCleanedBrowserGlobals, // Use cleaned browser globals
      },
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version for eslint-plugin-react
      },
    },
  },

  // ESLint's recommended base rules
  js.configs.recommended,

  // Configuration for Client-side React/JSX files (ES Modules)
  {
    files: ['client/**/*.{js,jsx}'],
    plugins: {
      react: pluginReact,
      'jsx-a11y': pluginJsxA11y,
    },
    languageOptions: {
      sourceType: 'module', // Explicitly ES modules for client
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
      },
      globals: {
        ...customCleanedBrowserGlobals, // Use cleaned browser globals
      },
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginJsxA11y.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // Not needed with new JSX transform
      // Add any client-specific rule overrides here
    },
  },

  // Configuration for Server-side JavaScript files (CommonJS)
  {
    files: ['server/**/*.js'],
    languageOptions: {
      sourceType: 'commonjs', // Explicitly CommonJS for server files using require()
      globals: {
        ...globals.node, // Server-specific globals (Node.js)
      },
    },
    // Add any server-specific ESLint rules here if necessary
    // e.g., rules related to Node.js patterns
  },

  // Configuration for scripts (assuming CommonJS or simple JS, adjust if they are ESM)
  {
    files: ['scripts/**/*.js'],
    languageOptions: {
      sourceType: 'commonjs', // Or "module" if your scripts are ES Modules
      globals: {
        ...globals.node, // Scripts usually run in Node.js environment
      },
    },
    // Add any script-specific ESLint rules here
  },
];
