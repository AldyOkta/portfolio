# Color hierarchy

Scope: colors only. Do not change layout, copy, or animation. Apply these rules to every section.
Core idea: accent brown is rare. Hierarchy comes from four text tiers, not from color everywhere.

## Tokens

```css
:root {
  /* surfaces */
  --bg: #f6f3ee;            /* page background */
  --surface: #ffffff;       /* cards */
  --surface-2: #efeae2;     /* section band, tags, icon boxes, ghost buttons */
  --border: #d6cfc2;        /* card and button borders (stronger than before) */

  /* text tiers */
  --text: #1c1f26;          /* tier 1: headings, card titles, role names */
  --text-body: #3a404c;     /* tier 2: paragraphs, bullets */
  --text-muted: #5b6270;    /* tier 3: dates, company, tags, labels, location */

  /* accent (tier 4, rare) */
  --accent: #96551f;
  --accent-on-dark: #d9a066; /* accent on the dark footer only */

  /* status */
  --pass: #1f7a4a;          /* status chips only */
  --info: #2f5fb3;

  /* footer */
  --footer-bg: #1c1f26;
  --footer-text: #e8e6e3;
  --footer-muted: #a3a9b5;

  /* dot-grid hero */
  --dot: rgba(28, 31, 38, 0.10);
  --dot-active: #96551f;
}
```

## The four tiers

| Tier | Role | Token | Use for |
|---|---|---|---|
| 1 | Emphasis | `--text` | H1, H2, card titles, role names, email address |
| 2 | Reading | `--text-body` | Paragraphs, experience bullets, card descriptions |
| 3 | Support | `--text-muted` | Dates, company names, tags, small labels, location, footer-line text in cards, icons |
| 4 | Accent (rare) | `--accent` | Only what is listed under "Accent allowed" |

## Accent allowed (and nothing else)

1. ONE filled button per viewport (hero: "Download CV"; contact: "WhatsApp").
2. Active nav item underline and navbar "Download CV" outline.
3. Inline text links inside paragraphs (underlined).
4. Hover state of links and buttons.
5. Cursor-reactive dots in the hero dot-grid (`--dot-active`).

Accent is NOT allowed on: icons, tags, dates, company names, skill labels, card eyebrows, check marks, borders, section subtitles, or the hero subtitle.

Hard limit: max 3 accent elements visible in one 1080px-high viewport. If a screenshot shows more, remove accent from the lowest-priority ones.

## Element-to-color map

**Navbar**: logo `--text`; links `--text-muted`, hover `--text`; active link `--text` with 2px `--accent` underline; "Download CV" = transparent, 1px `--accent` border, `--accent` text.

**Hero**: background `--bg`; H1 `--text`; subtitle ("QA Tester & Frontend Developer") `--text-body`, weight 600; eyebrow and location `--text-muted`; paragraph `--text-body`; primary button filled `--accent` with white text; secondary button transparent with 1px `--border` and `--text`. Report card: `--surface`, 1px `--border`; labels `--text-muted`; values `--text`; status dot and text `--pass`.

**About**: H2 `--text`; body `--text-body`; fact labels `--text-muted` (mono); fact values `--text`.

**Cards (Projects, Skills, Certifications, Organization)**: background `--surface`, 1px `--border`, no shadow. Title `--text`; description `--text-body`; footer line `--text-muted`. Tags: `--surface-2` background, `--text-muted` text, no border. Status chips: neutral (`--surface-2` + `--text-muted`) for INTERNAL / TEAM PROJECT / TRAINING PROJECT. Green `--pass` only when a status means a verified or passing state.

**Skills**: skill names `--text`; "used in" line `--text-muted`. No level labels (Expert/Advanced/Basic) in any color.

**Experience**: date `--text-muted` (mono); role `--text`; company `--text-muted`; bullets `--text-body`; check icons `--text-muted`; timeline line `--border`; dot on the line `--text-muted`, the current role's dot `--pass`.

**Certifications**: year `--text-muted` (mono); title `--text`; issuer `--text-muted`; icon box `--surface-2` with `--text-muted` icon. No "Verified" badge unless a credential link exists; if it does, the link is `--accent` underlined.

**Contact**: H2 `--text`; subtitle `--text-muted`; email `--text`; "Copy" button ghost (`--border`, `--text-muted`); WhatsApp filled `--accent` with white text; "Send email" outline (`--border`, `--text`); LinkedIn / GitHub links `--text-body`, underlined, hover `--accent`; location `--text-muted`.

**Footer**: background `--footer-bg`; text `--footer-text`; secondary text `--footer-muted`; link hover `--accent-on-dark`.

## Section backgrounds (banding)

- `--bg`: Hero, About, Projects, Experience, Organization, Contact.
- `--surface-2` band: Skills and Certifications. Cards inside a band stay `--surface`.
- Footer: `--footer-bg`.
- Never use pure `#000` or `#fff` as a page background.

## Contrast rules

- Body text on any surface: at least 4.5:1. Small text (14px) uses `--text-muted` or darker, never lighter.
- White text on `--accent`: 5.8:1, allowed. `--accent` text on `--surface-2`: allowed for 16px and larger only.
- Do not place `--surface-2` buttons on a `--surface` card without a 1px `--border`; they look disabled.

## Agent checklist

1. Replace every hardcoded color in `src/` with the variables above (`grep -rniE "#[0-9a-f]{3,8}|rgb\\(" src`).
2. Define the variables once in `src/index.css` under `:root`.
3. Count accent elements per viewport; reduce to 3 or fewer.
4. Check that no icon, tag, date, or company name uses `--accent`.
5. Report what changed, then stop.

## Prompt for the agent

```
Read DESIGN-color.md. Apply ONLY the color hierarchy to every section.
Do not change layout, copy, or animation. Define the tokens once in src/index.css,
replace all hardcoded colors with variables, and follow the element-to-color map.
When done, list the files you changed, then stop.
```