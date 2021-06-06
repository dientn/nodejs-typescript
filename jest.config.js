module.exports = {
  preset: 'ts-jest/presets/js-with-ts',

  // testEnvironment: 'node',
  testEnvironment: 'node',
  setupFiles: [
  ],
  setupFilesAfterEnv: ['./jest.setup.js'],
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  modulePathIgnorePatterns: ['<rootDir>/src/import-undefined-issue'],
  verbose: true,
};
