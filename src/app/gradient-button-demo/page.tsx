// src/app/gradient-button-demo/page.tsx
"use client";

import { useState } from "react";
import { GradientButton } from "@/components/ui/gradient-button";
import {
    Download,
    Send,
    Heart,
    Home,
    ArrowRight,
    Settings,
    User,
    ShoppingCart,
    Play,
    Pause,
    Save,
    Trash2,
    Edit,
    Plus,
} from "lucide-react";

export default function GradientButtonDemo() {
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleAsyncAction = async () => {
        setIsLoading(true);
        try {
            // Simulate async operation
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-foreground">
                        GradientButton Component Demo
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        A comprehensive showcase of the GradientButton component
                        with all variants, sizes, states, and usage patterns.
                    </p>
                </div>

                {/* Variants Section */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold text-foreground">
                        Variants
                    </h2>
                    <p className="text-muted-foreground">
                        Notice the 3D text-shadow effect on Primary and
                        Secondary variants, preserving the original CSS design.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Primary</h3>
                            <GradientButton variant="primary">
                                Primary Button
                            </GradientButton>
                            <p className="text-sm text-muted-foreground">
                                ✅ Text-shadow: 1px 2px 1px #1f1f1f
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Secondary</h3>
                            <GradientButton variant="secondary">
                                Secondary Button
                            </GradientButton>
                            <p className="text-sm text-muted-foreground">
                                ✅ Text-shadow: 1px 2px 1px #1f1f1f
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Outline</h3>
                            <GradientButton variant="outline">
                                Outline Button
                            </GradientButton>
                            <p className="text-sm text-muted-foreground">
                                ❌ No text-shadow (clean outline style)
                            </p>
                        </div>
                    </div>
                </section>

                {/* Sizes Section */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold text-foreground">
                        Sizes
                    </h2>
                    <div className="flex flex-wrap items-center gap-4">
                        <GradientButton size="sm">Small</GradientButton>
                        <GradientButton size="default">Default</GradientButton>
                        <GradientButton size="lg">Large</GradientButton>
                        <GradientButton size="xl">Extra Large</GradientButton>
                    </div>
                </section>

                {/* Icons Section */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold text-foreground">
                        With Icons
                    </h2>
                    <p className="text-muted-foreground">
                        Text-shadow is applied to both text and icons in
                        Primary/Secondary variants. Icons inherit the same 3D
                        shadow effect as the text.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <GradientButton icon={<Download />} iconPosition="left">
                            Download
                        </GradientButton>
                        <GradientButton icon={<Send />} iconPosition="right">
                            Send Message
                        </GradientButton>
                        <GradientButton
                            icon={<Heart />}
                            iconPosition="left"
                            variant="secondary"
                        >
                            Like
                        </GradientButton>
                        <GradientButton
                            icon={<Home />}
                            iconPosition="left"
                            variant="outline"
                        >
                            Home
                        </GradientButton>
                        <GradientButton
                            icon={<Settings />}
                            iconPosition="right"
                        >
                            Settings
                        </GradientButton>
                        <GradientButton
                            icon={<User />}
                            iconPosition="left"
                            size="sm"
                        >
                            Profile
                        </GradientButton>
                    </div>
                </section>

                {/* Text-Shadow with Icons Test Section */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold text-foreground">
                        Text-Shadow Effect Test
                    </h2>
                    <p className="text-muted-foreground">
                        Comparing text-shadow application across different
                        variants and icon positions.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <GradientButton
                                variant="primary"
                                icon={<Download />}
                                iconPosition="left"
                            >
                                Primary + Icon
                            </GradientButton>
                            <p className="text-xs text-green-600">
                                ✅ Text + Icon shadow
                            </p>
                        </div>
                        <div className="space-y-2">
                            <GradientButton
                                variant="secondary"
                                icon={<Send />}
                                iconPosition="right"
                            >
                                Secondary + Icon
                            </GradientButton>
                            <p className="text-xs text-green-600">
                                ✅ Text + Icon shadow
                            </p>
                        </div>
                        <div className="space-y-2">
                            <GradientButton
                                variant="outline"
                                icon={<Heart />}
                                iconPosition="left"
                            >
                                Outline + Icon
                            </GradientButton>
                            <p className="text-xs text-red-600">
                                ❌ No shadow (clean)
                            </p>
                        </div>
                        <div className="space-y-2">
                            <GradientButton
                                variant="primary"
                                icon={<Settings />}
                            >
                                Icon Only
                            </GradientButton>
                            <p className="text-xs text-green-600">
                                ✅ Icon shadow
                            </p>
                        </div>
                    </div>
                </section>

                {/* Loading States Section */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold text-foreground">
                        Loading States
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <GradientButton loading loadingText="Processing...">
                            Static Loading
                        </GradientButton>
                        <GradientButton
                            loading={isLoading}
                            loadingText="Submitting..."
                            onClick={handleAsyncAction}
                        >
                            Async Action
                        </GradientButton>
                        <GradientButton loading variant="secondary">
                            Loading Secondary
                        </GradientButton>
                    </div>
                </section>

                {/* State Feedback Section */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold text-foreground">
                        State Feedback
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <GradientButton
                            errorState={showError}
                            onClick={() => {
                                setShowError(true);
                                setTimeout(() => setShowError(false), 2000);
                            }}
                        >
                            Trigger Error
                        </GradientButton>
                        <GradientButton
                            successState={showSuccess}
                            onClick={() => {
                                setShowSuccess(true);
                                setTimeout(() => setShowSuccess(false), 2000);
                            }}
                        >
                            Trigger Success
                        </GradientButton>
                        <GradientButton disabled>Disabled State</GradientButton>
                    </div>
                </section>

                {/* Full Width Section */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold text-foreground">
                        Full Width
                    </h2>
                    <div className="space-y-4">
                        <GradientButton fullWidth>
                            Full Width Primary
                        </GradientButton>
                        <GradientButton
                            fullWidth
                            variant="secondary"
                            icon={<ArrowRight />}
                            iconPosition="right"
                        >
                            Full Width with Icon
                        </GradientButton>
                    </div>
                </section>

                {/* Enhanced UX Section */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold text-foreground">
                        Enhanced UX
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <GradientButton
                            hapticFeedback
                            icon={<Play />}
                            iconPosition="left"
                            onClick={() =>
                                console.log("Haptic feedback triggered!")
                            }
                        >
                            Haptic Feedback
                        </GradientButton>
                        <GradientButton
                            loadingTimeout={3000}
                            onClick={async () => {
                                await new Promise((resolve) =>
                                    setTimeout(resolve, 1500),
                                );
                            }}
                        >
                            Custom Timeout
                        </GradientButton>
                    </div>
                </section>

                {/* Real-world Examples Section */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold text-foreground">
                        Real-world Examples
                    </h2>

                    {/* Form Example */}
                    <div className="bg-card p-6 rounded-lg border space-y-4">
                        <h3 className="text-lg font-medium">Form Actions</h3>
                        <div className="flex flex-wrap gap-3">
                            <GradientButton
                                icon={<Save />}
                                iconPosition="left"
                                variant="primary"
                            >
                                Save
                            </GradientButton>
                            <GradientButton
                                icon={<Edit />}
                                iconPosition="left"
                                variant="secondary"
                            >
                                Edit
                            </GradientButton>
                            <GradientButton
                                icon={<Trash2 />}
                                iconPosition="left"
                                variant="outline"
                            >
                                Delete
                            </GradientButton>
                        </div>
                    </div>

                    {/* E-commerce Example */}
                    <div className="bg-card p-6 rounded-lg border space-y-4">
                        <h3 className="text-lg font-medium">
                            E-commerce Actions
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            <GradientButton
                                icon={<ShoppingCart />}
                                iconPosition="left"
                                size="lg"
                            >
                                Add to Cart
                            </GradientButton>
                            <GradientButton
                                icon={<Heart />}
                                iconPosition="left"
                                variant="outline"
                            >
                                Wishlist
                            </GradientButton>
                            <GradientButton
                                icon={<ArrowRight />}
                                iconPosition="right"
                                variant="secondary"
                            >
                                Buy Now
                            </GradientButton>
                        </div>
                    </div>

                    {/* Navigation Example */}
                    <div className="bg-card p-6 rounded-lg border space-y-4">
                        <h3 className="text-lg font-medium">Navigation</h3>
                        <div className="flex flex-wrap gap-3">
                            <GradientButton
                                icon={<Plus />}
                                iconPosition="left"
                                size="sm"
                            >
                                New Item
                            </GradientButton>
                            <GradientButton
                                icon={<Settings />}
                                iconPosition="left"
                                variant="outline"
                                size="sm"
                            >
                                Settings
                            </GradientButton>
                            <GradientButton
                                icon={<User />}
                                iconPosition="left"
                                variant="secondary"
                                size="sm"
                            >
                                Profile
                            </GradientButton>
                        </div>
                    </div>
                </section>

                {/* Code Examples Section */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold text-foreground">
                        Code Examples
                    </h2>
                    <p className="text-muted-foreground">
                        Copy and paste these examples to get started with the
                        GradientButton component.
                    </p>

                    {/* Basic Usage */}
                    <div className="bg-card p-6 rounded-lg border space-y-4">
                        <h3 className="text-lg font-medium">Basic Usage</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <h4 className="text-sm font-medium text-muted-foreground">
                                    Preview
                                </h4>
                                <div className="flex gap-3">
                                    <GradientButton>Click Me</GradientButton>
                                    <GradientButton variant="secondary">
                                        Secondary
                                    </GradientButton>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <h4 className="text-sm font-medium text-muted-foreground">
                                    Code
                                </h4>
                                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                                    <code>{`import { GradientButton } from "@/components/ui/gradient-button";

<GradientButton>Click Me</GradientButton>
<GradientButton variant="secondary">Secondary</GradientButton>`}</code>
                                </pre>
                            </div>
                        </div>
                    </div>

                    {/* With Icons */}
                    <div className="bg-card p-6 rounded-lg border space-y-4">
                        <h3 className="text-lg font-medium">With Icons</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <h4 className="text-sm font-medium text-muted-foreground">
                                    Preview
                                </h4>
                                <div className="flex gap-3">
                                    <GradientButton
                                        icon={<Download />}
                                        iconPosition="left"
                                    >
                                        Download
                                    </GradientButton>
                                    <GradientButton
                                        icon={<Send />}
                                        iconPosition="right"
                                        variant="secondary"
                                    >
                                        Send
                                    </GradientButton>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <h4 className="text-sm font-medium text-muted-foreground">
                                    Code
                                </h4>
                                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                                    <code>{`import { Download, Send } from "lucide-react";

<GradientButton icon={<Download />} iconPosition="left">
  Download
</GradientButton>
<GradientButton icon={<Send />} iconPosition="right" variant="secondary">
  Send
</GradientButton>`}</code>
                                </pre>
                            </div>
                        </div>
                    </div>

                    {/* Loading States */}
                    <div className="bg-card p-6 rounded-lg border space-y-4">
                        <h3 className="text-lg font-medium">Loading States</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <h4 className="text-sm font-medium text-muted-foreground">
                                    Preview
                                </h4>
                                <div className="flex gap-3">
                                    <GradientButton
                                        loading
                                        loadingText="Processing..."
                                    >
                                        Submit
                                    </GradientButton>
                                    <GradientButton
                                        loading={isLoading}
                                        onClick={handleAsyncAction}
                                    >
                                        Async Action
                                    </GradientButton>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <h4 className="text-sm font-medium text-muted-foreground">
                                    Code
                                </h4>
                                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                                    <code>{`// Static loading
<GradientButton loading loadingText="Processing...">
  Submit
</GradientButton>

// Dynamic loading with async handler
const [isLoading, setIsLoading] = useState(false);

const handleAsync = async () => {
  setIsLoading(true);
  try {
    await someAsyncOperation();
  } finally {
    setIsLoading(false);
  }
};

<GradientButton loading={isLoading} onClick={handleAsync}>
  Async Action
</GradientButton>`}</code>
                                </pre>
                            </div>
                        </div>
                    </div>

                    {/* Form Integration */}
                    <div className="bg-card p-6 rounded-lg border space-y-4">
                        <h3 className="text-lg font-medium">
                            Form Integration
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <h4 className="text-sm font-medium text-muted-foreground">
                                    Preview
                                </h4>
                                <div className="space-y-3 max-w-sm">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                    <GradientButton
                                        fullWidth
                                        type="submit"
                                        icon={<Send />}
                                        iconPosition="right"
                                    >
                                        Subscribe
                                    </GradientButton>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <h4 className="text-sm font-medium text-muted-foreground">
                                    Code
                                </h4>
                                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                                    <code>{`<form onSubmit={handleSubmit}>
  <input
    type="email"
    placeholder="Enter your email"
    className="w-full px-3 py-2 border rounded-md"
  />
  <GradientButton
    fullWidth
    type="submit"
    loading={isSubmitting}
    loadingText="Subscribing..."
    icon={<Send />}
    iconPosition="right"
  >
    Subscribe
  </GradientButton>
</form>`}</code>
                                </pre>
                            </div>
                        </div>
                    </div>

                    {/* Advanced Features */}
                    <div className="bg-card p-6 rounded-lg border space-y-4">
                        <h3 className="text-lg font-medium">
                            Advanced Features
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <h4 className="text-sm font-medium text-muted-foreground">
                                    Preview
                                </h4>
                                <div className="flex gap-3">
                                    <GradientButton
                                        hapticFeedback
                                        successState={showSuccess}
                                        onClick={() => {
                                            setShowSuccess(true);
                                            setTimeout(
                                                () => setShowSuccess(false),
                                                2000,
                                            );
                                        }}
                                    >
                                        Success State
                                    </GradientButton>
                                    <GradientButton
                                        errorState={showError}
                                        onClick={() => {
                                            setShowError(true);
                                            setTimeout(
                                                () => setShowError(false),
                                                2000,
                                            );
                                        }}
                                    >
                                        Error State
                                    </GradientButton>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <h4 className="text-sm font-medium text-muted-foreground">
                                    Code
                                </h4>
                                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                                    <code>{`// State feedback
const [showSuccess, setShowSuccess] = useState(false);
const [showError, setShowError] = useState(false);

<GradientButton
  hapticFeedback
  successState={showSuccess}
  loadingTimeout={10000}
  onClick={async () => {
    try {
      await apiCall();
      setShowSuccess(true);
    } catch (error) {
      setShowError(true);
    }
  }}
>
  Submit with Feedback
</GradientButton>`}</code>
                                </pre>
                            </div>
                        </div>
                    </div>

                    {/* Import Statement */}
                    <div className="bg-card p-6 rounded-lg border space-y-4">
                        <h3 className="text-lg font-medium">Import & Setup</h3>
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                                    Component Import
                                </h4>
                                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                                    <code>{`import { GradientButton } from "@/components/ui/gradient-button";`}</code>
                                </pre>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                                    With Icons
                                </h4>
                                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                                    <code>{`import { GradientButton } from "@/components/ui/gradient-button";
import { Download, Send, Heart, Settings } from "lucide-react";`}</code>
                                </pre>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                                    Custom Hook (Advanced)
                                </h4>
                                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                                    <code>{`import { useGradientButton } from "@/hooks/useGradientButton";

function CustomButton() {
  const {
    isLoading,
    handleClick,
    handleKeyDown,
  } = useGradientButton({
    onClick: async () => {
      await someAsyncOperation();
    },
    hapticFeedback: true,
  });

  return (
    <button onClick={handleClick} onKeyDown={handleKeyDown}>
      Custom Implementation
    </button>
  );
}`}</code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Accessibility Section */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold text-foreground">
                        Accessibility Features
                    </h2>
                    <div className="bg-card p-6 rounded-lg border space-y-4">
                        <p className="text-muted-foreground">
                            All buttons include proper ARIA labels, keyboard
                            navigation, focus management, and respect
                            user&apos;s motion preferences.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <GradientButton
                                aria-label="Save document to cloud storage"
                                icon={<Save />}
                                iconPosition="left"
                            >
                                Save Document
                            </GradientButton>
                            <GradientButton
                                aria-describedby="delete-help"
                                icon={<Trash2 />}
                                iconPosition="left"
                                variant="outline"
                            >
                                Delete Item
                            </GradientButton>
                        </div>
                        <p
                            id="delete-help"
                            className="text-sm text-muted-foreground"
                        >
                            This action cannot be undone. Please confirm before
                            proceeding.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
