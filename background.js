// Sentence Jar - 백그라운드 서비스 워커
// 오른쪽 클릭 메뉴를 만들고, 고른 문장을 chrome.storage.local 에 저장한다.

const MENU_ID = "save-sentence";
const STORAGE_KEY = "sentences";

// 확장 프로그램을 설치하거나 업데이트할 때 오른쪽 클릭 메뉴를 만든다.
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: MENU_ID,
      title: chrome.i18n.getMessage("menuSave"), // 크롬 언어에 맞춰 _locales 에서 가져온다
      contexts: ["selection"] // 글자를 드래그했을 때만 메뉴가 보인다
    });
  });
});

// 메뉴를 눌렀을 때 문장을 저장한다.
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== MENU_ID) return;

  const text = (info.selectionText || "").trim();
  if (!text) return;

  const sentence = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    text,
    url: info.pageUrl || "",
    title: (tab && tab.title) || "",
    savedAt: new Date().toISOString()
  };

  try {
    const data = await chrome.storage.local.get(STORAGE_KEY);
    const list = Array.isArray(data[STORAGE_KEY]) ? data[STORAGE_KEY] : [];

    // 같은 페이지에서 같은 문장을 또 저장하면 겹치지 않게 건너뛴다.
    const exists = list.some((s) => s.text === text && s.url === sentence.url);
    if (!exists) {
      list.unshift(sentence); // 최신 문장이 맨 위
      await chrome.storage.local.set({ [STORAGE_KEY]: list });
    }

    showBadge(exists ? "Dup" : "OK", exists ? "#8e8aa8" : "#7c5cff");
  } catch (err) {
    // 저장 공간이 꽉 찼거나 저장에 실패하면, 조용히 넘어가지 않고 아이콘에 "!"를 띄운다.
    console.error("Sentence Jar: save failed", err);
    showBadge("!", "#e11d48", 3000);
  }
});

// 아이콘 위에 잠깐 글자를 띄워 저장됐음을 알려 준다 (추가 권한 필요 없음).
function showBadge(label, color, ms = 1500) {
  chrome.action.setBadgeBackgroundColor({ color });
  chrome.action.setBadgeText({ text: label });
  setTimeout(() => chrome.action.setBadgeText({ text: "" }), ms);
}
