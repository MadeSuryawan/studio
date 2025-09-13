# Naming Conventions for BaliBlissed Next.js Project

This document outlines the naming conventions to be followed across the project for TypeScript, React, and Next.js development. Consistent naming is crucial for maintaining code readability, scalability, and collaboration.

## Table of Contents

1. **General TypeScript**
    - Variables and Functions
    - Classes
    - Interfaces and Types
    - Enums
2. **React**
    - Components
    - Hooks
    - Props
3. **Next.js**
    - Pages and Routes
    - API Routes
4. **Constants**
5. **File Naming**
6. **CSS**

---

### 1. General TypeScript

#### Variables and Functions

- **camelCase**: Use `camelCase` for all variables and functions.

```typescript
// Correct
const userProfile = {};
function getUserProfile() {
  // ...
}

// Incorrect
const UserProfile = {};
function GetUserProfile() {
  // ...
}
```

#### Classes

- **PascalCase**: Use `PascalCase` for class names.

```typescript
// Correct
class ApiClient {
  // ...
}

// Incorrect
class apiClient {
  // ...
}
```

#### Interfaces and Types

- **PascalCase**: Use `PascalCase` for interfaces and type aliases.
- For component props, suffix the name with `Props`.

```typescript
// Correct
interface User {
  id: string;
  name: string;
}

type UserId = string;

interface GradientButtonProps {
  variant: "primary" | "secondary";
}

// Incorrect
interface user {
  // ...
}
type userId = string;
```

#### Enums

- **PascalCase**: Use `PascalCase` for enum names and their members.

```typescript
// Correct
enum UserRole {
  Admin,
  Editor,
  Viewer,
}

// Incorrect
enum userRole {
  admin,
  editor,
  viewer,
}
```

---

### 2. React

#### Components

- **PascalCase**: Component names must be in `PascalCase`. This applies to both function and class components.

```tsx
// Correct
function HeroSection() {
  return <div>...</div>;
}

// Incorrect
function heroSection() {
  return <div>...</div>;
}
```

#### Hooks

- **camelCase with `use` prefix**: Custom hooks must start with the `use` prefix and be written in `camelCase`.

```tsx
// Correct
import { useState } from 'react';

function useGradientButton(props) {
  const [isPressed, setIsPressed] = useState(false);
  // ...
  return { isPressed };
}

// Incorrect
function gradientButtonHook(props) {
  // ...
}
```

#### Props

- **camelCase**: Prop names should always be in `camelCase`.
- **PascalCase** for prop interfaces, as mentioned above.

```tsx
// Correct
<GradientButton loadingText="Processing..." fullWidth={true} />

// Incorrect
<GradientButton LoadingText="Processing..." FullWidth={true} />
```

---

### 3. Next.js

#### Pages and Routes

- **kebab-case**: Directory and file names within the `src/app` directory that define routes should be in `kebab-case`.
- The main page file should be named `page.tsx`.

```plain text
src/app/
├── private-car-charter/
│   └── page.tsx         // Route: /private-car-charter
└── sign-up/
    └── page.tsx         // Route: /sign-up
```

#### API Routes

- **kebab-case**: API route files and directories should also be in `kebab-case`.
- The main route handler file should be named `route.ts`.

```plain text
src/app/
└── api/
    └── send-email/
        └── route.ts     // API Endpoint: /api/send-email
```

---

### 4. Constants

- **SCREAMING_SNAKE_CASE**: Use `SCREAMING_SNAKE_CASE` for global constants or configuration variables that are hardcoded and reused across the application.

```typescript
// Correct
export const GRADIENT_COLORS = {
  primary: "linear-gradient(...)",
};

export const API_BASE_URL = "https://api.example.com";

// Incorrect
export const gradientColors = { ... };
export const apiBaseUrl = "...";
```

---

### 5. File Naming

- **Components**: `kebab-case.tsx` (e.g., `gradient-button.tsx`, `navbar-flow.tsx`)
- **Hooks**: `use-hook-name.ts` (e.g., `use-gradient-button.ts`)
- **Types**: `types.ts` or `kebab-case.d.ts` (e.g., `chat.ts`)
- **Services/Utilities**: `kebab-case.ts` (e.g., `package-service.ts`, `utils.ts`)

---

### 6. CSS

- **kebab-case**: Use `kebab-case` for CSS class names.
- **BEM-like structure**: While not strictly enforced, a BEM-like structure is encouraged for clarity (e.g., `card__title`, `card--dark`).
- **CSS Variables**: Custom properties (variables) should be prefixed with `--` and written in `kebab-case`.

```css
/* Correct */
.neumorphic-card {
  /* ... */
}

.neumorphic-button--primary {
  /* ... */
}

:root {
  --primary-foreground: #ffffff;
}
