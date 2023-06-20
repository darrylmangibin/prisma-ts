/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  verbose: true,
  forceExit: true,
  moduleNameMapper: {
    "@main/(.*)": "<rootDir>/src/main/$1",
    "@resources/(.*)": "<rootDir>/src/resources/$1",
    "@utils/(.*)": "<rootDir>/src/utils/$1",
    "@middleware/(.*)": "<rootDir>/src/middleware/$1",
  },
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  setupFilesAfterEnv: ["./src/testSetup.ts"],
  detectOpenHandles: true
};