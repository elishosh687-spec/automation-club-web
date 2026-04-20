# Automation Club — Web

מבנה האתר. כל קבצי ה-front-end חיים כאן.

## מבנה תיקיות

```
web/
├── index.html          דף הבית (Landing)
├── css/
│   └── main.css        כל ה-CSS המותאם (חוץ מ-Tailwind)
├── js/
│   └── main.js         כל ה-JavaScript של האתר
├── images/             נכסי תמונה סטטיים
├── pages/              דפים נוספים בעתיד (about.html, blog/, וכו')
└── README.md
```

## תלויות חיצוניות (CDN)

נטענות מתוך `index.html <head>`:

- **Tailwind CSS** — CDN, משמש לקלאסים של utility
- **Google Fonts** — Newsreader · Manrope · Heebo · Assistant
- **Material Symbols Outlined** — אייקונים

## תצורת Tailwind

טוקני הצבע, ה-`fontFamily` ו-`borderRadius` מוגדרים inline ב-`<script id="tailwind-config">` בתוך `index.html` (חובה עבור Tailwind CDN — לא ניתן להוציא לקובץ חיצוני).

אם נעבור ל-build עם PostCSS/CLI בעתיד, נעביר את התצורה ל-`tailwind.config.js`.

## קונבנציות

- **RTL**: `<html dir="rtl" lang="he">` — כל הכיוון בעברית.
- **Dark mode**: `class="dark"` על ה-`<html>`. הפלטה מוגדרת כ-dark-first.
- **אנימציות**:
  - `data-reveal="up | up-sm | blur | scale | right | left"` — reveal-on-scroll עם stagger אוטומטי.
  - `.mask-line > span` — mask-reveal לשורת טקסט.
  - `.ambient-blob` — תנועה צפה עדינה ברקע.
- **כפתורים**: `.btn-glass` בסיס, `.btn-glass-primary` אקסנט, `.btn-glass-lg/-sm/-full` גודל, `.btn-icon-glass` אייקון עגול.
- **תפריט מובייל**: מופעל על ידי `#menuToggle` ב-`main.js`.

## הוספת דף חדש

1. צור `pages/about.html` (או בתיקייה משלו).
2. העתק את ה-`<head>` מ-`index.html` והתאם את ה-title + meta.
3. התייחס ל-CSS/JS דרך נתיב יחסי: `../css/main.css`, `../js/main.js`.
4. עדכן קישורי ניווט ב-header של הדפים הקיימים.

## הפעלה מקומית

- פתיחה ישירה: דאבל-קליק על `index.html` בדפדפן.
- שרת מקומי (מומלץ לפיתוח — כדי ש-`fetch` ודומיו יעבדו):
  ```bash
  cd web
  python -m http.server 8000
  ```
  ואז `http://localhost:8000`.
