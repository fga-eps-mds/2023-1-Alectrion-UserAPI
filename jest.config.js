module.exports = {
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/*.{js,ts}',
    '!<rootDir>/src/db/**/*.{js,ts}',
    '!<rootDir>/src/presentation/protocols/*.{js,ts}',
    '!<rootDir>/src/factories/**/*.{js,ts}',
    '!<rootDir>/src/repository/userRepository.ts'
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  roots: ['<rootDir>/src/'],
  testEnvironment: 'node',

  transform: {
    '.+\\.ts': 'ts-jest'
  }
}
