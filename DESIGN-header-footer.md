# Header and footer

Scope: ONLY the navbar (header) and the footer. Do not touch other sections.
Colors come from `DESIGN_color.md`.

---

## Header (navbar)

### Layout

- Full-width bar, content inside the shared container `max-w-6xl mx-auto px-6`. Height 64px.
- Left: logo. Center/right: menu. Far right: language toggle. Nothing else on the first screen.
- `position: sticky; top: 0; z-index: 50`.

### Behavior

1. **At the top of the page:** transparent background, no border.
2. **After scrolling more than 8px:** background `--bg` at 90% opacity, 1px bottom border `--border`. No heavy blur, no shadow.
3. **"Download CV" button:** hidden while the hero's own "Download CV" button is visible. It appears in the navbar (fade in, 150ms) only after the hero button leaves the viewport. Use `IntersectionObserver` on the hero button. This keeps exactly one filled/accent CTA on the first screen.
4. **Active menu item:** follows the section currently in view (scroll-spy). The active item is `--text` with a 2px `--accent` underline; the others are `--text-muted`.
5. **Clicking a menu item:** smooth-scrolls to the section, with `scroll-margin-top: 80px` on each section so the heading is not hidden behind the bar. Respect `prefers-reduced-motion`.

### Content

| Element | EN | ID |
|---|---|---|
| Logo (mono, 15px, `--text`) | `aldyokta.my.id` | `aldyokta.my.id` |
| Menu 1 | About | Tentang |
| Menu 2 | Projects | Proyek |
| Menu 3 | Skills | Keahlian |
| Menu 4 | Experience | Pengalaman |
| Menu 5 | Certifications | Sertifikasi |
| Menu 6 | Contact | Kontak |
| CTA (after hero) | Download CV | Unduh CV |

- Menu text: 14px, weight 500, `--text-muted`, hover `--text`.
- CTA: transparent, 1px `--accent` border, `--accent` text, radius 10px, height 36px. Never filled in the navbar.
- Language toggle: plain text `EN | ID`, 14px; the active language is `--text` weight 600, the other `--text-muted`. No dropdown, no globe icon box. The choice persists in `localStorage` (wrapped in try/catch).

### Mobile (below 768px)

- Bar shows logo and a hamburger button (44x44px touch target, `aria-label` "Open menu" / "Buka menu").
- Opens a full-width panel under the bar on `--bg` with a 1px bottom border. Menu items stacked, 18px, 48px row height, then the language toggle, then "Download CV" (outline) at the bottom.
- Closes on item tap, on Escape, and on outside tap. Lock page scroll while open.

### Accessibility

- `<header>` with `<nav aria-label="Main">`.
- A "Skip to content" link as the first focusable element, visually hidden until focused (EN: `Skip to content`, ID: `Lewati ke konten`).
- Visible focus ring: 2px `--accent`, offset 2px.
- Active item has `aria-current="true"`.

---

## Footer

### Layout

- Full-width dark block, `--footer-bg`. Content inside `max-w-6xl mx-auto px-6`. Padding `py-14`, about 200px tall on desktop.
- Desktop: 3 columns (name block 5 cols, navigation 3 cols, contact 4 cols). Below: a 1px `rgba(255,255,255,0.12)` divider, then the bottom row.
- Mobile: columns stacked, 32px apart; the bottom row stacks too.

### Content

**Column 1: identity**
- Name: `Aldy Oktaviano` (18px, weight 600, `--footer-text`)
- Role line (14px, `--footer-muted`): `QA Tester & Frontend Developer`
- Do NOT add a slogan or "Portfolio" tagline.

**Column 2: navigation** (same labels as the header, 14px, `--footer-muted`, hover `--accent-on-dark`)
- EN: About · Projects · Skills · Experience · Certifications
- ID: Tentang · Proyek · Keahlian · Pengalaman · Sertifikasi
- Stacked vertically, one link per line.

**Column 3: contact** (14px)
- Email as full text: `oktavianoaldy777@gmail.com` (`--footer-text`, underlined on hover)
- `LinkedIn` → `linkedin.com/in/aldy-oktaviano-548174280`
- `GitHub` → `TODO(Aldy)`: add the profile URL; if there is none, remove this link.
- `WhatsApp` → the existing WhatsApp link
- `Download CV` / `Unduh CV` → the existing CV file
- Links are text with labels. No icon-only links.

**Bottom row**
- Left: `© 2026 Aldy Oktaviano` (13px minimum, `--footer-muted`)
- Right: back-to-top button, text `Back to top ↑` / `Kembali ke atas ↑`, 14px, `--footer-muted`, hover `--accent-on-dark`. Not a floating circle.
- Optional, only if true: a small `Built with React, Vite, and Tailwind CSS` line next to the copyright.

### Colors

- Background `--footer-bg`; main text `--footer-text`; secondary text `--footer-muted`; link hover `--accent-on-dark`.
- Never use `--accent` (`#96551f`) on the footer; its contrast on dark is too low.

### Accessibility

- `<footer>` landmark. Footer navigation wrapped in `<nav aria-label="Footer">`.
- Link text must be real text (not icon-only), with a visible focus ring in `--accent-on-dark`.

---

## Rules summary

- Exactly one accent CTA per viewport: hero "Download CV" at first; the navbar one appears only after it scrolls away.
- Header height 64px, footer about 200px; no extra rows, banners, or social icon walls.
- EN and ID copy stay in sync.
- No custom cursor, no preloader, no magnetic effect in the header or footer.

## Prompt for the agent

```
Read DESIGN-header-footer.md and DESIGN_color.md.
Implement ONLY the header (navbar) and footer as specified. Do not change other sections.
Use the CSS variables already defined in src/index.css; add --accent-on-dark and --footer-* if missing.
Keep EN/ID copy in sync. When done, list the files you changed, then stop.
```
