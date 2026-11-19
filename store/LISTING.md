# Sentence Jar · Chrome 웹 스토어 등록 정보

개발자 대시보드(https://chrome.google.com/webstore/devconsole)의 탭 순서대로 정리했습니다.
대시보드에 그대로 붙여 넣을 값은 코드 블록에 넣었고, **영어(기본)** 와 **한국어** 를 함께 적었습니다.

> 이 `store/` 폴더는 등록용 자료입니다. 확장 프로그램 ZIP 을 만들 때는 **빼고** 압축하세요.

---

## 0. 제출 전 체크리스트

| # | 항목 | 상태 |
|---|---|---|
| 1 | 개발자 계정 등록비(1회) 결제, 개발자 약관 동의 | ☐ 직접 |
| 2 | 계정 설정에서 연락처 이메일 인증 | ☐ 직접 |
| 3 | 판매자(Trader) / 비판매자(Non-Trader) 선언 | ☐ 직접 |
| 4 | ZIP 파일 업로드 (`store/` 제외, `manifest.json` 이 ZIP 맨 위) | ☐ 직접 |
| 5 | 스토어 등록정보: 설명, 카테고리, 언어, 아이콘, 스크린샷 | ✅ 아래 1장 |
| 6 | 한국어 등록정보 (설명, 스크린샷) | ✅ 아래 1장 |
| 7 | 개인정보 보호: 전용 목적, 권한 요청 이유, 원격 코드, 데이터 사용, 방침 URL | ✅ PRIVACY-TAB.md |
| 8 | 배포: 공개 범위, 지역 | ✅ 아래 3장 |
| 9 | 정책 위반 요소 점검 | ✅ 아래 4장 |

---

## 1. 스토어 등록정보 (Store listing)

### 1-1. 이름 (Name)

`manifest.json` 의 `name` 에서 가져옵니다. 지금은 `_locales/*/messages.json` 의 `appName` 입니다.

| 언어 | 값 |
|---|---|
| English | `Sentence Jar` |
| 한국어 | `Sentence Jar` |

- 브랜드 이름이라 두 언어 모두 같게 둡니다.
- 이름을 정할 때 웹과 스토어에서 같은 이름이 있는지 검색했고 찾지 못했습니다. ("My Sentences" 는 기능까지 비슷한 "Sentences For Me" 가 이미 있어서 바꿨습니다.) **제출 직전에 스토어에서 한 번 더 검색하세요.**

### 1-2. 짧은 설명 (Summary · 132자 이내, 서식 없이 글자만)

`manifest.json` 의 `description` 에서 가져옵니다. 지금은 `_locales/*/messages.json` 의 `appDesc` 입니다. 대시보드에서는 고칠 수 없으니 바꾸려면 파일을 고쳐 다시 올립니다.

| 언어 | 값 | 길이 |
|---|---|---|
| English | `Save sentences you love from any web page with one right-click.` | 63자 |
| 한국어 | `웹페이지에서 마음에 드는 문장을 우클릭 한 번으로 모아 두세요. 검색, 복사, 되돌리기까지 이 기기 안에서.` | 60자 |

### 1-3. 자세한 설명 (Description)

첫 문장에서 무엇을 하는지 바로 말하고, 기능 목록을 짧게 붙였습니다. "최고", "1위" 같은 과장 표현과 키워드 나열은 넣지 않았습니다.

**English**
```
Sentence Jar saves the sentences you want to keep from any web page. Select text, right-click, and choose "Save to Sentence Jar". That's it.

It is a quiet place for the lines that stop you while you read: a sentence from an essay, a quote in an article, a thought in a blog post.

WHAT YOU CAN DO
• Save selected text from the right-click menu
• See the result on the toolbar icon: OK when saved, Dup when you already have it, ! if saving failed
• Search your collection, with matching words highlighted as you type
• Copy a sentence with one click, or open the page it came from
• Deleted one by mistake? Press Undo within 5 seconds
• Clear everything at once, with a confirm step first
• Light and dark mode

PRIVATE BY DESIGN
Your sentences, with the page address and title they came from, are stored only on this device. Nothing is sent to any server. No accounts, ads or trackers.
Privacy policy: https://github.com/yourrhdiddl/sentence-jar/blob/main/PRIVACY.md

TIP
Pin Sentence Jar to the toolbar (puzzle icon → pin) to see the OK badge after each save.

Questions or feedback: yourrhdiddl@gmail.com
```

**한국어**
```
Sentence Jar 는 웹페이지에서 간직하고 싶은 문장을 모아 두는 확장 프로그램입니다. 글자를 드래그하고, 우클릭해서 "Sentence Jar에 저장"을 누르면 끝입니다.

에세이의 한 줄, 기사 속 인용문, 블로그의 한 생각처럼 읽다가 마음이 멈춘 문장을 조용히 모아 두는 공간입니다.

할 수 있는 일
• 선택한 문장을 우클릭 메뉴로 저장
• 툴바 아이콘 배지로 결과 확인: OK 저장됨, Dup 이미 있음, ! 저장 실패
• 모은 문장 검색, 입력하는 단어가 바로 강조됩니다
• 클릭 한 번으로 복사, 원래 페이지로 이동
• 실수로 지웠다면 5초 안에 Undo 로 되돌리기
• 모두 지우기 전에 확인 창
• 라이트 / 다크 모드

개인정보 보호
문장과 그 문장이 있던 페이지 주소, 제목은 이 기기에만 저장됩니다. 어떤 서버로도 보내지 않습니다. 회원가입, 광고, 추적 기능이 없습니다.
개인정보처리방침: https://github.com/yourrhdiddl/sentence-jar/blob/main/PRIVACY.md

팁
툴바의 퍼즐 아이콘에서 Sentence Jar 를 고정하면 저장할 때마다 OK 배지를 볼 수 있습니다.

문의와 의견: yourrhdiddl@gmail.com
```

> 팝업 화면의 글자는 영어로만 되어 있습니다. 한국어 사용자는 이름, 짧은 설명, 우클릭 메뉴("Sentence Jar에 저장")만 한국어로 보게 됩니다.

### 1-4. 카테고리와 언어

| 항목 | 값 |
|---|---|
| 카테고리 (Category) | `Productivity` / 생산성 |
| 기본 언어 (Language) | `English` (`manifest.json` 의 `default_locale: "en"`) |
| 추가 언어 | `한국어` (`_locales/ko`) |

### 1-5. 이미지

| 항목 | 파일 | 크기 · 형식 | 필수 | 언어별 |
|---|---|---|---|---|
| 스토어 아이콘 | `../icons/icon128.png` | 128×128 PNG, 그림 96×96 + 투명 여백 16px | **필수** | 공통 |
| 스크린샷 (영어) | `en/screenshot-1-save.png` 외 2장 | 1280×800 PNG, 둥근 모서리·여백 없이 꽉 채움 | **최소 1장** (최대 5장) | 영어 |
| 스크린샷 (한국어) | `ko/screenshot-1-save.png` 외 2장 | 1280×800 PNG | 선택 | 한국어 |
| 작은 프로모션 타일 | `promo-small-440x280.png` | 440×280 PNG | 선택 (검색·카테고리에 보여서 권장) | 공통만 가능 |
| 마키 프로모션 타일 | 없음 | 1400×560 | 선택 (홈 배너에 뽑힐 때만 사용) | 공통만 가능 |
| 소개 영상 | 없음 | YouTube 링크 | 선택 | 언어별 가능 |
| 로고 원본 | `logo.svg` | 벡터 | 수정용, 업로드 안 함 | - |

스크린샷 순서와 내용:

| # | 영어 제목 | 한국어 제목 | 보여 주는 것 |
|---|---|---|---|
| 1 | Save a sentence with one right-click | 우클릭 한 번으로 문장 저장 | 드래그 → 우클릭 메뉴 → OK 배지 |
| 2 | Find any saved sentence again | 모아 둔 문장을 바로 다시 찾기 | 검색어 강조 (다크 모드) |
| 3 | Light or dark, and mistakes undone | 라이트·다크 모드, 실수는 되돌리기 | 라이트 모드, Undo 메시지 |

- 스크린샷의 팝업은 지금 버전(v1.0.0)의 실제 `popup.html` 을 예시 문장으로 찍은 것입니다. 화면을 바꾸면 스크린샷도 다시 찍어야 합니다.
- 한국어 스크린샷은 대시보드 위쪽 언어 선택에서 **한국어** 를 고른 뒤 "Localized screenshots" 에 올립니다.

### 1-6. 추가 항목

| 항목 | 값 | 필수 |
|---|---|---|
| 공식 URL (Official URL) | 비워 둠 (Search Console 에서 인증한 사이트만 고를 수 있음) | 선택 |
| 홈페이지 URL | `https://github.com/yourrhdiddl/sentence-jar` | 선택 |
| 지원 URL | `https://github.com/yourrhdiddl/sentence-jar/issues` | 선택 |
| 성인용 콘텐츠 (Mature content) | 끔 / Off | - |

---

## 2. 개인정보 보호 (Privacy practices)

입력할 내용 전체(영어·한국어)는 **[PRIVACY-TAB.md](PRIVACY-TAB.md)** 에 따로 정리했습니다. 요약:

| 항목 | 요약 |
|---|---|
| 전용 목적 | 선택한 문장을 저장하고 팝업에서 검색·복사·관리 |
| 권한 요청 이유 | `contextMenus`: 문장을 고르면 우클릭 메뉴에 저장 항목 추가 · `storage`: 문장과 테마를 기기 안에만 보관 |
| 원격 코드 | 없음 (No, I am not using remote code) |
| 사용자 데이터 | 웹사이트 콘텐츠, 웹 기록 체크 · 확인 항목 3개 모두 체크 |
| 개인정보처리방침 | https://github.com/yourrhdiddl/sentence-jar/blob/main/PRIVACY.md |

---

## 3. 배포 (Distribution)

| 항목 | 값 |
|---|---|
| 가격 | 무료 / Free |
| 공개 범위 (Visibility) | `Public` (공개). 먼저 시험해 보려면 `Unlisted` (링크가 있는 사람만) |
| 지역 (Regions) | `All regions` (모든 지역) |

---

## 4. 계정과 정책 점검

### 4-1. 계정 (제출하는 사람이 직접)

- **등록비:** 처음 한 번 결제하고 개발자 약관에 동의합니다.
- **개발자 이메일:** 나중에 바꿀 수 없으니 자주 보는 주소로 정합니다.
- **연락처 이메일 인증:** 계정 설정에서 인증해야 제출할 수 있습니다.
- **판매자 선언 (EU 규정):** 모든 개발자가 Trader / Non-Trader 를 선언해야 합니다. 돈을 받지 않는 개인 프로젝트라면 보통 **Non-Trader** 입니다. Trader 로 선언하면 이름, 전화번호, 주소가 스토어에 공개됩니다.

### 4-2. 정책 위반이 없는지 확인

| 정책 | 확인 |
|---|---|
| 단일 목적 | ✅ 문장 저장과 관리 하나뿐 |
| 최소 권한 | ✅ `contextMenus`, `storage` 두 개만 |
| 원격 코드 금지 (MV3) | ✅ 없음 |
| 키워드 스팸 | ✅ 설명에 키워드 나열 없음 |
| 오해를 부르는 표현 | ✅ "최고", "1위", "Editor's Choice" 같은 표현 없음 |
| 스크린샷이 실제 화면과 같음 | ✅ v1.0.0 실제 팝업으로 촬영 |
| 다른 상표·이름 사칭 | ✅ 겹치는 이름 없음 (제출 전 재확인) |
| 데이터 공개와 방침 일치 | ✅ PRIVACY-TAB.md 4장 체크 항목과 `PRIVACY.md` 내용이 같음 |
| 시험판 표시 | 해당 없음 (시험판을 따로 올릴 때만 이름 끝에 `BETA` 표시) |

### 4-3. ZIP 만들기

ZIP 맨 위에 `manifest.json` 이 오도록, 아래 파일과 폴더만 넣습니다.

```
manifest.json, background.js, popup.html, popup.js, icons/, _locales/
```

`store/`, `README.md`, `PRIVACY.md` 는 넣지 않아도 됩니다.
