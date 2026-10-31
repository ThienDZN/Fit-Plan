# FitPlan

App cá nhân theo dõi tập luyện và ăn uống cho quá trình cutting. Chạy hoàn toàn offline, không backend, dữ liệu lưu trên máy (`localStorage`). Giao diện tiếng Việt, ưu tiên điện thoại.

## Tính năng hiện tại (Giai đoạn 1–2)

- Module công thức thuần (kcal theo MET ròng, mục tiêu ăn, thâm hụt) kèm test Vitest.
- Mô hình dữ liệu + lưu trữ `localStorage` có `schemaVersion` và migrate.
- Giao diện một trang: hero + rank, thanh 7 ngày, cân nặng theo tuần, khai báo buổi tập bằng ô cuộn, khẩu phần gợi ý, nhiệm vụ + tổng kết cuối ngày, tổng kết tháng, cài đặt.
- Dark mode theo `prefers-color-scheme`.

## Cài đặt & chạy

```bash
npm install          # chạy lần đầu
npm run dev          # dev server
npm run build        # typecheck + build ra dist/
npm run preview      # xem bản build
npm run test         # chạy test Vitest
npm run lint         # oxlint
```

Lưu ý: nếu môi trường có `NODE_ENV=production`, chạy `npm install --include=dev` để cài đủ devDependencies.

## Cấu trúc thư mục

```
src/
├── config.ts          # hằng số mặc định, bảng hoạt động MET, cường độ
├── strings.ts         # toàn bộ chuỗi giao diện tiếng Việt
├── App.tsx            # trang chính, điều phối state
├── core/              # module thuần, không phụ thuộc UI
│   ├── formulas.ts    # kcal/plan/burn/target/out/diff
│   ├── dates.ts       # khóa ngày & tuần theo giờ địa phương
│   ├── report.ts      # đánh giá đạt/fail + lý do
│   ├── rank.ts        # rank theo tổng kcal đốt
│   ├── status.ts      # trạng thái màu ngày f/t/r/m/n
│   ├── weight.ts      # gợi ý tốc độ giảm cân
│   └── summary.ts     # tổng kết tuần/tháng, rank
├── storage/           # lưu trữ + seed ngày mặc định
├── data/              # meals.json (khẩu phần mẫu, sửa được)
├── hooks/useStore.ts  # state + localStorage
├── components/        # Hero, DayBar, WeightCard, ...
└── tests/             # Vitest
```

## Dữ liệu & giới hạn

- Mọi số liệu calo/TDEE là **ước tính**, sửa được trong Cài đặt.
- Dữ liệu nằm trên máy; dùng nút **Xuất JSON** để sao lưu (đổi host hoặc xóa dữ liệu trình duyệt sẽ mất dữ liệu).
- Dữ liệu khẩu phần trong `src/data/meals.json` là mẫu để chỉnh theo nhu cầu.

## Chưa làm (các giai đoạn sau)

- PWA (manifest + service worker + cài lên màn hình chính).
- APK Android bằng Capacitor + thông báo hẹn giờ.
- Chi phí ăn uống (giá món + ngân sách 70k/ngày).
