# 🎨 Hệ Thống Màu Sắc Website

## 📋 Tổng Quan

Website đã được cải thiện với một **hệ thống màu sắc nhất quán** để giải quyết vấn đề màu sắc không đồng điệu và lệch tông.

## 🚨 Vấn Đề Đã Khắc Phục

### Trước đây:
- ❌ **Không có bảng màu nhất quán**
- ❌ **Tông màu lệch nhau** (xanh dương, tím, vàng, hồng)
- ❌ **Gradient không đồng nhất** giữa các section
- ❌ **Màu sắc ngẫu nhiên** cho service icons
- ❌ **Focus states** sử dụng màu khác nhau

### Sau khi sửa:
- ✅ **Bảng màu thống nhất** với 3-4 màu chính
- ✅ **Tông màu hài hòa** dựa trên xanh dương
- ✅ **Gradient nhất quán** sử dụng biến CSS
- ✅ **Service icons** sử dụng màu từ bảng màu chính
- ✅ **Focus states** sử dụng màu accent nhất quán

## 🎯 Bảng Màu Chính

### Primary Colors (Màu Chính)
```css
--primary-blue: #2563eb        /* Xanh dương chính */
--primary-blue-light: #3b82f6  /* Xanh dương nhạt */
--primary-blue-dark: #1d4ed8   /* Xanh dương đậm */
```

### Secondary Colors (Màu Phụ)
```css
--secondary-indigo: #6366f1    /* Chàm */
--secondary-purple: #8b5cf6    /* Tím */
```

### Accent Colors (Màu Nhấn)
```css
--accent-cyan: #06b6d4        /* Xanh lơ */
--accent-teal: #14b8a6        /* Xanh ngọc */
```

### Neutral Colors (Màu Trung Tính)
```css
--neutral-50: #f8fafc         /* Trắng nhạt */
--neutral-100: #f1f5f9        /* Xám rất nhạt */
--neutral-200: #e2e8f0        /* Xám nhạt */
--neutral-800: #1e293b        /* Xám đậm */
--neutral-900: #0f172a        /* Xám rất đậm */
```

## 🌈 Gradient System

### Primary Gradients
```css
--gradient-primary: linear-gradient(135deg, #2563eb 0%, #6366f1 100%)
--gradient-secondary: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)
--gradient-accent: linear-gradient(135deg, #06b6d4 0%, #14b8a6 100%)
```

### Background Gradients
```css
--gradient-light: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)
--gradient-dark: linear-gradient(135deg, #1e293b 0%, #0f172a 100%)
```

## 🔧 Cách Sử Dụng

### 1. Sử dụng biến CSS
```css
.button {
    background: var(--gradient-primary);
    color: white;
    border: 1px solid var(--primary-blue);
}
```

### 2. Sử dụng utility classes
```css
<div class="bg-primary text-white">Primary Button</div>
<div class="bg-gradient-accent text-white">Accent Button</div>
<div class="text-neutral-600">Neutral Text</div>
```

### 3. Hover & Focus States
```css
.button:hover {
    background: var(--gradient-secondary);
}

.input:focus {
    border-color: var(--accent-cyan);
    box-shadow: var(--focus-ring-accent);
}
```

## 📱 Responsive & Accessibility

### Color Contrast
- ✅ **Primary text**: Đạt chuẩn WCAG AA
- ✅ **Secondary text**: Đạt chuẩn WCAG AA  
- ✅ **Background**: Đạt chuẩn WCAG AA

### Dark Mode Ready
- Sử dụng biến CSS dễ dàng chuyển đổi
- Có sẵn `--gradient-dark` cho dark theme

## 🚀 Lợi Ích

1. **Tính nhất quán**: Tất cả màu sắc đều từ cùng một bảng màu
2. **Dễ bảo trì**: Chỉ cần thay đổi biến CSS để cập nhật toàn bộ
3. **Chuyên nghiệp**: Màu sắc hài hòa, không lệch tông
4. **Accessibility**: Đạt chuẩn WCAG về độ tương phản
5. **Scalability**: Dễ dàng mở rộng và thêm màu mới

## 📁 File Structure

```
src/assets/css/
├── color-system.css    # Hệ thống màu sắc chính
├── home.css           # Styles chính (đã cập nhật)
└── banner.css         # Styles banner (đã cập nhật)
```

## 🔄 Cập Nhật Tương Lai

Khi cần thay đổi màu sắc:
1. Chỉnh sửa biến trong `:root`
2. Tất cả elements sẽ tự động cập nhật
3. Không cần tìm và thay đổi từng chỗ

---

**Kết quả**: Website giờ đây có màu sắc **đồng điệu, chuyên nghiệp và dễ bảo trì**! 🎉
