export const databaseCommands = [
  {
    id: "mysql2",
    name: "MySQL2",
    category: "Database",
    technology: "MySQL / Node.js",
    description: "Fast MySQL driver for Node.js with prepared statements and promise support.",
    link: "https://sidorares.github.io/node-mysql2/docs",
    type: "install",
    commands: [
      "npm install mysql2"
    ],
    tags: ["mysql", "mysql2", "sql", "database", "rdbms"]
  },
  {
    id: "mongoose",
    name: "MongoDB / Mongoose",
    category: "Database",
    technology: "MongoDB / Node.js",
    description: "Elegant MongoDB object modeling (ODM) for Node.js applications.",
    link: "https://mongoosejs.com/",
    type: "install",
    commands: [
      "npm install mongoose"
    ],
    tags: ["mongodb", "mongoose", "nosql", "odm", "database"]
  },
  {
    id: "postgres-pg",
    name: "PostgreSQL (pg)",
    category: "Database",
    technology: "PostgreSQL / Node.js",
    description: "Non-blocking PostgreSQL client for Node.js with pure JavaScript and native libpq bindings.",
    link: "https://node-postgres.com/",
    type: "install",
    commands: [
      "npm install pg"
    ],
    tags: ["postgres", "postgresql", "pg", "sql", "rdbms", "database"]
  },
  {
    id: "prisma",
    name: "Prisma ORM",
    category: "Database",
    technology: "Prisma / TypeScript / JS",
    description: "Next-generation ORM for Node.js and TypeScript supporting PostgreSQL, MySQL, SQLite, and SQL Server.",
    link: "https://www.prisma.io/docs",
    type: "install",
    commands: [
      "npm install prisma @prisma/client"
    ],
    tags: ["prisma", "orm", "database", "schema", "migrations"]
  },
  {
    id: "prisma-init",
    name: "Prisma Init",
    category: "Database",
    technology: "Prisma CLI",
    description: "Set up Prisma in your project by creating schema files and configuring connection.",
    link: "https://www.prisma.io/docs/getting-started/quickstart",
    type: "database",
    commands: [
      "npx prisma init"
    ],
    tags: ["prisma", "init", "cli", "schema", "setup"]
  }
];

export default databaseCommands;
