# 01 — Quy Chuẩn Đặt Tên & Cú Pháp Mã Nguồn (Universal Naming Conventions)

> **Cấp độ áp dụng**: BẮT BUỘC (MANDATORY)  
> **Trạng thái**: ĐÃ PHÊ DUYỆT (APPROVED) | **Phiên bản**: 2.0.0  
> **Tài liệu tham chiếu chuẩn**: [`01-naming-conventions-and-syntax-standards.md`](./01-naming-conventions-and-syntax-standards.md)  
> **Phạm vi**: Toàn bộ dự án (React Frontend, Express Backend, Spring Boot Backend, Database & CI/CD)

---

## 1. Mục Đích Tài Liệu (Document Purpose)
Tài liệu này xác lập các tiêu chuẩn đặt tên (Naming Conventions) và quy tắc định dạng cú pháp nhất quán cho toàn bộ hệ thống phần mềm. Trong kỹ nghệ phần mềm chuyên nghiệp, tên gọi không đơn thuần là nhãn dán định danh mà là **tài liệu sống (living documentation)** phản ánh trực tiếp miền nghiệp vụ (Domain Language). Tuân thủ tài liệu này giúp:
- Giảm thiểu tối đa chi phí nhận thức (Cognitive Load) khi đọc và hiểu mã nguồn.
- Tạo tính thống nhất tuyệt đối giữa các tầng công nghệ đa ngôn ngữ (JavaScript/TypeScript, Java, SQL, Shell Script).
- Loại bỏ hoàn toàn sự mơ hồ, nhập nhằng trong quá trình thảo luận kỹ thuật và bình duyệt mã nguồn (Code Review).

---

## 2. Phạm Vi Áp Dụng (Scope and Applicability)
- **Tầng giao diện (Frontend)**: React 19, JSX/TSX, CSS/SCSS modules, BEM, tệp tài nguyên tĩnh.
- **Tầng máy chủ (Backend)**: Node.js/Express, Java 17/Spring Boot 3, RESTful API endpoints, DTOs, Entities, Services.
- **Tầng dữ liệu (Database)**: SQL (PostgreSQL, MySQL), bảng (Tables), cột (Columns), khóa chính/ngoại (PK/FK), chỉ mục (Indexes).
- **Quy ước công cụ (Tooling & DevOps)**: Git branches, Docker files, biến môi trường `.env`, script tự động hóa.
- **Ngôn ngữ sử dụng**: **100% tiếng Anh chuyên ngành (Standard English)** cho toàn bộ mã nguồn, biến, hàm, class, chú thích code và commit messages.

---

## 3. Các Nguyên Tắc Cốt Lõi (Core Principles)

### 3.1 Quy Định Từ Khóa Theo Chuẩn RFC 2119
- **BẮT BUỘC (MUST / SHALL)**: Ràng buộc tuyệt đối phải tuân thủ. Bất kỳ vi phạm nào đều bị từ chối khi review PR.
- **TUYỆT ĐỐI KHÔNG (MUST NOT)**: Hành vi bị cấm hoàn toàn trong codebase.
- **NÊN (SHOULD / RECOMMENDED)**: Tiêu chuẩn thực hành tốt nhất; nếu làm khác phải có lý do kỹ thuật rõ ràng.
- **KHÔNG NÊN (SHOULD NOT)**: Tiềm ẩn rủi ro hoặc làm giảm chất lượng code, cần hạn chế tối đa.
- **TÙY CHỌN (MAY / OPTIONAL)**: Quyết định dựa trên ngữ cảnh triển khai cụ thể.

### 3.2 Bộ Quy Tắc Đặt Tên Bất Biến (Invariant Principles)
1. **Thể hiện rõ ý định (Intention-Revealing)**: Tên gọi phải trả lời được 3 câu hỏi: *Nó đại diện cho cái gì? Nó làm nhiệm vụ gì? Tại sao nó tồn tại?* Nếu một định danh cần chú thích giải thích kèm theo, tên đó đã thất bại.
2. **Có thể phát âm và tìm kiếm được (Pronounceable & Searchable)**: Tránh các từ viết tắt tùy tiện hoặc mang tính cá nhân (`genUsrLst` ➔ `generateUserList`). Tên biến phạm vi rộng phải đủ dài và đặc trưng để tìm kiếm không bị lẫn (`e` ➔ `userException`).
3. **Sử dụng ngôn ngữ chung phổ quát (Ubiquitous Language)**: Sử dụng chính xác thuật ngữ từ miền nghiệp vụ (Domain-Driven Design). Không tự ý đặt tên khác với từ vựng mà Product Owner hoặc khách hàng sử dụng.
4. **Phân biệt theo từ loại (Parts of Speech)**:
   - **Danh từ / Cụm danh từ**: Biến (`variable`), thuộc tính (`property`), lớp (`class`), cấu trúc dữ liệu (`struct/type`).
   - **Động từ / Cụm động từ**: Hàm (`function`), phương thức (`method`), tác vụ (`job/task`).
   - **Tiền tố khẳng định / Nghi vấn**: Biến và hàm logic Boolean (`is`, `has`, `can`, `should`, `exists`).
5. **Triệt tiêu nhiễu từ & Thông tin sai lệch (No Disinformation & Noise)**:
   - Không đính kèm kiểu dữ liệu vào tên biến khi ngôn ngữ đã hỗ trợ kiểu (Hungarian Notation lỗi thời): Tránh `userListArray`, `nameString`, `accountMap`.
   - Tránh các từ đệm vô nghĩa không tăng thêm thông tin: `userData`, `userObject`, `userItem` ➔ chỉ cần `user`.

---

## 4. Các Phong Cách Định Dạng Cú Pháp (Case Styles)

| Phong cách | Quy tắc định dạng | Ví dụ chuẩn | Phạm vi áp dụng chính |
| :--- | :--- | :--- | :--- |
| **camelCase** | Ký tự đầu viết thường, viết hoa chữ cái đầu của các từ tiếp theo | `userId`, `calculateTotalAmount`, `isValidEmail` | Biến, tham số, hàm, phương thức (JS/TS, Java, Go private) |
| **PascalCase** | Viết hoa chữ cái đầu của **mọi** từ | `UserProfileCard`, `OrderService`, `PaymentStatus` | Class, Interface, Type Alias, React Component, Enum type |
| **snake_case** | Toàn bộ chữ thường, ngăn cách giữa các từ bằng dấu gạch dưới `_` | `user_id`, `created_at`, `refresh_token` | Cột & bảng Database (SQL), biến Python, tệp script Python/Rust |
| **SCREAMING_SNAKE_CASE** | Toàn bộ chữ HOA, ngăn cách giữa các từ bằng `_` | `MAX_RETRY_ATTEMPTS`, `JWT_SECRET_KEY`, `DEFAULT_PAGE_SIZE` | Hằng số tĩnh bất biến (Constants), Biến môi trường (`.env`) |
| **kebab-case** | Toàn bộ chữ thường, ngăn cách giữa các từ bằng dấu gạch ngang `-` | `user-profile.component.jsx`, `api-health-check`, `btn-primary` | Tên tệp/thư mục (Frontend/Web), URL Slugs, CSS Classes, HTML attributes |

---

## 5. Quy Chuẩn Đặt Tên Theo Thành Phần Code (BẮT BUỘC - MUST)

### 5.1 Biến & Thuộc Tính (Variables & Properties)
- **Đơn giá trị**: Danh từ số ít rõ nghĩa (`order`, `customerAccount`, `retryCount`).
- **Tập hợp (Arrays, Lists, Collections)**:
  - BẮT BUỘC dùng danh từ số nhiều: `users`, `activeOrders`, `productCodes`.
  - Được phép dùng danh từ tập hợp tự nhiên: `userList` (khi cần nhấn mạnh cấu trúc List), `userGroup`, `userCollection`.
- **Giá trị Boolean**:
  - BẮT BUỘC bắt đầu bằng tiền tố: `is...`, `has...`, `can...`, `should...`, `allow...`.
  - ✅ `isActive`, `hasPermission`, `canRefund`, `shouldRefreshSession`, `isDeleted`.
  - ❌ `active` (mơ hồ: có thể là trạng thái chuỗi), `deleted` (dễ nhầm với timestamp), `status` (phải là Enum hoặc Object).
  - TUYỆT ĐỐI KHÔNG dùng phủ định kép: `isNotDeleted`, `hasNoAccess` (viết `if (!isNotDeleted)` gây quá tải nhận thức).

### 5.2 Hàm & Phương Thức (Functions & Methods)
Hàm thực thi hành vi, do đó BẮT BUỘC bắt đầu bằng một **Động từ (Verb)** chỉ rõ hành động:

| Tiền tố hành động | Ý nghĩa ngữ nghĩa chuẩn | Ví dụ mẫu |
| :--- | :--- | :--- |
| `get...` / `find...` | Truy xuất dữ liệu (idempotent, không thay đổi trạng thái) | `getUserById()`, `findActiveOrders()` |
| `fetch...` | Lấy dữ liệu qua mạng/I/O bất đồng bộ | `fetchExchangeRates()`, `fetchProfile()` |
| `create...` / `build...` | Khởi tạo thực thể mới | `createOrder()`, `buildAuthenticationToken()` |
| `update...` / `modify...` | Cập nhật thuộc tính của thực thể hiện hành | `updateUserProfile()`, `modifyAccountStatus()` |
| `delete...` / `remove...` | Xóa dữ liệu (`delete`: xóa vĩnh viễn khỏi DB; `remove`: gỡ khỏi danh sách bộ nhớ) | `deleteCustomerRecord()`, `removeCartItem()` |
| `is...` / `has...` / `can...` | Hàm logic trả về kết quả `boolean` | `isTokenExpired()`, `hasWritePermission()` |
| `handle...` | Xử lý sự kiện nội bộ phía Component/Logic | `handleFormSubmit()`, `handleWindowResize()` |
| `on...` | Tham số callback / Event prop truyền vào component | `onSubmit`, `onSuccess`, `onPaymentFailure` |
| `convert...` / `to...` | Chuyển đổi định dạng dữ liệu thuần túy (không side-effect) | `convertToDto()`, `toJSONString()`, `toEntity()` |

### 5.3 Lớp (Classes), Giao Diện (Interfaces) & Enums
- **Classes**: Cụm danh từ theo `PascalCase` mô tả đối tượng hoặc dịch vụ (`UserRepository`, `PaymentProcessor`, `NotificationDispatcher`).
- **Interfaces**:
  - Trong **Java**: Dùng danh từ hoặc tính từ (`OrderService`, `Serializable`, `Auditable`). Tránh dùng tiền tố `IOrderService` trừ khi toàn bộ dự án đã quy chuẩn trước đó.
  - Trong **TypeScript**: Ưu tiên đặt tên trực tiếp `UserPayload`, `OrderFilterOptions`. Chỉ dùng tiền tố `I` khi cần phân biệt rõ với class cùng tên.
  - Trong **C#**: BẮT BUỘC có tiền tố `I` (`IOrderRepository`).
- **Enums**:
  - Tên Enum: `PascalCase` số ít (`OrderStatus`, `UserRole`, `PaymentMethod`).
  - Giá trị Enum: Viết `SCREAMING_SNAKE_CASE` (Java, TypeScript) hoặc `PascalCase` (C#).

---

## 6. Bảng Tra Cứu Chuẩn Toàn Diện Theo Từng Ngôn Ngữ

| Ngôn ngữ / Hệ sinh thái | Biến & Tham số | Hàm & Phương thức | Class / Struct / Component | Hằng số (Constants) | Tệp tin & Thư mục (Files/Dirs) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **JavaScript / TypeScript** | `camelCase` | `camelCase` | `PascalCase` | `SCREAMING_SNAKE_CASE` | `kebab-case.ts` (file thường), `PascalCase.tsx` (Component) |
| **React (JSX/TSX)** | `camelCase` | `camelCase` / `handle...` | `PascalCase` (Component) | `SCREAMING_SNAKE_CASE` | Component: `PascalCase.jsx`, Hooks: `useCamelCase.js` |
| **Java (Spring Boot 3)** | `camelCase` | `camelCase` | `PascalCase` | `SCREAMING_SNAKE_CASE` | File: `PascalCase.java`, Package/Folder: `alllowercase` |
| **Node.js / Express 5** | `camelCase` | `camelCase` | `PascalCase` | `SCREAMING_SNAKE_CASE` | `kebab-case.js` hoặc `camelCase.controller.js` |
| **SQL (PostgreSQL / MySQL)**| `snake_case` | `snake_case` (SP/Func) | Bảng: `snake_case` số nhiều | Từ khóa SQL: `CHỮ HOA` (`SELECT`, `JOIN`) | `snake_case.sql` |
| **Python (PEP 8)** | `snake_case` | `snake_case` | `PascalCase` | `SCREAMING_SNAKE_CASE` | `snake_case.py`, package: `lowercase` |
| **Go (Golang)** | `camelCase` (private) / `PascalCase` (public) | `camelCase` (private) / `PascalCase` (public) | `PascalCase` | `camelCase` hoặc `PascalCase` | `snake_case.go` |
| **CSS / SCSS** | `--kebab-case` (CSS var) | N/A | BEM Block: `.block-name` | N/A | `kebab-case.css` |

---

## 7. Quy Chuẩn Định Danh Trong Dự Án Fullstack Tham Chiếu

### 7.1 Giao Diện Phía Client (React 19 Frontend)
```javascript
// 1. Biến trạng thái State & Setters đồng bộ
const [isLoading, setIsLoading] = useState(false);
const [users, setUsers] = useState([]);
const [selectedOrderId, setSelectedOrderId] = useState(null);

// 2. Hằng số cục bộ hoặc cấu hình
const MAX_FILE_UPLOAD_LIMIT = 5 * 1024 * 1024; // 5MB
const API_RETRY_TIMEOUT_MS = 3000;

// 3. React Component (PascalCase, trùng tên tệp tin)
export function OrderSummaryCard({ order, onCancelOrder }) {
  // 4. Hàm xử lý sự kiện: bắt đầu bằng 'handle' + TênSựKiện
  const handleCancelClick = (event) => {
    event.preventDefault();
    onCancelOrder(order.id);
  };

  return (
    <div className="order-summary-card">
      <h3>Order #{order.id}</h3>
      <button onClick={handleCancelClick} disabled={order.isLocked}>
        Cancel Order
      </button>
    </div>
  );
}

// 5. Custom Hook: BẮT BUỘC tiền tố 'use'
export function useWindowDimensions() {
  // Logic đo lường kích thước cửa sổ...
}
```

### 7.2 Máy Chủ Express (Node.js 20+ / Express 5 Backend)
```javascript
// Tệp: express-backend/src/controllers/order.controller.js
// Phương thức Controller: Động từ + Danh từ + Handler
async function getOrderByIdHandler(req, res, next) {
  try {
    const { orderId } = req.params;
    const order = await orderService.findOrderById(orderId);
    return sendSuccess(res, 'Order retrieved successfully', order);
  } catch (error) {
    return next(error);
  }
}

// Tệp: express-backend/src/routes/order.route.js
// Khởi tạo router đồng nhất
const orderRouter = Router();
orderRouter.get('/:orderId', getOrderByIdHandler);
```

### 7.3 Máy Chủ Spring Boot (Java 17 / Spring Boot 3.3.4 Backend)
```java
// Tệp: spring-backend/.../controller/OrderController.java
@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    // 1. Dependency Injection: camelCase, private final
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // 2. Constant: SCREAMING_SNAKE_CASE
    private static final int DEFAULT_PAGE_SIZE = 20;

    // 3. Endpoint Method: Động từ rõ nghĩa
    @GetMapping("/{orderId}")
    public ResponseEntity<ApiResponse<OrderResponseDto>> getOrderById(@PathVariable Long orderId) {
        OrderResponseDto responseData = orderService.findOrderById(orderId);
        return ResponseEntity.ok(ApiResponse.success("Order retrieved successfully", responseData));
    }
}
```

### 7.4 Cơ Sở Dữ Liệu Quan Hệ (PostgreSQL / MySQL Schema)
```sql
-- 1. Tên Bảng: snake_case, danh từ số nhiều đại diện tập hợp
CREATE TABLE customer_orders (
    -- 2. Khóa chính: id (BIGINT hoặc UUID)
    id BIGSERIAL PRIMARY KEY,

    -- 3. Khóa ngoại: <tên_bảng_số_ít>_id
    customer_id BIGINT NOT NULL,

    -- 4. Thuộc tính nghiệp vụ: snake_case không viết tắt
    total_amount DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    shipping_address TEXT NOT NULL,

    -- 5. Trạng thái Boolean: is_..., has_...
    is_paid BOOLEAN NOT NULL DEFAULT FALSE,
    has_discount BOOLEAN NOT NULL DEFAULT FALSE,

    -- 6. Dấu vết thời gian (Audit Trail): created_at, updated_at
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    -- 7. Ràng buộc & Chỉ mục: fk_<bảng>_<đối_tượng>, idx_<bảng>_<cột>
    CONSTRAINT fk_customer_orders_customer FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE INDEX idx_customer_orders_customer_id ON customer_orders(customer_id);
CREATE INDEX idx_customer_orders_created_at ON customer_orders(created_at DESC);
```

---

## 8. Anti-Patterns & Sai Lầm Cần Tránh (Bad Practices)

| Anti-Pattern | Ví dụ xấu (❌ Vi phạm) | Ví dụ chuẩn (✅ Senior Standard) | Phân tích lý do kỹ thuật |
| :--- | :--- | :--- | :--- |
| **Ký tự đơn lẻ / Viết tắt kỳ quặc** | `let d;`<br>`const fn = () => {};` | `let elapsedDays;`<br>`const processPayment = () => {};` | Không thể hiểu mục đích mà không đọc toàn bộ context; không thể search chính xác trong IDE. |
| **Đính kèm kiểu dữ liệu (Disinformation)** | `const userListArray = [];`<br>`const nameString = "";` | `const users = [];`<br>`const customerName = "";` | Kiểu dữ liệu đã được trình biên dịch/TypeScript xác thực; đính kèm vào tên chỉ gây nhiễu khi đổi cấu trúc. |
| **Phủ định kép trong Boolean** | `if (!isNotVerified)`<br>`if (hasNoPermission === false)` | `if (isVerified)`<br>`if (hasPermission)` | Tạo ra logic đảo chiều gây lỗi nghiêm trọng khi kết hợp các toán tử điều kiện phức tạp. |
| **Tên hàm mâu thuẫn hành vi** | `getUser(id)` (nhưng ngầm cập nhật `lastLoginTime` trong DB) | `getUserAndRecordLogin(id)` hoặc tách thành 2 tác vụ riêng | Vi phạm nguyên tắc Single Responsibility (SRP) và gây hiệu ứng phụ không mong muốn (Side-effect). |
| **Trộn lẫn đa ngôn ngữ** | `let tongTien = 0;`<br>`function getDanhSachUser()` | `let totalAmount = 0;`<br>`function getUsers()` | Gây khó khăn khi làm việc trong môi trường quốc tế, tạo ra sự thiếu đồng bộ trong codebase. |
| **Tên biến chung chung vô vị** | `data`, `info`, `item`, `temp`, `res1` | `orderPayload`, `customerProfile`, `activeSession` | Bắt người đọc phải đọc ngược dòng chảy code để đoán biến này chứa đối tượng gì. |

---

## 9. Lưu Ý Theo Từng Công Nghệ Cụ Thể (Technology Notes)
- **TypeScript / React 19**:
  - Không đặt tên Component chung chung như `Card` hay `Item`. Hãy đặt tên đặc thù miền nghiệp vụ: `TransactionItemCard`, `MetricSummaryBadge`.
  - Props của callback luôn dùng tiền tố `on...` (`onSave`, `onDismiss`), trong khi hàm xử lý cục bộ dùng `handle...` (`handleSave`, `handleDismiss`).
- **Java / Spring Boot 3**:
  - Không viết hoa toàn bộ từ viết tắt trong CamelCase: Viết `HttpServer` thay vì `HTTPServer`, viết `OrderId` thay vì `OrderID`, viết `RestApiClient` thay vì `RESTAPIClient`.
  - Hậu tố rõ ràng cho kiến trúc phân tầng: `*Controller`, `*Service`, `*Repository`, `*Dto`, `*Entity`.
- **SQL / Relational Databases**:
  - Tên bảng và tên cột luôn viết thường (`lower_snake_case`). Không bao giờ dùng ký tự đặc biệt hoặc dấu cách.
  - Từ khóa truy vấn SQL viết HOA toàn bộ (`SELECT`, `FROM`, `WHERE`, `LEFT JOIN`, `GROUP BY`) để phân biệt trực quan với tên bảng và cột.

---

## 10. Bảng Tự Kiểm Tra Thực Tế (PR Review Checklist)
Trước khi gửi hoặc phê duyệt Pull Request, hãy đối chiếu:
- [ ] 100% tên biến, hàm, lớp, tệp tin sử dụng tiếng Anh chuẩn mực, không viết tắt tùy tiện.
- [ ] Tên hàm bắt đầu bằng động từ chỉ rõ hành vi nghiệp vụ.
- [ ] Mọi biến logic Boolean bắt đầu bằng `is`, `has`, `can`, `should`, không có phủ định kép.
- [ ] Mảng và tập hợp sử dụng danh từ số nhiều (`items`, `records`).
- [ ] Các hằng số cấu hình bất biến dùng `SCREAMING_SNAKE_CASE`.
- [ ] Tên bảng và cột cơ sở dữ liệu tuân thủ `snake_case`, bảng dùng số nhiều.
- [ ] Không có các từ đệm vô nghĩa như `data`, `info`, `object`, `temp` trong phạm vi hàm lớn.

---

## 11. Sai Lầm Phổ Biến Và Ngoại Lệ Được Phép (Common Pitfalls & Justified Exceptions)
- **Ngoại lệ cho biến lặp ngắn**: Trong các vòng lặp toán học hoặc thuật toán kinh điển có phạm vi dưới 5 dòng, các biến chỉ số kinh điển như `i`, `j`, `k` được chấp nhận. Với vòng lặp lớn hơn hoặc lồng nhau, BẮT BUỘC đặt tên có ý nghĩa (`rowIndex`, `columnIndex`).
- **Ngoại lệ cho tọa độ đồ họa**: Các biến tọa độ không gian `x`, `y`, `z` và chiều `w`, `h` trong xử lý Canvas/SVG được chấp nhận vì là quy ước toán học quốc tế.
- **Tương thích hệ thống ngoài (Third-party Integration)**: Khi bóc tách dữ liệu JSON từ API đối tác bên ngoài sử dụng quy ước khác (ví dụ: đối tác gửi `customer_id` sang hệ thống TypeScript `camelCase`), hãy chuyển đổi ngay tại tầng Gateway/Adapter thành `customerId` trước khi đưa vào Domain logic.

---

## 12. Tài Liệu Tham Khảo Uy Tín (References)
- Robert C. Martin — *Clean Code: A Handbook of Agile Software Craftsmanship* (Chapter 2: Meaningful Names)
- Google Style Guides (Java, JavaScript, Python, Shell): https://google.github.io/styleguide/
- Oracle Java Code Conventions: https://www.oracle.com/java/technologies/javase/codeconventions-namingconventions.html
- Airbnb JavaScript Style Guide: https://github.com/airbnb/javascript#naming-conventions
- SQL Style Guide by Simon Holywell: https://www.sqlstyle.guide/

---

## 13. Các Tài Liệu Liên Quan Trong Bộ Tiêu Chuẩn

| Số thứ tự | Tên tài liệu chuẩn hóa | Trọng tâm kỹ thuật |
| :---: | :--- | :--- |
| **Portal** | [Cổng Tiêu Chuẩn Kỹ Thuật Dự Án](./README.md) | Khung kiến trúc tổng thể, quy trình RFC & ma trận đọc hiểu |
| **01** | [Quy Chuẩn Đặt Tên & Cú Pháp Mã Nguồn](./01-naming-conventions-and-syntax-standards.md) | Intention-revealing, Case styles, Bảng tra cứu đa ngôn ngữ |
| **02** | [Nguyên Lý Clean Code & Thiết Kế Phần Mềm](./02-clean-code-and-design-principles.md) | SOLID, KISS, DRY, Guard clauses, Quản lý độ phức tạp |
| **03** | [Kiến Trúc & Mẫu Thiết Kế Phần Mềm](./03-architecture-and-design-patterns.md) | Phân tầng Layered, Hexagonal, Dependency Injection, ADR |
| **04** | [Bảo Mật & Toàn Vẹn Dữ Liệu](./04-security-and-data-integrity.md) | OWASP Top 10, Zero Trust, RBAC/BOLA, Mã hóa & Secrets |
| **05** | [Kiểm Thử & Đảm Bảo Chất Lượng](./05-testing-and-quality-assurance.md) | Test Pyramid, AAA Pattern, Zero-flakiness, Quality Gates |
| **06** | [Quy Trình Git & Hợp Tác Nhóm](./06-git-workflow-and-team-collaboration.md) | Conventional Commits, Phân nhánh, Code Review Checklist |
| **07** | [Thiết Kế API & Cơ Sở Dữ Liệu](./07-api-design-and-database-principles.md) | RESTful contracts, Idempotency, Indexing, Transactions |
| **08** | [Hiệu Năng, Khả Năng Tiếp Cận & Vận Hành](./08-performance-accessibility-and-operations.md) | Core Web Vitals, a11y WCAG 2.2 AA, SRE & Observability |
