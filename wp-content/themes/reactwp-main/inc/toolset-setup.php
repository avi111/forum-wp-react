<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Main function to register all Toolset components.
 * This runs once when the theme is set up.
 */
function iprf_register_all_components() {
    // Register Custom Post Types
    iprf_register_post_types();
    
    // Register Custom Taxonomies
    iprf_register_taxonomies();
    
    // Register Custom Field Groups and Fields
    iprf_register_field_groups();
}
add_action('after_setup_theme', 'iprf_register_all_components');


/**
 * Registers all Custom Post Types for the IPRF site.
 */
function iprf_register_post_types() {
    $cpts = [
        'gender' => ['מגדרים', 'מגדר', 'dashicons-universal-access', 20, false],
        'title' => ['תארים', 'תואר', 'dashicons-awards', 21, false],
        'student-year' => ['שנות לימוד', 'שנת לימוד', 'dashicons-welcome-learn-more', 22, false],
        'string' => ['מחרוזות', 'מחרוזת', 'dashicons-translation', 23, false], // Added String CPT
        'research-paper' => ['מאמרי מחקר', 'מאמר מחקר', 'dashicons-media-document', 5, true, ['title', 'editor', 'excerpt', 'thumbnail', 'author']],
        'news' => ['חדשות', 'חדשה', 'dashicons-megaphone', 6, true, ['title', 'editor']],
        'event' => ['אירועים', 'אירוע', 'dashicons-calendar-alt', 7, true, ['title', 'editor', 'excerpt', 'thumbnail']],
        'meeting' => ['מפגשים', 'מפגש', 'dashicons-groups', 8, true, ['title', 'editor', 'excerpt']],
        'training' => ['הכשרות', 'הכשרה', 'dashicons-welcome-learn-more', 9, true, ['title', 'editor', 'excerpt', 'thumbnail']],
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
        ]);
    }
}

/**
 * Registers all Custom Taxonomies for the IPRF site.
 */
function iprf_register_taxonomies() {
    $taxonomies = [
        'institution' => ['מוסדות', 'מוסד', ['research-paper', 'event']],
        'specialization' => ['התמחויות', 'התמחות', ['research-paper']],
        'sub-specialization' => ['תת-התמחויות', 'תת-התמחות', ['research-paper']],
    ];

    foreach ($taxonomies as $slug => $details) {
        list($plural, $singular, $post_types) = $details;
        register_taxonomy($slug, $post_types, [
            'labels' => [
                'name' => $plural,
                'singular_name' => $singular,
            ],
            'public' => true,
            'show_ui' => true,
            'show_in_menu' => true,
            'hierarchical' => false,
        ]);
    }
}

/**
 * Registers all Toolset Custom Field Groups and Fields.
 */
function iprf_register_field_groups() {
    if (!function_exists('toolset_register_post_field_group')) {
        return;
    }

    // User Fields
    toolset_register_post_field_group([
        'name' => 'פרטי חוקר',
        'slug' => 'researcher-details',
        'domain' => 'users',
        'fields' => [
            ['slug' => 'institution', 'name' => 'מוסד', 'type' => 'textfield'],
            ['slug' => 'specialization', 'name' => 'התמחות', 'type' => 'textfield'],
            ['slug' => 'bio', 'name' => 'ביוגרפיה', 'type' => 'textarea'],
            ['slug' => 'academic-title', 'name' => 'תואר אקדמי', 'type' => 'textfield'],
            ['slug' => 'phone', 'name' => 'טלפון', 'type' => 'textfield'],
            ['slug' => 'gender', 'name' => 'מגדר', 'type' => 'textfield'],
        ],
        'role_list' => ['researcher'],
    ]);

    // Event Fields
    toolset_register_post_field_group([
        'name' => 'פרטי אירוע',
        'slug' => 'event-details',
        'domain' => 'posts',
        'fields' => [
            ['slug' => 'event-date', 'name' => 'תאריך אירוע', 'type' => 'date', 'data' => ['date_format' => 'timestamp']],
            ['slug' => 'location', 'name' => 'מיקום', 'type' => 'textfield'],
            ['slug' => 'event-type', 'name' => 'סוג אירוע', 'type' => 'textfield'],
            ['slug' => 'start-time', 'name' => 'שעת התחלה', 'type' => 'textfield'],
            ['slug' => 'end-time', 'name' => 'שעת סיום', 'type' => 'textfield'],
            ['slug' => 'price', 'name' => 'מחיר', 'type' => 'textfield'],
            ['slug' => 'registration-link', 'name' => 'קישור להרשמה', 'type' => 'url'],
        ],
        'post_types' => ['event'],
    ]);

    // Meeting Fields
    toolset_register_post_field_group([
        'name' => 'פרטי מפגש',
        'slug' => 'meeting-details',
        'domain' => 'posts',
        'fields' => [
            ['slug' => 'meeting-date', 'name' => 'תאריך מפגש', 'type' => 'date', 'data' => ['date_format' => 'timestamp']],
            ['slug' => 'button-text', 'name' => 'טקסט כפתור', 'type' => 'textfield'],
        ],
        'post_types' => ['meeting'],
    ]);

    // Training Fields
    toolset_register_post_field_group([
        'name' => 'פרטי הכשרה',
        'slug' => 'training-details',
        'domain' => 'posts',
        'fields' => [
            ['slug' => 'category', 'name' => 'קטגוריה', 'type' => 'textfield'],
            ['slug' => 'full-description', 'name' => 'תיאור מלא', 'type' => 'wysiwyg'],
            ['slug' => 'course-date', 'name' => 'תאריך קורס (טקסט חופשי)', 'type' => 'textfield'],
            ['slug' => 'location', 'name' => 'מיקום', 'type' => 'textfield'],
            ['slug' => 'price', 'name' => 'מחיר', 'type' => 'textfield'],
            ['slug' => 'registration-link', 'name' => 'קישור להרשמה', 'type' => 'url'],
            ['slug' => 'color-theme', 'name' => 'ערכת נושא', 'type' => 'select', 'data' => ['options' => [['name' => 'Teal', 'value' => 'teal'], ['name' => 'Indigo', 'value' => 'indigo'], ['name' => 'Purple', 'value' => 'purple']]]],
            ['slug' => 'instructors', 'name' => 'מדריכים (מופרד בפסיק)', 'type' => 'textfield'],
            ['slug' => 'syllabus-content', 'name' => 'תוכן סילבוס', 'type' => 'wysiwyg', 'description' => 'הערה: זהו שדה WYSIWYG פשוט. עבור שדות חוזרים (RFG) יש צורך בהגדרה ידנית ועדכון קוד ה-PHP.'],
        ],
        'post_types' => ['training'],
    ]);
}
