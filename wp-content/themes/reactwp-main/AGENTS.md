# Project: Israel Psychedelic Research Forum (IPRF)

## Overview
מערכת היברידית המשמשת כפלטפורמה אקדמית לפסיכדליה בישראל.
הפרויקט בנוי כ-Headless/Hybrid: ה-Backend מנוהל על ידי WordPress, בעוד שה-Frontend בנוי כאפליקציית React מודרנית (SPA) המוטמעת בתוך תבנית וורדפרס (reactwp-main).

## Core Technologies
- **Frontend:** React 19, TypeScript, Vite.
- **Styling:** Tailwind CSS (with specific custom files like `toolset-tailwind-custom.css`).
- **State & Data Fetching:** TanStack React Query (`useAppQueries.ts`), Axios/Fetch API against WP `admin-ajax.php`.
- **Backend (CMS):** WordPress (PHP), Custom Post Types, Toolset.
- **AI Integration:** Google Gemini API (used for rewriting researcher biographies).

## Project Structure & Context
- `src/`: מכיל את כל קוד ה-React של ה-Frontend (Components, Pages, Hooks, Context, Services).
- `inc/`: קוד ה-Backend ב-PHP. הקובץ `api-endpoints.php` מכיל את כל ה-AJAX hooks לשליפת נתונים.
- `blocks/`: רכיבי Gutenberg מותאמים אישית של וורדפרס, בנויים בשילוב של React (`index.js`) ו-PHP (`render.php`).
- `src/types.ts`: הגדרות ה-TypeScript המרכזיות (Interfaces) עבור הישויות במערכת (Researchers, Articles, Events וכו').

## Critical Instructions for Agents
- **Architecture:** תמיד הפרד בין לוגיקת שרת (PHP) ללוגיקת לקוח (React). התקשורת מתבצעת רק דרך ה-Endpoints שהוגדרו ב-`api-endpoints.php`.
- **Prefixes:** כל הפונקציות ב-PHP חייבות להתחיל בקידומת `iprf_` כדי למנוע התנגשויות (למשל: `iprf_fetch_researchers`).
- **Security:** בקשות מבוססות שינוי נתונים ב-PHP חייבות לכלול בדיקת Nonce (`wp_verify_nonce`). תהליכי הרשמה כוללים הגנת Honeypot ו-reCAPTCHA.
- **Frontend Fetching:** לעולם אל תיגש ישירות ל-REST API של וורדפרס אלא השתמש בשירות `api.ts` וב-React Query Hooks הנמצאים ב-`useAppQueries.ts`.