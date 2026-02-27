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
        'string' => ['מחרוזות', 'מחרוזת', 'dashicons-translation', 23, true, ['title']],
        'research-paper' => ['מאמרי מחקר', 'מאמר מחקר', 'dashicons-media-document', 5, true, ['title', 'editor', 'excerpt', 'thumbnail', 'author', 'custom-fields'], ['post_tag']],
        'news' => ['חדשות', 'חדשה', 'dashicons-megaphone', 6, true, ['title', 'editor', 'custom-fields']],
        'event' => ['אירועים', 'אירוע', 'dashicons-calendar-alt', 7, true, ['title', 'editor', 'excerpt', 'thumbnail', 'custom-fields']],
        'meeting' => ['מפגשים', 'מפגש', 'dashicons-groups', 8, true, ['title', 'editor', 'excerpt', 'custom-fields']],
        'training' => ['הכשרות', 'הכשרה', 'dashicons-welcome-learn-more', 9, true, ['title', 'editor', 'excerpt', 'thumbnail', 'custom-fields']],
        'questionnaire' => ['שאלוני מחקר', 'שאלון מחקר', 'dashicons-clipboard', 10, true, ['title', 'editor', 'excerpt', 'thumbnail', 'author', 'custom-fields']],
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

/**
 * Move the excerpt box to just below the title for specific post types.
 */
function iprf_move_excerpt_after_title($post_type, $post) {
    // Define post types where we want to move the excerpt
    $target_post_types = ['research-paper', 'questionnaire', 'event', 'meeting', 'training'];

    if (!in_array($post_type, $target_post_types)) {
        return;
    }

    // Remove the default excerpt meta box from all possible locations
    remove_meta_box('postexcerpt', $post_type, 'normal');
    remove_meta_box('postexcerpt', $post_type, 'side');
    remove_meta_box('postexcerpt', $post_type, 'advanced');

    // Determine context based on editor type
    // If Block Editor (Gutenberg), we use 'normal' to show it in the main column (bottom).
    // If Classic Editor, we use 'after_title' to show it right after the title.
    $context = 'normal';
    if (function_exists('use_block_editor_for_post') && !use_block_editor_for_post($post)) {
        $context = 'after_title';
    }

    // Add it back with 'high' priority
    add_meta_box(
        'postexcerpt',
        __('Excerpt'), // Title of the meta box
        'post_excerpt_meta_box', // Callback function
        $post_type, // Post type
        $context, // Context
        'high' // Priority
    );
}
add_action('add_meta_boxes', 'iprf_move_excerpt_after_title', 10, 2);

/**
 * Hook to render meta boxes after the title.
 * This only affects the Classic Editor.
 */
function iprf_render_after_title_meta_boxes($post) {
    global $wp_meta_boxes;

    $post_type = $post->post_type;
    // Check if there are meta boxes registered for 'after_title' context
    if (isset($wp_meta_boxes[$post_type]['after_title'])) {
        do_meta_boxes($post_type, 'after_title', $post);
    }
}
add_action('edit_form_after_title', 'iprf_render_after_title_meta_boxes');

/**
 * Add Excerpt column to admin listing for specific post types
 */
function iprf_add_excerpt_column($columns) {
    $new_columns = [];
    foreach ($columns as $key => $value) {
        $new_columns[$key] = $value;
        if ($key === 'title') {
            $new_columns['excerpt'] = __('Excerpt');
        }
    }
    return $new_columns;
}

/**
 * Display Excerpt content in the admin column
 */
function iprf_show_excerpt_column_content($column, $post_id) {
    if ($column === 'excerpt') {
        $excerpt = get_the_excerpt($post_id);
        echo esc_html($excerpt);
    }
}

// Apply columns and content hooks to specific post types
$excerpt_post_types = ['research-paper', 'questionnaire', 'event', 'meeting', 'training'];
foreach ($excerpt_post_types as $pt) {
    add_filter("manage_{$pt}_posts_columns", 'iprf_add_excerpt_column');
    add_action("manage_{$pt}_posts_custom_column", 'iprf_show_excerpt_column_content', 10, 2);
}

/**
 * ==========================================
 * Featured Image (Thumbnail) in Admin List
 * ==========================================
 */

/**
 * Add Thumbnail column to admin listing
 */
function iprf_add_thumbnail_column($columns) {
    $new_columns = [];
    foreach ($columns as $key => $value) {
        $new_columns[$key] = $value;
        if ($key === 'title') {
            $new_columns['featured_image'] = __('Image', 'textdomain');
        }
    }
    return $new_columns;
}

/**
 * Render Thumbnail column
 */
function iprf_show_thumbnail_column_content($column, $post_id) {
    if ($column === 'featured_image') {
        $thumbnail_id = get_post_thumbnail_id($post_id);
        $nonce = wp_create_nonce('iprf_set_featured_image_' . $post_id);
        
        echo '<div class="iprf-featured-image-wrapper" data-post_id="' . $post_id . '" data-nonce="' . $nonce . '" title="' . __('Click to change image') . '">';
        if ($thumbnail_id) {
            echo wp_get_attachment_image($thumbnail_id, [60, 60]);
        } else {
            echo '<span class="dashicons dashicons-format-image" style="color: #ccc; font-size: 30px; width: 30px; height: 30px;"></span>';
        }
        echo '</div>';
    }
}

// Hook for columns - only for types that support thumbnails
$thumbnail_post_types = ['research-paper', 'questionnaire', 'event', 'training'];
foreach ($thumbnail_post_types as $pt) {
    add_filter("manage_{$pt}_posts_columns", 'iprf_add_thumbnail_column');
    add_action("manage_{$pt}_posts_custom_column", 'iprf_show_thumbnail_column_content', 10, 2);
}

/**
 * Enqueue media scripts and custom JS for inline image editing
 */
function iprf_admin_enqueue_scripts($hook) {
    global $post_type;
    $thumbnail_post_types = ['research-paper', 'questionnaire', 'event', 'training'];

    if ('edit.php' === $hook && in_array($post_type, $thumbnail_post_types)) {
        wp_enqueue_media();
        add_action('admin_footer', 'iprf_print_media_js');
    }
}
add_action('admin_enqueue_scripts', 'iprf_admin_enqueue_scripts');

/**
 * JS for handling media uploader
 */
function iprf_print_media_js() {
    ?>
    <script>
    jQuery(document).ready(function($) {
        var file_frame;
        var current_wrapper;
        
        $(document).on('click', '.iprf-featured-image-wrapper', function(e) {
            e.preventDefault();
            
            current_wrapper = $(this);
            var post_id = current_wrapper.data('post_id');
            var nonce = current_wrapper.data('nonce');
            
            // If the frame already exists, re-open it.
            if (file_frame) {
                file_frame.open();
                return;
            }
            
            // Create the media frame.
            file_frame = wp.media.frames.file_frame = wp.media({
                title: '<?php _e("Select Featured Image"); ?>',
                button: {
                    text: '<?php _e("Set Featured Image"); ?>'
                },
                multiple: false
            });
            
            // When an image is selected, run a callback.
            file_frame.on('select', function() {
                var attachment = file_frame.state().get('selection').first().toJSON();
                
                // Send AJAX request
                $.post(ajaxurl, {
                    action: 'iprf_set_featured_image',
                    post_id: current_wrapper.data('post_id'),
                    thumbnail_id: attachment.id,
                    security: current_wrapper.data('nonce')
                }, function(response) {
                    if (response.success) {
                        current_wrapper.html(response.data.html);
                    } else {
                        alert('Error setting image');
                    }
                });
            });
            
            file_frame.open();
        });
    });
    </script>
    <style>
        .iprf-featured-image-wrapper { 
            cursor: pointer; 
            width: 60px; 
            height: 60px; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            background: #f0f0f1; 
            border: 1px solid #ccc; 
            overflow: hidden; 
            border-radius: 4px;
            transition: border-color 0.2s;
        }
        .iprf-featured-image-wrapper:hover {
            border-color: #2271b1;
        }
        .iprf-featured-image-wrapper img { 
            width: 100%; 
            height: 100%; 
            object-fit: cover; 
        }
    </style>
    <?php
}

/**
 * AJAX Handler
 */
function iprf_ajax_set_featured_image() {
    $post_id = intval($_POST['post_id']);
    $thumbnail_id = intval($_POST['thumbnail_id']);
    $nonce = $_POST['security'];
    
    if (!wp_verify_nonce($nonce, 'iprf_set_featured_image_' . $post_id)) {
        wp_send_json_error('Invalid nonce');
    }
    
    if (!current_user_can('edit_post', $post_id)) {
        wp_send_json_error('Permission denied');
    }
    
    set_post_thumbnail($post_id, $thumbnail_id);
    
    $html = wp_get_attachment_image($thumbnail_id, [60, 60]);
    wp_send_json_success(['html' => $html]);
}
add_action('wp_ajax_iprf_set_featured_image', 'iprf_ajax_set_featured_image');

/**
 * Add custom admin styles
 */
function iprf_admin_styles() {
    echo '<style>
        .editor-post-card-panel + div {
            display: none;
        }
    </style>';
}
add_action('admin_head', 'iprf_admin_styles');
