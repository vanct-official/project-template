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
  },
  
  {
    id: "dotnet-sdk",
    name: ".NET SDK",
    category: "Backend",
    technology: ".NET / C#",
    description: "Install and verify the .NET SDK used to create, build, and run ASP.NET Core applications.",
    link: "https://dotnet.microsoft.com/download",
    type: "install",
    commands: [
      "dotnet --info",
      "dotnet --list-sdks",
      "dotnet --list-runtimes"
    ],
    tags: ["dotnet", "sdk", "csharp", "aspnet", "install", "runtime"]
  },
  {
    id: "aspnet-webapi-setup",
    name: "ASP.NET Core Web API",
    category: "Backend",
    technology: "C# / ASP.NET Core",
    description: "Create an ASP.NET Core Web API project using controller-based routing.",
    link: "https://learn.microsoft.com/aspnet/core/web-api/",
    type: "create",
    commands: [
      "dotnet new webapi --use-controllers -n AspNetBackend",
      "cd AspNetBackend",
      "dotnet restore",
      "dotnet run"
    ],
    tags: ["aspnet", "aspnetcore", "dotnet", "csharp", "webapi", "rest", "controllers", "create"]
  },
  {
    id: "aspnet-build",
    name: "ASP.NET Core Build",
    category: "Backend",
    technology: ".NET CLI",
    description: "Compile an ASP.NET Core project and check for build errors.",
    link: "https://learn.microsoft.com/dotnet/core/tools/dotnet-build",
    type: "build",
    commands: [
      "dotnet build",
      "dotnet build --configuration Release"
    ],
    tags: ["dotnet", "build", "compile", "release", "aspnet"]
  },
  {
    id: "aspnet-watch",
    name: "ASP.NET Core Development",
    category: "Backend",
    technology: ".NET CLI",
    description: "Run the application with development-time file watching.",
    link: "https://learn.microsoft.com/dotnet/core/tools/dotnet-watch",
    type: "development",
    commands: [
      "dotnet watch run"
    ],
    tags: ["dotnet", "watch", "development", "hot reload", "aspnet"]
  },
  {
    id: "aspnet-ef-sqlserver",
    name: "Entity Framework Core SQL Server",
    category: "Backend",
    technology: "C# / EF Core / SQL Server",
    description: "Add Entity Framework Core packages for SQL Server database access.",
    link: "https://learn.microsoft.com/ef/core/providers/sql-server/",
    type: "install",
    commands: [
      "dotnet add package Microsoft.EntityFrameworkCore.SqlServer",
      "dotnet add package Microsoft.EntityFrameworkCore.Design"
    ],
    tags: ["dotnet", "efcore", "entity framework", "sql server", "database", "orm", "migration"]
  }

];

export default backendCommands;
