# 08 — Performance, Accessibility & Operations

## 1. Document Purpose
This document establishes comprehensive engineering standards for application performance optimization, web and mobile accessibility (a11y), and operational reliability (DevOps/SRE). It ensures that software systems are rapid, usable by all individuals regardless of ability or device, and operated reliably in production with validated monitoring, resilience, and recovery procedures.

---

## 2. Scope and Applicability
- **Performance**: Client-side rendering, asset delivery, API response budgets, caching tiers, and database query latency.
- **Accessibility**: Web Content Accessibility Guidelines (WCAG 2.1 / 2.2 AA standards) across Web, Mobile (iOS/Android), and desktop interfaces.
- **Operations**: Containerization (Docker), deployment pipelines (CI/CD), environment isolation, observability (logging/metrics/tracing), health probes, and disaster recovery.
- **Audience**: Fullstack engineers, frontend developers, DevOps/SRE specialists, and QA engineers.

---

## 3. Core Principles
- **Validate, Never Assume**: Performance, accessibility, and disaster recovery cannot be asserted by conjecture; they MUST be measured and validated through automated benchmarks, screen readers, and recovery drills.
- **Performance is a Feature**: Latency impacts user conversion, user retention, and infrastructure costs. Enforce performance budgets in development and CI.
- **Universal Inclusion (a11y by Default)**: Accessible digital experiences are an essential human and legal standard, not an optional enhancement. Build with accessibility in mind from wireframe to implementation.
- **Observable by Design**: A service running in production MUST emit structured logs, telemetry metrics, and health probe states to make internal failures immediately visible and diagnosable.
- **Automated, Immutable Deployments**: Infrastructure and container artifacts must be immutable, versioned, and deployed through automated CI/CD pipelines without manual changes on production machines.

---

## 4. Rules and Standards: Performance

### 4.1 Frontend Performance Budgets & Core Web Vitals (MUST)
Web applications SHOULD target the following Google Core Web Vitals thresholds:
- **LCP (Largest Contentful Paint)**: $\le 2.5\text{ seconds}$ (measures perceived loading speed).
- **INP (Interaction to Next Paint)**: $\le 200\text{ milliseconds}$ (measures UI responsiveness).
- **CLS (Cumulative Layout Shift)**: $\le 0.1$ (measures visual stability).

### 4.2 Asset & Bundle Optimization (MUST)
1. **Code Splitting & Dynamic Imports**: Route-level components and heavy third-party libraries (e.g., chart engines, rich-text editors) MUST be lazily loaded via dynamic imports (`React.lazy()`, dynamic `import()`).
2. **Image Delivery**:
   - Serve modern image formats (**WebP**, **AVIF**).
   - Images MUST include explicit `width` and `height` attributes to prevent CLS.
   - Use `loading="lazy"` for below-the-fold images.
3. **Bundle Size Budgets**: Single JavaScript bundles SHOULD NOT exceed $200\text{ KB}$ (gzipped) without explicit justification.

### 4.3 Backend & Database Latency Budgets (MUST)
- Standard OLTP API endpoints SHOULD respond within $200\text{ ms}$ at 95th percentile (P95).
- Background operations or long-running computations exceeding 1 second MUST be offloaded to asynchronous background queues (RabbitMQ, Kafka, BullMQ, Celery).
- Implement tiered caching:
  - In-memory / HTTP Cache-Control for static resources (`max-age=31536000, immutable`).
  - Redis / Memcached for frequently read, infrequently changed domain records with explicit TTLs.

---

## 5. Rules and Standards: Accessibility (a11y)

### 5.1 Semantic HTML & DOM Structure (MUST)
1. **Semantic Elements**: Use proper HTML tags (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`, `<button>`, `<a>`). Never style generic `<div>` or `<span>` tags to act as clickable buttons without accessible roles and keyboard handlers.
2. **Single Primary Heading**: Each web page MUST contain exactly one `<h1>` indicating page purpose, followed by logical heading progression (`<h2>`, `<h3>`).
3. **Text Alternatives**: All `<img>` tags MUST provide meaningful `alt` text describing image context. Decorative images MUST use empty `alt=""` or `aria-hidden="true"`.

### 5.2 Keyboard Navigation & Focus Management (MUST)
1. **Complete Keyboard Reachability**: Every interactive element (buttons, links, inputs, dialogs) MUST be fully operable via keyboard (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`, arrow keys).
2. **Visible Focus Indicators**: Focus outlines (`outline: none`) MUST NEVER be removed unless replaced with an equally visible, custom focus indicator.
3. **Focus Trapping in Modals**: When an accessible modal/dialog opens, keyboard focus MUST be trapped within the dialog until dismissed, and return to the trigger element upon closing.

### 5.3 Color Contrast & Forms (MUST)
- **Contrast Ratios (WCAG AA)**: Normal text MUST achieve a minimum contrast ratio of **4.5:1** against its background; large text ($\ge 18\text{pt}$ or bold $\ge 14\text{pt}$) requires at least **3:1**.
- **Color Independence**: Color MUST NOT be the sole medium for conveying critical status (e.g., pair red error text with an alert icon and explicit text message).
- **Form Labels**: Every `<input>` MUST be programmatically linked to a `<label>` using the `for`/`id` attribute or wrapped within a label element.

---

## 6. Rules and Standards: Operations & SRE

### 6.1 Environment Isolation & Configuration (MUST)
1. **Strict Environment Hierarchy**: Maintain isolated environments:
   - `Development (Local)` $\rightarrow$ `Testing/CI` $\rightarrow$ `Staging (Production Mirror)` $\rightarrow$ `Production`.
2. **Twelve-Factor Configuration**: Application builds must remain identical across environments. Environment-specific secrets and URLs MUST be injected via environment variables at container runtime, never baked into container images.

### 6.2 Docker & Containerization Best Practices (MUST)
- Use **multi-stage builds** to exclude compilers, development dependencies, and source files from production images.
- Base images MUST use pinned, minimal operating system images (e.g., `alpine`, `distroless`, `-slim`).
- Container processes MUST NOT execute as the root user (`USER node`, `USER appuser`).
- Containers MUST handle `SIGTERM` signals cleanly to ensure graceful shutdown of active connections.

### 6.3 Health Checks, Observability & Recovery (MUST)
1. **Dual Health Probes**:
   - **Liveness Probe** (`/health/live`): Confirms process is running and not deadlocked.
   - **Readiness Probe** (`/health/ready`): Confirms dependencies (DB connection pool, Redis cache) are ready to accept customer traffic.
2. **Structured Logging**: Production logs MUST be emitted in structured JSON format to `stdout`/`stderr` including: `timestamp`, `level`, `message`, `traceId`, `service`, `durationMs`.
3. **Automated Rollback & Backups**:
   - Production deployments MUST support one-click or automated rollbacks to the preceding image tag.
   - Database backups MUST be automated daily with encryption at rest, and restore drills MUST be performed and verified at least semi-annually.

---

## 7. Good Practices and Anti-Patterns

| Category | Anti-Pattern (Bad Practice ❌) | Clean Alternative (Good Practice ✅) |
| :--- | :--- | :--- |
| **Performance** | Loading 50MB uncompressed PNG images directly from frontend code. | Compressed WebP/AVIF images served via CDN with responsive `srcset`. |
| **Performance** | Running queries in tight loops inside application memory (N+1). | Batching queries or using SQL JOIN with proper database indexes. |
| **Accessibility** | Using `<div onClick={...}>Click me</div>` without keyboard or ARIA support. | Using native `<button type="button">Click me</button>`. |
| **Accessibility** | Overriding CSS outlines with `*:focus { outline: none !important; }`. | Custom high-visibility focus ring: `:focus-visible { outline: 2px solid #2563eb; }`. |
| **Operations** | SSH-ing into production servers to manually edit code or restart processes. | Automated Git-triggered CI/CD deploying immutable container images. |
| **Operations** | Unstructured console text logging without context or correlation IDs. | Structured JSON logs with distributed tracing correlation IDs (`trace_id`). |

---

## 8. Code Examples

### 8.1 Production Multi-Stage Dockerfile (Node.js / React or Express)
```dockerfile
# Stage 1: Build & Dependencies
FROM node:20-alpine AS builder
WORKDIR /app

# Cache package manifests
COPY package*.json ./
RUN npm ci

# Copy source and compile
COPY . .
RUN npm run build && npm prune --production

# Stage 2: Minimal Production Runtime
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# Run as unprivileged user for security
USER node

# Copy only production dependencies and built artifacts
COPY --chown=node:node --from=builder /app/package*.json ./
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]
```

### 8.2 Accessible Form Component (React & HTML5)
```tsx
import React, { useState } from "react";

export function AccessibleSubscriptionForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        {/* Linked label via htmlFor matching input id */}
        <label htmlFor="user-email" className="form-label">
          Email Address <span aria-hidden="true">*</span>
        </label>
        
        <input
          id="user-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-required="true"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "email-error" : undefined}
          className="form-input"
        />

        {/* Live region announcing error message to screen readers */}
        {error && (
          <p id="email-error" role="alert" className="error-message">
            {error}
          </p>
        )}
      </div>

      <button type="submit" className="btn-primary">
        Subscribe
      </button>
    </form>
  );
}
```

### 8.3 Structured Logging with Correlation ID (Node.js / Express)
```typescript
import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now();
  const traceId = (req.headers["x-trace-id"] as string) || crypto.randomUUID();

  // Attach trace ID to response header
  res.setHeader("x-trace-id", traceId);

  res.on("finish", () => {
    const durationMs = Date.now() - startTime;
    const logPayload = {
      timestamp: new Date().toISOString(),
      level: res.statusCode >= 500 ? "ERROR" : "INFO",
      traceId,
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      durationMs,
      userAgent: req.get("user-agent") || "unknown"
    };

    // Output strictly formatted JSON to standard output
    console.log(JSON.stringify(logPayload));
  });

  next();
}
```

---

## 9. Technology-Specific Notes
- **Vite / Webpack**:
  - Analyze bundle visual distribution using `rollup-plugin-visualizer` or `webpack-bundle-analyzer` to spot accidental mega-dependencies.
- **Spring Boot / Java**:
  - Use Spring Boot Actuator (`/actuator/health`, `/actuator/metrics`, `/actuator/prometheus`) for standardized readiness/liveness probes and Prometheus metrics export.
- **Kubernetes / Cloud Hosting**:
  - Configure resource limits (`requests` and `limits` for CPU/Memory) on container pods to prevent rogue processes from causing node starvation.
- **Mobile (iOS / Android)**:
  - Support Dynamic Type (iOS) and font scaling (Android) so users with visual impairments can scale text without UI clipping or button truncation.

---

## 10. Practical Implementation Checklist
- [ ] Core Web Vitals (LCP, INP, CLS) monitored and audited via Lighthouse / PageSpeed.
- [ ] Heavy routes and third-party libraries use dynamic code-splitting.
- [ ] All interactive elements are reachable and operable via keyboard alone.
- [ ] Text contrast meets WCAG AA standards ($\ge 4.5:1$).
- [ ] Forms pair input tags with programmatic labels and live error regions (`role="alert"`).
- [ ] Production Dockerfiles use multi-stage builds and run under non-root users.
- [ ] Liveness (`/health/live`) and readiness (`/health/ready`) endpoints implemented.
- [ ] Production logs output structured JSON with unique trace IDs.
- [ ] Database backup routines exist and restoration drill has been executed and validated.

---

## 11. Common Mistakes and Exceptions
- **Assumption of Accessibility**: Assuming an interface is accessible because it passes an automated linter. Automated tools catch only ~30%–40% of WCAG issues. Manual keyboard testing and screen reader checks (NVDA, VoiceOver) are mandatory.
- **Premature Caching**: Adding distributed Redis caches before optimizing database indexing and eliminating N+1 queries. Optimize data queries first.
- **Untested Backups**: Having daily database backups that have never been restored. An untested backup is not a backup.

---

## 12. References to Authoritative Documentation
- W3C Web Content Accessibility Guidelines (WCAG) 2.2: https://www.w3.org/TR/WCAG22/
- Google Web Vitals Documentation: https://web.dev/vitals/
- The Twelve-Factor App Methodology: https://12factor.net/
- OpenTelemetry Documentation: https://opentelemetry.io/docs/
- Docker Best Practices for Production: https://docs.docker.com/develop/develop-images/dockerfile_best-practices/

---

## 13. Related Documents Within This Library
- [01 — Naming Conventions](../../readme/NAMING_CONVENTION.md)
- [03 — Architecture & Design Patterns](./03-architecture-and-design-patterns.md)
- [04 — Security & Data Integrity](./04-security-and-data-integrity.md)
- [07 — API Design & Database Principles](./07-api-design-and-database-principles.md)
