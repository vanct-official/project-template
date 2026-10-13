# 04 — Bảo Mật & Toàn Vẹn Dữ Liệu (Security & Data Integrity)

> **Cấp độ áp dụng**: BẮT BUỘC (MANDATORY)  
> **Trạng thái**: ĐÃ PHÊ DUYỆT (APPROVED) | **Phiên bản**: 2.0.0  
> **Phạm vi**: Toàn bộ dự án (React Frontend, Express Backend, Spring Boot Backend, Database & CI/CD)

## 1. Mục Đích Tài Liệu (Document Purpose)
Tài liệu này xác lập các tiêu chuẩn an toàn thông tin, kiểm soát toàn vẹn dữ liệu và yêu cầu lập trình phòng thủ (Defensive Programming) cho toàn bộ đội ngũ phát triển ứng dụng Web và Mobile. Việc tuân thủ tài liệu này đảm bảo hệ thống được bảo vệ vững chắc trước các lỗ hổng bảo mật nghiêm trọng (bao gồm OWASP Top 10), chống thất thoát dữ liệu và ngăn chặn truy cập trái phép ở mọi giai đoạn vòng đời phần mềm.

---

## 2. Phạm Vi Áp Dụng (Scope and Applicability)
- **Hệ thống áp dụng**: Toàn bộ ứng dụng phía máy khách (Web / Mobile App), các API máy chủ Backend, các tầng cơ sở dữ liệu, worker chạy nền và quy trình CI/CD triển khai.
- **Tiêu chuẩn đối chiếu**: Trực tiếp ánh xạ theo tiêu chuẩn xác minh bảo mật ứng dụng OWASP ASVS và danh mục rủi ro OWASP Top 10.
- **Yêu cầu bắt buộc vs Khuyến nghị**: Các biện pháp phòng thủ cốt lõi (chống SQL Injection, băm mật khẩu chuẩn, kiểm soát phân quyền tài nguyên) là BẮT BUỘC (MUST) cho mọi dự án. Các giải pháp nâng cao (như HSM phần cứng, engine ABAC) được áp dụng dựa trên mức độ rủi ro của từng hệ thống.

---

## 3. Các Nguyên Tắc Cốt Lõi (Core Principles)
- **Mặc định an toàn (Secure by Default)**: Hệ thống BẮT BUỘC phải hoạt động ở cấu hình bảo mật và hạn chế quyền nhất ngay từ đầu. Quyền hạn chỉ được mở khi có yêu cầu rõ ràng, tuyệt đối không mở sẵn.
- **Đặc quyền tối thiểu (Principle of Least Privilege - PoLP)**: Mọi dịch vụ, tài khoản database, token và người dùng BẮT BUỘC chỉ được cấp tập hợp quyền tối thiểu cần thiết để hoàn thành nhiệm vụ.
- **Phòng thủ theo chiều sâu (Defense in Depth)**: Các chốt chặn bảo mật BẮT BUỘC phải được triển khai ở nhiều lớp độc lập (ví dụ: kiểm tra phía client + giới hạn tần suất ở API Gateway + kiểm tra quyền ở Service + câu lệnh tham số hóa ở Database + mã hóa đường truyền TLS).
- **Không tin tưởng bất kỳ ai (Zero Trust - Never Trust, Always Verify)**: Không bao giờ giả định rằng các request đến từ mạng nội bộ hoặc client đã đăng nhập là hoàn toàn an toàn. Phải kiểm tra tính hợp lệ, xác thực và phân quyền ở từng ranh giới.
- **Thất bại an toàn (Fail Securely)**: Khi việc kiểm tra bảo mật hoặc giao dịch gặp sự cố, hệ thống BẮT BUỘC phải mặc định từ chối quyền truy cập và rollback trạng thái sạch sẽ, tuyệt đối không làm lộ mã lỗi nội bộ hoặc stack trace ra bên ngoài.

---

## 4. Các Quy Tắc Và Tiêu Chuẩn (Rules and Standards)

### 4.1 Xác Thực & Phân Quyền (Authentication & Authorization)
1. **Băm Mật Khẩu (BẮT BUỘC - MUST)**: Mật khẩu người dùng BẮT BUỘC phải được băm bằng các thuật toán hiện đại có khả năng điều chỉnh độ khó: **Argon2id** (ưu tiên), **BCrypt** (work factor $\ge 12$), hoặc **PBKDF2**. Tuyệt đối cấm sử dụng các thuật toán cũ đã lỗi thời (`MD5`, `SHA-1`, hoặc `SHA-256` không có muối).
2. **Tách Biệt Xác Thực và Phân Quyền (BẮT BUỘC - MUST)**:
   - *Xác thực (Authentication - AuthN)*: Xác minh danh tính ("Bạn là ai?").
   - *Phân quyền (Authorization - AuthZ)*: Xác minh quyền hạn ("Bạn có được phép thực hiện hành động này trên tài nguyên này hay không?").
3. **Chống Lỗ Hổng Phân Quyền Cấp Đối Tượng (BOLA / IDOR) (BẮT BUỘC - MUST)**: Mọi thao tác truy cập tài nguyên (ví dụ: `/api/orders/{id}`) BẮT BUỘC phải kiểm tra xem người dùng hiện tại có thực sự sở hữu hoặc có quyền truy cập vào bản ghi đó không, không chỉ kiểm tra việc họ đã đăng nhập.
4. **Bảo Mật JSON Web Token - JWT (BẮT BUỘC - MUST)**:
   - Access token NÊN có thời hạn sống ngắn (từ 5 đến 15 phút).
   - Refresh token BẮT BUỘC phải lưu trữ an toàn (dùng Cookie có cờ `HttpOnly`, `Secure`, `SameSite=Strict/Lax`) và thu hồi ngay khi đăng xuất hoặc phát hiện bị dùng lại.
   - Thuật toán ký token BẮT BUỘC phải đưa vào danh sách trắng cụ thể (`RS256` hoặc `HS256`); tuyệt đối từ chối token có `alg: "none"`.

### 4.2 Phòng Ngừa Injection & An Toàn Giao Vận
1. **Truy Vấn Có Tham Số Hóa (BẮT BUỘC - MUST)**: Toàn bộ câu lệnh truy vấn cơ sở dữ liệu BẮT BUỘC phải dùng Parameterized Query, Prepared Statement hoặc ORM chuẩn. Tuyệt đối cấm ghép chuỗi trực tiếp dữ liệu người dùng vào câu lệnh SQL.
2. **Mã Hóa Đầu Ra & Chống XSS (BẮT BUỘC - MUST)**: Mọi dữ liệu động do người dùng nhập vào khi hiển thị lên HTML, thuộc tính thẻ hoặc JavaScript BẮT BUỘC phải được mã hóa (HTML Encoding). Các framework hiện đại (React, Vue, Angular) tự động xử lý việc này; tuyệt đối không bỏ qua cơ chế này (ví dụ: tránh dùng `dangerouslySetInnerHTML`) nếu chưa được rà soát bảo mật.
3. **Mã Hóa Đường Truyền HTTPS (BẮT BUỘC - MUST)**: Toàn bộ lưu lượng truy cập môi trường Production BẮT BUỘC phải dùng giao thức TLS 1.3 / 1.2 kèm cấu hình header HSTS (`Strict-Transport-Security`).
4. **Cấu Hình CORS Chặt Chẽ (BẮT BUỘC - MUST)**: Tuyệt đối không cấu hình CORS ở môi trường Production với `Access-Control-Allow-Origin: *` khi có kèm theo thông tin đăng nhập/cookie. Phải chỉ định danh sách domain tin cậy cụ thể.
5. **Giới Hạn Tần Suất & Chống Brute Force (BẮT BUỘC - MUST)**: Các endpoint nhạy cảm (đăng nhập, quên mật khẩu, thanh toán, gửi mã OTP) BẮT BUỘC phải áp dụng cơ chế giới hạn tần suất (Rate Limiting) theo địa chỉ IP và tài khoản.

### 4.3 Quản Lý Khóa Bí Mật & Chuỗi Cung Ứng
1. **Tuyệt Đối Không Commit Khóa Bí Mật Vào Git (BẮT BUỘC - MUST)**: Khóa API, mật khẩu database, chứng chỉ số và Secret Key TUYỆT ĐỐI KHÔNG ĐƯỢC commit vào Git. Phải đưa file `.env` vào `.gitignore` và quản lý qua biến môi trường hoặc Secret Vault (AWS Secrets Manager, HashiCorp Vault).
2. **Ghi Log An Toàn (BẮT BUỘC - MUST)**: File log TUYỆT ĐỐI KHÔNG được chứa Mật khẩu, mã PIN, mã CVV thẻ tín dụng, token JWT Bearer hoặc dữ liệu định danh cá nhân nhạy cảm (PII).
3. **Bảo Mật Tải Lên Tập Tin (File Upload) (BẮT BUỘC - MUST)**:
   - Kiểm tra định dạng file bằng Byte Magic Numbers, không chỉ dựa vào đuôi file `.png` hay MIME-type do trình duyệt gửi lên.
   - Lưu trữ file tải lên ở dịch vụ Object Storage riêng biệt (S3, Cloudflare R2), nằm ngoài thư mục thực thi web.
   - Khử toàn bộ siêu dữ liệu EXIF và tối ưu lại ảnh để loại bỏ mã độc tiềm ẩn.

---

## 5. Giải Thích Chi Tiết: Các Lỗ Hổng Bảo Mật Điển Hình

### 5.1 Tấn Công Tiêm Lệnh SQL (SQL Injection - SQLi)
Xảy ra khi dữ liệu người dùng không được kiểm soát bị ghép nối trực tiếp vào câu lệnh SQL, cho phép kẻ tấn công thay đổi cấu trúc truy vấn nhằm đọc trộm hoặc xóa sạch dữ liệu.
- **Biện pháp**: Luôn sử dụng Parameter Binding (tham số hóa). Database engine sẽ xử lý tham số hoàn toàn dưới dạng dữ liệu tĩnh, không bao giờ coi nó là lệnh SQL thực thi.

### 5.2 Tấn Công Cross-Site Scripting (XSS)
Xảy ra khi mã script độc hại được chèn vào trang web và chạy trên trình duyệt của người dùng khác (Stored XSS, Reflected XSS hoặc DOM-based XSS).
- **Biện pháp**: Mã hóa đầu ra phù hợp ngữ cảnh, cấu hình Content Security Policy (CSP) và lưu token đăng nhập trong Cookie `HttpOnly` để JavaScript độc hại không thể đánh cắp.

### 5.3 Tấn Công Cross-Site Request Forgery (CSRF)
Lừa trình duyệt của người dùng đang có phiên đăng nhập hợp lệ thực hiện một hành động ngoài ý muốn trên ứng dụng mục tiêu.
- **Biện pháp**: Cấu hình thuộc tính Cookie `SameSite=Lax` hoặc `Strict`, sử dụng Anti-CSRF token cho các thao tác thay đổi dữ liệu (POST/PUT/DELETE) hoặc sử dụng header `Authorization: Bearer <token>`.

### 5.4 Tấn Công Server-Side Request Forgery (SSRF)
Xảy ra khi máy chủ nhận một đường dẫn URL từ người dùng và tự động gửi request tới đó mà không kiểm tra, tạo điều kiện cho hacker quét mạng nội bộ hoặc truy cập dịch vụ siêu dữ liệu đám mây (ví dụ: `169.254.169.254` của AWS).
- **Biện pháp**: Kiểm tra URL dựa trên danh sách domain cho phép (Whitelist); chặn hoàn toàn các dải IP nội bộ và loopback (`10.0.0.0/8`, `192.168.0.0/16`, `127.0.0.1`, `169.254.0.0/16`).

---

## 6. Mô Hình Phân Quyền: So Sánh RBAC và ABAC

| Đặc tính | Phân quyền theo vai trò (RBAC) | Phân quyền theo thuộc tính (ABAC) |
| :--- | :--- | :--- |
| **Khái niệm** | Gán quyền cho các Vai trò (`ADMIN`, `EDITOR`, `VIEWER`), sau đó gán Người dùng vào Vai trò tương ứng. | Đưa ra quyết định dựa trên các thuộc tính động: Người dùng, Tài nguyên, Hành động và Môi trường. |
| **Trường hợp áp dụng** | Phân quyền cơ bản, hệ thống quy mô nhỏ đến vừa, cấu trúc phân cấp tĩnh. | Quy tắc ngữ cảnh phức tạp (ví dụ: *"Bác sĩ chỉ được xem hồ sơ bệnh án NẾU bác sĩ được phân công cho bệnh nhân ĐÓ VÀ đang trong ca trực"*). |
| **Độ phức tạp** | Thấp, kiểm tra nhanh chóng, lưu trữ đơn giản trong quan hệ bảng. | Cao hơn, đòi hỏi engine đánh giá chính sách riêng (như Open Policy Agent - OPA). |

---

## 7. Thực Hành Tốt Và Anti-Pattern Cần Tránh

| Danh mục | Anti-Pattern (Thói quen xấu ❌) | Thực hành bảo mật chuẩn (✅) |
| :--- | :--- | :--- |
| **Lưu trữ** | Lưu Access Token trong `localStorage` (dễ dàng bị lấy cắp bởi bất kỳ script XSS nào). | Lưu trữ session/refresh token trong Cookie có cờ `HttpOnly`, `Secure`, `SameSite`. |
| **Phân quyền** | Tin tưởng tham số client gửi lên mà không kiểm tra (`req.body.userId`). | Luôn trích xuất danh tính người dùng từ phiên đăng nhập hoặc claims đã được ký của JWT. |
| **Khóa bí mật** | Đẩy Secret Key lên Git rồi tạo commit sau để xóa (vẫn lưu vĩnh viễn trong lịch sử Git). | Dùng biến môi trường, đưa file `.env` vào `.gitignore` và cài đặt công cụ quét secret (Gitleaks). |
| **Thông báo lỗi** | Trả về toàn bộ chi tiết stack trace và câu lệnh SQL lỗi ra ngoài client. | Ghi chi tiết lỗi vào log nội bộ; chỉ trả về thông báo lỗi tổng quát, an toàn cho người dùng. |
| **Giao dịch** | Trừ tiền tài khoản mà không dùng Transaction database. | Sử dụng giao dịch nguyên tử (`BEGIN ... COMMIT`) với mức độ cô lập (Isolation level) phù hợp. |

---

## 8. Ví Dụ Mã Nguồn Thực Tế (Code Examples)

### 8.1 Chống Lỗ Hổng SQL Injection Bằng Tham Số Hóa (Node.js / PostgreSQL)
```typescript
// ❌ XẤU: Lỗ hổng SQL Injection nghiêm trọng do ghép chuỗi thô
async function findUserUnsafe(reqEmail: string) {
  const query = `SELECT id, email, role FROM users WHERE email = '${reqEmail}'`;
  return await db.query(query); // Kẻ tấn công có thể truyền vào: ' OR '1'='1
}

// ✅ TỐT: Truy vấn có tham số hóa (Dữ liệu đầu vào được đối xử thuần túy như chuỗi dữ liệu)
async function findUserSafe(reqEmail: string) {
  const query = `SELECT id, email, role FROM users WHERE email = $1`;
  return await db.query(query, [reqEmail]);
}
```

### 8.2 Băm Và Xác Minh Mật Khẩu Chuẩn An Toàn (Java / BCrypt)
```java
// ✅ TỐT: Xử lý mật khẩu an toàn với BCrypt Work Factor >= 12
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordSecurityService {
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);

    public String hashPassword(String rawPassword) {
        if (rawPassword == null || rawPassword.length() < 8) {
            throw new IllegalArgumentException("Mật khẩu phải chứa ít nhất 8 ký tự");
        }
        return passwordEncoder.encode(rawPassword);
    }

    public boolean verifyPassword(String rawPassword, String storedHash) {
        return passwordEncoder.matches(rawPassword, storedHash);
    }
}
```

### 8.3 Kiểm Soát Quyền Trên Cấp Đối Tượng (Chống BOLA / IDOR)
```typescript
// ✅ TỐT: Máy chủ luôn xác thực quyền sở hữu tài nguyên trước khi trả kết quả
export async function getInvoiceDetails(invoiceId: string, currentUserId: string) {
  const invoice = await invoiceRepository.findById(invoiceId);
  
  if (!invoice) {
    throw new NotFoundException("Không tìm thấy hóa đơn");
  }

  // Xác minh quyền sở hữu tường minh
  if (invoice.ownerId !== currentUserId) {
    // Trả về Forbidden hoặc Not Found để không làm lộ sự tồn tại của tài nguyên
    throw new ForbiddenException("Bạn không có quyền truy cập vào hóa đơn này");
  }

  return invoice;
}
```

---

## 9. Lưu Ý Theo Từng Công Nghệ Cụ Thể (Technology Notes)
- **React / Frontend**:
  - Không bao giờ đặt khóa bí mật của Backend (như Secret Key cổng thanh toán) trong mã nguồn React; các tiền tố `VITE_` hay `REACT_APP_` đều được đóng gói công khai vào file JS gửi về trình duyệt.
  - Sử dụng thư viện `DOMPurify` để khử độc khi bắt buộc phải hiển thị HTML do người dùng nhập.
- **Express.js**:
  - Luôn kích hoạt middleware `helmet()` để tự động cấu hình các HTTP Header bảo mật (CSP, X-Content-Type-Options, HSTS).
- **Spring Boot**:
  - Tận dụng annotation bảo mật ở tầng method (`@PreAuthorize("hasRole('ADMIN')")`) để kiểm soát truy cập.
  - Bật bảo vệ CSRF khi ứng dụng tương tác qua cookie trên trình duyệt.
- **Mobile (iOS / Android)**:
  - Lưu trữ các khóa nhạy cảm trong phân vùng phần cứng an toàn (Keychain trên iOS, Keystore/EncryptedSharedPreferences trên Android); không lưu plaintext trong `AsyncStorage` hay `SharedPreferences`.

---

## 10. Bảng Tự Kiểm Tra Thực Tế (Implementation Checklist)
- [ ] Không có câu lệnh SQL nào ghép chuỗi biến đầu vào trực tiếp.
- [ ] Mật khẩu được băm bằng BCrypt (cost factor $\ge 12$) hoặc Argon2id.
- [ ] Refresh token được lưu trong Cookie có đầy đủ cờ `HttpOnly`, `Secure`, `SameSite`.
- [ ] Tất cả endpoint lấy chi tiết dữ liệu đều kiểm tra quyền sở hữu đối tượng của người dùng hiện tại.
- [ ] Giới hạn tần suất (Rate Limiting) được kích hoạt cho các route đăng nhập, đăng ký và quên mật khẩu.
- [ ] Toàn bộ môi trường production đều bắt buộc truy cập qua HTTPS.
- [ ] File `.env` và các chứng chỉ số đã nằm trong danh mục `.gitignore`.
- [ ] Công cụ quét rò rỉ secret (Gitleaks, TruffleHog) được tích hợp vào pipeline CI.
- [ ] Mã lỗi trả về client đã được chuẩn hóa, không để lộ stack trace hệ thống.

---

## 11. Sai Lầm Phổ Biến Và Ngoại Lệ (Mistakes & Exceptions)
- **"Chúng tôi ở sau mạng nội bộ VPN nên không cần xác thực giữa các service"**: Vi phạm nguyên tắc Zero Trust. Khi kẻ tấn công xâm nhập được vào 1 máy trong mạng nội bộ, họ sẽ di chuyển ngang (lateral movement) dễ dàng nếu thiếu kiểm soát.
- **Chỉ kiểm tra tính hợp lệ ở phía Client**: Kiểm tra email hay độ dài mật khẩu trên React/Mobile chỉ nhằm mục đích nâng cao trải nghiệm người dùng; hacker hoàn toàn có thể bỏ qua giao diện để bắn request trực tiếp qua Postman hoặc Curl. Mọi dữ liệu BẮT BUỘC phải kiểm tra lại ở Backend.
- **Bảo mật qua sự che giấu (Security through Obscurity)**: Đổi đường dẫn `/admin` thành `/khu-vuc-bi-mat` không thay thế được cơ chế xác thực và phân quyền nghiêm ngặt.

---

## 12. Tài Liệu Tham Khảo Uy Tín (References)
- Danh mục lỗ hổng OWASP Top 10: https://owasp.org/www-project-top-ten/
- Tiêu chuẩn kiểm định bảo mật ứng dụng OWASP ASVS: https://owasp.org/www-project-application-security-verification-standard/
- Tuyển tập hướng dẫn bảo mật OWASP Cheat Sheet Series: https://cheatsheetseries.owasp.org/
- Hướng dẫn định danh điện tử NIST (SP 800-63B): https://pages.nist.gov/800-63-3/sp800-63b.html

---

## 13. Các Tài Liệu Liên Quan Trong Bộ Tiêu Chuẩn

| Số thứ tự | Tên tài liệu chuẩn hóa | Trọng tâm kỹ thuật |
| :---: | :--- | :--- |
| **Portal** | [Cổng Tiêu Chuẩn Kỹ Thuật Dự Án](./README.md) | Khung kiến trúc tổng thể, quy trình RFC & ma trận đọc hiểu |
| **01** | [Quy Chuẩn Đặt Tên & Cú Pháp Mã Nguồn](./01-naming-conventions-and-syntax-standards.md) | Intention-revealing, Case styles, Bảng tra cứu đa ngôn ngữ |
| **02** | [Nguyên Lý Clean Code & Thiết Kế Phần Mềm](./02-clean-code-and-design-principles.md) | SOLID, KISS, DRY, Guard clauses, Quản lý độ phức tạp |
| **03** | [Kiến Trúc & Mẫu Thiết Kế Phần Mềm](./03-architecture-and-design-patterns.md) | Phân tầng Layered, Hexagonal, Dependency Injection, ADR |
| **04** | **Bảo Mật & Toàn Vẹn Dữ Liệu** *(Tài liệu này)* | OWASP Top 10, Zero Trust, RBAC/BOLA, Mã hóa & Secrets |
| **05** | [Kiểm Thử & Đảm Bảo Chất Lượng](./05-testing-and-quality-assurance.md) | Test Pyramid, AAA Pattern, Zero-flakiness, Quality Gates |
| **06** | [Quy Trình Git & Hợp Tác Nhóm](./06-git-workflow-and-team-collaboration.md) | Conventional Commits, Phân nhánh, Code Review Checklist |
| **07** | [Thiết Kế API & Cơ Sở Dữ Liệu](./07-api-design-and-database-principles.md) | RESTful contracts, Idempotency, Indexing, Transactions |
| **08** | [Hiệu Năng, Khả Năng Tiếp Cận & Vận Hành](./08-performance-accessibility-and-operations.md) | Core Web Vitals, a11y WCAG 2.2 AA, SRE & Observability |
