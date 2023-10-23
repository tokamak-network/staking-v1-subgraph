module.exports = {
  roots: ["<rootDir>/jest-test"], // Specify the root directory for your tests
  testEnvironment: "node", // Use the Node.js environment
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Use ts-jest for TypeScript files
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$", // Test file naming pattern
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"], // File extensions for modules
  setupFiles: ["dotenv/config"],
};
