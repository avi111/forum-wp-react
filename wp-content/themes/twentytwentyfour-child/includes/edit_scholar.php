<?php

function print_and_die($what) {
    if(is_array($what)) {
            foreach($what as $key => $value) {
                echo "<pre>";
                print_r($key);
                echo "</pre>";
                echo "<pre>";
                print_r($value);
                echo "</pre>";
            }
        } else {
            print_r($what);
        }
    echo "</pre>";
    die();
}

add_shortcode('edit_scholar', 'edit_scholar');

function edit_scholar($atts)
{
    $atts = shortcode_atts(
        array(
            'id' => 0,
        ),
        $atts,
        'edit_scholar'
    );

    $scholar_id = $_POST['scholar_id'] ?? $atts['id'];

    if(!$scholar_id) {
        return;
    }

    ob_start();
    ?>


        <div class="form-group">
            <a href="<?php echo get_permalink($scholar_id) ?>" class="submit-button">חזרה לעמוד החוקר</a>
        </div>
    <?php
    echo do_shortcode('[contact-form-7 id="e8dd490" title="עריכת חוקר"]');
    return ob_get_clean();
}

function custom_wpcf7_handle_submission($contact_form) {
    // Get form submission data
    $submission = WPCF7_Submission::get_instance();

    if ($submission) {
        // Get posted data
        $posted_data = $submission->get_posted_data();

        // You can access specific fields like this:
        $scholar_id = isset($posted_data['scholar_id']) ? sanitize_text_field($posted_data['scholar_id']) : '';
        $affiliation = isset($posted_data['affiliation']) ? sanitize_text_field($posted_data['affiliation']) : '';
        $research_summary = isset($posted_data['research-summary']) ? sanitize_textarea_field($posted_data['research-summary']) : '';
        $additional_info = isset($posted_data['additional-info']) ? sanitize_textarea_field($posted_data['additional-info']) : '';
        $phone = isset($posted_data['phone']) ? sanitize_text_field($posted_data['phone']) : '';
        $email = isset($posted_data['email']) ? sanitize_email($posted_data['email']) : '';
        $hide = isset($posted_data['hide']) && is_array($posted_data['hide']) && count($posted_data['hide'])===1 ? sanitize_text_field($posted_data['hide'][0]) : '';
        $discipline = isset($posted_data['discipline']) && is_array($posted_data['discipline']) ? array_map('sanitize_text_field', $posted_data['discipline']) : [];
        $university = isset($posted_data['university']) && is_array($posted_data['university']) ? array_map('sanitize_text_field', $posted_data['university']) : [];

        if($university) {
            $university = implode(',', $university);
        }

        if($discipline) {
            $discipline = implode(',', $discipline);
        }

        if($hide == "כן") {
            $hide = 1;
        } else {
            $hide = 0;
        }

        // Here you can do something with the submitted data
        // For example, save the data in a custom post type, database, etc.

        // Create a new post with the form data (if needed)
        $post_data = array(
            'ID'   => $scholar_id,
            'post_content' => $additional_info,
        );
        wp_update_post($post_data);


        update_post_meta($scholar_id, 'wpcf-affiliation', $affiliation);
        update_post_meta($scholar_id, 'wpcf-research_summary', $research_summary);
        update_post_meta($scholar_id, 'wpcf-phone', $phone);
        update_post_meta($scholar_id, 'wpcf-email', $email);
        update_post_meta($scholar_id, 'wpcf-hide', $hide);
        update_post_meta($scholar_id, 'wpcf-discipline', $discipline);
        update_post_meta($scholar_id, 'wpcf-university', $university);

        $uploaded_files = $submission->uploaded_files();
                if (isset($uploaded_files['image'])) {
                 require_once(ABSPATH . "wp-admin" . '/includes/image.php');
                 require_once(ABSPATH . "wp-admin" . '/includes/file.php');
                 require_once(ABSPATH . "wp-admin" . '/includes/media.php');
                 $uploaded_files = $submission->uploaded_files();
                 $file_path = $uploaded_files['image'];
                 $attachment_id = media_handle_upload('image', $scholar_id);
                 set_post_thumbnail($scholar_id, $attachment_id);
                }
    }
}
add_action('wpcf7_before_send_mail', 'custom_wpcf7_handle_submission', 10, 1);

function validate_scholar_id($result, $tag) {
    if(get_current_form() === "עריכת חוקר") {
        if ('scholar_id' == $tag->name) {
            // Get the submitted email value
            $scholar_id = isset($posted_data['scholar_id']) ? sanitize_text_field($posted_data['scholar_id']) : '';

            // Check if the email is already registered
            if (!$scholar_id) {
                $result->invalidate($tag, "שגיאה, הטופס לא משויך לחוקר");
            }
        }
    }
    return $result;
}
add_filter('wpcf7_validate_email', 'validate_scholar_id', 10, 2);

function dynamically_set_form_default_value($tag) {
    $scholar_id = isset($_POST['scholar_id']) ? sanitize_text_field($_POST['scholar_id']) : '';
    if(!$scholar_id) {
        return $tag;
    }

    $scholar = get_post($scholar_id);

    if($tag['name'] === 'hide') {
        $tag['options'] = array("use_label_element", "default:".(get_post_meta($scholar_id, 'wpcf-hide', true)+1));
    }

    if($tag['name'] === 'university') {
        $tag = dynamic_university($tag, false);
        $tag['options'][] = "multiple";
        $tag['options'][] = 'default:'.implode('_',array_map(function($option) use ($tag) {
                $index = array_search(trim($option), $tag['values']);
                if($index === false) {
                  return '';
                 }
              return $index + 1;
        }, explode(',',get_post_meta($scholar_id, 'wpcf-university', true))));
    }

    if($tag['name'] === 'discipline') {
        $tag = dynamic_discipline($tag, false);
        $tag['options'][] = "multiple";
        $tag['options'][] = 'default:'.implode('_',array_map(function($option) use ($tag) {
              $index = array_search(trim($option), $tag['values']);
              if($index === false) {
                return '';
               }
            return $index + 1;
        }, explode(',',get_post_meta($scholar_id, 'wpcf-discipline', true))));
    }

    if ($tag['name'] === 'phone') {
        $tag['values'] = array(get_post_meta($scholar_id, 'wpcf-phone', true));
    }

    if($tag['name'] === 'email') {
        $tag['values'] = array(get_post_meta($scholar_id, 'wpcf-email', true));
    }

    if($tag['name'] === 'affiliation') {
        $tag['values'] = array(get_post_meta($scholar_id, 'wpcf-affiliation', true));
    }

    if($tag['name'] === 'research-summary') {
        $tag['values'] = array(get_post_meta($scholar_id, 'wpcf-research_summary', true));
    }

    if($tag['name'] === 'additional-info') {
        $tag['values'] = array($scholar->post_content);
    }

    return $tag;
}
add_filter('wpcf7_form_tag', 'dynamically_set_form_default_value', 10, 1);

function redirect_when_no_scholar_id() {
    global $post;
    if($post->post_title === "עריכת חוקר" && !isset($_POST['scholar_id'])) {
        $args = array(
            'post_type' => 'scholar',
            'posts_per_page' => -1,
            'meta_query' => array(
                  array(
                      'key' => '_associated_user_id',
                      'value' => get_current_user_id(),
                      'compare' => '=='
                  )
              )
        );

        $query = new WP_Query($args);
        if($query->post_count == 1) {
            $_POST['scholar_id'] = $query->posts[0]->ID;
        } else {
            wp_redirect(home_url());
            exit;
        }
    }
}

// Hook into the template_redirect action
add_action('template_redirect', 'redirect_when_no_scholar_id');

function dynamic_multiple_select_university_shortcode( $atts ) {
    // Define the options dynamically (this could come from a database or an external source)
    $options = dynamic_university([], false);
    $scholar_id = $_POST['scholar_id'] ?? $atts['id'];

    // Define the default selections
    $default = explode(',',get_post_meta($scholar_id, 'wpcf-university', true));

    // Convert to CF7 format
    $all_options = array_map(function($option) {
        return '"' . $option . '"';
    }, $options['values']);

    $default_options = array_filter(array_map( function( $option ) use ( $default ) {
        if ( in_array( $option, $default ) ) {
            return '"'.$option.'"';
        }
    }, array_filter($options['values'])));

    $default = count($default_options) > 0 ? 'default:' : '';
//    $select_options = $default.implode(',',$default_options).' '.implode(' ', $all_options);
    $select_options = implode(' ', $all_options);
    $return = '[select university class:input-field multiple ' . $select_options . ']';
    return $return;
}
add_shortcode( 'dynamic_multiple_select_university', 'dynamic_multiple_select_university_shortcode' );

