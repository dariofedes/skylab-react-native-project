module.exports = {
  moduleDirectories: ['src', 'node_modules'],
  preset: 'react-native',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  testPathIgnorePatterns: ['../../node_modules'],
  coveragePathIgnorePatterns: ['../../node_modules'],
  transformIgnorePatterns: [
    '/node_modules/(?!react-native|react-clone-referenced-element|react-navigation)',
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
