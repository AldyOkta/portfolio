# Contact section

Uses the color tokens, fonts, and copy rules from the main `DESIGN.md`. Change ONLY the Contact section. Do not touch other sections.

## Layout

NO card, NO two-column grid. A single centered column, `max-w-2xl mx-auto text-center`, directly on `--bg`. Do not use the custom cursor here.

## Order (top to bottom, nothing else)

1. **H2** (the only heading in this section)
   - EN: `Get in touch`
   - ID: `Mari Terhubung`
2. **Subtitle**, one sentence, 16px, `--text-muted`
   - EN: `Open to QA and software development roles, contracts, and testing projects.`
   - ID: `Terbuka untuk peluang kerja, kontrak, dan proyek pengujian maupun pengembangan software.`
3. **Email**, shown ONCE, 20px, `--text`, with a small "Copy" / "Salin" ghost button next to it (1px `--border`, 14px)
   - `oktavianoaldy777@gmail.com`
4. **Two buttons in one row** (stacked and full width on mobile), same height (48px) and radius (10px)
   - Primary: `Chat on WhatsApp` / `Chat WhatsApp`. Filled `--accent`, white text, arrow icon.
   - Secondary: `Send email` / `Kirim Email`. Transparent, 1px `--border`, `--text`. Opens `mailto:` with the same address.
5. **Text links**, one line, 14px, underlined, separated by `·`
   - `LinkedIn · GitHub`
   - LinkedIn: `linkedin.com/in/aldy-oktaviano-548174280`
   - GitHub: `TODO(Aldy)`: add the profile URL. If there is none, remove the GitHub link.
6. **Location**, 14px, `--text-muted`, plain text, no icon box, no border
   - `Central Java, Indonesia` / `Jawa Tengah, Indonesia`
   - `TODO(Aldy)`: the CV says Sukoharjo, the site says Surakarta. Use the same city as the hero.

## Rules

- Do NOT render the headings "Contact Me Directly" / "Hubungi Saya Langsung" or their paragraph.
- Email appears once. WhatsApp, Email, LinkedIn, and GitHub each appear once. Never duplicate a row or button.
- Exactly one filled button in the section (WhatsApp).
- Vertical rhythm: H2 → subtitle 12px, subtitle → email 32px, email → buttons 24px, buttons → links 24px, links → location 12px. Section padding `py-24`.
- Hover: buttons darken 6%, links change to `--accent`. No magnetic or scale effects.
- Mobile 375px: everything centered, buttons full width, the email may wrap at the `@`.
- Keep EN and ID copy in sync.

## Prompt for the agent

```
Read DESIGN-contact.md. Redesign ONLY the Contact section exactly as specified.
Use the CSS variables already defined in src/index.css. Do not change other sections.
When done, list what you changed, then stop.
```