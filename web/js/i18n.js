/* =========================================================================
   i18n.js — Hebrew ⇄ English language switch for Automation Club
   -------------------------------------------------------------------------
   Hebrew stays the source of truth in the HTML. This walks the DOM text
   nodes (and a few attributes) and swaps them against the dictionary below.
   Keys are the Hebrew text, normalized: trimmed, whitespace collapsed, and
   U+2011 (non-breaking hyphen) / U+00A0 (nbsp) reduced to plain ASCII — so
   dictionary keys can be written with ordinary "-" and spaces.
   ========================================================================= */
(function () {
  'use strict';

  var HE_RANGE = /[֐-׿]/; // any Hebrew letter

  function norm(s) {
    return s
      .replace(/‑/g, '-')
      .replace(/ /g, ' ')
      .trim()
      .replace(/\s+/g, ' ');
  }

  /* ---- Visible text: normalized Hebrew → English ---- */
  var TEXT = {
    // ---- Nav / menu (all pages) ----
    'מה אנחנו עושים': 'What we do',
    'עבודות': 'Work',
    'תהליך': 'Process',
    'שאלות נפוצות': 'FAQ',
    'שיחת ייעוץ חינם': 'Free consultation',
    'דוגמאות': 'Examples',

    // ---- Hero (home) ----
    'אוטומציה · AI · אינטגרציות': 'Automation · AI · Integrations',
    'כמה שעות השבוע': 'How many hours a week',
    'הולכות על עבודה': 'are lost to work',
    'שיכלה לקרות לבד?': 'that could run itself?',
    'אנחנו בונים לעסקים קטנים ובינוניים אוטומציות מותאמות אישית — שמחברות בין המערכות שכבר יש לך ועובדות בשבילך 24/7. אתה חוזר לסגור עסקאות, לא לנהל משימות.':
      'We build custom automations for small and medium businesses — connecting the systems you already have so they work for you 24/7. You get back to closing deals, not managing tasks.',
    'קבע שיחת ייעוץ חינם': 'Book a free consultation',
    'איך זה עובד': 'How it works',
    'זמין לפרויקטים חדשים': 'Available for new projects',
    '20–30 דקות · ללא התחייבות': '20–30 min · no commitment',
    'אוטומציה ראשונה לפני התחייבות ארוכה': 'First automation before any long commitment',
    'קוד ותיעוד שלך, תמיד': 'Your code and docs, always',

    // ---- Pain ----
    'המצב היום': 'Where things stand',
    'אתה לא חסר עבודה.': "You're not short on work.",
    'אתה חסר שקט.': "You're short on quiet.",
    'חצי יום הולך על דברים שאמורים לקרות לבד. אתה יודע את זה. פשוט לא היה זמן לעצור ולתקן.':
      'Half your day goes to things that should happen on their own. You know it. There just was never time to stop and fix it.',
    'שעות הולכות': 'Hours vanish',
    'על עבודה ידנית.': 'into manual work.',
    'העתק-הדבק בין מערכות, תזכורות, מעקב אחרי לידים, דוחות.':
      'Copy-paste between systems, reminders, chasing leads, reports.',
    '10–20 שעות בשבוע': '10–20 hours a week',
    'של עבודה חוזרת שאף אחד לא היה אמור לעשות ביד.':
      'of repetitive work no one should be doing by hand.',
    'לידים נופלים': 'Leads slip',
    'בין הכיסאות.': 'through the cracks.',
    'ליד נכנס בלילה מהטופס. מחר תתפוס אותו — ואחרי יומיים הוא כבר אצל המתחרה.':
      "A lead comes in overnight from the form. You'll get to it tomorrow — and two days later it's already with a competitor.",
    'בלי מעקב אוטומטי —': 'Without automatic follow-up —',
    'כל ליד תלוי בך.': 'every lead depends on you.',
    'הכל תלוי בך.': 'Everything depends on you.',
    'אם לא אתה — זה לא קורה. לא חשבוניות, לא תיאומים, לא מעקב, לא דוחות.':
      "If it isn't you — it doesn't happen. No invoices, no scheduling, no follow-up, no reports.",
    'אי אפשר לחלות, אי אפשר לחופש,': "You can't get sick, you can't take a vacation,",
    'ואי אפשר לצמוח.': "and you can't grow.",
    'יום עבודה רגיל': 'A regular workday',
    'שלח הצעת מחיר ידנית ללקוח': 'Send a quote to a client, by hand',
    'העתק פרטים מהטופס לגיליון': 'Copy form details into a spreadsheet',
    'שלח תזכורת פגישה ב-WhatsApp': 'Send a meeting reminder on WhatsApp',
    'עדכן סטטוס ליד ב-CRM': "Update a lead's status in the CRM",
    'הכן דוח שבועי ל-Excel': 'Prepare a weekly report in Excel',
    'תאם פגישה ידנית בין לוחות זמנים': 'Coordinate a meeting across calendars, by hand',
    'שלח חשבונית ידנית ללקוח': 'Send an invoice to a client, by hand',
    'בדוק אם הליד ענה — שוב': 'Check if the lead replied — again',
    'הבעיה היא לא שאתה לא עובד מספיק.': "The problem isn't that you don't work enough.",
    'הבעיה היא שכל הזמן שלך הולך על הדברים': 'The problem is that all your time goes to the',
    'הלא-נכונים': 'wrong things',

    // ---- Solution ----
    'הפתרון': 'The solution',
    'אוטומציה שבנויה': 'Automation built',
    'סביב העסק שלך': 'around your business',
    '— לא להפך.': '— not the other way around.',
    'במקום לדחוף אותך לתוך כלי מוכן שלא מתאים, אנחנו בוחרים לכל חלק בעסק שלך את הכלי הנכון — ומחברים הכל למערכת אחת שעובדת.':
      "Instead of forcing you into an off-the-shelf tool that doesn't fit, we pick the right tool for each part of your business — and connect everything into one system that works.",
    'פיתוח ללא גבולות': 'Development without limits',
    'יודע לקוד. אם יש דרישה — יש פתרון. אין "הכלי לא תומך בזה".':
      'We write code. If there’s a requirement — there’s a solution. No "the tool doesn’t support that."',
    'רואה את התמונה המלאה': 'Sees the full picture',
    'בוחרים את הכלי הנכון לכל חלק לפי מה שהכי מתאים לעסק שלך. כל המערכת מדברת אחת עם השנייה.':
      'We choose the right tool for each part based on what fits your business best. The whole system talks to itself.',
    'ליווי שלא נגמר בהשקה': "Support that doesn't end at launch",
    'ליווי חודשי שמבטיח שהכל ממשיך לעבוד ומשתפר. לא "פרויקט ונעלמנו".':
      'Monthly support that keeps everything running and improving. Not "a project, then we vanish."',
    'מדבר שפה של בעלי עסקים': 'Speaks the language of business owners',
    'מתחיל מהבעיה העסקית, לא מהטכנולוגיה. אתה מבין בכל שלב מה קורה ולמה.':
      'We start from the business problem, not the technology. You understand what’s happening and why, at every step.',

    // ---- Use cases ----
    '— דוגמאות נבחרות': '— Selected examples',
    'ככה זה נראה': 'This is what it looks like',
    'אצל לקוחות.': 'for our clients.',
    'כל עסק שונה, אבל רוב הבעיות חוזרות.': 'Every business is different, but most problems repeat.',
    'שש אוטומציות שחוסכות שעות מהיום הראשון.': 'Six automations that save hours from day one.',
    'לידים אוטומטיים': 'Automatic leads',
    'מכל הערוצים.': 'from every channel.',
    'טופס, וואטסאפ, אינסטגרם, שיחה — כל ליד נכנס למערכת ניהול הלקוחות, מקבל תיוג ויוצאת אליו חזרה אוטומטית.':
      'Form, WhatsApp, Instagram, a call — every lead enters your CRM, gets tagged, and receives an automatic reply.',
    'תיאום פגישות ותזכורות': 'Scheduling & reminders',
    'אפס אי-הגעות בהפתעה. תזכורת יום לפני + שעה לפני.':
      'Zero surprise no-shows. A reminder the day before + an hour before.',
    'חשבוניות וגבייה': 'Invoicing & collection',
    'יוצאות אוטומטית. תזכורת תשלום עצמה נשלחת. שקט.':
      'Sent automatically. Payment reminders send themselves. Peace of mind.',
    'דוחות שבועיים אוטומטיים.': 'Automatic weekly reports.',
    'כל ראשון בבוקר, דוח במייל: מכירות, לידים, מה בטיפול, מה תקוע.':
      "Every Monday morning, a report by email: sales, leads, what's in progress, what's stuck.",
    'Shopify: משלוחים ותקשורת.': 'Shopify: shipping & comms.',
    'הזמנה': 'Order',
    'תווית': 'Label',
    'ביקורת': 'Review',
    'עוזר חכם': 'A smart assistant',
    'לשירות ולתפעול.': 'for service & operations.',
    'עונה ללקוחות 24/7, מסכם שיחות מכירה, ממיין פניות — מעביר אליך רק את מה שצריך טיפול אנושי.':
      'Answers customers 24/7, summarizes sales calls, triages requests — passing you only what needs a human.',

    // ---- Featured work (home) ----
    '— עבודות נבחרות': '— Selected work',
    'כשזה רץ.': "when it's running.",
    'שלוש דוגמאות מהשטח.': 'Three examples from the field.',
    'שמות מוסתרים — מערכות אמיתיות.': 'Names hidden — real systems.',
    'ראה את כל העבודות': 'See all work',

    // ---- Case cards: shared bits ----
    'הבעיה': 'The problem',
    'מה הכלי עושה': 'What it does',
    'למה זה חוסך זמן': 'Why it saves time',
    'פירוט מלא': 'Full details',
    // case 1
    'בוט שעונה': 'A bot that answers',
    'ללקוחות אוטומטית': 'customers automatically',
    'יצרנית B2B · מוצרי אריזה': 'B2B manufacturer · packaging',
    'מענה ב-3 שניות': '3-second reply',
    'מענה מיידי 24/7': 'Instant reply 24/7',
    'מאות פניות בחודש. עד שאתה חוזר ללקוח — הוא כבר אצל המתחרה.':
      "Hundreds of inquiries a month. By the time you get back to a client — they're already with a competitor.",
    'עונה ללקוח בעברית טבעית תוך 3 שניות. רק לידים חמים מגיעים אליך.':
      'Replies to the client in natural Hebrew within 3 seconds. Only hot leads reach you.',
    'נכנס לשיחה רק כשבאמת צריך לסגור עסקה.': "You step in only when there's really a deal to close.",
    // case 2
    'מערכת ניהול': 'A management system',
    'לקוחות בוואטסאפ': 'for clients on WhatsApp',
    'שירות לעסקים · multi-brand': 'B2B service · multi-brand',
    'פי 10 לקוחות': '10× clients',
    'בלי תוספת עלויות': 'no added cost',
    'כל לקוח חדש לקח שבוע להקים. העסק לא צמח.':
      "Every new client took a week to set up. The business wasn't growing.",
    'מערכת אחת מטפלת בכל הלקוחות יחד. לקוח חדש מוכן בחצי שעה.':
      'One system handles all clients together. A new client is ready in half an hour.',
    'שבוע → חצי שעה': 'A week → half an hour',
    'פי 10 לקוחות בלי תוספת עלויות. העסק סוף-סוף צומח.':
      '10× clients with no added cost. The business is finally growing.',
    // case 3
    'החנות': 'The store',
    'עובדת לבד': 'runs itself',
    'חנות eCommerce ישראלית': 'Israeli eCommerce store',
    'סנכרון אוטומטי': 'Auto-sync',
    'אפס טעויות': 'Zero errors',
    'שעות ביום הולכות על העתקות בין מערכות.': 'Hours a day go to copying between systems.',
    'מלאי, מחירים, הזמנות ומשלוחים מסונכרנים אוטומטית.':
      'Inventory, prices, orders and shipping sync automatically.',
    'שעות → דקות': 'Hours → minutes',
    'אפס טעויות. יותר זמן לצמיחה.': 'Zero errors. More time to grow.',

    // ---- Process ----
    'מהשיחה הראשונה': 'From the first call',
    'לעסק שעובד לבד': 'to a business that runs itself',
    '— בחמישה שלבים.': '— in five steps.',
    'בלי הפתעות, בלי "נראה תוך כדי". מגדירים מה מודדים, בונים, משיקים, ואז ממשיכים ללוות.':
      'No surprises, no "we’ll figure it out as we go." We define what we measure, build, launch, and then keep supporting.',
    'שיחת ייעוץ': 'Consultation call',
    '20–30 דקות. אנחנו שואלים על העסק, אתה מספר איפה כואב. יוצאים עם כיוון ברור — גם אם החלטת לא להתקדם.':
      '20–30 minutes. We ask about the business, you tell us where it hurts. You leave with a clear direction — even if you decide not to move forward.',
    'הצעה מדויקת': 'A precise proposal',
    'תוך 2–3 ימים אתה מקבל מסמך: מה בונים, איך, כמה זמן, כמה זה עולה, ומה נגדיר כהצלחה.':
      "Within 2–3 days you get a document: what we build, how, how long, what it costs, and what we'll define as success.",
    'שלב ניסיון': 'Trial phase',
    'מתחילים בקטן — אוטומציה אחת, בעסק שלך, בעבודה אמיתית. רק כשהיא יושבת חזק, מרחיבים.':
      "We start small — one automation, in your business, on real work. Only once it's solid do we expand.",
    'בנייה והשקה': 'Build & launch',
    'מפתחים את המערכת המלאה, בודקים איתך, ומעבירים לייצור. תיעוד מלא + הדרכה לצוות.':
      'We build the full system, test it with you, and move to production. Full documentation + team training.',
    'ליווי חודשי': 'Monthly support',
    '(אופציונלי)': '(optional)',
    'חבילה חודשית לתחזוקה, שיפורים, תוספות ותמיכה. המערכת ממשיכה לחיות ולהשתפר.':
      'A monthly package for maintenance, improvements, add-ons and support. The system keeps living and improving.',

    // ---- Guarantee ----
    'ההבטחה': 'The promise',
    'שלוש הבטחות.': 'Three promises.',
    'בלי אותיות קטנות.': 'No fine print.',
    'אנחנו לא מוכרים לך חתול בשק. הנה בדיוק מה שאתה מקבל — ומה שתמיד יכול להסתמך עליו.':
      "We're not selling you a pig in a poke. Here's exactly what you get — and what you can always rely on.",
    'תוצאה לפני': 'Results before',
    'התחייבות ארוכה.': 'any long commitment.',
    'מתחילים בקטן: אוטומציה אחת, בעסק שלך, בעבודה אמיתית. רק כשהיא יושבת חזק — מרחיבים.':
      "We start small: one automation, in your business, on real work. Only once it's solid — we expand.",
    'שלב ניסיון · 1–2 שבועות': 'Trial phase · 1–2 weeks',
    'הקוד והתיעוד —': 'The code and docs —',
    'שלך.': 'yours.',
    'כל מה שנבנה עובר אליך — קוד, תיעוד, גישות. אפשר להחליף ספק בכל רגע בלי לאבד דבר.':
      'Everything we build transfers to you — code, documentation, access. You can switch providers at any moment without losing a thing.',
    'אפס נעילה': 'Zero lock-in',
    'יעדי הצלחה ברורים': 'Clear success targets',
    'לפני שמתחילים.': 'before we start.',
    'מגדירים יחד מה נחשב הצלחה — שעות שנחסכות, לידים שלא נופלים, זמן תגובה. בלי יעדים ברורים, אין פרויקט.':
      "We define together what counts as success — hours saved, leads that don't slip, response time. Without clear targets, there's no project.",
    'נמדד בשחור על לבן': 'Measured in black and white',
    '— מה שנחתם, נחתם.': "— what's agreed is agreed.",

    // ---- FAQ ----
    'מה שכולם שואלים': 'What everyone asks',
    'לפני שהם קופצים למים.': 'before they take the plunge.',
    'זה בטח יקר — כמה עולה?': 'This must be expensive — how much does it cost?',
    'שיחת הייעוץ וההצעה — חינם. הפרויקטים עצמם מתומחרים לפי היקף, ומחיר מדויק מופיע בהצעה לפני שמתחילים. רוב הפרויקטים מחזירים את ההשקעה תוך 2–4 חודשים בזמן שנחסך.':
      'The consultation and the proposal — free. Projects themselves are priced by scope, and an exact price appears in the proposal before we start. Most projects pay for themselves within 2–4 months in saved time.',
    'אני לא טכני בכלל. אבין מה עושים לי?': "I'm not technical at all. Will I understand what's being done?",
    'כן. אנחנו מסבירים הכל בעברית של בעל עסק — בלי מונחים טכניים. בכל שלב אתה יודע בדיוק מה קורה, למה, וכמה זמן זה ייקח.':
      'Yes. We explain everything in plain business language — no technical jargon. At every step you know exactly what’s happening, why, and how long it takes.',
    'ניסיתי בעבר פרילנסר / סוכנות וזה לא עבד. למה עכשיו יהיה אחרת?':
      "I tried a freelancer / agency before and it didn't work. Why would this time be different?",
    'כי יש ליווי חודשי. רוב הכישלונות לא קורים בהקמה — קורים שלושה חודשים אחרי, כשמשהו נשבר ואין מי שיתקן. אצלנו, הליווי הוא חלק מהחבילה.':
      "Because there's ongoing monthly support. Most failures don't happen at setup — they happen three months later, when something breaks and there's no one to fix it. With us, support is part of the package.",
    'מה אם אתם נעלמים או עסוקים?': 'What if you disappear or get too busy?',
    'הקוד והתיעוד שלך. אם אנחנו לא זמינים — כל מפתח אחר יכול להרים את זה תוך ימים. בלי תלויות, בלי קופסאות שחורות.':
      "The code and documentation are yours. If we're not available — any other developer can pick it up within days. No dependencies, no black boxes.",
    'העסק שלי קטן מדי בשביל אוטומציה רצינית?': 'Is my business too small for serious automation?',
    'דווקא הפוך. בעסק קטן, כל שעה של בעל העסק יקרה. חיסכון של 10 שעות בשבוע = הפרש בין לצמוח לבין להיחנק.':
      "Actually the opposite. In a small business, every hour of the owner's time is precious. Saving 10 hours a week = the difference between growing and choking.",
    'כמה זמן לוקח לראות תוצאות?': 'How long does it take to see results?',
    'שלב הניסיון — 1–2 שבועות. השקה מלאה של אוטומציה בסיסית — 3–6 שבועות. אוטומציות מורכבות יותר — 2–3 חודשים. בכל מקרה, משלב הניסיון אתה כבר רואה משהו עובד.':
      'The trial phase — 1–2 weeks. A full launch of a basic automation — 3–6 weeks. More complex automations — 2–3 months. Either way, from the trial phase you already see something working.',

    // ---- Booking ----
    'מוכן?': 'Ready?',
    '20 דקות עכשיו.': '20 minutes now.',
    'שעות חוזרות אליך כל שבוע.': 'Hours back to you every week.',
    'שיחת ייעוץ קצרה, חינם, בלי התחייבות. יוצאים ממנה עם הבנה ברורה אם יש כאן פתרון — גם אם לא מתקדמים איתנו.':
      "A short consultation, free, no commitment. You leave it with a clear sense of whether there's a solution here — even if you don't go ahead with us.",
    'מה מקבלים': 'What you get',
    'אבחון של הצוואר הבקבוק הכי כבד': 'A diagnosis of your heaviest bottleneck',
    'כיוון ראשוני לפתרון + הערכת זמן': 'An initial direction for a solution + time estimate',
    'בלי דחיפות, בלי התחייבות': 'No pressure, no commitment',
    'שם מלא': 'Full name',
    'טלפון': 'Phone',
    'איך נוח לך שאצור קשר?': 'How would you like me to reach you?',
    'שיחת טלפון': 'Phone call',
    'שניהם בסדר': 'Either works',
    'ספר לי בקצרה על העסק והבעיה': 'Tell me briefly about the business and the problem',
    'קבע שיחת ייעוץ': 'Book a consultation',
    'דברו איתנו בוואטסאפ': 'Message us on WhatsApp',
    'חוזרים אליך תוך יום עסקים. הפרטים שלך לא יוצאים לשום מקום.':
      'We get back to you within one business day. Your details never leave us.',

    // ---- Footer (all pages) ----
    'אוטומציות מותאמות לעסקים שלא מתפשרים על פתרון גנרי.':
      "Custom automations for businesses that won't settle for a generic solution.",
    'ניווט': 'Navigation',
    'קישורים': 'Links',
    'יצירת קשר': 'Contact',
    'מדיניות פרטיות': 'Privacy policy',
    '© 2026 Automation Club. כל הזכויות שמורות.': '© 2026 Automation Club. All rights reserved.',

    // ---- Work page: hero + CTA ----
    '— תיק עבודות': '— Portfolio',
    'חלק מהפרויקטים': 'Some of the projects',
    'שבנינו.': "we've built.",
    'כל פרויקט פותר בעיה אמיתית של בעל עסק אמיתי.':
      'Every project solves a real problem for a real business owner.',
    'בלי קסמים — רק זמן שחזרנו לכם.': 'No magic — just time we gave back to you.',
    '— מוכן?': '— Ready?',
    'רוצה': 'Want',
    'דבר כזה': 'something like this',
    'לעסק שלך?': 'for your business?',
    'שיחת גילוי 20–30 דקות. חינם, בלי התחייבות. יוצאים עם הבנה אם יש כאן פתרון — גם אם לא ממשיכים.':
      "A 20–30 minute discovery call. Free, no commitment. You leave knowing whether there's a solution here — even if you don't continue.",
    'קבע שיחת גילוי': 'Book a discovery call',
    'חזור לעמוד הבית': 'Back to home',
    'חזרה לעמוד הבית': 'Back to home',

    // ---- Work page: SVG labels ----
    'מוצרים': 'Products',
    'מלאי': 'Inventory',
    'תמחור': 'Pricing',
    'משלוח': 'Shipping',
    'המתנה': 'Waitlist',
    '3 ימים': '3 days',
    '7 ימים': '7 days',
    '14 ימים': '14 days',
    'לקוח': 'Client',
    'שיחה': 'Call',
    'מערכת חשבונאות': 'Accounting system',

    // ---- Work page: case 1 (full) ----
    'מאות פניות בחודש מאינסטגרם ופייסבוק. עד שבעל העסק חוזר ללקוח — הוא כבר אצל המתחרה.':
      "Hundreds of inquiries a month from Instagram and Facebook. By the time the owner gets back to a client — they're already with a competitor.",
    'בוט חכם שעונה ללקוח תוך 3 שניות בעברית טבעית — בדיוק כמו שבעל העסק היה עונה. את הלידים החמים בלבד הוא מעביר אליו ישירות לוואטסאפ.':
      'A smart bot that replies to the client within 3 seconds in natural Hebrew — exactly the way the owner would. It forwards only the hot leads straight to their WhatsApp.',
    'אתה נכנס לשיחה רק כשיש לקוח שבאמת רוצה לסגור עסקה. שאר הפניות מטופלות לבד.':
      'You step into a conversation only when there’s a client who really wants to close. The rest is handled on its own.',
    // case 2 (full)
    'כל לקוח חדש לקח שבוע להקים. העסק לא צמח — כל היום הלך על העתקות והתאמות ידניות.':
      "Every new client took a week to set up. The business wasn't growing — the whole day went to manual copying and adjustments.",
    'מערכת אחת שמטפלת בכל הלקוחות יחד, ולא משנה כמה. לקוח חדש מוכן לעבודה תוך חצי שעה — בלי לבנות שום דבר מההתחלה.':
      'One system that handles all clients together, no matter how many. A new client is ready to go in half an hour — without building anything from scratch.',
    'אפשר לקבל פי 10 לקוחות חדשים בלי שום תוספת זמן או עלויות. העסק סוף-סוף יכול לצמוח.':
      'You can take on 10× more clients with no added time or cost. The business can finally grow.',
    // case 3 (full)
    'שעות ביום הולכות על העתקות בין מערכות — מלאי, מחירים, הזמנות, משלוחים. וטעויות קורות בלי סוף.':
      'Hours a day go to copying between systems — inventory, prices, orders, shipping. And errors happen endlessly.',
    'כל פעולות החנות מנוהלות אוטומטית: מוצרים מתעדכנים, מלאי מסונכרן, מחירים משתנים לבד, ומשלוחים יוצאים בלי שאתה צריך לגעת.':
      'Every store operation runs automatically: products update, inventory syncs, prices change on their own, and shipments go out without you touching a thing.',
    'פעולות שלקחו חצי יום נסגרות עכשיו בדקות. כמעט אפס טעויות. יותר זמן לצמיחה, פחות לתפעול.':
      'Tasks that took half a day now close in minutes. Almost zero errors. More time to grow, less on operations.',
    // case 4
    'כל הקמפיינים': 'All the campaigns',
    'ממקום אחד': 'from one place',
    'סוכנות שיווק · 9 חשבונות': 'Marketing agency · 9 accounts',
    '20+ שעות בשבוע': '20+ hours a week',
    'דוחות מיידיים': 'Instant reports',
    'מנהל המדיה קופץ בין 9 ממשקים שונים. כל שינוי קטן = העתק-הדבק 9 פעמים. דוחות מגיעים שבוע אחרי שצריך.':
      'The media buyer jumps between 9 different dashboards. Every small change = copy-paste 9 times. Reports arrive a week after they’re needed.',
    'מערכת אחת שמנהלת את כל 9 החשבונות במקביל. שינוי במקום אחד מתפרס מיד על כל הלקוחות הרלוונטיים — בלי העתקות, בלי טעויות.':
      'One system that manages all 9 accounts in parallel. A change in one place rolls out instantly to every relevant client — no copying, no errors.',
    '9 ממשקים → 1': '9 dashboards → 1',
    'שחרור של 20+ שעות בשבוע. שינויים מתעדכנים ברגע. דוחות בזמן אמת — לא שבוע אחרי.':
      '20+ hours a week freed up. Changes update instantly. Real-time reports — not a week later.',
    // case 5
    'סוכן AI': 'An AI agent',
    'ששולח הודעות לבד': 'that messages on its own',
    'מערכת אוטומציה אוטונומית': 'Autonomous automation system',
    'מאות שיחות': 'Hundreds of conversations',
    'בלי מעורבות שלך': 'Without your involvement',
    'שליחת הודעות יזומות לעשרות ומאות אנשים במקביל בכמה ערוצי תקשורת — בלתי אפשרי לעשות ידנית. כל פנייה דורשת מסר אחר ותגובה אחרת.':
      'Sending proactive messages to tens and hundreds of people at once across several channels — impossible to do by hand. Every contact needs a different message and a different response.',
    'סוכן AI שעובד עצמאית בלי שום מעורבות שלך. קורא את היסטוריית השיחה עם כל אדם, עונה לפי ההקשר, ומנהל מאות שיחות במקביל — 24 שעות ביממה.':
      'An AI agent that works independently with zero involvement from you. It reads the conversation history with each person, replies in context, and runs hundreds of conversations in parallel — 24 hours a day.',
    'מאות שיחות פעילות': 'Hundreds of active conversations',
    'בלי לזכור, בלי לשכוח, בלי שעון. אתה מקבל לקוחות חדשים בלי לעבוד יותר.':
      'No remembering, no forgetting, no clock. You get new clients without working more.',
    // case 6
    '07 · קליניקה': '07 · Clinic',
    'פגישות שמתבטלות': 'Cancelled appointments',
    'מתמלאות לבד': 'fill themselves',
    'מרפאה · קליניקת אסתטיקה': 'Clinic · aesthetics practice',
    'פחות no-shows': 'Fewer no-shows',
    'רשימת המתנה אוטומטית': 'Automatic waitlist',
    'שליש מההכנסה היומית הולכת לפח. לקוח לא מגיע, או מתקשר חצי שעה לפני לבטל — הזמן שלך פנוי, ההכנסה נעלמת.':
      "A third of the daily revenue goes to waste. A client doesn't show, or calls half an hour before to cancel — your time is open, the revenue is gone.",
    'שולח תזכורת בוואטסאפ יום לפני התור ושעתיים לפני. אם הלקוח מבטל — שולח מיד הזמנה לראשון בתור ברשימת המתנה. הזמן הפנוי מתמלא בלי שאתה מרים טלפון.':
      'Sends a WhatsApp reminder the day before the appointment and two hours before. If the client cancels — it immediately offers the slot to the first person on the waitlist. The open time fills without you picking up the phone.',
    'חצי מהביטולים מתמלאים': 'Half the cancellations get filled',
    'היומן מלא יותר. פחות שיחות תיאום. ההכנסה לא נעלמת בגלל ביטול ברגע האחרון.':
      "A fuller calendar. Fewer scheduling calls. Revenue doesn't vanish over a last-minute cancellation.",
    // case 7
    '08 · עוקב אחריך': '08 · Follows up for you',
    'ההצעות לא נשכחות.': "Quotes don't get forgotten.",
    'התשלומים מגיעים בזמן.': 'Payments arrive on time.',
    'קבלן · סוכנות · פרילנסר': 'Contractor · agency · freelancer',
    'פי 2 סגירות': '2× closings',
    'תשלומים בזמן': 'On-time payments',
    'שלחת הצעת מחיר → שכחת לחזור → ראית שהלקוח כבר חתם אצל מישהו אחר. שלחת חשבונית → שכחת לדרוש → הכסף יושב חודשיים.':
      'You sent a quote → forgot to follow up → found the client already signed with someone else. You sent an invoice → forgot to chase it → the money sits for two months.',
    'כל הצעה שאתה שולח — המערכת חוזרת ללקוח אוטומטית אחרי 3, 7 ו-14 ימים בוואטסאפ או במייל. כל חשבונית — תזכורת תשלום נשלחת בתאריך שאתה קובע.':
      'Every quote you send — the system follows up with the client automatically after 3, 7 and 14 days by WhatsApp or email. Every invoice — a payment reminder is sent on the date you set.',
    'אתה לא צריך לזכור שום דבר. המערכת זוכרת בשבילך — לקוחות סוגרים יותר, התשלומים מגיעים בזמן.':
      "You don't have to remember a thing. The system remembers for you — clients close more, payments arrive on time.",
    // case 8
    '09 · מכירות': '09 · Sales',
    'כל שיחה נכנסת ל-CRM.': 'Every call lands in the CRM.',
    'בלי הקלדה.': 'No typing.',
    'צוות מכירות B2B · נדל"ן': 'B2B sales team · real estate',
    '0 דקות תיעוד': '0 minutes of logging',
    'כלום לא נשכח': 'Nothing forgotten',
    'נגמרה שיחה — שעה הולכת על תיעוד. רוב השיחות לא נכנסות ל-CRM בכלל. המנהל זועם, הלקוחות נשכחים, עסקאות נופלות.':
      "A call ends — an hour goes to logging it. Most calls never make it into the CRM at all. The manager's furious, clients are forgotten, deals fall through.",
    'שיחה מסתיימת — סיכום אוטומטי של מה שדיברו, ועדכון מיידי של כל השדות הרלוונטיים בכרטיס הלקוח. אותו דבר מתאים גם לשיחות וואטסאפ.':
      "A call ends — an automatic summary of what was said, and an instant update of every relevant field on the client's record. The same works for WhatsApp conversations too.",
    'במקום שעה ביום על דוקו — אפס. כל שיחה מתועדת מלא, כל לקוח עם היסטוריה שלמה.':
      'Instead of an hour a day on docs — zero. Every call fully logged, every client with a complete history.',
    // case 9
    '10 · נתונים': '10 · Data',
    'PDF נכנסים.': 'PDFs come in.',
    'המערכת מתעדכנת לבד.': 'The system updates itself.',
    'רואה חשבון · חברת שילוח · ניהול מלאי': 'Accountant · shipping company · inventory',
    '0 הקלדה ידנית': '0 manual typing',
    'מקבל 50-200 חשבוניות PDF בחודש מספקים. כל אחד נראה אחרת. שעות של הקלדה למערכת — וטעויות אנוש שעולות כסף.':
      'You get 50–200 PDF invoices a month from suppliers. Each one looks different. Hours of typing into the system — and human errors that cost money.',
    'PDF נכנס לתיקייה — המערכת קוראת אותו לבד, מוציאה את הפרטים החשובים (סכום, תאריך, ספק, מספר חשבונית), ומכניסה ישר למערכת חשבונאות שלך.':
      'A PDF drops into a folder — the system reads it on its own, pulls the key details (amount, date, supplier, invoice number), and enters them straight into your accounting system.',
    '200 PDF → 0 הקלדה': '200 PDFs → 0 typing',
    'שעות של עבודה ידנית הופכות לאוטומטיות. אפס טעויות הקלדה. רואה החשבון שלך מתאהב בך.':
      'Hours of manual work become automatic. Zero typing errors. Your accountant falls in love with you.',
    // case 10
    '01 · פורטל': '01 · Portal',
    'הלקוח מחבר את הוואטסאפ': 'The customer connects WhatsApp',
    'לבד.': 'on their own.',
    'שירות WhatsApp API · פורטל לקוחות': 'WhatsApp API service · customer portal',
    'שירות עצמי': 'Self-service',
    'תיעוד API מלא': 'Full API docs',
    'כל לקוח חדש היה צריך את בעל השירות: שיקים מספר וישלח קישור לסריקה. כל חיבור — עוד עבודה ידנית.':
      'Every new customer needed the owner: set up a number and send a scan link. Every connection — more manual work.',
    'הלקוח נרשם, סורק QR בתוך הפורטל ומקבל מפתח API ותיעוד. רואה אם המספר מחובר ומנהל הכל לבד.':
      'The customer signs up, scans the QR inside the portal and gets an API key and docs. They see whether the number is connected and manage it all themselves.',
    'הרשמה → סריקה → API': 'Sign up → scan → API',
    'לצפייה בפורטל ↗': 'View the portal ↗',
    'אף אחד לא מקים לקוחות ביד. הלקוח מתחבר לבד, גם בלילה.':
      'Nobody sets customers up by hand. The customer connects alone, even at night.',

    // ---- Privacy page ----
    'מסמך משפטי': 'Legal document',
    'מדיניות': 'Privacy',
    'פרטיות': 'Policy',
    'עודכן לאחרונה: 9 במאי 2026': 'Last updated: May 9, 2026',
    'אנחנו ב-Automation Club (להלן: "אנחנו", "החברה") מכבדים את פרטיותך. מסמך זה מסביר איזה מידע נאסף בעת שימוש באתר ובשירותים שלנו, איך אנחנו משתמשים בו, עם מי הוא עשוי להיחשף, ואילו זכויות עומדות לך לפי דין — לרבות חוק הגנת הפרטיות, התשמ"א-1981, ותקנות ה-GDPR למבקרים מהאיחוד האירופי.':
      'We at Automation Club ("we", "the company") respect your privacy. This document explains what information is collected when you use our site and services, how we use it, with whom it may be shared, and what rights you have under law — including Israel’s Protection of Privacy Law, 5741-1981, and the GDPR for visitors from the European Union.',
    '1. איזה מידע נאסף': '1. What information is collected',
    'מידע שאתה מוסר ביוזמתך — בעת מילוי טופס יצירת קשר, קביעת שיחת ייעוץ או פנייה אלינו במייל/וואטסאפ:':
      'Information you provide voluntarily — when filling out a contact form, booking a consultation, or reaching out to us by email/WhatsApp:',
    'כתובת דוא"ל': 'Email address',
    'מספר טלפון': 'Phone number',
    'שם החברה / תפקיד (אופציונלי)': 'Company name / role (optional)',
    'תוכן ההודעה והקשר העסקי שאתה מתאר': 'The message content and the business context you describe',
    'מידע שנאסף אוטומטית בעת הגלישה:': 'Information collected automatically while browsing:',
    'כתובת IP, סוג דפדפן, מערכת הפעלה': 'IP address, browser type, operating system',
    'דפים שנצפו, זמן שהייה, מקור ההגעה (Referrer)': 'Pages viewed, time on site, referral source (Referrer)',
    'מזהי קוקיז ומדידה אנליטית': 'Cookie identifiers and analytics measurement',
    '2. למה משתמשים במידע': '2. How the information is used',
    'ליצירת קשר חוזר עם פניות שהתקבלו דרך האתר': 'To follow up on inquiries received through the site',
    'למתן ההצעה / השירות עליו סוכם': 'To provide the proposal / service agreed upon',
    'לשיפור האתר, חוויית המשתמש, וניתוח ביצועים': 'To improve the site, user experience, and analyze performance',
    'לעמידה בחובות חוקיות (חשבוניות, רישומים מס-רגולטוריים)':
      'To comply with legal obligations (invoices, tax/regulatory records)',
    'למשלוח עדכונים על השירות — רק למי שאישר במפורש או שהוא לקוח קיים, ובכפוף לאפשרות הסרה בכל עת':
      'To send service updates — only to those who explicitly opted in or are existing clients, and subject to opt-out at any time',
    '3. בסיס חוקי לעיבוד': '3. Legal basis for processing',
    'העיבוד מתבצע על אחד מהבסיסים הבאים: הסכמתך, ביצוע חוזה / צעדים טרום-חוזיים שביקשת, חובה חוקית, או אינטרס לגיטימי שלנו (למשל אבטחת מידע ומניעת הונאות) — בכפוף לזכויותיך.':
      'Processing is carried out on one of the following bases: your consent, performance of a contract / pre-contractual steps you requested, a legal obligation, or our legitimate interest (e.g. information security and fraud prevention) — subject to your rights.',
    '4. שיתוף עם צדדים שלישיים': '4. Sharing with third parties',
    'איננו מוכרים מידע אישי. אנחנו עשויים לשתף מידע עם ספקי שירות שמאפשרים לנו להפעיל את העסק, ובמסגרת המוגדרת לכך בלבד:':
      'We do not sell personal information. We may share information with service providers that enable us to run the business, and only within the scope defined for that purpose:',
    'תשתית ואחסון אתר': 'Site infrastructure & hosting',
    'דומיין ו-DNS': 'Domain & DNS',
    'ניהול לקוחות ופניות': 'Client & inquiry management',
    '— מערכות CRM ואוטומציה (Make, n8n, Google Workspace וכד\')':
      '— CRM & automation systems (Make, n8n, Google Workspace, etc.)',
    'תקשורת': 'Communication',
    '— ספקי דוא"ל ו-WhatsApp Business': '— email providers & WhatsApp Business',
    'אנליטיקה': 'Analytics',
    '— כלי מדידה אנונימיים (אם פעילים)': '— anonymous measurement tools (if active)',
    'חלק מהספקים שוכנים מחוץ לישראל / לאיחוד האירופי. ההעברה מתבצעת בכפוף להגנות מקובלות (Standard Contractual Clauses, מנגנוני adequacy וכו\').':
      'Some providers are located outside Israel / the European Union. Transfers are carried out subject to accepted safeguards (Standard Contractual Clauses, adequacy mechanisms, etc.).',
    '5. קוקיז ומדידה': '5. Cookies & measurement',
    'האתר עשוי להשתמש בקוקיז חיוניים (לתפקוד תקין) ובקוקיז אנליטיים (למדידה והבנת השימוש). תוכל להגדיר את הדפדפן לחסום או למחוק קוקיז — ייתכן שחלקים מהאתר לא יפעלו תקין כתוצאה.':
      'The site may use essential cookies (for proper functioning) and analytics cookies (to measure and understand usage). You can set your browser to block or delete cookies — as a result, parts of the site may not work properly.',
    '6. שמירת מידע': '6. Data retention',
    'נשמור מידע אישי כל עוד הוא נדרש למטרות שלשמן נאסף, לעמידה בחובות חוקיות (למשל מס הכנסה — 7 שנים), או להגנה משפטית. מידע שאינו נדרש עוד יימחק או יוסב לאנונימי.':
      'We retain personal information as long as it’s needed for the purposes it was collected for, to meet legal obligations (e.g. income tax — 7 years), or for legal defense. Information no longer needed is deleted or anonymized.',
    '7. הזכויות שלך': '7. Your rights',
    'עיון': 'Access',
    '— לבקש לראות את המידע שמוחזק עליך': '— to request to see the information held about you',
    'תיקון': 'Correction',
    '— לבקש שמידע שגוי יתוקן': '— to request that incorrect information be corrected',
    'מחיקה': 'Deletion',
    '— לבקש מחיקת מידע (בכפוף לחובות שמירה חוקיות)':
      '— to request deletion of information (subject to legal retention obligations)',
    'חזרה מהסכמה': 'Withdraw consent',
    '— לבטל הסכמה למשלוח דיוור או עיבוד שמתבסס על הסכמה':
      '— to withdraw consent to mailings or processing that relies on consent',
    'תלונה': 'Complaint',
    '— להגיש תלונה לרשות להגנת הפרטיות (ישראל) או לרשות הפיקוח הרלוונטית באיחוד האירופי':
      '— to file a complaint with the Privacy Protection Authority (Israel) or the relevant supervisory authority in the EU',
    'לפניות בנושאי פרטיות:': 'For privacy inquiries:',
    '8. אבטחת מידע': '8. Information security',
    'אנחנו נוקטים אמצעים סבירים להגנה על המידע — תעבורה מוצפנת ב-HTTPS, הרשאות גישה מבוקרות, גיבויים, ועדכוני אבטחה לתשתיות. עם זאת, אין מערכת מוגנת ב-100% — לא ניתן להבטיח אבטחה מוחלטת.':
      'We take reasonable measures to protect the information — HTTPS-encrypted traffic, controlled access permissions, backups, and security updates to our infrastructure. That said, no system is 100% secure — absolute security cannot be guaranteed.',
    '9. קטינים': '9. Minors',
    'השירות מיועד לבעלי ומנהלי עסקים מעל גיל 18. איננו אוספים ביודעין מידע ממי שמתחת לגיל 18.':
      'The service is intended for business owners and managers over the age of 18. We do not knowingly collect information from anyone under 18.',
    '10. שינויים במדיניות': '10. Changes to this policy',
    'מדיניות זו עשויה להתעדכן מעת לעת. הגרסה המעודכנת תפורסם בעמוד זה עם תאריך עדכון חדש. שינוי מהותי יקבל הודעה בולטת מראש.':
      'This policy may be updated from time to time. The updated version will be published on this page with a new update date. A material change will be given prominent notice in advance.',
    '11. יצירת קשר': '11. Contact',
    'שאלה, בקשה, או תלונה בנושא פרטיות:': 'A question, request, or complaint about privacy:',
    'דוא"ל:': 'Email:'
  };

  // Website copy refresh. Hebrew in HTML remains the source of truth.
  Object.assign(TEXT, {
    "מה אני בונה": "What I build",
    "שיחת היכרות": "Intro call",
    "אוטומציות שמתאימות לדרך שבה העסק שלך כבר עובד.": "Automation that fits the way your business already works.",
    "אוטומציה לעסקים · מערכות · AI": "Business automation · Systems · AI",
    "העבודה החוזרת": "The repetitive work",
    "בעסק שלך": "in your business",
    "יכולה לקרות לבד.": "can run on its own.",
    "אני בונה אוטומציות שמחברות בין הכלים שכבר יש לך, מטפלות במשימות שחוזרות כל יום ומפנות לך זמן ללקוחות ולעבודה החשובה באמת.": "I build automations that connect the tools you already use, handle recurring tasks, and free up time for customers and the work that matters most.",
    "נדבר על העסק שלך": "Let's talk about your business",
    "אפשר להתחיל בפרויקט חדש": "Open to new projects",
    "שיחת היכרות ללא עלות · 20–30 דקות": "Free intro call · 20–30 minutes",
    "מתחילים בתהליך אחד ברור": "Start with one clear process",
    "המערכת והתיעוד נשארים אצלך": "Your system and documentation stay with you",
    "מוכר לך?": "Sound familiar?",
    "היום שלך מלא.": "Your day is full.",
    "אבל העבודה החשובה נדחית.": "The important work keeps waiting.",
    "ליד נכנס, פרטים עוברים בין מערכות, מישהו צריך לשלוח תזכורת. כל פעולה קטנה מושכת אותך בחזרה לתפעול.": "A lead comes in, details move between systems, someone has to send a reminder. Every small task pulls you back into operations.",
    "אותם פרטים,": "The same details,",
    "שוב ושוב.": "again and again.",
    "טופס, גיליון, מערכת לקוחות וחשבונית — אותם פרטים מוקלדים בכל מקום מחדש.": "Form, spreadsheet, CRM, invoice — the same details are entered again and again.",
    "הזמן מצטבר,": "The time adds up,",
    "וגם הסיכוי לטעות.": "and so does the chance of mistakes.",
    "פנייה נכנסה.": "A lead came in.",
    "מי חוזר אליה?": "Who follows up?",
    "פנייה שמגיעה בערב מחכה לבוקר. אחר כך צריך לזכור לחזור, לעדכן סטטוס ולשלוח הצעה.": "An evening inquiry waits until morning. Then someone must remember to reply, update its status, and send a quote.",
    "כשאין תהליך קבוע,": "Without a clear process,",
    "קל לפספס את הצעד הבא.": "the next step is easy to miss.",
    "הכל עובר דרכך.": "Everything runs through you.",
    "תיאומים, תזכורות, חשבוניות ודוחות מחכים שתתפנה.": "Scheduling, reminders, invoices, and reports wait for you to find time.",
    "כשהיום עמוס או כשאינך זמין,": "When your day is full or you are away,",
    "העבודה פשוט נעצרת.": "the work stops.",
    "עוד יום שמלא במשימות קטנות": "Another day of small tasks",
    "את הזמן הזה": "You can give that time",
    "אפשר להחזיר לעסק,": "back to the business,",
    "תהליך אחד בכל פעם.": "one process at a time.",
    "איך אני עובד": "How I work",
    "קודם מבינים את התהליך.": "Understand the process first.",
    "אחר כך בונים": "Then build",
    "את האוטומציה.": "the automation.",
    "אני מתחיל מהמקום שבו העבודה נתקעת: מי מקבל את המידע, מה צריך לקרות אחר כך ומתי אדם צריך להיכנס לתמונה. משם בוחרים את הכלים שמתאימים לעסק שלך.": "I start where work gets stuck: who receives the information, what needs to happen next, and when a person needs to step in. Then I choose the tools that fit your business.",
    "גם כשאין חיבור מוכן": "Even when there is no ready-made connection",
    "אפשר לשלב כלים קיימים עם קוד מותאם כשצריך תהליך שהמוצר מהמדף לא יודע לבצע.": "I combine existing tools with custom code when an off-the-shelf product cannot handle the process.",
    "התהליך כולו, מקצה לקצה": "The whole process, end to end",
    "מהפנייה הראשונה ועד לעדכון הלקוח והצוות — המידע עובר בין המערכות בלי הקלדה חוזרת.": "From the first inquiry to updates for customers and staff, information moves between systems without duplicate entry.",
    "יש עם מי לדבר גם אחרי ההשקה": "Support after launch",
    "אחרי ההשקה אפשר להמשיך בתחזוקה ושיפורים, כדי שהתהליך יתאים גם כשהעסק משתנה.": "After launch, ongoing maintenance and improvements can keep the process in step with your business.",
    "הסבר ברור בכל שלב": "Clear explanations at every step",
    "אתה יודע מה נבנה, למה דווקא כך ומה הצוות שלך יצטרך לעשות. בלי להכיר את הכלים מבפנים.": "You know what is being built, why, and what your team will need to do — without having to learn the tools inside out.",
    "— מה אפשר להפוך לאוטומטי": "— What you can automate",
    "כך זה נראה": "Here is how it works",
    "בתהליכים יומיומיים.": "in everyday processes.",
    "לא צריך להתחיל בשינוי גדול.": "You do not have to start with a major overhaul.",
    "הנה שישה תהליכים נפוצים שאפשר לבנות סביב הדרך שבה העסק שלך עובד.": "Here are six common processes we can build around the way your business works.",
    "כל פנייה מגיעה": "Every inquiry lands",
    "למקום אחד.": "in one place.",
    "פניות מהטופס, מוואטסאפ ומערוצים נוספים נכנסות למערכת הלקוחות עם המקור, הפרטים והמשימה הבאה.": "Inquiries from your form, WhatsApp, and other channels reach your CRM with their source, details, and next step.",
    "פגישות בלי מרדף אחרי תיאומים": "Scheduling without the back-and-forth",
    "הלקוח בוחר מועד פנוי, מקבל אישור ותזכורת. הצוות רואה את הפגישה ביומן.": "Customers choose an available time and get a confirmation and reminder. Your team sees the booking on its calendar.",
    "חשבוניות ותזכורות תשלום": "Invoices and payment reminders",
    "לאחר שלב שהגדרת, החשבונית נשלחת והמערכת מזכירה על תשלום שלא התקבל.": "After the step you define, an invoice goes out and the system follows up on unpaid balances.",
    "דוח שמגיע אליך, לא להפך": "A report delivered to you",
    "מכירות, פניות ומשימות פתוחות מתרכזות בדוח קבוע, בלי לאסוף נתונים מכל מערכת בנפרד.": "Sales, inquiries, and open tasks appear in a regular report, without gathering data from each system separately.",
    "מההזמנה ועד לעדכון הלקוח": "From order to customer update",
    "עוזר AI": "An AI assistant",
    "עם גבולות ברורים.": "with clear boundaries.",
    "אפשר לתת לעוזר לענות על שאלות חוזרות, לסכם שיחות ולמיין פניות — ולהעביר לאדם את מה שדורש החלטה.": "An assistant can answer common questions, summarize conversations, and sort inquiries, while passing decisions to a person.",
    "— מבט על העבודה": "— A look at the work",
    "במערכת שעובדת.": "in a working system.",
    "שלושה סוגי פתרונות.": "Three types of solutions.",
    "מכל אחד אפשר ללמוד איך להפוך עבודה ידנית לתהליך ברור.": "Each shows how manual work can become a clear process.",
    "מענה ראשוני": "First response",
    "לפניות נכנסות": "to new inquiries",
    "מענה ראשוני מהיר": "Fast first response",
    "פניות נכנסות מכמה ערוצים. מענה ידני לכל אחת מהן מעכב את ההמשך.": "Inquiries arrive from several channels. Answering each one manually slows down the next step.",
    "המערכת עונה על שאלות נפוצות ומעבירה פניות שדורשות שיחה אישית.": "The system answers common questions and passes inquiries that need a personal conversation to a person.",
    "מענה גם מחוץ לשעות העבודה": "Responses outside business hours",
    "אפשר להיכנס לשיחה כשהלקוח צריך אדם, במקום לטפל ידנית בכל פנייה.": "You can step in when someone needs a person, instead of handling every inquiry manually.",
    "הקמת לקוחות": "WhatsApp client",
    "בוואטסאפ": "onboarding",
    "פחות עבודה בכל חיבור": "Less work per connection",
    "תהליך הקמה קבוע": "A repeatable setup process",
    "הקמה ידנית לכל לקוח חדש חזרה על אותן פעולות והאטה את השירות.": "Manual setup repeated the same steps for every new client and slowed down the service.",
    "פורטל אחד מרכז הרשמה, חיבור וניהול של לקוחות השירות.": "One portal brings together signup, connection, and account management.",
    "שלבי הקמה בשירות עצמי": "Self-service setup steps",
    "לקוח חדש יכול לבצע את שלבי החיבור בעצמו, גם כשבעל השירות לא זמין.": "A new customer can complete the connection steps independently, even when the provider is unavailable.",
    "החנות": "The store",
    "מסונכרנת": "stays in sync",
    "מידע עובר בין מערכות": "Information moves between systems",
    "פחות הקלדה ידנית": "Less manual entry",
    "מלאי, מחירים והזמנות דורשים עדכון בכמה מערכות שונות.": "Inventory, prices, and orders need updates across several systems.",
    "המערכת מעבירה עדכונים בין החנות, ניהול המלאי והשילוח לפי הכללים שהוגדרו.": "The system passes updates between the store, inventory management, and shipping according to the defined rules.",
    "עדכון אחד במקום כמה": "One update instead of several",
    "פחות העתקות ידניות ויותר זמן לטפל במקרים שדורשים תשומת לב.": "Less manual copying and more time for cases that need attention.",
    "לכל הדוגמאות": "See all examples",
    "מתחילים בתהליך אחד.": "Start with one process.",
    "בודקים שהוא עובד.": "Make sure it works.",
    "ממשיכים משם.": "Build from there.",
    "כבר בשיחה הראשונה נבין מה גוזל זמן, מה צריך לקרות במקום ומה תהיה דרך סבירה למדוד שיפור.": "In the first call, we identify what takes time, what should happen instead, and how to measure improvement.",
    "בשיחה של 20–30 דקות תראה לי איפה העבודה נתקעת. נבדוק אם אוטומציה היא באמת הפתרון הנכון.": "In a 20–30 minute call, show me where the work gets stuck. We will see whether automation is the right solution.",
    "הצעה כתובה": "Written proposal",
    "תקבל תיאור של התהליך, מה נבנה, מה נדרש ממך, לוח זמנים ומחיר לפני שמתחילים.": "You will receive a description of the process, what will be built, what I need from you, a timeline, and a price before work begins.",
    "שלב ראשון ממוקד": "A focused first step",
    "בוחרים פעולה חוזרת אחת, בונים אותה ובודקים אותה בעבודה אמיתית לפני שמרחיבים.": "We choose one recurring task, build the solution, and test it in real work before expanding.",
    "בנייה והטמעה": "Build and handover",
    "אחרי בדיקה ותיקונים, מחברים את התהליך לעבודה היומיומית ומראים לצוות איך להשתמש בו.": "After testing and adjustments, I connect the process to daily work and show your team how to use it.",
    "תחזוקה ושיפור": "Maintenance and improvements",
    "(לא חובה)": "(optional)",
    "אם צריך, ממשיכים לליווי חודשי: טיפול בתקלות, התאמות ושיפורים ככל שהעסק משתנה.": "If needed, monthly support covers issues, adjustments, and improvements as the business changes.",
    "מה חשוב לי שתדע": "What you can expect",
    "תהליך ברור.": "A clear process.",
    "שליטה אצלך.": "You stay in control.",
    "לפני שמתחילים, מסכמים מה יקרה בשלב הראשון ומה תקבל בסופו. כך אפשר להחליט על ההמשך על בסיס משהו שעובד.": "Before work begins, we agree on what happens in the first step and what you receive at the end. That gives you something real to evaluate before expanding.",
    "מתחילים קטן": "Start small",
    "ורואים שזה עובד.": "and see it work.",
    "בוחרים תהליך אחד עם בעיה ברורה. בונים, בודקים ומתקנים לפני שמחברים אליו עוד חלקים.": "We choose one process with a clear problem, build it, test it, and adjust it before adding more parts.",
    "שלב ראשון מוגדר מראש": "A clearly scoped first step",
    "הקוד והתיעוד": "The code and documentation",
    "נשארים אצלך.": "stay with you.",
    "בסיום העבודה מקבלים את מה שנבנה ואת התיעוד הדרוש להפעלה ולהמשך פיתוח.": "At handover, you receive what was built and the documentation needed to run and extend it.",
    "אפשר להמשיך גם עם ספק אחר": "You can work with another provider",
    "מחליטים מראש": "Agree in advance",
    "איך נבדוק שיפור.": "how to measure progress.",
    "זמן טיפול, פעולות ידניות או זמן תגובה — בוחרים מדדים שמתאימים לתהליך ומסתכלים עליהם אחרי ההטמעה.": "Handling time, manual steps, or response time — we choose measures that fit the process and review them after launch.",
    "מודדים את מה שחשוב לעסק": "Measure what matters to the business",
    "— בלי הבטחות שאי אפשר לבדוק.": "— No promises you cannot check.",
    "כמה דברים שכדאי לדעת": "A few things to know",
    "לפני שמתחילים.": "before we start.",
    "כמה עולה לבנות אוטומציה?": "How much does an automation cost?",
    "שיחת ההיכרות ללא עלות. מחיר הפרויקט תלוי בתהליך, במספר המערכות ובמורכבות החיבור. אחרי שנבין את הצורך תקבל הצעה כתובה עם תכולה ומחיר.": "The intro call is free. Project cost depends on the process, the systems involved, and the complexity of the connection. Once we understand the need, you will receive a written scope and price.",
    "צריך להבין בטכנולוגיה כדי לעבוד איתך?": "Do I need technical knowledge to work with you?",
    "לא. אני מסביר מה המערכת תעשה בעבודה היומיומית, איזה מידע היא צריכה ומתי הצוות שלך נכנס לתמונה.": "No. I explain what the system will do in daily work, what information it needs, and when your team steps in.",
    "כבר ניסינו אוטומציה והיא לא החזיקה. מה יהיה שונה?": "We tried automation before and it did not last. What will be different?",
    "נבדוק קודם איפה התהליך הקודם נתקע. השלב הראשון ממוקד, כולל בדיקה בעבודה אמיתית, ואפשר להמשיך לתחזוקה אחרי ההשקה.": "First, we look at where the earlier process failed. The first step is focused and tested in real work, with ongoing support available after launch.",
    "מה קורה אם נרצה להמשיך בלעדיך?": "What if we want to continue without you?",
    "הקוד והתיעוד של הפרויקט נמסרים לך. ספק אחר יוכל לעיין בהם ולהמשיך את העבודה, בכפוף לגישות ולשירותים שבהם המערכת משתמשת.": "The project code and documentation are handed over to you. Another provider can review them and continue the work, subject to access and the services the system uses.",
    "העסק שלי קטן. זה מתאים?": "Is this right for a small business?",
    "כן, אם יש פעולה חוזרת שלוקחת זמן או גורמת לפספוסים. לא חייבים מערכת גדולה: אפשר להתחיל מהתהליך שכדאי לפתור ראשון.": "Yes, if a recurring task takes time or leads to missed steps. You do not need a large system; we can start with the process most worth fixing.",
    "מתי רואים משהו עובד?": "When will we see something working?",
    "זה תלוי במורכבות ובגישות למערכות. בהצעה אכתוב מה כולל השלב הראשון ומתי אפשר לבדוק אותו בעבודה אמיתית.": "It depends on complexity and access to the systems. The proposal will spell out the first step and when it can be tested in real work.",
    "מתחילים כאן": "Start here",
    "מה גוזל לך זמן": "What takes your time",
    "בכל שבוע?": "every week?",
    "ספר לי על פעולה שחוזרת אצלך בעסק. בשיחת היכרות קצרה נבדוק אם אפשר להפוך אותה לתהליך שעובד גם בלעדיך.": "Tell me about a task that keeps coming up in your business. In a short intro call, we will see whether it can become a process that runs without you.",
    "מה נברר בשיחה": "What we will cover",
    "איפה בדיוק התהליך נתקע היום": "Where the process gets stuck today",
    "מה אפשר לשפר ומה יידרש לכך": "What can improve and what it will take",
    "האם נכון להתחיל בפרויקט יחד": "Whether a project together makes sense",
    "איך נוח לך שאחזור אליך?": "How should I get back to you?",
    "מה שנוח": "Either works",
    "איזו פעולה חוזרת תרצה לפתור?": "Which recurring task would you like to fix?",
    "שלח פרטים בוואטסאפ": "Send details on WhatsApp",
    "רוצה לכתוב ישירות? פתח וואטסאפ": "Prefer to message directly? Open WhatsApp",
    "הטופס יפתח הודעת וואטסאפ עם הפרטים שהזנת. ההודעה תישלח רק אחרי שתאשר אותה.": "The form opens a WhatsApp message with the details you entered. It is sent only after you confirm it.",
    "— דוגמאות לפתרונות": "— Solution examples",
    "כך פותרים": "Ways to solve",
    "עבודה שחוזרת.": "repetitive work.",
    "כל כרטיס מציג בעיה מוכרת, תהליך שאפשר לבנות ומה ישתנה בעבודה היומיומית.": "Each card shows a familiar bottleneck, a process that can be built, and how day-to-day work could change.",
    "בסוף העמוד יש גם קישור לפורטל לקוחות שנבנה.": "At the end of the page, you can also see a customer portal that was built.",
    "דוגמה · יצרנית מוצרי אריזה": "Example · packaging manufacturer",
    "פניות מגיעות מכמה ערוצים. אם כל תשובה מחכה שבעל העסק יתפנה, גם לקוח מוכן לקנייה נשאר בלי מענה.": "Inquiries arrive through several channels. If each reply waits for the owner, even a buyer who is ready to act waits unanswered.",
    "מה אפשר לבנות": "What we can build",
    "מענה לשאלות נפוצות, איסוף פרטים ראשוניים והעברת שיחות שדורשות אדם ישירות לבעל העסק.": "Answers to common questions, collection of initial details, and handoff of conversations that need a person.",
    "מה משתנה": "What changes",
    "בעל העסק נכנס לשיחה כשהיא דורשת טיפול אישי, במקום להתחיל כל פנייה מאפס.": "The owner steps in when personal attention is needed instead of starting every inquiry from scratch.",
    "דוגמה · שירות לעסקים": "Example · business service",
    "כל לקוח חדש דורש את אותם שלבי ההקמה, ההרשאות והבדיקות. כשהכל נעשה ביד, מספר הלקוחות שאפשר לשרת מוגבל בזמן של הצוות.": "Every new client needs the same setup, permissions, and checks. When it is all manual, team time limits how many clients can be served.",
    "פורטל שמרכז הרשמה, חיבור חשבון, בדיקת סטטוס והנחיות ללקוח במקום אחד.": "A portal that brings signup, account connection, status checks, and customer guidance into one place.",
    "הלקוח מבצע חלק מההקמה בעצמו, והצוות מתערב רק במקרה חריג.": "Customers complete part of the setup themselves, while the team steps in for exceptions.",
    "דוגמה · חנות אונליין": "Example · online store",
    "מוצרים, מלאי, הזמנות ומשלוחים נמצאים בכמה מערכות. כל שינוי ידני צריך לעבור ביניהן, ולעיתים פרט אחד נשאר מאחור.": "Products, inventory, orders, and shipping live in different systems. Each manual change has to move between them, and sometimes a detail gets left behind.",
    "חיבור שמעביר עדכונים בין החנות, מערכת המלאי והשילוח לפי כללים ברורים, עם התראה כשנדרש טיפול ידני.": "A connection that passes updates between the store, inventory, and shipping according to clear rules, with alerts when manual attention is needed.",
    "הצוות מקדיש פחות זמן להעתקה בין מערכות ויותר זמן להזמנות חריגות וללקוחות.": "The team spends less time copying between systems and more time on unusual orders and customers.",
    "קמפיינים ודוחות": "Campaigns and reports",
    "ממקום אחד": "in one place",
    "דוגמה · סוכנות שיווק": "Example · marketing agency",
    "פחות מעבר בין חשבונות": "Less switching between accounts",
    "תמונה עדכנית במקום אחד": "A current view in one place",
    "כשכל חשבון מנוהל בנפרד, בדיקת ביצועים והכנת דוחות דורשות מעבר חוזר בין ממשקים.": "When each account is managed separately, checking performance and preparing reports means switching between interfaces again and again.",
    "מסך שמרכז נתונים ופעולות חוזרות עבור החשבונות שהסוכנות מנהלת, עם הרשאות ובדיקות לפני שינוי.": "A screen that brings together data and recurring tasks for the agency’s accounts, with permissions and checks before changes are made.",
    "כמה חשבונות → תצוגה אחת": "Many accounts → one view",
    "קל יותר לראות מה דורש טיפול, לבצע פעולות חוזרות ולהפיק דוח בלי לאסוף ידנית נתונים מכל חשבון.": "It becomes easier to see what needs attention, handle repeated actions, and prepare a report without manually gathering data from each account.",
    "לשיחות חוזרות": "for recurring conversations",
    "דוגמה · שירות ומכירות": "Example · service and sales",
    "מענה לפי הקשר": "Context-aware replies",
    "העברה לאדם כשצריך": "Human handoff when needed",
    "אותן שאלות חוזרות בערוצים שונים. כשמישהו צריך לבדוק כל שיחה מתחילתה, קשה לענות בעקביות ובזמן.": "The same questions recur across channels. When someone must review every conversation from the start, timely and consistent replies are hard.",
    "עוזר שמקבל הקשר מהשיחה, עונה על נושאים שהוגדרו מראש ומעביר לאדם פניות מחוץ לגבולות שלו.": "An assistant that reads the conversation context, replies within defined topics, and hands off anything outside its limits.",
    "שאלות חוזרות מקבלות מענה": "Recurring questions get answered",
    "הצוות יכול להתמקד בשיחות שדורשות שיקול דעת, עם היסטוריית השיחה מול העיניים.": "The team can focus on conversations requiring judgment, with the conversation history in view.",
    "תור שהתפנה": "An open slot",
    "מוצע לבא בתור": "reaches the next person",
    "דוגמה · קליניקה": "Example · clinic",
    "תזכורות לפני התור": "Appointment reminders",
    "רשימת המתנה שמתעדכנת": "An updated waitlist",
    "כשמטופל מבטל ברגע האחרון, הצוות צריך להתקשר לממתינים אחד אחד. בינתיים התור נשאר ריק.": "When a patient cancels at short notice, staff call people on the waitlist one by one. Meanwhile, the appointment stays empty.",
    "תזכורות לפני התור, קישור ביטול ברור והצעה אוטומטית לממתינים כשמתפנה מקום.": "Reminders before appointments, a clear cancellation link, and an automatic offer to people on the waitlist when a slot opens.",
    "פחות שיחות תיאום ידניות": "Fewer manual scheduling calls",
    "הצוות רואה מי אישר, מי ביטל ולמי הוצע התור שהתפנה.": "Staff see who confirmed, who canceled, and who has been offered the open slot.",
    "07 · מעקב": "07 · Follow-up",
    "הצעות לא נשכחות.": "Quotes get followed up.",
    "תשלומים במעקב.": "Payments get tracked.",
    "דוגמה · עסק שירות": "Example · service business",
    "תזכורות להצעות פתוחות": "Reminders for open quotes",
    "מעקב אחרי חשבוניות": "Invoice follow-up",
    "הצעת מחיר נשלחת, אבל אין זמן לבדוק אם התקבלה תשובה. גם חשבונית שלא שולמה מחכה שמישהו ייזכר בה.": "A quote is sent, but no one has time to check for a response. An unpaid invoice also waits for someone to remember it.",
    "מעקב אחרי הצעות פתוחות ותזכורות בתזמון שקובעים מראש, לצד רשימה ברורה של חשבוניות שדורשות טיפול.": "Follow-up on open quotes and reminders at agreed times, along with a clear list of invoices that need attention.",
    "הצוות יודע למי צריך לחזור ומתי, בלי לנהל את כל המעקב מהזיכרון.": "The team knows whom to follow up with and when, without managing everything from memory.",
    "סיכום שיחה": "Call summary",
    "ישירות בכרטיס הלקוח": "straight into the CRM",
    "דוגמה · צוות מכירות": "Example · sales team",
    "פחות סיכומים ידניים": "Less manual note-taking",
    "היסטוריית שיחות מסודרת": "An organized call history",
    "אחרי כל שיחה צריך לזכור מה סוכם, מה הובטח ומה הצעד הבא — ואז להקליד הכול למערכת הלקוחות.": "After each call, someone has to remember what was agreed, what was promised, and the next step, then enter it all in the CRM.",
    "טיוטת סיכום שנוצרת אחרי השיחה, נבדקת בידי איש הצוות ומתעדכנת בכרטיס הלקוח.": "A draft summary generated after the call, reviewed by a team member, and then saved to the customer record.",
    "פחות הקלדה אחרי שיחות, ויותר הקשר זמין לכל מי שממשיך את הטיפול.": "Less typing after calls and more context for the next person handling the customer.",
    "פרטי חשבוניות": "Invoice details",
    "מתוך קובצי PDF": "from PDF files",
    "דוגמה · הנהלת חשבונות": "Example · bookkeeping",
    "חילוץ פרטים אוטומטי": "Automatic data extraction",
    "חשבוניות מגיעות כקובצי PDF בפורמטים שונים. מישהו צריך למצוא את הסכום, התאריך והספק ולהקליד אותם מחדש.": "Invoices arrive as PDFs in different formats. Someone has to find the amount, date, and vendor, then retype them.",
    "מערכת שקוראת את הקבצים, מחלצת את השדות הדרושים ומציגה לבדיקה פרטים לא ברורים לפני העברה למערכת החשבונאות.": "A system that reads the files, extracts the required fields, and flags uncertain details for review before sending them to the accounting system.",
    "קובץ PDF → פרטים לבדיקה": "PDF → details ready for review",
    "במקום להקליד כל חשבונית מחדש, הצוות בודק חריגים ומאשר את הנתונים.": "Instead of retyping every invoice, the team reviews exceptions and confirms the data.",
    "חיבור וואטסאפ": "WhatsApp connection",
    "בשירות עצמי.": "through self-service.",
    "לצפייה בפורטל ↗": "View the portal ↗",
    "מה היה צריך לפתור": "The problem to solve",
    "חיבור מספר חדש דרש מעורבות של בעל השירות בכל שלב: פתיחת החשבון, סריקה ובדיקת החיבור.": "Connecting a new number required the provider at every step: opening the account, scanning, and checking the connection.",
    "מה נבנה": "What was built",
    "הלקוח נרשם לפורטל, סורק קוד QR ומקבל גישה למפתח API ולתיעוד. סטטוס החיבור מופיע במקום אחד.": "Customers sign up in the portal, scan a QR code, and access an API key and documentation. Connection status appears in one place.",
    "מה השתנה בתהליך": "What changed in the process",
    "הלקוח מבצע את שלבי החיבור בפורטל. בעל השירות מטפל במקרים שדורשים התערבות, במקום להקים כל חשבון ידנית.": "Customers complete the connection steps in the portal. The provider handles cases that need help instead of setting up every account manually.",
    "— התור שלך": "— Your turn",
    "איזה תהליך": "Which process",
    "מכביד אצלך": "is slowing",
    "על הצוות?": "your team down?",
    "ספר לי מה חוזר שוב ושוב בעסק שלך. בשיחה קצרה נבדוק איזה חלק כדאי לפתור ראשון.": "Tell me what keeps repeating in your business. In a short call, we will see which part to tackle first.",
    "חזרה לעמוד הבית": "Back to the homepage"
});

  /* ---- Attributes (title / meta description / placeholder / aria-label) ---- */
  var ATTR = {
    // meta descriptions
    'Automation Club — אוטומציות מותאמות לעסקים קטנים ובינוניים. בלי כלים מוגבלים, בלי פתרונות גנריים. שיחת ייעוץ חינם.':
      'Automation Club — custom automations for small and medium businesses. No limited tools, no generic solutions. Free consultation.',
    'עבודות נבחרות של Automation Club — חמישה פרויקטים אנונימיים. בעיה, גישה, תוצאה.':
      'Selected work by Automation Club — anonymized projects. Problem, approach, result.',
    'מדיניות הפרטיות של Automation Club — איזה מידע נאסף, איך משתמשים בו, ומה הזכויות שלך.':
      "Automation Club's privacy policy — what data is collected, how it's used, and your rights.",
    // document title
    'מדיניות פרטיות · Automation Club': 'Privacy Policy · Automation Club',
    // aria-labels
    'פתח תפריט': 'Open menu',
    'בוט לידים חכם — תקציר': 'Smart lead bot — summary',
    'פלטפורמת WhatsApp רב-לקוחית — תקציר': 'Multi-tenant WhatsApp platform — summary',
    'אוטומציית Shopify — תקציר': 'Shopify automation — summary',
    'תקציר בוט לידים': 'Lead bot summary',
    'תקציר WhatsApp רב-לקוחית': 'Multi-tenant WhatsApp summary',
    'תקציר Shopify': 'Shopify summary',
    'בוט לידים חכם — פרטי פרויקט': 'Smart lead bot — project details',
    'פלטפורמת WhatsApp רב-לקוחית — פרטי פרויקט': 'Multi-tenant WhatsApp platform — project details',
    'אוטומציית Shopify — פרטי פרויקט': 'Shopify automation — project details',
    'ניהול קמפיינים Meta — פרטי פרויקט': 'Meta campaign management — project details',
    'סוכן AI רב-ערוצי — פרטי פרויקט': 'Multi-channel AI agent — project details',
    'תזכורות פגישות ורשימת המתנה — פרטי פרויקט': 'Appointment reminders & waitlist — project details',
    'מעקב הצעות וחשבוניות — פרטי פרויקט': 'Quote & invoice follow-up — project details',
    'סיכום שיחות אוטומטי — פרטי פרויקט': 'Automatic call summaries — project details',
    'חילוץ נתונים מ-PDF — פרטי פרויקט': 'PDF data extraction — project details',
    'פורטל לקוחות ל-WhatsApp API — פרטי פרויקט': 'WhatsApp API customer portal — project details',
    'פרטי פרויקט בוט לידים': 'Lead bot project details',
    'פרטי פרויקט WhatsApp רב-לקוחית': 'Multi-tenant WhatsApp project details',
    'פרטי פרויקט Shopify': 'Shopify project details',
    'פרטי פרויקט קמפיינים Meta': 'Meta campaigns project details',
    'פרטי פרויקט סוכן AI רב-ערוצי': 'Multi-channel AI agent project details',
    'פרטי פרויקט פגישות': 'Appointments project details',
    'פרטי פרויקט מעקב הצעות וחשבוניות': 'Quote & invoice follow-up project details',
    'פרטי פרויקט סיכום שיחות': 'Call summaries project details',
    'פרטי פרויקט חילוץ PDF': 'PDF extraction project details',
    'פרטי פרויקט פורטל לקוחות': 'Customer portal project details',
    // placeholders
    'איך קוראים לך?': "What's your name?",
    '050-0000000': '050-0000000',
    'איזה עסק? מה לוקח הכי הרבה זמן ביום? (אפשר גם בשיחה)':
      'What kind of business? What takes the most time each day? (we can also cover it on the call)'
  };

  // Website copy refresh. Hebrew in HTML remains the source of truth.
  Object.assign(ATTR, {
    "אוטומציה לעסקים קטנים ובינוניים — Automation Club. חיבור מערכות, טיפול במשימות חוזרות ופתרונות מותאמים. שיחת היכרות ללא עלות.": "Business automation for small and medium businesses — Automation Club. Connected systems, recurring tasks, and tailored solutions. Free intro call.",
    "איזו משימה חוזרת שוב ושוב בעסק שלך?": "Which task keeps coming up in your business?",
    "דוגמאות לאוטומציה לעסקים — פניות, לקוחות, חנויות, תיאומים ונתונים. כולל קישור לפורטל לקוחות שנבנה.": "Business automation examples — inquiries, clients, stores, scheduling, and data. Includes a link to a completed customer portal.",
    "אוטומציה לעסקים | Automation Club": "Business Automation | Automation Club",
    "דוגמאות לאוטומציה | Automation Club": "Automation Examples | Automation Club",
    "בוט לידים חכם — פרטי דוגמה": "Smart lead bot — example details",
    "פלטפורמת WhatsApp רב-לקוחית — פרטי דוגמה": "Multi-tenant WhatsApp platform — example details",
    "אוטומציית Shopify — פרטי דוגמה": "Shopify automation — example details",
    "ניהול קמפיינים Meta — פרטי דוגמה": "Meta campaign management — example details",
    "סוכן AI רב-ערוצי — פרטי דוגמה": "Multi-channel AI agent — example details",
    "תזכורות פגישות ורשימת המתנה — פרטי דוגמה": "Appointment reminders and waitlist — example details",
    "מעקב הצעות וחשבוניות — פרטי דוגמה": "Quote and invoice follow-up — example details",
    "סיכום שיחות אוטומטי — פרטי דוגמה": "Automatic call summaries — example details",
    "חילוץ נתונים מ-PDF — פרטי דוגמה": "PDF data extraction — example details",
    "פרטי דוגמה בוט לידים": "Lead bot example details",
    "פרטי דוגמה WhatsApp רב-לקוחית": "Multi-tenant WhatsApp example details",
    "פרטי דוגמה Shopify": "Shopify example details",
    "פרטי דוגמה קמפיינים Meta": "Meta campaigns example details",
    "פרטי דוגמה סוכן AI רב-ערוצי": "Multi-channel AI agent example details",
    "פרטי דוגמה פגישות": "Appointments example details",
    "פרטי דוגמה מעקב הצעות וחשבוניות": "Quote and invoice follow-up example details",
    "פרטי דוגמה סיכום שיחות": "Call summaries example details",
    "פרטי דוגמה חילוץ PDF": "PDF extraction example details"
});

  /* ---- Collect translatable text nodes + attributes once ---- */
  var textNodes = []; // { node, he, key }
  var attrTargets = []; // { get, set, he, key }

  function collectText() {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var v = n.nodeValue;
        if (!v || !HE_RANGE.test(v)) return NodeFilter.FILTER_REJECT;
        var p = n.parentNode;
        if (!p) return NodeFilter.FILTER_REJECT;
        var tag = p.nodeName;
        if (tag === 'SCRIPT' || tag === 'STYLE') return NodeFilter.FILTER_REJECT;
        if (p.classList && p.classList.contains('material-symbols-outlined')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var n;
    while ((n = walker.nextNode())) {
      textNodes.push({ node: n, he: n.nodeValue, key: norm(n.nodeValue) });
    }
  }

  function pushAttr(el, attr) {
    var val = el.getAttribute(attr);
    if (!val || !HE_RANGE.test(val)) return;
    attrTargets.push({
      get: function () { return el.getAttribute(attr); },
      set: function (v) { el.setAttribute(attr, v); },
      he: val,
      key: norm(val)
    });
  }

  function collectAttrs() {
    // document title
    if (HE_RANGE.test(document.title)) {
      var heTitle = document.title;
      attrTargets.push({
        get: function () { return document.title; },
        set: function (v) { document.title = v; },
        he: heTitle,
        key: norm(heTitle)
      });
    }
    var meta = document.querySelector('meta[name="description"]');
    if (meta) pushAttr(meta, 'content');
    document.querySelectorAll('[placeholder]').forEach(function (el) { pushAttr(el, 'placeholder'); });
    document.querySelectorAll('[aria-label]').forEach(function (el) { pushAttr(el, 'aria-label'); });
  }

  function apply(lang) {
    var i, t;
    for (i = 0; i < textNodes.length; i++) {
      t = textNodes[i];
      if (lang === 'en') {
        var en = TEXT[t.key];
        if (en !== undefined) {
          var lead = t.he.match(/^\s*/)[0];
          var trail = t.he.match(/\s*$/)[0];
          t.node.nodeValue = lead + en + trail;
        }
      } else {
        t.node.nodeValue = t.he;
      }
    }
    for (i = 0; i < attrTargets.length; i++) {
      t = attrTargets[i];
      if (lang === 'en') {
        var av = ATTR[t.key];
        if (av !== undefined) t.set(av);
      } else {
        t.set(t.he);
      }
    }
    var html = document.documentElement;
    html.setAttribute('lang', lang === 'en' ? 'en' : 'he');
    html.setAttribute('dir', lang === 'en' ? 'ltr' : 'rtl');
    updateToggleLabels(lang);
  }

  function updateToggleLabels(lang) {
    document.querySelectorAll('[data-lang-toggle]').forEach(function (btn) {
      btn.textContent = lang === 'en' ? 'Hebrew' : 'EN';
      btn.setAttribute('aria-label', lang === 'en' ? 'Switch to Hebrew' : 'Switch to English');
    });
  }

  var current = 'he';
  function setLang(lang) {
    current = lang === 'en' ? 'en' : 'he';
    apply(current);
    try { localStorage.setItem('acLang', current); } catch (e) {}
  }

  function init() {
    collectText();
    collectAttrs();
    var saved = 'he';
    try { saved = localStorage.getItem('acLang') || 'he'; } catch (e) {}
    document.querySelectorAll('[data-lang-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLang(current === 'en' ? 'he' : 'en');
      });
    });
    setLang(saved);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
