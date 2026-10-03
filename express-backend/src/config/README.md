# ⚙️ Folder: `config/` (Cấu hình hệ thống)

Thư mục `config/` chịu trách nhiệm lưu trữ và quản lý toàn bộ các thiết lập, tham số môi trường và cấu hình kết nối của hệ thống (database, redis, third-party services, mailer, storage,...).

---

## 🎯 Mục đích & Vai trò

1. **Tập trung hóa cấu hình (Centralized Configuration)**:
   - Tránh việc gọi trực tiếp `process.env.VARIABLE_NAME` rải rác ở khắp các controllers, services.
   - Định nghĩa giá trị mặc định (fallbacks) khi biến môi trường chưa được thiết lập.
2. **Kiểm tra & Chuẩn hóa (Validation & Type Casting)**:
   - Ép kiểu dữ liệu đúng (chuỗi sang số nguyên, boolean...).
   - Báo lỗi ngay khi ứng dụng khởi động nếu thiếu các biến môi trường quan trọng (JWT_SECRET, DATABASE_URL,...).
3. **Cấu hình kết nối dịch vụ bên thứ ba**:
   - Chứa file khởi tạo kết nối Database (MySQL, MongoDB, PostgreSQL, Prisma).
   - Cấu hình Cloudinary, AWS S3, Stripe, Nodemailer...

---

## 📁 Cấu trúc gợi ý

```text
src/config/
├── README.md           # Hướng dẫn chi tiết về thư mục
├── environment.js      # Tập trung các biến môi trường (PORT, NODE_ENV, CORS...)
├── database.js         # Khởi tạo kết nối CSDL (MySQL pool, Mongoose connect...)
└── constants.js        # Các hằng số dùng chung toàn app (HTTP status, roles, pagination...)
```

---

## 💡 Ví dụ thực tế

### 1. `environment.js`
```javascript
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  cors: {
    origin: process.env.CORS_ORIGIN || '*'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-default-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d'
  }
};
```

### 2. `database.js` (Kết nối MySQL pool ví dụ)
```javascript
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'my_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
```

---

## ⚠️ Nguyên tắc quan trọng

- ❌ **KHÔNG** commit các thông tin nhạy cảm (passwords, private keys, API tokens) vào Git. Luôn để trong `.env` và đưa vào `.gitignore`.
- ❌ **KHÔNG** gọi `process.env` trực tiếp trong Controller/Service; hãy import từ `config/environment.js`.
- ✅ Luôn cập nhật `.env.example` mỗi khi thêm một biến môi trường mới vào project.
