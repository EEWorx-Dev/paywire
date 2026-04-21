// jest.config.js
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.ts'],

  moduleFileExtensions: ['ts', 'js'],

  // Important for ESM + node20
  extensionsToTreatAsEsm: ['.ts'],

  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
        useESM: true,
      },
    ],
  },

  // Helps Jest resolve imports correctly
  moduleNameMapper: {
    '^paywire$': '<rootDir>/src',
    '^paywire/(.*)$': '<rootDir>/src/$1',
  },
};
