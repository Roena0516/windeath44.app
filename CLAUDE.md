# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**OSHI_NO_SAIN_MOBILE** is the mobile-optimized version of the OSHI_NO_SAIN desktop environment simulator. Unlike the desktop version which simulates an OS with draggable windows, this project is built as a standard community website using Next.js, designed for mobile-first experience while maintaining similar visual design.

## Development Commands

- **Development server**: `npm run dev` - Starts Next.js development server
- **Build**: `npm run build` - Builds the application for production
- **Start**: `npm start` - Runs the production build
- **Lint**: `npm run lint` - Runs ESLint to check code quality

## Commit Convention

Follow the Korean commit convention format: `Type :: 변경 사항 요약`

| Type     | Description                                  |
| -------- | -------------------------------------------- |
| feat     | 새로운 기능 추가                             |
| fix      | 버그 수정                                    |
| refactor | 코드 리팩토링 (기능 변경 없이 구조 개선)     |
| test     | 테스트 코드 작성                             |
| chore    | 기타 자잡한 작업 (빌드 설정, 패키지 관리 등) |
| docs     | 문서 추가 또는 수정                          |
| delete   | 불필요한 코드나 파일 삭제                    |
| build    | 빌드 관련 파일 및 설정 변경                  |

Example: `feat :: 추모관 목록 페이지 추가`

## High-Level Architecture

This is a Next.js-based mobile community website for anime character memorials, built with TypeScript and modern React patterns.

### Core Architecture Pattern

**Mobile-First Community Platform**: Standard web application with page-based navigation:

- **Next.js App Router**: Modern routing with Server Components support
- **Page-Based Navigation**: Traditional web navigation instead of window management
- **Responsive Design**: Mobile-first approach with desktop support
- **Shared Design Language**: Visual similarity to desktop version but adapted for mobile UX

### Key Differences from Desktop Version

**What's REMOVED:**
- No OS simulation (Kernel, WindowManager, draggable windows)
- No custom cursor system
- No window layer management
- No process/task management system
- No boot sequence simulation

**What's ADAPTED:**
- Memorial system → Standard pages/routes
- Applications → Page components
- Window-based UI → Mobile-friendly card/list layouts
- Desktop interactions → Touch-optimized interactions

### Technology Stack

**Framework & Core:**
- Next.js (App Router recommended)
- React 18+
- TypeScript

**State Management:**
- React Query (TanStack Query) for server state
- Zustand or Jotai for client state (lighter than desktop version)
- Context API for auth and theme

**Styling:**
- Emotion or Tailwind CSS for styling
- Mobile-first responsive design
- Maintain visual similarity to desktop version

**API Integration:**
- Same backend as desktop version
- Axios for HTTP client
- API routes pattern similar to `OSHI_NO_SAIN/src/api/`

### Planned Directory Structure

```
app/
├── (auth)/
│   ├── login/
│   └── signup/
├── (main)/
│   ├── page.tsx           # Home/Discovery page
│   ├── memorial/
│   │   ├── page.tsx       # Memorial list
│   │   ├── [id]/
│   │   │   └── page.tsx   # Memorial detail
│   │   └── apply/
│   │       └── page.tsx   # Memorial application
│   ├── search/
│   ├── notifications/
│   └── profile/
└── api/                   # Next.js API routes (if needed)

components/
├── common/                # Shared components
├── memorial/              # Memorial-specific components
├── layout/                # Layout components
└── ui/                    # Base UI components

lib/
├── api/                   # API client functions
│   ├── auth.ts
│   ├── memorial.ts
│   ├── anime.ts
│   └── user.ts
├── hooks/                 # Custom React hooks
└── utils/                 # Utility functions

stores/                    # Global state stores
├── auth.ts
├── user.ts
└── memorial.ts

types/                     # TypeScript type definitions
├── api.ts
├── memorial.ts
└── user.ts
```

### Core Features to Implement

**Memorial System:**
- Memorial list and search
- Memorial detail view with bow (절하기) functionality
- Memorial application submission
- Memorial history/tracking
- Comment system

**User System:**
- Authentication (login/signup)
- User profile
- User memorial management

**Community Features:**
- Notification system
- Search functionality
- Anime/character browsing
- Chatbot integration (if applicable)

**Additional Features:**
- Game integrations (sulkkagi, rhythm game)
- Teaching chatbot

### API Integration

**Reuse desktop API structure** from `OSHI_NO_SAIN/src/api/`:
- `auth/`: Authentication endpoints
- `memorial/`: Memorial CRUD operations
- `anime/`: Animation/character data
- `user/`: User management
- `notification/`: Notifications

**Server Configuration**: Use same backend endpoints as desktop version
- Reference: `OSHI_NO_SAIN/src/config/index.ts`
- Environment variables: `.env.local`

### Design Guidelines

**Visual Consistency:**
- Maintain similar color schemes and typography from desktop version
- Adapt desktop window aesthetics to mobile cards/sections
- Keep brand identity consistent

**Mobile UX Considerations:**
- Touch-friendly button sizes (minimum 44x44px)
- Simplified navigation patterns
- Bottom navigation or hamburger menu
- Swipe gestures where appropriate
- Optimized for portrait orientation

**Reference Desktop Components:**
- For design inspiration, check `OSHI_NO_SAIN/src/applications/applicationList/`
- Adapt window-based layouts to full-page or card-based layouts
- Memorial viewer → Memorial detail page
- Window components → Page sections

### Development Notes

- **Server Components**: Utilize Next.js Server Components for better performance
- **Image Optimization**: Use Next.js Image component for optimized loading
- **SEO**: Implement proper meta tags and Open Graph for memorial pages
- **Progressive Enhancement**: Ensure core functionality works without JavaScript
- **Accessibility**: Follow WCAG guidelines, especially for mobile touch targets
- **Performance**: Target Lighthouse scores of 90+ on mobile

### State Management Strategy

**Simpler than Desktop:**
- No window/focus/layer management needed
- No task/process system
- Focus on: auth state, user data, memorial data, UI state (modals, drawers)

**Recommended Atoms/Stores:**
- `authStore`: Login state, user info
- `memorialStore`: Current memorial data, filters
- `uiStore`: Modal states, loading states
- React Query for all server state

### Migration from Desktop Codebase

**What to Reference:**
1. **API Calls**: Copy and adapt from `OSHI_NO_SAIN/src/api/`
2. **Business Logic**: Memorial bow system, application submission logic
3. **Types**: User, Memorial, Anime types from `OSHI_NO_SAIN/src/modules/`
4. **Component Logic**: Core functionality (not window management)

**What NOT to Copy:**
1. Kernel, WindowManager, Application layout wrapper
2. Custom cursor, drag/resize logic
3. Process/task management hooks
4. Desktop-specific state atoms

### Testing Considerations

- **Mobile Testing**: Test on actual devices (iOS Safari, Android Chrome)
- **Responsive Testing**: Verify layouts at 320px, 375px, 414px, 768px widths
- **Touch Testing**: Ensure all interactions work with touch
- **Performance Testing**: Check bundle size and initial load time

## MCP Servers

### Figma Dev Mode MCP Rules

- The Figma Dev Mode MCP Server provides an assets endpoint which can serve image and SVG assets
- IMPORTANT: If the Figma Dev Mode MCP Server returns a localhost source for an image or an SVG, use that image or SVG source directly
- IMPORTANT: DO NOT import/add new icon packages, all the assets should be in the Figma payload
- IMPORTANT: do NOT use or create placeholders if a localhost source is provided
- The Figma design will be provided and should be the primary reference for UI implementation
- Adapt Figma desktop designs to mobile-friendly layouts while maintaining visual consistency

## Desktop Version Reference

When implementing features, you can reference the desktop version at `../OSHI_NO_SAIN/` for:
- Business logic and data flow
- API integration patterns
- Component functionality (adapted to mobile)
- Type definitions and interfaces

**Key Files to Reference:**
- `../OSHI_NO_SAIN/src/api/` - API client implementations
- `../OSHI_NO_SAIN/src/modules/` - Type definitions
- `../OSHI_NO_SAIN/src/config/` - Server configuration
- `../OSHI_NO_SAIN/src/applications/applicationList/memorial*` - Memorial feature logic
