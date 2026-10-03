# 🚦 Folder: `routes/` (Định tuyến & Ánh xạ Endpoint API)

Thư mục `routes/` (Routing) là nơi khai báo danh sách các URL endpoints của ứng dụng backend và ánh xạ các HTTP Methods (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) với các Middleware kiểm tra và Controller tương ứng.

---

## 🎯 Mục đích & Vai trò

1. **Định tuyến yêu cầu (Request Routing)**:
   - Nhận diện URL path và phương thức HTTP từ client, sau đó điều hướng luồng xử lý tới Controller phù hợp.
2. **Gom nhóm Endpoint theo tài nguyên (Resource-based Grouping)**:
   - Mỗi file route đại diện cho một tài nguyên (ví dụ: `/users`, `/products`, `/orders`, `/auth`).
3. **Gắn Middleware cấp độ Route (Route-level Middleware)**:
   - Gắn các middleware xác thực (auth), phân quyền (roles), hoặc kiểm tra dữ liệu (validation) trước khi request tới Controller.
4. **Hỗ trợ phân chia phiên bản API (API Versioning)**:
   - Dễ dàng gom nhóm và quản trị các phiên bản API như `/api/v1`, `/api/v2`.

---

## 📁 Cấu trúc gợi ý

```text
src/routes/
├── README.md               # Hướng dẫn chi tiết về thư mục routes
├── index.js                # File tổng hợp (Aggregator) gom toàn bộ các sub-routes
├── auth.route.js           # Các routes liên quan đến /auth (login, register...)
├── user.route.js           # Các routes liên quan đến /users (CRUD user)
├── product.route.js        # Các routes liên quan đến /products
└── health.route.js         # Endpoint kiểm tra trạng thái /health
```

---

## 💡 Ví dụ thực tế

### 1. `user.route.js` (Route cho resource User)
```javascript
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/role.middleware');

// GET /api/users - Lấy danh sách user (Yêu cầu đăng nhập & quyền admin)
router.get('/', authenticate, requireRole('admin'), userController.getUsers);

// GET /api/users/:id - Lấy thông tin 1 user
router.get('/:id', authenticate, userController.getUserById);

// POST /api/users - Tạo mới user
router.post('/', userController.createUser);

// PUT /api/users/:id - Cập nhật thông tin
router.put('/:id', authenticate, userController.updateUser);

// DELETE /api/users/:id - Xóa user (Yêu cầu quyền admin)
router.delete('/:id', authenticate, requireRole('admin'), userController.deleteUser);

module.exports = router;
```

### 2. `index.js` (Gom nhóm và export toàn bộ Routes)
```javascript
const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');
const healthRoutes = require('./health.route');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/health', healthRoutes);

module.exports = router;
```

---

## ⚠️ Nguyên tắc quan trọng

- ✅ Tuân thủ chuẩn thiết kế **RESTful API**:
  - Dùng danh từ số nhiều cho tài nguyên (e.g. `/api/users`, KHÔNG dùng `/api/getAllUsers` hay `/api/deleteUser`).
  - Dùng đúng HTTP Verbs: `GET` (đọc), `POST` (tạo mới), `PUT` (thay thế toàn bộ), `PATCH` (cập nhật một phần), `DELETE` (xóa).
- ❌ **KHÔNG** viết logic xử lý dữ liệu hay database queries trực tiếp trong Route. Toàn bộ logic phải nằm ở `controllers/` và `services/`.
- ✅ File routes chỉ nên làm nhiệm vụ khai báo: `router.METHOD(path, [middlewares...], controller)`.
