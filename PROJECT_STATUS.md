# OSHI_NO_SAIN_MOBILE - 프로젝트 진행 상황

## 📅 마지막 업데이트
2025-11-10

## ✅ 완료된 작업

### 1. 프로젝트 초기 설정 완료
- [x] Next.js 16.0.1 + TypeScript 설치
- [x] React 19.2 설치
- [x] App Router 구조 설정
- [x] package.json 스크립트 설정 (`dev`, `build`, `start`, `lint`)

### 2. 의존성 설치 완료
**상태 관리:**
- [x] @tanstack/react-query (5.90.7) - 서버 상태 관리
- [x] jotai (2.15.1) - 클라이언트 상태 관리
- [x] zustand (5.0.8) - 추가 상태 관리 옵션

**API & HTTP:**
- [x] axios (1.13.2) - HTTP 클라이언트

**스타일링:**
- [x] @emotion/react (11.14.0)
- [x] @emotion/styled (11.14.1)

**개발 도구:**
- [x] TypeScript (5.9.3)
- [x] ESLint (9.39.1)
- [x] Prettier (3.6.2)

### 3. 프로젝트 구조 생성
```
OSHI_NO_SAIN_MOBILE/
├── app/
│   ├── layout.tsx          ✅ React Query Provider 설정됨
│   ├── page.tsx            ✅ 기본 홈페이지 (임시)
│   ├── providers.tsx       ✅ QueryClient 설정
│   └── globals.css         ✅ 기본 CSS 리셋
├── components/
│   ├── common/             ✅ 디렉토리만 생성됨
│   ├── layout/             ✅ 디렉토리만 생성됨
│   └── ui/                 ✅ 디렉토리만 생성됨
├── lib/
│   ├── api/
│   │   ├── axiosInstance.ts   ✅ 인터셉터 설정 (401 처리, 토큰 자동 주입)
│   │   └── config.ts          ✅ API 엔드포인트 정의
│   ├── hooks/              ✅ 디렉토리만 생성됨
│   └── utils/              ✅ 디렉토리만 생성됨
├── stores/                 ✅ 디렉토리만 생성됨
├── types/
│   └── index.ts            ✅ 공통 타입 정의 (User, Memorial, Anime 등)
├── public/                 ✅ 디렉토리만 생성됨
├── .env.local              ✅ 환경 변수 설정
├── .env.example            ✅ 환경 변수 템플릿
├── .eslintrc.json          ✅ ESLint 설정
├── .prettierrc             ✅ Prettier 설정 (데스크톱과 동일)
├── .gitignore              ✅ Git 무시 파일
├── tsconfig.json           ✅ TypeScript 설정
├── next.config.ts          ✅ Next.js 설정
├── CLAUDE.md               ✅ Claude Code 가이드
└── README.md               ✅ 기본 README
```

### 4. 핵심 파일 구현 완료

#### `lib/api/axiosInstance.ts`
- Request 인터셉터: localStorage에서 토큰 자동 주입
- Response 인터셉터: 401 에러 시 자동 로그아웃 + 로그인 페이지 리다이렉트
- BaseURL: 환경변수 `NEXT_PUBLIC_API_URL` 사용

#### `lib/api/config.ts`
- 데스크톱 버전(`OSHI_NO_SAIN/src/config/index.ts`)과 동일한 엔드포인트 구조
- 엔드포인트: auth, user, memorial, memorialTracing, memorialApplication, anime, chatbot, notification

#### `types/index.ts`
- User, Memorial, Anime, MemorialApplication, Notification 타입 정의
- ApiResponse<T> 제네릭 타입

#### `app/providers.tsx`
- QueryClient 설정
- staleTime: 60초
- refetchOnWindowFocus: false

### 5. 개발 환경 테스트
- [x] `npm run dev` 정상 작동 확인 (http://localhost:3000)
- [x] TypeScript 컴파일 확인
- [x] Next.js 빌드 시스템 확인

## 🔄 다음 단계

### 1. Figma 디자인 분석 (진행 대기 중)
- Figma URL: https://www.figma.com/design/3fJ6NZeco8Ey5QEDzAiUMM/%EC%B5%9C%EC%95%A0%EC%9D%98-%EC%82%AC%EC%9D%B8?node-id=8070-14564&m=dev
- **문제**: Figma MCP 서버가 현재 설정되지 않음
- **해결 방법 옵션**:
  1. Figma 디자인 스크린샷 제공
  2. 디자인 구성 요소 설명
  3. Figma Dev Mode 접근 권한 설정

### 2. 메인 화면 구현 (대기 중)
페이지 구조 (예상):
- [ ] 헤더 컴포넌트
- [ ] 네비게이션
- [ ] 메인 콘텐츠 영역
- [ ] 푸터 (필요시)

### 3. API 통합 (대기 중)
- [ ] auth API 함수 구현
- [ ] memorial API 함수 구현
- [ ] React Query hooks 작성

### 4. 상태 관리 설정 (대기 중)
- [ ] 인증 상태 store (authStore)
- [ ] UI 상태 store (uiStore)

## 📝 중요 참고 사항

### 데스크톱 버전과의 차이점
**제거된 기능:**
- OS 시뮬레이션 (Kernel, WindowManager)
- 드래그 가능한 창 시스템
- 커스텀 커서
- 프로세스/태스크 관리
- 부팅 시퀀스

**유지/적용되는 기능:**
- 추모관 시스템 (페이지 형태로 변환)
- 인증 시스템
- API 구조 (동일한 백엔드 사용)
- 디자인 언어 (비슷한 비주얼 유지)

### 참조할 데스크톱 파일
**API 구조:**
- `../OSHI_NO_SAIN/src/api/` - API 클라이언트 구현
- `../OSHI_NO_SAIN/src/config/` - 서버 설정

**비즈니스 로직:**
- `../OSHI_NO_SAIN/src/applications/applicationList/memorial*` - 추모관 기능
- `../OSHI_NO_SAIN/src/applications/applicationList/bow` - 절하기 기능

**타입 정의:**
- `../OSHI_NO_SAIN/src/modules/` - TypeScript 타입

**스타일 참고:**
- `../OSHI_NO_SAIN/src/applications/*/style.ts` - Emotion 스타일링 패턴

## 🛠️ 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린트 검사
npm run lint
```

## 🌐 환경 변수

`.env.local` 파일에 다음 변수 설정 필요:
```env
NEXT_PUBLIC_SERVER=api.example.com
NEXT_PUBLIC_API_URL=https://api.example.com
NODE_ENV=development
```

## 📌 진행 중 이슈
1. **Figma MCP 서버 미설정**: Figma 디자인을 직접 읽을 수 없음
   - 대안: 스크린샷 또는 디자인 설명 필요

## 💡 다음 세션에서 할 일
1. Figma 디자인 확인 (스크린샷 또는 설명 받기)
2. 메인 페이지(`app/page.tsx`) 구현 시작
3. 공통 레이아웃 컴포넌트 작성
4. 필요한 API 함수 작성
