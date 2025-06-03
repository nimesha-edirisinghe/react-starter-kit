# React + TanStack Starter Project Setup

Welcome to the **React Starter Kit** powered by:

- **React**
- **TypeScript**
- **TanStack Router**
- **TanStack Query**
- **Zustand**
- **Tailwind CSS**
- **Shadcn UI**
- **Axios**
- **Vitest**

## 1. Prerequisites

Make sure you have the following tools installed:

- **Node.js** ≥ 18.x
- **pnpm** ≥ 8.x — [Install pnpm](https://pnpm.io/installation)
- **Git** ≥ 2.x

## 2. Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/nimesha-edirisinghe/react-starter-kit.git
cd react-starter-kit
pnpm install
```

## 3. Development

To start the local dev server:

```bash
pnpm dev
```

Then open [https://localhost:3000](https://localhost:3000) in your browser.

## 4. Testing

Run unit tests using [Vitest](https://vitest.dev/):

```bash
pnpm test
```

## 5. Useful Commands

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `pnpm dev`          | Start dev server                     |
| `pnpm build`        | Build for production                 |
| `pnpm lint`         | Run ESLint checks                    |
| `pnpm format`       | Run Prettier formatting              |
| `pnpm test`         | Run unit tests                       |
| `pnpm prepare`      | Setup Husky git hooks                |

---

# Folder Structure

![alt text](src/assets/docs/folder-structure.png)

# Explanation of Your Folder Structure

#### Root-Level Config Files

- `.eslintrc`, `.prettierrc`, `eslint.config.js` : Code linting and formatting
- `tsconfig.json` : TypeScript configuration
- `postcss.config.mjs` : PostCSS config
- `vite.config.ts`: Vite setup (used under TanStack Start)
- `vitest.config.ts` : Configuration file for [Vitest](https://vitest.dev/)
- `.env` : Environment variable file to define app configuration values (e.g., API keys, secrets, URLs) outside of source code

#### 📁`.husky/` 📁`.vscode/`

>

- `.husky/` : Git hooks directory used to automate tasks like running linters or tests before commits or pushes (e.g., `pre-commit`, `pre-push`)
- `.vscode/` : Project-specific settings and extensions

## `src/` - Main Application Code

#### 📁 `api/`

>

- `interceptors/` : Axios request/response interceptors for authentication, error handling
- `mutations/` : TanStack Query mutation definitions for data modification
- `queries/` : TanStack Query query definitions for data fetching
- `services/` : API service functions and endpoint definitions
- `client.ts` : Axios client configuration
- `index.ts` : API exports and barrel file

#### 📁 `components/`

>

- `common/` - Reusable UI components used across the app
- `feedback/` - A dedicated folder for **user feedback UI**, ( Error boundaries, 404 Not Found pages,API-specific error states )
- `icons/` - Custom icon components
- `layout/` - Layout wrapper components (navbar, sidebars, etc.)
- `ui/` - Shadcn/ui components (buttons, forms, input, etc.)

#### 📁 `features/`

>

- Feature-based organization where each feature contains its own components, hooks, and logic

#### 📁 `lib/`

>

- Utility functions and helpers

#### 📁 `mocks/`

>

- `fixtures/` - Static data for mocks
- `handlers/` - Domain-specific MSW handlers
- `handlers.ts` - Combines all handlers
- `browser.ts` - Sets up the MSW service worker in dev

#### 📁 `routes/`

>

- `_protected/` - Protected routes requiring authentication
- `_public/` - Public routes accessible without authentication
- `__root.tsx` - Root route component
- `_protected.tsx` - Protected route layout
- `index.tsx` - This is the default route shown when someone visits your domain root (e.g., `http://localhost:3000/` or `yourdomain.com/`)

#### 📁 `routes/`

- Zustand store definitions for global state management

#### 📁 `styles/`

- Global CSS and Tailwind configurations

#### 📁 `test/`

- Test utilities and setup files

#### 📁 `utils/`

- General utility functions and helpers
