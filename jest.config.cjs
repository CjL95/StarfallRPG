const transform = { '^.+\\.[jt]sx?$': 'babel-jest' }

/** @type {import('jest').Config} */
module.exports = {
  clearMocks: true,
  coverageProvider: 'v8',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/game/**/*.ts',
    'src/ui/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
  ],
  projects: [
    {
      displayName: 'game',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/src/game/**/*.test.ts'],
      transform,
    },
    {
      displayName: 'ui',
      testEnvironment: 'jsdom',
      testMatch: [
        '<rootDir>/src/ui/**/*.test.{ts,tsx}',
        '<rootDir>/src/adapters/**/*.test.{ts,tsx}',
      ],
      transform,
      setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
      moduleNameMapper: { '\\.css$': '<rootDir>/tests/style-mock.cjs' },
    },
  ],
}
