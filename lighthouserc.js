module.exports = {
  ci: {
    collect: {
      // Command to build your static site, if applicable (e.g., for Vite/Next.js)
      // If your site is already built and served by Playwright's webServer,
      // you might use a URL instead of staticDistDir.
      // staticDistDir: './dist', // Vite's default output directory
      // For dynamic apps or if Playwright's webServer is preferred for consistency:
      url: ['http://localhost:5173'], // Use the same URL as Playwright tests
      startServerCommand: 'npm run dev', // Use the same command as Playwright
      startServerReadyPattern: 'ready in', // Or a pattern that indicates your dev server is ready
      numberOfRuns: 3, // Run Lighthouse 3 times and use the median
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }], // Stricter on accessibility
        'categories:best-practices': ['warn', { minScore: 0.8 }],
        'categories:seo': ['warn', { minScore: 0.8 }],
        // You can also assert on specific audits, e.g.:
        // 'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        // 'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
      },
    },
    upload: {
      target: 'temporary-public-storage', // Uploads report to a temporary public storage, link provided in console
    },
    server: {
      // server-specific options if you were self-hosting an LHCI server
    },
    wizard: {
      // wizard-specific options
    },
  },
};
