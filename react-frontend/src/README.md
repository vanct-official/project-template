# 📂 Folder: `src/` (Mã nguồn Chính của React Frontend)

Thư mục `src/` là thư mục gốc chứa toàn bộ mã nguồn của ứng dụng React + Vite.

---

## 🗺️ Bản đồ Thư mục (Directory Sitemap)

```text
src/
├── api/          # 🌐 Quản lý API tập trung: endpoints, http client, resource modules
├── assets/       # 🎨 Tài nguyên tĩnh được Vite đóng gói: hình ảnh, logo, svg
├── components/   # 🧩 Các UI components tái sử dụng: Button, Card, Navbar, Toast
├── data/         # 📚 Dữ liệu tĩnh, hằng số danh mục và mock data
├── hooks/        # 🪝 Các React Custom Hooks tái sử dụng: useDebounce, useLocalStorage
├── pages/        # 📄 Các trang màn hình hoàn chỉnh tương ứng với các route
├── routes/       # 🚦 Cấu hình định tuyến với react-router-dom
├── services/     # 🔌 Tầng dịch vụ bên thứ ba & adapter tương thích ngược
├── utils/        # 🛠️ Các hàm tiện ích thuần túy (pure functions, formatting, clipboard)
├── App.jsx       # 🚀 Component gốc ứng dụng, quản lý layout và theme
├── index.css     # 💅 Tệp CSS toàn cục và biến giao diện tùy chỉnh
└── main.jsx      # ⚡ Điểm khởi đầu (Entrypoint) gắn kết React vào DOM
```

---

## 🧭 Luồng luân chuyển Dữ liệu (Data Flow Overview)

1. **Khởi chạy (`main.jsx` &rarr; `App.jsx`)**:
   - `main.jsx` gắn kết ứng dụng vào thẻ `#root` trong `index.html`.
   - `App.jsx` khởi tạo `<BrowserRouter>`, quản lý trạng thái giao diện Sáng/Tối (`data-bs-theme`) và nạp `<Navbar>` cùng `<AppRoutes>`.

2. **Định tuyến (`src/routes/`)**:
   - URL trên trình duyệt xác định trang nào trong `src/pages/` được render.

3. **Giao tiếp Dữ liệu & API (`src/api/` & `src/data/`)**:
   - Các trang lấy dữ liệu tĩnh từ `src/data/` hoặc gọi dữ liệu từ backend qua `src/api/`.
   - `src/api/http.js` xử lý gửi request và chuẩn hóa response/error.

4. **Hiển thị Giao diện (`src/components/`)**:
   - Các trang phân phối dữ liệu xuống các component con để hiển thị trạng thái tương tác cho người dùng.

---

## 📖 Hướng dẫn chi tiết từng thư mục

Để xem hướng dẫn chi tiết và ví dụ code mẫu cho từng phần, bạn hãy bấm vào tài liệu hướng dẫn tương ứng:
* [Hướng dẫn `src/api/`](./api/README.md) - Cách tạo endpoint, gọi API, hủy request.
* [Hướng dẫn `src/components/`](./components/README.md) - Cách tạo và tái sử dụng component giao diện.
* [Hướng dẫn `src/pages/`](./pages/README.md) - Cách xây dựng màn hình và xử lý trạng thái.
* [Hướng dẫn `src/routes/`](./routes/README.md) - Cách cấu hình tuyến đường và bảo vệ trang.
* [Hướng dẫn `src/services/`](./services/README.md) - Tích hợp dịch vụ ngoài và tương thích ngược.
* [Hướng dẫn `src/utils/`](./utils/README.md) - Thêm hàm tiện ích thuần túy.
* [Hướng dẫn `src/hooks/`](./hooks/README.md) - Tự viết Custom Hook.
* [Hướng dẫn `src/data/`](./data/README.md) - Mở rộng danh mục và lệnh CLI.
* [Hướng dẫn `src/assets/`](./assets/README.md) - Quản lý ảnh và tài nguyên tĩnh.
