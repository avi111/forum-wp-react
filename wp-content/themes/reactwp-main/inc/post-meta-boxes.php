<?php

// Register the meta box
function forum_add_post_writer_meta_box() {
    add_meta_box(
        'forum_post_writer_meta_box',       // ID
        'כותב הפוסט',                        // Title
        'forum_post_writer_meta_box_html',  // Callback
        'post',                             // Screen (post type)
        'side',                             // Context
        'default'                           // Priority
    );
}
add_action('add_meta_boxes', 'forum_add_post_writer_meta_box');

// Display the meta box HTML
function forum_post_writer_meta_box_html($post) {
    // Nonce for verification
    wp_nonce_field('forum_save_post_writer', 'forum_post_writer_nonce');

    // Get current saved value
    $saved_writer = get_post_meta($post->ID, 'forum_post_writer', true);

    // Get all users
    $users = get_users(array('fields' => array('ID', 'display_name')));

    ?>
    <p>
        <label for="forum_post_writer"><strong>בחר כותב:</strong></label>
        <br /><br />
        <select name="forum_post_writer" id="forum_post_writer" class="widefat">
            <option value="">-- בחר --</option>
            <option value="system" <?php selected($saved_writer, 'system'); ?>>מערכת הפורום</option>
            <?php foreach ($users as $user) : ?>
                <option value="<?php echo esc_attr($user->ID); ?>" <?php selected($saved_writer, $user->ID); ?>>
                    <?php echo esc_html($user->display_name); ?>
                </option>
            <?php endforeach; ?>
        </select>
    </p>
    <?php
}

// Save the meta box data
function forum_save_post_writer_meta_box($post_id) {
    // Check if nonce is set and verify it
    if (!isset($_POST['forum_post_writer_nonce']) || !wp_verify_nonce($_POST['forum_post_writer_nonce'], 'forum_save_post_writer')) {
        return;
    }

    // Check autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    // Check permissions
    if (isset($_POST['post_type']) && 'post' === $_POST['post_type']) {
        if (!current_user_can('edit_post', $post_id)) {
            return;
        }
    }

    // Sanitize and save
    if (isset($_POST['forum_post_writer'])) {
        $writer = sanitize_text_field($_POST['forum_post_writer']);
        update_post_meta($post_id, 'forum_post_writer', $writer);
    }
}
add_action('save_post', 'forum_save_post_writer_meta_box');

// Register the meta field for the REST API (useful for React frontend)
function forum_register_post_writer_meta() {
    register_post_meta('post', 'forum_post_writer', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
    ));
}
add_action('init', 'forum_register_post_writer_meta');

// Add a readable text field to the REST API Response
add_action('rest_api_init', 'forum_register_rest_writer_name');
function forum_register_rest_writer_name() {
    register_rest_field('post', 'forum_post_writer_name', array(
        'get_callback'    => 'forum_get_rest_writer_name',
        'update_callback' => null,
        'schema'          => null,
    ));
}

function forum_get_rest_writer_name($object, $field_name, $request) {
    $writer_val = get_post_meta($object['id'], 'forum_post_writer', true);

    if (empty($writer_val)) {
        return '';
    }

    if ($writer_val === 'system') {
        return 'מערכת הפורום';
    }

    // Check if it's a valid user ID
    if (is_numeric($writer_val)) {
        $user = get_userdata($writer_val);
        if ($user) {
            return $user->display_name;
        }
    }

    return '';
}

// Add a custom column to the WordPress Admin Posts list
add_filter('manage_post_posts_columns', 'forum_add_writer_column');
function forum_add_writer_column($columns) {
    $columns['forum_writer'] = 'כותב הפוסט';
    return $columns;
}

add_action('manage_post_posts_custom_column', 'forum_display_writer_column', 10, 2);
function forum_display_writer_column($column, $post_id) {
    if ($column === 'forum_writer') {
        $writer_val = get_post_meta($post_id, 'forum_post_writer', true);

        if (empty($writer_val)) {
            echo '';
        } elseif ($writer_val === 'system') {
            echo 'מערכת הפורום';
        } elseif (is_numeric($writer_val)) {
            $user = get_userdata($writer_val);
            if ($user) {
                echo esc_html($user->display_name);
            }
        }
    }
}
