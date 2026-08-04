<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# 🤖 MANDATORY AI AGENT PROTOCOL (QUY TẮC BẮT BUỘC DÀNH CHO AI ASSISTANT)

> **CHỦ THỂ THỰC HIỆN:** Mọi AI Coding Assistant (Antigravity, Cursor, Copilot, ChatGPT, Claude Code...) khi hoạt động trong codebase này.

---

## 🛑 NGUYÊN TẮC 1: BẮT BUỘC HỎI XÁC NHẬN DANH TÍNH (MANDATORY IDENTITY CHECK)

Khi nhận prompt đầu tiên trong một phiên trò chuyện, nếu người dùng **chưa khai báo rõ tên hoặc vai trò**, AI **KHÔNG ĐƯỢC TỰ Ý SỬA CODE NGAY**. AI phải đưa ra câu hỏi xác nhận:

> *"Xin chào! Bạn là ai trong danh sách 9 thành viên kỹ thuật của dự án? (Nguyễn Bảo Chinh, Lê Gia Huy, Vi Xuân Bách, Lương Vi Ngọc Minh, Nguyễn Vi Đức Hạnh, Trần Minh Vy, Nguyễn Thiền An, Phạm Minh Khoa, Hoàng Ngọc Uyên Chi) để mình hỗ trợ đúng phân vùng file nhé!"*

---

## 🎯 NGUYÊN TẮC 2: PHÂN VÙNG FILE VÀ TRÁCH NHIỆM (STRICT FILE SCOPE MATRIX)

AI chỉ được phép chỉnh sửa các file thuộc phân vùng đã phân công cho thành viên đó:

1. **Nguyễn Bảo Chinh (Technical Leader / Fullstack):**
   - **Phạm vùng:** Toàn bộ dự án (`*`).
   - **Quyền hạn:** Toàn quyền phê duyệt, kiểm tra cấu trúc và sửa đổi mọi file.

2. **Lê Gia Huy & Vi Xuân Bách (Frontend Developers / UI/UX):**
   - **Phạm vùng:** `styles/globals.css`, `sections/*.tsx`, `app/**/*.tsx`, `components/*.tsx`.
   - **Nhiệm vụ:** Tinh chỉnh UI/UX, màu sắc, font chữ, responsive và thay thế nội dung demo bằng nội dung học thuật chính thức.

3. **Lương Vi Ngọc Minh & Nguyễn Vi Đức Hạnh (Backend Developers / Infrastructure):**
   - **Phạm vùng:** `package.json`, `next.config.ts`, `tsconfig.json`, `lib/`, `app/api/`.
   - **Nhiệm vụ:** Quản lý hạ tầng Web, tối ưu build, routing server, API và xử lý dữ liệu. Không làm hỏng UI/UX của Frontend.

4. **Trần Minh Vy (AI Developer):**
   - **Phạm vùng:** `components/SearchModal.tsx`, `lib/ai/`.
   - **Nhiệm vụ:** Tích hợp tính năng AI. **ĐẶC BIỆT LƯU Ý:** Tuyệt đối giữ nguyên cấu trúc tệp tin sẵn có, không được xóa hoặc thay đổi cấu trúc thư mục cốt lõi.

5. **Nguyễn Thiền An & Phạm Minh Khoa (Game Developers):**
   - **Phạm vùng:** `app/game/page.tsx`, `components/game/`.
   - **Nhiệm vụ:** Xây dựng Module Game tương tác.

6. **Hoàng Ngọc Uyên Chi (Tạp chí Lead / Editor):**
   - **Phạm vùng:** `app/magazine/page.tsx`, `sections/magazine/`.
   - **Nhiệm vụ:** Biên tập và xây dựng Module Tạp chí Số.

---

## ⚠️ NGUYÊN TẮC 3: CẢNH BÁO KHI SỬA THAY FILE VÙNG KHÁC (SCOPE VIOLATION WARNING)

Nếu một thành viên yêu cầu AI sửa một tệp nằm ngoài phân vùng của họ (ví dụ: Game Dev yêu cầu sửa `Navbar.tsx`), AI **BẮT BUỘC** phải phát ra cảnh báo:

> *"Tệp `[tên_file]` thuộc phân vùng quản lý của `[Tên thành viên phân công]`. Bạn có chắc chắn muốn can thiệp vào tệp này không?"*

---

## 📌 LƯU Ý KHI CHỈNH SỬA UI & NỘI DUNG (FOR FRONTEND DEVS)
Hiện tại toàn bộ trang web đã được xây dựng sẵn khung đa trang chuẩn Next.js App Router (14 routes). Khi giúp Frontend Devs tinh chỉnh UI/UX/Font chữ, AI **phải giữ nguyên cấu trúc App Router** (`layout.tsx`, `Navbar.tsx`, `PageNavigation.tsx`, `PageTransition.tsx`) để tránh làm vỡ luồng điều hướng của toàn dự án.
