# 🛠️ Folder: `utils/` (Hàm tiện ích dùng chung)

Thư mục `utils/` (Utilities / Helpers) chứa các hàm tiện ích, công cụ độc lập, có thể tái sử dụng ở nhiều tầng khác nhau trong toàn bộ hệ thống backend.

---

## 🎯 Mục đích & Vai trò

1. **Tái sử dụng logic chung (Reusable Helper Functions)**:
   - Các hàm tính toán, định dạng, sinh mã ngẫu nhiên, mã hóa... được dùng lặp đi lặp lại ở nhiều controllers hoặc services.
2. **Hàm thuần khiết (Pure Functions)**:
   - Thường nhận input và trả về output tương ứng mà không làm thay đổi trạng thái bên ngoài (không phụ thuộc vào database hay request/response cụ thể, trừ các response formatters).
3. **Chuẩn hóa cấu trúc dữ liệu phản hồi (Standardized Response Format)**:
   - Định nghĩa khuôn mẫu trả về cho client: success response (`{ success: true, message, data }`) và error response (`{ success: false, message, errors }`).

---

## 📁 Cấu trúc gợi ý

```text
src/utils/
├── README.md           # Hướng dẫn chi tiết về thư mục utils
├── response.js         # Hàm chuẩn hóa response JSON (sendSuccess, sendError)
├── token.js            # Tiện ích sinh/xác thực JWT token
├── password.js         # Tiện ích mã hóa & so khớp bcrypt
├── dateTime.js         # Tiện ích format ngày giờ, timezone
└── validator.js        # Tiện ích kiểm tra định dạng email, phone, regex...
```

---

## 💡 Ví dụ thực tế

### 1. `response.js` (Chuẩn hóa API Response)
```javascript
const sendSuccess = (res, message = 'Success', data = null, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  });
};

const sendError = (res, message = 'Error', statusCode = 500, errors = null) => {
  const response = {
    success: false,
    message,
    timestamp: new Date().toISOString()
  };
  if (errors) response.errors = errors;
  return res.status(statusCode).json(response);
};

module.exports = { sendSuccess, sendError };
```

### 2. `password.js` (Hash mật khẩu với bcrypt)
```javascript
const bcrypt = require('bcryptjs');

const hashPassword = async (plainPassword) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainPassword, salt);
};

const comparePassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = { hashPassword, comparePassword };
```

---

## ⚠️ Nguyên tắc quan trọng

- ✅ Nên viết các hàm ở dạng độc lập, không phụ thuộc chặt chẽ vào database hay logic nghiệp vụ cụ thể của một model.
- ❌ **KHÔNG** đưa business logic phức tạp (quy trình đặt hàng, thanh toán, duyệt đơn...) vào `utils/` (hãy đặt ở `services/`).
- ✅ Luôn xử lý ngoại lệ (try/catch hoặc return null/false) để tránh crash ứng dụng khi gặp input không hợp lệ.
