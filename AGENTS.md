# Automation Club Web

Read `product-marketing-context.md`, `package.json`, and the current deployment configuration before changing the site. Preserve the existing design and product positioning unless Eli asks to change them. Keep secrets out of the repository and verify changes with the relevant package scripts before reporting them complete.

Keep shared instructions and skills compatible with both Codex and Claude Code. Provider-specific instructions must be clearly separated.

## Site text in one file

All visible text (Hebrew in `web/*.html`, English in `web/js/i18n.js`, keyed by the Hebrew) is exported to
`site-text/site-text.docx` with `.venv-text/bin/python scripts/site_text.py` (setup in the script's docstring).
Each row has an ID (S/H/W/P-nnn); `site-text/site-text.json` maps it to the exact HTML pieces. When Eli returns an
edited copy, apply changes by ID to both the HTML and the matching `i18n.js` key, then re-export.
