# 04 — Security & Data Integrity

## 1. Document Purpose
This document establishes comprehensive security standards, data integrity controls, and defensive programming requirements for web and mobile engineering teams. Following these specifications ensures systems are protected against critical vulnerabilities (including OWASP Top 10), data corruption, and unauthorized access across all lifecycle phases.

---

## 2. Scope and Applicability
- **Applicability**: All client-side applications (Web/Mobile), server-side APIs, database layers, background workers, and deployment pipelines.
- **Compliance Alignment**: Directly mapped to OWASP Application Security Verification Standard (ASVS) and OWASP Top 10.
- **Mandatory vs. Contextual**: Core defense requirements (SQL injection prevention, password hashing, authentication boundaries) are strictly mandatory (MUST) for all projects. Advanced configurations (such as hardware security modules or ABAC engines) are evaluated based on system risk profile.

---

## 3. Core Principles
- **Secure by Default**: Systems MUST run in the most restrictive, secure configuration out-of-the-box. Permissions and access paths must be explicitly granted, never assumed.
- **Principle of Least Privilege (PoLP)**: Every service, database user, token, and actor MUST operate with the bare minimum set of privileges necessary to execute their duties.
- **Defense in Depth**: Security controls MUST be implemented in multiple independent layers (e.g., client validation + API gateway rate limit + service layer RBAC + parameterized database queries + TLS encryption).
- **Zero Trust (Never Trust, Always Verify)**: Never assume requests originating within an internal private network or from an authenticated client are inherently benign. Verify authentication, authorization, and data contracts at every boundary.
- **Fail Securely**: When a security check, authentication handshake, or critical transaction fails, the system MUST default to access rejection and rollback state cleanly without leaking stack traces.

---

## 4. Rules and Standards

### 4.1 Authentication & Authorization
1. **Password Hashing (MUST)**: Passwords MUST be hashed using modern, adaptive work-factor algorithms: **Argon2id** (preferred), **BCrypt** (work factor $\ge 12$), or **PBKDF2**. Legacy algorithms (`MD5`, `SHA-1`, plain `SHA-256`) are strictly forbidden.
2. **Authentication vs. Authorization Separation (MUST)**:
   - *Authentication (AuthN)*: Verifies identity ("Who are you?").
   - *Authorization (AuthZ)*: Verifies rights ("Are you allowed to perform this action on this resource?").
3. **Broken Object-Level Authorization (BOLA / IDOR) Prevention (MUST)**: Access to any resource (e.g., `/api/orders/{id}`) MUST verify that the currently authenticated principal owns or has explicit permission to access that specific record, not just that they have a valid login session.
4. **JWT Security (MUST)**:
   - Access tokens SHOULD be short-lived (e.g., 5 to 15 minutes).
   - Refresh tokens MUST be stored securely (e.g., `HttpOnly`, `Secure`, `SameSite=Strict/Lax` cookies) and invalidated upon logout or reuse detection.
   - Algorithms MUST be explicitly whitelisted (e.g., `RS256` or `HS256`); never accept `alg: "none"`.

### 4.2 Injection & Transport Defense
1. **Parameterized Queries (MUST)**: All database queries MUST use parameterized statements, prepared statements, or an approved ORM. Concatenating raw user inputs into SQL strings is strictly forbidden.
2. **Output Encoding & XSS Prevention (MUST)**: Any dynamic user content rendered into HTML, attributes, or JavaScript contexts MUST be properly encoded. Modern UI frameworks (React, Vue, Angular) provide contextual auto-escaping by default; never bypass it (e.g., avoid `dangerouslySetInnerHTML`) without security review.
3. **HTTPS & Transport Encryption (MUST)**: All production HTTP traffic MUST enforce TLS 1.3 / 1.2 with HSTS (`Strict-Transport-Security`).
4. **Cross-Origin Resource Sharing (CORS) (MUST)**: Never configure production CORS with `Access-Control-Allow-Origin: *` when credentials are included. Whitelist specific, trusted domain origins.
5. **Rate Limiting & Brute Force Protection (MUST)**: Sensitive endpoints (login, password reset, payment, OTP requests) MUST enforce strict IP- and account-level rate limits.

### 4.3 Secrets & Supply Chain
1. **No Committed Secrets (MUST)**: API keys, database credentials, encryption salts, and private certificates MUST NOT be committed to version control. Use `.gitignore` for `.env` files and manage secrets via environment variables or secret vaults.
2. **Safe Logging (MUST)**: Logs MUST NOT contain Passwords, PINs, Credit Card CVVs, JWT Bearer tokens, or Personally Identifiable Information (PII) like national IDs.
3. **File Upload Security (MUST)**:
   - Validate file type using byte magic numbers, not just user-supplied MIME types or extensions.
   - Store uploads in object storage (AWS S3, Cloudflare R2) outside the executable web root.
   - Re-encode or sanitize images and strip EXIF metadata.

---

## 5. Detailed Explanations: Core Vulnerability Defenses

### 5.1 SQL Injection (SQLi)
Occurs when untrusted data is directly concatenated into database query strings, allowing attackers to manipulate query structure.
- **Defense**: Always use parameter binding. The database engine treats parameterized input strictly as literal data, never as executable SQL commands.

### 5.2 Cross-Site Scripting (XSS)
Occurs when malicious client-side scripts are injected into web pages viewed by other users (Stored, Reflected, or DOM-based).
- **Defense**: Context-aware output encoding, Content Security Policy (CSP) headers, and storing session tokens in `HttpOnly` cookies so JavaScript cannot exfiltrate them.

### 5.3 Cross-Site Request Forgery (CSRF)
Tricks an authenticated user into executing unwanted actions on an application where they currently have an active session.
- **Defense**: SameSite cookie attributes (`SameSite=Lax` or `Strict`), Anti-CSRF tokens for state-changing endpoints (POST/PUT/DELETE), and requiring custom authorization headers (e.g., `Authorization: Bearer <token>`).

### 5.4 Server-Side Request Forgery (SSRF)
Occurs when a server fetches a remote resource without validating the user-supplied URL, allowing attackers to probe internal networks (e.g., AWS metadata service `169.254.169.254`).
- **Defense**: Validate URLs against an explicit domain whitelist; block private and loopback IP ranges (`10.0.0.0/8`, `192.168.0.0/16`, `127.0.0.1`, `169.254.0.0/16`).

---

## 6. Access Control Models: RBAC vs. ABAC

| Feature | Role-Based Access Control (RBAC) | Attribute-Based Access Control (ABAC) |
| :--- | :--- | :--- |
| **Concept** | Permissions are assigned to Roles (`ADMIN`, `EDITOR`, `VIEWER`), and Users are assigned to Roles. | Decisions are evaluated based on attributes: User, Resource, Action, and Environment. |
| **Best Used For** | Coarse-grained permissions, small-to-medium systems, straightforward hierarchies. | Complex, contextual rules (e.g., *"Allow doctor to view record ONLY IF doctor is assigned to patient AND time is within shift"*). |
| **Complexity** | Low complexity, fast evaluation, standard database mapping. | Higher complexity, requires policy engine (e.g., Open Policy Agent - OPA). |

---

## 7. Good Practices and Anti-Patterns

| Category | Anti-Pattern (Bad Practice ❌) | Secure Alternative (Good Practice ✅) |
| :--- | :--- | :--- |
| **Storage** | Saving JWTs in browser `localStorage` (accessible to any XSS payload). | Storing session/refresh tokens in `HttpOnly`, `Secure`, `SameSite` cookies. |
| **Authorizations** | Trusting client-supplied IDs without server checks (`req.body.userId`). | Extracting authenticated user identity exclusively from verified session / JWT claims. |
| **Secrets** | Committing API keys to Git and removing them in a later commit (persists in history). | Environment variables, `.env` files in `.gitignore`, and Git secret scanners (e.g., Gitleaks). |
| **Error Details** | Returning raw database error stack traces to public API clients. | Logging stack traces internally and returning generic, sanitized error responses to clients. |
| **Transactions** | Updating multiple account balances without database transactions. | Atomic database transactions (`BEGIN ... COMMIT`) with appropriate isolation levels. |

---

## 8. Code Examples

### 8.1 Safe SQL Parameterization vs Injection (Node.js / PostgreSQL)
```typescript
// ❌ BAD: SQL Injection Vulnerability via String Concatenation
async function findUserUnsafe(reqEmail: string) {
  const query = `SELECT id, email, role FROM users WHERE email = '${reqEmail}'`;
  return await db.query(query); // Attacker can pass: ' OR '1'='1
}

// ✅ GOOD: Parameterized Query (Input treated strictly as data)
async function findUserSafe(reqEmail: string) {
  const query = `SELECT id, email, role FROM users WHERE email = $1`;
  return await db.query(query, [reqEmail]);
}
```

### 8.2 Password Hashing and Verification (Java / BCrypt)
```java
// ✅ GOOD: Secure password handling with Work Factor >= 12
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordSecurityService {
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);

    public String hashPassword(String rawPassword) {
        if (rawPassword == null || rawPassword.length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 characters long");
        }
        return passwordEncoder.encode(rawPassword);
    }

    public boolean verifyPassword(String rawPassword, String storedHash) {
        return passwordEncoder.matches(rawPassword, storedHash);
    }
}
```

### 8.3 Safe Object-Level Authorization (BOLA/IDOR Prevention)
```typescript
// ✅ GOOD: Server verifies resource ownership before returning data
export async function getInvoiceDetails(invoiceId: string, currentUserId: string) {
  const invoice = await invoiceRepository.findById(invoiceId);
  
  if (!invoice) {
    throw new NotFoundException("Invoice not found");
  }

  // Explicit Ownership Verification
  if (invoice.ownerId !== currentUserId) {
    // Return Forbidden or Not Found to avoid leaking resource existence
    throw new ForbiddenException("Access denied to requested resource");
  }

  return invoice;
}
```

---

## 9. Technology-Specific Notes
- **React / Frontend**:
  - Never place secret API keys (e.g., private payment keys) in frontend code; Vite/Webpack `VITE_` or `REACT_APP_` prefixes are completely visible in the bundled client bundle.
  - Utilize DOMPurify if user-generated HTML must be rendered.
- **Express.js**:
  - Always use `helmet()` middleware to automatically configure secure HTTP headers (CSP, X-Content-Type-Options, Strict-Transport-Security).
- **Spring Boot**:
  - Use Spring Security method-level annotations (`@PreAuthorize("hasRole('ADMIN')")`) to lock down endpoints.
  - Enable CSRF protection for cookie-based browser sessions.
- **Mobile (iOS / Android)**:
  - Store sensitive keys in platform secure storage (Keychain on iOS, Keystore/EncryptedSharedPreferences on Android); avoid plain `AsyncStorage` or `SharedPreferences`.

---

## 10. Practical Implementation Checklist
- [ ] No database query uses raw string interpolation or concatenation.
- [ ] Passwords hashed with BCrypt (cost $\ge 12$) or Argon2id.
- [ ] Sensitive tokens (refresh tokens) use `HttpOnly`, `Secure`, `SameSite` flags.
- [ ] All resource access endpoints verify that the authenticated user owns or has rights to the specific target entity.
- [ ] Rate limiting is activated on login, register, and reset-password routes.
- [ ] HTTPS enforced on all environments except local development.
- [ ] `.env` and credential files are listed in `.gitignore`.
- [ ] Secret scanners (e.g., Gitleaks, TruffleHog) run in CI pipelines.
- [ ] Error handlers log stack traces internally and return sanitized error responses to users.

---

## 11. Common Mistakes and Exceptions
- **"We are behind a VPN, so we don't need auth between microservices"**: Violates Zero Trust. Internal network lateral movement is a primary attack vector in breach incidents.
- **Client-Side Validation Only**: Validating email formats or password rules solely in React/Mobile code is cosmetic; malicious actors bypass client applications via direct API calls (`curl`, Postman). Always re-validate on the server.
- **Obfuscation as Security**: Renaming `/admin` to `/super-secret-panel` does not substitute for strict authentication and authorization.

---

## 12. References to Authoritative Documentation
- OWASP Top 10 Web Application Security Risks: https://owasp.org/www-project-top-ten/
- OWASP Application Security Verification Standard (ASVS): https://owasp.org/www-project-application-security-verification-standard/
- OWASP Cheat Sheet Series (Authentication, SQLi, Password Storage): https://cheatsheetseries.owasp.org/
- NIST Digital Identity Guidelines (Special Publication 800-63B): https://pages.nist.gov/800-63-3/sp800-63b.html

---

## 13. Related Documents Within This Library
- [01 — Naming Conventions](../../readme/NAMING_CONVENTION.md)
- [03 — Architecture & Design Patterns](./03-architecture-and-design-patterns.md)
- [07 — API Design & Database Principles](./07-api-design-and-database-principles.md)
