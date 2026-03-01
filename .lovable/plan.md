

## Problem Analysis

The cursor/click glitch is caused by the **infinite breathing animation** on the pricing card container in `PricingCard.tsx` (lines 202-211):

```js
animate={isMaxCommit ? {
  scale: [1, 1.005, 1],
  rotate: [0, 0.15, -0.15, 0],
} : {}}
transition={isMaxCommit ? { repeat: Infinity, duration: 2.5, ease: "easeInOut" } : {}}
```

This continuously animates `scale` and `rotate` on the **parent container** of all interactive elements. As Framer Motion applies transforms every frame, the browser's hit-testing recalculates element positions, causing buttons and clickable elements to briefly become unresponsive or shift under the cursor.

A secondary contributor is the **infinite text-shadow animation** on the price display (lines 336-345), which triggers constant repaints.

## Plan

1. **Remove the infinite scale/rotate breathing animation** from the pricing card wrapper (`motion.div` at line 202). Replace with a static state or a much subtler CSS-only effect (like a box-shadow pulse) that doesn't affect layout/transforms.

2. **Remove or simplify the infinite text-shadow animation** on the price amount (line 336-345). Use a static text-shadow instead of a continuously animating one.

These two changes will eliminate the constant transform recalculations that cause pointer-event flicker across the entire pricing section.

