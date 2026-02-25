

## Issues and Fixes

### 1. Button Glitching (Clickability Issues)

The buttons use `motion.button` with `whileInView` animations that re-trigger on scroll, causing layout shifts and momentary unclickability. The duration buttons also sit behind the "Best Value" badge (`relative z-0`) which can intercept clicks.

Fixes:
- Remove `relative z-0` from duration buttons — the `pointer-events-none` on the badge already prevents it from blocking clicks, but the z-index stacking is causing issues
- Add `e.stopPropagation()` to button click handlers to prevent event bubbling conflicts with parent motion elements
- Ensure the CTA button and toggle are not affected by parent `AnimatePresence` re-renders

### 2. Show Amount Saved When Paying In Full

Currently, lines 291-296 show savings for the 1-month plan (which has no discount — both prices are $199, so it shows "Save $0"). This block should be removed since 1-month has no discount.

For multi-month plans, the existing upfront display (lines 278-282) shows the crossed-out original and the discounted total, but doesn't explicitly state the savings amount.

Changes:
- Remove the broken 1-month savings display (lines 291-296)
- Add a "You save $X" line to the multi-month upfront display, calculated as `originalTotal - total`
- Style the savings text in green/brand-blue to make it prominent

### 3. AnimatedPrice Ref Warning

The console shows a warning about `AnimatedPrice` receiving a ref from `AnimatePresence`. Fix by not wrapping it in a way that passes refs, or wrap with `forwardRef`.

## Files to Edit

**`src/components/PricingCard.tsx`**:
- Duration buttons: remove `relative z-0`, add `e.stopPropagation()` to onClick
- Pay style toggle/labels: add `e.stopPropagation()`
- CTA button: add `e.stopPropagation()`
- Lines 276-296: Replace savings display logic — show "You save $X!" for multi-month upfront plans, remove the broken 1-month savings block
- `AnimatedPrice`: wrap with `React.forwardRef` to fix the console warning

