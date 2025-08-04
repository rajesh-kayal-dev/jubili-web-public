# Architecture Overview
This document serves as a critical, living template designed to equip agents with a rapid and comprehensive understanding of the codebase's architecture, enabling efficient navigation and effective contribution from day one. Update this document as the codebase evolves.

## 1. Project Structure
This section provides a high-level overview of the project's directory and file structure, categorized by architectural layer or major functional area. It is essential for quickly navigating the codebase, locating relevant files, and understanding the overall organization and separation of concerns.

### 📁 jubili-web-public (Next.js Frontend)
The frontend is a modern, responsive e-commerce client built using **Next.js App Router**, with strong separation of concerns across presentation, logic, and services.


[jubili-web-public]/              # Frontend client (Next.js App Router based)
├── .env.example                  # Example environment variables
├── .env.local                    # Local environment config (ignored by git)
├── .gitignore                    # Git ignore rules
├── README.md                     # Project overview and usage guide
├── ARCHITECTURE.md               # Project structure and design rules (this file)
├── eslint.config.mjs            # ESLint rules for code quality
├── next-env.d.ts                # Next.js auto-generated TypeScript declarations
├── next.config.ts               # Next.js configuration file
├── package.json                 # Project dependencies and scripts
├── package-lock.json            # Dependency tree lock file
├── postcss.config.mjs           # PostCSS config used by Tailwind
├── tailwind.config.ts           # Tailwind CSS theme configuration
├── tsconfig.json                # TypeScript project settings
├── public/                      # Publicly accessible assets
│   ├── file.svg, globe.svg, ... # SVG assets used in UI
│   ├── icons/                   # UI icon assets
│   └── images/                  # Logo and other images
├── src/                         # All source code lives here
│   ├── app/                     # App Router (Next.js routing, pages, layouts)
│   │   ├── layout.tsx           # Global layout
│   │   ├── page.tsx             # Root home page
│   │   ├── globals.css          # Global styles
│   │   ├── [routes]/            # Feature routes like /login, /signup, etc.
│   ├── components/              # Reusable and feature-specific UI components
│   │   ├── layout/              # Layout-specific components (Navbar, Authbar)
│   │   ├── product/             # Product-related components (ProductCard)
│   │   ├── shared/              # Shared components like modals/popups
│   │   └── ui/                  # Generic styled components (Button, etc.)
│   ├── hooks/                   # Custom React hooks (auth, actions, etc.)
│   ├── lib/                     # Shared utilities and integrations
│   │   ├── api/                 # Low-level API wrappers (e.g., for products)
│   │   ├── constants/           # Static config values (e.g., API endpoints)
│   │   └── types/               # Shared TypeScript types/interfaces
│   ├── services/                # Business logic and high-level API functions
│   │   ├── auth.service.ts      # Auth-related API logic
│   │   ├── product.service.ts   # Product-related API logic
│   │   └── userActions.service.ts # Other user interactions
│   ├── store/                   # State management (e.g., Redux, Zustand)
│   ├── styles/                  # Tailwind CSS setup or custom styles
│   └── utils/                   # General-purpose utilities (e.g., storage)
└── .git/                        # Git metadata and commit history


## 🧱 Architecture Pattern

1. **UI → Hook → Service → Lib**
   - UI never calls services or fetch directly.
   - Hooks orchestrate behavior and state.
   - Services handle API calls and logic.
   - Lib handles fetch, base URLs, types, etc.

2. **File Naming Conventions**
   - Hooks: `useLogin.ts`, `useCart.ts`
   - Services: `auth.service.ts`, `cart.service.ts`
   - Components: `LoginForm.tsx`, `ProductCard.tsx`
   - Lib: `fetcher.ts`, `endpoints.ts`, `types.ts`

3. **Code Style**
   - Use **single quotes**
   - **Semicolons required**
   - Keep imports **sorted**
   - Use **`interface`** over `type` for objects