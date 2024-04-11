module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: [
    '<rootDir>/src/gecko_generated/tests/jest.setup.js',
  ],
  testMatch: [
    '<rootDir>/src/gecko_generated/tests/**/*.test.js',
  ],
}
