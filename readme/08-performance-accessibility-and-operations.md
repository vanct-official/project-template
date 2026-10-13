# 08 — Hiệu Năng, Khả Năng Tiếp Cận & Vận Hành (Performance, Accessibility & Operations)

> **Cấp độ áp dụng**: BẮT BUỘC (MANDATORY)  
> **Trạng thái**: ĐÃ PHÊ DUYỆT (APPROVED) | **Phiên bản**: 2.0.0  
> **Phạm vi**: Toàn bộ dự án (React Frontend, Express Backend, Spring Boot Backend, Docker & CI/CD)

## 1. Mục Đích Tài Liệu (Document Purpose)
Tài liệu này xác lập các tiêu chuẩn kỹ thuật toàn diện cho việc tối ưu hóa hiệu năng ứng dụng (Performance), đảm bảo khả năng tiếp cận kỹ thuật số (Accessibility - a11y) và duy trì độ tin cậy vận hành hệ thống (DevOps / SRE). Tài liệu giúp các hệ thống đạt tốc độ tải phản hồi nhanh, thân thiện và sử dụng được cho mọi người dùng bất kể hạn chế về thể chất hay thiết bị, đồng thời vận hành ổn định trên Production với quy trình giám sát và phục hồi đã được xác thực thực tế.

---

## 2. Phạm Vi Áp Dụng (Scope and Applicability)
- **Hiệu năng (Performance)**: Tốc độ render phía Client, tối ưu gói mã nguồn (Bundle), ngân sách phản hồi API, các tầng lưu trữ đệm (Cache) và độ trễ truy vấn Database.
- **Khả năng tiếp cận (Accessibility - a11y)**: Tiêu chuẩn WCAG 2.1 / 2.2 cấp độ AA áp dụng cho ứng dụng Web, Ứng dụng Di động (Mobile App iOS/Android) và giao diện phần mềm.
- **Vận hành (Operations & SRE)**: Đóng gói container (Docker), quy trình triển khai CI/CD, phân lập môi trường, hệ thống giám sát và ghi log tập trung, cơ chế kiểm tra sức khỏe hệ thống (Health Probes) và kế hoạch phục hồi sau thảm họa (Disaster Recovery).
- **Đối tượng hướng đến**: Toàn bộ kỹ sư Fullstack, kỹ sư Frontend, chuyên viên DevOps/SRE và kỹ sư kiểm thử QA.

---

## 3. Các Nguyên Tắc Cốt Lõi (Core Principles)
- **Xác thực thực tế, không suy đoán (Validate, Never Assume)**: Hiệu năng, khả năng tiếp cận và kịch bản phục hồi sau sự cố KHÔNG THỂ chỉ dựa vào phỏng đoán; chúng BẮT BUỘC phải được đo lường, kiểm thử tự động và diễn tập thực tế.
- **Hiệu năng là một tính năng cốt lõi (Performance is a Feature)**: Độ trễ cao làm giảm tỷ lệ chuyển đổi, gây ức chế cho người dùng và tăng chi phí hạ tầng. Phải thiết lập ngân sách hiệu năng (Performance Budget) ngay từ khâu thiết kế.
- **Tiếp cận toàn diện cho mọi người (a11y by Default)**: Xây dựng ứng dụng mà mọi người đều dùng được là trách nhiệm đạo đức và tiêu chuẩn pháp lý bắt buộc, không phải tính năng phụ thêm. Hãy thiết kế khả năng tiếp cận từ bản vẽ wireframe cho tới dòng code hoàn thiện.
- **Hệ thống có thể quan sát được (Observable by Design)**: Bất kỳ dịch vụ nào chạy trên Production BẮT BUỘC phải phát ra log có cấu trúc, các chỉ số đo lường (Metrics) và endpoint kiểm tra sức khỏe để kịp thời phát hiện sự cố nội bộ.
- **Triển khai tự động và bất biến (Automated, Immutable Deployments)**: Toàn bộ bản dựng và container phải có tính bất biến, được đánh phiên bản rõ ràng và triển khai tự động qua pipeline CI/CD, không chỉnh sửa trực tiếp trên máy chủ Production.

---

## 4. Các Quy Tắc Và Tiêu Chuẩn: Hiệu Năng (Performance)

### 4.1 Ngân Sách Hiệu Năng Frontend & Core Web Vitals (MUST)
Ứng dụng Web BẮT BUỘC phải nhắm tới việc đáp ứng các ngưỡng chỉ số Google Core Web Vitals sau:
- **LCP (Largest Contentful Paint)**: $\le 2.5\text{ giây}$ (thời gian hiển thị phần nội dung lớn nhất).
- **INP (Interaction to Next Paint)**: $\le 200\text{ mili-giây}$ (độ phản hồi mượt mà khi người dùng tương tác).
- **CLS (Cumulative Layout Shift)**: $\le 0.1$ (độ dịch chuyển bố cục giao diện đột ngột ngoài ý muốn).

### 4.2 Tối Ưu Hóa Gói Mã Nguồn & Tài Nguyên Tĩnh (MUST)
1. **Phân tách mã nguồn & Tải lười (Code Splitting & Lazy Loading)**: Các trang màn hình và thư viện bên thứ ba có dung lượng lớn (biểu đồ Chart, trình soạn thảo Rich Text) BẮT BUỘC phải tải lười qua cơ chế Dynamic Import (`React.lazy()`, `import()`).
2. **Tối ưu hóa hình ảnh**:
   - Sử dụng các định dạng nén hiện đại (**WebP**, **AVIF**).
   - Thẻ `<img>` BẮT BUỘC phải có thuộc tính `width` và `height` rõ ràng để tránh giật lag layout (CLS).
   - Thêm thuộc tính `loading="lazy"` cho các hình ảnh nằm ngoài khung nhìn đầu tiên (Below the fold).
3. **Ngân sách kích thước Bundle**: Gói JavaScript ban đầu KHÔNG NÊN vượt quá $200\text{ KB}$ (gzipped) nếu không có lý do kiến trúc đặc thù.

### 4.3 Ngân Sách Độ Trễ Backend & Cơ Sở Dữ Liệu (MUST)
- Các endpoint API nghiệp vụ thông thường (OLTP) NÊN phản hồi trong vòng $200\text{ mili-giây}$ ở phân vị thứ 95 (P95).
- Các tác vụ tính toán nặng, gửi email hàng loạt hoặc xử lý tệp vượt quá 1 giây BẮT BUỘC phải chuyển sang hàng đợi xử lý ngầm bất đồng bộ (RabbitMQ, Kafka, BullMQ, Celery).
- Thiết lập chiến lược lưu đệm (Caching) đa tầng:
  - Header HTTP Cache-Control cho tài nguyên tĩnh bất biến (`max-age=31536000, immutable`).
  - Redis / Memcached cho dữ liệu nghiệp vụ đọc nhiều, ít thay đổi kèm thời gian sống (TTL) cụ thể.

---

## 5. Các Quy Tắc Và Tiêu Chuẩn: Khả Năng Tiếp Cận (Accessibility - a11y)

### 5.1 Cấu Trúc HTML Ngữ Nghĩa (Semantic HTML) (BẮT BUỘC - MUST)
1. **Dùng đúng thẻ ngữ nghĩa**: Tận dụng các thẻ chuẩn (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`, `<button>`, `<a>`). Tuyệt đối không dùng thẻ `<div>` hay `<span>` để làm nút bấm nếu không bổ sung vai trò role và sự kiện phím tương ứng.
2. **Cấu trúc tiêu đề chuẩn mực**: Mỗi trang web BẮT BUỘC chỉ có duy nhất một thẻ `<h1>` biểu thị nội dung chính của trang, sau đó phân cấp mạch lạc bằng `<h2>`, `<h3>`.
3. **Mô tả văn bản thay thế (Alt Text)**: Mọi thẻ `<img>` BẮT BUỘC phải có thuộc tính `alt` mô tả nội dung hình ảnh. Nếu ảnh thuần trang trí, để `alt=""` hoặc thêm `aria-hidden="true"`.

### 5.2 Điều Hướng Bàn Phím & Quản Lý Focus (BẮT BUỘC - MUST)
1. **Tiếp cận đầy đủ bằng bàn phím**: Toàn bộ thành phần tương tác (nút bấm, liên kết, ô nhập liệu, popup modal) BẮT BUỘC phải thao tác được trọn vẹn bằng bàn phím (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`, các phím mũi tên).
2. **Không xóa vòng viền Focus**: Tuyệt đối KHÔNG ẩn đường viền focus (`outline: none`) trừ khi đã thay thế bằng một hiệu ứng viền tùy chỉnh rõ nét tương đương.
3. **Khóa Focus trong Modal (Focus Trap)**: Khi mở một hộp thoại Modal/Dialog, con trỏ phím BẮT BUỘC phải được giữ bên trong phạm vi modal cho tới khi đóng lại, và tự động hoàn trả tiêu điểm về nút kích hoạt ban đầu.

### 5.3 Độ Tương Phản Màu Sắc & Biểu Mẫu (BẮT BUỘC - MUST)
- **Tỷ lệ tương phản chuẩn (WCAG AA)**: Văn bản thông thường BẮT BUỘC phải đạt tỷ lệ tương phản tối thiểu **4.5:1** so với màu nền; văn bản kích thước lớn ($\ge 18\text{pt}$ hoặc in đậm $\ge 14\text{pt}$) phải đạt tối thiểu **3:1**.
- **Không biểu đạt thông tin chỉ qua màu sắc**: Không chỉ dùng màu đỏ để báo lỗi mà BẮT BUỘC phải kết hợp icon cảnh báo cùng dòng thông báo bằng chữ rõ ràng.
- **Gắn nhãn Label cho Form**: Mọi thẻ `<input>` BẮT BUỘC phải được liên kết với thẻ `<label>` tương ứng thông qua thuộc tính `for`/`id`.

---

## 6. Các Quy Tắc Và Tiêu Chuẩn: Vận Hành & SRE

### 6.1 Phân Lập Môi Trường & Cấu Hình Tập Trung (BẮT BUỘC - MUST)
1. **Tách biệt môi trường rõ ràng**: Duy trì các môi trường độc lập:
   - `Development (Máy cá nhân)` $\rightarrow$ `Testing/CI` $\rightarrow$ `Staging (Bản sao giống hệt Production)` $\rightarrow$ `Production`.
2. **Nguyên tắc The Twelve-Factor App**: Bản dựng ứng dụng phải đồng nhất trên mọi môi trường. Các tham số cấu hình riêng biệt (URL, mật khẩu database, cổng kết nối) BẮT BUỘC phải được truyền qua biến môi trường tại thời điểm chạy container, tuyệt đối không hardcode trong image.

### 6.2 Chuẩn Đóng Gói Docker & Container (BẮT BUỘC - MUST)
- BẮT BUỘC sử dụng **Multi-stage Build** để loại bỏ trình biên dịch, công cụ phát triển và mã nguồn thô ra khỏi Docker Image chạy trên Production.
- Sử dụng base image tinh gọn, đã được kiểm duyệt bảo mật (`alpine`, `distroless`, `-slim`).
- Tiến trình trong container TUYỆT ĐỐI KHÔNG chạy dưới quyền tài khoản `root` (`USER node`, `USER appuser`).
- Ứng dụng BẮT BUỘC phải bắt tín hiệu `SIGTERM` để ngắt kết nối an toàn (Graceful Shutdown) trước khi container bị dừng.

### 6.3 Giám Sát, Ghi Log & Phục Hồi Thảm Họa (BẮT BUỘC - MUST)
1. **Cặp Endpoint Kiểm Tra Sức Khỏe (Health Probes)**:
   - **Liveness Probe** (`/health/live`): Xác nhận tiến trình server còn sống, không bị deadlock.
   - **Readiness Probe** (`/health/ready`): Xác nhận các kết nối phụ thuộc (Database connection pool, Redis cache) đã sẵn sàng để tiếp nhận traffic từ người dùng.
2. **Ghi Log Có Cấu Trúc (Structured Logging)**: Mọi log trên Production BẮT BUỘC phải xuất định dạng JSON ra `stdout`/`stderr` gồm: `timestamp`, `level`, `message`, `traceId`, `service`, `durationMs`.
3. **Khả năng Rollback & Diễn tập sao lưu**:
   - Triển khai Production phải hỗ trợ cơ chế Rollback về phiên bản Docker Image ổn định trước đó chỉ với 1 thao tác.
   - Cơ sở dữ liệu BẮT BUỘC phải được sao lưu tự động hàng ngày kèm mã hóa; quy trình khôi phục thử nghiệm (Restore Drill) phải được thực hiện định kỳ tối thiểu 6 tháng một lần.

---

## 7. Thực Hành Tốt Và Anti-Pattern Cần Tránh

| Danh mục | Anti-Pattern (Thói quen xấu ❌) | Giải pháp Vận Hành Chuẩn (✅) |
| :--- | :--- | :--- |
| **Hiệu năng** | Tải ảnh PNG dung lượng 50MB chưa nén trực tiếp vào code frontend. | Nén ảnh sang định dạng WebP/AVIF và phân phối qua mạng CDN với thẻ `srcset`. |
| **Hiệu năng** | Chạy truy vấn database trong vòng lặp xử lý logic (Lỗi N+1). | Gom truy vấn hoặc dùng câu lệnh `JOIN` có đánh chỉ mục phù hợp. |
| **Tiếp cận (a11y)** | Dùng `<div onClick={...}>Bấm vào đây</div>` không có vai trò nút bấm hay phím enter. | Sử dụng thẻ nút bấm chuẩn: `<button type="button">Bấm vào đây</button>`. |
| **Tiếp cận (a11y)** | Tắt toàn bộ viền focus bằng CSS: `*:focus { outline: none !important; }`. | Tùy biến đường viền focus rõ ràng: `:focus-visible { outline: 2px solid #2563eb; }`. |
| **Vận hành** | SSH trực tiếp vào máy chủ Production để sửa code hoặc khởi động lại dịch vụ. | Triển khai container bất biến hoàn toàn tự động thông qua pipeline CI/CD. |
| **Vận hành** | Ghi log dạng chuỗi thô không có mã định danh truy vết (Trace ID). | Ghi log định dạng JSON có cấu trúc kèm mã định danh phân tán `trace_id`. |

---

## 8. Ví Dụ Mã Nguồn Thực Tế (Code Examples)

### 8.1 Dockerfile Multi-Stage Tối Ưu Cho Môi Trường Production
```dockerfile
# Giai đoạn 1: Biên dịch và cài đặt dependencies
FROM node:20-alpine AS builder
WORKDIR /app

# Cache file manifest
COPY package*.json ./
RUN npm ci

# Copy mã nguồn và đóng gói bản build
COPY . .
RUN npm run build && npm prune --production

# Giai đoạn 2: Runtime siêu nhẹ cho Production
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# Chạy với user không đặc quyền để bảo đảm an toàn hệ thống
USER node

# Chỉ sao chép các gói thư viện production và mã đã biên dịch
COPY --chown=node:node --from=builder /app/package*.json ./
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]
```

### 8.2 Component Form Đảm Bảo Chuẩn Tiếp Cận a11y (React & HTML5)
```tsx
import React, { useState } from "react";

export function AccessibleSubscriptionForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Vui lòng nhập địa chỉ email hợp lệ.");
      return;
    }
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        {/* Liên kết nhãn tường minh với ô nhập qua htmlFor và id */}
        <label htmlFor="user-email" className="form-label">
          Địa chỉ Email <span aria-hidden="true">*</span>
        </label>
        
        <input
          id="user-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-required="true"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "email-error" : undefined}
          className="form-input"
        />

        {/* Vùng thông báo lỗi trực tiếp hỗ trợ phần mềm đọc màn hình */}
        {error && (
          <p id="email-error" role="alert" className="error-message">
            {error}
          </p>
        )}
      </div>

      <button type="submit" className="btn-primary">
        Đăng ký nhận tin
      </button>
    </form>
  );
}
```

### 8.3 Middleware Ghi Log Có Cấu Trúc Kèm Mã Trace ID (Node.js / Express)
```typescript
import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now();
  const traceId = (req.headers["x-trace-id"] as string) || crypto.randomUUID();

  // Đính kèm Trace ID vào response header để tiện đối soát
  res.setHeader("x-trace-id", traceId);

  res.on("finish", () => {
    const durationMs = Date.now() - startTime;
    const logPayload = {
      timestamp: new Date().toISOString(),
      level: res.statusCode >= 500 ? "ERROR" : "INFO",
      traceId,
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      durationMs,
      userAgent: req.get("user-agent") || "unknown"
    };

    // Xuất chuỗi JSON chuẩn ra stdout
    console.log(JSON.stringify(logPayload));
  });

  next();
}
```

---

## 9. Lưu Ý Theo Từng Công Nghệ Cụ Thể (Technology Notes)
- **Vite / Webpack**:
  - Dùng công cụ `rollup-plugin-visualizer` hoặc `webpack-bundle-analyzer` để quét bản đồ kích thước module, kịp thời phát hiện các thư viện khổng lồ bị cài đặt ngoài ý muốn.
- **Spring Boot / Java**:
  - Kích hoạt Spring Boot Actuator (`/actuator/health`, `/actuator/metrics`, `/actuator/prometheus`) để tự động cung cấp endpoint giám sát sức khỏe và xuất số liệu cho Prometheus.
- **Kubernetes / Hạ Tầng Đám Mây**:
  - Luôn định hình thông số tài nguyên (`requests` và `limits` cho CPU và RAM) trên từng Pod để tránh trường hợp một service rò rỉ bộ nhớ làm sập cả Node máy chủ.
- **Mobile (iOS / Android)**:
  - Hỗ trợ Dynamic Type (iOS) và Font Scaling (Android) để ứng dụng không bị cắt chữ hoặc tràn layout khi người dùng khiếm thị tăng cỡ chữ của hệ điều hành.

---

## 10. Bảng Tự Kiểm Tra Thực Tế (Implementation Checklist)
- [ ] Các chỉ số Core Web Vitals (LCP, INP, CLS) được kiểm tra qua Lighthouse / PageSpeed.
- [ ] Các trang màn hình nặng và thư viện biểu đồ được chia nhỏ gói bằng dynamic import.
- [ ] Toàn bộ các nút và ô nhập liệu đều thao tác được trọn vẹn qua phím Tab/Enter.
- [ ] Độ tương phản màu sắc đáp ứng tiêu chuẩn WCAG AA ($\ge 4.5:1$).
- [ ] Form nhập liệu liên kết đúng thẻ `<label>` và có thông báo lỗi qua `role="alert"`.
- [ ] Dockerfile sử dụng Multi-stage build và thiết lập chạy dưới User không phải root.
- [ ] Các endpoint kiểm tra sức khỏe liveness (`/health/live`) và readiness (`/health/ready`) hoạt động tốt.
- [ ] File log xuất ra định dạng JSON kèm mã định danh truy vết duy nhất.
- [ ] Kế hoạch sao lưu database tự động đang hoạt động và đã diễn tập khôi phục thành công.

---

## 11. Sai Lầm Phổ Biến Và Ngoại Lệ (Mistakes & Exceptions)
- **Chỉ tin vào công cụ kiểm tra tự động a11y**: Công cụ tự động chỉ phát hiện được khoảng 30%–40% lỗi tiếp cận. Việc thử nghiệm thực tế bằng bàn phím và phần mềm đọc màn hình (NVDA, VoiceOver) là bắt buộc.
- **Thêm tầng Cache quá sớm**: Thêm Redis khi chưa tối ưu câu lệnh SQL và thiếu index. Luôn tối ưu câu truy vấn cơ sở dữ liệu trước khi đưa vào cache.
- **Bản sao lưu chưa từng được phục hồi thử**: Có file backup hàng ngày nhưng khi gặp sự cố mới phát hiện file backup bị lỗi không thể giải nén. Một bản sao lưu chưa được diễn tập phục hồi thì không thể coi là bản sao lưu an toàn.

---

## 12. Tài Liệu Tham Khảo Uy Tín (References)
- Nguyên tắc tiếp cận nội dung Web W3C (WCAG 2.2): https://www.w3.org/TR/WCAG22/
- Hướng dẫn các chỉ số Web Vitals từ Google: https://web.dev/vitals/
- Phương pháp luận The Twelve-Factor App: https://12factor.net/
- Tài liệu chuẩn quan sát OpenTelemetry: https://opentelemetry.io/docs/
- Tiêu chuẩn Dockerfile tối ưu cho Production: https://docs.docker.com/develop/develop-images/dockerfile_best-practices/

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
| **08** | **Hiệu Năng, Khả Năng Tiếp Cận & Vận Hành** *(Tài liệu này)* | Core Web Vitals, a11y WCAG 2.2 AA, SRE & Observability |
