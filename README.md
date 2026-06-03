# 🚀 Evyatar Monorepo

ארגון מסודר של כל פרוייקטי (Frontend, Backend, Shared Packages).

## 📁 מבנה

```
.
├── apps/
│   ├── frontend/          # אפליקציות React
│   │   ├── web-portfolio
│   │   ├── lev-chedva-website
│   │   ├── emergency-protocol-diagram
│   │   ├── online-converter
│   │   ├── hebrew-schedule
│   │   ├── test-yourself
│   │   └── lev-chedva-admin
│   └── backend/           # שרתים (Express, NestJS)
│       ├── emergency-protocol-server
│       ├── uh-shoham-server
│       ├── test-yourself-api
│       └── lev-hedva-api
├── packages/              # Shared packages
│   ├── shared-types       # Types משותפים
│   └── shared-utils       # Utilities משותפים
├── configs/               # Configuration משותף
│   ├── typescript/
│   └── eslint/
├── package.json           # Root monorepo
├── turbo.json             # Turborepo config
├── pnpm-workspace.yaml    # pnpm workspaces
└── README.md              # זה הקובץ
```

## 🛠️ סטאק טכנולוגי

- **Package Manager**: pnpm
- **Build System**: Turborepo
- **Language**: TypeScript
- **Frontend**: React 19, Vite, Tailwind CSS
- **Backend**: Express, NestJS, Prisma
- **Testing**: Vitest, Jest, Playwright
- **Linting**: ESLint, Prettier

## 📦 Installation

```bash
# Install pnpm (if not installed)
npm install -g pnpm

# Install dependencies
pnpm install

# Install Turbo globally (optional)
pnpm add -g turbo
```

## 🚀 Commands

### Development

```bash
pnpm dev              # Run all apps in dev mode
pnpm build            # Build all projects
pnpm lint             # Lint all projects
pnpm format           # Format all code
pnpm test             # Run tests
pnpm type-check       # Type check all projects
```

### Workspace

```bash
# Run command in specific workspace
pnpm --filter web-portfolio dev
pnpm --filter lev-hedva-api build

# Add dependency to workspace
pnpm --filter web-portfolio add react

# Add dev dependency
pnpm --filter web-portfolio add -D typescript
```

### Turborepo

```bash
turbo run build --parallel
turbo run dev -- --port 3000
turbo run lint --filter=web-portfolio
```

## 📱 Frontend Apps

| שם                         | טכנולוגיה    | פורט | תיאור            |
| -------------------------- | ------------ | ---- | ---------------- |
| web-portfolio              | Vite + React | 5173 | פורטפוליו אישי   |
| lev-chedva-website         | Vite + React | 5174 | אתר המצפה לנתינה |
| emergency-protocol-diagram | Vite + React | 5175 | דיאגרמת פרוטוקול |
| online-converter           | Vite + React | 5176 | מערך המרה בחינם  |
| hebrew-schedule            | CRA          | 3000 | לוח זמנים עברי   |
| test-yourself              | CRA          | 3001 | אפליקציה בדיקה   |
| lev-chedva-admin           | CRA + MUI    | 3002 | ממשק מנהל        |

## 🖥️ Backend Apps

| שם                        | טכנולוגיה        | פורט | תיאור                    |
| ------------------------- | ---------------- | ---- | ------------------------ |
| emergency-protocol-server | Express + Prisma | 5000 | API ל-Emergency Protocol |
| uh-shoham-server          | Express + Prisma | 5001 | API שוהם                 |
| test-yourself-api         | Express          | 5002 | API בדיקות               |
| lev-hedva-api             | NestJS + Prisma  | 5003 | API Lev Hedva            |

## 🔗 Shared Packages

### @monorepo/shared-types

- API responses types
- User & Auth types
- Common interfaces

```typescript
import type { ApiResponse, User } from '@monorepo/shared-types';
```

### @monorepo/shared-utils

- String utilities (capitalize, slugify)
- Number utilities (formatNumber, clamp)
- Date utilities (formatDate)
- Array utilities (chunk, unique)
- Object utilities (pick, omit)

```typescript
import { capitalize, formatDate } from '@monorepo/shared-utils';
```

## 🔧 Configuration

### TypeScript

Base config ב-`configs/typescript/base.json`:

- ES2020 target
- Strict mode

ל-React: `configs/typescript/react.json`
ל-Node: `configs/typescript/node.json`

### ESLint

Base config ב-`configs/eslint/base.js`
React config: `configs/eslint/react.js`
Node config: `configs/eslint/node.js`

## 🚀 Getting Started

### 1. Clone and Install

```bash
cd /path/to/monorepo
pnpm install
```

### 2. Run in Development

```bash
# All apps
pnpm dev

# Specific app
pnpm --filter web-portfolio dev
```

### 3. Build

```bash
# All projects
pnpm build

# Specific project
pnpm --filter web-portfolio build
```

### 4. Add Dependencies

```bash
# To a workspace
pnpm --filter web-portfolio add axios

# To root (for dev tools)
pnpm add -D -w turbo
```

## 📝 Notes

- כל package.json צריך שדה `"name"` ייחודי
- scripts צריכים להיות עקביים בין הפרוייקטים
- Dependencies משותפות פועלות דרך pnpm workspaces

## 🚧 TODO

- [ ] Migrate CRA apps to Vite
- [ ] Setup CI/CD pipeline
- [ ] Add shared UI components package
- [ ] Setup monorepo documentation site
- [ ] Add E2E tests with Playwright

## 📞 Support

For questions or issues, check the individual app READMEs.

# monorepo-project-
