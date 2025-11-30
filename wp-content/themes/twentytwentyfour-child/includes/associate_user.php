<?php
function add_scholar_user_meta_box() {
    add_meta_box(
        'scholar_user_meta_box', // Unique ID
        'Associated User',        // Box title
        'render_scholar_user_meta_box', // Content callback
        'scholar',                // Post type
        'side',                   // Context
        'default'                 // Priority
    );
}
add_action( 'add_meta_boxes', 'add_scholar_user_meta_box' );

function render_scholar_user_meta_box( $post ) {
    // Get the saved user ID if it exists
    $saved_user_id = get_post_meta( $post->ID, '_associated_user_id', true );

    // If no user is saved, try to find a matching user by the scholar's title
    if ( empty( $saved_user_id ) ) {
        $title = get_the_title( $post->ID );
        $matching_user = get_user_by( 'display_name', $title );
        if ( $matching_user ) {
            $saved_user_id = $matching_user->ID; // Automatically associate the user if found
        }
    }

    // Get all users
    $users = get_users( array( 'fields' => array( 'ID', 'display_name' ) ) );

    // Create a select field for users
    echo '<label for="associated_user">Select a user to associate:</label>';
    echo '<select name="associated_user" id="associated_user">';
    echo '<option value="">— No User —</option>';

    foreach ( $users as $user ) {
        $selected = ( $saved_user_id == $user->ID ) ? 'selected="selected"' : '';
        echo '<option value="' . esc_attr( $user->ID ) . '" ' . $selected . '>' . esc_html( $user->display_name ) . '</option>';
    }

    echo '</select>';
}

function save_scholar_user_meta_box( $post_id ) {
    // Check if the current user is authorized to do this action
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }

    // Verify this came from our screen and with proper authorization
    if ( isset( $_POST['associated_user'] ) ) {
        update_post_meta( $post_id, '_associated_user_id', sanitize_text_field( $_POST['associated_user'] ) );
    } else {
        // If no user is set, try to auto-associate based on the post title
        $title = get_the_title( $post_id );
        $matching_user = get_user_by( 'display_name', $title );
        if ( $matching_user ) {
            update_post_meta( $post_id, '_associated_user_id', $matching_user->ID );
        }
    }
}
add_action( 'save_post', 'save_scholar_user_meta_box' );

// Hook into the 'delete_user' action
add_action('delete_user', 'delete_scholar_post_when_user_deleted');

function delete_scholar_post_when_user_deleted($user_id) {

    delete_user_meta_data($user_id);
    // Arguments to query the 'scholar' post type with meta '_associated_user_id'
    $args = array(
        'post_type'  => 'scholar',
        'meta_query' => array(
            array(
                'key'     => '_associated_user_id',
                'value'   => $user_id,
                'compare' => '='
            ),
        ),
        'posts_per_page' => 1, // Limiting to one post
        'fields'         => 'ids' // Return only the post IDs
    );

    // Query the scholar post that matches the user ID in the meta field
    $scholar_post_query = new WP_Query($args);

    if ($scholar_post_query->have_posts()) {
        foreach ($scholar_post_query->posts as $scholar_post_id) {
                    delete_scholar_meta_data($scholar_post_id);
            // Delete the post with the matching '_associated_user_id'
            wp_delete_post($scholar_post_id, true); // true for permanent delete
        }
    }

    // Reset Post Data
    wp_reset_postdata();
}

// Function to delete all user meta data
function delete_user_meta_data($user_id) {
    global $wpdb;
    // Query and delete all user meta data associated with the user
    $wpdb->delete($wpdb->usermeta, array('user_id' => $user_id));
}

// Function to delete all scholar post meta data
function delete_scholar_meta_data($scholar_post_id) {
    global $wpdb;
    // Query and delete all meta data associated with the scholar post
    $wpdb->delete($wpdb->postmeta, array('post_id' => $scholar_post_id));
}