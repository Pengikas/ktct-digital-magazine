import { MAGAZINE_PAGES_DATA } from "@/data/magazineData";

/**
 * Xuất đúng trang flipbook đang hiển thị (màu, SVG, họa tiết)
 * → in / Lưu thành PDF qua iframe (không cần popup).
 */
export function downloadMagazineFromScreen(bookRoot?: HTMLElement | null) {
  if (typeof window === "undefined") return;

  const root =
    bookRoot ||
    (document.querySelector(".stpageflip-container") as HTMLElement | null);

  const pages = collectFlipPages(root);
  if (!pages.length) {
    window.alert("Chưa tải xong trang tạp chí. Đợi flipbook sẵn sàng rồi thử lại.");
    return;
  }

  // Iframe ẩn — tránh popup blocker
  const prev = document.getElementById("mag-export-iframe");
  if (prev) prev.remove();

  const iframe = document.createElement("iframe");
  iframe.id = "mag-export-iframe";
  iframe.setAttribute("title", "Xuất tạp chí");
  iframe.setAttribute("aria-hidden", "true");
  Object.assign(iframe.style, {
    position: "fixed",
    right: "0",
    bottom: "0",
    width: "0",
    height: "0",
    border: "0",
    opacity: "0",
    pointerEvents: "none",
  });
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument || iframe.contentWindow?.document;
  if (!doc || !iframe.contentWindow) {
    iframe.remove();
    // Fallback: tải file HTML (vẫn giữ màu nếu mở bằng trình duyệt)
    downloadAsHtmlFile(pages);
    return;
  }

  doc.open();
  doc.write(`<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8" />
<title>KTCT Digital Magazine — Tiền nhiều để làm gì?</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
</head><body></body></html>`);
  doc.close();

  copyDocumentStyles(document, doc);

  const printStyle = doc.createElement("style");
  printStyle.textContent = getPrintChromeCss();
  doc.head.appendChild(printStyle);

  const banner = doc.createElement("p");
  banner.className = "no-print mag-export-banner";
  banner.innerHTML =
    'Bản xuất từ tạp chí trên web (có màu & họa tiết) · Chọn <strong>In → Lưu thành PDF</strong>. Bật “Đồ họa nền” / Background graphics nếu PDF vẫn trắng.';
  doc.body.appendChild(banner);

  const wrap = doc.createElement("div");
  wrap.className = "mag-export-root";
  doc.body.appendChild(wrap);

  pages.forEach((pageEl, index) => {
    const sheet = doc.createElement("section");
    sheet.className = "mag-export-sheet";
    sheet.setAttribute("data-page", String(index + 1));

    const clone = pageEl.cloneNode(true) as HTMLElement;
    preparePageClone(clone, index);
    sheet.appendChild(clone);
    wrap.appendChild(sheet);
  });

  const win = iframe.contentWindow;
  let printed = false;
  const cleanup = () => {
    window.setTimeout(() => {
      try {
        iframe.remove();
      } catch {
        /* noop */
      }
    }, 60_000);
  };

  const runPrint = () => {
    if (printed) return;
    printed = true;
    try {
      win.focus();
      win.print();
    } catch {
      downloadAsHtmlFile(pages);
    } finally {
      cleanup();
    }
  };

  const fonts = (doc as Document & { fonts?: FontFaceSet }).fonts;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (fonts?.ready) {
        fonts.ready.then(() => setTimeout(runPrint, 400)).catch(() => setTimeout(runPrint, 900));
        setTimeout(runPrint, 4000);
      } else {
        setTimeout(runPrint, 900);
      }
    });
  });
}

/** Fallback khi iframe không in được: tải HTML đủ style (mở bằng trình duyệt rồi In) */
function downloadAsHtmlFile(pages: HTMLElement[]) {
  const styleSheets = collectInlineStylesSnapshot();
  const sheetsHtml = pages
    .map((pageEl, index) => {
      const clone = pageEl.cloneNode(true) as HTMLElement;
      preparePageClone(clone, index);
      clone.querySelectorAll("button").forEach((b) => b.remove());
      return `<section class="mag-export-sheet" data-page="${index + 1}">${clone.outerHTML}</section>`;
    })
    .join("\n");

  const html = `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8" />
<title>KTCT Digital Magazine — Tiền nhiều để làm gì?</title>
${styleSheets}
<style>${getPrintChromeCss()}</style>
</head>
<body>
<p class="no-print mag-export-banner">Mở file này trong trình duyệt → Ctrl+P → Lưu thành PDF. Bật “Đồ họa nền” nếu cần.</p>
<div class="mag-export-root">${sheetsHtml}</div>
<script>
  window.onload = function () {
    setTimeout(function () { window.print(); }, 600);
  };
</script>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "KTCT-Digital-Magazine-Tien-Nhieu-De-Lam-Gi.html";
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

function collectInlineStylesSnapshot(): string {
  const parts: string[] = [];
  document.querySelectorAll('link[rel="stylesheet"]').forEach((node) => {
    const link = node as HTMLLinkElement;
    if (link.href) parts.push(`<link rel="stylesheet" href="${link.href}" />`);
  });
  document.querySelectorAll("style").forEach((node) => {
    parts.push(`<style>${node.textContent || ""}</style>`);
  });
  return parts.join("\n");
}

function collectFlipPages(root: HTMLElement | null): HTMLElement[] {
  if (!root) return [];

  const all = Array.from(root.querySelectorAll<HTMLElement>(".page-item"));
  if (!all.length) return [];

  const expected = MAGAZINE_PAGES_DATA.length || 12;
  const seen = new Set<string>();
  const unique: HTMLElement[] = [];
  for (const el of all) {
    const key =
      el.getAttribute("data-density") +
      "|" +
      (el.querySelector("h1,h2")?.textContent?.trim() || "").slice(0, 48) +
      "|" +
      (el.textContent || "").slice(0, 80);
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(el);
    if (unique.length >= expected) break;
  }

  return unique.length ? unique : all.slice(0, expected);
}

function copyDocumentStyles(from: Document, to: Document) {
  const rootStyles = from.documentElement.getAttribute("style");
  if (rootStyles) to.documentElement.setAttribute("style", rootStyles);
  to.documentElement.className = from.documentElement.className;

  from.querySelectorAll('link[rel="stylesheet"]').forEach((node) => {
    const link = node as HTMLLinkElement;
    const clone = to.createElement("link");
    clone.rel = "stylesheet";
    clone.href = link.href;
    if (link.media) clone.media = link.media;
    to.head.appendChild(clone);
  });

  from.querySelectorAll("style").forEach((node) => {
    const style = to.createElement("style");
    style.textContent = node.textContent || "";
    to.head.appendChild(style);
  });
}

function preparePageClone(clone: HTMLElement, index: number) {
  clone.classList.add("mag-export-page");
  clone.style.width = "100%";
  clone.style.height = "100%";
  clone.style.minHeight = "260mm";
  clone.style.maxWidth = "100%";
  clone.style.position = "relative";
  clone.style.overflow = "hidden";
  clone.style.boxShadow = "none";
  clone.style.transform = "none";
  clone.style.margin = "0";

  clone.querySelectorAll("button").forEach((btn) => btn.remove());

  clone.querySelectorAll(".mag-vine").forEach((el) => {
    (el as HTMLElement).style.animation = "none";
  });

  uniquifySvgIds(clone, `p${index}`);
}

function uniquifySvgIds(root: HTMLElement, prefix: string) {
  const idMap = new Map<string, string>();
  root.querySelectorAll("[id]").forEach((el) => {
    const oldId = el.getAttribute("id");
    if (!oldId) return;
    const next = `${prefix}-${oldId}`;
    idMap.set(oldId, next);
    el.setAttribute("id", next);
  });
  if (!idMap.size) return;

  root.querySelectorAll("*").forEach((el) => {
    ["fill", "stroke", "clip-path", "mask", "filter", "href", "xlink:href"].forEach((attr) => {
      const val = el.getAttribute(attr);
      if (!val || !val.includes("url(#")) return;
      let next = val;
      idMap.forEach((newId, oldId) => {
        next = next.split(`url(#${oldId})`).join(`url(#${newId})`);
      });
      el.setAttribute(attr, next);
    });
  });
}

function getPrintChromeCss(): string {
  return `
    html, body {
      margin: 0;
      padding: 0;
      background: #ebe0d2;
      color: #1c1410;
    }
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
    .mag-export-banner {
      text-align: center;
      padding: 12px 16px;
      margin: 0;
      font-family: system-ui, sans-serif;
      font-size: 13px;
      background: #9b1b1b;
      color: #f4ebe0;
    }
    .mag-export-root {
      padding: 12px;
    }
    .mag-export-sheet {
      page-break-after: always;
      break-after: page;
      margin: 0 auto 16px;
      max-width: 210mm;
      min-height: 260mm;
      background: transparent;
      box-shadow: 0 8px 28px rgba(28, 20, 16, 0.18);
    }
    .mag-export-sheet:last-child {
      page-break-after: auto;
    }
    .mag-export-page,
    .mag-export-page > div {
      width: 100% !important;
      min-height: 260mm !important;
      height: auto !important;
    }
    @media print {
      body { background: white !important; }
      .no-print { display: none !important; }
      .mag-export-root { padding: 0; }
      .mag-export-sheet {
        margin: 0;
        max-width: none;
        box-shadow: none;
        min-height: 100vh;
      }
      .mag-export-page,
      .mag-export-page > div {
        min-height: 100vh !important;
      }
      @page { size: A4; margin: 0; }
    }
  `;
}
