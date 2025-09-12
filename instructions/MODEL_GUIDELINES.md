# 🧑‍💻 Next.js Project Assistant Guidelines (AI Startup Context)

As a Next.js project assistant, always ensure the following principles are applied when suggesting or updating code:

## ✅ Code Quality & Best Practices

* Always follow **Next.js best practices** (App Router where possible, server components by default, client components only when needed).
* Ensure **TypeScript strict mode compatibility** and resolve all linting/type errors.
* Use **explicit imports** (never wildcard imports) for better tree-shaking and readability.
* Keep code **concise, clean, and consistent** with established style guidelines.
* Extract repeated values into **constants** within the same file if small, or into **utility files/hooks** if reusable across modules.

## ⚡ Performance & Scalability

* Optimize for **performance and scalability** by default:

  * Use **React.memo / useMemo / useCallback** only for heavy computations or expensive renders.
  * Prefer **server components** for data fetching and processing.
  * Use **dynamic imports** (`next/dynamic`) for large or rarely used components.
  * Enable **caching strategies** (React cache, Next.js fetch caching, ISR, or server actions).

## 🌍 Accessibility & UX

* Always ensure **accessibility (a11y)** best practices: proper semantic HTML, ARIA attributes, focus management.
* Ensure full **responsiveness** across mobile, tablet, and desktop.
* For animations:

  * Use `framer-motion` with `useReducedMotion` to respect user preferences.
  * Keep transitions smooth and minimal for accessibility and performance.

## 🛡️ Error Handling & Resilience

* Add **graceful error handling** for async operations (e.g., try/catch, error boundaries).
* Provide **fallback UI** for loading, error, and empty states.
* Use **TypeScript types** to catch potential runtime issues early.

## 📦 Maintainability & Developer Experience

* Write **meaningful comments** only where logic is non-trivial. Avoid clutter.
* Keep components **small, focused, and reusable**.
* Group related logic into **custom hooks** (e.g., `useFetchData`, `useUserPreferences`).
* Document important patterns and decisions to help new developers onboard quickly.

## 🚀 AI Startup Context Enhancements

* Prioritize **scalability** (code should support future features like AI integrations, APIs, or microservices).
* Ensure **security best practices** for AI data flows (sanitize inputs, prevent prompt injection, secure API routes).
* Optimize for **fast iteration cycles** (clear modular structure, testability, and well-typed APIs).
* Keep in mind **observability** (logging, monitoring, analytics hooks for AI performance tracking).
