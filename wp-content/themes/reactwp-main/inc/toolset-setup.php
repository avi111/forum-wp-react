<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Main function to register all components.
 * This runs once when the theme is set up.
 */
function iprf_register_all_components() {
    // Register Custom Post Types
    iprf_register_post_types();
}
add_action('init', 'iprf_register_all_components');

function connect_tags_to_research_paper() {
    // מחבר את התגיות (post_tag) לפוסט טייפ החדש
    register_taxonomy_for_object_type('post_tag', 'research_paper');
}

add_action('init', 'connect_tags_to_research_paper');

/**
 * Registers all Custom Post Types for the IPRF site.
 * Using standard WordPress register_post_type function.
 */
function iprf_register_post_types() {
    $cpts = [
        // מבנה: [label רבים, label יחיד, אייקון, מיקום בתפריט, ציבורי?, supports, taxonomies?]
        'gender' => ['מגדרים', 'מגדר', 'dashicons-universal-access', 20, true, ['title']],
        'title' => ['תארים', 'תואר', 'dashicons-awards', 21, true, ['title']],
        'student-year' => ['שנות לימוד', 'שנת לימוד', 'dashicons-welcome-learn-more', 22, true, ['title']],
        'string' => ['מחרוזות', 'מחרוזת', 'dashicons-translation', 23, true, ['title']],
        'specialization' => ['התמחויות', 'התמחות', 'dashicons-star-filled', 24, true, ['title']],
        'sub-specialization' => ['תת-התמחויות', 'תת-התמחות', 'dashicons-star-half', 25, true, ['title']], // Added Sub-Specialization CPT
        'institution' => ['מוסדות', 'מוסד', 'dashicons-building', 26, false], // Added Institution CPT
        // מוסיפים תמיכה בהגדרת טקסונומיות דרך המערך (כאן לדוגמה: תגיות למאמרי מחקר)
        'research-paper' => ['מאמרי מחקר', 'מאמר מחקר', 'dashicons-media-document', 5, true, ['title', 'editor', 'excerpt', 'thumbnail', 'author', 'custom-fields'], ['post_tag']],
        'news' => ['חדשות', 'חדשה', 'dashicons-megaphone', 6, true, ['title', 'editor', 'custom-fields']],
        'event' => ['אירועים', 'אירוע', 'dashicons-calendar-alt', 7, true, ['title', 'editor', 'excerpt', 'thumbnail', 'custom-fields']],
        'meeting' => ['מפגשים', 'מפגש', 'dashicons-groups', 8, true, ['title', 'editor', 'excerpt', 'custom-fields']],
        'training' => ['הכשרות', 'הכשרה', 'dashicons-welcome-learn-more', 9, true, ['title', 'editor', 'excerpt', 'thumbnail', 'custom-fields']],
    ];

    foreach ($cpts as $slug => $details) {
        // תומך באיבר 7 אופציונלי עבור טקסונומיות
        list($plural, $singular, $icon, $position, $is_public, $supports, $taxonomies) = array_pad($details, 7, null);
        if ($supports === null) {
            $supports = ['title'];
        }
        $args = [
            'labels' => [
                'name' => $plural,
                'singular_name' => $singular,
                'add_new' => 'הוסף חדש',
                'add_new_item' => 'הוסף ' . $singular . ' חדש',
                'edit_item' => 'ערוך ' . $singular,
                'new_item' => $singular . ' חדש',
                'view_item' => 'צפה ב' . $singular,
                'search_items' => 'חפש ' . $plural,
                'not_found' => 'לא נמצאו ' . $plural,
                'not_found_in_trash' => 'לא נמצאו ' . $plural . ' בפח',
            ],
            'public' => $is_public,
            'publicly_queryable' => $is_public,
            'show_ui' => true,
            'show_in_menu' => true,
            'menu_position' => $position,
            'menu_icon' => $icon,
            'supports' => $supports,
            'rewrite' => ['slug' => $slug],
            'has_archive' => $is_public,
            'show_in_rest' => true, // Enable Gutenberg and REST API
        ];

        // אם הוגדרו טקסונומיות, נצרף אותן לארגומנטים. אם לא – לא נצרף כלום.
        if (!empty($taxonomies) && is_array($taxonomies)) {
            $args['taxonomies'] = $taxonomies;
        }

        register_post_type($slug, $args);
    }
}