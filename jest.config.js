module.exports = {
  preset: 'react-native',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)',
  ],
  // setupFiles: ['./jestSetup.js'],
};
