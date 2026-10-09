# 🚦 Folder: `src/routes/` (Cấu hình Điều hướng Tuyến đường - Routing)

Thư mục `src/routes/` quản lý toàn bộ hệ thống định tuyến (Routing) của ứng dụng bằng thư viện `react-router-dom`.

---

## 🎯 Mục đích & Vai trò

1. **Tập trung hóa Tuyến đường**:
   - Tất cả các ánh xạ giữa URL trình duyệt và Component trang (`src/pages/`) được định nghĩa tại một nơi duy nhất.
2. **Quản lý Điều hướng & Fallback**:
   - Định nghĩa trang chủ mặc định, các trang con và tuyến đường dự phòng (404 Not Found hoặc chuyển hướng `Navigate to="/" replace`).
3. **Mở rộng Bảo vệ Tuyến đường (Guards / Private Routes)**:
   - Dễ dàng bổ sung các component bảo vệ quyền truy cập (Private Route, Auth Guard, Role Guard) khi ứng dụng có chức năng đăng nhập.

---

## 📁 Cấu trúc thư mục

```text
src/routes/
├── README.md       # Hướng dẫn chi tiết về tầng routing
└── AppRoutes.jsx   # Cấu hình danh sách các Route và chuyển hướng
```

---

## 💡 Hướng dẫn cấu hình

### Tuyến đường hiện tại trong [`AppRoutes.jsx`](./AppRoutes.jsx):
```javascript
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import HealthPage from '../pages/HealthPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Trang chủ */}
      <Route path="/" element={<Home initialCategory="All" />} />
      <Route path="/commands" element={<Home initialCategory="All" />} />

      {/* Trang kiểm tra sức khỏe hệ thống */}
      <Route path="/health" element={<HealthPage />} />

      {/* Route bắt tất cả các đường dẫn không hợp lệ -> Chuyển hướng về trang chủ */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
```

---

## 💡 Mở rộng: Tạo Private Route (Yêu cầu đăng nhập)

Khi dự án tích hợp hệ thống xác thực tài khoản, bạn có thể tạo thêm `PrivateRoute.jsx` trong thư mục này:

```javascript
// src/routes/PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  const token = localStorage.getItem('auth_token') || localStorage.getItem('token');

  // Nếu chưa đăng nhập, chuyển hướng về trang /login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Nếu đã đăng nhập, cho phép render các route con
  return <Outlet />;
}
```

Và sử dụng trong `AppRoutes.jsx`:
```javascript
<Route element={<PrivateRoute />}>
  <Route path="/admin" element={<AdminDashboardPage />} />
  <Route path="/profile" element={<ProfilePage />} />
</Route>
```

---

## ⚠️ Nguyên tắc quan trọng

1. ✅ **Luôn có Route Fallback (`path="*"`)**: Đảm bảo người dùng khi nhập sai URL không bị màn hình trắng mà được chuyển hướng về trang chủ hoặc trang 404 tùy biến.
2. ✅ **Đồng bộ với Navigation Bar**: Khi thêm tuyến đường mới trong `AppRoutes.jsx`, hãy cập nhật liên kết `<NavLink to="/...">` tương ứng trong [`src/components/Navbar.jsx`](../components/Navbar.jsx).
3. ❌ **Không nhúng logic nghiệp vụ phức tạp vào Routes**: File route chỉ nên làm nhiệm vụ ánh xạ URL sang component, không nên chứa state quản lý hay gọi API trực tiếp.
