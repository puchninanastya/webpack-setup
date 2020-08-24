// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
const path = require('path');

module.exports = {
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: path.resolve(__dirname, 'coverage'),

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',

  // A set of global variables that need to be available in all test environments
  globals: {
    'APP_ENV': 'dev'
  },

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'jsx', 'json', 'styl'],

  // A map from regular expressions to module names or to arrays of module names
  // that allow to stub out resources with a single module
  moduleNameMapper: {
    '(./style|.css)$': 'identity-obj-proxy',
    '^@shared$': path.resolve(__dirname, 'src', 'shared'),
    '^@constants$': path.resolve(__dirname, 'src', 'constants.js')
  },

  // The root directory that Jest should scan for tests and modules within
  rootDir: './src',

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: [
    '/node_modules/'
  ],

  // Indicates whether each individual test should be reported during the run
  verbose: true
};
