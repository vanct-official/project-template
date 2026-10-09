# 🛠️ Folder: `src/utils/` (Các Hàm Tiện ích - Utility Functions)

Thư mục `src/utils/` chứa các hàm tiện ích thuần túy (Pure Functions), trợ giúp tính toán, định dạng dữ liệu, xử lý chuỗi, thời gian, clipboard và các thuật toán logic không gắn liền với trạng thái (state) của React component.

---

## 🎯 Mục đích & Vai trò

1. **Hàm thuần túy (Pure Functions)**:
   - Cùng một đầu vào (input) luôn trả về cùng một đầu ra (output), không gây ra tác dụng phụ (side-effects) ngoài phạm vi hàm.
2. **Dễ kiểm thử (Easily Testable)**:
   - Vì không phụ thuộc vào React DOM hay lifecycle, các hàm trong `utils/` rất dễ viết Unit Test (sử dụng Vitest hoặc Jest).
3. **Tái sử dụng cao (High Reusability)**:
   - Tránh việc sao chép lặp lại các đoạn mã xử lý chuỗi, ngày tháng hay lọc mảng ở nhiều file component khác nhau.

---

## 📁 Danh sách tiện ích hiện có

```text
src/utils/
├── README.md           # Hướng dẫn chi tiết về thư mục utils
├── clipboard.js        # Sao chép chuỗi vào Clipboard với cơ chế fallback tương thích trình duyệt cũ
└── commandFilter.js    # Thuật toán tìm kiếm, lọc dữ liệu theo danh mục, từ khóa và mục yêu thích
```

---

## 💡 Ví dụ bổ sung tiện ích mới: `formatters.js`

```javascript
/**
 * Định dạng số thành tiền tệ Việt Nam Đồng (VND)
 * @param {number} amount
 * @returns {string}
 */
export function formatCurrencyVND(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) return '0 ₫';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
}

/**
 * Định dạng thời gian tương đối ngắn gọn
 * @param {string|Date} dateInput
 * @returns {string}
 */
export function formatTimeAgo(dateInput) {
  const date = new Date(dateInput);
  const diffMs = Date.now() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 60) return `${diffSec} giây trước`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} phút trước`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour} giờ trước`;
  return date.toLocaleDateString('vi-VN');
}
```

---

## ⚠️ Nguyên tắc quan trọng

1. ✅ **Giữ tính Độc lập**: Tuyệt đối **không** gọi React Hooks (`useState`, `useEffect`, `useNavigate`) trong `src/utils/`. Nếu logic cần dùng React Hook, hãy chuyển sang `src/hooks/`.
2. ✅ **Xử lý ngoại lệ an toàn**: Các hàm tiện ích phải kiểm tra giá trị `null`, `undefined` hoặc sai kiểu dữ liệu để tránh crash ứng dụng.
3. ✅ **Viết JSDoc rõ ràng**: Chú thích rõ kiểu dữ liệu tham số `@param` và giá trị trả về `@returns` cho từng hàm.
