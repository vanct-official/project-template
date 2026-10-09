# 🌍 Folder: `public/` (Tài nguyên Công cộng Phục vụ Trực tiếp - Static Public Assets)

Thư mục `public/` chứa các tài nguyên tĩnh được máy chủ Vite phục vụ trực tiếp tại đường dẫn gốc (root `/`) mà **không qua quá trình biên dịch hay băm mã (no bundling / hashing)**.

---

## 🎯 Mục đích & Vai trò

1. **Phục vụ tĩnh nguyên bản (Raw Static Serving)**:
   - Các tệp trong `public/` được giữ nguyên tên tệp và nội dung khi build ra thư mục `dist/`.
   - Ví dụ: `public/favicon.svg` sẽ được phục vụ tại URL `http://localhost:3000/favicon.svg` hoặc `https://domain.com/favicon.svg`.
2. **Các tệp tiêu chuẩn của trình duyệt và SEO**:
   - Thích hợp cho `favicon.ico`, `favicon.svg`, `robots.txt`, `sitemap.xml`, `manifest.json`.
3. **Phân biệt `public/` vs `src/assets/`**:
   - `public/`: Giữ nguyên tên file, tham chiếu bằng đường dẫn tuyệt đối bắt đầu từ `/`. Không import vào file JS.
   - `src/assets/`: Được Vite đóng gói, nén, tạo hash chống cache, tham chiếu bằng lệnh `import`.

---

## 📁 Danh sách tệp hiện có

```text
public/
├── README.md       # Hướng dẫn chi tiết về thư mục public
├── favicon.svg     # Icon hiển thị trên tab trình duyệt
└── icons.svg       # Bộ SVG sprite biểu tượng dùng chung
```

---

## 💡 Cách tham chiếu trong HTML và Component

### Trong file [`index.html`](../index.html):
```html
<!-- Tham chiếu trực tiếp từ root / -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

### Trong JSX:
```javascript
export default function Logo() {
  // Tham chiếu tệp trong public bắt đầu bằng dấu gạch chéo /
  return <img src="/favicon.svg" alt="Application Icon" width="32" height="32" />;
}
```

---

## ⚠️ Nguyên tắc quan trọng

1. ✅ **Không dùng `import` cho tệp trong `public/`**: Sử dụng đường dẫn URL `/ten-file.ext` thay vì `import icon from '/public/icon.png'`.
2. ✅ **Chỉ đặt các tệp cần giữ nguyên URL cố định**: Chỉ đặt những tệp mà bên ngoài (trình duyệt, công cụ tìm kiếm, webhook) cần truy cập qua đường dẫn cố định.
3. ❌ **Không đặt mã nguồn hoặc tệp cần biên dịch tại đây**: Các tệp JSX, CSS, hoặc ảnh cần tối ưu tự động nên đặt trong `src/assets/`.
