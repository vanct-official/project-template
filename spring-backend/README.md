# Spring Boot RESTful API Backend

Dự án mẫu Spring Boot RESTful API được xây dựng theo kiến trúc phân lớp chuẩn (Layered Architecture), chạy song song với [ExpressJS Backend](../express-backend/) để phục vụ Front-end React.

---

## 🏛️ So sánh cấu trúc với ExpressJS

| Thành phần | ExpressJS (`express-backend`) | Spring Boot (`spring-backend`) |
| :--- | :--- | :--- |
| **Cổng mặc định** | `5000` | `8080` |
| **File khởi chạy** | `src/server.js` | `SpringBackendApplication.java` |
| **Cấu hình môi trường** | `.env` + `src/config/environment.js` | `.env` + `src/main/resources/application.yml` |
| **Controller** | `src/controllers/health.controller.js` | `src/main/java/com/vanct/template/controller/HealthController.java` |
| **Service Layer** | `src/services/health.service.js` | `src/main/java/com/vanct/template/service/impl/HealthServiceImpl.java` |
| **Response Format** | `src/utils/response.js` | `dto/ApiResponse.java` + `util/ResponseUtil.java` |
| **Bắt lỗi tập trung** | `src/middlewares/errorHandler.js` | `exception/GlobalExceptionHandler.java` (`@RestControllerAdvice`) |
| **CORS** | `cors(config.cors)` | `config/CorsConfig.java` (`WebMvcConfigurer`) |

---

## 📁 Cấu trúc thư mục

```text
spring-backend/
├── .env
├── .gitignore
├── Dockerfile
├── pom.xml
├── README.md
└── src/
    ├── main/
    │   ├── java/com/vanct/template/
    │   │   ├── SpringBackendApplication.java    # Điểm khởi chạy chính & in banner console
    │   │   ├── config/
    │   │   │   └── CorsConfig.java               # Cấu hình CORS cho Frontend React (3000)
    │   │   ├── controller/
    │   │   │   ├── RootController.java           # Endpoint GET /
    │   │   │   └── HealthController.java         # Endpoint GET /api/health
    │   │   ├── dto/
    │   │   │   ├── ApiResponse.java              # Chuẩn hóa envelope { success, message, data, timestamp }
    │   │   │   └── HealthDataDto.java            # DTO dữ liệu RAM, uptime, version
    │   │   ├── exception/
    │   │   │   ├── GlobalExceptionHandler.java   # Xử lý lỗi toàn cục (@RestControllerAdvice)
    │   │   │   └── ResourceNotFoundException.java
    │   │   ├── service/
    │   │   │   ├── HealthService.java            # Interface nghiệp vụ
    │   │   │   └── impl/
    │   │   │       └── HealthServiceImpl.java    # Triển khai tính RAM, Uptime, JVM
    │   │   └── util/
    │   │       └── ResponseUtil.java             # Helper trả về ResponseEntity tiện lợi
    │   └── resources/
    │       └── application.yml                   # File cấu hình YAML chính
    └── test/
        └── java/com/vanct/template/
            └── SpringBackendApplicationTests.java
```

---

## 🚀 Hướng dẫn khởi chạy

### 1. Yêu cầu hệ thống
- **Java**: 17+ (LTS)
- **Maven**: 3.8+

### 2. Chạy môi trường phát triển (Development)
```bash
# Di chuyển vào thư mục spring-backend
cd spring-backend

# Chạy trực tiếp qua Maven Spring Boot plugin
mvn spring-boot:run
```

### 3. Đóng gói & Chạy file JAR
```bash
mvn clean package -DskipTests
java -jar target/spring-backend-1.0.0.jar
```

---

## 📡 Các Endpoint chính

| Method | Endpoint | Mô tả |
| :--- | :--- | :--- |
| `GET` | `http://localhost:8080/` | Trang chào mừng thông tin dịch vụ |
| `GET` | `http://localhost:8080/api/health` | Kiểm tra trạng thái hệ thống, Uptime, RAM, JVM |
| `GET` | `http://localhost:8080/actuator/health` | Spring Boot Actuator Health (nếu cần) |
