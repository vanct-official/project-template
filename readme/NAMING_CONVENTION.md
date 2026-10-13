# 📚 Quy Chuẩn Đặt Tên Trong Lập Trình (Universal Naming Conventions)

> **Cẩm nang tiêu chuẩn đặt tên code (Clean Code Naming Standards) dành cho lập trình viên trên mọi ngôn ngữ: JavaScript/TypeScript, Java, Python, C#, C/C++, Go, PHP, Rust, SQL và CSS.**

---

## 🎯 1. Nguyên Tắc Cốt Lõi (Universal Core Principles)

> *"Có hai thứ khó nhất trong ngành khoa học máy tính: Xóa bộ nhớ cache và đặt tên."* — Phil Karlton

Dù bạn viết bằng ngôn ngữ nào, tên gọi cần thỏa mãn các tiêu chí sau:

1. **Rõ nghĩa & Thể hiện mục đích (Intention-Revealing)**: Đọc tên phải hiểu ngay biến/hàm đó lưu trữ cái gì hoặc làm nhiệm vụ gì mà không cần đọc logic bên trong.
2. **Có thể phát âm và tìm kiếm được (Pronounceable & Searchable)**: Tránh các ký tự viết tắt tùy tiện hoặc viết tắt cá nhân (ví dụ: `d` thay cho `daysSinceLastLogin`, `modUsr` thay cho `modifyUser`).
3. **Phân biệt theo từ loại (Parts of Speech)**:
   - **Danh từ / Cụm danh từ**: Dành cho Biến (`variable`), Thuộc tính (`property`), Lớp (`class`), Cấu trúc dữ liệu (`struct`).
   - **Động từ / Cụm động từ**: Dành cho Hàm (`function`), Phương thức (`method`).
   - **Tính từ / Trạng từ / Dạng nghi vấn (is/has/can/should)**: Dành cho giá trị Logic/Boolean.
4. **Tránh nhiễu từ & thông tin sai lệch (Avoid Noise & Disinformation)**:
   - Không đặt tên biến là `userList` nếu kiểu thực tế là một `Set` hoặc `Map`. Thay vào đó dùng số nhiều: `users` hoặc `userSet`.
   - Tránh thêm từ đệm vô nghĩa như `data`, `info`, `item`, `object` (ví dụ: `userData` vs `user` thường mang ý nghĩa như nhau).

---

## 🔡 2. Các Phong Cách Đặt Tên Phổ Biến (Case Styles)

| Phong cách | Cú pháp | Ví dụ | Phạm vi sử dụng phổ biến |
| :--- | :--- | :--- | :--- |
| **camelCase** | Viết hoa chữ cái đầu của các từ tiếp theo (chữ đầu viết thường) | `userId`, `calculateTotalPrice` | Biến, hàm trong JS/TS, Java, Go (unexported), C# (private field/param) |
| **PascalCase** *(UpperCamelCase)* | Viết hoa chữ cái đầu của **mọi** từ | `UserProfileCard`, `OrderService` | Class, Interface, Type, Enum, React Component |
| **snake_case** | Chữ thường, các từ ngăn cách bằng dấu gạch dưới `_` | `user_id`, `created_at` | Biến, hàm trong Python, Rust, C, Cột Database (SQL) |
| **SCREAMING_SNAKE_CASE** | Chữ HOA toàn bộ, ngăn cách bằng `_` | `MAX_RETRY_COUNT`, `API_BASE_URL` | Hằng số (Constants), Biến môi trường (.env) |
| **kebab-case** | Chữ thường, các từ nối bằng dấu gạch ngang `-` | `user-profile`, `btn-primary` | CSS classes, URL slugs, Tên file/folder (web), HTML attributes |

---

## 🧭 3. Quy Tắc Đặt Tên Theo Thành Phần Code

### 3.1. Biến & Thuộc Tính (Variables & Fields)
- **Đơn giá trị**: Dùng danh từ số ít:
  - ✅ Tốt: `product`, `accountBalance`, `errorMessage`
  - ❌ Xấu: `p`, `val`, `data1`
- **Tập hợp / Mảng (Arrays, Collections)**: Dùng danh từ số nhiều:
  - ✅ Tốt: `users`, `activeOrders`, `productCodes`
  - ❌ Xấu: `listUser`, `userArr`
- **Biến Boolean**: Luôn bắt đầu bằng tiền tố trạng thái khẳng định/nghi vấn:
  - ✅ `isActive`, `hasPermission`, `canExecute`, `shouldUpdate`, `isValid`, `exists`
  - ❌ `active` (mơ hồ: có thể là string hoặc bool), `status` (nên là enum hoặc string), `notValid` (tránh phủ định hai lần: `!notValid` rất khó đọc)

### 3.2. Hàm & Phương Thức (Functions & Methods)
Hàm thực hiện một hành động, do đó luôn bắt đầu bằng một **Động từ** (Verb) chỉ rõ hành động:

| Tiền tố phổ biến | Mục đích | Ví dụ |
| :--- | :--- | :--- |
| `get...` / `fetch...` | Lấy dữ liệu | `getUserById()`, `fetchOrderDetails()` |
| `set...` | Thiết lập / Gán giá trị | `setPassword()`, `setStatus()` |
| `create...` / `build...` | Tạo mới một thực thể | `createOrder()`, `buildQuery()` |
| `update...` | Cập nhật thực thể hiện có | `updateUserProfile()`, `updateStock()` |
| `delete...` / `remove...` | Xóa dữ liệu (`remove` thường dùng cho mảng nội bộ) | `deleteAccount()`, `removeItem()` |
| `is...` / `has...` / `can...` | Hàm kiểm tra trả về Boolean | `isAuthenticated()`, `hasAccess()` |
| `handle...` | Hàm xử lý sự kiện phía code logic | `handleSubmit()`, `handleUserClick()` |
| `on...` | Prop/Callback lắng nghe sự kiện | `onClick`, `onUploadSuccess` |
| `convert...` / `to...` | Chuyển đổi định dạng | `convertToDto()`, `toJSON()`, `toString()` |

### 3.3. Lớp (Classes), Giao Diện (Interfaces) & Types
- **Class**: Danh từ / Cụm danh từ theo `PascalCase`. Đại diện cho một thực thể hoặc dịch vụ:
  - ✅ `Customer`, `PaymentGateway`, `AuthenticationController`
- **Interface**:
  - *TypeScript / Java*: Thường dùng danh từ hoặc tính từ (`UserService`, `Comparable`, `Runnable`). Tránh lạm dụng tiền tố `I` trừ khi quy định dự án bắt buộc (như C# `IUserService`).
  - *C#*: Luôn có tiền tố `I` (`IUserRepository`, `ILogger`).
- **Enums**: Tên Enum là PascalCase số ít; các giá trị enum thường viết `SCREAMING_SNAKE_CASE` hoặc `PascalCase` (tùy ngôn ngữ):
  - ✅ `enum OrderStatus { PENDING, PROCESSING, COMPLETED, CANCELLED }`

---

## 🌐 4. Bảng Tra Cứu Chuẩn Theo Từng Ngôn Ngữ

| Ngôn ngữ | Biến & Tham số | Hàm / Method | Class / Struct | Hằng số (Constants) | File & Folder |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **JavaScript / TypeScript** | `camelCase` | `camelCase` | `PascalCase` | `SCREAMING_SNAKE_CASE` | `kebab-case` hoặc `camelCase` (`PascalCase` cho Component) |
| **React (JSX/TSX)** | `camelCase` | `camelCase` / `handle...` | `PascalCase` (Component) | `SCREAMING_SNAKE_CASE` | Component: `PascalCase.jsx`, Hooks: `use...js` |
| **Java (Spring Boot)** | `camelCase` | `camelCase` | `PascalCase` | `SCREAMING_SNAKE_CASE` | `PascalCase.java` (Class trùng tên file), folder: `lowercase` |
| **Python** | `snake_case` | `snake_case` | `PascalCase` | `SCREAMING_SNAKE_CASE` | `snake_case.py`, package: `lowercase` |
| **C# / .NET** | `camelCase` (param, local), `_camelCase` (private) | `PascalCase` | `PascalCase` (Interface: `IPascalCase`) | `PascalCase` hoặc `SCREAMING_SNAKE_CASE` | `PascalCase.cs` |
| **Go (Golang)** | `camelCase` (local/unexported), `PascalCase` (exported) | `camelCase` (private), `PascalCase` (public) | `PascalCase` | `PascalCase` hoặc `camelCase` | `snake_case.go` |
| **C / C++** | `camelCase` hoặc `snake_case` | `camelCase` / `snake_case` | `PascalCase` | `SCREAMING_SNAKE_CASE` | `snake_case.c`, `snake_case.h` |
| **PHP** | `camelCase` (`$userId`) | `camelCase` | `PascalCase` | `SCREAMING_SNAKE_CASE` | `PascalCase.php` (chuẩn PSR-12) |
| **Rust** | `snake_case` | `snake_case` | `PascalCase` | `SCREAMING_SNAKE_CASE` | `snake_case.rs` |
| **SQL (Database)** | `snake_case` (cột, bảng) | `snake_case` (Stored Proc/Function) | Bảng: `snake_case` (số nhiều hoặc số ít nhất quán) | N/A (Keywords viết `HOA`: `SELECT`, `WHERE`) | `snake_case.sql` |

---

## 🔍 5. Chi Tiết Thực Tế Cho Dự Án Fullstack (React + Express + Spring Boot)

### 5.1. Front-end (React & TypeScript/JavaScript)
```javascript
// 1. Biến & State
const [isLoading, setIsLoading] = useState(false);
const [userList, setUserList] = useState([]); // Hoặc: const [users, setUsers]

// 2. Constants
const MAX_LOGIN_ATTEMPTS = 5;
const DEFAULT_AVATAR_URL = "/assets/default.png";

// 3. React Component (PascalCase)
export function UserProfileCard({ userId, onUpdateProfile }) {
  // 4. Event Handler (handle + Event)
  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateProfile(userId);
  };

  return <form onSubmit={handleSubmit}>...</form>;
}

// 5. Custom Hook (Bắt buộc bắt đầu bằng 'use')
export function useDebounce(value, delay) { ... }
```

### 5.2. Backend Node.js / Express
```javascript
// Controller & Route Handlers
export async function getUserById(req, res, next) { ... }
export async function createNewOrder(req, res, next) { ... }

// Middleware
export function verifyJwtToken(req, res, next) { ... }

// Model / Schema
export const UserSchema = new Schema({ ... });
```

### 5.3. Backend Java / Spring Boot
```java
// Class (PascalCase)
@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    // Private Dependency Injection (camelCase)
    private final OrderService orderService;

    // Constant (SCREAMING_SNAKE_CASE)
    private static final int DEFAULT_PAGE_SIZE = 20;

    // Method (camelCase, bắt đầu bằng động từ)
    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponseDto> getOrderById(@PathVariable Long orderId) {
        OrderResponseDto response = orderService.findOrderById(orderId);
        return ResponseEntity.ok(response);
    }
}
```

### 5.4. Cơ Sở Dữ Liệu (SQL / PostgreSQL / MySQL)
```sql
-- Tên bảng: snake_case, danh từ số nhiều (users, orders, order_items)
CREATE TABLE users (
    -- Khóa chính: id hoặc <table_singular>_id
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    
    -- Tên cột: snake_case, không viết tắt vô nghĩa
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    
    -- Trạng thái Boolean: is_active, has_verified_email
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Thời gian: created_at, updated_at, deleted_at
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Khóa ngoại: <tên_bảng_số_ít>_id
CREATE TABLE orders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    total_amount DECIMAL(12, 2) NOT NULL,
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 5.5. CSS & HTML (Quy chuẩn BEM: Block__Element--Modifier)
```css
/* Block */
.card {}

/* Element (hai gạch dưới __) */
.card__title {}
.card__description {}
.card__button {}

/* Modifier (hai gạch nối --) */
.card--featured {}
.card__button--disabled {}
```

---

## 🚫 6. Các Anti-Pattern & Sai Lầm Cần Tránh (Bad Practices)

| Sai lầm | Ví dụ xấu (❌) | Ví dụ tốt (✅) | Lý do |
| :--- | :--- | :--- | :--- |
| **Tên 1 ký tự / vô nghĩa** | `int d;`, `let x;` | `int elapsedDays;`, `let userIndex;` | Không thể đoán được ý nghĩa; khó search trong project |
| **Viết tắt kỳ quặc** | `fn`, `calcTotPrc()`, `usrMgr` | `function`, `calculateTotalPrice()`, `userManager` | Tiết kiệm vài ký tự nhưng tốn gấp 10 lần thời gian để hiểu |
| **Nhiễu kiểu dữ liệu** | `nameString`, `userListArray` | `name`, `users` | Kiểu dữ liệu đã được khai báo bởi kiểu của biến/TypeScript |
| **Phủ định kép trong Boolean**| `if (!isNotDeleted)` | `if (isDeleted)` hoặc `if (isActive)` | Gây xoắn não logic khi kiểm tra điều kiện |
| **Hàm làm nhiều việc nhưng tên 1 việc** | `getUser()` nhưng bên trong lại cập nhật DB | `getAndUpdateUser()` hoặc tách thành 2 hàm riêng | Vi phạm nguyên tắc Single Responsibility (SRP) |
| **Trộn lẫn ngôn ngữ** | `soLuongUser`, `tinhTongOrder` | `userCount`, `calculateOrderTotal` | Nhất quán 100% bằng tiếng Anh chuẩn cho toàn bộ codebase |

---

## ✅ 7. Bảng Tự Kiểm Tra (Self-Check Checklist Trước Khi Commit)

Trước khi commit mã nguồn, hãy tự hỏi:
- [ ] Tên biến/hàm này có dùng **tiếng Anh chuẩn** không?
- [ ] Người mới vào dự án có hiểu biến này làm gì chỉ sau **2 giây đọc tên** không?
- [ ] Tên hàm có bắt đầu bằng **động từ** (`get`, `set`, `check`, `send`, `calculate`) không?
- [ ] Biến Boolean có bắt đầu bằng **tiền tố nghi vấn** (`is`, `has`, `can`, `should`) không?
- [ ] Các hằng số (constants) bất biến đã được viết `SCREAMING_SNAKE_CASE` chưa?
- [ ] Có vi phạm phong cách chính thống của ngôn ngữ đang dùng (VD: CamelCase cho JS/Java, Snake_case cho Python) không?
