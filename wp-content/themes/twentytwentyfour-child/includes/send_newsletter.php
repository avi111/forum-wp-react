<?php
require_once __DIR__ . '/../vendor/autoload.php';

use TijsVerkoyen\CssToInlineStyles\CssToInlineStyles;

// Add a custom column to the newsletter-item post type
function add_send_to_all_scholars_column($columns) {
    $columns['send_to_scholars'] = 'Send to Scholars';
    return $columns;
}

add_filter('manage_newsletter-item_posts_columns', 'add_send_to_all_scholars_column');

// Add the content for the new column (button)
function send_to_all_scholars_column_content($column, $post_id) {
    if ($column === 'send_to_scholars') {
        echo '<a href="' . esc_url( admin_url( 'admin-post.php?action=send_newsletter_to_scholars&post_id=' . $post_id ) ) . '" class="button button-primary">Send to all scholars</a>';
    }
}

add_action('manage_newsletter-item_posts_custom_column', 'send_to_all_scholars_column_content', 10, 2);

function add_send_selectively_column($columns) {
    $columns['send_selectively'] = 'Send selectively';
    return $columns;
}

add_filter('manage_newsletter-item_posts_columns', 'add_send_selectively_column');

// Add the content for the new column (button)
function send_selectively_column_content($column, $post_id) {
    if ($column === 'send_selectively') {
            $button = '<button type="button" class="button button-primary send-selectively-button" data-postid="' . $post_id . '">Send Selectively</button>';
            echo $button;
    }
}

add_action('manage_newsletter-item_posts_custom_column', 'send_selectively_column_content', 10, 2);

function get_all_css_from_directory($dir) {
    // Initialize an empty string to hold all CSS contents
    $all_css = '';

    // Use RecursiveDirectoryIterator to loop through the directory and its subdirectories
    $directory_iterator = new RecursiveDirectoryIterator($dir);
    $iterator = new RecursiveIteratorIterator($directory_iterator);

    // Loop through all files in the directory and its subdirectories
    foreach ($iterator as $file) {
        // Only process .css files
        if (pathinfo($file, PATHINFO_EXTENSION) === 'css') {
            // Get the file content and append it to the $all_css string
            $all_css .= file_get_contents($file) . "\n"; // Add new line between files
        }
    }

    return $all_css;
}

function send_emails($post_id, $emails) {
    $cssToInlineStyles = new CssToInlineStyles();

    // Get the content of the newsletter post
    $newsletter_post = get_post($post_id);
    if (!$newsletter_post || $newsletter_post->post_type !== 'newsletter-item') {
        wp_die('Invalid newsletter item');
    }

    // Get the content, apply the_content filter and do_shortcode
    $all_css = htmlspecialchars(get_all_css_from_directory(ABSPATH . 'wp-content/plugins/ultimate-addons-for-gutenberg/assets/css'));

    $style = file_get_contents(get_template_directory_uri().'/style.css').file_get_contents(get_stylesheet_directory_uri().'/style.css').$all_css;
    $htmlOpen = '<html dir="rtl"><head><style>'.$style.'</style></head><body class="mail" style="direction:rtl;">';
    $htmlClose = '</body></html>';
    $newsletter_content = apply_filters('the_content', $newsletter_post->post_content);
    $newsletter_content = do_shortcode($newsletter_content);
    $newsletter_content = $htmlOpen.$newsletter_content.$htmlClose;

    $newsletter_content = $cssToInlineStyles->convert(
        $newsletter_content,
        $all_css
    );

    // Send the email
    $subject = get_the_title($post_id);
    $headers = ['Content-Type: text/html; charset=UTF-8'];

    foreach ($emails as $email) {
        wp_mail($email, $subject, $newsletter_content, $headers);
    }
}

// Handle the send email action
function send_newsletter_to_scholars() {
    // Verify the action and check for required post_id
    if (!isset($_GET['post_id'])) {
        wp_die('Invalid post ID');
    }

    $post_id = intval($_GET['post_id']);

    // Get the content of the newsletter post
    $newsletter_post = get_post($post_id);
    if (!$newsletter_post || $newsletter_post->post_type !== 'newsletter-item') {
        wp_die('Invalid newsletter item');
    }

    // Get all scholar posts with the meta field "_associated_user_id"
    $scholars_query = new WP_Query([
        'post_type' => 'scholar',
        'meta_key' => '_associated_user_id',
        'meta_value' => '',
        'meta_compare' => '!=' // Get posts with a non-empty _associated_user_id
    ]);

    // Collect the emails of associated users
    $emails = [];
    if ($scholars_query->have_posts()) {
        while ($scholars_query->have_posts()) {
            $scholars_query->the_post();
            $user_id = get_post_meta(get_the_ID(), '_associated_user_id', true);
            $user = get_user_by('id', $user_id);
            if ($user && !empty($user->user_email)) {
                $emails[] = $user->user_email;
            }
        }
        wp_reset_postdata();
    }

    if (empty($emails)) {
            wp_redirect(admin_url('edit.php?post_type=newsletter-item&message=none'));
            exit;
    }

    send_emails($post_id, $emails);

    // Redirect back to the post list with a success message
    wp_redirect(admin_url('edit.php?post_type=newsletter-item&message=sent'));
    exit;
}

add_action('admin_post_send_newsletter_to_scholars', 'send_newsletter_to_scholars');

// Display a success message after the newsletter is sent
function sent_newsletters_successfully() {
    if (isset($_GET['message']) && $_GET['message'] == 'sent') {
        echo '<div class="notice notice-success is-dismissible"><p>Newsletter sent to all scholars!</p></div>';
    }
}

add_action('admin_notices', 'sent_newsletters_successfully');

function no_emails_found() {
    if (isset($_GET['message']) && $_GET['message'] == 'none') {
        echo '<div class="notice notice-success is-dismissible"><p>No scholars found with valid email addresses.</p></div>';
    }
}

add_action('admin_notices', 'no_emails_found');

function scholar_send_selectively_modal() {
    ?>
    <!-- The Modal Structure -->
    <div id="send-selectively-modal" style="display:none;">
        <div class="modal-content">
            <h2>Select Scholars to Send</h2>
            <form id="send-selectively-form">
                <div id="scholars-list"></div>
                <button type="submit" class="button button-primary">Send</button>
                <button type="button" class="button close-modal">Close</button>
            </form>
        </div>
    </div>

    <style>
        /* Modal Styles */
        #send-selectively-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 9999;
        }

        .modal-content {
            background-color: #fff;
            padding: 20px;
            margin: 100px auto;
            width: 400px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            max-height: 400px;
            overflow: scroll;
            direction: rtl;
        }

        .scholar-item {
            margin-bottom: 10px;
        }
    </style>

    <script>
    jQuery(document).ready(function($) {
        var post_id = $('.send-selectively-button').data('postid');

        // Open modal when button is clicked
        $('.send-selectively-button').click(function() {

            // Load scholars via AJAX and populate modal
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'get_scholar_list',
                },
                success: function(response) {
                    $('#scholars-list').html(response);
                    $('#send-selectively-modal').show();
                }
            });
        });

        // Close modal
        $('.close-modal').click(function() {
            $('#send-selectively-modal').hide();
        });

        // Handle form submission
        $('#send-selectively-form').submit(function(e) {
            e.preventDefault();

            if(!post_id) {
                alert('Invalid post ID');
                return;
            }

            var selectedScholars = [];
            $('input[name="scholar_emails[]"]:checked').each(function() {
                selectedScholars.push($(this).val());
            });

            if (selectedScholars.length > 0) {
                // Send email via AJAX
                $.ajax({
                    url: ajaxurl,
                    type: 'POST',
                    data: {
                        action: 'send_selected_scholars_mail',
                        emails: selectedScholars,
                        post_id,
                    },
                    success: function(response) {
                        alert('Emails sent successfully!');
                        $('#send-selectively-modal').hide();
                    },
                    error: function() {
                        alert('Error sending emails.');
                    }
                });
            } else {
                alert('Please select at least one scholar.');
            }
        });
    });
    </script>
    <?php
}

function get_scholar_list() {
    // Query to get all scholars
    $args = array(
        'post_type' => 'scholar',
        'posts_per_page' => -1, // Get all scholars
    );
    $query = new WP_Query($args);

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $name = get_the_title();
            $user_id = get_post_meta(get_the_ID(), '_associated_user_id', true);
            $user = get_user_by('id', $user_id);
            $email = $user ? $user->user_email : '';

            echo '<div class="scholar-item">';
            echo '<label>';
            echo '<input type="checkbox" name="scholar_emails[]" value="' . esc_attr($email) . '">';
            echo esc_html($name) . ' (' . esc_html($email) . ')';
            echo '</label>';
            echo '</div>';
        }
        wp_reset_postdata();
    } else {
        echo '<p>No scholars found.</p>';
    }

    wp_die(); // Required to terminate the script properly for AJAX.
}
add_action('wp_ajax_get_scholar_list', 'get_scholar_list');

add_action('admin_footer', 'scholar_send_selectively_modal');

function send_selected_scholars_mail() {
    if (isset($_POST['emails']) && is_array($_POST['emails'])) {
        $emails = $_POST['emails'];

        send_emails($_POST['post_id'], $emails);

        wp_send_json_success('Emails sent successfully.');
    } else {
        wp_send_json_error('No emails selected.');
    }
}
add_action('wp_ajax_send_selected_scholars_mail', 'send_selected_scholars_mail');
