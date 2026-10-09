# 🔌 Folder: `src/services/` (Tầng Dịch vụ & Bộ Chuyển tiếp Tương thích)

Thư mục `src/services/` là nơi tích hợp các dịch vụ bên thứ ba (Third-party Services), tiện ích tích hợp hệ thống ngoài (như Socket, Analytics, Web Storage) và duy trì lớp tương thích ngược (Backward Compatibility Layer).

---

## 🎯 Mục đích & Vai trò

1. **Lớp Chuyển tiếp Tương thích Ngược (`api.js`)**:
   - Chuyển tiếp (delegate) các lệnh gọi API cũ sang kiến trúc quản lý API tập trung mới tại `src/api/`.
   - Giúp các component hoặc mã nguồn cũ đang `import { ... } from '../services/api'` không bị gãy hoặc lỗi.
2. **Dịch vụ Độc lập Bên ngoài**:
   - Nếu dự án cần tích hợp Firebase, WebSockets, Socket.IO, Google Analytics, hay Sentry, các dịch vụ này sẽ được cấu hình tại đây.
3. **Phân biệt `api/` vs `services/`**:
   - `src/api/`: Dành riêng cho giao tiếp HTTP RESTful API của hệ thống Backend chính (Express / Spring Boot).
   - `src/services/`: Dành cho các dịch vụ phụ trợ nền tảng, SDK bên thứ ba, hoặc adapter tương thích.

---

## 📁 Cấu trúc thư mục

```text
src/services/
├── README.md       # Hướng dẫn chi tiết về thư mục services
└── api.js          # Adapter tương thích ngược, ủy quyền sang src/api/
```

---

## 💡 Ví dụ tích hợp dịch vụ mới: `analytics.service.js`

```javascript
/**
 * Dịch vụ ghi nhận sự kiện người dùng (Analytics / Telemetry)
 */
export const analyticsService = {
  trackEvent: (eventName, payload = {}) => {
    if (import.meta.env.PROD) {
      // Gửi event lên server giám sát thật (ví dụ: Google Analytics hoặc PostHog)
      console.log(`[Analytics Event]: ${eventName}`, payload);
    } else {
      console.debug(`[Dev Analytics]: ${eventName}`, payload);
    }
  },

  trackPageView: (pagePath) => {
    console.debug(`[Page View]: ${pagePath}`);
  }
};

export default analyticsService;
```

---

## ⚠️ Nguyên tắc quan trọng

1. ✅ **Ưu tiên sử dụng `src/api/` cho các API CRUD mới**: Đối với mọi tính năng gọi API backend mới, hãy tạo resource module trong `src/api/` thay vì thêm vào `src/services/`.
2. ✅ **Giữ `services/api.js` nguyên vẹn cho tương thích ngược**: Không xóa bỏ các export cũ nếu dự án hoặc thư viện bên ngoài đang phụ thuộc vào chúng.
