# VanCT Developer Toolkit (React Frontend)

> Commands, packages, and project setup references for developers.

A personal developer reference and dashboard designed to store, search, categorize, view, and copy commonly used commands for scaffolding and configuring frontend, backend, database, and DevOps workflows.

---

## Features

- **Fast Instant Search**: Real-time filtering across command names, package names, descriptions, categories, technologies, and tags.
- **Categorized Dashboard**: 10 well-defined categories spanning Project Setup, Frontend, UI Frameworks, Backend, Database, Authentication, Testing, Utilities, and DevOps.
- **Command Type Badging**: Visual status badges for command actions (`CREATE`, `INSTALL`, `DEV`, `BUILD`, `DB`, `DOCKER`, `GIT`, `OTHER`).
- **One-Click Copy & Copy All**: Instant clipboard copying with clear temporary `Copied!` feedback and a non-intrusive floating toast notification.
- **Multi-Command Support**: Execute multi-step setup sequences with individual copy buttons and a composite `Copy All` button.
- **Local Favorites**: Star frequently used commands with persistent storage in browser `localStorage`.
- **Light & Dark Mode**: Professional developer theme with persistent theme toggle and automatic system preference detection.
- **High Information Density**: Clean monospace typography, responsive wrapping that prevents horizontal overflow, and minimal visual noise.
- **Zero Backend Required**: Lightweight client-side architecture using structured static datasets.

---

## Tech Stack

- **Framework**: React 19
- **Bundler & Dev Server**: Vite
- **Language**: JavaScript (ESModules)
- **Routing**: React Router
- **Styling**: Bootstrap 5.3.3 & Vanilla CSS custom design system
- **Icons**: Bootstrap Icons
- **HTTP Client**: Axios
- **Code Quality**: ESLint

---

## Installation & Running

```bash
npm install
npm run dev
```

The application runs locally at `http://localhost:5173`.

---

## Build & Quality Checks

```bash
npm run build
npm run lint
```

---

## Adding a New Command

Edit any file in `src/data/`:

```javascript
{
  id: "react-query",
  name: "TanStack Query",
  category: "Frontend",
  technology: "React",
  description: "Powerful asynchronous state management for server-state.",
  link: "https://tanstack.com/query/latest",
  type: "install",
  commands: [
    "npm install @tanstack/react-query"
  ],
  tags: ["react", "query", "async", "cache"]
}
```
