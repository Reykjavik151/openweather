module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/packages/app/features/weather/__tests__/setup.ts'],
  testMatch: [
    '<rootDir>/packages/app/**/__tests__/**/*.(test|spec).(ts|tsx|js|jsx)',
    '<rootDir>/packages/app/**/*.(test|spec).(ts|tsx|js|jsx)',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-.*|@react-navigation|@reduxjs|redux-persist|apisauce|expo-.*|@expo|expo)/)',
  ],
  moduleNameMapper: {
    '^#types/(.*)$': '<rootDir>/packages/app/types/$1',
    '^#hooks$': '<rootDir>/packages/app/hooks',
    '^#hooks/(.*)$': '<rootDir>/packages/app/hooks/$1',
    '^#state/(.*)$': '<rootDir>/packages/app/state/$1',
    '^#services/(.*)$': '<rootDir>/packages/app/services/$1',
    '^#features/(.*)$': '<rootDir>/packages/app/features/$1',
    '^#design/(.*)$': '<rootDir>/packages/app/design/$1',
  },
  collectCoverageFrom: [
    'packages/app/**/*.{ts,tsx}',
    '!packages/app/**/*.d.ts',
    '!packages/app/**/__tests__/**',
    '!packages/app/**/node_modules/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  verbose: true,
  // Clear mocks between tests
  clearMocks: true,
  restoreMocks: true,
};
