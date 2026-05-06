# electricity-consumed

Check your household electricity consumption.

## Language composition
- JavaScript: 58.7%
- CSS: 20.9%
- HTML: 20.4%

## Mô tả
Ứng dụng cho phép người dùng kiểm tra lượng điện tiêu thụ trong hộ gia đình.

## Login (demo)
Mình đã thêm một demo tính năng đăng nhập phía client. Các tệp mới:
- `login.html` — trang đăng nhập/đăng ký demo
- `js/login.js` — logic đăng nhập/đăng ký cơ bản (lưu token demo vào localStorage)
- `css/login.css` — style đơn giản cho trang đăng nhập

Hướng dẫn nhanh:
1. Mở `login.html` trong trình duyệt.
2. Đăng nhập bằng tài khoản demo: `user@example.com` / `password123`, hoặc đăng ký tài khoản mới (lưu localStorage).

Lưu ý: Đây là chức năng demo phía client, không an toàn cho môi trường production. Để triển khai thực tế, cần thêm backend để xác thực, lưu mật khẩu an toàn (hash + salt), và sử dụng HTTPS.
