export const testingCommands = [
  {
    id: "jest",
    name: "Jest",
    category: "Testing",
    technology: "JavaScript / Node.js",
    description: "Delightful JavaScript Testing Framework with a focus on simplicity and zero configuration.",
    link: "https://jestjs.io/",
    type: "development",
    commands: [
      "npm install -D jest"
    ],
    tags: ["jest", "testing", "test", "unit", "tdd", "assertions"]
  },
  {
    id: "supertest",
    name: "Supertest",
    category: "Testing",
    technology: "Node.js / Express",
    description: "High-level HTTP assertions library for testing Node.js and Express API servers.",
    link: "https://www.npmjs.com/package/supertest",
    type: "development",
    commands: [
      "npm install -D supertest"
    ],
    tags: ["supertest", "api-testing", "integration", "http", "express"]
  },
  {
    id: "vitest",
    name: "Vitest",
    category: "Testing",
    technology: "Vite / Modern JS",
    description: "Blazing fast unit test framework powered by Vite, with Jest-compatible API.",
    link: "https://vitest.dev/",
    type: "development",
    commands: [
      "npm install -D vitest"
    ],
    tags: ["vitest", "vite", "unit-test", "fast", "esm", "testing"]
  }
];

export default testingCommands;
