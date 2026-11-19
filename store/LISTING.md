# Chrome 웹 스토어 등록 정보

> 이 `store/` 폴더는 스토어 등록용 자료입니다. 확장 프로그램 ZIP 을 만들 때는 **빼고** 압축하세요.

## 1. 앱 이름

```
My Sentences
```

`manifest.json` 의 `name` 과 같아야 합니다 (최대 75자).

## 2. 설명 문구

### 짧은 설명 (Summary, 132자 이내)

`manifest.json` 의 `description` 이 그대로 스토어 요약으로 쓰입니다.

```
Save sentences you love from any web page with one right-click.
```

### 자세한 설명 (Description) — 영어

```
Found a line worth keeping? Select it, right-click, and choose "Save to My Sentences". That's it.

My Sentences is a quiet place for the sentences that stop you while you read: a line from an essay, a quote in an article, a thought in a blog post.

WHAT YOU CAN DO
• Save any selected text from the right-click menu
• See the result on the toolbar icon: OK when saved, Dup when you already have it, ! if saving failed
• Search your collection — matching words are highlighted as you type
• Copy a sentence with one click, or open the page it came from
• Delete by mistake? Press Undo within 5 seconds
• Clear everything at once, with a confirm step first
• Light and dark mode

PRIVATE BY DESIGN
Your sentences are stored only on this device (chrome.storage.local). Nothing is sent to any server, and there are no accounts, ads or trackers.

TIP
Pin My Sentences to the toolbar (puzzle icon → pin) so you can see the OK badge after each save.

Contact: yourrhdiddl@gmail.com
```

### 자세한 설명 — 한국어 (한국어 등록 정보를 따로 추가할 때)

```
간직하고 싶은 문장을 찾았나요? 드래그하고, 우클릭해서 "Save to My Sentences"를 누르면 끝입니다.

My Sentences는 글을 읽다가 마음에 멈춘 문장을 모아 두는 조용한 공간입니다.

할 수 있는 일
• 웹페이지에서 고른 문장을 우클릭 메뉴로 저장
• 아이콘 배지로 결과 확인: OK 저장됨, Dup 이미 있음, ! 저장 실패
• 모은 문장 검색 — 입력하는 단어가 바로 강조됩니다
• 클릭 한 번으로 복사, 원래 페이지로 이동
• 실수로 지웠다면 5초 안에 Undo 로 되돌리기
• 모두 지우기 전에 확인 창
• 라이트 / 다크 모드

개인정보 보호
문장은 이 기기에만 저장되며(chrome.storage.local) 어떤 서버로도 보내지 않습니다. 회원가입, 광고, 추적 기능이 없습니다.

팁
툴바의 퍼즐 아이콘에서 My Sentences 를 고정하면 저장할 때마다 OK 배지를 볼 수 있습니다.

문의: yourrhdiddl@gmail.com
```

## 3. 이미지 자료

| 항목 | 파일 | 크기 | 필수 |
|---|---|---|---|
| 스토어 아이콘 | `../icons/icon128.png` | 128×128 PNG (그림 96×96 + 여백 16px) | 필수 |
| 스크린샷 1 · 저장 | `screenshot-1-save.png` | 1280×800 | 최소 1장 (최대 5장) |
| 스크린샷 2 · 검색 | `screenshot-2-search.png` | 1280×800 | |
| 스크린샷 3 · 테마와 되돌리기 | `screenshot-3-theme-undo.png` | 1280×800 | |
| 작은 프로모션 타일 | `promo-small-440x280.png` | 440×280 | 필수 |
| 로고 원본 | `logo.svg` | 벡터 | 수정용 |

- 스크린샷은 **1280×800** 또는 **640×400** 만 받습니다. 여기 자료는 모두 1280×800 입니다.
- 화면 글자가 영어라서 영어 스크린샷 한 벌만 준비했습니다. 한국어 등록 정보를 따로 만들면 같은 이미지를 써도 됩니다.

## 4. 개인정보 탭에 쓸 내용

**단일 목적 (Single purpose)**
```
Save text the user selects on a web page and let them search, copy and manage those saved sentences.
```

**권한 사용 이유**

| 권한 | 이유 |
|---|---|
| `contextMenus` | Adds the "Save to My Sentences" item to the right-click menu when text is selected. |
| `storage` | Keeps the saved sentences and the light/dark choice on the user's device. |

**원격 코드 사용:** 아니요 (No, I am not using remote code)

**데이터 수집:** 아무 항목도 체크하지 않음. 데이터는 기기 밖으로 나가지 않습니다.

**개인정보처리방침 URL:** 사용자 데이터를 수집하지 않으면 필수는 아니지만, 요청받으면 GitHub 레포의 README 주소를 쓸 수 있습니다.

## 5. 기타

- **카테고리:** Productivity (생산성)
- **언어:** English (기본), 한국어 추가 가능
