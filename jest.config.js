export default {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleFileExtensions: ["ts", "js", "json"],
    roots: ["<rootDir>/tests"],
    transform: {
      "^.+\\.ts$": "ts-jest",
    },
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1",
    },
  };
  