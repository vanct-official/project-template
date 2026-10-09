# 🪝 Folder: `src/hooks/` (Các React Custom Hooks Tái sử dụng)

Thư mục `src/hooks/` chứa các Custom Hooks tự xây dựng nhằm tách biệt logic xử lý trạng thái (stateful logic), vòng đời component (lifecycle), và các tác vụ lặp lại ra khỏi giao diện hiển thị (UI components).

---

## 🎯 Mục đích & Vai trò

1. **Tái sử dụng Stateful Logic**:
   - Khi hai hoặc nhiều component cùng cần một logic xử lý trạng thái (ví dụ: lắng nghe kích thước màn hình, debounce từ khóa tìm kiếm, lưu trạng thái vào `localStorage`), ta đóng gói thành Custom Hook.
2. **Làm sạch Component (Clean Code)**:
   - Giúp component chỉ tập trung vào việc render giao diện, không bị phình to bởi hàng chục dòng `useState` và `useEffect`.
3. **Tuân thủ Nguyên tắc Hooks (Rules of Hooks)**:
   - Tên Custom Hook bắt buộc phải bắt đầu bằng tiền tố `use` (ví dụ: `useDebounce`, `useLocalStorage`, `useApi`).

---

## 📁 Cấu trúc thư mục gợi ý

```text
src/hooks/
├── README.md            # Hướng dẫn chi tiết về custom hooks
├── useDebounce.js       # Hook trì hoãn cập nhật giá trị (tối ưu ô tìm kiếm tức thời)
├── useLocalStorage.js   # Hook đồng bộ state với localStorage
└── useHealthCheck.js    # Hook giám sát API health tự động định kỳ
```

---

## 💡 Ví dụ thực tế: `useDebounce.js`

Giúp trì hoãn việc gọi hàm lọc hoặc tìm kiếm cho đến khi người dùng ngừng gõ sau một khoảng thời gian:

```javascript
// src/hooks/useDebounce.js
import { useState, useEffect } from 'react';

/**
 * useDebounce - Trì hoãn giá trị cập nhật
 * @param {any} value - Giá trị cần debounce
 * @param {number} delay - Thời gian chờ (mili-giây), mặc định 300ms
 * @returns {any}
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Hủy timeout nếu giá trị thay đổi trước khi hết thời gian chờ
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
```

### Sử dụng trong Component:
```javascript
import { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';

export default function SearchExample() {
  const [text, setText] = useState('');
  const debouncedSearch = useDebounce(text, 400);

  useEffect(() => {
    if (debouncedSearch) {
      console.log('Gửi request tìm kiếm cho:', debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Nhập từ khóa tìm kiếm..."
    />
  );
}
```

---

## 💡 Ví dụ 2: `useLocalStorage.js`

```javascript
// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Lỗi đọc key "${key}" từ localStorage:`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Lỗi lưu key "${key}" vào localStorage:`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
```

---

## ⚠️ Nguyên tắc quan trọng

1. ✅ **Bắt buộc có tiền tố `use`**: Tên hook phải tuân thủ chuẩn `useSomething` để ESLint nhận diện và kiểm tra các quy tắc hook.
2. ✅ **Luôn dọn dẹp (Cleanup)**: Nếu hook có `addEventListener`, `setInterval`, hoặc `AbortController`, luôn dọn dẹp trong hàm return của `useEffect`.
3. ❌ **Không gọi Hook có điều kiện**: Tuyệt đối không gọi hook bên trong câu lệnh `if`, vòng lặp `for`, hoặc hàm lồng nhau.
