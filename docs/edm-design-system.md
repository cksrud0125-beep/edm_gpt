# ed:m 유학센터 Design System

> 이 파일은 Claude에게 전달하는 구현 지침서입니다.
> 컴포넌트 제작 시 항상 이 파일을 참조해주세요.

---

## 0. 브랜드 개요

- **브랜드명**: ed:m 유학센터 (edmuak) / ed:m 아트유학 (art) / 이디엠에듀케이션 (edmedu) / Taiwan
- **폰트**: Pretendard (UI 전반) + Pretendard Bold (헤드라인)
- **주요 색상**: 브랜드 그린 `#1EC95B`, 포인트 레드 `#FC1D01`, 포인트 블루 `#006BC8`
- **캔버스**: 항상 흰 배경. 섹션 밴드만 `#F5F5F7`
- **무드**: 크리스프하고 신뢰감 있는 톤. 이모지·일러스트 없음.

---

## 1. 컬러 토큰

### Primary / Green
| 토큰 | 값 |
|---|---|
| green/50 | #ECFBF2 |
| green/100 | #D2F4DE |
| green/200 | #A5E9BD |
| green/300 | #78DF9D |
| green/400 | #4BD47C |
| green/500 | **#1EC95B** ← Base (Primary 버튼, 브랜드 포인트) |
| green/600 | #18A149 |
| green/700 | #127937 |
| green/800 | #0C5024 |

### Point / Red
| 토큰 | 값 |
|---|---|
| red/500 | **#FC1D01** ← Base (에러, 경고, 포인트) |
| red/600 | #CA1701 |

### Blue
| 토큰 | 값 |
|---|---|
| blue/500 | #0086FA |
| blue/600 | **#006BC8** ← 링크, 정보성 UI |

### Neutrals
| 토큰 | 값 | 용도 |
|---|---|---|
| neutral/50 | #F5F5F7 | 페이지 배경 |
| neutral/100 | #E2E2E5 | 컨트롤러 버튼 bg |
| neutral/200 | #CCCCCC | 보더 기본 |
| neutral/300 | #C5C5C5 | Hover bg (페이지네이션 등) |
| neutral/400 | #999999 | text/04 (placeholder) |
| neutral/500 | #666666 | text/03 (보조 텍스트) |
| neutral/600 | #333333 | text/02 (본문) |
| neutral/black | #000000 | text/01 (제목, 강조) |

### 시맨틱 토큰
| 토큰 | 값 |
|---|---|
| color/brand/primary | #1EC95B |
| color/brand/point | #FC1D01 |
| color/bg/default | #F5F5F7 |
| color/bg/green | #F8FAEC |
| color/bg/blue | #EAFAFF |
| color/link/default | #006BC8 |
| color/border/default | #DADADA |
| color/border/light | #E4E8F1 |
| text/01 | #000000 |
| text/02 | #333333 |
| text/03 | #666666 |
| text/04 | #999999 |

### 그라디언트
- Red: `#FC1D01 → #FDA245`
- Green: `#1EC95B → #01D29C`

---

## 2. 타이포그라피

- **기본 폰트**: Pretendard
- **헤드라인**: Pretendard Bold
- **단위**: px (PC 기준), Mobile은 별도 사이즈
- **Letter-spacing**: PC -2% → `-0.02em`, Mobile -1% → `-0.01em`

| 스타일 | PC | Mobile | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| Display | 54px | 28px | 700 Bold | 130% | -2% |
| H1 / Bold | 40px | 25px | 700 | 130% | -2% |
| H2 / Bold | 32px | 22px | 700 | 130% | -2% |
| H2 / SemiBold | 32px | 22px | 600 | 130% | -2% |
| H2 / Regular | 32px | 22px | 400 | 130% | -2% |
| H3 / Bold | 26px | 20px | 700 | 150% | -1% |
| H3 / SemiBold | 26px | 20px | 600 | 150% | -1% |
| H4 / Bold | 22px | 18px | 700 | 150% | -1% |
| H4 / Regular | 22px | 18px | 400 | 150% | -1% |
| H5 / Bold | 20px | 16px | 700 | 150% | -1% |
| H5 / Regular | 20px | 16px | 400 | 150% | -1% |
| Body1 / Bold | 18px | 15px | 700 | 150% | -1% |
| Body1 / Regular | 18px | 15px | 400 | 150% | -1% |
| Body2 / SemiBold | 16px | 14px | 600 | 150% | -1% |
| Body2 / Regular | 16px | 14px | 400 | 150% | -1% |
| Detail | 14px | 13px | 400 Regular | 150% | -1% |

---

## 3. 그리드

| 브레이크포인트 | 화면 너비 | 컨텐츠 너비 | Columns | Gutter | Margin |
|---|---|---|---|---|---|
| Desktop Main | 1920px | 1680px | 12 | 24px | 120px |
| Desktop Sub | 1920px | 1248px | 12 | 24px | 336px |
| Tablet | 768px | 688px | 8 | 16px | 40px |
| Mobile | 360px | 328px | 6 | 8px | 16px |

### 반응형 구현 방식 — CSS Grid fr 단위 사용

컬럼 수가 고정(6/8/12)되어 있으므로 **Flexbox가 아닌 CSS Grid + `1fr`** 을 사용한다.
`fr`은 가용 공간을 N등분하므로 360px 미만/초과 기기에서도 컬럼 수를 유지하며 자동으로 너비가 조정된다.

```css
/* Mobile (기준 360px, padding 16px, 6 columns, gap 8px) */
.grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  padding: 0 16px;
  /* → 320px 기기: 컬럼 약 41px / 390px 기기: 컬럼 약 52px — 자동 대응 */
}

/* Tablet (기준 768px, padding 40px, 8 columns, gap 16px) */
.grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 16px;
  padding: 0 40px;
}

/* Desktop (기준 1920px, max-width 1680px, padding 120px, 12 columns, gap 24px) */
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
  max-width: 1680px;
  margin: 0 auto;
  padding: 0 120px;
}
```

**컬럼 스팬 예시 (Mobile 6col 기준)**
| 용도 | span |
|---|---|
| 전체 너비 | col-span-6 |
| 절반 | col-span-3 |
| 1/3 | col-span-2 |
| 2/3 | col-span-4 |

> ⚠️ Flexbox를 쓰면 `flex-wrap` 개입 시 컬럼 수 유지가 어렵고
> 의도치 않은 줄바꿈이 발생할 수 있으므로 Grid를 우선한다.

---

## 4. Spacing 토큰

4pt 기반 스케일. 이 토큰 외의 임의 값(예: 15px, 22px, 36px)은 사용하지 않는다.

### 기본 스케일
| 토큰 | 값 | 주요 용도 |
|---|---|---|
| space/1 | 4px | 아이콘↔텍스트, 뱃지 내부 |
| space/2 | 8px | 칩 내부 gap, 버튼 아이콘 gap, Mobile 그리드 gutter |
| space/3 | 12px | Input-set Label↔Input (PC), 버튼 그룹 gap |
| space/4 | 16px | 카드 텍스트 padding (Mobile), 그리드 gutter (Tablet), 페이지 좌우 padding (Mobile) |
| space/5 | 20px | 버튼 padding (Small), 유틸리티 아이콘 gap |
| space/6 | 24px | 카드 텍스트 padding (PC), 그리드 gutter (Desktop), Modal padding (Mobile) |
| space/7 | 28px | — |
| space/8 | 32px | — |
| space/9 | 36px | Table Mobile min-height |
| space/10 | 40px | 페이지 좌우 padding (Tablet), Footer 링크 gap, 섹션 내 콘텐츠 gap |
| space/15 | 60px | 컨텐츠↔Pagination 간격 (PC), 섹션 간 최소 간격 |
| space/20 | 80px | 섹션 간 간격 (중간) |
| space/25 | 100px | Footer 상단↔하단 gap |
| space/30 | 120px | 페이지 좌우 padding (Desktop), Header/Footer side padding |

### 용도별 간격 가이드

#### 컴포넌트 내부 간격
| 상황 | 값 |
|---|---|
| 아이콘 ↔ 텍스트 (버튼, 라벨) | 4px |
| 버튼 그룹 내 버튼 사이 | 8px (Mobile) / 12px (PC) |
| Input Label ↔ Input | 12px (PC) / 8px (Mobile) |
| Input ↔ Message | 8px (PC) / 4px (Mobile) |
| SNS 아이콘 사이 | 4px (Mobile) / 12px (PC) |
| Nav 항목 사이 | 40px |

#### 카드 & 리스트 간격
| 상황 | 값 |
|---|---|
| 카드 내부 텍스트 padding | 24px (PC) / 16px (Mobile) |
| 카드 내부 타이틀 ↔ 내용 gap | 12px |
| 카드 ↔ 카드 (그리드 gutter) | 24px (PC) / 8px (Mobile) |
| 리스트 아이템 구분선 | 1px solid #E4E8F1 |

#### 섹션 간 간격
| 상황 | 값 |
|---|---|
| 섹션 ↔ 섹션 (최소) | 60px |
| 섹션 ↔ 섹션 (중간) | 80px |
| 섹션 ↔ 섹션 (최대 / 랜딩 히어로) | 140px (PC) / 100px (Mobile) |
| 컨텐츠 ↔ Pagination | 60px (PC) / 40px (Mobile) |
| Footer 상단 ↔ 하단 블록 | 100px |

#### 페이지 레이아웃 padding
| 상황 | 값 |
|---|---|
| Desktop 좌우 padding | 120px |
| Tablet 좌우 padding | 40px |
| Mobile 좌우 padding | 16px |
| Modal padding (PC) | 40px |
| Modal padding (Mobile) | 24px |
| Footer padding-bottom (Mobile) | 60px |

> ⚠️ **AI 구현 시 주의사항**
> - 섹션 간 gap은 반드시 위 토큰 값 중 하나를 사용할 것
> - 임의의 마진(예: 15px, 22px, 35px)은 사용 금지
> - 모바일 섹션 간격은 PC 대비 약 60~70% 수준으로 축소 적용

---

## 5. Border Radius

| 토큰 | 값 | 용도 |
|---|---|---|
| radius/4 | 4px | Badge |
| radius/8 | 8px | 버튼, 인풋, 칩, 드롭다운 |
| radius/12 | 12px | 카드, 모달, 배너 |
| radius/24 | 24px | 피처 카드 |
| radius/full | 9999px | Pill, 아바타, 토글 |

---

## 6. Shadow

```css
/* Neutral */
--shadow-neutral-01: 0px 4px 10px 0px rgba(0, 0, 0, 0.04);
--shadow-neutral-02: 0px 8px 20px 0px rgba(0, 0, 0, 0.06);
--shadow-neutral-03: 0px 16px 40px 0px rgba(0, 0, 0, 0.08);

/* Blue */
--shadow-blue-01: 0px 4px 10px 0px #EBEFF4;
--shadow-blue-02: 0px 8px 20px 0px #EBEFF4;
--shadow-blue-03: 0px 16px 40px 0px #EBEFF4;
```

> **Shadow 사용 규칙**
> - 박스 border 색상이 `#E4E8F1 (color/border/light)` 인 경우 → **Blue 쉐도우** 사용
> - 그 외 일반 컨테이너 → **Neutral 쉐도우** 사용
>
> **Blue 쉐도우 단계 기준**
> | 컴포넌트 | 쉐도우 단계 | 이유 |
> |---|---|---|
> | Card | `shadow-blue-01` | 리스트에 여러 개 나열, 가볍게 |
> | Info Box | `shadow-blue-01` ~ `shadow-blue-02` | 텍스트 위주, 배경에 묻히지 않을 정도 |
> | Banner | `shadow-blue-02` | 섹션에 크게 배치, 중간 강도 |
> | CTA 블록 | `shadow-blue-03` | 버튼 포함 강조 박스, 시선 집중 필요 |

---

## 7. SVG 아이콘 공통 규칙

SVG 아이콘이 텍스트와 함께 쓰이는 모든 경우에 아래 규칙을 적용한다.

```css
/* 아이콘 + 텍스트 컨테이너 공통 */
.icon-text {
  display: inline-flex;
  align-items: center;
  gap: 4px; /* 기본 gap, 컴포넌트별 재정의 가능 */
}

/* SVG 공통 */
svg {
  flex-shrink: 0;       /* 텍스트가 길어도 아이콘 크기 유지 */
  display: block;       /* inline SVG의 baseline 틀어짐 방지 */
  pointer-events: none; /* 아이콘 클릭 이벤트 버블링 방지 */
}
```

| 사용처 | display | align-items | gap |
|---|---|---|---|
| 버튼 (아이콘+텍스트) | inline-flex | center | 4px |
| Nav 메뉴 (텍스트+External Link) | inline-flex | center | 2px |
| Header 검색바 | inline-flex | center | 12px |
| Input 라벨 (아이콘+텍스트) | inline-flex | center | 4px |
| Footer 고객문의 라벨 | inline-flex | center | 4px |
| Carousel 카운터 | inline-flex | center | 8px |
| Chip / Badge | inline-flex | center | 4px |

> ⚠️ **AI 구현 시 주의사항**
> - SVG를 `display: inline` 으로 두면 vertical-align 문제가 생기므로 반드시 `display: block` 또는 부모에 `inline-flex` 적용
> - 아이콘 크기는 `width` / `height` 속성으로 명시 — CSS `font-size`로 제어하지 않는다
> - `currentColor` 사용 시 부모 요소의 `color` 값이 SVG stroke/fill에 상속됨

---

## 8. 컴포넌트 스펙

### 8-1. Button

**Props**
- style: "Filled" | "Border" | "Borderless"
- color: "Primary" | "Secondary" | "Gray" | "White"
- size: "2X-small" | "X-small" | "Small" | "Medium" | "Large"
- shape: "Square" | "Round"
- state: "Default" | "Hover" | "Disabled"

**Size**
| Size | height | font | padding |
|---|---|---|---|
| 2X-small | 26px | 13px | 5px 12px |
| X-small  | 32px | 14px | 8px 16px |
| Small | 40px | 16px | 10px 20px |
| Medium | 48px | 16px | 16px 24px |
| Large | 56px | 16px | 20px 28px |

**Color / Filled**
| Color | bg | text |
|---|---|---|
| Primary | #1EC95B | white |
| Secondary | #000000 | white |
| Gray | #F5F5F7 | #333 |

**Color / Border**
| Color | border | text |
|---|---|---|
| Primary | #1EC95B | #1EC95B |
| Secondary | #000000 | #000 |
| Gray | #666666 | #666 |
| White | #FFFFFF | white |

- Shape: Square → `border-radius: 8px` (Small~Large) / `border-radius: 4px` (2X-small, X-small) / Round → `border-radius: 9999px`
- Font: Pretendard Medium 500, letter-spacing -0.16px
- Icon: 16px, gap 4px, beforeIcon(왼쪽) / afterIcon(오른쪽)
- 아이콘+텍스트 정렬: `display: inline-flex; align-items: center;` 필수
- SVG는 `flex-shrink: 0` 적용 — 텍스트가 길어도 아이콘 크기 유지

---

### 8-2. Input

**Size**
| Size | height | font | padding |
|---|---|---|---|
| Large | 56px | 18px | 14.5px 16px |
| Medium | 48px | 16px | 12px 16px |
| Small | 40px | 14px | 10px 16px |

**상태별 스타일**
| State | bg | border | text |
|---|---|---|---|
| Default | white | 1px #DADADA | #999 (placeholder) |
| Focused | white | 1.5px #1EC95B | #000 |
| Completed | white | 1px #DADADA | #000 |
| Disabled | #DADADA | 1px #DADADA | #999 |
| Error | white | 1.5px #FC1D01 | #000 |

- border-radius: 8px
- Input-set gap: Label↔Input 12px (PC) / 8px (Mobile), Input↔Message 8px (PC) / 4px (Mobile)
- Error 메시지: Pretendard Regular 14px, color #FC1D01

**Width (너비) 규격**
- 기본값: `width: 100%` — 부모 그리드 컬럼 너비에 맞춤
- height만 size 토큰으로 고정하고, 너비는 레이아웃 그리드에 위임한다
- 예외: Header 검색바처럼 고정 너비가 필요한 경우 별도 명시 (`width: auto`)
- Textarea도 동일하게 `width: 100%` 적용

**Textarea**
- border-radius: 8px
- padding: 16px, 우측 스크롤 영역 16px
- 글자수 카운터: 우측 하단, 현재 #000 / 최대 #666
- 상태별 border: Focused 1.5px #1EC95B / Error 1.5px #FC1D01

---

### 8-3. Dropdown & Search

**Size**
| Size | height | font | padding |
|---|---|---|---|
| Large | 56px | 18px | 8.5px 16px 8.5px 8px |
| Medium | 48px | 16px | 12px 16px 12px 8px |
| Small | 40px | 14px | 10px 16px 10px 8px |
| Double | 75px | 서브 14px / 옵션 16px | 6px 16px 6px 8px |

**상태별 스타일**
| State | border | text |
|---|---|---|
| Default | 1px #DADADA | #999 (placeholder) |
| Selected | 1px #DADADA | #000 |
| Active | 1.5px #1EC95B (top+sides) | #000 |

- Active 상태: 리스트 border 1.5px #1EC95B (left/right/bottom), border-radius 0 0 8px 8px
- 리스트 선택 항목: color #1EC95B / 기본: #666 / Hover: #000
- 화살표: Active 시 rotate(180deg)

**Dropdown Width (너비) 규격**
- 기본값: `width: 100%` — 부모 그리드 컬럼 너비에 맞춤
- Dropdown 리스트도 트리거 박스와 동일한 너비 (`width: 100%`)
- 예외 고정 너비: Footer 드롭다운 PC 260px / Mobile 152px
- Double 타입도 `width: 100%` 동일 적용

**Search 추가 스펙**
- 우측 검색 아이콘: Default #999 / Active #1EC95B
- X(초기화) 버튼: 16×16px, border-radius 9999px, bg #DADADA
- 추천 목록 우측 ↗ 아이콘: 24×24px

**Search Width (너비) 규격**
- 기본값: `width: 100%` — 부모 컨테이너 너비에 맞춤
- 추천 목록도 검색바와 동일 너비 (`width: 100%`)
- 예외 고정 너비: Header 검색바 `width: auto` (내용에 따라 늘어남, 최소 너비 없음)
- Mobile 전체화면 검색: `width: 100%`, 좌우 padding 16px 적용

---

### 8-4. Chip / Checkbox / Radio

**Chip**
| State | bg | border | text |
|---|---|---|---|
| Default | white | 1px #DADADA | #666 |
| Hover | white | 1px #333 | #333 |
| Selected | #ECFBF2 | 2px #A5E9BD | #18A149 |

- PC: height 38px, padding 0 12px / Mobile: height 32px, padding 0 12px
- border-radius: 9999px, font: Pretendard Regular 14px, letter-spacing -0.14px

**Checkbox**
- PC: 24×24px (`space/6`) / Mobile: 20×20px (`space/5`), border-radius: 9999px
- Default: bg #F5F5F7, border 1px #DADADA
- Selected: bg #1EC95B, 흰색 체크 SVG

**Radio**
- PC: 24×24px (`space/6`) / Mobile: 20×20px (`space/5`), border-radius: 9999px
- bg #F5F5F7, border 1px #DADADA
- Selected dot: PC 12×12px (`space/3`) / Mobile 10×10px, bg #1EC95B

---

### 8-5. Tab & Badge

**Tab01 (Pill)**
| State | bg | text | weight |
|---|---|---|---|
| Active | #1EC95B | white | 700 Bold |
| Default | #F5F5F7 | #333 | 400 |

- PC Large: padding 8px 24px, font 22px / PC Small: font 18px / Mobile: padding 7px 16px, font 13px
- border-radius: 9999px

**Tab02 (Underline)**
| State | text | underline |
|---|---|---|
| Active | #1EC95B | bg #1EC95B, PC 4px / Mobile 3px |
| Default | #999 | 없음 |

- PC: font 20px Bold / Mobile: font 15px Bold

**Badge01 (Blue)**
| Style | bg | border | text | weight |
|---|---|---|---|---|
| Border | transparent | 1px #006BC8 | #006BC8 | 600 |
| Filled | #006BC8 | none | white | 600 |
| Filled-Gray | #E4E8F1 | none | #666 | 400 |

- L: 24px / M: 22px / S: 20px, border-radius: 4px

**Badge02 (Orange)**
- bg: #FF6D12, text: white, Bold
- PC Square: 30px / PC Round: 30px pill / Mobile: 26px
- border-radius: Square 4px / Round 9999px

---

### 8-6. Carousel

**컴포넌트 종류**
1. Carousel_pc — 숫자 카운터 + Pause/Prev/Next 버튼
2. Carousel_mobile — 숫자 카운터 pill만
3. 인디케이터 타입 — 숫자 + ‹|› pill (PC)
4. Plus 버튼

**아이콘 SVG**
```html
<!-- Pause -->
<svg width="10" height="16" viewBox="0 0 10 16" fill="none">
  <rect width="3" height="16" rx="1.5" fill="currentColor"/>
  <rect x="7" width="3" height="16" rx="1.5" fill="currentColor"/>
</svg>

<!-- Left -->
<svg width="11" height="19" viewBox="0 0 11 19" fill="none">
  <path d="M9.5 17.5L1.5 9.5L9.5 1.5" stroke="currentColor" stroke-width="3"
        stroke-linecap="round" stroke-linejoin="round"/>
</svg>

<!-- Right -->
<svg width="11" height="19" viewBox="0 0 11 19" fill="none">
  <path d="M1.5 1.5L9.5 9.5L1.5 17.5" stroke="currentColor" stroke-width="3"
        stroke-linecap="round" stroke-linejoin="round"/>
</svg>

<!-- Play -->
<svg width="13" height="16" viewBox="0 0 13 16" fill="none">
  <path d="M11.5318 7.05542C12.7464 7.7323 12.7509 8.58379 11.5318 9.34905L2.11224 15.7018C0.928691 16.3334 0.124853 15.9605 0.0404727 14.5938L0.000502874 1.29762C-0.0261437 0.0387069 1.01085 -0.316979 1.99899 0.286609L11.5318 7.05542Z" fill="currentColor"/>
</svg>

<!-- Plus -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <rect x="11" width="3" height="24" rx="1.5" fill="white"/>
  <rect x="24" y="10" width="3" height="24" rx="1.5" transform="rotate(90 24 10)" fill="white"/>
</svg>
```

**컨트롤러 버튼**
- 크기: 44×44px, border-radius: 9999px (원형)
- Default bg: #E2E2E5 / Hover bg: #D0D0D3
- 아이콘: Default color #666 / Hover #444

**Plus 버튼**
- 40×40px, border-radius: 9999px
- Default bg: #000 / Hover bg: #333, 아이콘 white

**인디케이터 pill (PC)**
- bg: rgba(226,226,229,0.9), border-radius: 9999px, padding-left: 16px
- 구분선: 1px #C5C5C5, height 14px
- 이전/다음: 36×34px

**Carousel_mobile**
- padding: 2px 14px, border-radius: 9999px, bg: #E2E2E5
- justify-content: flex-end (우측 정렬)

**숫자 카운터**
- 현재: Pretendard Bold, PC 18px / Mobile 14px, color #000
- 전체: Pretendard Regular, PC 18px / Mobile 14px, color #555

---

### 8-7. Pagination

**페이지 번호 버튼**
| State | bg | text |
|---|---|---|
| Default | transparent | #000 |
| Hover | #C5C5C5 | #000 |
| Selected | #000 | white |

- PC: 32×32px, border-radius 16px, gap 12px
- Mobile: 24×24px, border-radius 12px, gap 16px
- font: Pretendard Regular 16px, letter-spacing -0.16px

**레이아웃**
- PC: `[««][‹] [1 2 3 4 5] [›][»»]`, gap 20px, nav 내부 gap 2px
- Mobile: `[1 2 3 4 5] [›][»»]` (이전 버튼 없음), gap 24px, nav gap 16px
- 컨텐츠↔Pagination: PC 60px / Mobile 40px

**네비게이션 아이콘 SVG**
```html
<!-- Double Left -->
<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M13 12L9 8L13 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M7 12L3 8L7 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

<!-- Left -->
<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

<!-- Right -->
<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

<!-- Double Right -->
<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M3 4L7 8L3 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9 4L13 8L9 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

---

### 8-8. Modal

**PC (Modal-popup)**
- width: 560px, padding: 40px, gap: 32px
- bg: white, border-radius: 12px
- overlay: rgba(0,0,0,0.5)
- 타이틀: Pretendard Bold 22px, color #000
- 본문: Pretendard Regular 16px, color #333
- 버튼 그룹: justify-content flex-end, gap 12px

**Mobile (Modal-popup-mo)**
- width: 328px, padding: 24px, gap: 24px
- 타이틀: Pretendard Bold 18px
- 버튼 그룹: flex 1:1, gap 8px

**버튼 공통**
- height 40px, padding 0 24px, border-radius 8px
- Border 버튼: border 1px solid #000, text #000
- Primary 버튼: bg #1EC95B, text white

**스크롤바**
- track: width 8px, bg #F5F5F7
- thumb: width 8px, height 46px, bg #E2E2E5, border-radius 9999px

---

### 8-9. Table

**PC Cell**
| 종류 | bg | border | padding | font | color |
|---|---|---|---|---|---|
| Header | #F5F5F7 | bottom 1px #DADADA | 12px 16px | SemiBold 16px | #000 |
| Default | white | bottom+right 1px #DADADA | 12px 16px | Regular 16px | #333 |

**Mobile Cell**
| 종류 | bg | padding | font |
|---|---|---|---|
| Header | #F5F5F7 | 8px 12px | SemiBold 14px |
| Default | white | 8px 12px | Regular 14px |

- 마지막 셀: border-right 없음
- Row 높이: PC min 48px (`space/6 × 2`) / Mobile min 36px (`space/9`, 4의 배수 준수) (height auto)

---

### 8-10. Card

**PC (layout04-list-01)**
- border: 1px solid #E4E8F1, border-radius: 12px
- box-shadow: var(--shadow-blue-01)
- 이미지: height 200px, object-fit cover
- 텍스트 영역: padding 24px, gap 12px
- 타이틀: Pretendard SemiBold 20px, color #000
- 내용: Pretendard Regular 16px, color #333

**Mobile (layout04-list-01-mo)**
- 이미지: height 160px
- 텍스트 영역: padding 16px, gap 12px
- 타이틀: SemiBold 16px / 내용: Regular 14px

---

### 8-11. Header

**PC — edm유학센터 (edmuak)**
- 1920px, height 107px, bg white, padding 32px 120px
- 로고: edmuak-logo.svg (188×35px)
- 로고↔nav gap: 96px, nav gap: 40px
- nav font: Pretendard Medium 20px, color #000, Hover: #1EC95B Bold
- 메뉴: 어학연수 / 해외대학 / 조기유학·캠프 / 아트유학[External_Link] / 유학후기 / 고객혜택 / 회사소개

**검색바 (Tab02)**
- bg #E2E2E5, border-radius 9999px, padding 8px 24px
- [search.svg 24px] + "프로그램" + 구분선(1px·10px·#333) + "학교"
- font: Pretendard Regular 18px

**우측 유틸리티 (gap 20px)**
- [user-profile4.svg 32px] + 메뉴 아이콘 32×32px

**Mobile (공통)**
- 360px, height 76px, padding 24px 16px
- 로고: height 22px (비율 유지)
- 검색바: bg #E2E2E5, pill, [search.svg 16px] + "프로그램|학교"
- 메뉴 아이콘: 24×24px

**브랜드별 로고**
| 브랜드 | 파일 | PC 크기 |
|---|---|---|
| edm유학센터 | edmuak-logo.svg | 188×35px |
| edm에듀케이션 | edmedu-logo.svg | 92×35px |
| 아트유학 | art-logo.svg | 312×35px |
| Taiwan | Taiwan-logo.svg | 180×35px |
| 세계어학연수박람회 | lfair-logo.svg | 320×35px (PC) / 201×22px (Mobile) |

**세계어학연수박람회 로고 SVG**
- PC: `width="320" height="35"` / Mobile: `width="201" height="22"` (비율 유지 축소)
- ed:m 파트 컬러: `#6CB640` (그린) + `#404041` (다크그레이)
- 세계어학연수박람회 텍스트 컬러: `#404041`
- 로고 그린 `#6CB640` — 다른 브랜드 로고와 동일한 컬러

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 320 35.01">
  <!-- Generator: Adobe Illustrator 30.5.0, SVG Export Plug-In . SVG Version: 2.1.4 Build 167)  -->
  <defs>
    <style>
      .st0 {
        fill: #6cb640;
      }

      .st1 {
        fill: #404041;
      }
    </style>
  </defs>
  <g>
    <path class="st1" d="M50.36,14.06c-1.67,0-3.02,1.35-3.02,3.01s1.36,3.02,3.02,3.02,3.02-1.35,3.02-3.02-1.36-3.01-3.02-3.01"/>
    <path class="st1" d="M50.36,26.72c-1.67,0-3.02,1.35-3.02,3.02s1.36,3.01,3.02,3.01,3.02-1.35,3.02-3.01-1.36-3.02-3.02-3.02"/>
    <path class="st0" d="M86.8,20.45v13.78s0,.03.01.04c.02.15.14.27.29.27h4.44c.17,0,.3-.14.3-.3v-14.09c0-.36-.01-.71-.04-1.05-.13-1.9-.6-3.39-1.44-4.55-.04-.07-.06-.1-.09-.13-.08-.11-.18-.23-.32-.38-.07-.08-.12-.13-.16-.17-.85-.88-2.73-2.36-5.72-2.36h-1.55c-1.05.03-3.04.26-5.06,1.46-.56.32-1.07.67-1.5,1.06-.1.09-.24.08-.33-.02-.42-.46-1.14-1.13-2.21-1.66-1.11-.56-2.33-.84-3.65-.84h-1.07c-.3,0-.93.04-1.64.16h-.04c-.07.01-.22.04-.43.09h-.06c-.61.16-1.48.41-2.29.82-.07.04-.16.03-.23,0-.04-.02-.07-.05-.09-.09l-.56-.87s-.02-.02-.03-.04c-.08-.13-.23-.19-.37-.13l-3.73,1.47c-.11.05-.18.16-.18.28v21.05c0,.17.14.3.3.3h4.34c.17,0,.3-.14.3-.3v-13.73c0-2.69,1.52-3.69,2.79-4.06.8-.23,1.51-.19,1.51-.19h.19c.65,0,1.23.09,1.77.28,2.24.79,2.52,2.99,2.55,3.65v14.03s0,.03.01.04c.02.15.14.27.29.27h4.54c.17,0,.3-.14.3-.3v-13.73c0-2.69,1.52-3.69,2.79-4.06.8-.23,1.51-.19,1.51-.19h.19c.65,0,1.23.09,1.77.28,2.24.79,2.52,2.99,2.55,3.65v.25h.05Z"/>
    <path class="st1" d="M13.37,20.41v.23H4.86v-.51h0v-1.06c0-2.87,2.17-3.92,4.19-3.93h.12c2.03.02,4.19,1.06,4.19,3.93v1.33h0ZM9.14,11.02C3.16,11.02,0,14.02,0,19.71v6.74c0,5.76,3.02,8.56,9.23,8.56,2.78,0,5.87-.5,8.07-1.31.13-.05.21-.19.19-.32l-.5-3.07v-.03l-.1-.5c-.01-.1-.09-.11-.15-.11-.04,0-.1,0-.16.02l-.16.04c-2.11.55-3.99.9-5.58,1.03-.29.02-.58.03-.87.03-1.83,0-3.18-.38-3.99-1.14-.9-.89-1.08-2.41-1.11-3.24v-1.36c0-.13.11-.24.24-.24h12.51c.16,0,.3-.13.3-.3v-4.71c0-5.83-2.95-8.79-8.77-8.79"/>
    <path class="st1" d="M31.94,30.69c-1.05,0-1.88-.33-2.44-.98-.05-.05-.07-.08-.09-.1-.05-.07-.11-.14-.16-.21-.02-.04-.05-.07-.07-.11-.39-.68-.58-1.46-.58-2.36v-7.44c0-1.21.33-2.18.97-2.89.63-.67,1.54-1.01,2.72-1.01s2.26.32,2.99.59c.09.03.16.07.24.11.38.23.96.77.96,2.09v9.62c0,.78-.23,1.2-.42,1.42-.29.25-.56.41-.86.53-1.25.49-2.35.74-3.26.74M41.42.07c-.07-.06-.17-.08-.25-.06l-4.49.97c-.13.03-.22.15-.22.29v2.94s.02.05.02.08v6.97c0,.07-.04.14-.09.19-.06.04-.14.06-.21.04-1.09-.31-2.31-.47-3.64-.47-5.97,0-9.13,3.01-9.13,8.7v6.74c0,5.5,2.74,8.29,8.38,8.54.34,0,1.5.02,2.72-.24.53-.13,1.03-.31,1.51-.51h0c.47-.18,1.1-.48,1.1-.48l.2.59c.04.12.15.2.28.2h3.65c.16,0,.3-.13.3-.29V.3c0-.09-.04-.18-.11-.23"/>
  </g>
  <g>
    <path class="st1" d="M104.82,11.91h3.34v5.96c0,.51.03.97.09,1.37.06.4.16.77.29,1.12s.3.68.49,1.01c.2.33.44.66.72,1,.5.62,1.05,1.26,1.64,1.9.6.65,1.21,1.28,1.83,1.9l-2.22,2.05c-1.17-1.21-2.16-2.27-2.96-3.19-.78-.9-1.25-1.53-1.39-1.86h-.03c-.07.2-.24.48-.49.84-.26.36-.56.74-.89,1.13-.18.21-.39.46-.64.73s-.52.57-.81.89-.6.64-.91.97c-.31.33-.62.63-.92.92l-2.27-2.18c.57-.57,1.17-1.19,1.79-1.86s1.19-1.33,1.71-1.97c.32-.39.58-.76.79-1.12.2-.35.37-.71.49-1.06.12-.35.21-.74.27-1.16.05-.42.08-.89.08-1.42v-5.96h0ZM113.81,20.53h-3.34v-2.93h3.34v-7.16h3.2v23.05h-3.2v-12.96ZM122.06,34.69h-3.2V9.94h3.2v24.75Z"/>
    <path class="st1" d="M135.38,15.77h3.2v-5.32h3.18v23.05h-3.18v-8.2h-3.28v-2.82h3.28v-3.91h-3.2c-.04,1.1-.16,2.07-.39,2.91-.22.84-.64,1.66-1.24,2.46-.61.8-1.45,1.64-2.52,2.51-1.08.88-2.47,1.9-4.18,3.07l-1.92-2.55c1.55-1.03,2.78-1.91,3.71-2.65.93-.74,1.63-1.44,2.11-2.12.48-.67.8-1.37.95-2.1s.23-1.59.23-2.58v-2.29h-6.33v-2.9h9.58v3.43h0ZM146.86,34.69h-3.2V9.94h3.2v24.75Z"/>
    <path class="st1" d="M157.38,28.86c-1.14,0-2.11-.18-2.92-.53s-1.47-.85-1.99-1.49-.89-1.39-1.13-2.26-.36-1.83-.36-2.87v-2.95c0-1.03.12-1.98.36-2.86s.62-1.64,1.13-2.28c.52-.64,1.18-1.14,1.99-1.49.81-.36,1.78-.53,2.92-.53s2.06.17,2.86.52c.8.35,1.46.83,1.98,1.44.52.61.9,1.34,1.16,2.18.26.84.4,1.76.41,2.75h3.84v-8.54h3.39v24.75h-3.39v-13.31h-3.84v.32c0,1.05-.12,2.01-.36,2.87-.24.87-.62,1.62-1.13,2.26-.52.64-1.18,1.14-1.99,1.49-.81.36-1.78.53-2.92.53h0ZM157.38,14.54c-1.14,0-1.95.39-2.44,1.17s-.73,1.93-.73,3.43v2.16c0,1.51.24,2.65.73,3.43.49.78,1.3,1.17,2.44,1.17s1.95-.39,2.44-1.17.73-1.92.73-3.43v-2.16c0-1.51-.24-2.65-.73-3.43-.49-.78-1.3-1.17-2.44-1.17Z"/>
    <path class="st1" d="M183.99,12.28h5.37v2.82h-14.2v-2.82h5.47v-2.66h3.36v2.66ZM182.31,25.19c-.94,0-1.78-.11-2.51-.33s-1.34-.52-1.84-.9-.88-.83-1.15-1.34c-.27-.51-.4-1.06-.4-1.65v-.85c0-.59.13-1.14.4-1.65.27-.51.65-.96,1.15-1.34.5-.38,1.11-.68,1.84-.9s1.57-.33,2.51-.33,1.76.11,2.5.33,1.36.52,1.86.9.88.83,1.15,1.34c.27.52.4,1.06.4,1.65v.85c0,.59-.13,1.14-.4,1.65-.27.52-.65.96-1.15,1.34-.5.38-1.12.68-1.86.9s-1.57.33-2.5.33ZM178.76,26.55h15.83v8.46h-3.36v-5.64h-12.47v-2.82ZM182.31,18.51c-.89,0-1.57.19-2.03.57-.46.38-.69.78-.69,1.18v.53c0,.41.23.8.69,1.18.46.38,1.14.57,2.03.57s1.57-.19,2.03-.57c.46-.38.69-.78.69-1.18v-.53c0-.41-.23-.8-.69-1.18-.46-.38-1.14-.57-2.03-.57ZM194.59,16.14h3.26v2.93h-3.26v6.36h-3.36v-15.49h3.36s0,6.2,0,6.2Z"/>
    <path class="st1" d="M206.5,23.78c-.98,0-1.86-.15-2.66-.47-.79-.31-1.46-.73-2.02-1.26-.55-.53-.97-1.14-1.27-1.84-.29-.69-.44-1.41-.44-2.16v-1.49c0-.74.15-1.46.44-2.16.29-.69.72-1.3,1.27-1.84.55-.53,1.22-.95,2.02-1.26.79-.31,1.68-.47,2.66-.47s1.86.16,2.66.47c.79.31,1.46.73,2.02,1.26.55.53.97,1.14,1.27,1.84.29.69.44,1.41.44,2.16v1.49c0,.75-.15,1.46-.44,2.16s-.72,1.3-1.27,1.84c-.55.53-1.22.95-2.02,1.26-.79.31-1.68.47-2.66.47ZM206.5,13.75c-.5,0-.95.08-1.35.25-.4.17-.74.4-1.01.68s-.48.61-.63.98c-.14.37-.21.75-.21,1.14v1.01c0,.41.07.79.21,1.16.14.36.35.69.63.97.28.28.61.51,1.01.68s.85.25,1.35.25.95-.08,1.35-.25c.4-.17.74-.39,1.01-.68.28-.28.48-.61.63-.97.14-.36.21-.75.21-1.16v-1.01c0-.39-.07-.77-.21-1.14s-.35-.7-.63-.98c-.28-.28-.61-.51-1.01-.68s-.85-.25-1.35-.25ZM207.94,31.55h12.81v2.87h-16.2v-8.3h3.39v5.43ZM217.01,13v-3.06h3.34v17.62h-3.34v-5.64h-3.36v-2.85h3.36v-3.22h-3.36v-2.85s3.36,0,3.36,0Z"/>
    <path class="st1" d="M247.28,23.75v2.85h-9.66v8.09h-3.39v-8.09h-9.69v-2.85h22.74ZM235.97,17.58c-.12.25-.45.54-.96.88-.52.34-1.21.73-2.08,1.17-.37.2-.8.4-1.27.63-.47.22-.95.44-1.44.66s-.98.44-1.47.65-.95.41-1.37.59l-1.39-2.77c.94-.39,1.94-.82,2.98-1.3s2.02-.96,2.92-1.44c.84-.44,1.43-.94,1.79-1.48s.53-1.22.53-2.04v-2.34h3.42v2.34c0,.82.18,1.49.53,2.04.36.54.95,1.03,1.79,1.48.91.48,1.88.96,2.92,1.44,1.04.48,2.03.91,2.98,1.3l-1.36,2.71c-.43-.18-.89-.37-1.37-.59-.49-.21-.98-.43-1.47-.65s-.97-.44-1.44-.67c-.47-.22-.89-.43-1.27-.63-.87-.44-1.54-.82-2.02-1.14-.47-.32-.78-.6-.92-.85h-.03,0Z"/>
    <path class="st1" d="M262.07,23.06h-11.75v-12.06h3.31v3.57h5.13v-3.57h3.31v12.06ZM253.24,25.62h15.83v9.37h-3.36v-6.52h-12.47v-2.85h0ZM253.64,20.27h5.13v-2.9h-5.13v2.9h0ZM269.07,15.53h3.26v2.93h-3.26v6.04h-3.36v-14.56h3.36s0,5.59,0,5.59Z"/>
    <path class="st1" d="M278.49,20.85c1.87,0,3.6-.02,5.21-.07,1.6-.04,3.22-.15,4.86-.31l.29,2.74c-.77.09-1.59.16-2.47.21s-1.87.09-2.96.12-2.31.04-3.66.05c-1.34,0-2.87.01-4.58.01v-7.61h7.98v-2.18h-7.98v-2.77h11.29v7.61h-7.98v2.2ZM278.49,25.64h15.4v9.08h-15.4v-9.08ZM281.83,31.95h8.73v-3.54h-8.73s0,3.54,0,3.54ZM293.89,15.63h3.26v2.93h-3.26v5.96h-3.36v-14.58h3.36v5.7h0Z"/>
    <path class="st1" d="M299.53,27.53h3.3c1.02,0,1.99,0,2.9-.03v-1.84c-.76-.12-1.43-.33-1.99-.61s-1.03-.61-1.4-.98c-.37-.37-.65-.78-.83-1.22-.18-.44-.27-.9-.27-1.36v-.96c0-.53.12-1.06.37-1.57s.63-.98,1.13-1.38c.51-.41,1.14-.74,1.91-.98.76-.25,1.67-.37,2.72-.37s1.94.12,2.71.37,1.42.58,1.92.98c.51.41.88.87,1.13,1.38.25.51.37,1.04.37,1.57v.96c0,.46-.09.91-.27,1.36-.18.44-.45.85-.83,1.22-.37.37-.84.7-1.4.98-.56.28-1.21.49-1.96.61v1.78c1.34-.03,2.51-.08,3.54-.15,1.02-.06,1.95-.14,2.79-.23l.24,2.82c-.77.09-1.65.16-2.66.23-1.01.06-2.16.11-3.47.15-1.31.04-2.79.06-4.43.08-1.65.02-3.49.03-5.54.03v-2.85h.02ZM305.72,12.6v-2.71h3.34v2.71h5.37v2.82h-14.39v-2.82h5.69,0ZM307.37,18.86c-.52,0-.97.06-1.35.17-.38.12-.69.27-.93.47-.24.19-.42.41-.53.65-.12.24-.17.47-.17.71v.32c0,.25.06.49.17.72.12.23.29.44.53.64.24.19.55.35.93.47.38.12.83.17,1.35.17,1.03,0,1.79-.21,2.27-.64.48-.43.72-.88.72-1.36v-.32c0-.48-.24-.93-.72-1.36s-1.24-.64-2.27-.64ZM320,34.69h-3.34V9.94h3.34v24.75Z"/>
  </g>
</svg>
```

**아이콘 SVG**
```html
<!-- search.svg (24×24px, currentColor #333) -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M11.3705 19.0741C15.6252 19.0741 19.0743 15.625 19.0743 11.3703C19.0743 7.1156 15.6252 3.6665 11.3705 3.6665C7.11585 3.6665 3.66675 7.1156 3.66675 11.3703C3.66675 15.625 7.11585 19.0741 11.3705 19.0741Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M21.0002 21L16.8113 16.811" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

<!-- user-profile4.svg (32×32px, currentColor #333) -->
<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
  <path d="M26.6666 28C26.6666 24.3181 21.891 21.3333 15.9999 21.3333C10.1089 21.3333 5.33325 24.3181 5.33325 28M15.9999 17.3333C12.318 17.3333 9.33325 14.3486 9.33325 10.6667C9.33325 6.98477 12.318 4 15.9999 4C19.6818 4 22.6666 6.98477 22.6666 10.6667C22.6666 14.3486 19.6818 17.3333 15.9999 17.3333Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

<!-- External_Link.svg (20×20px, currentColor #C5C5C5) -->
<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M8.33333 4.16671H6.83333C5.43285 4.16671 4.1665 5.43306 4.1665 6.83354V13.1669C4.1665 14.5668 5.43251 15.8334 6.83059 15.8334H13.1691C14.5665 15.8334 15.8332 14.5669 15.8332 13.1693V11.6667M12.4998 3.33337H16.6665V7.50004M16.6665 3.33337L10.8332 9.16671" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

---

### 8-11-1. Header — 세계어학연수박람회 (Header-lfair)

**PC — Header-lfair**
- 전체 너비: 1920px, height: 104px
- bg: white, padding: 32px 120px
- 구조: [로고] ↔ [네비 + 참가신청 버튼]
- 로고: lfair-logo.svg (320×35px)
- 로고 ↔ nav gap: 96px
- nav 항목 gap: 40px
- nav font: Pretendard Medium 20px (H5), color #000, letter-spacing -0.2px
- nav Hover: color #1EC95B, Bold
- nav 메뉴: 상담 가능 학교 / 혜택·이벤트 / 오시는 길
- ⚠️ 검색바 없음 — 우측에 CTA 버튼만 배치

#### 참가신청 버튼 (다른 헤더와 차이점)
- style: Filled / Secondary (bg #000, text white)
- shape: Round (border-radius 9999px)
- size: Small (height 40px, padding 12px 24px)
- font: Pretendard Bold 16px, letter-spacing -0.16px
- 유저아이콘·메뉴아이콘 없음

**Mobile — Header-lfair-mo**
- 너비: 360px, height: 72px
- bg: white, padding: 24px 16px
- 구조: [로고] ↔ [햄버거 메뉴 아이콘]
- 로고: lfair-logo.svg 축소 (201×22px)
- 우측: 메뉴 아이콘 24×24px
- ⚠️ 검색바 없음 / 참가신청 버튼 없음 (모바일은 메뉴로 진입)

---

### 8-12. Footer

**PC — edm유학센터**
- 1920px, height 510px, bg #F5F5F7, padding 32px 120px 100px, gap 100px

**상단 (텍스트 링크 + SNS)**
- 링크: gap 40px, Pretendard Regular 18px, color #000
- 개인정보처리방침: color #1EC95B
- SNS: [youtube.svg 48px] [blog.svg 48px] [instagram.svg 48px], gap 12px
- 드롭다운: width 260px, height 48px

**하단 (회사정보 + 고객문의)**
- 회사명+대표자+사업자: Pretendard Regular 18px, color #666, gap 12px
- 개인정보 안내: Pretendard Regular 14px, color #999
- 고객문의 라벨: Bold 20px, color #000
- 전화번호: Bold 40px, color #000, letter-spacing -0.8px
- 운영시간: Regular 18px, color #666

**Mobile — edm유학센터**
- 360px, height 592px, bg #F5F5F7, padding 24px 16px 60px, gap 40px

구조 (위→아래):
1. 텍스트 링크 (gap 12px, Regular 13px)
2. SNS [38px] + 드롭다운 (width 152px)
3. 고객문의: 라벨 Bold 16px + 전화 Bold 22px (border-bottom) / 운영시간 Regular 16px
4. 회사정보: 로고 22px + 텍스트 Regular 14px #666

**브랜드별 height**
| 브랜드 | PC | Mobile |
|---|---|---|
| edmuak | 510px | 592px |
| edmedu | 444px (SNS 없음) | 404px |
| art | 511px | 764px |
| Taiwan | 510px | 592px |

---

### 8-13. Floating Ad

**PC**
- width 1248px, height 72px
- bg rgba(51,51,51,0.8), backdrop-filter blur(15px)
- border-radius 12px, padding 12px 24px
- position fixed, bottom 고정, 좌우 중앙
- 좌측: Pretendard Bold 20px, color white
- 카톡상담: bg #000, color #ffe812, h 48px, padding 0 60px, r 8px, Bold 16px
- 상담예약: bg #1EC95B, color white, h 48px, padding 0 60px, r 8px, Bold 16px

**Mobile**
- width: 100%, height: 88px
- bg white, border-top 1px solid #E4E8F1, padding 16px 16px 24px
- 버튼: flex 1:1, gap 8px, h 48px, r 8px, Bold 16px
- position fixed 시 `left: 0; right: 0;` 으로 전체 너비 채움
- ⚠️ `width: 360px` 고정 사용 금지 — 390px, 430px 등 더 큰 기기에서 여백 발생

---

## 9. Z-index

UI 요소가 겹칠 때의 우선순위를 명확히 정의한다.
**이 표 외의 임의의 z-index 값(예: 999, 9999) 사용 금지.**

| 레이어 | 토큰 | 값 | 해당 컴포넌트 |
|---|---|---|---|
| 기본 콘텐츠 | z-content | 0 | 카드, 텍스트, 이미지 등 일반 요소 |
| Header | z-header | 100 | PC/Mobile 상단 고정 헤더 |
| Dropdown / Search 리스트 | z-dropdown | 200 | 헤더 위로 펼쳐져야 하므로 header보다 높게 |
| Floating Ad | z-floating | 300 | 헤더·드롭다운 위에 하단 고정 |
| Modal overlay | z-overlay | 400 | 화면 전체 덮는 반투명 스크림 |
| Modal 컨텐츠 | z-modal | 500 | overlay 위에 실제 모달 박스 |

```css
/* Z-index 토큰 */
--z-content:  0;
--z-header:   100;
--z-dropdown: 200;
--z-floating: 300;
--z-overlay:  400;
--z-modal:    500;
```

> **사용 규칙**
> - 반드시 위 토큰 변수를 사용할 것 — 숫자 하드코딩 금지
> - Dropdown은 Header 위에 펼쳐져야 하므로 `z-dropdown > z-header`
> - Modal 열릴 때 Floating Ad는 overlay 아래로 내려가야 하므로 `z-overlay > z-floating`
> - Toast / Alert 같은 추가 요소가 생길 경우 `z-modal` 위 600번대에 정의할 것

---

## 10. 사용 방법

이 파일을 Claude에게 전달할 때:

```
[Design.md 첨부] + "위 디자인 시스템 기반으로 [컴포넌트명] 만들어줘"
```

특정 컴포넌트만 필요할 경우 해당 섹션만 복사해서 전달해도 됩니다.
