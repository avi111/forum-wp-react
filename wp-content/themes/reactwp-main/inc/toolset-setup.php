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


/**
 * Registers all Custom Post Types for the IPRF site.
 * Using standard WordPress register_post_type function.
 */
function iprf_register_post_types() {
    $cpts = [
        'gender' => ['מגדרים', 'מגדר', 'dashicons-universal-access', 20, true, ['title']],
        'title' => ['תארים', 'תואר', 'dashicons-awards', 21, true, ['title']],
        'student-year' => ['שנות לימוד', 'שנת לימוד', 'dashicons-welcome-learn-more', 22, true, ['title']],
        'string' => ['מחרוזות', 'מחרוזת', 'dashicons-translation', 23, true, ['title']],
        'specialization' => ['התמחויות', 'התמחות', 'dashicons-star-filled', 24, true, ['title']],
        'sub-specialization' => ['תת-התמחויות', 'תת-התמחות', 'dashicons-star-half', 25, true, ['title']], // Added Sub-Specialization CPT
        'institution' => ['מוסדות', 'מוסד', 'dashicons-building', 26, false], // Added Institution CPT
        'research-paper' => ['מאמרי מחקר', 'מאמר מחקר', 'dashicons-media-document', 5, true, ['title', 'editor', 'excerpt', 'thumbnail', 'author', 'custom-fields']],
        'news' => ['חדשות', 'חדשה', 'dashicons-megaphone', 6, true, ['title', 'editor', 'custom-fields']],
        'event' => ['אירועים', 'אירוע', 'dashicons-calendar-alt', 7, true, ['title', 'editor', 'excerpt', 'thumbnail', 'custom-fields']],
        'meeting' => ['מפגשים', 'מפגש', 'dashicons-groups', 8, true, ['title', 'editor', 'excerpt', 'custom-fields']],
        'training' => ['הכשרות', 'הכשרה', 'dashicons-welcome-learn-more', 9, true, ['title', 'editor', 'excerpt', 'thumbnail', 'custom-fields']],
    ];

    foreach ($cpts as $slug => $details) {
        list($plural, $singular, $icon, $position, $is_public, $supports) = array_pad($details, 6, null);
        if ($supports === null) {
            $supports = ['title'];
        }

        register_post_type($slug, [
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
        ]);
    }
}