# 03 — Architecture & Design Patterns

## 1. Document Purpose
This document establishes structural standards, component boundaries, and architectural patterns for modern web and mobile applications. It provides engineers with a clear decision framework for organizing code, enforcing separation of concerns, and selecting appropriate design patterns without over-engineering small systems.

---

## 2. Scope and Applicability
- **Applicability**: Systems ranging from small MVPs and single-page apps (SPAs) to modular monoliths and distributed services.
- **Audience**: Fullstack engineers, frontend developers, backend architects, and mobile engineers.
- **Key Tenet**: Architecture must serve business outcomes. Do not introduce enterprise complexity, multiple abstract layers, or microservices until the system size and organizational structure genuinely demand them.

---

## 3. Core Principles
- **Separation of Layers**: Each architectural layer possesses a discrete responsibility and interacts only with authorized adjacent layers.
- **Unidirectional Dependency Flow**: Dependencies point inwards toward core business logic, or strictly downwards through application layers.
- **Explicit Boundaries**: Modules must encapsulate internal implementation details and expose stable, documented public APIs.
- **Pragmatic Evolution**: Begin with the simplest viable architecture (typically a clean Layered Monolith or Modular Monolith) and decompose as domains mature.
- **Avoid Circular Dependencies**: Components A and B must never depend on each other directly; decouple through interfaces or mediator events.

---

## 4. Rules and Standards

### 4.1 Layer Responsibilities (MUST)
Backend systems following layered design MUST enforce these boundaries:
1. **Transport / Presentation Layer (Controllers & Routers)**:
   - Validates incoming HTTP/RPC payload syntax.
   - Maps requests into domain commands/queries.
   - Invokes business services and formats HTTP responses/status codes.
   - MUST NOT contain business rules or execute raw database queries.
2. **Business / Domain Layer (Services & Domain Models)**:
   - Encapsulates business logic, domain invariants, workflow coordination, and calculations.
   - MUST NOT depend on HTTP objects (e.g., `req`, `res`, `HttpServletRequest`).
3. **Data Access / Persistence Layer (Repositories & DAOs)**:
   - Encapsulates queries, persistence logic, and object-relational mappings.
   - MUST NOT contain business decisions or HTTP formatting logic.
4. **Middleware Layer**:
   - Handles cross-cutting infrastructure concerns: authentication, logging, CORS, rate limiting, and global error normalization.

### 4.2 Frontend Architecture (SHOULD)
1. **Container vs. Presentational Separation**: Separate UI rendering components (pure, presentational) from data-fetching and stateful orchestration logic (containers or custom hooks).
2. **Feature-First Organization**: Group code by business feature (e.g., `features/billing/`, `features/auth/`) rather than purely technical folders (`components/`, `services/`, `views/`) as applications scale beyond 10 screens.

### 4.3 Architecture Decision Records (ADRs) (SHOULD)
Significant architectural choices (such as adopting a new database, message broker, or state management library) SHOULD be recorded in an ADR containing:
- Context & Problem Statement
- Decision & Options Considered
- Consequences & Trade-offs (positive, negative, and neutral)

---

## 5. Detailed Explanations: Architecture Styles

### 5.1 Layered Architecture (3-Tier / N-Tier)
The classic standard for web applications:
```text
[ Client (Web / Mobile) ]
           │
           ▼
[ Presentation Layer: Controllers / Routes / Middleware ]
           │
           ▼
[ Application / Service Layer: Business Logic ]
           │
           ▼
[ Persistence Layer: Repositories / ORM ]
           │
           ▼
[ Database (PostgreSQL / MySQL / MongoDB) ]
```
- **Strengths**: Intuitive, easy to onboard, low boilerplate.
- **Weaknesses**: Can lead to database-driven domain design where business logic is scattered across controllers or database triggers.

### 5.2 Clean & Hexagonal Architecture (Ports and Adapters)
Inverts traditional dependencies: the Domain Model sits at the center, isolated from all external frameworks, databases, and UI:
```text
           ┌────────────────────────────────────────┐
           │          Adapters (Driving)            │
           │        REST Controller / CLI           │
           │                   │                    │
           │                   ▼                    │
           │      ┌──────────────────────────┐      │
           │      │    Application / UseCase │      │
           │      │            │             │      │
           │      │            ▼             │      │
           │      │      Domain Core         │      │
           │      │  (Entities & Rules)      │      │
           │      │            ▲             │      │
           │      │            │             │      │
           │      │    Port (Interfaces)     │      │
           │      └──────────────────────────┘      │
           │                   ▲                    │
           │                   │                    │
           │          Adapters (Driven)             │
           │     PostgreSQL / Stripe / S3           │
           └────────────────────────────────────────┘
```
- **Use when**: Core domain rules are complex, long-lived, and require 100% framework-independent unit testing.

### 5.3 Modular Monolith vs. Microservices
- **Modular Monolith**: A single deployable unit subdivided into high-cohesion, low-coupling business modules (e.g., `Users`, `Catalog`, `Orders`). Recommended starting point for 90% of business systems.
- **Microservices**: Independently deployable services with independent databases and network boundaries.
  - *Trade-off warning*: Microservices introduce distributed state, network latency, eventual consistency, and complex operations. Use only when team boundaries and scale dictate distinct operational scaling.

---

## 6. Key Design Patterns Catalog

### 6.1 Repository Pattern
Decouples domain logic from persistence mechanisms by presenting an in-memory collection interface.
```text
[ Business Service ] ──(calls)──> [ Interface: UserRepository ]
                                            ▲
                                            │ (implements)
                                  [ PostgresUserRepository ]
```

### 6.2 Factory Pattern
Encapsulates object creation when initialization involves complex conditionals, configuration, or strategy selection.

### 6.3 Strategy Pattern
Defines a family of interchangeable algorithms and makes them swappable at runtime without mutating caller code. Ideal for payment gateways, tax calculation, or export formats.

### 6.4 Adapter Pattern
Translates an incompatible external interface into a contract expected by the application (e.g., adapting an AWS S3 SDK and a local disk storage provider to a common `StoragePort`).

### 6.5 Observer / Publish-Subscribe Pattern
Allows components to notify multiple subscribers of state changes without knowing their identity. Useful for decoupling side effects (e.g., sending an email or push notification after order placement).

---

## 7. Good Practices and Anti-Patterns

| Category | Anti-Pattern (Bad Practice ❌) | Clean Alternative (Good Practice ✅) |
| :--- | :--- | :--- |
| **Routing** | Fat Controllers: 300+ line controller methods executing direct SQL, email sending, and validation. | Skinny Controllers: Controller only validates payload, delegates to Service, returns HTTP status. |
| **Coupling** | Circular Imports (`A` imports `B`, `B` imports `A`). | Extract shared contract or types to a neutral module `C`, or use dependency injection. |
| **Storage** | Leakage of ORM Entities into UI templates or external API responses. | Use dedicated Data Transfer Objects (DTOs) or ViewModels to decouple API contract from DB schema. |
| **Config** | Hardcoding URLs and keys inside service classes. | Centralized configuration via environment variables validated at startup. |
| **Distribution** | Distributed Monolith: Microservices sharing a single database or tightly coupled via synchronous HTTP calls. | Shared-nothing databases per service, asynchronous messaging for integration. |

---

## 8. Code Examples

### 8.1 Strategy Pattern for Payment Processing (TypeScript)
```typescript
// 1. Common Strategy Interface
export interface PaymentStrategy {
  processPayment(amount: number): Promise<{ transactionId: string; success: boolean }>;
}

// 2. Concrete Strategy A
export class StripePaymentStrategy implements PaymentStrategy {
  async processPayment(amount: number) {
    // Call Stripe SDK
    return { transactionId: `stripe_${Date.now()}`, success: true };
  }
}

// 3. Concrete Strategy B
export class PayPalPaymentStrategy implements PaymentStrategy {
  async processPayment(amount: number) {
    // Call PayPal SDK
    return { transactionId: `paypal_${Date.now()}`, success: true };
  }
}

// 4. Context Service using Dependency Injection
export class CheckoutService {
  constructor(private readonly paymentStrategy: PaymentStrategy) {}

  async checkout(orderTotal: number) {
    if (orderTotal <= 0) throw new Error("Invalid order total");
    return await this.paymentStrategy.processPayment(orderTotal);
  }
}
```

### 8.2 Clean Separation: Controller → Service → Repository (Java / Spring)
```java
// Controller (Presentation only)
@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<UserResponseDto> createUser(@Valid @RequestBody CreateUserRequestDto request) {
        UserResponseDto created = userService.registerUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}

// Service (Business logic only)
@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Transactional
    public UserResponseDto registerUser(CreateUserRequestDto request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new DuplicateEmailException("Email already in use");
        }
        User user = userMapper.toEntity(request);
        User saved = userRepository.save(user);
        return userMapper.toDto(saved);
    }
}
```

---

## 9. Technology-Specific Notes
- **React / Frontend**:
  - Prefer Custom Hooks (`useUserData()`) to isolate data fetching, caching, and state transitions away from visual UI components.
  - Colocate components with their tests, styles, and sub-components when using feature folders.
- **Node.js / Express / NestJS**:
  - In Express, enforce layer boundaries via clean folder conventions (`routes/`, `controllers/`, `services/`, `repositories/`).
  - In NestJS, leverage built-in Dependency Injection and Module systems (`@Module()`) to isolate domain boundaries.
- **Spring Boot / Java**:
  - Avoid field-level `@Autowired`. Use constructor-based dependency injection with `private final` fields for immutability and ease of test mocking.
- **Mobile (Flutter / React Native)**:
  - Adhere to established patterns such as BLoC / Provider in Flutter, or Redux Toolkit / Zustand in React Native.
  - Never call device hardware APIs (Camera, GPS, SQLite) directly inside UI view widgets; route through an abstracted hardware repository.

---

## 10. Practical Implementation Checklist
- [ ] Controller classes only handle request unpacking, validation, and response formatting.
- [ ] Business logic is encapsulated in Services/Domain models, independent of HTTP abstractions.
- [ ] Database interactions are constrained to Repositories or Data Access Objects.
- [ ] No circular dependencies exist in the module import graph.
- [ ] Environment variables and external configurations are managed through a centralized config module.
- [ ] Data models returned across API boundaries use DTOs rather than exposing internal database entities.

---

## 11. Common Mistakes and Exceptions
- **Premature Microservices**: Decomposing a 2-developer project into 8 microservices before domain boundaries are understood. Always start with a Modular Monolith unless multiple independent teams require isolated deploy cycles.
- **Layer Anemia or Pass-Through Bloat**: Creating empty service layers that do nothing but call `repository.findAll()` for pure static CRUD tables where no business rules exist. In very basic CRUD scenarios, lightweight architectures are acceptable.
- **Leaky Abstractions**: Passing raw database query objects or SQL strings into the Controller layer.

---

## 12. References to Authoritative Documentation
- Martin Fowler — *Patterns of Enterprise Application Architecture (P of EAA)*: https://martinfowler.com/eaaCatalog/
- Microsoft Architecture Guides — *Common Web Application Architectures*: https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/common-web-application-architectures
- Alistair Cockburn — *Hexagonal Architecture (Ports and Adapters)*: https://alistair.cockburn.us/hexagonal-architecture/
- Architecture Decision Records (ADR) Standard: https://adr.github.io/

---

## 13. Related Documents Within This Library
- [01 — Naming Conventions](../../readme/NAMING_CONVENTION.md)
- [02 — Clean Code & Software Design Principles](./02-clean-code-and-design-principles.md)
- [07 — API Design & Database Principles](./07-api-design-and-database-principles.md)
