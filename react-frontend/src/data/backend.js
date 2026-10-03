export const backendCommands = [
  {
    id: "express",
    name: "Express",
    category: "Backend",
    technology: "Node.js",
    description: "Fast, unopinionated, minimalist web framework for Node.js.",
    link: "https://expressjs.com/",
    type: "install",
    commands: [
      "npm install express"
    ],
    tags: ["express", "node", "server", "backend", "api", "routing"]
  },
  {
    id: "cors",
    name: "CORS Middleware",
    category: "Backend",
    technology: "Node.js / Express",
    description: "Node.js package for providing Connect/Express middleware to enable CORS.",
    link: "https://www.npmjs.com/package/cors",
    type: "install",
    commands: [
      "npm install cors"
    ],
    tags: ["cors", "cross-origin", "express", "security", "middleware"]
  },
  {
    id: "dotenv",
    name: "dotenv",
    category: "Backend",
    technology: "Node.js",
    description: "Loads environment variables from a .env file into process.env.",
    link: "https://www.npmjs.com/package/dotenv",
    type: "install",
    commands: [
      "npm install dotenv"
    ],
    tags: ["dotenv", "env", "configuration", "environment", "secrets"]
  },
  {
    id: "helmet",
    name: "Helmet",
    category: "Backend",
    technology: "Node.js / Express",
    description: "Help secure Express apps by setting various HTTP response headers.",
    link: "https://helmetjs.github.io/",
    type: "install",
    commands: [
      "npm install helmet"
    ],
    tags: ["helmet", "security", "headers", "express", "middleware"]
  },
  {
    id: "morgan",
    name: "Morgan",
    category: "Backend",
    technology: "Node.js / Express",
    description: "HTTP request logger middleware for Node.js debugging and monitoring.",
    link: "https://www.npmjs.com/package/morgan",
    type: "install",
    commands: [
      "npm install morgan"
    ],
    tags: ["morgan", "logging", "http", "debug", "middleware"]
  },
  {
    id: "compression",
    name: "Compression",
    category: "Backend",
    technology: "Node.js / Express",
    description: "Node.js compression middleware to deflate and gzip response bodies.",
    link: "https://www.npmjs.com/package/compression",
    type: "install",
    commands: [
      "npm install compression"
    ],
    tags: ["compression", "gzip", "performance", "express", "middleware"]
  },
  {
    id: "nodemon",
    name: "Nodemon",
    category: "Backend",
    technology: "Node.js / DevTool",
    description: "Automatically restart node application when file changes in the directory are detected.",
    link: "https://nodemon.io/",
    type: "development",
    commands: [
      "npm install -D nodemon"
    ],
    tags: ["nodemon", "dev", "reload", "live", "watch", "server"]
  },
  {
    id: "express-rate-limit",
    name: "Express Rate Limit",
    category: "Backend",
    technology: "Node.js / Express",
    description: "Basic rate-limiting middleware for Express to prevent brute-force attacks.",
    link: "https://www.npmjs.com/package/express-rate-limit",
    type: "install",
    commands: [
      "npm install express-rate-limit"
    ],
    tags: ["rate-limit", "security", "ddos", "throttling", "express"]
  }
];

export default backendCommands;
