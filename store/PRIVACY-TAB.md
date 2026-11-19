# Sentence Jar · 개인정보 보호 탭 (Privacy practices)

Chrome 웹 스토어 개발자 대시보드의 **개인정보 보호** 탭에 들어갈 내용입니다.
대시보드 입력란은 **영어** 로 채우고, 한국어는 이해를 돕기 위한 번역입니다.

---

## 1. 전용 목적 (Single purpose)

확장 프로그램은 좁고 이해하기 쉬운 **한 가지 목적** 만 가져야 합니다. Sentence Jar 의 목적은 "고른 문장을 모아 두고 다시 보기" 하나입니다.

**English (대시보드 입력)**
```
Sentence Jar lets users save text they select on a web page and later search, copy and manage those saved sentences in a popup. It does nothing else: it does not read pages on its own, change web pages, or track browsing.
```

**한국어**
```
Sentence Jar 는 사용자가 웹페이지에서 직접 선택한 문장을 저장하고, 나중에 팝업에서 검색·복사·관리할 수 있게 합니다. 그 밖의 일은 하지 않습니다. 페이지를 스스로 읽거나, 웹페이지를 바꾸거나, 방문 기록을 추적하지 않습니다.
```

모든 기능이 이 목적 하나에 속합니다.

| 기능 | 목적과의 관계 |
|---|---|
| 우클릭 메뉴로 저장 | 문장을 모으는 방법 |
| OK / Dup / ! 배지 | 저장 결과를 알려 줌 |
| 검색, 복사, 원래 페이지 열기 | 모은 문장을 다시 보기 |
| 지우기, 되돌리기, 모두 지우기 | 모은 문장 관리 |
| 라이트 / 다크 모드 | 팝업을 보기 편하게 |

---

## 2. 권한 요청 이유 (Permission justification)

`manifest.json` 이 요청하는 권한은 **두 개뿐** 입니다. 대시보드에는 권한마다 입력란이 따로 나옵니다.

### 2-1. `contextMenus`

**English (대시보드 입력)**
```
Used to add one item, "Save to Sentence Jar", to the right-click menu. The item appears only when the user has selected text on a page. Clicking it is the only way a sentence is saved, so the extension never saves anything the user did not choose.
```

**한국어**
```
우클릭 메뉴에 "Sentence Jar에 저장" 항목 하나를 추가하는 데 씁니다. 이 항목은 사용자가 페이지에서 글자를 선택했을 때만 보입니다. 이 항목을 눌러야만 문장이 저장되므로, 사용자가 고르지 않은 내용은 저장하지 않습니다.
```

### 2-2. `storage`

**English (대시보드 입력)**
```
Used to keep the user's saved sentences on their own device with chrome.storage.local. Each saved item holds the selected text, the URL and title of the page it came from, and the date it was saved. The user's light/dark theme choice is stored the same way. Nothing is sent off the device, and the user can delete any item or all items from the popup.
```

**한국어**
```
사용자가 저장한 문장을 chrome.storage.local 로 사용자의 기기 안에 보관하는 데 씁니다. 저장 항목마다 선택한 문장, 그 문장이 있던 페이지의 주소(URL)와 제목, 저장한 날짜가 들어 있습니다. 라이트 / 다크 모드 선택도 같은 방법으로 저장합니다. 기기 밖으로는 아무것도 보내지 않으며, 사용자는 팝업에서 하나씩 또는 전부 지울 수 있습니다.
```

### 2-3. 요청하지 않는 권한

아래는 쓰지 않으므로 입력란이 나오지 않습니다. 심사에서 "최소 권한" 을 보는데, 이 점이 유리합니다.

| 권한 | 안 쓰는 이유 |
|---|---|
| `tabs`, `activeTab` | 탭 정보는 우클릭 메뉴가 넘겨주는 값(`pageUrl`, 탭 제목)으로 충분 |
| `host_permissions`, 콘텐츠 스크립트 | 페이지 안을 읽거나 바꾸지 않음 |
| `history`, `bookmarks` | 방문 기록·북마크에 접근하지 않음 |
| 외부 서버 접속 | 서버가 없음 |

---

## 3. 원격 코드 (Remote code)

**English (대시보드 선택)**
```
No, I am not using remote code.
```

**한국어:** 아니요. 모든 코드(`background.js`, `popup.js`)가 업로드하는 ZIP 안에 있고, 바깥에서 스크립트를 불러오거나 `eval` 을 쓰지 않습니다.

---

## 4. 사용자 데이터 사용 (Data usage)

### 4-1. 어떤 데이터를 다루나요?

기기 안에만 저장하더라도 **다루는(handle) 데이터는 모두 공개** 해야 합니다.

| 대시보드 항목 | 한국어 | 체크 | 이유 |
|---|---|---|---|
| Personally identifiable information | 개인 식별 정보 (이름, 주소, 이메일 등) | ☐ | 다루지 않음 |
| Health information | 건강 정보 | ☐ | 다루지 않음 |
| Financial and payment information | 금융·결제 정보 | ☐ | 다루지 않음 |
| Authentication information | 인증 정보 (비밀번호 등) | ☐ | 다루지 않음 |
| Personal communications | 개인 통신 (이메일, 메시지) | ☐ | 다루지 않음 |
| Location | 위치 | ☐ | 다루지 않음 |
| Web history | 웹 기록 | **☑** | 문장이 있던 페이지 주소(URL)를 함께 저장 |
| User activity | 사용자 활동 (클릭, 키 입력 기록 등) | ☐ | 다루지 않음 |
| Website content | 웹사이트 콘텐츠 | **☑** | 사용자가 고른 문장과 페이지 제목을 저장 |

> 웹 기록은 사용자가 저장한 문장의 출처 주소만 남기므로 해석이 갈릴 수 있습니다. 적게 공개해서 반려되는 것보다 넉넉히 공개하는 편이 안전해서 체크했습니다.

### 4-2. 데이터를 어떻게 다루나요?

| 질문 | 답 (English) | 답 (한국어) |
|---|---|---|
| 어디에 저장하나요? | On the user's device only (`chrome.storage.local`) | 사용자의 기기 안에만 |
| 누구에게 보내나요? | No one. No server, no third party. | 아무에게도 보내지 않음. 서버와 제3자 없음 |
| 무엇에 쓰나요? | Only to show the saved sentences back to the user | 저장한 문장을 사용자에게 다시 보여 주는 데만 |
| 광고나 분석에 쓰나요? | No | 아니요 |
| 사람이 데이터를 보나요? | No | 아니요 |
| 어떻게 지우나요? | Delete in the popup, or remove the extension | 팝업에서 지우거나, 확장 프로그램을 삭제 |

### 4-3. 확인 항목 (Certifications) · 세 개 모두 체크

| English (대시보드 문구) | 한국어 |
|---|---|
| ☑ I do not sell or transfer user data to third parties, outside of the approved use cases | 승인된 용도 외에 사용자 데이터를 제3자에게 팔거나 넘기지 않습니다 |
| ☑ I do not use or transfer user data for purposes that are unrelated to my item's single purpose | 단일 목적과 관계없는 용도로 사용자 데이터를 쓰거나 넘기지 않습니다 |
| ☑ I do not use or transfer user data to determine creditworthiness or for lending purposes | 신용 평가나 대출 목적으로 사용자 데이터를 쓰거나 넘기지 않습니다 |

---

## 5. 개인정보처리방침 URL (Privacy policy)

사용자 데이터를 다루므로 **필수** 입니다. 4장의 공개 내용과 방침 내용이 같아야 합니다.

```
https://github.com/yourrhdiddl/sentence-jar/blob/main/PRIVACY.md
```

방침 문서(`PRIVACY.md`)에는 영어와 한국어로 다음을 담았습니다: 다루는 정보, 저장 위치, 보내지 않음·팔지 않음, 지우는 방법, 권한 설명, 변경 안내, 문의처.
