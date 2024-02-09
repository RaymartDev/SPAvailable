/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testMatch: [
    '**/*.test.(js|jsx|ts|tsx)',  // Matches files with .test.js, .test.jsx, .test.ts, .test.tsx in any directory
    '**/?(*.)+(spec|test).(js|jsx|ts|tsx)',  // Matches files with .spec.js, .test.js, .spec.ts, .test.ts in any directory
  ],
};