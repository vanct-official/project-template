# 📄 Folder: `src/pages/` (Các Trang / Màn hình Ứng dụng)

Thư mục `src/pages/` (hoặc Views) chứa các component đại diện cho từng trang hoàn chỉnh của ứng dụng, tương ứng với các tuyến đường (routes) được định nghĩa trong `src/routes/AppRoutes.jsx`.

---

## 🎯 Mục đích & Vai trò

1. **Đại diện cho màn hình đầy đủ (Route Views)**:
   - Mỗi file trong `pages/` gắn liền với một đường dẫn URL (ví dụ: `/`, `/commands`, `/health`).
2. **Lắp ráp các Component (Page Assembly)**:
   - Trang đóng vai trò người điều phối (Orchestrator): Lấy dữ liệu (từ `src/api/` hoặc `src/data/`), quản lý state của toàn trang, sau đó phân phối xuống các component con trong `src/components/`.
3. **Phân cấp Rõ Ràng**:
   - `pages/` chứa logic tổng thể và bố cục (Layout/Container).
   - `components/` chứa các thành phần giao diện nhỏ hơn, tái sử dụng được.

---

## 📁 Danh sách Trang hiện có

```text
src/pages/
├── README.md       # Hướng dẫn chi tiết về thư mục pages
├── Home.jsx        # Trang chủ: Tra cứu lệnh, lọc theo danh mục, yêu thích, xem trạng thái API
└── HealthPage.jsx  # Trang giám sát API Health chi tiết và danh mục endpoints của Express & Spring
```

---

## 💡 Hướng dẫn tạo Trang mới (Ví dụ: `BooksPage.jsx`)

### Bước 1: Tạo file `src/pages/BooksPage.jsx`
```javascript
import { useState, useEffect } from 'react';
import { booksApi } from '../api';

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    let isSubscribed = true;

    booksApi.getAll({}, { signal: controller.signal })
      .then((res) => {
        if (isSubscribed) {
          setBooks(res.data?.data || res.data || []);
        }
      })
      .catch((err) => {
        if (isSubscribed) {
          setError(err.friendlyMessage || 'Không thể tải danh sách sách');
        }
      })
      .finally(() => {
        if (isSubscribed) setLoading(false);
      });

    return () => {
      isSubscribed = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="container-fluid px-3 px-lg-4 py-4">
      <h1 className="h4 fw-bold mb-3">Quản lý Sách</h1>

      {loading && <div className="spinner-border text-primary" role="status" />}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && books.length === 0 && (
        <div className="text-secondary">Chưa có cuốn sách nào.</div>
      )}

      <div className="row g-3">
        {books.map((book) => (
          <div key={book.id} className="col-12 col-md-4">
            <div className="card h-100 shadow-sm p-3">
              <h5 className="card-title h6 fw-bold">{book.title}</h5>
              <p className="card-text small text-secondary">{book.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Bước 2: Đăng ký Route trong [`src/routes/AppRoutes.jsx`](../routes/AppRoutes.jsx)
```javascript
import BooksPage from '../pages/BooksPage';

// Trong thẻ <Routes>:
<Route path="/books" element={<BooksPage />} />
```

---

## ⚠️ Nguyên tắc quan trọng

1. ✅ **Đặt tên file theo PascalCase kết thúc bằng `Page` (hoặc tên màn hình rõ ràng)**: `Home.jsx`, `HealthPage.jsx`, `SettingsPage.jsx`.
2. ✅ **Xử lý đủ 4 trạng thái dữ liệu**:
   - `loading`: Đang tải dữ liệu.
   - `error`: Lỗi mạng hoặc server.
   - `empty`: Dữ liệu trả về rỗng (0 phần tử).
   - `success`: Dữ liệu hiển thị bình thường.
3. ✅ **Tránh phình to file trang (Fat Page)**: Nếu một trang vượt quá 300 dòng code, hãy bóc tách các khối UI con thành các component riêng biệt trong `src/components/`.
