# 🎨 Folder: `src/assets/` (Tài nguyên Tĩnh Được Đóng gói - Bundled Assets)

Thư mục `src/assets/` chứa các tài nguyên tĩnh như hình ảnh, biểu tượng SVG, logo, và các tệp kiểu dáng (styles) được xử lý trực tiếp bởi trình đóng gói Vite.

---

## 🎯 Mục đích & Vai trò

1. **Được Xử lý bởi Vite (Asset Processing)**:
   - Các tệp trong `src/assets/` được Vite tối ưu hóa, gán mã băm (hash content) vào tên tệp khi build production (ví dụ: `hero-D41k3a.png`), giúp trình duyệt tự động xóa cache khi tệp thay đổi.
2. **Hỗ trợ Import Trực tiếp trong JavaScript**:
   - Có thể được import như một module trong React: `import logo from '../assets/vite.svg';`.
3. **Phân biệt `src/assets/` vs `public/`**:
   - `src/assets/`: Dành cho ảnh, SVG, icon được import trực tiếp trong code `.jsx` hoặc `.css`. Được nén, hash và tối ưu tự động.
   - `public/`: Dành cho các tệp tĩnh cần giữ nguyên đường dẫn gốc (như `favicon.ico`, `robots.txt`, `sitemap.xml`).

---

## 📁 Danh sách tệp hiện có

```text
src/assets/
├── README.md   # Hướng dẫn chi tiết về thư mục assets
├── hero.png    # Hình ảnh banner giới thiệu
├── react.svg   # Biểu tượng React chính thức
└── vite.svg    # Biểu tượng Vite chính thức
```

---

## 💡 Cách sử dụng trong React Component

### Cách 1: Import trực tiếp (Khuyên dùng)
```javascript
import heroImg from '../assets/hero.png';
import reactLogo from '../assets/react.svg';

export default function Banner() {
  return (
    <div className="banner">
      <img src={heroImg} alt="Hero Banner" className="img-fluid" />
      <img src={reactLogo} alt="React Logo" width="40" height="40" />
    </div>
  );
}
```

### Cách 2: Sử dụng trong CSS
```css
/* Trong file .css */
.hero-section {
  background-image: url('../assets/hero.png');
  background-size: cover;
  background-position: center;
}
```

---

## ⚠️ Nguyên tắc quan trọng

1. ✅ **Tối ưu dung lượng hình ảnh**: Nên nén ảnh (WebP, PNG tối ưu) trước khi đưa vào thư mục để giảm kích thước bundle.
2. ✅ **Ưu tiên SVG cho Icons & Logos**: SVG có dung lượng nhỏ, hiển thị sắc nét trên mọi độ phân giải màn hình.
3. ❌ **Không đặt các tệp cần giữ nguyên URL cố định**: Nếu cần một tệp truy cập qua đường dẫn tĩnh như `https://domain.com/favicon.svg`, hãy đặt vào thư mục `public/`.
