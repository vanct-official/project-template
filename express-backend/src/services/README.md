# 🧠 Folder: `services/` (Nghiệp vụ cốt lõi - Business Logic)

Thư mục `services/` là "trái tim" của ứng dụng backend theo kiến trúc phân tầng (Layered Architecture). Đây là nơi duy nhất chứa các quy tắc nghiệp vụ (Business Rules), tính toán, xử lý logic và tương tác trực tiếp với cơ sở dữ liệu hoặc các dịch vụ bên ngoài.

---

## 🎯 Mục đích & Vai trò

1. **Chứa toàn bộ Business Logic**:
   - Mọi nghiệp vụ như: kiểm tra số dư tài khoản, áp dụng mã giảm giá, kiểm tra tồn kho, gửi email thông báo, tạo hóa đơn... đều được viết tại đây.
2. **Độc lập với HTTP Layer (Decoupling)**:
   - Services **hoàn toàn không biết** về đối tượng `req` hay `res` của Express.
   - Nhờ đó, logic nghiệp vụ có thể được tái sử dụng dễ dàng trong các ngữ cảnh khác như: CLI commands, Cron jobs, Message Queue workers, hoặc Unit Tests mà không cần giả lập HTTP request.
3. **Tương tác với Data Layer**:
   - Gọi trực tiếp ORM/Query Builder (Prisma, Mongoose, Sequelize, Knex, MySQL pool) để truy vấn hoặc cập nhật dữ liệu.
4. **Giao tiếp với API ngoài**:
   - Tích hợp cổng thanh toán (Stripe, VNPay), gửi SMS, gửi Mail, gọi microservice...

---

## 📁 Cấu trúc gợi ý

```text
src/services/
├── README.md           # Hướng dẫn chi tiết về thư mục services
├── auth.service.js     # Đăng ký, đăng nhập, verify token, reset password
├── user.service.js     # Lấy thông tin user, update profile, xóa tài khoản
├── order.service.js    # Tạo đơn hàng, tính phí, xử lý giao dịch
└── health.service.js   # Kiểm tra trạng thái sức khỏe của server
```

---

## 💡 Ví dụ thực tế

### `user.service.js`
```javascript
const pool = require('../config/database');
const { hashPassword } = require('../utils/password');

/**
 * Đăng ký người dùng mới
 * @param {Object} userData - { email, password, fullName }
 * @returns {Promise<Object>} Người dùng đã tạo
 */
const registerUser = async ({ email, password, fullName }) => {
  // 1. Kiểm tra email đã tồn tại hay chưa
  const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
  if (existing.length > 0) {
    const error = new Error('Email đã được đăng ký');
    error.statusCode = 400;
    throw error;
  }

  // 2. Mã hóa mật khẩu
  const hashedPassword = await hashPassword(password);

  // 3. Lưu vào database
  const [result] = await pool.query(
    'INSERT INTO users (email, password, full_name) VALUES (?, ?, ?)',
    [email, hashedPassword, fullName]
  );

  return { id: result.insertId, email, fullName };
};

module.exports = { registerUser };
```

---

## ⚠️ Nguyên tắc quan trọng

- ❌ **TUYỆT ĐỐI KHÔNG** nhận `req` hoặc gọi `res.send()` / `res.json()` trong Service. Hãy nhận tham số thuần túy (e.g. `userId`, `payload`) và trả về dữ liệu (Data) hoặc ném lỗi (Throw Error).
- ✅ Hãy tổ chức Service theo Domain/Resource (ví dụ: `product.service.js`, `cart.service.js`).
- ✅ Xử lý Database Transactions tại Service khi một nghiệp vụ yêu cầu ghi vào nhiều bảng/collection đồng thời.
