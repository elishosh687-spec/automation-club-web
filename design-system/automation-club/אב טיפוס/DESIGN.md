```markdown
# Design System Specification: Silent Luxury & The Digital Sanctuary

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Sanctuary."** 

Unlike traditional tech interfaces that demand attention through loud colors and rigid borders, this system creates a premium, editorial environment that feels like a high-end physical gallery. We are moving away from "app-like" layouts toward a "journalistic" aesthetic. This is achieved through **intentional asymmetry**, where content isn't always perfectly centered, and **generous white space** that allows the typography to breathe. By overlapping high-contrast serif headlines with organic, subtle gradients, we create a sense of depth and "silent luxury"—a feeling that the interface is not just functional, but curated.

---

## 2. Colors: Tonal Depth over Structural Lines
Our palette is rooted in the interplay between deep obsidians (`#141312`) and warm, sand-toned neutrals (`#F3EBE1`). 

### The "No-Line" Rule
**Explicit Instruction:** You are prohibited from using 1px solid borders to define sections. Layout boundaries must be established solely through background color shifts. For instance, a `surface-container-low` section sitting on a `surface` background creates a sophisticated "block" without the visual clutter of a stroke.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of fine paper or frosted glass.
*   **Base:** `surface` (#141312)
*   **Nested Content:** Use `surface-container-low` through `surface-container-highest` to create "lift."
*   **Depth Strategy:** Place a `surface-container-lowest` card inside a `surface-container-low` section to create a soft, recessed effect. This "inward" depth mimics luxury watch packaging.

### The Glass & Gradient Rule
To avoid a flat, "out-of-the-box" Material look:
*   **Glassmorphism:** For floating elements (menus, navigation bars), use `surface` at 70% opacity with a `24px` backdrop blur.
*   **Signature Textures:** Apply a linear gradient from `primary` (#bec6e0) to `primary-container` (#0f172a) at a 45-degree angle for primary CTAs. This provides a metallic, tech-luxe finish.

---

## 3. Typography: The Editorial Contrast
The tension between the serif and sans-serif is what defines the premium nature of this design system.

*   **The Voice (Display/Headline):** Use **Newsreader**. This high-contrast serif conveys authority and heritage.
    *   *Rule:* Use `display-lg` for hero moments, allowing the descenders of the letters to almost touch the elements below them for an intentional, tight-kerning editorial look.
*   **The Utility (Body/Labels):** Use **Manrope**. This modern sans-serif provides the "tech" in "luxury tech."
    *   *Rule:* Keep body text restricted to `body-md` (#e6e1e0) to maintain a refined, quiet legibility.
*   **Hierarchy:** Large, expressive serifs act as "landmarks," while small, wide-tracked sans-serif labels act as "navigational breadcrumbs."

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "digital." We use atmospheric physics to define space.

*   **The Layering Principle:** Depth is achieved by stacking `surface-container` tiers. A `surface-container-highest` element against a `surface` background is our primary way of showing interaction readiness.
*   **Ambient Shadows:** If an element must float (e.g., a modal), use a shadow with a `48px` blur, `0%` spread, and `6%` opacity using the `on-surface` color. It should look like a soft glow, not a dark stain.
*   **The "Ghost Border" Fallback:** If accessibility requires a container edge, use the `outline-variant` token at **15% opacity**. Never use 100% opaque borders.
*   **Glassmorphism:** Use semi-transparent `surface-variant` colors to allow background tones to bleed through, softening the interface and making it feel integrated into the user's environment.

---

## 5. Components: Luxury Primitives

### Buttons
*   **Primary:** A subtle gradient from `primary` to `primary-container`. `9999px` (full) roundedness. No border.
*   **Secondary:** `surface-bright` background with `on-surface` text.
*   **Tertiary:** Text-only in `secondary` (#d6c4ac) with a small, 4px underline that appears only on hover.

### Input Fields
*   **Styling:** No bottom line or box. Use a `surface-container-low` background with a `sm` (0.125rem) corner radius.
*   **States:** On focus, the background shifts to `surface-container-high`. Avoid high-contrast color changes.

### Cards & Lists
*   **Strict Rule:** No dividers. Separate list items using `16px` of vertical white space or a subtle alternating shift between `surface` and `surface-container-low`.
*   **Interaction:** On hover, a card should transition its background color from `surface-container` to `surface-bright`.

### Signature Component: The "Biometric Data Ring"
For progress or data visualization, use a stroke-width of `2px` using the `secondary` color. This mimics the thin, elegant profile of premium jewelry.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use asymmetrical layouts (e.g., a headline aligned left with body text shifted 2 columns to the right).
*   **Do** prioritize `display-lg` typography for emotional impact over imagery.
*   **Do** use `secondary_container` (#544735) for subtle callouts to add warmth to the dark theme.

### Don't
*   **Don't** use pure `#000000`. Use our `surface` (#141312) to keep the blacks feeling "ink-like" and expensive.
*   **Don't** use standard "Success Green" or "Warning Yellow" at full saturation. Use muted, tonal versions that fit the palette.
*   **Don't** crowd the screen. If you feel like you need a divider line, you actually need more white space.

### Accessibility Note
While we prioritize "silent luxury," ensure that `on-surface` text against `surface` containers maintains a minimum contrast ratio of 4.5:1. Use `outline-variant` ghost borders when necessary to define input areas for low-vision users.```