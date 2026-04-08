import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
    '^@/services/api$': '<rootDir>/src/services/__mocks__/api.ts',
    // Add this line to mock the direct import path
    '^src/services/api$': '<rootDir>/src/services/__mocks__/api.ts',
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.app.json',
      compilerOptions: {
        esModuleInterop: true,
      },
    }],
  },
};

export default config;
