const defaultConfig = require('../../jest.config');

module.exports = {
  ...defaultConfig,
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
