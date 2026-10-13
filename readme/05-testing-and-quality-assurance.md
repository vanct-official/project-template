# 05 — Kiểm Thử & Đảm Bảo Chất Lượng (Testing & Quality Assurance)

## 1. Mục Đích Tài Liệu (Document Purpose)
Tài liệu này xác lập các tiêu chuẩn kiểm thử phần mềm, quy trình đảm bảo chất lượng (QA) và các cổng xác minh mã nguồn xuyên suốt các hệ thống Frontend, Backend và Mobile. Tài liệu cung cấp cho kỹ sư phương pháp luận toàn diện để xây dựng bộ test suite mạnh mẽ, ổn định, dễ bảo trì, đồng thời làm rõ bản chất của các chỉ số kiểm thử và thiết lập các cổng chất lượng thực tế.

---

## 2. Phạm Vi Áp Dụng (Scope and Applicability)
- **Hệ thống áp dụng**: Kiểm thử đơn vị (Unit Test), kiểm thử tích hợp (Integration Test), kiểm thử thành phần (Component Test), kiểm thử đầu cuối (End-to-End - E2E), kiểm thử hợp đồng (Contract Test) và kiểm thử hồi quy (Regression Test).
- **Đối tượng hướng đến**: Kỹ sư phần mềm, kỹ sư tự động hóa QA (Automation QA) và người đánh giá mã nguồn.
- **Giá trị cốt lõi**: Kiểm thử tự động là công cụ đòn bẩy nâng cao năng suất của kỹ sư. Một bộ test chất lượng cao giúp lập trình viên tự tin refactor mã nguồn, rút ngắn chu kỳ release và giữ vững tính ổn định trên môi trường Production.

---

## 3. Các Nguyên Tắc Cốt Lõi (Core Principles)
- **Thiết kế hướng tới khả năng kiểm thử (Testability by Design)**: Code khó viết test là dấu hiệu cảnh báo của lỗi kiến trúc (phụ thuộc cứng, biến toàn cục, logic bị ẩn giấu). Hãy thiết kế code theo dạng module rời rạc, độc lập ngay từ đầu.
- **Tính tất định, không chập chờn (Zero Flakiness)**: Một bài test phải luôn pass hoặc luôn fail với cùng một trạng thái mã nguồn. Các bài test chập chờn (Flaky Test) làm xói mòn lòng tin của đội ngũ và cần phải được sửa hoặc cách ly ngay lập tức.
- **Tính cô lập tuyệt đối (Test Isolation)**: Mỗi bài test phải chạy hoàn toàn độc lập. Bài test không bao giờ được phụ thuộc vào thứ tự thực thi hoặc dữ liệu dư thừa do bài test trước để lại trong cơ sở dữ liệu.
- **Vòng phản hồi nhanh (Fast Feedback Loop)**: Unit Test và Component Test phải thực thi xong trong vài giây để cung cấp phản hồi tức thì cho lập trình viên. Các bộ test tích hợp và E2E chậm hơn sẽ được giao cho pipeline CI tự động chạy.
- **Độ phủ (Coverage) $\ne$ Chất lượng (Quality)**: Tỷ lệ bao phủ code cao (ví dụ: 90%+) không chứng minh được phần mềm không có lỗi. Một bài test không có lệnh assert hoặc chỉ test hàm getter/setter tầm thường không mang lại giá trị bảo vệ nào. Hãy tập trung kiểm tra hành vi nghiệp vụ và các trường hợp biên.

---

## 4. Các Quy Tắc Và Tiêu Chuẩn (Rules and Standards)

### 4.1 Cấu Trúc Và Thực Thi Bài Test
1. **Cấu trúc Arrange-Act-Assert (AAA) (BẮT BUỘC - MUST)**: Mỗi bài test BẮT BUỘC phải chia thành 3 phần rõ ràng:
   - **Arrange (Chuẩn bị)**: Thiết lập dữ liệu mẫu, trạng thái khởi tạo và các mock cần thiết.
   - **Act (Thực thi)**: Gọi phương thức hoặc kích hoạt tương tác cần kiểm tra.
   - **Assert (Kiểm chứng)**: Xác minh kết quả trả về, sự thay đổi trạng thái hoặc lời gọi hàm mong đợi.
2. **Một khái niệm logic cho mỗi bài test (NÊN - SHOULD)**: Mỗi test case chỉ nên kiểm tra một khía cạnh hành vi duy nhất. Khi test fail, tên bài test phải chỉ ra chính xác điểm bị hỏng mà không cần mở debugger.
3. **Đặt tên bài test mang tính mô tả cao (BẮT BUỘC - MUST)**: Tên bài test phải nêu rõ: phương thức kiểm tra, kịch bản đầu vào và kết quả mong đợi (ví dụ: `calculateDiscount_whenVipCustomer_appliesTwentyPercentDiscount()`).

### 4.2 Chiến Lược Phân Bổ: Kim Tự Tháp Kiểm Thử (Test Pyramid)
Đội ngũ NÊN phân bổ số lượng test theo mô hình **Kim Tự Tháp Kiểm Thử**:
- **70% Unit Test & Component Test**: Nhanh, cô lập, kiểm tra thuật toán nghiệp vụ, hàm tiện ích và component giao diện trong bộ nhớ.
- **20% Integration Test & API Test**: Xác minh sự tương tác giữa các ranh giới (Repository gọi database thật, route HTTP, tầng cache, giao tiếp dịch vụ ngoài).
- **10% E2E & Smoke Test**: Giả lập các hành trình người dùng quan trọng nhất trên trình duyệt/thiết bị thực tế ở môi trường Staging.

### 4.3 Sử Dụng Đối Tượng Giả Lập (Mocks, Stubs, Spies)
1. **Mock tại các ranh giới ngoại vi (NÊN - SHOULD)**: Chỉ mock các hệ thống bên ngoài, chậm hoặc không xác định (cổng thanh toán, dịch vụ gửi SMS, đồng hồ hệ thống).
2. **Tuyệt đối không mock thực thể Domain (CẤM - MUST NOT)**: Không bao giờ mock các Value Object, DTO hoặc Entity tính toán nghiệp vụ. Hãy khởi tạo đối tượng thực tế.
3. **Tránh lạm dụng Mock (Over-Mocking)**: Những bài test kiểm tra quá chi tiết từng phương thức private bên trong sẽ bị vỡ vụn ngay khi mã nguồn được tái cấu trúc, dù hành vi hệ thống vẫn hoàn toàn đúng. Hãy tập trung kiểm tra kết quả đầu ra và sự thay đổi trạng thái.

---

## 5. Giải Thích Chi Tiết: Các Loại Hình Kiểm Thử

### 5.1 Phân Loại Các Cấp Độ Kiểm Thử
```text
      / \        E2E Tests (Cypress, Playwright) — Độ tin cậy cao, chạy chậm, chi phí lớn
     /   \
    /     \      Integration & Contract Tests (Testcontainers, Pact) — Kiểm tra ranh giới
   /       \
  /_________\    Unit & Component Tests (Jest, Vitest, JUnit) — Cực nhanh, cô lập, chi phí thấp
```

- **Unit Testing (Kiểm thử đơn vị)**: Kiểm tra một hàm, một lớp hoặc một module nhỏ nhất trong sự cô lập hoàn toàn khỏi I/O bên ngoài.
- **Integration Testing (Kiểm thử tích hợp)**: Xác minh hai hoặc nhiều module/dịch vụ hoạt động ăn khớp với nhau (ví dụ: Service tương tác với Database PostgreSQL thực tế).
- **Component Testing (Kiểm thử thành phần)**: Kiểm tra các component UI (React, Vue, Flutter) với các sự kiện giả lập của người dùng mà không cần mở trình duyệt đầy đủ.
- **Contract Testing (Kiểm thử hợp đồng - Pact)**: Xác minh bên cung cấp API (Provider) và bên tiêu thụ API (Consumer) tuân thủ đúng hợp đồng JSON đã thỏa thuận, tránh vỡ tích hợp giữa các nhóm.
- **End-to-End (E2E - Kiểm thử đầu cuối)**: Giả lập toàn bộ thao tác của người dùng xuyên suốt từ giao diện UI cho tới Database thật.
- **Smoke Testing (Kiểm thử khói)**: Bộ test tinh gọn chạy ngay sau khi triển khai hệ thống lên server để đảm bảo các dịch vụ quan trọng nhất đang sống bình thường trước khi mở cho người dùng.
- **Regression Testing (Kiểm thử hồi quy)**: Chạy lại toàn bộ test suite để đảm bảo tính năng mới hoặc bản vá lỗi không làm hỏng các tính năng cũ đang chạy ổn định.

### 5.2 Kiểm Thử Giá Trị Biên & Đường Dẫn Lỗi (Negative Testing)
Không bao giờ chỉ kiểm tra mỗi "kịch bản màu hồng" (Happy Path):
- **Phân hoạch tương đương (Equivalence Partitioning)**: Chia dữ liệu đầu vào thành các nhóm hợp lệ và không hợp lệ.
- **Phân tích giá trị biên (Boundary-Value Analysis)**: Kiểm tra ngay sát các mép biên (ví dụ: yêu cầu độ tuổi 18–65, cần test các giá trị: 17, 18, 19, 64, 65, và 66).
- **Kiểm thử đường dẫn lỗi (Negative Testing)**: Cố tình truyền vào chuỗi rỗng, giá trị null, số âm, token hết hạn để xác minh hệ thống từ chối an toàn và trả thông báo lỗi chính xác.

---

## 6. Độ Phủ Mã Nguồn Và Cổng Chất Lượng (Quality Gates)

### 6.1 Hiểu Đúng Về Code Coverage
- **Line Coverage (Phủ dòng)**: Tỷ lệ phần trăm số dòng code được chạy qua.
- **Branch Coverage (Phủ nhánh)**: Tỷ lệ phần trăm các nhánh quyết định (`if/else`, `switch`, vòng lặp) được thực thi. Chỉ số Phủ Nhánh có giá trị kiểm chứng thực tế cao hơn rất nhiều so với Phủ Dòng.
- **Mục tiêu thực tế**: Nhắm tới mức 70%–80% Branch Coverage cho các logic nghiệp vụ quan trọng. Việc ép buộc đạt 100% trên toàn bộ codebase thường dẫn tới việc viết test hình thức cho code boilerplate vô nghĩa.

### 6.2 Cổng Chất Lượng & Phân Tích Tĩnh (Quality Gates)
Tự động hóa việc kiểm tra chất lượng trong CI trước khi cho phép merge code:
- **Linters**: ESLint, Checkstyle, RuboCop, Rust Clippy.
- **Formatters**: Prettier, Spotless, Black.
- **Quét bảo mật & Lỗi tiềm ẩn**: SonarQube, SpotBugs, PMD, CodeQL, Gitleaks.
- **Cổng PR (Pull Request Gate)**: PR không được phép merge nếu Linter báo lỗi, có bài test bị fail hoặc tỷ lệ bao phủ trên code mới không đạt ngưỡng quy định.

---

## 7. Thực Hành Tốt Và Anti-Pattern Cần Tránh

| Anti-Pattern (Thói quen xấu ❌) | Giải pháp Kiểm Thử Chuẩn (✅) | Lý do |
| :--- | :--- | :--- |
| **Bài test nói dối (The Liar Test)**: Test luôn pass nhưng không hề có câu lệnh `assert` kiểm tra giá trị thực tế. | Luôn có lệnh so sánh giá trị kỳ vọng (expected) với kết quả thực tế (actual). | Test không thể fail thì không có giá trị bảo vệ. |
| **Sleep cứng trong test**: Dùng lệnh `sleep(5000)` để đợi thao tác bất đồng bộ hoàn thành. | Dùng cơ chế chờ sự kiện có điều kiện (`waitFor()`, `await expect()`). | Sleep cố định làm bộ test chậm chạp và dễ bị fail chập chờn khi CI tải nặng. |
| **Các bài test phụ thuộc nhau**: Bài test B ngầm định rằng bài test A đã tạo sẵn user trong database. | Mỗi bài test tự tạo dữ liệu mẫu độc lập và tự dọn dẹp sau khi kết thúc. | Tránh lỗi dây chuyền và cho phép chạy test song song tốc độ cao. |
| **Mock toàn bộ mọi thứ**: Mock cả repository, entity lẫn helper khiến bài test chỉ kiểm tra chính cái mock. | Dùng cấu trúc dữ liệu in-memory hoặc container tích hợp gọn nhẹ. | Ngăn ngừa việc viết các bài test vô ích chỉ để xác minh dây nối của mock. |

---

## 8. Ví Dụ Mã Nguồn Thực Tế (Code Examples)

### 8.1 So Sánh Test Tệ vs Test Tốt (JavaScript / Jest)
```javascript
// ❌ XẤU: Dễ vỡ, tên vô nghĩa, không kiểm tra logic thực chất, sleep cứng
test("test1", async () => {
  const service = new CartService();
  service.addItem({ id: 1, price: 100 });
  await new Promise(r => setTimeout(r, 2000)); // Sleep gây chập chờn
  expect(service).toBeDefined(); // Assertion tầm thường, không kiểm tra tính toán!
});

// ✅ TỐT: Cấu trúc AAA rõ ràng, tên mô tả cụ thể, kiểm tra đúng logic và trường hợp biên
describe("CartService - calculateTotal", () => {
  it("nên tính chính xác tổng tiền giỏ hàng kèm thuế và mã giảm giá hợp lệ", () => {
    // 1. Arrange (Chuẩn bị)
    const cartService = new CartService({ taxRate: 0.1 });
    cartService.addItem({ id: "item-1", price: 100, quantity: 2 });
    const discountCode = "SAVE10"; // Giảm 10%

    // 2. Act (Thực thi)
    const total = cartService.calculateTotal(discountCode);

    // 3. Assert (Kiểm chứng)
    // Giá gốc: 200, sau giảm 10%: 180, cộng 10% thuế: 198
    expect(total).toBe(198);
  });

  it("nên ném ra InvalidDiscountException khi mã giảm giá đã hết hạn", () => {
    // Arrange
    const cartService = new CartService({ taxRate: 0.1 });
    cartService.addItem({ id: "item-1", price: 50, quantity: 1 });

    // Act & Assert (Kiểm thử đường dẫn lỗi)
    expect(() => cartService.calculateTotal("EXPIRED_2020"))
      .toThrow(InvalidDiscountException);
  });
});
```

### 8.2 Kiểm Thử Tích Hợp Database Thật Bằng Testcontainers (Java / Spring Boot)
```java
// ✅ TỐT: Test tích hợp hoàn toàn cô lập chạy trên container PostgreSQL thật
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
        userRepository.deleteAll(); // Đảm bảo tính cô lập tuyệt đối cho mỗi test
    }

    @Test
    void nenLuuVaTimThayNguoiDungTheoEmail() {
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

## 9. Lưu Ý Theo Từng Công Nghệ Cụ Thể (Technology Notes)
- **React / Frontend**:
  - Dùng React Testing Library (RTL). Kiểm tra theo cách người dùng tương tác với DOM (theo nội dung văn bản, vai trò tiếp cận: `getByRole('button', { name: /xác nhận/i })`), không kiểm tra state nội bộ của component.
  - Tránh dùng Shallow Rendering; hãy render cây DOM hoàn chỉnh.
- **Node.js (Jest / Vitest)**:
  - Dùng Vitest cho các dự án phát triển trên Vite để đạt tốc độ chạy test tức thì.
  - Sử dụng thư viện `supertest` để kiểm thử tích hợp các route Express mà không cần mở port mạng thật.
- **Java (JUnit 5 & Mockito)**:
  - Tận dụng annotation `@Nested` trong JUnit 5 để phân nhóm bài test theo ngữ cảnh rõ ràng.
  - Dùng `@Spy` có chừng mực; ưu tiên `@Mock` cho các ranh giới ngoại vi và dùng instance thật cho các đối tượng nghiệp vụ.
- **Mobile (Flutter / React Native)**:
  - Triển khai Golden Test (Snapshot hình ảnh từng pixel giao diện) để tự động phát hiện các lỗi vỡ layout giao diện ngoài ý muốn.

---

## 10. Bảng Tự Kiểm Tra Thực Tế (Implementation Checklist)
- [ ] Các bài test tuân thủ nghiêm ngặt cấu trúc Arrange-Act-Assert (AAA).
- [ ] Tên bài test mô tả rõ kịch bản kiểm tra và kết quả kỳ vọng.
- [ ] Các trường hợp biên và đường dẫn lỗi được kiểm thử song song với luồng thành công.
- [ ] Tuyệt đối không dùng lệnh `sleep` cứng trong các bài test bất đồng bộ.
- [ ] Các test tích hợp database tự dọn dẹp sạch sẽ dữ liệu sau mỗi lần chạy.
- [ ] Toàn bộ bài test chạy và vượt qua 100% trên CI trước khi merge Pull Request.
- [ ] Linter và Formatter tự động kiểm tra cú pháp trên máy lập trình viên qua pre-commit hook hoặc CI.

---

## 11. Sai Lầm Phổ Biến Và Ngoại Lệ (Mistakes & Exceptions)
- **Viết test sau khi đã release lên Production**: Coi việc viết test là phụ khiến code không được thiết kế cho khả năng kiểm thử ngay từ đầu. Hãy viết test song song với tính năng.
- **Test cả tính năng sẵn có của ngôn ngữ**: Viết bài test để chứng minh hàm `push` của mảng JavaScript hoạt động bình thường hay getter của Java gán đúng trường. Hãy tập trung test *quy tắc nghiệp vụ*, không test trình biên dịch.
- **Làm ngơ trước Flaky Test**: Để mặc bài test chập chờn trên CI sẽ tập cho đội ngũ thói quen xấu là xem thường lỗi build ("chắc do mạng, cứ bấm chạy lại là xanh"). Cần cách ly và sửa ngay Flaky Test.

---

## 12. Tài Liệu Tham Khảo Uy Tín (References)
- Martin Fowler — *The Practical Test Pyramid*: https://martinfowler.com/articles/practical-test-pyramid.html
- Kent C. Dodds — *Testing Implementation Details*: https://kentcdodds.com/blog/testing-implementation-details
- Google Engineering Practices — *Testing on the Toilet*: https://testing.googleblog.com/
- Hướng dẫn JUnit 5: https://junit.org/junit5/docs/current/user-guide/
- Triết lý React Testing Library: https://testing-library.com/docs/guiding-principles

---

## 13. Các Tài Liệu Liên Quan Trong Bộ Tiêu Chuẩn
- [01 — Quy Chuẩn Đặt Tên Trong Lập Trình](./NAMING_CONVENTION.md)
- [02 — Nguyên Lý Clean Code & Thiết Kế Phần Mềm](./02-clean-code-and-design-principles.md)
- [06 — Quy Trình Git & Hợp Tác Nhóm](./06-git-workflow-and-team-collaboration.md)
