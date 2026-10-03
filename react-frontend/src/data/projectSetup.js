export const projectSetupCommands = [
  {
    id: "vite-react",
    name: "Vite React",
    category: "Project Setup",
    technology: "Vite / React",
    description: "Scaffold a high-performance modern React application using Vite.",
    link: "https://vite.dev/guide/",
    type: "create",
    commands: [
      "npm create vite@latest frontend -- --template react"
    ],
    tags: ["vite", "react", "scaffold", "setup", "frontend", "template"]
  },
  {
    id: "node-express-setup",
    name: "Node / Express Project Setup",
    category: "Project Setup",
    technology: "Node.js / Express",
    description: "Create a backend directory, initialize package.json, and install Express.",
    link: "https://expressjs.com/en/starter/installing.html",
    type: "create",
    commands: [
      "mkdir backend",
      "cd backend",
      "npm init -y",
      "npm install express"
    ],
    tags: ["node", "express", "backend", "setup", "init", "npm"]
  },
  {
    id: "git-init",
    name: "Git Repository Init",
    category: "Project Setup",
    technology: "Git",
    description: "Initialize a new Git repository in the current project directory.",
    link: "https://git-scm.com/docs/git-init",
    type: "git",
    commands: [
      "git init"
    ],
    tags: ["git", "vcs", "setup", "init", "repository"]
  }
];

export default projectSetupCommands;
