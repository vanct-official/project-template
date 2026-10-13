# 02 — Clean Code & Software Design Principles

## 1. Document Purpose
This document establishes universal clean code practices, foundational design principles, and code quality expectations across web and mobile projects. Its goal is to maximize code readability, maintainability, testability, and team velocity while preventing premature over-engineering.

---

## 2. Scope and Applicability
- **Applicable Domains**: Frontend web applications, backend services/APIs, mobile applications (iOS/Android/cross-platform), CLI tools, and shared libraries.
- **Target Audience**: All software engineers, tech leads, and code reviewers.
- **Language Independence**: Principles apply universally to object-oriented, functional, and procedural code across TypeScript/JavaScript, Java, C#, Python, Go, Swift, Kotlin, and Dart.

---

## 3. Core Principles

### 3.1 Taxonomy: Principles, Rules, Conventions, and Guidelines
Understanding the distinction between these four tiers prevents dogmatic arguments during reviews:
- **Principle** (*Nguyên lý*): Foundational philosophical truths (e.g., SRP, DRY). High-level and enduring; guides reasoning rather than specifying syntax.
- **Rule** (*Quy tắc bắt buộc*): Explicit mandatory constraints (MUST/MUST NOT). Non-compliance is considered a defect (e.g., "Do not hardcode secrets", "All public methods must validate non-null arguments").
- **Convention** (*Quy ước thống nhất*): Team-wide or language-wide agreements to maintain uniformity (e.g., using `camelCase` for variable names, BEM for CSS).
- **Guideline** (*Chỉ dẫn gợi ý*): Recommended best practices (SHOULD/MAY). Contextual and subjective depending on system maturity and complexity.

### 3.2 Foundational Mental Models
- **Readability Over Cleverness**: Code is read at least 10x more often than it is written. Optimize for the future maintainer.
- **KISS (Keep It Simple, Stupid)**: Favor simple, obvious solutions over elaborate mechanisms. Complexity is a liability.
- **DRY (Don't Repeat Yourself)**: Every piece of business knowledge or domain logic must have a single, unambiguous representation within a system.
  > *Clarification*: DRY is about domain knowledge duplication, not incidental structural similarity. Two functions with identical lines but completely different business reasons to change should not be coupled prematurely.
- **YAGNI (You Aren't Gonna Need It)**: Implement functionality only when needed, never when you merely anticipate needing it in the future.
- **Separation of Concerns (SoC)**: Decompose software into distinct sections where each section addresses a separate concern (e.g., business logic separate from HTTP transport).
- **High Cohesion & Low Coupling**:
  - *High Cohesion* (*Gắn kết nội tại cao*): Code elements inside a single module or class belong together and serve a unified purpose.
  - *Low Coupling* (*Phụ thuộc liên module thấp*): Modules interact through well-defined, minimal contracts without relying on internal implementation details.

---

## 4. Rules and Standards

### 4.1 Functions and Methods
1. **Single Responsibility (MUST)**: A function MUST perform one logical task and do it well.
2. **Small Scope & Depth (SHOULD)**: Functions SHOULD typically stay under 20–30 lines of code. Functions exceeding 50 lines MUST be reviewed for decomposition.
3. **Parameter Limits (SHOULD)**: Functions SHOULD accept 3 or fewer parameters. If more parameters are needed, bundle them into a typed parameter object or DTO.
4. **Pure & Predictable (SHOULD)**: Pure functions (no side-effects, deterministic return based only on inputs) SHOULD be prioritized for business algorithms.
5. **No Boolean Flag Arguments (SHOULD NOT)**: Passing a boolean flag (e.g., `processUser(user, true)`) indicates the function does two things. Split it into two descriptive functions instead (e.g., `processUser()` and `processAdminUser()`).

### 4.2 Control Flow and Complexity
1. **Guard Clauses / Return Early (MUST)**: Handle edge cases, errors, and invalid inputs at the top of the function and return early to eliminate nested `if-else` blocks.
2. **Maximum Nesting Depth (MUST)**: Code MUST NOT exceed 3 levels of indentation (`if`, `for`, `try`). Refactor excessive nesting into sub-functions.
3. **No Magic Numbers or Strings (MUST)**: Numeric constants, timeouts, and business keys MUST be extracted into named constants or enums.

### 4.3 Error Handling
1. **Never Swallow Exceptions (MUST NOT)**: Catch blocks MUST NOT remain empty or silently log without recovery. Handle, translate, or propagate errors explicitly.
2. **Use Typed / Custom Exceptions (SHOULD)**: Throw domain-specific or categorized exceptions rather than generic base errors (e.g., `UserNotFoundException` vs generic `Error`).
3. **Clean Resource Cleanup (MUST)**: Always ensure external resources (files, sockets, database transactions) are closed via deterministic idioms (`try-with-resources` in Java, `using` in C#, `defer` in Go, `finally` in JS).

### 4.4 Comments and Documentation
1. **Explain "Why", Not "What" (MUST)**: Code structure and naming should explain *what* is happening. Comments are reserved for *why* an unusual decision, business rule, or workaround was taken.
2. **No Dead Code (MUST)**: Never leave commented-out code blocks in production repositories. Rely on Git history.

---

## 5. Detailed Explanations: SOLID Principles

### S — Single Responsibility Principle (SRP)
*A class, module, or function should have one, and only one, reason to change.*
- **Vietnamese note**: Một class/hàm chỉ nên đảm nhận một trách nhiệm duy nhất và chỉ có một lý do để phải sửa đổi.
- **Application**: Avoid "God Classes" that perform input validation, database queries, business processing, and email delivery in a single file.

### O — Open/Closed Principle (OCP)
*Software entities should be open for extension, but closed for modification.*
- **Application**: Introduce new functionality by adding new classes, strategies, or plugins, rather than modifying established core switch-statements or conditionals.

### L — Liskov Substitution Principle (LSP)
*Subtypes must be substitutable for their base types without altering system correctness.*
- **Application**: Derived classes must honor the contracts, pre-conditions, and post-conditions of base classes without throwing `NotImplementedException` or changing expected invariants.

### I — Interface Segregation Principle (ISP)
*Clients should not be forced to depend on interfaces they do not use.*
- **Application**: Favor many small, role-specific interfaces over one bulky, monolithic interface.

### D — Dependency Inversion Principle (DIP)
*High-level modules should not depend on low-level modules; both should depend on abstractions. Abstractions should not depend on details; details should depend on abstractions.*
- **Application**: Decouple domain services from concrete infrastructure (e.g., database drivers, third-party payment SDKs) via interfaces.

---

## 6. Composition Over Inheritance
Inheritance couples subclasses tightly to parent class internal structure (the "Fragile Base Class" problem).
- **Prefer Composition**: Assemble behavior by holding references to interface-based components rather than building deep class hierarchies.
- **Guideline**: Use inheritance only when there is an authentic, invariant "is-a" relationship and behavior polymorphism is required. For code reuse, favor composition ("has-a").

---

## 7. Good Practices and Anti-Patterns

| Category | Anti-Pattern (Bad Practice ❌) | Clean Alternative (Good Practice ✅) | Rationale |
| :--- | :--- | :--- | :--- |
| **Control Flow** | Deep Arrow Anti-Pattern (4+ nested `if` blocks) | Guard Clauses (Return Early) | Reduces cognitive load and clarifies error handling paths. |
| **Constants** | Inline literals: `if (status === 3)` or `setTimeout(..., 86400000)` | Named constants: `OrderStatus.SHIPPED`, `ONE_DAY_IN_MS` | Clarifies intent and prevents copy-paste errors across modules. |
| **State** | Temporal coupling: Must call `init()` then `prepare()` then `run()` | Self-contained constructors or Builder patterns | Prevents runtime bugs caused by calling methods out of sequence. |
| **Duplication** | Premature Abstraction: Merging two distinct features into one convoluted generic handler | Incidental duplication tolerated until 3 distinct use-cases emerge (Rule of Three) | Wrong abstraction is far more expensive than duplicated code. |
| **Complexity** | Gold plating: writing generic plugin frameworks for a simple CRUD service | YAGNI: Write the simplest concrete solution that passes requirements | Avoids unnecessary maintenance overhead. |

---

## 8. Code Examples

### 8.1 Guard Clauses vs Nested Conditionals (TypeScript / JavaScript)
```typescript
// ❌ BAD: Arrow Code Anti-Pattern (High Cognitive Load)
function processPaymentBad(user: User | null, amount: number): PaymentResult {
  if (user !== null) {
    if (user.isActive) {
      if (amount > 0) {
        if (user.balance >= amount) {
          user.balance -= amount;
          return { success: true, message: "Payment processed" };
        } else {
          return { success: false, message: "Insufficient balance" };
        }
      } else {
        return { success: false, message: "Invalid amount" };
      }
    } else {
      return { success: false, message: "User is inactive" };
    }
  } else {
    return { success: false, message: "User does not exist" };
  }
}

// ✅ GOOD: Return Early using Guard Clauses
function processPaymentGood(user: User | null, amount: number): PaymentResult {
  if (!user) {
    return { success: false, message: "User does not exist" };
  }
  if (!user.isActive) {
    return { success: false, message: "User is inactive" };
  }
  if (amount <= 0) {
    return { success: false, message: "Invalid amount" };
  }
  if (user.balance < amount) {
    return { success: false, message: "Insufficient balance" };
  }

  user.balance -= amount;
  return { success: true, message: "Payment processed" };
}
```

### 8.2 Single Responsibility & Dependency Inversion (Java)
```java
// ❌ BAD: Violates SRP & DIP (Controller handles hashing, SQL, and emails directly)
public class BadUserController {
    public void registerUser(String email, String password) {
        // Validation
        if (!email.contains("@")) throw new IllegalArgumentException("Bad email");
        // Business logic & Hashing
        String hash = BCrypt.hashpw(password, BCrypt.gensalt());
        // Direct DB Access
        DriverManager.getConnection("jdbc:...").createStatement()
            .executeUpdate("INSERT INTO users VALUES ('" + email + "', '" + hash + "')");
        // Direct Email Notification
        SmtpClient.sendEmail(email, "Welcome!");
    }
}

// ✅ GOOD: Adheres to SRP & DIP with Interfaces and Dedicated Services
@Service
public class UserRegistrationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final NotificationService notificationService;

    public UserRegistrationService(
        UserRepository userRepository,
        PasswordEncoder passwordEncoder,
        NotificationService notificationService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.notificationService = notificationService;
    }

    @Transactional
    public User register(RegisterUserCommand command) {
        command.validate();
        String encodedPassword = passwordEncoder.encode(command.password());
        User newUser = new User(command.email(), encodedPassword);
        User savedUser = userRepository.save(newUser);
        notificationService.sendWelcomeEmail(savedUser.getEmail());
        return savedUser;
    }
}
```

---

## 9. Technology-Specific Notes
- **TypeScript / React**:
  - Keep UI components small; delegate business logic, fetching, and complex state calculations to custom hooks or service classes.
  - Avoid prop drilling; use context or state containers when props exceed 3 levels of pass-through.
- **Java / Spring Boot**:
  - Keep Controllers thin: they should only validate HTTP input and forward to `@Service` components.
  - Rely on Constructor Injection rather than field-level `@Autowired` to facilitate unit testing without Spring context.
- **C# / .NET**:
  - Leverage record types for immutable DTOs and value objects.
  - Use `IDisposable` and `using` statements strictly for unmanaged resource lifecycles.
- **Python**:
  - Adhere to the *Zen of Python* (PEP 20): "Explicit is better than implicit", "Flat is better than nested".
  - Use type hints (`typing`) to document function contracts clearly.

---

## 10. Practical Implementation Checklist
During local development and code reviews, verify:
- [ ] Every function performs a single, clearly understood purpose.
- [ ] No function has more than 3 levels of nested indentation.
- [ ] Magic numbers and magic strings are replaced with named constants or enums.
- [ ] Guard clauses are used to handle edge cases upfront.
- [ ] Code is formatted uniformly with automated linters/formatters (ESLint, Prettier, Spotless, etc.).
- [ ] Classes and modules communicate via clear interfaces/abstractions rather than tight concrete dependencies.
- [ ] No dead code, commented-out code snippets, or meaningless comments remain.

---

## 11. Common Mistakes and Exceptions
- **Over-Abstraction (Speculative Generality)**: Creating 5 layers of factories and interfaces for a simple requirement that will never vary. Abstraction has an inherent cost; introduce it when variation is real.
- **Micro-Optimization over Clarity**: Writing cryptic bitwise shifts or convoluted one-liners for negligible nanosecond gains at the expense of developer comprehension.
- **Valid Exception to DRY**: Test code often benefits from slight repetition (DAMP — *Descriptive And Meaningful Phrases*) to keep each test isolated, readable, and independent.

---

## 12. References to Authoritative Documentation
- Robert C. Martin — *Clean Code: A Handbook of Agile Software Craftsmanship*
- Martin Fowler — *Refactoring: Improving the Design of Existing Code* (2nd Edition): https://refactoring.com
- The Clean Code Primer & SOLID Principles: https://en.wikipedia.org/wiki/SOLID
- Google Java Style Guide: https://google.github.io/styleguide/javaguide.html
- Airbnb JavaScript/TypeScript Style Guide: https://github.com/airbnb/javascript

---

## 13. Related Documents Within This Library
- [01 — Naming Conventions](../../readme/NAMING_CONVENTION.md)
- [03 — Architecture & Design Patterns](./03-architecture-and-design-patterns.md)
- [05 — Testing & Quality Assurance](./05-testing-and-quality-assurance.md)
