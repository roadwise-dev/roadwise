# Roadwise Design System

This document outlines the core design principles and styling rules for the Roadwise landing page and marketing materials. Following these guidelines ensures a consistent, premium, and modern aesthetic across the product.

## 1. Core Aesthetic Principles

- **Attio-Inspired Minimalism:** The design should feel extremely clean, modern, and uncluttered.
- **High Contrast (Brutalist-Lite):** We rely heavily on stark black and white contrasts (e.g., solid `bg-foreground` vs `bg-background`). Avoid soft, muddy grays for primary structural elements.
- **Visuals over Text:** Communicate features using interactive mockups, abstract UI elements, and layout animations rather than long paragraphs of text.

## 2. Shadows & Depth (The "Zero Shadows" Rule)

- **Rule:** Do **NOT** use CSS shadows (`shadow-sm`, `shadow-lg`, etc.).
- **Depth Creation:** Depth and separation are achieved exclusively through solid borders (`border-border`, `border-foreground`) and contrasting background colors (`bg-muted/10`, `bg-foreground`).

## 3. Border Radii (The "Concentric" Rule)

To ensure nested elements fit together perfectly, we follow a strict hierarchy for rounded corners:

- **Level 1 (Outer Containers): `rounded-3xl`**
  - Use for top-level structural cards (e.g., Bento grid main cards, Pricing plans, Customer testimonial cards).
- **Level 2 (Inner Cards): `rounded-2xl` or `rounded-xl`**
  - Use for nested mockups and panels inside a Level 1 container (e.g., a mock Slack message or an embedded UI window).
- **Level 3 (Small Elements): `rounded-lg` or `rounded-full`**
  - Use for buttons, input fields, badges, tags, and avatars.

## 4. Typography

- **Headings:** Large, bold, and tightly tracked (e.g., `tracking-tight`). 
- **Metrics/Pricing:** Extremely large (e.g., `text-6xl`), demanding attention without being boxed into traditional cards.
- **Text Variables:** Always use semantic Tailwind variables (`text-foreground`, `text-muted-foreground`) to guarantee native Dark Mode support.

## 5. Layout & Spacing

- **Standard Container:** Use the class combo `max-w-[1120px] mx-auto px-5` for all main section wrappers to ensure consistent alignment.
- **Asymmetry:** Favor asymmetrical layouts (like the Bento Grid or Masonry layouts) over traditional, symmetrical 3-column grids.

## 6. Colors & Theming

- No hardcoded colors (like `bg-white` or `text-black`). 
- **Valid Classes:** `bg-background`, `bg-foreground`, `bg-muted`, `border-border`, `text-foreground`, `text-muted-foreground`.
- **Accents:** Occasional subtle gradients (`bg-gradient-to-t from-muted/50 to-transparent`) are acceptable for masking or fading out backgrounds.

## 7. Motion & Interaction

- **Framer Motion:** Use `motion/react` for all major layout transitions.
- **Entry Animations:** Elements should slide up slightly while fading in (`initial={{ opacity: 0, y: 20 }}`).
- **Micro-interactions:** Interactive elements (like buttons or cards) should have hover states (e.g., `hover:border-foreground/30`, `hover:-translate-y-2`) to make the UI feel alive.

## 8. Icons

- Use `lucide-react`. 
- Keep them visually balanced (usually `size-5` or `size-6`).
- Embed icons within rounded squares or circles (`rounded-xl` or `rounded-full`) with a muted background to make them pop as visual anchors.
