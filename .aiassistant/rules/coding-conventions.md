---
apply: always
---

# IPRF Project Coding Conventions

## General Rules
- הפרויקט משלב WordPress Backend עם React Frontend. שים לב לאיזו סביבה אתה כותב את הקוד.
- הקפד על כתיבת קוד נקי, מודולרי וקריא, תוך תיעוד היכן שהלוגיקה מורכבת.

## React & TypeScript Rules (Frontend)
- **Typing:** השתמש תמיד ב-Strong Typing. אל תשתמש ב-`any`. היעזר והוסף אינטרפייסים בקובץ `src/types.ts`.
- **Components:** כתוב אך ורק React Functional Components. השתמש ב-Hooks מובנים וב-Custom Hooks.
- **Styling:** השתמש אך ורק במחלקות של **Tailwind CSS**. הימנע מכתיבת קבצי CSS ייעודיים אלא אם כן נדרשות אנימציות מיוחדות ב-`index.css`.
- **Data Fetching:** כל קריאות השרת מבוצעות דרך `src/services/api.ts` ומנוהלות ב-UI בעזרת `useQuery` ו-`useMutation` (TanStack React Query).
- **Naming Conventions (TS/JS):**
  - שמות של קבצי קומפוננטות יהיו ב-**PascalCase** (למשל: `ResearcherCard.tsx`).
  - שמות פונקציות ומשתנים יהיו ב-**camelCase** (למשל: `fetchArticles`).

## PHP & WordPress Rules (Backend)
- **Coding Style:** עבוד לפי סטנדרט **PSR-12** ולפי ה-WordPress Coding Standards.
- **Naming Conventions (PHP):**
  - פונקציות צריכות להיכתב ב-**snake_case** עם הקידומת המזהה `iprf_` (למשל `iprf_send_contact_message`).
- **Data Handling:** כל קלט מהמשתמש חייב לעבור סניטציה בעזרת פונקציות וורדפרס (כמו `sanitize_text_field`, `sanitize_email`). כל פלט חייב לעבור אסקייפינג במידת הצורך.
- **Routing:** השרת אינו משתמש ב-REST API המסורתי אלא נשען על `admin-ajax.php` דרך שימוש בהוקים של `wp_ajax_` ו-`wp_ajax_nopriv_`.
