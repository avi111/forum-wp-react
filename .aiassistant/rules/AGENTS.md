---
apply: always
---

# Project: Israel Psychedelic Research Forum (IPRF)

## Overview
A hybrid academic platform and research hub for psychedelic research in Israel [5].
The project operates on a Headless/Hybrid architecture: The backend is managed by WordPress, while the frontend is a modern React Single Page Application (SPA) embedded directly into a WordPress theme (`reactwp-main`) [5].

## Core Technologies
- **Frontend:** React 19, TypeScript, Vite [5].
- **Styling:** Tailwind CSS (with specific custom files like `toolset-tailwind-custom.css` and `wp-editor-tailwind.css`) [5-8].
- **State & Data Fetching:** TanStack React Query (`useAppQueries.ts`), custom API service fetching from WordPress `admin-ajax.php` [2, 5, 9].
- **Backend (CMS):** WordPress (PHP), Custom Post Types, Toolset (for repetitive fields) [9].
- **AI Integration:** Google Gemini API (used for automatically rewriting and improving researcher biographies) [10].
- **Testing & UI Development:** Jest, React Testing Library, and Storybook [5, 11-13].

## Project Structure & Context
- `src/`: Contains all React frontend code (Components, Pages, Hooks, Context, Services) [2].
- `inc/`: PHP backend logic. The `api-endpoints.php` file contains all AJAX hooks for data fetching (e.g., fetchResearchers, fetchArticles, fetchStudentJobs). Other files handle meta-boxes [1, 14].
- `blocks/`: Custom WordPress Gutenberg blocks built with a combination of React (`index.js`) and PHP (`render.php`) [1].
- `src/types.ts`: Central TypeScript interfaces for system entities (Researchers, Articles, Events, StudentPapers, etc.) [2].

## Key Features & Modules
- **Researchers Directory:** Advanced catalog with search/filter capabilities based on academic institutions and specialties [9].
- **Articles & Research:** Segregation between editorial content and academic research papers (PDFs). Includes tag cloud filtering [15].
- **Events, Meetings & Trainings:** Management of future events, past archives, closed forum meetings, and training courses [3, 15].
- **Students Area:** Dedicated sections for 'Student Papers' (academic works) and 'Student Jobs' (academic job board) [3, 4].
- **Research Tools:** A specialized page using a 'Zebra Stripes' layout containing Research Questionnaires, Imaging Methods, and Subject Recruitment resources [4, 10].

## Critical Instructions for AI Agents
- **Architecture & Separation of Concerns:** Always separate backend PHP logic from frontend React logic. Frontend-Backend communication is executed strictly through the endpoints defined in `inc/api-endpoints.php` using WordPress AJAX hooks (`wp_ajax_` and `wp_ajax_nopriv_`) [2, 14].
- **PHP Conventions:** All custom PHP functions must use the `iprf_` prefix to avoid namespace collisions (e.g., `iprf_fetch_researchers`, `iprf_save_student_job_meta_box_data`) [16, 17].
- **Security:** Data-mutating requests in PHP must include Nonce verification (`wp_verify_nonce`). User registrations utilize Honeypot and reCAPTCHA protections [17-19].
- **Frontend Fetching:** Never access the traditional WordPress REST API directly. Always use the `src/services/api.ts` service alongside React Query Hooks located in `src/hooks/useAppQueries.ts` [2, 5].
- **Typing:** Strict typing is enforced. Use the interfaces from `src/types.ts`. Avoid using `any` [2, 5].
- **Styling:** Use Tailwind CSS utility classes exclusively for styling functional components. Custom CSS is reserved only for WP editor or Toolset overrides [5-7, 20].


## Styling Conventions & Rules

The project strictly separates styling approaches between the React Frontend and the WordPress Backend Admin UI. **Agents must adhere to the following rules:**

### 1. React Frontend Styling
- **Tailwind CSS Only:** All styling in the `src/` directory MUST be done using Tailwind CSS utility classes directly within the `.tsx` files.
- **No Custom CSS:** Do NOT create new `.css` or `.scss` files for individual React components.
- **Typography:** Use the custom fonts configured in `tailwind.config.js`. Use `font-heebo` for headings and `font-sans` for body text.

### 2. WordPress Backend & Admin Styling
- **Admin UI Overrides:** Styling for the WordPress admin dashboard, classic editor, or custom meta boxes is done using standard vanilla CSS (not Tailwind classes).
- **Existing CSS Files:**
  - Modify `wp-editor-tailwind.css` when adjusting the WordPress editor UI (e.g., visual/text tabs).
  - Modify `toolset-tailwind-custom.css` when adjusting Toolset repetitive fields and buttons.
- **Enqueuing:** Any new admin CSS files must be enqueued via `wp_enqueue_style` in the relevant PHP setup files (e.g., using the `wp_enqueue_scripts` or admin equivalent hooks).

### 3. Gutenberg Custom Blocks (`blocks/` directory)
- **Hybrid Approach:** Custom blocks use Tailwind CSS classes.
- When generating or modifying blocks, apply Tailwind utility classes inside the `className` attribute in the block's `index.js` (for the editor view) and within the HTML tags in the `render.php` file (for the frontend view).
- Avoid inline styles (`style={{...}}`) unless dynamically calculating values.

