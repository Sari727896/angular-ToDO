module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    globalSetup: 'jest-preset-angular/global-setup',
    moduleNameMapper: {
      '@app/(.*)': '<rootDir>/src/app/$1',
      '@features/(.*)': '<rootDir>/src/app/features/$1'
    }
  }