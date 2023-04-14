export default {
  clearMocks: true,
  coverageProvider: "v8",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],

  roots: ["<rootDir>/src"],

  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },

  moduleNameMapper: {
    "@eslint/eslintrc/universal":
      "@eslint/eslintrc/dist/eslintrc-universal.cjs",
  },
  moduleDirectories: [
    "node_modules", // default module directory
    "./src",
  ],
  testTimeout: 20000,
};
