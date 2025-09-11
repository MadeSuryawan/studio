# File: src/index.css

- Sections:

1. Theme tokens: :root and .dark
2. Base layer: resets and bg/text wiring
3. Neumorphism utilities: .neumorphic-\* classes
4. Theme tokens (global look)

- Adjust these to shift the entire visual theme quickly.
- Location: src/index.css → :root (light) and .dark (dark)
- Key tokens:
- Surface and text: --background, --foreground
- Primary brand: --primary, --primary-foreground
- Neutrals: --secondary, --muted, --accent (+ their -foreground)
- Borders/inputs: --border, --input, --ring
- Radius: --radius (base), derived: --radius-sm/md/lg/xl
- Optional: chart and sidebar tokens
- Tips:
- Softer light theme: lighten --background, lower contrast on --border
- High-contrast dark theme: darken --background, increase --ring saturation
- Rounded vs. sharp UI: raise or lower --radius (e.g. 0.625rem → 0.5rem)

## Base layer behavior

- All components inherit from tokens:
- body uses bg-background and text-foreground
- Borders and focus rings reference border and ring tokens
- Effect: Once tokens change, the entire UI adapts consistently.

1. Neumorphism utilities (ready-to-use classes)
   Use these classes directly on elements. Each has light/dark tuned shadows.

- .neumorphic-card
- Raised surface with both inset and outer shadows
- For containers, cards, sections
- .neumorphic-button
- Raised by default; hover/active simulate press with inset shadows
- For neutral action buttons
- .neumorphic-button-primary
- Same behavior as .neumorphic-button with bg-primary and text-primary-foreground
- For primary CTAs
- .neumorphic-input
- Sunken look for input fields with inset shadows
- .neumorphic-logo
- Subtle outer shadows for emblem/logotype containers
- .neumorphic-hero-image
- Large outer shadows to float hero visuals
- .neumorphic-floating-card
- Lighter, translucent raised effect (bg-background/90)
- .neumorphic-icon-container
- Recessed/inset well for icons
- .neumorphic-cta-card
- Stronger callout with combined inset + outer shadows

## Shadow tuning quick recipes

- Make everything softer
- Reduce offsets/blur: 10px → 6–8px
- Lighten opacities slightly (e.g., 0.8 → 0.6)
- Make everything pop more
- Increase offsets/blur: 5–10px → 10–14px
- Slightly raise opacities (e.g., 0.4 → 0.5)
- Flatter look (less “pillowy”)
- Remove one inset layer or reduce both inset and outer opacities
- More separation from background
- Darken --border slightly and increase outer shadow opacity

## Light vs dark parity

- When changing shadows in light mode, mirror the idea in the .dark blocks with lower opacities.
- Dark mode should have smaller/tighter shadows to avoid muddy visuals.

## Radius and shape

- Global roundness: edit --radius in :root and .dark
- Derived sizes (--radius-sm/md/lg/xl) update automatically
- For sharper look, bring --radius closer to 0.375rem; for softer, ~0.75rem+

## Usage examples

- Card: class="neumorphic-card rounded-xl p-6">
- Primary button: class="neumorphic-button-primary">Buy now
- Input: class="neumorphic-input rounded-md px-3 py-2"
- Icon well: class="neumorphic-icon-container p-3 rounded-lg">

## Common pitfalls

- Changing only :root but not .dark can cause mismatched visuals in dark mode.
- Overly strong shadows in dark mode can look muddy—use lower opacities and smaller offsets.
- If accents look dull, increase --ring or slightly increase contrast between --background and --border.

## Fast theming workflow

1. Pick your palette: set --background, --foreground, --primary first.
2. Adjust --border and --input for perceived depth (slightly different from --background).
3. Tweak shadow strengths in the utilities for your desired softness.
4. Mirror the adjustments in .dark with smaller offsets and lower opacities.
