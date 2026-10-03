# Express Backend Template

> Template backend Node.js & Express chuẩn kiến trúc phân tầng (Layered Architecture).

Dự án backend được thiết kế sẵn cấu trúc thư mục rõ ràng, phân tách trách nhiệm (Separation of Concerns), sẵn sàng cho việc mở rộng API RESTful.

---

## 📁 Cấu trúc thư mục `src/`

Mỗi thư mục con đều có tài liệu hướng dẫn chi tiết riêng:

| Thư mục | Tài liệu chi tiết | Nhiệm vụ chính |
| :--- | :--- | :--- |
| **`config/`** | [src/config/README.md](file:///f:/NodeJS/coffee-shop-fork/project-template/express-backend/src/config/README.md) | Quản lý biến môi trường (`.env`), thiết lập CSDL, cấu hình dịch vụ bên thứ ba. |
| **`controllers/`** | [src/controllers/README.md](file:///f:/NodeJS/coffee-shop-fork/project-template/express-backend/src/controllers/README.md) | Tiếp nhận HTTP Request, gọi Services xử lý, và trả về HTTP Response cho client. |
| **`middlewares/`** | [src/middlewares/README.md](file:///f:/NodeJS/coffee-shop-fork/project-template/express-backend/src/middlewares/README.md) | Bộ lọc trung gian: xác thực JWT, phân quyền, validate request, xử lý lỗi toàn cục (404, 500). |
| **`routes/`** | [src/routes/README.md](file:///f:/NodeJS/coffee-shop-fork/project-template/express-backend/src/routes/README.md) | Khai báo URL endpoints và gắn kết HTTP Method với Controller & Middleware tương ứng. |
| **`services/`** | [src/services/README.md](file:///f:/NodeJS/coffee-shop-fork/project-template/express-backend/src/services/README.md) | Chứa toàn bộ Business Logic (nghiệp vụ cốt lõi), truy vấn Database, tính toán nghiệp vụ. |
| **`utils/`** | [src/utils/README.md](file:///f:/NodeJS/coffee-shop-fork/project-template/express-backend/src/utils/README.md) | Các hàm tiện ích dùng chung: chuẩn hóa response, mã hóa mật khẩu, format dữ liệu... |

Ngoài ra:
- **`src/app.js`**: Khởi tạo Express app, cấu hình các middlewares bảo mật (`helmet`, `cors`, `compression`, `morgan`), mount routes, 404 handler và error handler.
- **`src/server.js`**: Điểm khởi động server (entry point), lắng nghe cổng HTTP, xử lý graceful shutdown và các sự cố tiến trình (`unhandledRejection`, `uncaughtException`).

---

## 🚀 Khởi chạy dự án

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Thiết lập biến môi trường
Tạo file `.env` (hoặc sao chép từ `.env.example`):
```bash
cp .env.example .env
```

Các biến mặc định:
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=*
```

### 3. Chạy ở môi trường Development
Chạy kèm `nodemon` tự động reload khi sửa code:
```bash
npm run dev
```

Server sẽ khởi chạy tại:
- **API URL**: `http://localhost:5000`
- **Health Check**: `http://localhost:5000/api/health`

### 4. Chạy ở môi trường Production
```bash
npm start
```

### 5. Build & Chạy với Docker (Ubuntu Server)
```bash
# Build image
docker build -t express-backend:latest .

# Chạy container
docker run -d -p 5000:5000 --env-file .env --name express-backend express-backend:latest
```

