// jest.config.cjs
/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: false,
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'cjs', 'ts'],
  transformIgnorePatterns: ['/node_modules/'],
  testPathIgnorePatterns: ['<rootDir>/frontend/node_modules_old/'],
  modulePathIgnorePatterns: ['<rootDir>/frontend/node_modules_old/'],
};
