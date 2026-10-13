# 07 — API Design & Database Principles

## 1. Document Purpose
This document establishes standardized engineering practices for designing RESTful APIs, structuring data persistence systems, managing transactions, and maintaining database integrity. It ensures that application services expose consistent, predictable client interfaces and maintain resilient, performant storage foundations.

---

## 2. Scope and Applicability
- **API Scope**: Public and internal HTTP/REST APIs, webhooks, and client-server communication contracts.
- **Database Scope**: Relational Database Management Systems (PostgreSQL, MySQL, SQL Server) and Document NoSQL engines (MongoDB).
- **Audience**: Backend engineers, fullstack developers, mobile engineers consuming APIs, and database administrators.

---

## 3. Core Principles
- **Predictable API Contracts**: APIs must follow uniform naming conventions, standardized JSON response envelopes, and deterministic HTTP status codes.
- **Idempotency & Safe Retries**: Network requests can fail midway. Non-safe mutations (e.g., payments, order submissions) must support idempotent retries without duplicating operations.
- **Data Integrity at Rest**: Enforce schema constraints, foreign keys, check constraints, and ACID transactions at the database engine level, not merely in application code.
- **Zero-Downtime Evolutions**: Database schemas and API versions must evolve using backward-compatible, non-breaking transitions (e.g., expand-and-contract pattern).
- **Explicit Pagination**: Never expose unbounded collections. Every list endpoint must enforce pagination boundaries.

---

## 4. Rules and Standards: API Design

### 4.1 REST Resource URI Naming (MUST)
1. **Nouns, Not Verbs**: URIs represent resources. Use plural lowercase nouns.
   - ✅ `GET /api/v1/orders`, `POST /api/v1/orders`
   - ❌ `GET /api/v1/getOrders`, `POST /api/v1/createOrder`
2. **Hierarchical Relationships**: Represent sub-resources naturally through nesting:
   - ✅ `GET /api/v1/orders/{orderId}/items`
   - Nested paths SHOULD NOT exceed 2 levels of hierarchy. For deeper queries, use top-level resources with query parameters (`GET /api/v1/items?orderId={orderId}`).
3. **HTTP Verb Semantics (MUST)**:
   - `GET`: Retrieve resource. Safe & Idempotent (no state change).
   - `POST`: Create new resource or initiate processing. Non-idempotent.
   - `PUT`: Completely replace resource or update idempotently.
   - `PATCH`: Partial update of specified fields.
   - `DELETE`: Remove resource. Idempotent.

### 4.2 Standard HTTP Status Codes (MUST)
- `200 OK`: Successful retrieval or synchronous update.
- `201 Created`: Resource successfully created (accompanied by `Location` header or created object).
- `204 No Content`: Successful action with no response body (commonly `DELETE`).
- `400 Bad Request`: Client validation error, malformed JSON, or missing required attributes.
- `401 Unauthorized`: Authentication missing, expired, or invalid.
- `403 Forbidden`: Authenticated, but lacking permission for the requested resource.
- `404 Not Found`: Resource does not exist (or concealed for security).
- `409 Conflict`: Business state conflict (e.g., duplicate unique email, optimistic lock failure).
- `422 Unprocessable Content`: Semantically invalid entity.
- `429 Too Many Requests`: Rate limit exceeded.
- `500 Internal Server Error`: Unhandled server exception (sanitized to client).

### 4.3 Standard Error Response Format (MUST)
All API error responses MUST follow a consistent structure (aligned with RFC 7807 Problem Details or unified JSON envelope):
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Input validation failed for request payload.",
    "details": [
      {
        "field": "email",
        "issue": "Must be a valid email address"
      }
    ]
  },
  "timestamp": "2026-10-13T11:45:00Z",
  "requestId": "req-98f23a-bc12"
}
```

### 4.4 Pagination, Sorting, and Filtering (MUST)
- List endpoints MUST support cursor-based or offset-based pagination:
  - Query params: `page` & `limit` (offset) or `cursor` & `limit`.
  - Enforce a maximum page size (e.g., default `limit=20`, max `limit=100`).
- Sorting convention: `sort=createdAt:desc,priority:asc`.
- Filtering convention: `status=active&categoryId=12`.

### 4.5 Webhooks & Signature Verification (MUST)
When accepting or dispatching webhooks:
- Outgoing webhooks MUST include an HMAC signature header (e.g., `X-Signature-SHA256: hmac_sha256(payload, secret)`).
- Consumers MUST verify signatures prior to payload processing to prevent spoofing.
- Consumers MUST process webhooks idempotently (tracking webhook event IDs).

---

## 5. Rules and Standards: Database Principles

### 5.1 Relational vs. NoSQL Engine Selection Framework
- **Relational (PostgreSQL, MySQL, SQL Server)**:
  - *Select when*: High transaction integrity (ACID) is non-negotiable, entities have complex relational joins, data schemas are structured, or financial/audit records are involved.
- **NoSQL / Document (MongoDB)**:
  - *Select when*: Data is naturally hierarchical/polymorphic, document models represent self-contained bounded contexts (e.g., product catalog with arbitrary attributes), or high write-throughput with horizontal sharding is required.

### 5.2 Schema Design & Integrity Constraints (MUST)
1. **Primary Keys**: Every relational table MUST have a primary key (`BIGINT IDENTITY/AUTO_INCREMENT` or `UUID v7` for distributed systems).
2. **Foreign Keys**: Enforce relational constraints directly in the database (`REFERENCES other_table(id)`). Never rely solely on application-level checks.
3. **Nullability**: Columns MUST be `NOT NULL` by default unless nullability represents authentic domain absence of data.
4. **Check & Unique Constraints**: Enforce domain invariants in the schema (e.g., `CHECK (price >= 0)`, `UNIQUE (email)`).

### 5.3 Transactions & Concurrency Control
1. **ACID Boundaries (MUST)**: Multi-step mutations that must succeed or fail together MUST be wrapped in explicit transactions (`BEGIN TRANSACTION ... COMMIT`).
2. **Preventing Lost Updates**:
   - **Optimistic Locking (Preferred for web apps)**: Add a `version INT DEFAULT 0` column. Updates verify version:
     ```sql
     UPDATE accounts SET balance = 500, version = version + 1 
     WHERE id = 10 AND version = 2;
     ```
     If zero rows are updated, throw conflict exception.
   - **Pessimistic Locking**: `SELECT ... FOR UPDATE` reserved for high-contention, brief critical operations (e.g., real-time seat reservation).

### 5.4 Deletion Strategy: Soft Delete vs. Hard Delete
- **Soft Delete** (`deleted_at TIMESTAMP NULL`):
  - *Use for*: Auditable business records (Orders, Invoices, User accounts) where historical reporting or recovery is required.
  - *Rule*: Create partial indexes (`WHERE deleted_at IS NULL`) so unique constraints and query performance are not impaired.
- **Hard Delete**:
  - *Use for*: Ephemeral data (sessions, temporary verification tokens) or GDPR "Right to be Forgotten" mandates where complete erasure is legally required.

---

## 6. Good Practices and Anti-Patterns

| Category | Anti-Pattern (Bad Practice ❌) | Clean Alternative (Good Practice ✅) |
| :--- | :--- | :--- |
| **API** | Using `GET /users/delete?id=12` for deletions. | `DELETE /users/12` with proper authentication and HTTP verb semantics. |
| **API** | Returning array directly at root: `[{}, {}]` (blocks future metadata expansion). | Return enveloped object: `{ "data": [...], "pagination": {...} }`. |
| **Database** | Missing indexes on foreign keys and frequently queried filter columns. | Add B-Tree indexes on all foreign keys and high-cardinality search columns. |
| **Database** | Running unbounded queries: `SELECT * FROM audit_logs;` without `LIMIT`. | Mandatory default `LIMIT` and pagination parameters in service layer. |
| **Database** | Writing raw schema alterations manually on production servers. | Programmatic migration tools (Flyway, Liquibase, Prisma, Knex, EF Core). |

---

## 7. Code Examples

### 7.1 Standard Paginated REST Controller with Idempotency (TypeScript / Express)
```typescript
import { Request, Response } from "express";

export async function getOrders(req: Request, res: Response) {
  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 20));
  const offset = (page - 1) * limit;

  const { items, totalCount } = await orderService.findOrders({ offset, limit });

  return res.status(200).json({
    success: true,
    data: items,
    pagination: {
      page,
      limit,
      totalCount,
      totalPages: Math.ceil(totalCount / limit)
    }
  });
}
```

### 7.2 Database Migration Script with Safe Constraints (PostgreSQL)
```sql
-- V2__create_orders_and_items.sql
CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    total_amount NUMERIC(12, 2) NOT NULL,
    version INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ NULL,

    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT chk_orders_positive_total CHECK (total_amount >= 0)
);

-- Index foreign key and soft-delete queries
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_active ON orders(created_at DESC) WHERE deleted_at IS NULL;
```

### 7.3 Webhook HMAC Signature Verification (Node.js / Express)
```typescript
import crypto from "crypto";

export function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload, "utf8")
    .digest("hex");

  // Constant-time comparison to protect against timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(signature, "hex"),
    Buffer.from(expectedSignature, "hex")
  );
}
```

---

## 8. Technology-Specific Notes
- **PostgreSQL**:
  - Prefer `TIMESTAMPTZ` for time storage to avoid timezone conversion ambiguities.
  - Leverage JSONB columns for flexible schemaless attributes within relational models.
- **MySQL (InnoDB)**:
  - Always use `utf8mb4` character set to support full Unicode (including emojis).
  - Explicitly define foreign key cascade behavior (`ON DELETE RESTRICT` or `ON DELETE CASCADE`).
- **SQL Server (T-SQL)**:
  - Use `DATETIMEOFFSET` for timezones.
  - Utilize `ROWVERSION` column type for seamless optimistic concurrency checking.
- **MongoDB**:
  - Model 1-to-few relationships by embedding; model 1-to-many or high-frequency updates by referencing.
  - Use MongoDB schema validation rules (`$jsonSchema`) to enforce document constraints.

---

## 9. Practical Implementation Checklist
- [ ] API routes use plural nouns and proper HTTP verbs (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`).
- [ ] Error responses follow standard JSON error structure with status code and error details.
- [ ] All list endpoints enforce mandatory pagination limits.
- [ ] Database queries are parameterized; no string interpolation in SQL.
- [ ] Foreign keys, `NOT NULL`, and check constraints are defined in database schemas.
- [ ] Schema changes are managed via automated migration files checked into Git.
- [ ] All foreign key columns have corresponding indexes.
- [ ] Sensitive state mutations (e.g., checkout/payments) support idempotency keys.
- [ ] Webhook endpoints verify cryptographic signatures in constant time.

---

## 10. Common Mistakes and Exceptions
- **Breaking API Changes**: Removing an existing field or renaming a property in a public API breaks deployed mobile apps immediately. Always introduce fields non-destructively or release a new API version (`/api/v2`).
- **N+1 Query Problem**: Fetching 100 orders and then executing 100 individual queries in a loop to fetch items for each order. Use SQL `JOIN` or batch queries (`WHERE id IN (...)` / DataLoader).
- **Over-Indexing**: Adding indexes on every column in a table degrades write/insert performance. Index only columns used in `WHERE`, `JOIN`, and `ORDER BY` clauses.

---

## 11. References to Authoritative Documentation
- Microsoft REST API Guidelines: https://github.com/microsoft/api-guidelines
- RFC 7807 — Problem Details for HTTP APIs: https://datatracker.ietf.org/doc/html/rfc7807
- PostgreSQL Documentation — Transactions & Indexes: https://www.postgresql.org/docs/current/
- OpenAPI Specification (OAS 3.1): https://spec.openapis.org/oas/latest.html
- Stripe API Reference — Idempotent Requests: https://stripe.com/docs/api/idempotent_requests

---

## 12. Related Documents Within This Library
- [01 — Naming Conventions](../../readme/NAMING_CONVENTION.md)
- [03 — Architecture & Design Patterns](./03-architecture-and-design-patterns.md)
- [04 — Security & Data Integrity](./04-security-and-data-integrity.md)
- [08 — Performance, Accessibility & Operations](./08-performance-accessibility-and-operations.md)
