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
    remove_all_actions('pre_get_users');

    $args = [
        'role' => 'contributor',
        'number' => -1,
        'orderby' => 'display_name'
    ];

    $user_query = new WP_User_Query($args);
    $researchers = [];

    if (!empty($user_query->get_results())) {
        foreach ($user_query->get_results() as $user) {
            $image_url = get_user_meta($user->ID, 'wpcf-profile-image', true);
            if (!empty($image_url)) {
                // If it's an attachment ID, get the thumbnail URL
                if (is_numeric($image_url)) {
                    $image_src = wp_get_attachment_image_src($image_url, 'thumbnail');
                    $image_url = $image_src ? $image_src[0] : '';
                } 
                // If it's already a URL, we might need to process it to get a thumbnail size if possible, 
                // but Toolset often stores the raw URL. If it stores ID, the above handles it.
                // If it stores a full URL, getting a thumbnail version is harder without the ID.
                // However, often Toolset stores the full URL. Let's try to find the ID from URL if needed, 
                // or just assume if it's a URL we use it. 
                // BUT, the user specifically asked for thumbnail size.
                // If 'wpcf-profile-image' stores a URL, we can't easily get the thumbnail unless we find the attachment ID.
                
                // Let's try to see if we can get the attachment ID from the URL if it is a URL
                else {
                    $attachment_id = attachment_url_to_postid($image_url);
                    if ($attachment_id) {
                         $image_src = wp_get_attachment_image_src($attachment_id, 'thumbnail');
                         $image_url = $image_src ? $image_src[0] : $image_url;
                    }
                }
            } else {
                $image_url = get_avatar_url($user->ID, ['size' => 400]);
            }

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
                'imageUrl' => $image_url,
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

    $image_url = get_user_meta($user->ID, 'wpcf-profile-image', true);
    if (!empty($image_url)) {
        if (is_numeric($image_url)) {
            $image_src = wp_get_attachment_image_src($image_url, 'thumbnail');
            $image_url = $image_src ? $image_src[0] : '';
        } else {
            $attachment_id = attachment_url_to_postid($image_url);
            if ($attachment_id) {
                 $image_src = wp_get_attachment_image_src($attachment_id, 'thumbnail');
                 $image_url = $image_src ? $image_src[0] : $image_url;
            }
        }
    } else {
        $image_url = get_avatar_url($user->ID, ['size' => 400]);
    }

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
        'imageUrl' => $image_url,
        'title' => get_user_meta($user->ID, 'wpcf-academic-title', true),
        'phone' => get_user_meta($user->ID, 'wpcf-phone', true),
        'gender' => get_user_meta($user->ID, 'wpcf-gender', true),
    ];

    iprf_send_response($user_data);
}

/**
 * 11. Subscribe to Newsletter (MailPoet)
 */
add_action('wp_ajax_subscribe_newsletter', 'iprf_subscribe_newsletter');
add_action('wp_ajax_nopriv_subscribe_newsletter', 'iprf_subscribe_newsletter');

function iprf_subscribe_newsletter() {
    $email = sanitize_email($_POST['email']);

    if (!is_email($email)) {
        wp_send_json_error(['message' => 'כתובת אימייל לא תקינה']);
    }

    // Check if MailPoet is active
    if (class_exists(\MailPoet\API\API::class)) {
        try {
            $mailpoet_api = \MailPoet\API\API::MP('v1');
            
            // Get the default list (usually ID 1, or find by name)
            // You can also create a specific list for this form
            $list_id = 3;
            
            // Check if subscriber exists
            try {
                $subscriber = $mailpoet_api->getSubscriber($email);
            } catch (\Exception $e) {
                $subscriber = false;
            }

            if (!$subscriber) {
                // Create new subscriber
                $subscriber = $mailpoet_api->addSubscriber([
                    'email' => $email,
                    'first_name' => '',
                    'last_name' => ''
                ], [$list_id]);
            } else {
                // Subscribe existing user to the list
                $mailpoet_api->subscribeToList($subscriber['id'], $list_id);
            }

            iprf_send_response(['message' => 'נרשמת בהצלחה לניוזלטר!']);

        } catch (\Exception $e) {
            // Log error for admin
            error_log('MailPoet Error: ' . $e->getMessage());
            wp_send_json_error(['message' => 'אירעה שגיאה בהרשמה. אנא נסה שנית מאוחר יותר.']);
        }
    } else {
        // Fallback if MailPoet is not installed (e.g. save to options or send email to admin)
        // For now, just return success to simulate
        iprf_send_response(['message' => 'נרשמת בהצלחה! (MailPoet לא מותקן)']);
    }
}

/**
 * 12. Handle Join Form Submission
 */
add_action('wp_ajax_nopriv_join_form_submit', 'iprf_join_form_submit');

function iprf_join_form_submit() {
    // Validation
    $required_fields = [
        'username' => 'שם משתמש',
        'email' => 'אימייל',
        'password' => 'סיסמה',
        'confirmPassword' => 'אימות סיסמה',
        'firstName' => 'שם פרטי',
        'lastName' => 'שם משפחה',
        'idNumber' => 'תעודת זהות',
        'phone' => 'טלפון',
        'title' => 'תואר אקדמי',
        'institution' => 'מוסד לימודים',
        'faculty' => 'פקולטה'
    ];

    foreach ($required_fields as $field => $label) {
        if (empty($_POST[$field])) {
            wp_send_json_error(['message' => 'שדה חובה חסר: ' . $label]);
        }
    }

    if ($_POST['password'] !== $_POST['confirmPassword']) {
        wp_send_json_error(['message' => 'הסיסמאות אינן תואמות.']);
    }

    if (!isset($_POST['agreedToBylaws']) || $_POST['agreedToBylaws'] !== 'true') {
        wp_send_json_error(['message' => 'יש לאשר את התקנון.']);
    }

    if (empty($_POST['g-recaptcha-response'])) {
        wp_send_json_error(['message' => 'אנא אמת שאינך רובוט.']);
    }

    // Verify reCAPTCHA
    $recaptcha_secret = defined('RECAPTCHA_SECRET_KEY') ? RECAPTCHA_SECRET_KEY : '';
    
    if ($recaptcha_secret) {
        $verify_response = wp_remote_post('https://www.google.com/recaptcha/api/siteverify', [
            'body' => [
                'secret' => $recaptcha_secret,
                'response' => $_POST['g-recaptcha-response'],
                'remoteip' => $_SERVER['REMOTE_ADDR']
            ]
        ]);

        if (is_wp_error($verify_response)) {
            wp_send_json_error(['message' => 'שגיאה באימות ה-reCAPTCHA.']);
        }

        $response_body = wp_remote_retrieve_body($verify_response);
        $result = json_decode($response_body);

        if (!$result->success) {
            wp_send_json_error(['message' => 'אימות ה-reCAPTCHA נכשל. אנא נסה שנית.']);
        }
    }

    // 1. Sanitize and Validate Email
    $email = sanitize_email($_POST['email']);
    if (!is_email($email)) {
        wp_send_json_error(['message' => 'כתובת האימייל אינה תקינה.']);
    }
    if (email_exists($email)) {
        wp_send_json_error(['message' => 'כתובת האימייל כבר רשומה במערכת.']);
    }
    // Optional: Add a third-party email validation service call here if needed.

    // 2. Handle File Uploads
    if (!function_exists('wp_handle_upload')) {
        require_once(ABSPATH . 'wp-admin/includes/file.php');
    }

    $uploaded_files = [];
    $upload_overrides = ['test_form' => false];

    $required_files = ['verificationDoc', 'intentLetter'];
    foreach ($required_files as $file_key) {
        if (!isset($_FILES[$file_key])) {
            wp_send_json_error(['message' => 'יש לצרף את כל המסמכים הנדרשים.']);
        }
    }

    // 3. Create User
    $userdata = [
        'user_login' => sanitize_user($_POST['username']),
        'user_email' => $email,
        'user_pass'  => $_POST['password'],
        'first_name' => sanitize_text_field($_POST['firstName']),
        'last_name'  => sanitize_text_field($_POST['lastName']),
        'role'       => 'subscriber', // Set role to subscriber
    ];

    $user_id = wp_insert_user($userdata);

    if (is_wp_error($user_id)) {
        wp_send_json_error(['message' => 'שגיאה ביצירת המשתמש: ' . $user_id->get_error_message()]);
    }

    // 4. Update User Meta with custom fields
    update_user_meta($user_id, 'wpcf-id-number', sanitize_text_field($_POST['idNumber']));
    update_user_meta($user_id, 'wpcf-phone', sanitize_text_field($_POST['phone']));
    update_user_meta($user_id, 'wpcf-gender', sanitize_text_field($_POST['gender']));
    update_user_meta($user_id, 'wpcf-academic-title', sanitize_text_field($_POST['title']));
    update_user_meta($user_id, 'wpcf-institution', sanitize_text_field($_POST['institution']));
    update_user_meta($user_id, 'wpcf-faculty', sanitize_text_field($_POST['faculty']));
    update_user_meta($user_id, 'wpcf-specialization', sanitize_text_field($_POST['mainSpecialization']));
    // Assuming subSpecializations is an array
    if (isset($_POST['subSpecializations']) && is_array($_POST['subSpecializations'])) {
        foreach ($_POST['subSpecializations'] as $sub_spec) {
            add_user_meta($user_id, 'wpcf-sub-specializations', sanitize_text_field($sub_spec));
        }
    }
    update_user_meta($user_id, 'wpcf-student-year', sanitize_text_field($_POST['studentYear']));
    update_user_meta($user_id, 'wpcf-newsletter', sanitize_text_field($_POST['newsletter']));


    foreach ($required_files as $file_key) {
        if (isset($_FILES[$file_key])) {
            $moved_file = wp_handle_upload($_FILES[$file_key], $upload_overrides);
            if ($moved_file && !isset($moved_file['error'])) {
                $uploaded_files[$file_key] = $moved_file['url'];
            } else {
                wp_send_json_error(['message' => 'שגיאה בהעלאת קובץ: ' . $moved_file['error']]);
            }
        }
    }

    // Save file URLs to user meta
    update_user_meta($user_id, 'wpcf-verification-doc-url', esc_url_raw($uploaded_files['verificationDoc']));
    update_user_meta($user_id, 'wpcf-intent-letter-url', esc_url_raw($uploaded_files['intentLetter']));

    // 5. Send Admin Notification Email
    $admin_email = get_option('admin_email');
    $subject = 'בקשת הצטרפות חדשה לאתר הפורום';
    $message = "שלום מנהל,\n\n";
    $message .= "התקבלה בקשת הצטרפות חדשה מאת: " . sanitize_text_field($_POST['firstName']) . " " . sanitize_text_field($_POST['lastName']) . "\n";
    $message .= "אימייל: " . $email . "\n\n";
    $message .= "ניתן לצפות בפרטי המשתמש ובמסמכים המצורפים בפרופיל המשתמש שלו בלוח הבקרה:\n";
    $message .= admin_url("user-edit.php?user_id=$user_id") . "\n\n";
    $message .= "קישור למסמך אימות: " . esc_url_raw($uploaded_files['verificationDoc']) . "\n";
    $message .= "קישור למכתב כוונות: " . esc_url_raw($uploaded_files['intentLetter']) . "\n";

    wp_mail($admin_email, $subject, $message);

    // 6. Send Success Response
    iprf_send_response(['message' => 'ההרשמה בוצעה בהצלחה. פרטיך נשלחו לבדיקה ואישור.']);
}
