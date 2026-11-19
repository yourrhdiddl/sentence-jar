// Sentence Jar - 팝업 화면
// 저장한 문장을 보여 주고, 찾기·복사·지우기를 한다.

const STORAGE_KEY = "sentences";

const listEl = document.getElementById("list");
const emptyEl = document.getElementById("empty");
const emptyTitleEl = document.getElementById("emptyTitle");
const emptyTextEl = document.getElementById("emptyText");
const countEl = document.getElementById("count");
const searchEl = document.getElementById("search");
const clearAllEl = document.getElementById("clearAll");
const toastEl = document.getElementById("toast");

const ICONS = {
  copy: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/></svg>',
  check: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg>',
  trash: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/></svg>',
  link: '<svg class="dot" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>'
};

let sentences = [];

// ---- 라이트/다크 모드 ----
// 고른 테마는 chrome.storage.local 의 "theme" 에 저장한다.
// 한 번도 고르지 않았으면 컴퓨터 설정(밝은/어두운 테마)을 따른다.
const THEME_KEY = "theme";
const themeBtn = document.getElementById("themeBtn");

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const next = theme === "dark" ? "light" : "dark";
  const label = `Switch to ${next} mode`;
  themeBtn.title = label;
  themeBtn.setAttribute("aria-label", label);
}

async function loadTheme() {
  const data = await chrome.storage.local.get(THEME_KEY);
  const saved = data[THEME_KEY];
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved === "light" || saved === "dark" ? saved : systemDark ? "dark" : "light");
}

themeBtn.addEventListener("click", async () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next);
  await chrome.storage.local.set({ [THEME_KEY]: next });
  toast(next === "dark" ? "Dark mode" : "Light mode");
});

async function load() {
  const data = await chrome.storage.local.get(STORAGE_KEY);
  sentences = Array.isArray(data[STORAGE_KEY]) ? data[STORAGE_KEY] : [];
  render();
}

async function save() {
  await chrome.storage.local.set({ [STORAGE_KEY]: sentences });
}

function render() {
  const keyword = searchEl.value.trim();
  const lower = keyword.toLowerCase();
  const shown = keyword
    ? sentences.filter((s) => s.text.toLowerCase().includes(lower))
    : sentences;

  countEl.textContent = sentences.length;
  clearAllEl.disabled = sentences.length === 0;
  listEl.textContent = "";

  if (shown.length === 0) {
    listEl.hidden = true;
    emptyEl.hidden = false;
    if (sentences.length === 0) {
      emptyTitleEl.textContent = "No sentences yet";
      emptyTextEl.innerHTML =
        "Select text on any page, then<br><kbd>Right-click</kbd> → <kbd>" + chrome.i18n.getMessage("menuSave") + "</kbd>" +
        '<span class="tip">Tip: pin this icon to the toolbar to see <b>OK</b> after each save.</span>';
    } else {
      emptyTitleEl.textContent = "No matches";
      emptyTextEl.textContent = "Try a different word.";
    }
    return;
  }

  listEl.hidden = false;
  emptyEl.hidden = true;
  for (const s of shown) {
    listEl.appendChild(makeItem(s, keyword));
  }
}

// 저장된 문장은 textContent 로만 넣어서, 문장에 HTML이 섞여 있어도 안전하게 보여 준다.
function makeItem(s, keyword) {
  const li = document.createElement("li");
  li.className = "item glass";

  const p = document.createElement("p");
  p.className = "text";
  appendHighlighted(p, s.text, keyword);

  const meta = document.createElement("div");
  meta.className = "meta";

  const source = document.createElement(s.url ? "a" : "span");
  source.className = "source";
  if (s.url) {
    source.href = s.url;
    source.target = "_blank";
    source.rel = "noopener";
    source.title = s.url;
    source.insertAdjacentHTML("beforeend", ICONS.link);
  }
  const label = document.createElement("span");
  label.textContent = [formatDate(s.savedAt), s.title || hostOf(s.url)].filter(Boolean).join(" · ");
  source.appendChild(label);

  const actions = document.createElement("div");
  actions.className = "actions";

  const copyBtn = iconButton("copy", ICONS.copy, "Copy");
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(s.text);
      copyBtn.innerHTML = ICONS.check;
      toast("Copied");
      setTimeout(() => (copyBtn.innerHTML = ICONS.copy), 1200);
    } catch {
      toast("Could not copy");
    }
  });

  const delBtn = iconButton("delete", ICONS.trash, "Delete");
  delBtn.addEventListener("click", async () => {
    const index = sentences.findIndex((x) => x.id === s.id);
    if (index === -1) return;
    const [removed] = sentences.splice(index, 1);
    await save();
    render();
    // 지운 뒤 5초 동안 "Undo"로 되돌릴 수 있다. 원래 있던 자리에 다시 넣는다.
    toast("Deleted", {
      label: "Undo",
      ms: 5000,
      onClick: async () => {
        if (sentences.some((x) => x.id === removed.id)) return;
        sentences.splice(Math.min(index, sentences.length), 0, removed);
        await save();
        render();
        toast("Restored");
      }
    });
  });

  actions.append(copyBtn, delBtn);
  meta.append(source, actions);
  li.append(p, meta);
  return li;
}

function iconButton(kind, svg, label) {
  const btn = document.createElement("button");
  btn.className = `icon-btn ${kind}`;
  btn.type = "button";
  btn.title = label;
  btn.setAttribute("aria-label", label);
  btn.innerHTML = svg;
  return btn;
}

// 찾는 낱말을 <mark>로 감싼다. 문장 자체는 텍스트 노드로만 넣는다.
function appendHighlighted(el, text, keyword) {
  if (!keyword) {
    el.textContent = text;
    return;
  }
  const lowerText = text.toLowerCase();
  const lowerKey = keyword.toLowerCase();
  let i = 0;
  while (i < text.length) {
    const at = lowerText.indexOf(lowerKey, i);
    if (at === -1) {
      el.append(text.slice(i));
      break;
    }
    if (at > i) el.append(text.slice(i, at));
    const mark = document.createElement("mark");
    mark.textContent = text.slice(at, at + keyword.length);
    el.append(mark);
    i = at + keyword.length;
  }
}

// 화면 아래에 잠깐 뜨는 메시지. action 을 주면 "Undo" 같은 버튼이 함께 붙는다.
let toastTimer;
function toast(message, action) {
  toastEl.textContent = "";
  const text = document.createElement("span");
  text.textContent = message;
  toastEl.append(text);

  if (action) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "toast-action";
    btn.textContent = action.label;
    btn.addEventListener("click", () => {
      hideToast();
      action.onClick();
    });
    toastEl.append(btn);
  }

  toastEl.classList.toggle("has-action", Boolean(action));
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(hideToast, (action && action.ms) || 1400);
}

function hideToast() {
  clearTimeout(toastTimer);
  toastEl.classList.remove("show");
}

// ---- 확인 창 ----
// 브라우저 기본 confirm() 대신 팝업 디자인과 같은 유리 확인 창을 띄운다.
// 고른 답을 true(지우기) / false(취소)로 돌려준다.
const confirmEl = document.getElementById("confirm");
const confirmTitleEl = document.getElementById("confirmTitle");
const confirmOkEl = document.getElementById("confirmOk");
const confirmCancelEl = document.getElementById("confirmCancel");

function askConfirm(title) {
  return new Promise((resolve) => {
    confirmTitleEl.textContent = title;
    confirmEl.hidden = false;
    confirmCancelEl.focus(); // 실수로 Enter를 눌러도 지워지지 않게 '취소'에 먼저 초점을 둔다

    const close = (answer) => {
      confirmEl.hidden = true;
      confirmOkEl.removeEventListener("click", onOk);
      confirmCancelEl.removeEventListener("click", onCancel);
      confirmEl.removeEventListener("click", onBackdrop);
      document.removeEventListener("keydown", onKey);
      clearAllEl.focus();
      resolve(answer);
    };
    const onOk = () => close(true);
    const onCancel = () => close(false);
    const onBackdrop = (e) => { if (e.target === confirmEl) close(false); };
    const onKey = (e) => {
      if (e.key === "Escape") close(false);
      if (e.key === "Tab") {
        // 확인 창이 열려 있는 동안 Tab 초점이 두 버튼 안에서만 돈다
        e.preventDefault();
        (document.activeElement === confirmCancelEl ? confirmOkEl : confirmCancelEl).focus();
      }
    };

    confirmOkEl.addEventListener("click", onOk);
    confirmCancelEl.addEventListener("click", onCancel);
    confirmEl.addEventListener("click", onBackdrop);
    document.addEventListener("keydown", onKey);
  });
}

function formatDate(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function hostOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

searchEl.addEventListener("input", render);

clearAllEl.addEventListener("click", async () => {
  if (sentences.length === 0) return;
  const ok = await askConfirm(`Delete all ${sentences.length} sentences?`);
  if (!ok) return;
  hideToast();
  sentences = [];
  await save();
  render();
  toast("All cleared");
});

// 팝업이 열려 있는 동안 다른 곳에서 저장하면 바로 반영한다.
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes[STORAGE_KEY]) load();
});

// 상단 버전 표시는 manifest.json의 version을 그대로 보여 준다
document.getElementById("version").textContent = "v" + chrome.runtime.getManifest().version;

loadTheme();
load();
