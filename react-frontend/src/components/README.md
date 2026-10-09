# 🧩 Folder: `src/components/` (Các Component Giao diện Tái sử dụng)

Thư mục `src/components/` chứa các thành phần giao diện (UI Components) độc lập, có tính tái sử dụng cao trong toàn bộ ứng dụng.

---

## 🎯 Mục đích & Vai trò

1. **Tính Tái Sử Dụng (Reusability)**:
   - Các khối UI như thanh tìm kiếm, thẻ hiển thị, nút sao chép, thanh điều hướng... được đóng gói thành các component riêng biệt để sử dụng ở nhiều trang.
2. **Nguyên Tắc Đơn Trách Nhiệm (Single Responsibility Principle)**:
   - Mỗi component chỉ tập trung vào một nhiệm vụ hiển thị cụ thể và giao tiếp với component cha thông qua `props` và `callbacks`.
3. **Phân Biệt Component vs Page**:
   - Component tại đây là các mảnh ghép nhỏ (Building Blocks).
   - Component **không** đại diện cho toàn bộ một màn hình URL (việc đó do thư mục `src/pages/` phụ trách).

---

## 📁 Danh sách Component hiện có

```text
src/components/
├── README.md           # Hướng dẫn chi tiết về thư mục components
├── ApiHealthCard.jsx   # Thẻ giám sát kết nối và tài nguyên Backend song song (Express & Spring)
├── CategoryTabs.jsx    # Thanh tab chọn danh mục (Desktop & Mobile)
├── CommandCard.jsx     # Thẻ hiển thị lệnh, nút copy từng bước, gắn sao yêu thích
├── CommandList.jsx     # Danh sách lọc lệnh, phân loại type và phân trang/lưới
├── CopyButton.jsx      # Nút tiện ích copy nội dung vào clipboard có phản hồi trực quan
├── EmptyState.jsx      # Hiển thị giao diện khi không tìm thấy kết quả hoặc danh sách rỗng
├── Navbar.jsx          # Thanh điều hướng trên cùng, chuyển đổi Light/Dark mode, mini health check
├── SearchBar.jsx       # Ô tìm kiếm tức thời với phím tắt nhanh và nút xóa
└── Toast.jsx           # Hộp thông báo nổi phản hồi hành động sao chép
```

---

## 💡 Hướng dẫn tạo Component mới

### Quy ước đặt tên:
* Tên file và tên hàm Component đặt theo chuẩn **PascalCase**: `UserProfileCard.jsx`, `ModalConfirm.jsx`.
* Sử dụng phần mở rộng `.jsx`.
* Định nghĩa rõ ràng các `props` mặc định hoặc kiểm tra giá trị đầu vào.

### Ví dụ: Tạo `BadgeStatus.jsx`
```javascript
/**
 * BadgeStatus - Hiển thị nhãn trạng thái với màu sắc tương ứng
 * @param {object} props
 * @param {'online'|'offline'|'pending'} props.status - Trạng thái
 * @param {string} [props.label] - Nhãn tùy chọn
 */
export default function BadgeStatus({ status = 'offline', label }) {
  const statusConfig = {
    online: { color: 'success', text: label || 'Đang hoạt động' },
    offline: { color: 'danger', text: label || 'Mất kết nối' },
    pending: { color: 'warning', text: label || 'Đang kiểm tra' },
  };

  const current = statusConfig[status] || statusConfig.offline;

  return (
    <span className={`badge bg-${current.color}-subtle text-${current.color} border border-${current.color}-subtle d-inline-flex align-items-center gap-1`}>
      <span
        className={`badge rounded-circle bg-${current.color} p-1`}
        style={{ width: '6px', height: '6px' }}
      />
      <span>{current.text}</span>
    </span>
  );
}
```

---

## ⚠️ Nguyên tắc quan trọng

1. ✅ **Giữ Component Tinh Gọn & Tái Sử Dụng**: Ưu tiên nhận dữ liệu qua `props`, hạn chế gắn chặt component với dữ liệu cứng (hardcoded data).
2. ✅ **Tránh rò rỉ bộ nhớ (Memory Leaks)**: Khi sử dụng `useEffect` có timer (`setInterval`, `setTimeout`) hoặc async fetch, luôn khai báo hàm dọn dẹp (cleanup function).
3. ❌ **Không gọi API trực tiếp với đường dẫn URL cứng**: Khi cần gọi API trong component, luôn import từ `src/api` (ví dụ: `import { healthApi } from '../api';`).
4. ❌ **Không lưu trữ state toàn cục cục bộ**: Các trạng thái dùng chung toàn app nên được quản lý ở cấp cha hoặc chia sẻ qua Context/URL query, tránh duplicate state.
