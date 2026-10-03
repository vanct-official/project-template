export const devopsCommands = [
  {
    id: "docker-version",
    name: "Docker Version",
    category: "DevOps",
    technology: "Docker",
    description: "Display the Docker CLI and engine version details.",
    link: "https://docs.docker.com/engine/reference/commandline/version/",
    type: "docker",
    commands: [
      "docker --version"
    ],
    tags: ["docker", "devops", "version", "containers"]
  },
  {
    id: "docker-compose-up",
    name: "Docker Compose Up",
    category: "DevOps",
    technology: "Docker Compose",
    description: "Builds, (re)creates, starts, and attaches to containers for a service in detached background mode.",
    link: "https://docs.docker.com/compose/reference/up/",
    type: "docker",
    commands: [
      "docker compose up -d"
    ],
    tags: ["docker", "docker-compose", "containers", "deployment", "up", "start"]
  },
  {
    id: "docker-compose-down",
    name: "Docker Compose Down",
    category: "DevOps",
    technology: "Docker Compose",
    description: "Stops containers and removes containers, networks, volumes, and networks created by up.",
    link: "https://docs.docker.com/compose/reference/down/",
    type: "docker",
    commands: [
      "docker compose down"
    ],
    tags: ["docker", "docker-compose", "containers", "stop", "cleanup", "down"]
  },
  {
    id: "git-status",
    name: "Git Status",
    category: "DevOps",
    technology: "Git",
    description: "Show the working tree status, staged and unstaged modified files.",
    link: "https://git-scm.com/docs/git-status",
    type: "git",
    commands: [
      "git status"
    ],
    tags: ["git", "vcs", "status", "working-tree"]
  },
  {
    id: "git-add",
    name: "Git Add All",
    category: "DevOps",
    technology: "Git",
    description: "Stage all modified and new files in the working directory for commit.",
    link: "https://git-scm.com/docs/git-add",
    type: "git",
    commands: [
      "git add ."
    ],
    tags: ["git", "stage", "commit", "vcs"]
  },
  {
    id: "git-commit",
    name: "Git Commit",
    category: "DevOps",
    technology: "Git",
    description: "Record changes to the repository with a meaningful commit message.",
    link: "https://git-scm.com/docs/git-commit",
    type: "git",
    commands: [
      'git commit -m "Initial commit"'
    ],
    tags: ["git", "commit", "save", "vcs", "history"]
  },
  {
    id: "git-push",
    name: "Git Push",
    category: "DevOps",
    technology: "Git",
    description: "Update remote refs along with associated objects to the upstream repository.",
    link: "https://git-scm.com/docs/git-push",
    type: "git",
    commands: [
      "git push"
    ],
    tags: ["git", "push", "remote", "vcs", "sync"]
  },
  {
    id: "npm-install",
    name: "npm Install",
    category: "DevOps",
    technology: "npm / Node.js",
    description: "Install all dependencies listed in package.json into node_modules.",
    link: "https://docs.npmjs.com/cli/commands/npm-install",
    type: "install",
    commands: [
      "npm install"
    ],
    tags: ["npm", "install", "dependencies", "node_modules"]
  },
  {
    id: "npm-update",
    name: "npm Update",
    category: "DevOps",
    technology: "npm / Node.js",
    description: "Update all packages in package.json according to semver constraints.",
    link: "https://docs.npmjs.com/cli/commands/npm-update",
    type: "development",
    commands: [
      "npm update"
    ],
    tags: ["npm", "update", "upgrade", "packages"]
  },
  {
    id: "npm-outdated",
    name: "npm Outdated",
    category: "DevOps",
    technology: "npm / Node.js",
    description: "Check the registry to see if any installed packages are currently outdated.",
    link: "https://docs.npmjs.com/cli/commands/npm-outdated",
    type: "development",
    commands: [
      "npm outdated"
    ],
    tags: ["npm", "outdated", "check", "audit", "dependencies"]
  }
];

export default devopsCommands;
