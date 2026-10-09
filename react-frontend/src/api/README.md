# 🌐 Folder: `src/api/` (Tầng Quản lý API Tập trung)

Thư mục `src/api/` chịu trách nhiệm toàn bộ việc cấu hình HTTP Client, quản lý danh sách Endpoint và các hàm gọi API theo từng tài nguyên (Resource-based API). Tầng này giúp tách biệt hoàn toàn logic mạng (networking) khỏi giao diện React (UI components).

---

## 🎯 Mục đích & Vai trò

1. **Tập trung hóa Endpoint (`endpoints.js`)**:
   - Định nghĩa toàn bộ đường dẫn URL ở một nơi duy nhất.
   - Hỗ trợ endpoint tĩnh và hàm tạo URL động (ví dụ: `/books/:id`).
   - Ngăn chặn việc viết cứng (hardcode) URL rải rác trong component.
2. **Quản trị HTTP Client duy nhất (`http.js`)**:
   - Khởi tạo và cấu hình Axios với `baseURL`, `timeout`, default headers.
   - Gắn Authorization token (Bearer token) tự động qua Request Interceptor.
   - Chuẩn hóa thông báo lỗi thống nhất qua Response Interceptor.
   - Cung cấp `createHttpClient` để mở rộng khi kết nối nhiều backend song song (Express, Spring Boot).
3. **Mô-đun hóa theo Tài nguyên (`*.api.js`)**:
   - Gom nhóm các hàm gọi API theo từng đối tượng nghiệp vụ (ví dụ: `health.api.js`, `books.api.js`, `users.api.js`).
   - Hỗ trợ hủy request (`AbortController` / `signal`), truyền query parameters, upload file multipart.
4. **Điểm xuất thống nhất (`index.js`)**:
   - Barrel export cho phép các component import ngắn gọn: `import { healthApi, API_ENDPOINTS } from '../api';`.

---

## 📁 Cấu trúc thư mục

```text
src/api/
├── README.md        # Hướng dẫn chi tiết về tầng API
├── endpoints.js     # Danh sách URI paths và hàm sinh endpoint động
├── http.js          # Axios client instance, interceptors, error handler
├── health.api.js    # Module API kiểm tra sức khỏe hệ thống (Express / Spring Boot)
└── index.js         # Barrel export xuất các module ra ngoài
```

---

## 💡 Hướng dẫn tạo module API mới (Ví dụ: `books.api.js`)

### Bước 1: Khai báo endpoint trong [`endpoints.js`](./endpoints.js)
```javascript
export const API_ENDPOINTS = {
  // ...
  books: {
    list: '/api/books',
    detail: (id) => `/api/books/${encodeURIComponent(id)}`,
    create: '/api/books',
    update: (id) => `/api/books/${encodeURIComponent(id)}`,
    delete: (id) => `/api/books/${encodeURIComponent(id)}`,
  },
};
```

### Bước 2: Tạo file `src/api/books.api.js`
```javascript
import http from './http';
import { API_ENDPOINTS } from './endpoints';

export const booksApi = {
  // Lấy danh sách kèm phân trang và tìm kiếm
  getAll: (params = {}, config = {}) =>
    http.get(API_ENDPOINTS.books.list, { params, ...config }),

  // Lấy chi tiết theo ID
  getById: (id, config = {}) =>
    http.get(API_ENDPOINTS.books.detail(id), config),

  // Tạo mới sách
  create: (bookData, config = {}) =>
    http.post(API_ENDPOINTS.books.create, bookData, config),

  // Cập nhật thông tin
  update: (id, bookData, config = {}) =>
    http.put(API_ENDPOINTS.books.update(id), bookData, config),

  // Xóa sách
  delete: (id, config = {}) =>
    http.delete(API_ENDPOINTS.books.delete(id), config),
};

export default booksApi;
```

### Bước 3: Xuất khẩu trong [`index.js`](./index.js)
```javascript
export { booksApi } from './books.api';
```

### Bước 4: Sử dụng an toàn trong React Component
```javascript
import { useEffect, useState } from 'react';
import axios from 'axios';
import { booksApi } from '../api';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    let isSubscribed = true;

    booksApi.getAll({ page: 1, limit: 10 }, { signal: controller.signal })
      .then((res) => {
        if (isSubscribed) {
          setBooks(res.data?.data || res.data || []);
        }
      })
      .catch((err) => {
        // Bỏ qua lỗi do hủy request khi component unmount
        if (!axios.isCancel(err) && isSubscribed) {
          setError(err.friendlyMessage || 'Lỗi tải danh sách sách');
        }
      })
      .finally(() => {
        if (isSubscribed) setLoading(false);
      });

    return () => {
      isSubscribed = false;
      controller.abort(); // Hủy request đang chạy nếu user chuyển trang
    };
  }, []);

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <ul>
      {books.map((b) => (
        <li key={b.id}>{b.title}</li>
      ))}
    </ul>
  );
}
```

---

## ⚠️ Nguyên tắc quan trọng

1. ✅ **Không phụ thuộc vào UI**: Tuyệt đối không import thư viện giao diện (Bootstrap, React Router, UI State) vào `src/api/`.
2. ✅ **Luôn hỗ trợ `config` (AbortSignal)**: Các hàm API cần cho phép truyền object `config` hoặc `{ signal }` để React components có thể hủy request khi unmount.
3. ✅ **Xử lý token an toàn**: Token lấy từ `localStorage` hoặc state quản lý trong interceptor, không hardcode mật khẩu, token hay private key vào code.
4. ❌ **Không retry tự động với request thay đổi dữ liệu**: Không tự động gửi lại (retry) các request non-idempotent như `POST`, `PUT`, `DELETE` nếu không có cơ chế kiểm soát an toàn để tránh ghi trùng dữ liệu.
