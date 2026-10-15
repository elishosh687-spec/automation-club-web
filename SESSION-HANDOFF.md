# Session handoff (2026-10-15)

## Published
- GitHub `main` contains the full site copy refresh, the English language-button fix, the WhatsApp contact-form action, the portfolio portal card, and the source/export tooling in commit `08d67ee`.
- Vercel project: `automation-club`; production deployment `dpl_BZq6C5QNSqiV2iRwZrUackCV7P8Q` from that commit was deployed directly with Vercel CLI and aliased to `https://www.eliagents.com`.
- The Git-triggered Vercel deployment was canceled before building. A direct Vercel CLI production deployment succeeded. Investigate the automatic Git deployment configuration before relying on GitHub push alone next time.
- Live browser checks passed at 390 and 1440 px on `/`, `/work`, and `/privacy`: HTTP 200, English mode shows `Hebrew` and `Switch to Hebrew`, no JavaScript errors or horizontal overflow.
- `npm run build:css`, `node --check` for both JS files, `git diff --check`, and `.venv-text/bin/python scripts/site_text.py` passed. The latest `site-text/site-text.docx` and `.json` contain 351 texts in 26 sections.

## Content notes
- Portfolio card `case-10` links to the live WhatsApp API customer portal at `https://api-supp.com/`. Nine other unlinked cards are explicitly presented as examples; unverified result figures were removed.
- Contact form opens a prefilled WhatsApp message; the visitor confirms sending in WhatsApp. The form interaction was tested locally without sending a message.
- Privacy-policy substance was left unchanged.

## Separate local work
- `.claude/launch.json` and `launch-film/` were already uncommitted before this work and were not included in the site commit or direct production deployment.
