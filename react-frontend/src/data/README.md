# 📚 Folder: `src/data/` (Tập dữ liệu Tĩnh & Danh mục - Static Data & Catalogs)

Thư mục `src/data/` chứa các bộ dữ liệu tĩnh (Static Datasets), hằng số danh mục (Constants), và dữ liệu mẫu (Mock data) phục vụ cho giao diện Developer Toolkit của ứng dụng.

---

## 🎯 Mục đích & Vai trò

1. **Quản lý dữ liệu tham chiếu nội bộ**:
   - Lưu trữ danh mục các thư viện, câu lệnh CLI (`npm`, `docker`, `git`, v.v.) được nhóm theo từng chủ đề.
2. **Tách biệt Dữ liệu và Giao diện (Separation of Concerns)**:
   - Thay vì nhúng các mảng object lớn trực tiếp trong component JSX, toàn bộ dữ liệu được quản lý thành các file JavaScript có cấu trúc tại đây.
3. **Mở rộng dễ dàng**:
   - Khi cần bổ sung một công nghệ hoặc câu lệnh mới, lập trình viên chỉ cần thêm một object vào file danh mục tương ứng mà không cần sửa đổi component UI.

---

## 📁 Danh sách tệp tin hiện có

```text
src/data/
├── README.md           # Hướng dẫn chi tiết về cấu trúc dữ liệu
├── index.js            # Gom hợp toàn bộ dữ liệu lệnh, định nghĩa danh mục CATEGORIES và cấu hình TYPE_BADGE_CONFIG
├── projectSetup.js     # Các lệnh khởi tạo dự án (Vite, Next.js, CRA...)
├── frontend.js         # Các gói & lệnh thư viện Frontend (React Router, Axios, Redux...)
├── uiFrameworks.js     # Thư viện giao diện (Bootstrap, Tailwind, Ant Design, MUI...)
├── backend.js          # Công cụ Backend (Express, NestJS, Fastify, Spring Boot...)
├── databases.js        # Cơ sở dữ liệu & ORM (Prisma, Mongoose, PostgreSQL, MySQL...)
├── authentication.js   # Công cụ xác thực & bảo mật (JWT, OAuth, Firebase Auth...)
├── testing.js          # Thư viện kiểm thử (Jest, Vitest, Cypress, Playwright...)
├── utilities.js        # Tiện ích phát triển (Lodash, Dayjs, Prettier, ESLint...)
└── devops.js           # Công cụ DevOps & Triển khai (Docker, Nginx, CI/CD, Git...)
```

---

## 💡 Hướng dẫn thêm một câu lệnh / công nghệ mới

Mở file tương ứng trong `src/data/` (ví dụ `frontend.js`) và thêm phần tử theo cấu trúc chuẩn:

```javascript
{
  id: "tanstack-query",                      // Khóa định danh duy nhất (kebab-case)
  name: "TanStack Query (React Query)",      // Tên công nghệ / thư viện
  category: "Frontend",                      // Danh mục (Khớp với mảng CATEGORIES)
  technology: "React",                       // Công nghệ liên quan
  description: "Quản lý server-state, tự động cache và đồng bộ dữ liệu API.", // Mô tả ngắn
  link: "https://tanstack.com/query/latest", // Đường dẫn tài liệu chính thức
  type: "install",                           // Loại: 'create' | 'install' | 'development' | 'build' | 'docker' | 'git' | 'other'
  commands: [                                // Danh sách câu lệnh cần chạy
    "npm install @tanstack/react-query"
  ],
  tags: ["react", "query", "cache", "async", "api", "network"] // Từ khóa tìm kiếm nhanh
}
```

---

## ⚠️ Nguyên tắc quan trọng

1. ✅ **`id` là duy nhất**: Mỗi đối tượng phải có trường `id` độc nhất vô nhị để làm `key` khi render danh sách trong React.
2. ✅ **Khớp với `CATEGORIES`**: Trường `category` của mỗi item phải trùng khớp chính xác với một trong các giá trị định nghĩa tại `CATEGORIES` trong [`src/data/index.js`](./index.js).
3. ❌ **Không lưu dữ liệu nhạy cảm**: Không đưa thông tin mật (API Secret, mật khẩu cơ sở dữ liệu thật) vào thư mục này vì toàn bộ code sẽ được Vite đóng gói vào bundle client.
