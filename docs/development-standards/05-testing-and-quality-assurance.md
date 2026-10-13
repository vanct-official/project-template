# 05 — Testing & Quality Assurance

## 1. Document Purpose
This document establishes comprehensive software testing standards, quality assurance (QA) practices, and verification workflows across frontend, backend, and mobile systems. It provides engineers with clear methodologies to produce robust, deterministic, maintainable tests, while demystifying test metrics and establishing pragmatic quality gates.

---

## 2. Scope and Applicability
- **Applicability**: Unit, integration, component, end-to-end (E2E), contract, and regression test suites across modern tech stacks.
- **Audience**: Software engineers, QA automation engineers, and code reviewers.
- **Core Truth**: Automated testing is an engineering productivity tool. High-quality tests enable fearless refactoring, rapid deployment cycles, and stable production environments.

---

## 3. Core Principles
- **Testability by Design**: Code that is difficult to test indicates architectural deficiencies (e.g., tight coupling, global state, hidden dependencies). Design code to be modular, decoupled, and testable from the outset.
- **Determinism (Zero Flakiness)**: A test must either always pass or always fail for the same code state. Flaky tests erode developer trust and must be repaired or quarantined immediately.
- **Test Isolation**: Every test must run in complete independence. Tests must never rely on execution order or side effects left in databases/memory by preceding tests.
- **Fast Feedback Loop**: Unit and component tests must execute within seconds to provide immediate feedback during local development. Slower integration and E2E suites run in automated CI pipelines.
- **Coverage $\ne$ Quality**: High code coverage percentages (e.g., 90%+) do not prove software correctness. A test asserting nothing or testing trivial getters provides zero defect protection. Focus on meaningful behavioral assertions and boundary cases.

---

## 4. Rules and Standards

### 4.1 Test Structure & Execution
1. **Arrange-Act-Assert (AAA) (MUST)**: Every test MUST be organized into three distinct phases:
   - **Arrange**: Set up test fixtures, state, and mocks.
   - **Act**: Invoke the specific method or interaction under test.
   - **Assert**: Verify expected outcomes, state mutations, or message dispatches.
2. **One Logical Concept per Test (SHOULD)**: A single test should verify one behavioral aspect. If a failure occurs, the test name should pinpoint exactly what broke without requiring debugger inspection.
3. **Descriptive Test Naming (MUST)**: Names must state what is being tested, the scenario/input, and the expected result (e.g., `calculateDiscount_whenVipCustomer_appliesTwentyPercentDiscount()`).

### 4.2 Test Pyramid & Distribution Strategy
Teams SHOULD distribute automated tests roughly according to the **Test Pyramid**:
- **70% Unit & Component Tests**: Fast, isolated, testing business algorithms, utilities, and individual UI components in memory.
- **20% Integration & API Tests**: Verifying interactions across boundaries (database repositories, HTTP routes, cache layers, external services).
- **10% End-to-End (E2E) & Smoke Tests**: Testing critical user journeys through real browsers/devices against staging environments.

### 4.3 Test Doubles (Mocks, Stubs, Spies)
1. **Mock at Boundaries (SHOULD)**: Mock external, slow, or non-deterministic systems (payment gateways, third-party SMS APIs, current clock timestamps).
2. **Do Not Mock Domain Entities (MUST NOT)**: Never mock simple value objects, DTOs, or domain calculations. Use authentic instances.
3. **Avoid Over-Mocking**: Tests that verify every internal private method call via rigid mock verifications break when implementation details change, even if behavior remains correct. Verify outputs and state, not private mechanics.

---

## 5. Detailed Explanations: Test Types & Techniques

### 5.1 Test Types Taxonomy
```text
      / \        E2E Tests (Cypress, Playwright) — High confidence, slow, expensive
     /   \
    /     \      Integration & Contract Tests (Testcontainers, Pact) — Boundary checks
   /       \
  /_________\    Unit & Component Tests (Jest, Vitest, JUnit) — Fast, isolated, cheap
```

- **Unit Testing**: Tests an individual function, class, or module in total isolation from external I/O.
- **Integration Testing**: Verifies that two or more modules, services, or storage engines operate correctly together (e.g., Service interacting with a live Postgres database).
- **Component Testing**: Tests UI components (React/Vue/Flutter) with simulated user events without booting a full browser backend.
- **Contract Testing (Pact)**: Verifies that an API provider and API consumer adhere to an agreed-upon payload contract, avoiding broken schemas across team boundaries.
- **End-to-End (E2E)**: Simulates real end-user interactions across the full running stack from UI to Database.
- **Smoke Testing**: A minimal suite executed immediately after a deployment to confirm core services are alive and accessible before traffic is shifted.
- **Regression Testing**: Re-running existing test suites to ensure new bug fixes or features have not degraded existing capabilities.

### 5.2 Negative & Boundary-Value Testing
Never test solely the "happy path":
- **Equivalence Partitioning**: Group inputs into valid and invalid classes.
- **Boundary-Value Analysis**: Test right at the edges (e.g., for an age limit of 18–65, test 17, 18, 19, 64, 65, and 66).
- **Negative Testing**: Intentionally pass malformed strings, nulls, negative quantities, expired tokens, and verify that the system gracefully handles and rejects them.

---

## 6. Code Coverage and Static Analysis

### 6.1 Understanding Code Coverage
- **Line Coverage**: Percent of executed lines.
- **Branch Coverage**: Percent of decision branches (`if/else`, `switch`, loops) traversed. Branch coverage is vastly superior to line coverage.
- **Healthy Target**: Aim for 70%–80% branch coverage on core business logic and services. Mandating 100% universal coverage often drives engineers to write low-value tests for boilerplate code.

### 6.2 Quality Gates & Static Analysis
Automate quality verification in CI pipelines prior to merge:
- **Linters**: ESLint, Checkstyle, RuboCop, Rust Clippy.
- **Formatters**: Prettier, Spotless, Black, rustfmt.
- **Security & Bug Scanners**: SonarQube, SpotBugs, PMD, CodeQL, Gitleaks.
- **Pull Request Quality Gate**: PRs must not merge if linters report errors, any test fails, or coverage on new code drops below established threshold.

---

## 7. Good Practices and Anti-Patterns

| Anti-Pattern (Bad Practice ❌) | Clean Alternative (Good Practice ✅) | Why it matters |
| :--- | :--- | :--- |
| **The Liar Test**: Test passes without asserting any actual value or state change. | Explicit assertions comparing expected output vs actual output. | Tests that cannot fail provide a false sense of security. |
| **Sleeping in Tests**: Using `sleep(5000)` to wait for asynchronous events. | Polling / Awaiting deterministic conditions (e.g., `waitFor()`, `await expect()`). | Hard sleeps make suites sluggish and cause intermittent CI failures. |
| **Test Interdependence**: Test B assumes Test A created a specific user in the database. | Each test creates its own independent test fixture and cleans up afterwards. | Prevents cascading failures and enables parallel test execution. |
| **Mocking Everything**: Mocking the repository, entity, and helper so the test only tests the mock. | Use real in-memory data structures or lightweight integration containers. | Prevents writing useless tests that only verify mock wiring. |

---

## 8. Code Examples

### 8.1 Bad Test vs. Good Test (JavaScript / Jest)
```javascript
// ❌ BAD: Fragile, non-descriptive, asserts nothing of substance, hardcoded sleep
test("test1", async () => {
  const service = new CartService();
  service.addItem({ id: 1, price: 100 });
  await new Promise(r => setTimeout(r, 2000)); // Flaky sleep
  expect(service).toBeDefined(); // Trivial assertion: does not verify calculation!
});

// ✅ GOOD: Structured AAA, clear naming, deterministic assertion, boundary case tested
describe("CartService - calculateTotal", () => {
  it("should calculate total amount with applicable tax and discount for active cart", () => {
    // 1. Arrange
    const cartService = new CartService({ taxRate: 0.1 });
    cartService.addItem({ id: "item-1", price: 100, quantity: 2 });
    const discountCode = "SAVE10"; // 10% discount

    // 2. Act
    const total = cartService.calculateTotal(discountCode);

    // 3. Assert
    // Base: 200, After 10% discount: 180, With 10% tax: 198
    expect(total).toBe(198);
  });

  it("should throw InvalidDiscountException when expired discount code is provided", () => {
    // Arrange
    const cartService = new CartService({ taxRate: 0.1 });
    cartService.addItem({ id: "item-1", price: 50, quantity: 1 });

    // Act & Assert (Negative Testing)
    expect(() => cartService.calculateTotal("EXPIRED_2020"))
      .toThrow(InvalidDiscountException);
  });
});
```

### 8.2 Integration Test with Real Database (Java / Spring Boot + Testcontainers)
```java
// ✅ GOOD: Isolated integration test running against real containerized PostgreSQL
@SpringBootTest
@Testcontainers
class UserRepositoryIntegrationTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void cleanUp() {
        userRepository.deleteAll(); // Guarantee test isolation
    }

    @Test
    void shouldPersistAndRetrieveUserByEmail() {
        // Arrange
        User user = new User("developer@company.com", "Dev User");

        // Act
        userRepository.save(user);
        Optional<User> found = userRepository.findByEmail("developer@company.com");

        // Assert
        assertThat(found).isPresent();
        assertThat(found.get().getName()).isEqualTo("Dev User");
    }
}
```

---

## 9. Technology-Specific Notes
- **React / Frontend**:
  - Use React Testing Library (RTL). Test how users interact with the DOM (by text, accessible role: `getByRole('button', { name: /submit/i })`), not component internal state.
  - Avoid shallow rendering; test rendered DOM output.
- **Node.js (Jest / Vitest)**:
  - Utilize Vitest for Vite-based projects for instant HMR execution.
  - Use `supertest` for Express route integration testing without binding to active network ports.
- **Java (JUnit 5 & Mockito)**:
  - Prefer JUnit 5 `@Nested` classes to group tests logically by method or scenario.
  - Use `@Spy` sparingly; favor `@Mock` for boundaries and real instances for POJOs.
- **Mobile (Flutter / React Native)**:
  - Implement golden tests (snapshot testing of rendered pixels) to catch unintended UI visual regressions.

---

## 10. Practical Implementation Checklist
- [ ] Tests follow the Arrange-Act-Assert (AAA) pattern.
- [ ] Test names clearly communicate scenario and expected behavior.
- [ ] Negative paths and edge boundaries are tested alongside the happy path.
- [ ] No hardcoded `sleep` or timers are used in asynchronous tests.
- [ ] Database integration tests clean up state after each run to ensure isolation.
- [ ] Tests run and pass cleanly in CI before merging pull requests.
- [ ] Automated linters and formatters execute in pre-commit hooks or CI.

---

## 11. Common Mistakes and Exceptions
- **Writing Tests After Deployment**: Treating tests as an afterthought leads to untestable architecture. Write tests alongside feature code.
- **Testing Language Features**: Writing tests to prove that JavaScript arrays append items or that Java getters return the assigned field. Test *business rules*, not the compiler.
- **Ignoring Flaky Tests**: Leaving a flaky test in CI teaches the team to ignore test failures ("just restart the build"). Quarantining and fixing flakiness is mandatory.

---

## 12. References to Authoritative Documentation
- Martin Fowler — *The Practical Test Pyramid*: https://martinfowler.com/articles/practical-test-pyramid.html
- Kent C. Dodds — *Testing Implementation Details*: https://kentcdodds.com/blog/testing-implementation-details
- Google Engineering Practices — *Testing on the Toilet*: https://testing.googleblog.com/
- JUnit 5 User Guide: https://junit.org/junit5/docs/current/user-guide/
- Testing Library Philosophy: https://testing-library.com/docs/guiding-principles

---

## 13. Related Documents Within This Library
- [01 — Naming Conventions](../../readme/NAMING_CONVENTION.md)
- [02 — Clean Code & Software Design Principles](./02-clean-code-and-design-principles.md)
- [06 — Git Workflow & Team Collaboration](./06-git-workflow-and-team-collaboration.md)
