# TumlovePet (เว็บไซต์คลินิกสัตว์เลี้ยง)

เว็บไซต์ 3 หน้า: `index.html` (หน้าแรก), `services.html` (รายการบริการ + API สภาพอากาศ Open-Meteo), `contact.html` (แบบฟอร์มพร้อม validation)

## เฟรมเวิร์คและไลบรารีที่ใช้
- **Bootstrap 5** — ใช้ระบบ Grid, Navbar แบบ hamburger และคอมโพเนนต์สำเร็จรูป ช่วยให้ทำ Responsive (มือถือ/แท็บเล็ต/เดสก์ท็อป) ได้รวดเร็วและสม่ำเสมอ
- **Font Awesome** — ใช้ไอคอนแทนรูปภาพ ช่วยให้หน้าเว็บโหลดเร็วและสื่อความหมายของแต่ละบริการได้ชัดเจน

## JavaScript (`js/main.js`)
`toggleTheme()` สลับโหมดสว่าง/มืด, `filterServices()` ค้นหา/กรอง, `validateContactForm()` ตรวจฟอร์ม, `loadWeather()` เรียก API ด้วย async/await

## วิธีรัน
เปิด `index.html` ด้วยเบราว์เซอร์ (ต้องต่ออินเทอร์เน็ตเพื่อโหลด Bootstrap, Font Awesome และ API)

## การทดสอบและแก้ไขข้อผิดพลาด

### เครื่องมือที่ใช้
- Chrome DevTools: Device Toolbar (ทดสอบ 375px / 768px / 1280px) และแท็บ Console
- Lighthouse (หน้าแรก `index.html`): Performance, Accessibility, Best Practices, SEO
- W3C HTML Validator (https://validator.w3.org): ตรวจทั้ง 3 หน้า

### ตารางบันทึกปัญหาและวิธีแก้ไข
| # | ปัญหาที่พบ | วิธีแก้ไข |
|---|-----------|-----------|
| 1 | รูปหน้าแรกไม่กำหนด width/height ทำให้เลย์เอาต์กระตุกตอนโหลด (Layout Shift) | เพิ่ม `width="600" height="400"` ที่แท็ก `<img>` และคง `img-fluid` ไว้ให้ปรับขนาดตามหน้าจอ |
| 2 | ไม่มี favicon ทำให้เบราว์เซอร์ร้องขอ `/favicon.ico` แล้วขึ้น 404 ใน Console เมื่อรันบนเซิร์ฟเวอร์ | เพิ่ม `<link rel="icon">` แบบ data URI ในทุกหน้า |
| 3 | ในโหมดมืด ปุ่ม outline สีเขียวเข้มอ่านยากบนพื้นหลังเข้ม (คอนทราสต์ต่ำ) | กำหนดสีปุ่มและเส้นขอบเป็น `#5eead4` เมื่อ `data-bs-theme=dark` ใน `style.css` |

### ผลการทดสอบ
บันทึกผลจริงที่ได้จากการรันเครื่องมือด้านบน (คะแนน Lighthouse, จำนวน error/warning จาก W3C Validator) ที่นี่:

| รายการ | ผล |
|--------|----|
| Lighthouse – Performance | __ / 100 |
| Lighthouse – Accessibility | __ / 100 |
| Lighthouse – Best Practices | __ / 100 |
| Lighthouse – SEO | __ / 100 |
| W3C Validator (3 หน้า) | __ errors, __ warnings |
| Console (ไม่มี error สีแดง) | ผ่าน / ไม่ผ่าน |
