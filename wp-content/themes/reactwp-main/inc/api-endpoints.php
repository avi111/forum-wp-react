<?php

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Helper function to format response
 */
function iprf_send_response($data) {
    wp_send_json_success($data);
}

/**
 * Helper to get Toolset field value (raw)
 */
function iprf_get_field($post_id, $field_slug, $single = true) {
    // Toolset usually prefixes fields with 'wpcf-'
    return get_post_meta($post_id, 'wpcf-' . $field_slug, $single);
}

/**
 * Helper function to get options from a Custom Post Type.
 * Returns array of { value: slug, label: title }
 */
function iprf_get_options_from_cpt($post_type) {
    $options = [];
    $query = new WP_Query([
        'post_type' => $post_type,
        'posts_per_page' => -1,
        'post_status' => 'publish',
        'orderby' => 'title',
        'order' => 'ASC',
    ]);

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $options[] = [
                'value' => get_post_field('post_name', get_the_ID()),
                'label' => get_the_title(),
            ];
        }
    }
    wp_reset_postdata();
    return $options;
}

function iprf_get_options_list_from_cpt($post_type)
{
    $options = [];
    $query = new WP_Query([
        'post_type' => $post_type,
        'posts_per_page' => -1,
        'post_status' => 'publish',
        'orderby' => 'title',
        'order' => 'ASC',
    ]);

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $options[] = get_the_title();
        }
    }
    wp_reset_postdata();
    return $options;
}


/**
 * Helper function to get strings map from a Custom Post Type.
 * Returns associative array { slug: title }
 */
function iprf_get_strings_map($post_type) {
    $strings = [];
    $query = new WP_Query([
        'post_type' => $post_type,
        'posts_per_page' => -1,
        'post_status' => 'publish',
    ]);

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $slug = get_post_field('post_name', get_the_ID());
            $strings[$slug] = get_the_title();
        }
    }
    wp_reset_postdata();
    return $strings;
}

/**
 * Helper function to convert WP List block to Tailwind Steps
 */
function iprf_convert_list_to_tailwind_steps($html) {
    if (empty($html)) return '';

    $dom = new DOMDocument();
    // Suppress warnings for invalid HTML structure (common with partial HTML)
    libxml_use_internal_errors(true);
    // Load HTML with UTF-8 encoding hack
    $dom->loadHTML('<?xml encoding="utf-8" ?>' . $html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
    libxml_clear_errors();

    $list_items = $dom->getElementsByTagName('li');
    
    if ($list_items->length === 0) {
        return $html; // Return original if no list items found
    }

    $output = '<div class="space-y-4">';
    $counter = 1;

    foreach ($list_items as $li) {
        // Get inner HTML of the LI
        $inner_html = '';
        foreach ($li->childNodes as $child) {
            $inner_html .= $dom->saveHTML($child);
        }

        // Replace strong tags with Tailwind classes if needed, or keep as is.
        // The requirement is to wrap strong in <strong class="text-slate-900">
        $inner_html = str_replace('<strong>', '<strong class="text-slate-900">', $inner_html);

        $output .= '<div class="flex gap-4">';
        $output .= '<span class="font-bold text-indigo-600">' . $counter . '.</span>';
        $output .= '<p>' . $inner_html . '</p>';
        $output .= '</div>';
        
        $counter++;
    }

    $output .= '</div>';

    return $output;
}

/**
 * 1. Fetch Settings
 */
add_action('wp_ajax_fetchSettings', 'iprf_fetch_settings');
add_action('wp_ajax_nopriv_fetchSettings', 'iprf_fetch_settings');

function iprf_fetch_settings() {
    $settings = [
        // Fetch options from CPTs
        'genders' => iprf_get_options_from_cpt('gender'),
        'titles' => iprf_get_options_from_cpt('title'),
        'studentYears' => iprf_get_options_from_cpt('student-year'),

        'institutions' => iprf_get_options_list_from_cpt('institution'),
        'mainSpecializations' => iprf_get_options_list_from_cpt('specialization'),
        'subSpecializations' => iprf_get_options_list_from_cpt('sub-specialization'),

        // Fetch strings from 'string' CPT
        'strings' => iprf_get_strings_map('string'),

        'researcherIndexItemsPerPage' => 9,
        'editorialItemsPerPage' => 2,
        'researcherItemsPerPage' => 3,
        'eventsItemsPerPage' => 3,
        'latestEditorialLimit' => 3,
        'latestResearchLimit' => 3,
        'titleMap' => iprf_get_strings_map('title'),
    ];

    iprf_send_response($settings);
}

/**
 * 2. Fetch Template
 */
add_action('wp_ajax_fetchTemplate', 'iprf_fetch_template');
add_action('wp_ajax_nopriv_fetchTemplate', 'iprf_fetch_template');

function iprf_fetch_template() {
    $template_name = isset($_POST['name']) ? sanitize_text_field($_POST['name']) : '';
    $html = '';

    if ($template_name) {
        $args = [
            'name' => $template_name,
            'post_type' => ['page'], // Add any other CPTs here
            'post_status' => 'publish',
            'numberposts' => 1
        ];
        
        $query = new WP_Query($args);
        
        if ($query->have_posts()) {
            $query->the_post();
            $content = get_the_content();
            
            $html = apply_filters('the_content', $content);

            if ($template_name === 'bylaws-modal') {
                if (strpos($html, '<ul') !== false) {
                    $html = iprf_convert_list_to_tailwind_steps($html);
                }
            }
        }
        wp_reset_postdata();
    }

    iprf_send_response($html);
}

/**
 * 3. Fetch Researchers
 */
add_action('wp_ajax_fetchResearchers', 'iprf_fetch_researchers');
add_action('wp_ajax_nopriv_fetchResearchers', 'iprf_fetch_researchers');

function iprf_fetch_researchers() {
    $args = [
        'role' => 'contributor',
        'number' => -1,
        'orderby' => 'display_name'
    ];

    $user_query = new WP_User_Query($args);
    $researchers = [];

    if (!empty($user_query->get_results())) {
        foreach ($user_query->get_results() as $user) {
            $researchers[] = [
                'id' => (string)$user->ID,
                'username' => $user->user_login,
                'firstName' => $user->first_name,
                'lastName' => $user->last_name,
                'email' => $user->user_email,
                'institution' => get_user_meta($user->ID, 'wpcf-institution', true),
                'specialization' => get_user_meta($user->ID, 'wpcf-specialization', true),
                'bio' => get_user_meta($user->ID, 'wpcf-bio', true),
                'status' => 'ACTIVE',
                'imageUrl' => get_avatar_url($user->ID, ['size' => 400]),
                'title' => get_user_meta($user->ID, 'wpcf-academic-title', true),
                'phone' => get_user_meta($user->ID, 'wpcf-phone', true),
                'gender' => get_user_meta($user->ID, 'wpcf-gender', true),
            ];
        }
    }

    iprf_send_response($researchers);
}

/**
 * 4. Fetch Articles
 */
add_action('wp_ajax_fetchArticles', 'iprf_fetch_articles');
add_action('wp_ajax_nopriv_fetchArticles', 'iprf_fetch_articles');

function iprf_fetch_articles() {
    $args = [
        'post_type' => ['post', 'research-paper'],
        'posts_per_page' => 20,
        'post_status' => 'publish'
    ];

    $query = new WP_Query($args);
    $articles = [];

    while ($query->have_posts()) {
        $query->the_post();
        $is_editorial = get_post_type() === 'post';
        
        $articles[] = [
            'id' => (string)get_the_ID(),
            'title' => get_the_title(),
            'excerpt' => get_the_excerpt(),
            'content' => apply_filters('the_content', get_the_content()),
            'authorId' => (string)get_the_author_meta('ID'),
            'authorName' => get_the_author(),
            'date' => get_the_date('d/m/Y'),
            'isEditorial' => $is_editorial,
            'tags' => wp_list_pluck(get_the_tags(), 'name') ?: [],
            'imageUrl' => get_the_post_thumbnail_url(get_the_ID(), 'large'),
            'attachments' => [] 
        ];
    }
    wp_reset_postdata();

    iprf_send_response($articles);
}

/**
 * 4.1. Fetch Articles (paginated + type filter)
 * Params (POST):
 * - page: number (default 1)
 * - limit: number (default 10)
 * - type: 'editorial' | 'research' (optional; default: both)
 * Returns: { data: Article[], total: number }
 */
add_action('wp_ajax_fetchArticlesPaged', 'iprf_fetch_articles_paged');
add_action('wp_ajax_nopriv_fetchArticlesPaged', 'iprf_fetch_articles_paged');

function iprf_fetch_articles_paged() {
    $page = isset($_POST['page']) ? max(1, intval($_POST['page'])) : 1;
    $limit = isset($_POST['limit']) ? max(1, intval($_POST['limit'])) : 10;
    $type = isset($_POST['type']) ? sanitize_text_field($_POST['type']) : '';
    $tag  = isset($_POST['tag']) ? sanitize_text_field($_POST['tag']) : '';

    $post_types = ['post', 'research-paper'];
    if ($type === 'editorial') {
        $post_types = ['post'];
    } elseif ($type === 'research') {
        $post_types = ['research-paper'];
    }

    $args = [
        'post_type' => $post_types,
        'posts_per_page' => $limit,
        'paged' => $page,
        'post_status' => 'publish',
        'no_found_rows' => false,
    ];

    // Optional tag filter (by tag name or slug)
    if (!empty($tag)) {
        // Try resolve by name first to get slug
        $term = get_term_by('name', $tag, 'post_tag');
        if (!$term) {
            $term = get_term_by('slug', sanitize_title($tag), 'post_tag');
        }
        $slug = $term ? $term->slug : sanitize_title($tag);
        $args['tax_query'] = [
            [
                'taxonomy' => 'post_tag',
                'field'    => 'slug',
                'terms'    => [$slug],
            ]
        ];
    }

    $query = new WP_Query($args);

    $articles = [];
    while ($query->have_posts()) {
        $query->the_post();
        $is_editorial = get_post_type() === 'post';

        $articles[] = [
            'id' => (string)get_the_ID(),
            'title' => get_the_title(),
            'excerpt' => get_the_excerpt(),
            'content' => apply_filters('the_content', get_the_content()),
            'authorId' => (string)get_the_author_meta('ID'),
            'authorName' => get_the_author(),
            'date' => get_the_date('d/m/Y'),
            'isEditorial' => $is_editorial,
            'tags' => wp_list_pluck(get_the_tags(), 'name') ?: [],
            'imageUrl' => get_the_post_thumbnail_url(get_the_ID(), 'large'),
            'attachments' => []
        ];
    }
    wp_reset_postdata();

    $total = (int)$query->found_posts;
    iprf_send_response([
        'data' => $articles,
        'total' => $total,
    ]);
}

add_action('wp_ajax_fetchTags', 'iprf_fetch_tags');
add_action('wp_ajax_nopriv_fetchTags', 'iprf_fetch_tags');

function iprf_fetch_tags() {
    // Get WordPress terms for post_tag taxonomy
    $terms = get_terms([
        'taxonomy' => 'post_tag',
        'hide_empty' => true,
    ]);

    if (is_wp_error($terms)) {
        wp_send_json_error(['message' => $terms->get_error_message()], 500);
        return;
    }

    $tags = [];
    foreach ($terms as $term) {
        $tags[] = [
            'tag' => $term->name,
            'count' => (int)$term->count,
        ];
    }

    iprf_send_response($tags);
}

/**
 * 5. Fetch News
 */
add_action('wp_ajax_fetchNews', 'iprf_fetch_news');
add_action('wp_ajax_nopriv_fetchNews', 'iprf_fetch_news');

function iprf_fetch_news() {
    $args = [
        'post_type' => 'news',
        'posts_per_page' => 10,
        'post_status' => 'publish',
        'orderby' => 'date',
        'order' => 'DESC',
        'date_query' => [
            [
                'after' => '3 months ago',
                'inclusive' => true,
            ],
        ],
    ];

    $query = new WP_Query($args);
    $news = [];

    while ($query->have_posts()) {
        $query->the_post();
        $news[] = [
            'id' => (string)get_the_ID(),
            'title' => get_the_title(),
            'date' => get_the_date('d/m/Y'),
            'link' => get_permalink(),
            'content' => apply_filters('the_content', get_the_content()),
        ];
    }
    wp_reset_postdata();

    iprf_send_response($news);
}

/**
 * 6. Fetch Events
 */
add_action('wp_ajax_fetchEvents', 'iprf_fetch_events');
add_action('wp_ajax_nopriv_fetchEvents', 'iprf_fetch_events');

function iprf_fetch_events() {
    $page = isset($_POST['page']) ? intval($_POST['page']) : 1;
    $limit = isset($_POST['limit']) ? intval($_POST['limit']) : 10;
    $time_filter = isset($_POST['timeFilter']) ? sanitize_text_field($_POST['timeFilter']) : 'all';

    $args = [
        'post_type' => 'event',
        'posts_per_page' => $limit,
        'paged' => $page,
        'post_status' => ['publish', 'future'],
        'orderby' => 'date',
    ];

    if ($time_filter === 'future') {
        $args['date_query'] = [[
            'after' => 'today',
            'inclusive' => true
        ]];
        $args['order'] = 'ASC';
    } elseif ($time_filter === 'past') {
        $args['date_query'] = [[
            'before' => 'today',
            'inclusive' => false
        ]];
        $args['order'] = 'DESC';
    }

    $query = new WP_Query($args);
    $events = [];

    while ($query->have_posts()) {
        $query->the_post();
        
        $raw_date = iprf_get_field(get_the_ID(), 'event-date');
        $date_ts = intval($raw_date);
        
        $events[] = [
            'id' => (string)get_the_ID(),
            'title' => get_the_title(),
            'date' => $date_ts ? date('Y-m-d', $date_ts) : '',
            'day' => $date_ts ? date('d', $date_ts) : '',
            'month' => $date_ts ? date_i18n('F', $date_ts) : '',
            'location' => iprf_get_field(get_the_ID(), 'location'),
            'type' => iprf_get_field(get_the_ID(), 'event-type'),
            'imageUrl' => get_the_post_thumbnail_url(get_the_ID(), 'large'),
            'description' => get_the_excerpt(),
            'fullContent' => apply_filters('the_content', get_the_content()),
            'startTime' => iprf_get_field(get_the_ID(), 'start-time'),
            'endTime' => iprf_get_field(get_the_ID(), 'end-time'),
            'price' => iprf_get_field(get_the_ID(), 'price'),
            'registrationLink' => iprf_get_field(get_the_ID(), 'registration-link'),
        ];
    }

    $response = [
        'data' => $events,
        'total' => $query->found_posts
    ];
    
    wp_reset_postdata();
    iprf_send_response($response);
}

/**
 * 7. Fetch Meetings
 */
add_action('wp_ajax_fetchMeetings', 'iprf_fetch_meetings');
add_action('wp_ajax_nopriv_fetchMeetings', 'iprf_fetch_meetings');

function iprf_fetch_meetings() {
    $today = current_time('timestamp');
    
    $args = [
        'post_type' => 'meeting',
        'posts_per_page' => -1,
        'orderby' => 'date',
        'order' => 'ASC',
        'post_status' => ['publish', 'future'],
        'date_query' => [[
            'after' => 'today',
            'inclusive' => true
        ]]
    ];

    $query = new WP_Query($args);
    $meetings = [];

    while ($query->have_posts()) {
        $query->the_post();
        $date_ts = (int)get_the_date('U');

        $meetings[] = [
            'id' => (string)get_the_ID(),
            'title' => get_the_title(),
            'date' => $date_ts ? date('Y-m-d', $date_ts) : '',
            'day' => $date_ts ? date('d', $date_ts) : '',
            'month' => $date_ts ? date_i18n('F Y', $date_ts) : '',
            'description' => get_the_excerpt(),
            'buttonText' => 'הרשמה',
        ];
    }
    wp_reset_postdata();
    iprf_send_response($meetings);
}

/**
 * 8. Fetch Trainings
 */
add_action('wp_ajax_fetchTrainings', 'iprf_fetch_trainings');
add_action('wp_ajax_nopriv_fetchTrainings', 'iprf_fetch_trainings');

function iprf_fetch_trainings() {
    $args = [
        'post_type' => 'training',
        'posts_per_page' => -1,
    ];

    $query = new WP_Query($args);
    $trainings = [];

    while ($query->have_posts()) {
        $query->the_post();
        
        $syllabus = [];
        // This is a placeholder. For a real Toolset RFG, you'd need a more complex query.
        $syllabus_content = iprf_get_field(get_the_ID(), 'syllabus-content');
        if (!empty($syllabus_content)) {
            // A simple way if you just use one WYSIWYG field for the whole syllabus
            $syllabus[] = ['title' => 'Syllabus', 'topics' => [$syllabus_content]];
        }

        $trainings[] = [
            'id' => (string)get_the_ID(),
            'category' => iprf_get_field(get_the_ID(), 'category'),
            'title' => get_the_title(),
            'description' => get_the_excerpt(),
            'fullDescription' => iprf_get_field(get_the_ID(), 'full-description'),
            'date' => iprf_get_field(get_the_ID(), 'course-date'),
            'location' => iprf_get_field(get_the_ID(), 'location'),
            'price' => iprf_get_field(get_the_ID(), 'price'),
            'registrationLink' => iprf_get_field(get_the_ID(), 'registration-link'),
            'colorTheme' => iprf_get_field(get_the_ID(), 'color-theme') ?: 'teal',
            'imageUrl' => get_the_post_thumbnail_url(get_the_ID(), 'large'),
            'instructors' => explode(',', iprf_get_field(get_the_ID(), 'instructors')),
            'syllabus' => $syllabus
        ];
    }
    wp_reset_postdata();
    iprf_send_response($trainings);
}

/**
 * 9. Send Contact Message
 */
add_action('wp_ajax_sendContactMessage', 'iprf_send_contact_message');
add_action('wp_ajax_nopriv_sendContactMessage', 'iprf_send_contact_message');

function iprf_send_contact_message() {
    $full_name = sanitize_text_field($_POST['fullName']);
    $email = sanitize_email($_POST['email']);
    $message = sanitize_textarea_field($_POST['message']);

    if (empty($full_name) || empty($email) || empty($message)) {
        wp_send_json_error(['message' => 'נא למלא את כל השדות']);
    }

    $to = get_option('admin_email');
    $subject = 'פנייה חדשה מהאתר: ' . $full_name;
    $body = "שם: $full_name\n";
    $body .= "אימייל: $email\n\n";
    $body .= "הודעה:\n$message";
    $headers = ['Content-Type: text/plain; charset=UTF-8'];

    $sent = wp_mail($to, $subject, $body, $headers);

    if ($sent) {
        iprf_send_response(['message' => 'ההודעה נשלחה בהצלחה']);
    } else {
        wp_send_json_error(['message' => 'שגיאה בשליחת ההודעה']);
    }
}

/**
 * 10. Fetch Current User
 */
add_action('wp_ajax_fetchCurrentUser', 'iprf_fetch_current_user');
add_action('wp_ajax_nopriv_fetchCurrentUser', 'iprf_fetch_current_user');

function iprf_fetch_current_user() {
    if (!is_user_logged_in()) {
        iprf_send_response(null);
        return;
    }

    $user = wp_get_current_user();

    $user_data = [
        'id' => (string)$user->ID,
        'username' => $user->user_login,
        'firstName' => $user->first_name,
        'lastName' => $user->last_name,
        'email' => $user->user_email,
        'institution' => get_user_meta($user->ID, 'wpcf-institution', true),
        'specialization' => get_user_meta($user->ID, 'wpcf-specialization', true),
        'bio' => get_user_meta($user->ID, 'wpcf-bio', true),
        'status' => 'ACTIVE',
        'imageUrl' => get_avatar_url($user->ID, ['size' => 400]),
        'title' => get_user_meta($user->ID, 'wpcf-academic-title', true),
        'phone' => get_user_meta($user->ID, 'wpcf-phone', true),
        'gender' => get_user_meta($user->ID, 'wpcf-gender', true),
    ];

    iprf_send_response($user_data);
}
