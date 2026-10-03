# 🎮 Folder: `controllers/` (Điều khiển luồng Request - Response)

Thư mục `controllers/` (Bộ điều khiển) đóng vai trò là tầng trung gian đón nhận HTTP request từ client (thông qua routes), trích xuất tham số, gọi tầng `services/` xử lý và gửi HTTP response trả về cho client.

---

## 🎯 Mục đích & Vai trò

1. **Tiếp nhận & Bóc tách Request**:
   - Trích xuất dữ liệu từ `req.body`, `req.params`, `req.query`, `req.headers` hoặc `req.user`.
2. **Ủy quyền cho Services (Delegation)**:
   - Controller **không** tự mình tính toán hay query database, mà chuyển dữ liệu đến các hàm tương ứng trong `services/`.
3. **Phản hồi Client (Send Response)**:
   - Nhận kết quả từ service và định dạng phản hồi với HTTP Status Code phù hợp (200 OK, 201 Created, 204 No Content...).
   - Sử dụng các hàm chuẩn hóa trong `utils/response.js`.
4. **Bắt lỗi & Chuyển tiếp (Error Handling)**:
   - Đặt trong khối `try/catch` và gọi `next(error)` để chuyển lỗi xuống Middleware xử lý lỗi tập trung (`errorHandler`).

---

## 📁 Cấu trúc gợi ý

```text
src/controllers/
├── README.md              # Hướng dẫn chi tiết về thư mục controllers
├── auth.controller.js     # Điều khiển luồng login, register, logout, refreshToken
├── user.controller.js     # Điều khiển luồng CRUD người dùng
├── product.controller.js  # Điều khiển luồng CRUD sản phẩm
└── health.controller.js   # Điều khiển luồng kiểm tra server
```

---

## 💡 Ví dụ thực tế

### `user.controller.js`
```javascript
const userService = require('../services/user.service');
const { sendSuccess } = require('../utils/response');

/**
 * Xử lý đăng ký tài khoản
 */
const register = async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;

    // 1. Gọi service xử lý logic
    const newUser = await userService.registerUser({ email, password, fullName });

    // 2. Trả về response thành công
    return sendSuccess(res, 'Đăng ký tài khoản thành công', newUser, 201);
  } catch (error) {
    // 3. Đẩy lỗi xuống global error middleware
    return next(error);
  }
};

/**
 * Lấy chi tiết user theo ID
 */
const getProfile = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    return sendSuccess(res, 'Lấy thông tin thành công', user, 200);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  register,
  getProfile
};
```

---

## ⚠️ Nguyên tắc quan trọng: "Thin Controller, Fat Service"

- ✅ **Controller phải "gầy" (Thin Controller)**: Controller chỉ làm 3 việc: Nhận data &rarr; Gọi Service &rarr; Trả kết quả (hoặc bắt lỗi).
- ❌ **KHÔNG** viết SQL query, Mongoose model calls, hoặc logic thuật toán phức tạp ngay trong Controller.
- ❌ **KHÔNG** quên gọi `next(error)` trong block `catch`, nếu không request sẽ bị treo (hang) vô tận nếu gặp lỗi bất ngờ.
