# GradientButton Component

A modern, accessible button component for Next.js applications that preserves the original gradient styling while adding enhanced functionality, TypeScript support, and accessibility features.

## Features

- ✅ **Gradient Styling**: Preserves the original CSS gradient effects (#43809b to #244452)
- ✅ **TypeScript Support**: Full type safety with comprehensive prop interfaces
- ✅ **Accessibility**: ARIA labels, keyboard navigation, focus management, reduced motion support
- ✅ **Loading States**: Built-in loading spinner and timeout handling
- ✅ **Error/Success States**: Visual feedback for different button states
- ✅ **Icon Support**: Flexible icon positioning with Lucide icons
- ✅ **Haptic Feedback**: Optional vibration feedback on mobile devices
- ✅ **Responsive Design**: Mobile-optimized with proper touch targets
- ✅ **Custom Hook**: Enhanced UX with `useGradientButton` hook

## Installation

The component is already included in your project. Make sure you have the required dependencies:

```bash
npm install lucide-react framer-motion class-variance-authority @radix-ui/react-slot
```

## Basic Usage

```tsx
import { GradientButton } from "@/components/ui/gradient-button";

export default function MyComponent() {
  return (
    <GradientButton onClick={() => console.log("Clicked!")}>
      Click Me
    </GradientButton>
  );
}
```

## Props Interface

```typescript
interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // Styling variants
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "default" | "lg" | "xl";
  
  // Icon configuration
  icon?: React.ReactNode;
  iconPosition?: "left" | "right" | "none";
  
  // State management
  loading?: boolean;
  loadingText?: string;
  loadingTimeout?: number;
  errorState?: boolean;
  successState?: boolean;
  
  // Layout
  fullWidth?: boolean;
  asChild?: boolean;
  
  // Enhanced UX
  hapticFeedback?: boolean;
  
  // Accessibility
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-expanded"?: boolean;
  "aria-pressed"?: boolean;
}
```

## Variants

### Primary (Default)
```tsx
<GradientButton variant="primary">
  Primary Button
</GradientButton>
```

### Secondary
```tsx
<GradientButton variant="secondary">
  Secondary Button
</GradientButton>
```

### Outline
```tsx
<GradientButton variant="outline">
  Outline Button
</GradientButton>
```

## Sizes

```tsx
<GradientButton size="sm">Small</GradientButton>
<GradientButton size="default">Default</GradientButton>
<GradientButton size="lg">Large</GradientButton>
<GradientButton size="xl">Extra Large</GradientButton>
```

## Loading States

```tsx
<GradientButton loading loadingText="Processing...">
  Submit
</GradientButton>

<GradientButton 
  loading 
  loadingTimeout={10000}
  onClick={async () => {
    await someAsyncOperation();
  }}
>
  Async Action
</GradientButton>
```

## Icon Usage

```tsx
import { Download, Send, Heart } from "lucide-react";

<GradientButton icon={<Download />} iconPosition="left">
  Download
</GradientButton>

<GradientButton icon={<Send />} iconPosition="right">
  Send Message
</GradientButton>

<GradientButton icon={<Heart />}>
  Like
</GradientButton>
```

## State Feedback

```tsx
<GradientButton errorState>
  Error State
</GradientButton>

<GradientButton successState>
  Success State
</GradientButton>
```

## Full Width

```tsx
<GradientButton fullWidth>
  Full Width Button
</GradientButton>
```

## Enhanced UX Features

```tsx
<GradientButton 
  hapticFeedback
  onClick={() => console.log("Clicked with haptic feedback!")}
>
  Haptic Button
</GradientButton>
```

## Accessibility Examples

```tsx
<GradientButton 
  aria-label="Save document"
  aria-describedby="save-help-text"
>
  Save
</GradientButton>

<GradientButton 
  aria-expanded={isMenuOpen}
  aria-pressed={isActive}
>
  Toggle Menu
</GradientButton>
```

## Integration Examples

### In Forms
```tsx
<form onSubmit={handleSubmit}>
  <GradientButton 
    type="submit" 
    loading={isSubmitting}
    loadingText="Submitting..."
    fullWidth
  >
    Submit Form
  </GradientButton>
</form>
```

### In Navigation
```tsx
<nav>
  <GradientButton 
    variant="outline" 
    size="sm"
    icon={<Home />}
    iconPosition="left"
  >
    Home
  </GradientButton>
</nav>
```

### Call-to-Action
```tsx
<section>
  <GradientButton 
    size="lg"
    icon={<ArrowRight />}
    iconPosition="right"
    hapticFeedback
  >
    Get Started
  </GradientButton>
</section>
```

## Custom Hook Usage

For advanced use cases, you can use the `useGradientButton` hook directly:

```tsx
import { useGradientButton } from "@/hooks/use-gradient-**button**";

function CustomButton() {
  const {
    isLoading,
    isPressed,
    handleClick,
    handleMouseDown,
    // ... other hook values
  } = useGradientButton({
    onClick: async () => {
      await someAsyncOperation();
    },
    hapticFeedback: true,
    loadingTimeout: 5000,
  });

  return (
    <button
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      className={`custom-button ${isPressed ? 'pressed' : ''}`}
    >
      Custom Implementation
    </button>
  );
}
```

## Styling Constants

The component exports styling constants for customization:

```tsx
import { GRADIENT_COLORS, SHADOW_CONFIG } from "@/components/ui/gradient-button";

// Access color values
const primaryGradient = GRADIENT_COLORS.primary;
const shadowConfig = SHADOW_CONFIG.default;
```

## Best Practices

1. **Use semantic HTML**: The component renders as a `<button>` by default
2. **Provide meaningful labels**: Always include descriptive text or `aria-label`
3. **Handle loading states**: Use the built-in loading functionality for async operations
4. **Consider reduced motion**: The component automatically respects `prefers-reduced-motion`
5. **Test keyboard navigation**: Ensure all interactive elements are keyboard accessible
6. **Use appropriate variants**: Choose variants that match your design system

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- Mobile browsers with touch event support
- Screen readers and assistive technologies

## Performance Considerations

- The component uses `React.memo` internally for optimal re-rendering
- Icons are lazy-loaded from Lucide React
- Animations respect user's motion preferences
- Haptic feedback is only enabled on supported devices
