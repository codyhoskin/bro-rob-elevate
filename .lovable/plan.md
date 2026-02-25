

## Plan

### 1. Add "Custom Packages" title above the pricing card
In `PricingCard.tsx`, add a comic-styled section heading like "Custom Packages" above the card, using `font-display`, `comic-text-stroke`, and large sizing to make it pop. This sits outside the card itself, centered above it.

### 2. Move comic background image behind hero, overflowing into pricing
In `Index.tsx`:
- Remove the dedicated comic-story bridge `<div>` section (the `clamp(300px, 40vw, 500px)` container).
- Instead, wrap the Hero and PricingCard in a shared container with `relative` positioning.
- Place the comic-story image as an `absolute` element within that container, positioned to start behind the hero and extend down into the pricing section. It will be faded (`opacity-[0.12]`), rotated at an angle (`-8deg`), and placed off to the right side with gradient fade overlays so it blends seamlessly.

### Files changed
- `src/pages/Index.tsx` — remove bridge section, add shared wrapper with background image
- `src/components/PricingCard.tsx` — add "Custom Packages" heading above the card

