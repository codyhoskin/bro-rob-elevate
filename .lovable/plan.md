

## Fix: "P" cutoff in "SIMP" text

**Root cause**: The `style={{ transform: "rotate(-3deg)" }}` on the "Simp" text, combined with tight spacing, causes the rightmost letter "p" to get visually clipped — likely by the parent flex container or the adjacent emoji element.

**Fix (Hero.tsx)**:
1. Add more right padding to the "Simp" `motion.span` — change `pr-1` to `pr-3` to give the rotated "p" breathing room.
2. Add `overflow-visible` to the parent `<span className="flex items-center gap-1 sm:gap-2">` so the rotated text isn't clipped by the flex container.

These are minimal, targeted changes — just two class adjustments on lines 40 and 49.

