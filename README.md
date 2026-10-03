# Fullstack Project Template

> **Kiến trúc Fullstack hiện đại kết hợp React Front-end và Hệ thống Backend Song Song (Dual RESTful API: ExpressJS & Spring Boot).**

Dự án mẫu (Project Template) toàn diện được thiết kế theo kiến trúc module chuẩn mực, phục vụ phát triển ứng dụng web hiện đại với giao diện React và hỗ trợ 2 nền tảng Backend phổ biến nhất (Node.js & Java) hoạt động song song hoặc độc lập.

---

## 🏛️ Sơ đồ Kiến trúc Tổng thể (System Topology)

```text
                            +-----------------------------------------+
                            |             REACT FRONTEND              |
                            |       (React 19 + Vite + Bootstrap)     |
                            |           http://localhost:3000         |
                            +--------------------+--------------------+
                                                 |
                       +-------------------------+-------------------------+
                       | (Parallel RESTful Calls / Axios)                  |
                       v                                                   v
         +----------------------------+                      +----------------------------+
         |      EXPRESS BACKEND       |                      |    SPRING BOOT BACKEND     |
         |     (Node.js + Express)    |                      |    (Java 17 + Spring 3.x)  |
         |    http://localhost:5000   |                      |    http://localhost:8080   |
         +----------------------------+                      +----------------------------+
         | • GET /                    |                      | • GET /                    |
         | • GET /api/health          |                      | • GET /api/health          |
         | • Standard ApiResponse     |                      | • Standard ApiResponse     |
         | • Layered Architecture     |                      | • Layered Architecture     |
         +----------------------------+                      +----------------------------+
```

---

## 📦 Danh mục Dịch vụ trong Dự án

| Dịch vụ | Thư mục | Nền tảng / Công nghệ | Cổng mặc định | Endpoint Health Check |
| :--- | :--- | :--- | :--- | :--- |
| **Front-end** | [`react-frontend/`](./react-frontend/) | React 19, Vite, Bootstrap 5, Axios | `3000` | `http://localhost:3000/health` |
| **Express Backend** | [`express-backend/`](./express-backend/) | Node.js (v20+), Express 5, Helmet, Cors | `5000` | `http://localhost:5000/api/health` |
| **Spring Backend** | [`spring-backend/`](./spring-backend/) | Java 17 LTS, Spring Boot 3.3.4, Maven | `8080` | `http://localhost:8080/api/health` |

---

## ✨ Điểm nổi bật (Features)

### 1. React Front-end (`react-frontend`)
- **Developer Toolkit Dashboard**: Kho lệnh mẫu, package và script cấu hình dự án đa danh mục với tìm kiếm tức thì.
- **Dual API Health Monitor**: Theo dõi tình trạng sức khỏe của cả 2 máy chủ Backend theo thời gian thực (độ trễ phản hồi, Uptime, phân tích bộ nhớ RAM/JVM, xem dữ liệu JSON thô, tự động refresh mỗi 10s).
- **Trang kiểm tra riêng biệt**: Truy cập trực tiếp tại `/health` với bảng danh mục endpoint và kiểm tra kết nối song song.
- **Theme động (Dark / Light)**: Chuyển đổi giao diện sáng/tối lưu trữ qua `localStorage`.

### 2. Express Backend (`express-backend`)
- **Kiến trúc phân lớp chuẩn**: Tách biệt rõ ràng `routes`, `controllers`, `services`, `middlewares`, `config`, `utils`.
- **Bảo mật & Tối ưu**: Tích hợp sẵn `helmet`, `cors`, `compression`, `morgan` ghi log HTTP.
- **Chuẩn hóa phản hồi (Standard Envelope)**: Định dạng `{ success, message, data, timestamp }` nhất quán cho mọi API.
- **Xử lý ngoại lệ tập trung**: Bắt lỗi 404 cho route chưa định nghĩa và middleware xử lý lỗi 500 toàn cục.

### 3. Spring Boot Backend (`spring-backend`)
- **Kiến trúc phân lớp đồng bộ 1:1**: Tổ chức theo `controller`, `service`, `dto`, `exception`, `config`, `util`.
- **RESTful API chuẩn hóa**: Triển khai đầy đủ `@RestController`, `@RestControllerAdvice` (`GlobalExceptionHandler`).
- **Khớp chuẩn định dạng JSON**: Cấu trúc phản hồi `ApiResponse<T>` đồng nhất tuyệt đối với ExpressJS.
- **Tính toán tài nguyên thực**: Báo cáo chính xác thông số bộ nhớ JVM (`RSS`, `Heap Total`, `Heap Used`), Uptime và phiên bản Java.

---

## 📁 Cấu trúc Thư mục Dự án

```text
project-template/
├── README.md                      # Tài liệu hướng dẫn chung của toàn bộ dự án
├── docker-compose.yml             # Điều phối chạy toàn bộ 3 dịch vụ qua Docker
│
├── react-frontend/                # Ứng dụng Front-end React + Vite
│   ├── src/
│   │   ├── components/            # ApiHealthCard, Navbar, SearchBar, CommandCard...
│   │   ├── pages/                 # Home.jsx, HealthPage.jsx
│   │   ├── services/api.js        # Axios Client kết nối song song cả Express và Spring
│   │   └── routes/AppRoutes.jsx   # Tuyến đường client: /, /commands, /health
│   ├── .env                       # Cấu hình VITE_EXPRESS_API_URL & VITE_SPRING_API_URL
│   ├── Dockerfile
│   └── package.json
│
├── express-backend/               # Dịch vụ Backend ExpressJS (Node.js)
│   ├── src/
│   │   ├── config/                # environment.js (port, cors, nodeEnv)
│   │   ├── controllers/           # health.controller.js
│   │   ├── middlewares/           # errorHandler.js, notFoundHandler.js
│   │   ├── routes/                # health.route.js, index.js
│   │   ├── services/              # health.service.js
│   │   ├── utils/                 # response.js (sendSuccess, sendError)
│   │   ├── app.js                 # Cấu hình Express app
│   │   └── server.js              # Khởi động server HTTP & xử lý tín hiệu tắt
│   ├── .env                       # PORT=5000, CORS_ORIGIN=*
│   ├── Dockerfile
│   └── package.json
│
└── spring-backend/                # Dịch vụ Backend Spring Boot (Java 17)
    ├── src/
    │   ├── main/
    │   │   ├── java/com/vanct/template/
    │   │   │   ├── SpringBackendApplication.java # Class chính khởi chạy ứng dụng
    │   │   │   ├── config/        # CorsConfig.java (CORS đa nguồn)
    │   │   │   ├── controller/    # RootController.java, HealthController.java
    │   │   │   ├── dto/           # ApiResponse.java, HealthDataDto.java
    │   │   │   ├── exception/     # GlobalExceptionHandler.java, ResourceNotFoundException.java
    │   │   │   ├── service/       # HealthService.java, impl/HealthServiceImpl.java
    │   │   │   └── util/          # ResponseUtil.java
    │   │   └── resources/
    │   │       └── application.yml# Cấu hình YAML (cổng 8080, profiles, cors)
    ├── .env                       # PORT=8080, SPRING_PROFILES_ACTIVE=dev
    ├── Dockerfile                 # Multi-stage Docker build
    └── pom.xml                    # Quản lý thư viện Maven (Java 17 + Spring Boot 3.3.4)
```

---

## 🚀 Hướng dẫn Cài đặt & Khởi chạy Cục bộ

### Yêu cầu Tiên quyết
- **Node.js**: Phiên bản 20.x hoặc mới hơn (kèm `npm`)
- **Java**: JDK 17 LTS (Amazon Corretto, Eclipse Temurin hoặc Microsoft OpenJDK)
- **Maven**: Phiên bản 3.8+ (đã cấu hình trong biến môi trường `PATH`)

---

### Khởi chạy từng dịch vụ (Local Development)

Mở 3 cửa sổ terminal riêng biệt để khởi chạy cả 3 dịch vụ:

#### 1. Khởi chạy Express Backend (Cổng 5000)
```bash
cd express-backend
npm install
npm run dev
```
> Server hoạt động tại: **`http://localhost:5000`**  
> Health check: **`http://localhost:5000/api/health`**

#### 2. Khởi chạy Spring Boot Backend (Cổng 8080)
```bash
cd spring-backend
mvn spring-boot:run
```
> Server hoạt động tại: **`http://localhost:8080`**  
> Health check: **`http://localhost:8080/api/health`**

#### 3. Khởi chạy React Front-end (Cổng 3000)
```bash
cd react-frontend
npm install
npm run dev
```
> Ứng dụng giao diện mở tại: **`http://localhost:3000`**  
> Giám sát hệ thống tại: **`http://localhost:3000/health`**

---

## 📡 Danh mục API Endpoints

### 1. Kiểm tra Sức khỏe Hệ thống (Health Check)
- **Method**: `GET`
- **Express URL**: `http://localhost:5000/api/health`
- **Spring Boot URL**: `http://localhost:8080/api/health`
- **Cấu trúc dữ liệu phản hồi (JSON)**:
  ```json
  {
    "success": true,
    "message": "System is healthy and operational",
    "data": {
      "status": "healthy",
      "uptime": "120 seconds",
      "memory": {
        "rss": "55 MB",
        "heapTotal": "10 MB",
        "heapUsed": "8 MB"
      },
      "nodeVersion": "v24.15.0",   // hoặc "javaVersion": "Java 17.0.19"
      "environment": "development" // hoặc "dev"
    },
    "timestamp": "2026-10-03T03:25:28.960Z"
  }
  ```

### 2. Thông tin Giới thiệu & Metadata (Root Route)
- **Method**: `GET`
- **Express URL**: `http://localhost:5000/`
- **Spring Boot URL**: `http://localhost:8080/`

---

## 🐳 Triển khai với Docker & Docker Compose

Dự án đã đóng gói sẵn Dockerfile cho cả 3 dịch vụ và tệp `docker-compose.yml` để khởi chạy đồng thời trên máy chủ:

### 1. Khởi chạy toàn bộ hệ thống
```bash
# Build và chạy ngầm (detached mode)
docker compose up -d --build

# Theo dõi logs trực tiếp của tất cả container
docker compose logs -f

# Dừng và gỡ bỏ toàn bộ containers
docker compose down
```

### 2. Cổng dịch vụ khi chạy Docker
- **Frontend Nginx**: `http://<IP-Server>:80`
- **Express Backend**: `http://<IP-Server>:5000`
- **Spring Boot Backend**: `http://<IP-Server>:8080`

### 3. Build riêng từng container (nếu cần)
```bash
# Build Express Backend
docker build -t template-express-backend:latest ./express-backend

# Build Spring Boot Backend
docker build -t template-spring-backend:latest ./spring-backend

# Build React Frontend
docker build -t template-react-frontend:latest ./react-frontend
```

---

## ⚙️ Biến Môi trường (Environment Variables)

### Front-end (`react-frontend/.env`)
```ini
VITE_APP_NAME=VanCT Developer Toolkit
VITE_API_URL=http://localhost:5000
VITE_EXPRESS_API_URL=http://localhost:5000
VITE_SPRING_API_URL=http://localhost:8080
```

### Express Backend (`express-backend/.env`)
```ini
PORT=5000
NODE_ENV=development
CORS_ORIGIN=*
```

### Spring Backend (`spring-backend/.env`)
```ini
PORT=8080
SPRING_PROFILES_ACTIVE=dev
CORS_ORIGIN=*
```

---

## 👨‍💻 Tác giả
- **Chu Thế Văn (VanCt)**
- Dự án mẫu dành cho việc khởi tạo dự án nhanh, thực hành kiến trúc Fullstack hiện đại và tích hợp song song đa nền tảng backend.
