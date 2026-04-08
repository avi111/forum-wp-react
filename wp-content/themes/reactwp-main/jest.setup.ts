import '@testing-library/jest-dom';

// Mock import.meta.env for Jest
Object.defineProperty(global, 'import', {
  value: {
    meta: {
      env: {
        STORYBOOK: 'false', // Default to false for tests
        // Add any other import.meta.env variables your app uses with default test values
      },
    },
  },
  writable: true,
});
