# VanCT Developer Toolkit

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

- **Framework**: [React 19](https://react.dev/)
- **Bundler & Dev Server**: [Vite](https://vite.dev/)
- **Language**: JavaScript (ESModules)
- **Routing**: [React Router](https://reactrouter.com/)
- **Styling**: [Bootstrap 5.3.3](https://getbootstrap.com/) & Vanilla CSS custom design system
- **Icons**: [Bootstrap Icons](https://icons.getbootstrap.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Code Quality**: ESLint

---

## Installation

1. Navigate to the frontend directory:
   ```bash
   cd react-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure `.env` is configured (or copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

---

## Development

Run the Vite development server locally at `http://localhost:5173`:

```bash
npm run dev
```

---

## Build

Compile and bundle for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run ESLint verification:

```bash
npm run lint
```

---

## Deploy with Docker (Ubuntu Server)

Ứng dụng hỗ trợ đóng gói và triển khai nhanh qua Docker & Docker Compose trên server Ubuntu:

### 1. Triển khai toàn bộ Stack (Frontend + Express Backend + Spring Boot Backend)
Tại thư mục `project-template/`:
```bash
# Build và chạy ngầm (detached)
docker compose up -d --build

# Xem logs của toàn bộ service
docker compose logs -f

# Dừng toàn bộ containers
docker compose down
```

### 2. Build riêng lẻ từng dịch vụ
- **Express Backend (Node.js)**:
  ```bash
  cd express-backend
  docker build -t my-backend:latest .
  docker run -d -p 5000:5000 --name my-backend my-backend:latest
  ```

- **Spring Boot Backend (Java 17)**:
  ```bash
  cd spring-backend
  docker build -t my-spring-backend:latest .
  docker run -d -p 8080:8080 --name my-spring-backend my-spring-backend:latest
  ```

- **React Frontend**:
  ```bash
  cd react-frontend
  docker build -t my-frontend:latest .
  docker run -d -p 80:80 --name my-frontend my-frontend:latest
  ```

---

## Project Structure

```text
src/
├── components/
│   ├── CategoryTabs.jsx   # Category navigation pills with command counters & favorite toggle
│   ├── CommandCard.jsx    # Card UI with monospace code, badges, individual & copy-all actions
│   ├── CommandList.jsx    # Filterable list and responsive grid layout
│   ├── CopyButton.jsx     # Reusable copy button with 1.8s feedback transition
│   ├── EmptyState.jsx     # Graceful fallback state with query highlights & reset action
│   ├── Navbar.jsx         # Sticky header with branding, routing, and theme switch
│   ├── SearchBar.jsx      # High-visibility search bar with '/' keyboard shortcut
│   └── Toast.jsx          # Non-intrusive bottom notification alert
│
├── data/
│   ├── authentication.js  # JWT, bcryptjs, Google OAuth
│   ├── backend.js         # Express, cors, dotenv, helmet, morgan, compression, nodemon, etc.
│   ├── databases.js       # MySQL2, Mongoose, PostgreSQL, Prisma ORM, Prisma CLI
│   ├── devops.js          # Docker, Docker Compose, Git commands, npm lifecycle
│   ├── frontend.js        # React Router, Axios, Zustand, React Toastify, date-fns, react-icons
│   ├── index.js           # Central aggregator, categories registry, badge styling map
│   ├── projectSetup.js    # Vite React scaffolding, Node/Express setup, Git initialization
│   ├── testing.js         # Jest, Supertest, Vitest
│   ├── uiFrameworks.js    # Bootstrap 5, React Bootstrap, Ant Design, Material UI, Tailwind ref
│   └── utilities.js       # qrcode, slugify, uuid, lodash
│
├── pages/
│   └── Home.jsx           # Main toolkit view with category, search, and type filtering
│
├── routes/
│   └── AppRoutes.jsx      # React Router route definitions (/ and /commands)
│
├── utils/
│   ├── clipboard.js       # Browser Clipboard API wrapper with fallback
│   └── commandFilter.js   # Multi-attribute search and filtering engine
│
├── App.jsx                # Root container with theme management and layout
├── index.css              # Typography tokens, monospace styles, and theme variables
└── main.jsx               # Application entry point
```

---

## Adding a New Command

To add a new command, open the corresponding file in `src/data/` (or create a new domain file) and add an object adhering to this schema:

```javascript
{
  id: "react-query",
  name: "TanStack Query (React Query)",
  category: "Frontend",
  technology: "React",
  description: "Powerful asynchronous state management for server-state.",
  link: "https://tanstack.com/query/latest",
  type: "install", // "create" | "install" | "development" | "build" | "database" | "docker" | "git" | "other"
  commands: [
    "npm install @tanstack/react-query"
  ],
  tags: [
    "react",
    "query",
    "async",
    "cache",
    "server-state"
  ]
}
```

The new command will automatically appear in the dashboard, respond to search queries, and support one-click copying.

---

## Adding a New Category

1. Open `src/data/index.js`.
2. Add your new category string to the `CATEGORIES` array:
   ```javascript
   export const CATEGORIES = [
     'All',
     'Project Setup',
     // ...
     'Cloud & Serverless' // Your new category
   ];
   ```
3. Create a corresponding data file (e.g., `src/data/cloud.js`), export your array, and include it in `allCommands` inside `src/data/index.js`.
