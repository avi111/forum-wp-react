<?php
function add_form_entries_columns($columns) {
    $columns['first_name'] = 'שם פרטי';
    $columns['last_name'] = 'שם משפחה';
    $columns['email'] = 'כתובת מייל';
    $columns['phone'] = 'טלפון';
    $columns['academic_status'] = 'סטטוס אקדמי';
    $columns['discipline'] = 'דיסציפלינה אקדמית';
    $columns['user_exists'] = 'האם קיים משתמש';
    $columns['actions'] = 'פעולות';

    return $columns;
}
add_filter('manage_form-entries_posts_columns', 'add_form_entries_columns');

// הצגת התוכן בעמודות המותאמות אישית
function form_entries_custom_columns($column, $post_id) {
    $first_name = get_post_meta($post_id, 'first_name', true);
    $last_name  = get_post_meta($post_id, 'last_name', true);
    $email      = get_post_meta($post_id, 'email', true);
    $full_name  = $first_name . ' ' . $last_name;
    $exists     = email_exists($email);

    switch ($column) {
        case 'first_name':
            echo get_post_meta($post_id, 'first_name', true);
            break;
        case 'last_name':
            echo get_post_meta($post_id, 'last_name', true);
            break;
        case 'email':
            echo get_post_meta($post_id, 'email', true);
            break;
        case 'phone':
            echo get_post_meta($post_id, 'phone', true);
            break;
        case 'academic_status':
            echo get_post_meta($post_id, 'academic_status', true);
            break;
        case 'discipline':
            echo get_post_meta($post_id, 'discipline', true);
            break;
        case 'user_exists':
            echo $exists ? 'כן' : 'לא';
            break;
        case 'actions':
            if ($exists) {
                echo '<a href="#" class="delete-user">מחק</a>';
            } else {
                echo '<a href="#" class="convert-to-user">המר למשתמש</a>';
                echo '<br>';
                                echo '<a href="#" class="delete-user">מחק</a>';
            }
            break;
    }
}
add_action('manage_form-entries_posts_custom_column', 'form_entries_custom_columns', 10, 2);

// Add AJAX actions for delete and convert to user
function handle_ajax_actions() {
    add_action('wp_ajax_delete_form_entry', 'delete_form_entry');
    add_action('wp_ajax_convert_to_user', 'convert_to_user');
}
add_action('admin_init', 'handle_ajax_actions');

// Function to delete the form entry
function delete_form_entry() {
    if ( isset( $_POST['post_id'] ) && current_user_can('delete_post', $_POST['post_id']) ) {
        $post_id = intval( $_POST['post_id'] );
        wp_delete_post($post_id, true); // Force delete
        wp_send_json_success( 'Form entry deleted successfully.' );
    } else {
        wp_send_json_error( 'Failed to delete form entry.' );
    }
    wp_die();
}

function create_user_to_scholar($first_name, $last_name, $email, $post_id = null) {
        if ( !username_exists( $email ) && !email_exists( $email ) ) {
            $random_password = wp_generate_password();
            $user_id = wp_create_user( $email, $random_password, $email );

            if ( !is_wp_error( $user_id ) ) {
                wp_update_user( array(
                    'ID'         => $user_id,
                    'first_name' => $first_name,
                    'last_name'  => $last_name,
                    'display_name' => $first_name . ' ' . $last_name
                ) );

                if ($post_id) {
                    create_scholar_and_associate_from_form_entry($post_id);
                    wp_delete_post($post_id, true); // Force delete
                    wp_send_json_success( 'User created successfully.' );
                } else {
                    return true;
                }

            } else {
                if ($post_id) {
                    wp_send_json_error( 'Failed to create user.' );
                } else {
                    return false;
                    }
            }
        } else {
                        if ($post_id) {
            wp_send_json_error( 'User already exists.' );
            } else {
                return false;
            }
        }

        return false;
}

// Function to convert to user
function convert_to_user() {
    if ( isset( $_POST['post_id'] ) ) {
        $post_id = intval( $_POST['post_id'] );
        $first_name = get_post_meta( $post_id, 'first_name', true );
        $last_name  = get_post_meta( $post_id, 'last_name', true );
        $email      = get_post_meta( $post_id, 'email', true );

        create_user_to_scholar($first_name, $last_name, $email, $post_id);
    }
    wp_die();
}

function enqueue_custom_admin_scripts() {
    ?>
    <script type="text/javascript">
        jQuery(document).ready(function($) {

            // Handle delete action
            $('.delete-user').on('click', function(e) {
                e.preventDefault();
                var post_id = parseInt($(this).closest('tr').attr('id').replace(/[^0-9]/g, ''));

                if (confirm('Are you sure you want to delete this entry?')) {
                    $.ajax({
                        url: ajaxurl,
                        type: 'POST',
                        data: {
                            action: 'delete_form_entry',
                            post_id: post_id,
                        },
                        success: function(response) {
                            if (response.success) {
                                alert(response.data);
                                location.reload(); // Reload the page
                            } else {
                                alert('Failed to delete entry.');
                            }
                        },
                    });
                }
            });

            // Handle convert to user action
            $('.convert-to-user').on('click', function(e) {
                e.preventDefault();
                var post_id = parseInt($(this).closest('tr').attr('id').replace(/[^0-9]/g, ''));

                $.ajax({
                    url: ajaxurl,
                    type: 'POST',
                    data: {
                        action: 'convert_to_user',
                        post_id: post_id,
                    },
                    success: function(response) {
                        if (response.success) {
                            alert(response.data);
                            location.reload(); // Reload the page
                        } else {
                            alert(response.data);
                        }
                    }
                });
            });

        });
    </script>
    <?php
}
add_action('admin_footer', 'enqueue_custom_admin_scripts');

// This function will create a Scholar post and associate the meta fields
function create_scholar_and_associate_from_form_entry($form_entry_id) {
    // Retrieve the meta fields from the form entry
    $first_name = get_post_meta($form_entry_id, 'first_name', true);
    $last_name = get_post_meta($form_entry_id, 'last_name', true);
    $academic_status = get_post_meta($form_entry_id, 'academic_status', true);
    $discipline_id = get_post_meta($form_entry_id, 'discipline', true);
    $university_id = get_post_meta($form_entry_id, 'university', true);
    $research_summary = get_post_meta($form_entry_id, 'research_summary', true);
    $phone = get_post_meta($form_entry_id, 'phone', true);
    $email = get_post_meta($form_entry_id, 'email', true);
    $affiliation = get_post_meta($form_entry_id, 'affiliation', true);
    $additional_info = get_post_meta($form_entry_id, 'additional_info', true);

    // Create the Scholar post
    $scholar_data = array(
        'post_title' => sanitize_text_field($first_name . ' ' . $last_name),
        'post_type' => 'scholar',
        'post_status' => 'publish',
    );

    $scholar_id = wp_insert_post($scholar_data);

    if ($scholar_id) {
        // Add meta fields to the scholar
        update_post_meta($scholar_id, 'wpcf-first_name', sanitize_text_field($first_name));
        update_post_meta($scholar_id, 'wpcf-last_name', sanitize_text_field($last_name));
        update_post_meta($scholar_id, 'wpcf-research_summary', sanitize_textarea_field($research_summary));
        update_post_meta($scholar_id, 'wpcf-phone', sanitize_text_field($phone));
        update_post_meta($scholar_id, 'wpcf-email', sanitize_email($email));
        update_post_meta($scholar_id, 'wpcf-affiliation', sanitize_text_field($affiliation));
        update_post_meta($scholar_id, 'wpcf-additional_info', sanitize_textarea_field($additional_info));
        update_post_meta($scholar_id, 'wpcf-academic_status', sanitize_text_field($academic_status));
        update_post_meta($scholar_id, 'wpcf-discipline', $discipline_id);
        update_post_meta($scholar_id, 'wpcf-university', $university_id);
        update_post_meta($scholar_id, '_associated_user_id', get_user_by('email', $email)->ID);
    }

    return $scholar_id;
}

// Example of how to call this function when a user is created or on form submission
add_action('user_register', 'on_user_created_associate_scholar_with_form_entry', 10, 1);

function on_user_created_associate_scholar_with_form_entry($user_id) {
    // Logic to get the related form entry ID (if it exists)
    // Assume the form entry ID is stored as user meta or retrieved from elsewhere

    $form_entry_id = get_user_meta($user_id, 'form_entry_id', true); // Example

    if ($form_entry_id) {
        create_scholar_and_associate_from_form_entry($form_entry_id);
    }
}