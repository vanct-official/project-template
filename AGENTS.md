# AGENTS.md

This repository uses a single, authoritative standards system for AI-assisted coding. The canonical references are:

- [docs/development-standards](./docs/development-standards)
- [readme/README.md](./readme/README.md)
- [readme/01-naming-conventions-and-syntax-standards.md](./readme/01-naming-conventions-and-syntax-standards.md)

The detailed engineering standards in `docs/development-standards/` are the main source of truth. This file is the repository-level instruction entry point for assistants that honor `AGENTS.md`.

## 1. Authority and Priority Model

The following priority order applies when instructions conflict:

1. System, platform, and safety requirements from the AI environment.
2. Explicit user requirements and task-specific constraints.
3. Repository-level and directory-level instructions.
4. Detailed development standards in this repository.
5. General coding preferences.

Within repository instructions, more specific directory or feature rules override broader rules only when they remain compatible with security, correctness, and explicit user constraints.

## 2. Required Standards Before a Change

Before editing code, an assistant must:

- Inspect the relevant source files, project layout, dependencies, and existing implementation.
- Understand the current architecture and project conventions.
- Identify the root cause before applying a fix.
- Read the applicable rules in the standards set, especially the sections relevant to the task.
- Ask for clarification if a missing requirement materially affects correctness, security, or user intent.

## 3. Universal Rules

### A. Understand Before Changing

- Inspect relevant files and dependencies before editing.
- Do not assume APIs, schemas, environment variables, or infrastructure details without evidence.
- Preserve valid existing conventions and project-specific patterns.
- Verify the root cause rather than patching symptoms.

### B. Follow Engineering Principles

Apply the relevant standards for:

- Naming Convention
- Clean Code
- SOLID
- DRY, KISS, and YAGNI
- Separation of Concerns
- Appropriate design patterns
- Modular architecture
- Explicit error handling
- Maintainability and readability

Do not apply principles mechanically when doing so would create unnecessary complexity.

### C. Protect Existing Functionality

- Prefer minimal, focused changes.
- Preserve public interfaces and backward compatibility unless a change is explicitly required.
- Avoid unrelated refactoring and unnecessary dependencies.
- Do not replace working implementations without a justified reason.
- Never remove functionality merely to simplify code.
- Do not modify unrelated files.

### D. Enforce Security and Data Integrity

- Never hardcode credentials, API keys, tokens, or passwords.
- Validate and sanitize untrusted input at the appropriate boundaries.
- Apply authentication, authorization, and least-privilege principles.
- Use parameterized database queries.
- Avoid exposing secrets or sensitive data in logs and error responses.
- Protect against common vulnerabilities relevant to the stack.
- Use safe database migrations and preserve data integrity.
- Do not run destructive commands or irreversible operations without explicit authorization.

### E. Require Testing and Verification

- Add or update tests when behavior changes.
- Run the relevant tests, linting, formatting, type checks, or builds when available and appropriate.
- Verify actual results rather than assuming success.
- Report failures and environmental limitations honestly.
- Do not weaken or remove tests to make checks pass.

### F. Respect Project-Specific Context

- Follow the repository's existing language, framework, package manager, architecture, and conventions.
- Read the relevant standards before making changes.
- Do not impose an unnecessary framework, library, or architecture.
- If a project-specific rule conflicts with a general standard, follow the documented project rule unless it creates a security or correctness issue.
- Explain significant deviations from the standards.

## 4. Required AI Workflow

For all but very small tasks, the workflow is:

1. Inspect the repository and define the task scope.
2. Read the applicable instructions and standards.
3. Analyze the current implementation and dependencies.
4. Propose a concise plan for complex or high-impact changes.
5. Implement the smallest correct solution.
6. Add or update tests as appropriate.
7. Run the relevant verification commands.
8. Review the diff for regressions, security issues, unrelated changes, and standards violations.
9. Report the changes, verification results, unresolved issues, and any deviations.

For simple tasks, keep the workflow lightweight and avoid unnecessary planning overhead.

## 5. Canonical Standards Documents

The detailed standards that define this repository's engineering expectations are:

- [docs/development-standards/01-naming-convention.md](./docs/development-standards/01-naming-convention.md)
- [docs/development-standards/02-clean-code-and-design-principles.md](./docs/development-standards/02-clean-code-and-design-principles.md)
- [docs/development-standards/03-architecture-and-design-patterns.md](./docs/development-standards/03-architecture-and-design-patterns.md)
- [docs/development-standards/04-security-and-data-integrity.md](./docs/development-standards/04-security-and-data-integrity.md)
- [docs/development-standards/05-testing-and-quality-assurance.md](./docs/development-standards/05-testing-and-quality-assurance.md)
- [docs/development-standards/06-git-workflow-and-team-collaboration.md](./docs/development-standards/06-git-workflow-and-team-collaboration.md)
- [docs/development-standards/07-api-design-and-database-principles.md](./docs/development-standards/07-api-design-and-database-principles.md)
- [docs/development-standards/08-performance-accessibility-and-operations.md](./docs/development-standards/08-performance-accessibility-and-operations.md)

The naming standard already exists in the repository at [readme/01-naming-conventions-and-syntax-standards.md](./readme/01-naming-conventions-and-syntax-standards.md); the compatibility entry above preserves that canonical location while keeping the numbered standards set consistent.

## 6. Repository-Specific Notes

- This codebase contains multiple runtime stacks: React frontend, Express backend, and Spring Boot backend.
- The project already has established documentation under [README.md](./README.md), [readme/README.md](./readme/README.md), and the standards directory.
- Reuse valid existing patterns and avoid creating redundant or contradictory guidance.
- When a standard is missing or unclear, document the gap and prefer the least invasive, most correct interpretation.

## 7. Final Rule

Any AI assistant working in this repository must treat the repository standards as authoritative and must inspect the relevant rules before making code changes.
