# 🛡️ Folder: `middlewares/` (Bộ tiền xử lý & Can thiệp Request)

Thư mục `middlewares/` chứa các hàm trung gian (Middleware Functions) chạy xen vào giữa vòng đời từ lúc Express nhận được HTTP Request cho đến khi Controller gửi Response trả về (hoặc xử lý lỗi sau cùng).

---

## 🎯 Mục đích & Vai trò

1. **Xác thực & Phân quyền (Authentication & Authorization)**:
   - Kiểm tra JWT Token trong header (`Authorization: Bearer <token>`).
   - Giải mã token, gán `req.user` vào request.
   - Kiểm tra quyền hạn theo vai trò (Role-based: Admin, User, Manager...).
2. **Xác thực dữ liệu đầu vào (Validation Middleware)**:
   - Sử dụng Joi, Zod, hoặc express-validator để kiểm tra định dạng dữ liệu trong `req.body`, `req.query`, `req.params`. Nếu không hợp lệ, trả về lỗi 400 Bad Request ngay lập tức trước khi tới Controller.
3. **Giới hạn tốc độ & Bảo mật (Rate Limiting, Security, CORS)**:
   - Ngăn chặn tấn công brute-force hoặc DoS (ví dụ: `express-rate-limit`).
4. **Xử lý lỗi tập trung (Centralized Error Handling)**:
   - Bắt mọi lỗi xảy ra ở tầng routes, controllers, services và trả về định dạng JSON thống nhất, che giấu stack trace khi ở môi trường production.
5. **Xử lý 404 Route Not Found**:
   - Bắt các đường dẫn không tồn tại và trả về thông báo rõ ràng cho client.

---

## 📁 Cấu trúc gợi ý

```text
src/middlewares/
├── README.md               # Hướng dẫn chi tiết về thư mục middlewares
├── auth.middleware.js      # Kiểm tra JWT token & xác thực người dùng
├── role.middleware.js      # Kiểm tra quyền hạn (Role check: admin, user...)
├── validate.middleware.js  # Middleware validate schema (Zod/Joi)
├── notFoundHandler.js      # Bắt lỗi 404 khi route không khớp
└── errorHandler.js         # Bắt và format lỗi tập trung cho toàn app (4 tham số: err, req, res, next)
```

---

## 💡 Ví dụ thực tế

### 1. `auth.middleware.js` (Xác thực JWT)
```javascript
const jwt = require('jsonwebtoken');
const config = require('../config/environment');
const { sendError } = require('../utils/response');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 'Chưa cung cấp token xác thực hoặc sai định dạng', 401);
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded; // Gắn thông tin user vào request
    return next();      // Cho phép đi tiếp đến controller
  } catch (error) {
    return sendError(res, 'Token không hợp lệ hoặc đã hết hạn', 403);
  }
};

module.exports = { authenticate };
```

### 2. `errorHandler.js` (Bắt lỗi toàn cục)
```javascript
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Lỗi máy chủ nội bộ';

  return res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
};

module.exports = errorHandler;
```

---

## ⚠️ Nguyên tắc quan trọng

- ⏱️ **Thứ tự đăng ký middleware quyết định thứ tự thực thi**:
  1. Middlewares chung (`cors`, `helmet`, `morgan`, `express.json`) &rarr; đặt ở đầu trong `app.js`.
  2. Router (`app.use('/api', routes)`) &rarr; đặt ở giữa.
  3. `notFoundHandler` &rarr; đặt ngay sau Router.
  4. `errorHandler` (bắt buộc đủ 4 tham số `err, req, res, next`) &rarr; **phải luôn nằm cuối cùng** trong `app.js`.
- ✅ Luôn gọi `next()` nếu middleware hoàn thành nhiệm vụ thành công để chuyển quyền điều khiển sang hàm tiếp theo.
- ❌ Nếu phát hiện lỗi trong middleware, hãy trả về response lỗi ngay hoặc gọi `next(error)`. Không được vừa gửi response vừa gọi `next()`.
