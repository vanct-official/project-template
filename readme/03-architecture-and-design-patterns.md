# 03 — Kiến Trúc & Mẫu Thiết Kế (Architecture & Design Patterns)

> **Cấp độ áp dụng**: BẮT BUỘC (MANDATORY)  
> **Trạng thái**: ĐÃ PHÊ DUYỆT (APPROVED) | **Phiên bản**: 2.0.0  
> **Phạm vi**: Toàn bộ dự án (React Frontend, Express Backend, Spring Boot Backend)

## 1. Mục Đích Tài Liệu (Document Purpose)
Tài liệu này xác lập các tiêu chuẩn cấu trúc hệ thống, ranh giới giữa các module và mẫu thiết kế kiến trúc (Architecture & Design Patterns) cho các ứng dụng Web và Mobile hiện đại. Tài liệu cung cấp cho kỹ sư khung tư duy rõ ràng để tổ chức mã nguồn, phân định trách nhiệm các tầng và lựa chọn mẫu thiết kế phù hợp mà không gây phức tạp hóa các hệ thống nhỏ.

---

## 2. Phạm Vi Áp Dụng (Scope and Applicability)
- **Hệ thống áp dụng**: Từ các dự án MVP quy mô nhỏ, ứng dụng đơn trang (SPA) đến các hệ thống Monolith dạng module hóa (Modular Monolith) và kiến trúc phân tán (Microservices).
- **Đối tượng hướng đến**: Kỹ sư Fullstack, kỹ sư Frontend, kiến trúc sư Backend và lập trình viên Mobile.
- **Nguyên lý chủ đạo**: Kiến trúc sinh ra để phục vụ bài toán kinh doanh. Tuyệt đối không áp đặt các tầng trừu tượng phức tạp hay chia nhỏ microservices khi quy mô dự án và cấu trúc đội ngũ chưa thực sự đòi hỏi.

---

## 3. Các Nguyên Tắc Cốt Lõi (Core Principles)
- **Phân tách các tầng (Separation of Layers)**: Mỗi tầng kiến trúc đảm nhận một nhiệm vụ riêng biệt và chỉ giao tiếp với các tầng liền kề được phép.
- **Dòng phụ thuộc một chiều (Unidirectional Dependency Flow)**: Mọi sự phụ thuộc phải hướng vào trong (về phía logic nghiệp vụ cốt lõi), hoặc đi thẳng từ trên xuống dưới qua các tầng.
- **Ranh giới tường minh (Explicit Boundaries)**: Mỗi module phải đóng gói chi tiết cài đặt nội bộ và chỉ công khai các giao diện API ổn định, có tài liệu rõ ràng.
- **Tiến hóa thực tế (Pragmatic Evolution)**: Bắt đầu từ kiến trúc đơn giản nhất có thể vận hành tốt (thường là Layered Monolith hoặc Modular Monolith) và chỉ tái cấu trúc phân tán khi nghiệp vụ đạt độ chín muồi.
- **Ngăn ngừa phụ thuộc vòng (Prevent Circular Dependencies)**: Module A và Module B tuyệt đối không được phụ thuộc trực tiếp qua lại lẫn nhau; hãy tách hợp đồng chung ra Interface hoặc dùng Event Bus để giải phóng liên kết.

---

## 4. Các Quy Tắc Và Tiêu Chuẩn (Rules and Standards)

### 4.1 Trách Nhiệm Các Tầng Trong Backend (BẮT BUỘC - MUST)
Các hệ thống Backend thiết kế theo mô hình phân tầng BẮT BUỘC phải tuân thủ nghiêm ngặt ranh giới sau:
1. **Tầng Giao Vận / Trình Diễn (Controllers & Routers)**:
   - Kiểm tra tính hợp lệ về mặt cú pháp của Request (HTTP/RPC).
   - Chuyển đổi dữ liệu Request thành Command/Query của tầng nghiệp vụ.
   - Gọi Service xử lý và định dạng dữ liệu phản hồi cùng mã HTTP status.
   - TUYỆT ĐỐI KHÔNG chứa logic nghiệp vụ và KHÔNG gọi trực tiếp các câu lệnh truy vấn database thô.
2. **Tầng Nghiệp Vụ / Domain (Services & Domain Models)**:
   - Đóng gói toàn bộ logic nghiệp vụ, quy tắc tính toán và điều phối quy trình làm việc.
   - TUYỆT ĐỐI KHÔNG phụ thuộc vào các đối tượng giao thức HTTP (như `req`, `res`, `HttpServletRequest`).
3. **Tầng Lưu Trữ / Dữ Liệu (Repositories & DAOs)**:
   - Đóng gói các câu lệnh truy vấn, thao tác ORM và tương tác với cơ sở dữ liệu.
   - TUYỆT ĐỐI KHÔNG đưa ra quyết định nghiệp vụ hay định dạng phản hồi HTTP.
4. **Tầng Middleware**:
   - Xử lý các mối quan tâm dùng chung xuyên suốt: xác thực (AuthN), phân quyền (AuthZ), ghi log, CORS, giới hạn tần suất (Rate Limiting) và chuẩn hóa lỗi toàn cục.

### 4.2 Kiến Trúc Giao Diện Frontend (NÊN - SHOULD)
1. **Phân tách Container vs. Presentational**: Tách rời các Component hiển thị giao diện thuần túy (thuần hiển thị, nhận dữ liệu qua props) khỏi các Component/Hook quản lý state và gọi API.
2. **Cấu trúc thư mục theo tính năng (Feature-First)**: Tổ chức mã nguồn theo module nghiệp vụ (ví dụ: `features/billing/`, `features/auth/`) thay vì chỉ gom theo thư mục kỹ thuật (`components/`, `services/`, `views/`) khi ứng dụng có trên 10 màn hình.

### 4.3 Hồ Sơ Quyết Định Kiến Trúc - ADR (NÊN - SHOULD)
Các quyết định kiến trúc quan trọng (chọn cơ sở dữ liệu mới, đổi thư viện state, tích hợp message broker) NÊN được lưu trữ dưới dạng một tài liệu ADR gồm:
- Ngữ cảnh & Vấn đề cần giải quyết.
- Quyết định lựa chọn & Các phương án đã cân nhắc.
- Đánh giá đánh đổi (Trade-offs): Ưu điểm, nhược điểm và hệ quả lâu dài.

---

## 5. Giải Thích Chi Tiết: Các Phong Cách Kiến Trúc

### 5.1 Kiến Trúc Phân Tầng Cổ Điển (Layered / 3-Tier Architecture)
Mô hình chuẩn mực và phổ biến nhất cho ứng dụng web:
```text
[ Client (Web / Mobile App) ]
              │
              ▼
[ Tầng Trình Diễn: Controllers / Routes / Middleware ]
              │
              ▼
[ Tầng Ứng Dụng: Service / Business Logic ]
              │
              ▼
[ Tầng Lưu Trữ: Repositories / Data Access / ORM ]
              │
              ▼
[ Cơ Sở Dữ Liệu (PostgreSQL / MySQL / MongoDB) ]
```
- **Ưu điểm**: Dễ hiểu, đào tạo thành viên mới nhanh, ít boilerplate.
- **Nhược điểm**: Dễ rơi vào cái bẫy thiết kế định hướng dữ liệu (database-driven) khiến logic nghiệp vụ bị phân tán rải rác.

### 5.2 Kiến Trúc Clean & Hexagonal (Ports and Adapters)
Đảo ngược luồng phụ thuộc: Tầng Domain nghiệp vụ cốt lõi nằm ở vị trí trung tâm, hoàn toàn cách ly khỏi framework, database và giao diện:
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
           │      │       Domain Core        │      │
           │      │   (Entities & Rules)     │      │
           │      │            ▲             │      │
           │      │            │             │      │
           │      │     Port (Interfaces)    │      │
           │      └──────────────────────────┘      │
           │                   ▲                    │
           │                   │                    │
           │          Adapters (Driven)             │
           │     PostgreSQL / Stripe / S3           │
           └────────────────────────────────────────┘
```
- **Khi nào áp dụng**: Khi bài toán nghiệp vụ phức tạp, vòng đời hệ thống dài và yêu cầu viết Unit Test độc lập 100% không cần bật framework.

### 5.3 Modular Monolith vs. Microservices
- **Modular Monolith**: Một ứng dụng duy nhất được triển khai nguyên khối nhưng được tổ chức nội bộ thành các module nghiệp vụ có tính gắn kết cao và ranh giới rõ ràng (`Users`, `Catalog`, `Orders`). Đây là lựa chọn tối ưu cho 90% dự án khởi đầu.
- **Microservices**: Các dịch vụ nhỏ chạy trên các tiến trình độc lập, sở hữu cơ sở dữ liệu riêng biệt và giao tiếp qua mạng.
  - *Cảnh báo đánh đổi*: Microservices kéo theo độ phức tạp cực lớn về trạng thái phân tán, độ trễ mạng, tính nhất quán cuối cùng (eventual consistency) và vận hành hạ tầng. Chỉ áp dụng khi quy mô đội ngũ (hàng chục team) yêu cầu chu kỳ release hoàn toàn độc lập.

---

## 6. Danh Mục Các Mẫu Thiết Kế Quan Trọng (Design Patterns)

### 6.1 Repository Pattern
Tách rời logic nghiệp vụ khỏi chi tiết truy cập dữ liệu bằng cách đóng giả database như một tập hợp đối tượng trong bộ nhớ:
```text
[ Business Service ] ──(gọi)──> [ Interface: UserRepository ]
                                            ▲
                                            │ (cài đặt)
                                  [ PostgresUserRepository ]
```

### 6.2 Factory Pattern
Đóng gói quy trình khởi tạo đối tượng khi việc tạo đối tượng đòi hỏi nhiều điều kiện cấu hình phức tạp hoặc lựa chọn loại đối tượng linh hoạt lúc runtime.

### 6.3 Strategy Pattern
Định nghĩa một họ các thuật toán có cùng mục đích và đóng gói từng thuật toán lại để có thể hoán đổi linh hoạt cho nhau mà không làm thay đổi code phía gọi. Rất lý tưởng cho cổng thanh toán, cách tính thuế hoặc định dạng xuất file.

### 6.4 Adapter Pattern
Đóng vai trò cầu nối chuyển đổi giao diện của một dịch vụ bên ngoài sang giao diện chuẩn mà ứng dụng mong đợi (ví dụ: bọc AWS S3 SDK và Local Disk Storage vào chung một `StoragePort`).

### 6.5 Observer / Publish-Subscribe Pattern
Cho phép một đối tượng phát thông báo trạng thái tới nhiều thành phần đăng ký lắng nghe mà không cần biết danh tính của chúng. Giúp loại bỏ liên kết chặt khi cần thực hiện các tác vụ phụ (như gửi email, push notification sau khi đặt hàng thành công).

---

## 7. Thực Hành Tốt Và Anti-Pattern Cần Tránh

| Danh mục | Anti-Pattern (Thói quen xấu ❌) | Giải pháp Kiến Trúc Chuẩn (✅) |
| :--- | :--- | :--- |
| **Routing** | Fat Controllers: Phương thức controller dài 300+ dòng vừa viết SQL, vừa validate, vừa gửi mail. | Skinny Controllers: Controller chỉ giải nén request, kiểm tra cú pháp, chuyển giao việc cho Service và trả về HTTP status. |
| **Phụ thuộc** | Circular Dependency: File A import file B và file B lại import ngược lại file A. | Tách hợp đồng hoặc kiểu dữ liệu chung sang file C, hoặc dùng cơ chế Dependency Injection. |
| **Dữ liệu** | Để lộ Entity cơ sở dữ liệu trực tiếp ra ngoài API hoặc UI template. | Dùng các đối tượng DTO (Data Transfer Object) để độc lập hóa hợp đồng API khỏi lược đồ database. |
| **Cấu hình** | Hardcode địa chỉ URL và Secret Key trực tiếp bên trong các lớp nghiệp vụ. | Quản lý cấu hình tập trung qua biến môi trường (.env) và kiểm tra tính hợp lệ ngay khi khởi động ứng dụng. |
| **Phân tán** | Distributed Monolith: Tách thành nhiều microservice nhưng dùng chung 1 database duy nhất. | Mỗi microservice sở hữu cơ sở dữ liệu riêng biệt; tích hợp dữ liệu thông qua API hoặc Event Message. |

---

## 8. Ví Dụ Mã Nguồn Thực Tế (Code Examples)

### 8.1 Áp Dụng Strategy Pattern Cho Xử Lý Thanh Toán (TypeScript)
```typescript
// 1. Interface chung cho các chiến lược thanh toán
export interface PaymentStrategy {
  processPayment(amount: number): Promise<{ transactionId: string; success: boolean }>;
}

// 2. Chiến lược cụ thể: Cổng Stripe
export class StripePaymentStrategy implements PaymentStrategy {
  async processPayment(amount: number) {
    // Gọi Stripe SDK
    return { transactionId: `stripe_${Date.now()}`, success: true };
  }
}

// 3. Chiến lược cụ thể: Cổng PayPal
export class PayPalPaymentStrategy implements PaymentStrategy {
  async processPayment(amount: number) {
    // Gọi PayPal SDK
    return { transactionId: `paypal_${Date.now()}`, success: true };
  }
}

// 4. Lớp dịch vụ sử dụng chiến lược qua Dependency Injection
export class CheckoutService {
  constructor(private readonly paymentStrategy: PaymentStrategy) {}

  async checkout(orderTotal: number) {
    if (orderTotal <= 0) throw new Error("Tổng tiền đơn hàng không hợp lệ");
    return await this.paymentStrategy.processPayment(orderTotal);
  }
}
```

### 8.2 Phân Tách Các Tầng: Controller → Service → Repository (Java / Spring)
```java
// Controller (Chỉ đảm nhận tầng giao vận)
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

// Service (Chỉ đảm nhận logic nghiệp vụ)
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
            throw new DuplicateEmailException("Email này đã được sử dụng");
        }
        User user = userMapper.toEntity(request);
        User saved = userRepository.save(user);
        return userMapper.toDto(saved);
    }
}
```

---

## 9. Lưu Ý Theo Từng Công Nghệ Cụ Thể (Technology Notes)
- **React / Frontend**:
  - Tận dụng Custom Hooks (`useUserData()`) để đóng gói logic lấy dữ liệu, lưu cache và chuyển đổi trạng thái ra khỏi component giao diện thuần túy.
  - Đặt component cùng thư mục với file test, file style và các sub-component liên quan khi tổ chức theo module tính năng.
- **Node.js / Express / NestJS**:
  - Với Express, áp dụng cấu trúc thư mục phân tầng rõ ràng (`routes/`, `controllers/`, `services/`, `repositories/`).
  - Với NestJS, tận dụng cơ chế Dependency Injection và Module (`@Module()`) có sẵn để thiết lập ranh giới module rõ rệt.
- **Spring Boot / Java**:
  - Tránh dùng `@Autowired` trực tiếp trên thuộc tính. Hãy dùng Constructor Injection với các trường `private final` để đảm bảo tính bất biến và hỗ trợ viết unit test dễ dàng.
- **Mobile (Flutter / React Native)**:
  - Tuân thủ các kiến trúc quản lý trạng thái chuẩn mực như BLoC / Provider (Flutter) hoặc Redux Toolkit / Zustand (React Native).
  - Không gọi trực tiếp phần cứng thiết bị (Camera, Định vị GPS, SQLite) trong widget giao diện; hãy đưa qua một Hardware Repository trừu tượng.

---

## 10. Bảng Tự Kiểm Tra Thực Tế (Implementation Checklist)
- [ ] Các Controller chỉ đảm nhận kiểm tra cú pháp request và định dạng dữ liệu trả về.
- [ ] Logic nghiệp vụ được đóng gói hoàn toàn trong Service/Domain, độc lập khỏi giao thức HTTP.
- [ ] Mọi tương tác với database chỉ nằm trong tầng Repository/DAO.
- [ ] Đồ thị import module không có hiện tượng phụ thuộc vòng (Circular Dependency).
- [ ] Cấu hình và biến môi trường được quản lý tập trung và kiểm tra khi khởi động.
- [ ] Dữ liệu trả về qua API sử dụng DTO thay vì để lộ trực tiếp bảng cơ sở dữ liệu.

---

## 11. Sai Lầm Phổ Biến Và Ngoại Lệ (Mistakes & Exceptions)
- **Chia nhỏ Microservices quá sớm**: Một team chỉ có 2 lập trình viên nhưng chia thành 8 microservice khi chưa hiểu rõ ranh giới nghiệp vụ. Luôn bắt đầu với Modular Monolith trừ khi các nhóm làm việc độc lập hoàn toàn.
- **Tầng dịch vụ rỗng (Anemic Pass-Through)**: Tạo ra các class service chỉ có mỗi việc gọi `repository.findAll()` đối với các bảng danh mục tĩnh không có bất kỳ logic nào. Với nghiệp vụ CRUD đơn giản thuần túy, có thể áp dụng kiến trúc tinh gọn hơn.
- **Rò rỉ tầng trừu tượng (Leaky Abstraction)**: Truyền các đối tượng truy vấn SQL hoặc con trỏ database ngược lên tầng Controller.

---

## 12. Tài Liệu Tham Khảo Uy Tín (References)
- Martin Fowler — *Patterns of Enterprise Application Architecture (P of EAA)*: https://martinfowler.com/eaaCatalog/
- Microsoft Architecture Guides — *Common Web Application Architectures*: https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/common-web-application-architectures
- Alistair Cockburn — *Hexagonal Architecture (Ports and Adapters)*: https://alistair.cockburn.us/hexagonal-architecture/
- Architecture Decision Records (ADR) Standard: https://adr.github.io/

---

## 13. Các Tài Liệu Liên Quan Trong Bộ Tiêu Chuẩn

| Số thứ tự | Tên tài liệu chuẩn hóa | Trọng tâm kỹ thuật |
| :---: | :--- | :--- |
| **Portal** | [Cổng Tiêu Chuẩn Kỹ Thuật Dự Án](./README.md) | Khung kiến trúc tổng thể, quy trình RFC & ma trận đọc hiểu |
| **01** | [Quy Chuẩn Đặt Tên & Cú Pháp Mã Nguồn](./01-naming-conventions-and-syntax-standards.md) | Intention-revealing, Case styles, Bảng tra cứu đa ngôn ngữ |
| **02** | [Nguyên Lý Clean Code & Thiết Kế Phần Mềm](./02-clean-code-and-design-principles.md) | SOLID, KISS, DRY, Guard clauses, Quản lý độ phức tạp |
| **03** | **Kiến Trúc & Mẫu Thiết Kế Phần Mềm** *(Tài liệu này)* | Phân tầng Layered, Hexagonal, Dependency Injection, ADR |
| **04** | [Bảo Mật & Toàn Vẹn Dữ Liệu](./04-security-and-data-integrity.md) | OWASP Top 10, Zero Trust, RBAC/BOLA, Mã hóa & Secrets |
| **05** | [Kiểm Thử & Đảm Bảo Chất Lượng](./05-testing-and-quality-assurance.md) | Test Pyramid, AAA Pattern, Zero-flakiness, Quality Gates |
| **06** | [Quy Trình Git & Hợp Tác Nhóm](./06-git-workflow-and-team-collaboration.md) | Conventional Commits, Phân nhánh, Code Review Checklist |
| **07** | [Thiết Kế API & Cơ Sở Dữ Liệu](./07-api-design-and-database-principles.md) | RESTful contracts, Idempotency, Indexing, Transactions |
| **08** | [Hiệu Năng, Khả Năng Tiếp Cận & Vận Hành](./08-performance-accessibility-and-operations.md) | Core Web Vitals, a11y WCAG 2.2 AA, SRE & Observability |
