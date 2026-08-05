import {
  CONCEPTS_LIST,
  VIETNAM_STATS,
  HAPPINESS_STATS,
  STORIES_LIST,
  MAGAZINE_INTRO_SECTIONS,
  MAGAZINE_MEMBER_NAMES,
  MAGAZINE_PAGES_DATA,
} from "@/data/magazineData";

/** Xuất đúng nội dung flipbook trên màn hình (HTML in được → Save as PDF) */
export function downloadMagazineFromScreen() {
  if (typeof window === "undefined") return;

  const pagesHtml = buildPagesHtml();
  const doc = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <title>KTCT Digital Magazine — Tiền nhiều để làm gì?</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,400;0,600;0,700;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&display=swap" rel="stylesheet" />
  <style>
    @page { size: A4; margin: 14mm; }
    * { box-sizing: border-box; }
    body {
      font-family: "Be Vietnam Pro", "Segoe UI", Arial, sans-serif;
      color: #1c1410;
      background: #ebe0d2;
      margin: 0;
      line-height: 1.45;
      -webkit-font-smoothing: antialiased;
    }
    h1, h2, .serif {
      font-family: "Source Serif 4", "Times New Roman", Times, serif;
    }
    .sheet {
      page-break-after: always;
      break-after: page;
      min-height: 240mm;
      padding: 18mm 16mm;
      margin: 0 auto 12mm;
      max-width: 190mm;
      background: #f4ebe0;
      border: 1px solid #d6c8b8;
      position: relative;
    }
    .sheet:last-child { page-break-after: auto; }
    .sheet.cover {
      background: linear-gradient(145deg, #7a1515, #9b1b1b 45%, #3d0a0a);
      color: #f4ebe0;
      border-color: #d4a017;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
    }
    .sheet.intro {
      background: linear-gradient(145deg, #9b1b1b, #5c0f0f);
      color: #f4ebe0;
    }
    h1 { font-size: 28px; margin: 0; color: #f0d78c; font-weight: 700; }
    h2 { font-size: 18px; margin: 0 0 8px; color: #9b1b1b; font-weight: 700; }
    .intro h2, .cover h2 { color: #f0d78c; }
    .tag { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: #b8860b; font-weight: 700; }
    .intro .tag, .cover .tag { color: #f0d78c; }
    .item { border: 1px solid #d6c8b8; background: #fffefb; padding: 8px 10px; margin: 6px 0; border-radius: 6px; font-size: 12px; }
    .intro .item { background: rgba(61,10,10,0.45); border-color: rgba(212,160,23,0.4); color: #f4ebe0; }
    table { width: 100%; border-collapse: collapse; font-size: 11px; margin-top: 8px; }
    th, td { border: 1px solid #d6c8b8; padding: 5px 6px; text-align: left; }
    th { background: rgba(155,27,27,0.1); color: #9b1b1b; }
    .names { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 12px; }
    .names span { border: 1px solid #d6c8b8; padding: 6px 8px; background: #fffefb; border-radius: 4px; }
    .footer { margin-top: 16px; font-size: 10px; color: #6b5e52; border-top: 1px solid #d6c8b8; padding-top: 8px; display: flex; justify-content: space-between; }
    .cover .footer, .intro .footer { color: rgba(240,215,140,0.75); border-color: rgba(212,160,23,0.3); }
    .cover .lead { font-family: "Source Serif 4", "Times New Roman", serif; font-style: italic; font-size: 13px; opacity: 0.95; }
    @media print {
      body { background: white; }
      .sheet { margin: 0; border: none; max-width: none; box-shadow: none; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  <p class="no-print" style="text-align:center;padding:12px;font-family:'Be Vietnam Pro',sans-serif;font-size:13px;background:#9b1b1b;color:#f4ebe0">
    Đây là bản xuất từ tạp chí flip trên web · Chọn <strong>In → Lưu thành PDF</strong> để tải về
  </p>
  ${pagesHtml}
  <script>
    (function () {
      var printed = false;
      function goPrint() {
        if (printed) return;
        printed = true;
        window.print();
      }
      window.onload = function () {
        if (document.fonts && document.fonts.ready) {
          document.fonts.ready.then(function () { setTimeout(goPrint, 200); });
        }
        setTimeout(goPrint, 2000);
      };
    })();
  </script>
</body>
</html>`;

  const blob = new Blob([doc], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const w = window.open(url, "_blank");
  if (!w) {
    // Popup blocked — fallback download HTML
    const a = document.createElement("a");
    a.href = url;
    a.download = "KTCT-Digital-Magazine-Tien-Nhieu-De-Lam-Gi.html";
    a.click();
  }
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

function buildPagesHtml(): string {
  const sheets: string[] = [];

  sheets.push(`
    <section class="sheet cover">
      <p class="tag">Bìa cứng · UIT SS008.Q31 · 2026</p>
      <h1>TIỀN NHIỀU ĐỂ LÀM GÌ?</h1>
      <p>Soi câu hỏi thực tiễn qua Kinh tế Chính trị Mác – Lênin</p>
      <p>H–T–H · T–H–T′</p>
      <div class="footer"><span>KTCT Digital Magazine</span><span>Trang 1</span></div>
    </section>`);

  sheets.push(`
    <section class="sheet intro">
      <p class="tag">Giới thiệu</p>
      <h2>Hành trình đọc tạp chí</h2>
      <p style="font-size:12px;opacity:.9">Ấn phẩm số bám CQ5, nối lý luận Chương 2–3 với số liệu Việt Nam và dẫn chứng thực tiễn.</p>
      ${MAGAZINE_INTRO_SECTIONS.map(
        (s) =>
          `<div class="item"><strong>${s.num}. ${s.title}</strong><br/>${s.desc}</div>`
      ).join("")}
      <div class="footer"><span>Giới thiệu</span><span>Trang 2</span></div>
    </section>`);

  sheets.push(`
    <section class="sheet">
      <p class="tag">Phần 1</p>
      <h2>Khái niệm cốt lõi 1 — 7</h2>
      ${CONCEPTS_LIST.slice(0, 7)
        .map(
          (c, i) =>
            `<div class="item"><strong>${i + 1}. ${c.term}</strong><br/>${c.definition}</div>`
        )
        .join("")}
      <div class="footer"><span>KTCT Digital Magazine</span><span>Trang 3</span></div>
    </section>`);

  sheets.push(`
    <section class="sheet">
      <p class="tag">Phần 1</p>
      <h2>Khái niệm cốt lõi 8 — 14</h2>
      ${CONCEPTS_LIST.slice(7, 14)
        .map(
          (c, i) =>
            `<div class="item"><strong>${i + 8}. ${c.term}${c.symbol ? ` (${c.symbol})` : ""}</strong><br/>${c.definition}</div>`
        )
        .join("")}
      <div class="footer"><span>KTCT Digital Magazine</span><span>Trang 4</span></div>
    </section>`);

  sheets.push(`
    <section class="sheet">
      <p class="tag">Phần 2 · Nền tảng</p>
      <h2>Hàng hóa & nguồn gốc tiền tệ</h2>
      <div class="item"><strong>Điều kiện ra đời</strong><br/>Phân công lao động xã hội · Tách biệt sở hữu tương đối.</div>
      <div class="item"><strong>Hai thuộc tính</strong><br/>Giá trị sử dụng & Giá trị (lao động xã hội kết tinh).</div>
      <div class="item"><strong>Bốn hình thái</strong><br/>Đơn giản → Đầy đủ → Chung → Tiền tệ.</div>
      <div class="footer"><span>KTCT Digital Magazine</span><span>Trang 5</span></div>
    </section>`);

  sheets.push(`
    <section class="sheet">
      <p class="tag">Phần 2 · Lưu thông</p>
      <h2>5 chức năng & H–T–H / T–H–T′</h2>
      <div class="item">Thước đo giá trị · Lưu thông · Cất trữ · Thanh toán · Tiền thế giới.</div>
      <div class="item"><strong>H–T–H</strong> — mục đích H′ (GTSĐ); tiền là phương tiện sống.</div>
      <div class="item"><strong>T–H–T′</strong> — T′ = T + Δt; tiền thành tư bản.</div>
      <div class="footer"><span>KTCT Digital Magazine</span><span>Trang 6</span></div>
    </section>`);

  sheets.push(`
    <section class="sheet">
      <p class="tag">Phần 2 · Phân tích</p>
      <h2>Phân phối GTTD & của cải thực sự</h2>
      <div class="item">P̄ lợi nhuận bình quân · z lợi tức (T–T′) · R địa tô.</div>
      <div class="item">Tiền = đại biểu chứng nhận. Của cải thực sự = Giá trị sử dụng. Sùng bái tiền tệ → tha hóa.</div>
      <div class="footer"><span>KTCT Digital Magazine</span><span>Trang 7</span></div>
    </section>`);

  sheets.push(`
    <section class="sheet">
      <p class="tag">Phần 3</p>
      <h2>Ba luồng quan điểm</h2>
      <div class="item"><strong>Tiền là quan trọng nhất</strong> — sùng bái tiền tệ.</div>
      <div class="item"><strong>Tiền không quan trọng</strong> — duy tâm, thoát ly sản xuất.</div>
      <div class="item"><strong>Cân bằng Mác – Lênin</strong> — tiền là phương tiện, không phải mục đích tự thân.</div>
      <div class="footer"><span>KTCT Digital Magazine</span><span>Trang 8</span></div>
    </section>`);

  sheets.push(`
    <section class="sheet">
      <p class="tag">Phần 4 · Dữ liệu</p>
      <h2>Số liệu Việt Nam 2022–2025</h2>
      <table>
        <thead><tr><th>Chỉ số</th><th>2022</th><th>2023</th><th>2024</th><th>2025</th></tr></thead>
        <tbody>
          ${VIETNAM_STATS.map(
            (r) =>
              `<tr><td>${r.label}</td><td>${r.y2022}</td><td>${r.y2023}</td><td>${r.y2024}</td><td>${r.y2025}</td></tr>`
          ).join("")}
        </tbody>
      </table>
      <div class="item" style="margin-top:10px"><strong>Hạnh phúc thế giới:</strong> ${HAPPINESS_STATS.map((h) => `${h.year}: ${h.label}`).join(" · ")}</div>
      <div class="footer"><span>KTCT Digital Magazine</span><span>Trang 9</span></div>
    </section>`);

  sheets.push(`
    <section class="sheet">
      <p class="tag">Phần 4 · Case</p>
      <h2>Dẫn chứng thực tiễn & văn hóa</h2>
      ${STORIES_LIST.map(
        (s) =>
          `<div class="item"><strong>${s.title}</strong> — ${s.subtitle}<br/>${s.content}<br/><em>${s.marxistAnalysis}</em></div>`
      ).join("")}
      <div class="footer"><span>KTCT Digital Magazine</span><span>Trang 10</span></div>
    </section>`);

  sheets.push(`
    <section class="sheet">
      <p class="tag">Thành viên</p>
      <h2>Thành viên thực hiện</h2>
      <div class="names">${MAGAZINE_MEMBER_NAMES.map((n) => `<span>${n}</span>`).join("")}</div>
      <div class="footer"><span>Chỉ ghi tên</span><span>Trang 11</span></div>
    </section>`);

  sheets.push(`
    <section class="sheet cover">
      <p class="tag">Bìa sau · Hết số chuyên đề</p>
      <h1 style="font-size:26px">CẢM ƠN ĐÃ ĐỌC</h1>
      <p class="lead">Tiền là phương tiện, không phải mục đích</p>
      <p>FIN · KTCT Digital Magazine · UIT · 2026</p>
      <div class="footer"><span>© 2026</span><span>Trang 12 / ${MAGAZINE_PAGES_DATA.length}</span></div>
    </section>`);

  return sheets.join("\n");
}
