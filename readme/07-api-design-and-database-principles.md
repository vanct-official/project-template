# 07 — Thiết Kế API & Cơ Sở Dữ Liệu (API Design & Database Principles)

> **Cấp độ áp dụng**: BẮT BUỘC (MANDATORY)  
> **Trạng thái**: ĐÃ PHÊ DUYỆT (APPROVED) | **Phiên bản**: 2.0.0  
> **Phạm vi**: Toàn bộ dịch vụ Backend (Express, Spring Boot), RESTful APIs, Database Schemas & Migrations

## 1. Mục Đích Tài Liệu (Document Purpose)
Tài liệu này xác lập các tiêu chuẩn kỹ thuật chuẩn mực cho việc thiết kế giao diện lập trình ứng dụng RESTful API, cấu trúc lưu trữ dữ liệu, quản lý giao dịch (Transactions) và duy trì tính toàn vẹn cơ sở dữ liệu. Tài liệu đảm bảo các dịch vụ backend cung cấp hợp đồng giao tiếp nhất quán, dễ dự đoán cho phía client và vận hành trên nền tảng lưu trữ bền vững, tối ưu hiệu năng.

---

## 2. Phạm Vi Áp Dụng (Scope and Applicability)
- **Phạm vi API**: Các REST API công khai và nội bộ, cơ chế Webhook và giao thức truyền tải dữ liệu Client - Server.
- **Phạm vi Cơ sở dữ liệu**: Hệ quản trị cơ sở dữ liệu quan hệ RDBMS (PostgreSQL, MySQL, SQL Server) và cơ sở dữ liệu phi quan hệ dạng tài liệu NoSQL (MongoDB).
- **Đối tượng hướng đến**: Kỹ sư Backend, kỹ sư Fullstack, lập trình viên Frontend/Mobile tích hợp API và quản trị viên cơ sở dữ liệu (DBA).

---

## 3. Các Nguyên Tắc Cốt Lõi (Core Principles)
- **Hợp đồng API nhất quán và dễ đoán**: Mọi endpoint API phải tuân thủ chuẩn đặt tên đồng nhất, cấu trúc bao bọc JSON chuẩn mực và sử dụng đúng ngữ nghĩa mã phản hồi HTTP.
- **Tính lũy thỏa & Thử lại an toàn (Idempotency & Safe Retries)**: Yêu cầu qua mạng có thể đứt gãy giữa chừng. Các thao tác thay đổi dữ liệu trọng yếu (thanh toán, tạo đơn hàng) BẮT BUỘC phải hỗ trợ gửi lại an toàn thông qua Idempotency Key mà không bị lặp giao dịch.
- **Ràng buộc toàn vẹn tại tầng lưu trữ**: Luôn thiết lập khóa chính, khóa ngoại, kiểm tra miền giá trị (Check Constraint) và giao dịch ACID trực tiếp trong database engine, không chỉ dựa dẫm vào tầng code ứng dụng.
- **Tiến hóa không gián đoạn (Zero-Downtime Evolution)**: Lược đồ cơ sở dữ liệu (Schema) và phiên bản API phải phát triển theo hướng tương thích ngược (áp dụng mô hình Expand and Contract).
- **Phân trang tường minh**: Không bao giờ mở API trả về danh sách vô hạn. Mọi endpoint trả về tập hợp dữ liệu đều phải áp dụng giới hạn phân trang.

---

## 4. Các Quy Tắc Và Tiêu Chuẩn: Thiết Kế API (API Design)

### 4.1 Quy Ước Đường Dẫn Tài Nguyên RESTful (BẮT BUỘC - MUST)
1. **Dùng Danh từ số nhiều, không dùng Động từ**: URI đại diện cho tài nguyên. Dùng danh từ chữ thường số nhiều.
   - ✅ `GET /api/v1/orders`, `POST /api/v1/orders`
   - ❌ `GET /api/v1/getOrders`, `POST /api/v1/createOrder`
2. **Quan hệ phân cấp (Hierarchy)**: Thể hiện mối quan hệ tài nguyên con thông qua đường dẫn lồng nhau:
   - ✅ `GET /api/v1/orders/{orderId}/items`
   - Đường dẫn lồng nhau KHÔNG NÊN vượt quá 2 cấp. Với truy vấn sâu hơn, hãy đưa về tài nguyên cấp 1 kèm query parameter (`GET /api/v1/items?orderId={orderId}`).
3. **Ngữ nghĩa của HTTP Verbs (BẮT BUỘC - MUST)**:
   - `GET`: Lấy dữ liệu. An toàn và có tính lũy thỏa (không làm đổi trạng thái hệ thống).
   - `POST`: Tạo mới tài nguyên hoặc kích hoạt tác vụ. Không có tính lũy thỏa.
   - `PUT`: Thay thế toàn bộ tài nguyên hiện có hoặc cập nhật có tính lũy thỏa.
   - `PATCH`: Cập nhật một phần các trường được chỉ định.
   - `DELETE`: Xóa tài nguyên. Có tính lũy thỏa.

### 4.2 Bảng Mã Trạng Thái HTTP Chuẩn (HTTP Status Codes)
- `200 OK`: Truy vấn hoặc cập nhật đồng bộ thành công.
- `201 Created`: Tạo mới tài nguyên thành công (kèm header `Location` hoặc đối tượng vừa tạo).
- `204 No Content`: Thao tác thành công nhưng không có dữ liệu trả về (thường dùng cho `DELETE`).
- `400 Bad Request`: Lỗi dữ liệu gửi lên không đúng định dạng JSON hoặc thiếu trường bắt buộc.
- `401 Unauthorized`: Chưa xác thực danh tính, token không hợp lệ hoặc đã hết hạn.
- `403 Forbidden`: Đã xác thực nhưng không có quyền truy cập vào tài nguyên yêu cầu.
- `404 Not Found`: Không tìm thấy tài nguyên (hoặc ẩn giấu để bảo mật).
- `409 Conflict`: Xung đột trạng thái nghiệp vụ (ví dụ: email đã tồn tại, xung đột phiên bản Optimistic Lock).
- `422 Unprocessable Content`: Dữ liệu đúng cú pháp nhưng vi phạm quy tắc logic nghiệp vụ.
- `429 Too Many Requests`: Vượt quá giới hạn tần suất gửi request (Rate Limit).
- `500 Internal Server Error`: Lỗi máy chủ chưa được xử lý (phải được làm sạch trước khi trả về client).

### 4.3 Định Dạng Phản Hồi Lỗi Chuẩn Hóa (BẮT BUỘC - MUST)
Mọi phản hồi lỗi từ API BẮT BUỘC phải theo cấu trúc JSON chuẩn mực, dễ bóc tách:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dữ liệu gửi lên không vượt qua bước kiểm tra hợp lệ.",
    "details": [
      {
        "field": "email",
        "issue": "Địa chỉ email không đúng định dạng"
      }
    ]
  },
  "timestamp": "2026-10-13T11:45:00Z",
  "requestId": "req-98f23a-bc12"
}
```

### 4.4 Phân Trang, Sắp Xếp Và Lọc Dữ Liệu (BẮT BUỘC - MUST)
- Các endpoint danh sách BẮT BUỘC phải hỗ trợ phân trang theo Offset hoặc Cursor:
  - Query params: `page` & `limit` (Offset) hoặc `cursor` & `limit`.
  - Thiết lập giới hạn tối đa mặc định (ví dụ: mặc định `limit=20`, tối đa `limit=100`).
- Quy ước sắp xếp: `sort=createdAt:desc,priority:asc`.
- Quy ước lọc: `status=active&categoryId=12`.

### 4.5 Xác Minh Chữ Ký Webhook (BẮT BUỘC - MUST)
Khi gửi hoặc nhận Webhook:
- Bên gửi BẮT BUỘC phải đính kèm chữ ký mã hóa HMAC qua header (ví dụ: `X-Signature-SHA256: hmac_sha256(payload, secret)`).
- Bên nhận BẮT BUỘC phải kiểm tra tính hợp lệ của chữ ký trước khi xử lý dữ liệu để chống giả mạo.
- Bên nhận BẮT BUỘC phải lưu lại Event ID của Webhook để đảm bảo tính lũy thỏa, chống xử lý lặp lại 2 lần khi nhà cung cấp retry.

---

## 5. Các Quy Tắc Và Tiêu Chuẩn: Cơ Sở Dữ Liệu (Database Principles)

### 5.1 Khung Lựa Chọn: Relational (RDBMS) vs. NoSQL
- **Cơ sở dữ liệu quan hệ (PostgreSQL, MySQL, SQL Server)**:
  - *Lựa chọn khi*: Tính toàn vẹn giao dịch (ACID) là tối thượng, dữ liệu có nhiều mối quan hệ khóa ngoại phức tạp, nghiệp vụ yêu cầu báo cáo tài chính hoặc kế toán.
- **Cơ sở dữ liệu dạng tài liệu (MongoDB)**:
  - *Lựa chọn khi*: Dữ liệu có cấu trúc phân cấp linh hoạt, tài liệu mang tính khép kín (như danh mục sản phẩm với hàng trăm thuộc tính biến thiên) hoặc đòi hỏi tốc độ ghi cao kèm phân mảnh ngang (Sharding).

### 5.2 Thiết Kế Lược Đồ & Ràng Buộc Toàn Vẹn (BẮT BUỘC - MUST)
1. **Khóa Chính (Primary Key)**: Mọi bảng quan hệ BẮT BUỘC phải có khóa chính (`BIGINT AUTO_INCREMENT/IDENTITY` hoặc `UUID v7` cho hệ thống phân tán).
2. **Khóa Ngoại (Foreign Key)**: Thiết lập ràng buộc khóa ngoại trực tiếp trong database (`REFERENCES bang_khac(id)`). Không dựa dẫm vào kiểm tra trong code backend.
3. **Giá trị Null**: Các cột BẮT BUỘC phải là `NOT NULL` theo mặc định, trừ khi việc để trống mang ý nghĩa nghiệp vụ xác thực.
4. **Ràng buộc Check & Unique**: Đưa các điều kiện miền giá trị vào database (ví dụ: `CHECK (don_gia >= 0)`, `UNIQUE (email)`).

### 5.3 Quản Lý Giao Dịch & Kiểm Soát Đồng Thời (ACID)
1. **Ranh giới Transaction (BẮT BUỘC - MUST)**: Các thao tác thay đổi nhiều bảng liên quan BẮT BUỘC phải nằm trong một giao dịch (`BEGIN TRANSACTION ... COMMIT`).
2. **Ngăn chặn cập nhật đè (Lost Updates)**:
   - **Khóa Lạc Quan (Optimistic Locking - Ưu tiên)**: Thêm cột `version INT DEFAULT 0`. Khi update kiểm tra phiên bản:
     ```sql
     UPDATE tai_khoan SET so_du = 500, version = version + 1 
     WHERE id = 10 AND version = 2;
     ```
     Nếu số dòng được cập nhật bằng 0, ném ra lỗi xung đột để client retry.
   - **Khóa Bi Quan (Pessimistic Locking)**: `SELECT ... FOR UPDATE` chỉ dùng trong các giao dịch có độ cạnh tranh cực cao và thời gian xử lý siêu ngắn (giữ chỗ mua vé máy bay theo thời gian thực).

### 5.4 Xóa Mềm (Soft Delete) vs. Xóa Cứng (Hard Delete)
- **Xóa mềm** (`deleted_at TIMESTAMP NULL`):
  - *Sử dụng cho*: Dữ liệu nghiệp vụ cần lưu vết kiểm toán (Đơn hàng, Hóa đơn, Khách hàng).
  - *Quy tắc*: Tạo chỉ mục một phần (Partial Index: `WHERE deleted_at IS NULL`) để không làm ảnh hưởng tới hiệu năng tìm kiếm và ràng buộc Unique.
- **Xóa cứng**:
  - *Sử dụng cho*: Dữ liệu tạm thời (phiên đăng nhập, mã xác thực OTP) hoặc yêu cầu quyền được quên theo luật bảo vệ dữ liệu (GDPR).

---

## 6. Chiến Lược Tiến Hóa Schema Không Gián Đoạn (Expand & Contract Pattern)
Khi thay đổi cấu trúc bảng hoặc nâng cấp API trên môi trường Production, TUYỆT ĐỐI KHÔNG thực hiện thay đổi phá vỡ tương thích (Breaking Change) trong một lần deploy. BẮT BUỘC áp dụng mô hình **Expand and Contract (Parallel Run)**:
1. **Giai đoạn 1 (Expand)**: Thêm cột mới hoặc trường API mới vào hệ thống (giữ nguyên cột cũ). Cột mới phải là `NULLABLE` hoặc có `DEFAULT`.
2. **Giai đoạn 2 (Parallel Write)**: Backend ghi dữ liệu song song vào cả cột cũ và cột mới; đọc dữ liệu ưu tiên từ cột mới.
3. **Giai đoạn 3 (Backfill Data)**: Chạy script nền di chuyển dữ liệu lịch sử từ cột cũ sang cột mới.
4. **Giai đoạn 4 (Contract)**: Chuyển toàn bộ client sang dùng trường mới, sau đó xóa bỏ cột cũ và mã code cũ một cách an toàn.

---

## 7. Thực Hành Tốt Và Anti-Pattern Cần Tránh

| Danh mục | Anti-Pattern (Thói quen xấu ❌) | Giải pháp Tiêu Chuẩn (✅) |
| :--- | :--- | :--- |
| **API** | Dùng method `GET /users/delete?id=12` để thực hiện xóa. | Dùng đúng động từ: `DELETE /users/12` kèm kiểm tra quyền. |
| **API** | Trả về mảng JSON trần ở cấp gốc: `[{}, {}]` (khó bổ sung trường metadata sau này). | Bao bọc dữ liệu trong Object: `{ "data": [...], "pagination": {...} }`. |
| **Database** | Quên tạo Index trên các cột khóa ngoại và các cột thường xuyên dùng trong điều kiện tìm kiếm. | Luôn đánh chỉ mục (B-Tree Index) trên các khóa ngoại và cột lọc có độ phân biệt dữ liệu cao. |
| **Database** | Chạy truy vấn không giới hạn: `SELECT * FROM lich_su_giao_dich;` không có `LIMIT`. | Luôn bắt buộc có `LIMIT` và phân trang tại tầng Repository. |
| **Database** | Chạy lệnh sửa bảng trực tiếp trên môi trường Production bằng tay. | Sử dụng công cụ migration tự động có quản lý mã nguồn (Flyway, Liquibase, Prisma, Knex). |

---

## 8. Ví Dụ Mã Nguồn Thực Tế (Code Examples)

### 7.1 Controller REST Phân Trang Chuẩn Mực (TypeScript / Express)
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

### 7.2 File Script Database Migration Chuẩn Toàn Vẹn (PostgreSQL)
```sql
-- V2__tao_bang_don_hang_va_chi_tiet.sql
CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    total_amount NUMERIC(12, 2) NOT NULL,
    version INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ NULL,

    -- Ràng buộc khóa ngoại và logic dữ liệu
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT chk_orders_positive_total CHECK (total_amount >= 0)
);

-- Đánh chỉ mục cho khóa ngoại và truy vấn dữ liệu hoạt động
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_active ON orders(created_at DESC) WHERE deleted_at IS NULL;
```

### 7.3 Xác Minh Chữ Ký Webhook An Toàn Tuyệt Đối (Node.js)
```typescript
import crypto from "crypto";

export function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload, "utf8")
    .digest("hex");

  // So sánh chuỗi với thời gian cố định (Constant-Time) để chống tấn công Timing Attack
  return crypto.timingSafeEqual(
    Buffer.from(signature, "hex"),
    Buffer.from(expectedSignature, "hex")
  );
}
```

---

## 9. Lưu Ý Theo Từng Công Nghệ Cụ Thể (Technology Notes)
- **PostgreSQL**:
  - Luôn chọn kiểu `TIMESTAMPTZ` để lưu thời gian kèm múi giờ chuẩn, tránh sai lệch múi giờ khi triển khai đa vùng.
  - Tận dụng kiểu cột `JSONB` để lưu trữ các thuộc tính linh hoạt mà không cần đổi sang NoSQL.
- **MySQL (InnoDB)**:
  - Luôn sử dụng bộ mã ký tự `utf8mb4` và collation `utf8mb4_unicode_ci` để hỗ trợ đầy đủ các ký tự tiếng Việt và emoji.
  - Thiết lập rõ ràng hành vi xóa của khóa ngoại (`ON DELETE RESTRICT` hoặc `ON DELETE CASCADE`).
- **SQL Server (T-SQL)**:
  - Dùng kiểu `DATETIMEOFFSET` cho thời gian có múi giờ.
  - Sử dụng kiểu cột `ROWVERSION` để hệ thống tự động quản lý phiên bản cho Optimistic Concurrency.
- **MongoDB**:
  - Nhúng (Embed) với quan hệ 1-vài (1-to-few); Tham chiếu (Reference) với quan hệ 1-nhiều hoặc dữ liệu cập nhật liên tục.
  - Áp dụng JSON Schema Validation (`$jsonSchema`) để đảm bảo tính toàn vẹn kiểu dữ liệu của Document.

---

## 10. Bảng Tự Kiểm Tra Thực Tế (Implementation Checklist)
- [ ] Đường dẫn API sử dụng danh từ số nhiều và dùng đúng động từ HTTP.
- [ ] Định dạng lỗi phản hồi tuân thủ cấu trúc JSON thống nhất với mã lỗi nghiệp vụ.
- [ ] Tất cả endpoint trả về danh sách đều áp dụng giới hạn phân trang bắt buộc.
- [ ] Các câu lệnh truy vấn database đều được tham số hóa 100%.
- [ ] Ràng buộc khóa ngoại, `NOT NULL` và kiểm tra miền giá trị được khai báo trong database.
- [ ] Các thay đổi lược đồ database được quản lý qua công cụ Migration trong Git.
- [ ] Toàn bộ các cột khóa ngoại đều được đánh chỉ mục (Index).
- [ ] Các thao tác nhạy cảm (thanh toán, đổi tiền) hỗ trợ Idempotency Key.
- [ ] Webhook được xác minh chữ ký bảo mật bằng hàm so sánh an toàn constant-time.

---

## 11. Sai Lầm Phổ Biến Và Ngoại Lệ (Mistakes & Exceptions)
- **Tạo sự thay đổi phá vỡ tương thích (Breaking Changes)**: Tự ý xóa hoặc đổi tên trường trong API công khai sẽ làm sập ứng dụng Mobile đã cài đặt của khách hàng. Hãy luôn bổ sung trường mới hoặc nâng phiên bản API (`/api/v2`).
- **Lỗi truy vấn N+1 (N+1 Query Problem)**: Lấy danh sách 100 đơn hàng, sau đó chạy vòng lặp 100 câu query để lấy thông tin người mua. Hãy dùng lệnh `JOIN` hoặc gom truy vấn theo mảng ID (`WHERE id IN (...)`).
- **Đánh Index bừa bãi**: Đánh index trên tất cả các cột của bảng sẽ làm chậm đáng kể tốc độ ghi (INSERT/UPDATE). Chỉ đánh index trên các cột thực sự tham gia vào `WHERE`, `JOIN` và `ORDER BY`.

---

## 12. Tài Liệu Tham Khảo Uy Tín (References)
- Hướng dẫn thiết kế REST API của Microsoft: https://github.com/microsoft/api-guidelines
- Chuẩn định dạng lỗi RFC 7807 (Problem Details for HTTP APIs): https://datatracker.ietf.org/doc/html/rfc7807
- Tài liệu chính thức PostgreSQL về Transaction & Index: https://www.postgresql.org/docs/current/
- Đặc tả OpenAPI 3.1: https://spec.openapis.org/oas/latest.html
- Hướng dẫn Idempotent Requests từ Stripe: https://stripe.com/docs/api/idempotent_requests

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
| **07** | **Thiết Kế API & Cơ Sở Dữ Liệu** *(Tài liệu này)* | RESTful contracts, Idempotency, Indexing, Transactions |
| **08** | [Hiệu Năng, Khả Năng Tiếp Cận & Vận Hành](./08-performance-accessibility-and-operations.md) | Core Web Vitals, a11y WCAG 2.2 AA, SRE & Observability |
