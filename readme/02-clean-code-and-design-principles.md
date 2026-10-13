# 02 — Nguyên Lý Clean Code & Thiết Kế Phần Mềm (Clean Code & Software Design Principles)

> **Cấp độ áp dụng**: BẮT BUỘC (MANDATORY)  
> **Trạng thái**: ĐÃ PHÊ DUYỆT (APPROVED) | **Phiên bản**: 2.0.0  
> **Phạm vi**: Toàn bộ dự án (React Frontend, Express Backend, Spring Boot Backend)

## 1. Mục Đích Tài Liệu (Document Purpose)
Tài liệu này xác lập các tiêu chuẩn viết code sạch (Clean Code), nguyên lý thiết kế phần mềm nền tảng và kỳ vọng chất lượng mã nguồn trên toàn bộ các dự án Web và Mobile. Mục tiêu nhằm tối đa hóa khả năng đọc hiểu, bảo trì, kiểm thử và năng suất làm việc của đội ngũ kỹ sư, đồng thời ngăn ngừa tình trạng thiết kế phức tạp hóa quá sớm (over-engineering).

---

## 2. Phạm Vi Áp Dụng (Scope and Applicability)
- **Lĩnh vực áp dụng**: Ứng dụng Web Frontend, Dịch vụ/API Backend, Ứng dụng di động (Mobile App iOS/Android/Cross-platform), công cụ CLI và các thư viện dùng chung.
- **Đối tượng hướng đến**: Toàn bộ kỹ sư phần mềm, Tech Lead và người đánh giá mã nguồn (Code Reviewer).
- **Tính độc lập công nghệ**: Các nguyên lý này áp dụng phổ quát cho lập trình hướng đối tượng (OOP), lập trình hàm (FP) và lập trình thủ tục trên TypeScript/JavaScript, Java, C#, Python, Go, Swift, Kotlin, Dart.

---

## 3. Các Nguyên Tắc Cốt Lõi (Core Principles)

### 3.1 Phân cấp: Nguyên lý, Quy tắc, Quy ước và Chỉ dẫn
Hiểu rõ sự khác biệt giữa 4 cấp độ này giúp tránh các tranh cãi giáo điều trong quá trình review code:
- **Nguyên lý (Principle)**: Những chân lý thiết kế nền tảng (ví dụ: SRP, DRY). Mang tính định hướng tư duy dài hạn, không quy định cú pháp cụ thể.
- **Quy tắc bắt buộc (Rule - MUST/MUST NOT)**: Các ràng buộc bắt buộc phải tuân thủ. Bất kỳ vi phạm nào cũng bị xem là lỗi kỹ thuật (ví dụ: "Không được hardcode mật khẩu/khóa bí mật", "Mọi method công khai phải kiểm tra tính hợp lệ của tham số").
- **Quy ước thống nhất (Convention)**: Thỏa thuận chung của dự án hoặc ngôn ngữ để đảm bảo tính đồng bộ (ví dụ: dùng `camelCase` cho biến, dùng BEM cho CSS).
- **Chỉ dẫn gợi ý (Guideline - SHOULD/MAY)**: Lời khuyên thực hành tốt nhất. Có tính ngữ cảnh tùy thuộc vào độ phức tạp và quy mô của hệ thống.

### 3.2 Tư Duy Lập Trình Nền Tảng
- **Dễ đọc quan trọng hơn ngắn gọn (Readability Over Cleverness)**: Mã nguồn được đọc nhiều hơn ít nhất 10 lần so với lúc được viết ra. Luôn tối ưu code cho người bảo trì tương lai.
- **KISS (Keep It Simple, Stupid)**: Ưu tiên giải pháp đơn giản, trực diện. Sự phức tạp không cần thiết là một món nợ kỹ thuật.
- **DRY (Don't Repeat Yourself)**: Mỗi phần logic nghiệp vụ chỉ nên có một đại diện duy nhất, rõ ràng trong toàn hệ thống.
  > *Lưu ý*: DRY nhằm chống trùng lặp tri thức nghiệp vụ, không phải trùng lặp cấu trúc ngẫu nhiên. Hai hàm có cấu trúc tương tự nhưng lý do thay đổi nghiệp vụ hoàn toàn khác nhau thì không nên gộp ép uổng.
- **YAGNI (You Aren't Gonna Need It)**: Chỉ lập trình tính năng khi thực sự cần tới ở hiện tại, không lập trình dựa trên suy đoán tương lai.
- **Phân tách các mối quan tâm (Separation of Concerns - SoC)**: Chia nhỏ phần mềm thành các phần tách biệt, mỗi phần đảm nhận một nhiệm vụ độc lập (ví dụ: logic nghiệp vụ tách biệt hoàn toàn khỏi tầng giao vận HTTP).
- **Gắn kết nội tại cao & Phụ thuộc lỏng lẻo (High Cohesion & Low Coupling)**:
  - *High Cohesion*: Các thành phần bên trong một module/class liên kết chặt chẽ và phục vụ cùng một mục tiêu thống nhất.
  - *Low Coupling*: Các module giao tiếp với nhau qua các giao diện hợp đồng tối thiểu, không phụ thuộc vào chi tiết cài đặt nội bộ của nhau.

---

## 4. Các Quy Tắc Và Tiêu Chuẩn (Rules and Standards)

### 4.1 Hàm Và Phương Thức (Functions & Methods)
1. **Đơn trách nhiệm (BẮT BUỘC - MUST)**: Mỗi hàm CHỈ ĐƯỢC thực hiện một nhiệm vụ logic duy nhất và làm thật tốt nhiệm vụ đó.
2. **Kích thước ngắn gọn (NÊN - SHOULD)**: Hàm NÊN có độ dài dưới 20–30 dòng code. Hàm vượt quá 50 dòng BẮT BUỘC phải được xem xét chia nhỏ.
3. **Giới hạn số lượng tham số (NÊN - SHOULD)**: Hàm NÊN nhận tối đa 3 tham số. Nếu cần nhiều hơn, hãy gom chúng vào một Object tham số có định kiểu hoặc DTO.
4. **Hàm thuần khiết & Dễ dự đoán (NÊN - SHOULD)**: Ưu tiên Pure Functions (không gây side-effect, kết quả trả về chỉ phụ thuộc vào đầu vào) cho các thuật toán xử lý dữ liệu.
5. **Không dùng tham số cờ Boolean (KHÔNG NÊN - SHOULD NOT)**: Truyền tham số cờ boolean (ví dụ: `processUser(user, true)`) chứng tỏ hàm đang làm 2 việc khác nhau. Hãy tách thành 2 hàm rõ nghĩa (ví dụ: `processUser()` và `processAdminUser()`).

### 4.2 Luồng Điều Khiển Và Độ Phức Tạp (Control Flow)
1. **Guard Clauses / Trả về sớm (BẮT BUỘC - MUST)**: Xử lý các trường hợp biên, lỗi và dữ liệu không hợp lệ ngay đầu hàm rồi `return` sớm để triệt tiêu các khối `if-else` lồng nhau.
2. **Độ sâu lồng nhau tối đa (BẮT BUỘC - MUST)**: Code KHÔNG ĐƯỢC lồng quá 3 cấp thụt lề (`if`, `for`, `try`). Cần refactor các khối lồng sâu thành hàm con.
3. **Không dùng Magic Numbers hoặc Magic Strings (BẮT BUỘC - MUST)**: Các giá trị số, thời gian timeout, mã trạng thái kinh doanh BẮT BUỘC phải đặt tên hằng số hoặc dùng Enum.

### 4.3 Xử Lý Lỗi (Error Handling)
1. **Không nuốt ngoại lệ (CẤM - MUST NOT)**: Tuyệt đối không để khối `catch` rỗng hoặc chỉ log im lặng mà không xử lý. Phải xử lý, chuyển đổi hoặc ném lỗi rõ ràng.
2. **Dùng ngoại lệ có định kiểu / tùy biến (NÊN - SHOULD)**: Ném các ngoại lệ nghiệp vụ cụ thể thay vì lỗi chung chung (ví dụ: `UserNotFoundException` thay vì `Error`).
3. **Dọn dẹp tài nguyên sạch sẽ (BẮT BUỘC - MUST)**: Luôn giải phóng tài nguyên bên ngoài (file, kết nối database, network socket) bằng các cấu trúc an toàn (`try-with-resources` trong Java, `using` trong C#, `defer` trong Go, `finally` trong JS).

### 4.4 Chú Thích Mã Nguồn (Comments & Documentation)
1. **Giải thích "Tại sao", không giải thích "Làm gì" (BẮT BUỘC - MUST)**: Cấu trúc code và tên gọi phải tự giải thích code đang *làm gì*. Chú thích chỉ dành để giải thích *tại sao* lựa chọn giải pháp khác thường này hoặc ghi chú quy tắc nghiệp vụ đặc biệt.
2. **Không để lại mã nguồn chết (BẮT BUỘC - MUST)**: Tuyệt đối không để lại các đoạn code bị comment trong nhánh sản phẩm. Hãy tin tưởng vào lịch sử Git.

---

## 5. Giải Thích Chi Tiết: Các Nguyên Lý SOLID

### S — Single Responsibility Principle (SRP - Đơn trách nhiệm)
*Một class, module hoặc hàm chỉ nên có một và chỉ một lý do duy nhất để thay đổi.*
- **Ứng dụng**: Tránh các "God Class" ôm đồm từ kiểm tra dữ liệu, viết câu lệnh SQL, xử lý logic thanh toán cho tới gửi email trong cùng một file.

### O — Open/Closed Principle (OCP - Đóng mở)
*Các thực thể phần mềm nên mở rộng cho việc phát triển thêm, nhưng đóng lại đối với việc chỉnh sửa mã nguồn có sẵn.*
- **Ứng dụng**: Thêm tính năng mới bằng cách bổ sung class mới, strategy mới hoặc plugin mới, thay vì sửa đổi các câu lệnh `switch-case` hoặc chuỗi `if-else` phức tạp trong code lõi.

### L — Liskov Substitution Principle (LSP - Thay thế Liskov)
*Các lớp con phải có khả năng thay thế hoàn toàn cho lớp cha mà không làm thay đổi tính đúng đắn của chương trình.*
- **Ứng dụng**: Lớp con phải tuân thủ nghiêm ngặt hợp đồng của lớp cha, không được ném ra `NotImplementedException` hoặc thay đổi các điều kiện tiên quyết dự kiến.

### I — Interface Segregation Principle (ISP - Phân tách Interface)
*Client không nên bị ép buộc phải phụ thuộc vào các interface mà nó không sử dụng.*
- **Ứng dụng**: Ưu tiên nhiều interface nhỏ, chuyên biệt thay vì một interface khổng lồ với hàng chục phương thức không liên quan.

### D — Dependency Inversion Principle (DIP - Đảo ngược phụ thuộc)
*Các module cấp cao không nên phụ thuộc vào các module cấp thấp; cả hai nên phụ thuộc vào abstraction (giao diện trừu tượng). Abstraction không nên phụ thuộc vào chi tiết; chi tiết phải phụ thuộc vào abstraction.*
- **Ứng dụng**: Tách rời các dịch vụ nghiệp vụ khỏi hạ tầng cụ thể (driver database, thư viện gửi SMS, SDK thanh toán) thông qua các Interface.

---

## 6. Ưu Tiên Composition Hơn Inheritance (Ủy Thác Hơn Kế Thừa)
Kế thừa (Inheritance) liên kết chặt chẽ lớp con với cấu trúc bên trong của lớp cha (vấn đề "Fragile Base Class").
- **Ưu tiên Composition**: Tạo lập hành vi bằng cách giữ tham chiếu đến các đối tượng thành phần thay vì xây dựng cây kế thừa sâu nhiều tầng.
- **Chỉ dẫn**: Chỉ dùng kế thừa khi có mối quan hệ bản chất "là một" (is-a) rõ ràng và cần đa hình. Khi muốn tái sử dụng code, hãy dùng Composition ("có một" - has-a).

---

## 7. Thực Hành Tốt Và Anti-Pattern Cần Tránh

| Danh mục | Anti-Pattern (Thói quen xấu ❌) | Giải pháp Clean Code (Thực hành tốt ✅) | Lý do |
| :--- | :--- | :--- | :--- |
| **Luồng điều khiển** | Arrow Anti-Pattern (Code hình mũi tên, lồng 4-5 tầng `if`) | Dùng Guard Clauses (Return sớm ngay đầu hàm) | Giảm gánh nặng nhận thức, làm rõ nhánh lỗi và nhánh thành công. |
| **Hằng số** | Viết trực tiếp giá trị: `if (status === 3)` hoặc `setTimeout(..., 86400000)` | Đặt tên hằng số: `OrderStatus.SHIPPED`, `ONE_DAY_IN_MS` | Tránh nhầm lẫn, dễ bảo trì khi giá trị thay đổi. |
| **Trạng thái** | Temporal Coupling (Bắt buộc phải gọi `init()` rồi mới gọi `run()`) | Đưa tham số vào hàm khởi tạo (Constructor) hoặc dùng Builder Pattern | Ngăn ngừa lỗi runtime do gọi hàm sai thứ tự. |
| **Trùng lặp** | Trừu tượng hóa quá sớm: Gộp ép 2 chức năng khác nhau vào 1 hàm generic rối rắm | Chấp nhận trùng lặp ngẫu nhiên cho đến khi quy luật xuất hiện 3 lần (Rule of Three) | Trừu tượng hóa sai còn gây tốn kém hơn việc trùng lặp code đơn thuần. |
| **Độ phức tạp** | Vẽ thêm tính năng dự phòng cho tương lai xa | YAGNI: Viết giải pháp đơn giản nhất đáp ứng đúng yêu cầu hiện tại | Giảm thiểu chi phí bảo trì và độ phức tạp dư thừa. |

---

## 8. Ví Dụ Mã Nguồn Thực Tế (Code Examples)

### 8.1 Guard Clauses vs Conditionals Lồng Nhau (TypeScript / JavaScript)
```typescript
// ❌ XẤU: Mã nguồn lồng sâu dạng mũi tên (Cognitive Load rất cao)
function processPaymentBad(user: User | null, amount: number): PaymentResult {
  if (user !== null) {
    if (user.isActive) {
      if (amount > 0) {
        if (user.balance >= amount) {
          user.balance -= amount;
          return { success: true, message: "Thanh toán thành công" };
        } else {
          return { success: false, message: "Số dư không đủ" };
        }
      } else {
        return { success: false, message: "Số tiền không hợp lệ" };
      }
    } else {
      return { success: false, message: "Tài khoản bị khóa" };
    }
  } else {
    return { success: false, message: "Người dùng không tồn tại" };
  }
}

// ✅ TỐT: Sử dụng Guard Clauses để xử lý và return sớm
function processPaymentGood(user: User | null, amount: number): PaymentResult {
  if (!user) {
    return { success: false, message: "Người dùng không tồn tại" };
  }
  if (!user.isActive) {
    return { success: false, message: "Tài khoản bị khóa" };
  }
  if (amount <= 0) {
    return { success: false, message: "Số tiền không hợp lệ" };
  }
  if (user.balance < amount) {
    return { success: false, message: "Số dư không đủ" };
  }

  user.balance -= amount;
  return { success: true, message: "Thanh toán thành công" };
}
```

### 8.2 Đơn Trách Nhiệm & Đảo Ngược Phụ Thuộc (Java / Spring)
```java
// ❌ XẤU: Vi phạm SRP & DIP (Controller tự băm mật khẩu, tự viết SQL, tự gửi email)
public class BadUserController {
    public void registerUser(String email, String password) {
        if (!email.contains("@")) throw new IllegalArgumentException("Email sai định dạng");
        String hash = BCrypt.hashpw(password, BCrypt.gensalt());
        DriverManager.getConnection("jdbc:...").createStatement()
            .executeUpdate("INSERT INTO users VALUES ('" + email + "', '" + hash + "')");
        SmtpClient.sendEmail(email, "Chào mừng thành viên mới!");
    }
}

// ✅ TỐT: Tuân thủ SRP & DIP với Service, Repository và Interface chuyên biệt
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

## 9. Lưu Ý Theo Từng Công Nghệ Cụ Thể (Technology Notes)
- **TypeScript / React**:
  - Giữ các Component giao diện nhỏ gọn; chuyển logic tính toán phức tạp, gọi API và quản lý state vào Custom Hooks hoặc Service class.
  - Tránh truyền props qua quá 3 tầng (prop drilling); hãy dùng React Context hoặc thư viện quản lý state (Zustand, Redux).
- **Java / Spring Boot**:
  - Giữ Controller mỏng (Skinny Controller): Controller chỉ kiểm tra cú pháp request và gọi `@Service`.
  - Dùng Constructor Injection thay vì gắn `@Autowired` trực tiếp lên field để thuận tiện cho việc viết Unit Test không cần nạp Spring context.
- **C# / .NET**:
  - Tận dụng kiểu `record` cho các DTO và Value Object bất biến.
  - Sử dụng cấu trúc `using` và `IDisposable` nghiêm ngặt cho việc giải phóng tài nguyên.
- **Python**:
  - Tuân thủ triết lý *Zen of Python* (PEP 20): "Rõ ràng tốt hơn ngầm định", "Phẳng tốt hơn lồng nhau".
  - Sử dụng Type Hints (`typing`) để định nghĩa rõ ràng hợp đồng dữ liệu của hàm.

---

## 10. Bảng Tự Kiểm Tra Thực Tế (Implementation Checklist)
Trong quá trình code và review PR, hãy kiểm tra:
- [ ] Mỗi hàm chỉ thực hiện một nhiệm vụ logic rõ ràng.
- [ ] Không có hàm nào lồng quá 3 cấp thụt lề (`if`, `for`).
- [ ] Các giá trị Magic Number và Magic String đã được thay thế bằng hằng số hoặc Enum.
- [ ] Dùng Guard Clauses xử lý các trường hợp ngoại lệ ngay đầu hàm.
- [ ] Mã nguồn được format tự động thống nhất qua Linter/Formatter (ESLint, Prettier, Spotless).
- [ ] Các class giao tiếp qua Interface/Abstraction thay vì phụ thuộc cứng vào đối tượng cụ thể.
- [ ] Không còn đoạn code nào bị comment hay chú thích vô nghĩa tồn đọng.

---

## 11. Sai Lầm Phổ Biến Và Ngoại Lệ (Mistakes & Exceptions)
- **Trừu tượng hóa quá đà (Speculative Generality)**: Tạo ra hàng tá Factory, Interface, Adapter cho một tính năng CRUD đơn giản không bao giờ thay đổi. Trừu tượng hóa luôn đi kèm chi phí; chỉ tạo ra khi có sự biến thiên thực sự.
- **Tối ưu hóa vi mô làm hỏng độ rõ ràng**: Viết code rút gọn phức tạp hoặc thao tác bit khó hiểu chỉ để tiết kiệm vài nano-giây nhưng khiến cả team mất hàng giờ để đọc hiểu.
- **Ngoại lệ hợp lý đối với DRY**: Trong mã nguồn kiểm thử (Test Code), việc lặp lại nhẹ (nguyên lý DAMP - *Descriptive And Meaningful Phrases*) đôi khi được khuyến khích để mỗi bài test giữ được tính độc lập và trực quan.

---

## 12. Tài Liệu Tham Khảo Uy Tín (References)
- Robert C. Martin — *Clean Code: A Handbook of Agile Software Craftsmanship*
- Martin Fowler — *Refactoring: Improving the Design of Existing Code* (2nd Edition): https://refactoring.com
- Tổng hợp nguyên lý SOLID: https://en.wikipedia.org/wiki/SOLID
- Google Java Style Guide: https://google.github.io/styleguide/javaguide.html
- Airbnb JavaScript/TypeScript Style Guide: https://github.com/airbnb/javascript

---

## 13. Các Tài Liệu Liên Quan Trong Bộ Tiêu Chuẩn

| Số thứ tự | Tên tài liệu chuẩn hóa | Trọng tâm kỹ thuật |
| :---: | :--- | :--- |
| **Portal** | [Cổng Tiêu Chuẩn Kỹ Thuật Dự Án](./README.md) | Khung kiến trúc tổng thể, quy trình RFC & ma trận đọc hiểu |
| **01** | [Quy Chuẩn Đặt Tên & Cú Pháp Mã Nguồn](./01-naming-conventions-and-syntax-standards.md) | Intention-revealing, Case styles, Bảng tra cứu đa ngôn ngữ |
| **02** | **Nguyên Lý Clean Code & Thiết Kế Phần Mềm** *(Tài liệu này)* | SOLID, KISS, DRY, Guard clauses, Quản lý độ phức tạp |
| **03** | [Kiến Trúc & Mẫu Thiết Kế Phần Mềm](./03-architecture-and-design-patterns.md) | Phân tầng Layered, Hexagonal, Dependency Injection, ADR |
| **04** | [Bảo Mật & Toàn Vẹn Dữ Liệu](./04-security-and-data-integrity.md) | OWASP Top 10, Zero Trust, RBAC/BOLA, Mã hóa & Secrets |
| **05** | [Kiểm Thử & Đảm Bảo Chất Lượng](./05-testing-and-quality-assurance.md) | Test Pyramid, AAA Pattern, Zero-flakiness, Quality Gates |
| **06** | [Quy Trình Git & Hợp Tác Nhóm](./06-git-workflow-and-team-collaboration.md) | Conventional Commits, Phân nhánh, Code Review Checklist |
| **07** | [Thiết Kế API & Cơ Sở Dữ Liệu](./07-api-design-and-database-principles.md) | RESTful contracts, Idempotency, Indexing, Transactions |
| **08** | [Hiệu Năng, Khả Năng Tiếp Cận & Vận Hành](./08-performance-accessibility-and-operations.md) | Core Web Vitals, a11y WCAG 2.2 AA, SRE & Observability |
