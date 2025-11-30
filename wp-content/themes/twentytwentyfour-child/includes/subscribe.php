<?php
function create_form_entries_post_type() {
    register_post_type( 'form-entries',
        array(
            'labels' => array(
                'name' => __( 'Form Entries' ),
                'singular_name' => __( 'Form Entry' )
            ),
            'public' => true,
            'has_archive' => true,
            'supports' => array( 'title', 'editor', 'custom-fields' ),
            'show_in_menu' => true,
        )
    );
}
add_action( 'init', 'create_form_entries_post_type' );

// Capture Contact Form 7 Submission and Save it as a Post
function save_contact_form_to_post( $contact_form ) {
        if(get_current_form() !== "הגשת בקשת הצטרפות") {
            return;
        }
    // Get form data
    $submission = WPCF7_Submission::get_instance();
    if ( $submission ) {
        $data = $submission->get_posted_data();

        // Create a new post
        $post_data = array(
            'post_title'    => sanitize_text_field( $data['first-name'] . ' ' . $data['last-name'] ),
            'post_content'  => sanitize_textarea_field( $data['additional-info'] ),
            'post_type'     => 'form-entries',
            'post_status'   => 'publish'
        );

        // Insert the post into the database
        $post_id = wp_insert_post( $post_data );

        // Add custom fields
        if ( $post_id ) {
            update_post_meta( $post_id, 'first_name', sanitize_text_field( $data['first-name'] ) );
            update_post_meta( $post_id, 'last_name', sanitize_text_field( $data['last-name'] ) );
            update_post_meta( $post_id, 'email', sanitize_email( $data['email'] ) );
            update_post_meta( $post_id, 'phone', sanitize_text_field( $data['phone'] ) );


               $status = get_post($data['academic-status'][0]);
               update_post_meta( $post_id, 'academic_status', ( $status->post_title ) );


           $discipline = get_post($data['discipline'][0]);
               update_post_meta( $post_id, 'discipline', $discipline->post_title );

            update_post_meta( $post_id, 'affiliation', sanitize_text_field( $data['affiliation'] ) );

           $university = get_post($data['university'][0]);
               update_post_meta( $post_id, 'university',  $university->post_title  );


            update_post_meta( $post_id, 'research_summary', sanitize_textarea_field( $data['research-summary'] ) );
        }
    }
}
add_action( 'wpcf7_mail_sent', 'save_contact_form_to_post' );

add_filter('wpcf7_form_tag', 'dynamic_select_degree_for_cf7', 10, 2);

function dynamic_select_degree_for_cf7($tag, $unused) {
    // בדיקה אם זה סוג השדה הנכון
    if ($tag['name'] != 'dynamic_degree') {
        return $tag;
    }

    // יצירת השדות של הסלקט
    $args = array(
        'post_type' => 'degree', // הכנס את סוג הפוסט שלך כאן
        'posts_per_page' => -1, // ללא הגבלה של כמות פוסטים
        'post_status' => 'publish'
    );

    $posts = get_posts($args);

    if ($posts) {
        $options = array();
        $tag['raw_values'][] = '';
        $tag['labels'][] = "בחר סטטוס אקדמי";
        foreach ($posts as $post) {
            $tag['raw_values'][] = $post->ID;
             $tag['labels'][] = $post->post_title;
        }

        $pipes = new WPCF7_Pipes($tag['raw_values']);
        $tag['values'] = $pipes->collect_befores();
        $tag['pipes'] = $pipes;

        $tag['name'] = 'academic-status';
        $tag['options'] = array('class:input-field', 'id:academic-status');
    }

    return $tag;
}

add_filter('wpcf7_form_tag', 'dynamic_select_university_for_cf7', 10, 2);

function dynamic_discipline($tag, $returnId = true) {
// יצירת השדות של הסלקט
    $args = array(
        'post_type' => 'discipline', // הכנס את סוג הפוסט שלך כאן
        'posts_per_page' => -1, // ללא הגבלה של כמות פוסטים
        'post_status' => 'publish'
    );

    $posts = get_posts($args);

    if ($posts) {
        $options = array();
        $tag['raw_values'][] = '';
        $tag['labels'][] = "בחר דיסציפלינה";

        foreach ($posts as $post) {
            $tag['raw_values'][] = $returnId?$post->ID:$post->post_title;
             $tag['labels'][] = $post->post_title;
        }

        $pipes = new WPCF7_Pipes($tag['raw_values']);
        $tag['values'] = $pipes->collect_befores();
        $tag['pipes'] = $pipes;

        $tag['name'] = 'discipline';
        $tag['options'] = array('class:input-field', 'id:discipline');
    }

    return $tag;
}

function dynamic_university($tag, $returnId = true) {
// יצירת השדות של הסלקט
    $args = array(
        'post_type' => 'university', // הכנס את סוג הפוסט שלך כאן
        'posts_per_page' => -1, // ללא הגבלה של כמות פוסטים
        'post_status' => 'publish'
    );

    $posts = get_posts($args);

    if ($posts) {
        $options = array();
        $tag['raw_values'][] = '';
        $tag['labels'][] = "בחר אוניברסיטה";

        foreach ($posts as $post) {
            $tag['raw_values'][] = $returnId?$post->ID:$post->post_title;
             $tag['labels'][] = $post->post_title;
        }

        $pipes = new WPCF7_Pipes($tag['raw_values']);
        $tag['values'] = $pipes->collect_befores();
        $tag['pipes'] = $pipes;

        $tag['name'] = 'university';
        $tag['options'] = array('class:input-field', 'id:university');
    }

    return $tag;
}

function dynamic_select_university_for_cf7($tag, $unused) {
    // בדיקה אם זה סוג השדה הנכון
    if ($tag['name'] != 'dynamic_university') {
        return $tag;
    }

    return dynamic_university($tag);
}

add_filter('wpcf7_form_tag', 'dynamic_select_discipline_for_cf7', 10, 2);

function dynamic_select_discipline_for_cf7($tag, $unused) {
    // בדיקה אם זה סוג השדה הנכון
    if ($tag['name'] != 'dynamic_discipline') {
        return $tag;
    }

    // יצירת השדות של הסלקט
    $args = array(
        'post_type' => 'discipline', // הכנס את סוג הפוסט שלך כאן
        'posts_per_page' => -1, // ללא הגבלה של כמות פוסטים
        'post_status' => 'publish'
    );

    $posts = get_posts($args);

    if ($posts) {
        $options = array();
          $tag['raw_values'][] = '';
                $tag['labels'][] = "בחר דיסציפלינה";
        foreach ($posts as $post) {
            $tag['raw_values'][] = $post->ID;
             $tag['labels'][] = $post->post_title;
        }

        $pipes = new WPCF7_Pipes($tag['raw_values']);
        $tag['values'] = $pipes->collect_befores();
        $tag['pipes'] = $pipes;

        $tag['name'] = 'discipline';
        $tag['options'] = array('class:input-field', 'id:discipline');
    }

    return $tag;
}

function my_wpcf7_redirect_to_thank_you() {
    if(get_current_form() === "הגשת בקשת הצטרפות") {
        // Get the permalink of the page titled "תודה"
        $thank_you_page = get_page_by_title('תודה');
        if ($thank_you_page) {
            $thank_you_url = get_permalink($thank_you_page->ID);
            ?>
            <script type="text/javascript">
                document.addEventListener( 'wpcf7mailsent', function( event ) {
                    window.location.href = '<?php echo esc_url($thank_you_url); ?>';
                }, false );
            </script>
            <?php
        }
    }
}
add_action('wp_footer', 'my_wpcf7_redirect_to_thank_you');

function add_hebrew_only_script_to_footer() {
    ?>
    <script type="text/javascript">
        document.addEventListener('DOMContentLoaded', function () {
            // Select all fields with class 'hebrew-only'
            var hebrewFields = document.querySelectorAll('.hebrew-only');

            hebrewFields.forEach(function(field) {
                field.addEventListener('input', function(event) {
                    // Only allow Hebrew characters (unicode range: \u0590-\u05FF) and spaces
                    field.value = field.value.replace(/[^א-ת\s]/g, '');
                });
            });
        });
    </script>
    <?php
}
add_action('wp_footer', 'add_hebrew_only_script_to_footer');


function add_hebrew_only_class_to_text_fields($tag) {
    // Check if the field is a text input
    if (in_array($tag['type'], array('text', 'text*'))) {
        // Append the 'hebrew-only' class
        $tag['options'][] = 'class:hebrew-only';
    }

    return $tag;
}
add_filter('wpcf7_form_tag', 'add_hebrew_only_class_to_text_fields', 10, 1);

function custom_wpcf7_email_validation_filter($result, $tag) {
    if(get_current_form() === "הגשת בקשת הצטרפות") {
        if ('email' == $tag->name) {
            // Get the submitted email value
            $email = isset($_POST['email']) ? sanitize_email($_POST['email']) : '';

            // Check if the email is already registered
            if (email_exists($email)) {
                $result->invalidate($tag, "אתה כבר רשום");
            }
        }
    }
    return $result;
}
add_filter('wpcf7_validate_email', 'custom_wpcf7_email_validation_filter', 10, 2);
add_filter('wpcf7_validate_email*', 'custom_wpcf7_email_validation_filter', 10, 2);

function get_current_form() {
    $submission = WPCF7_Submission::get_instance();

    if ($submission) {

        $contact_form = WPCF7_ContactForm::get_current();

        if ($contact_form) {
            return $contact_form->title();
        }
    }
    return "";
}

function my_skip_mail(){
    if(get_current_form() === "הגשת בקשת הצטרפות") {
        return true; // DO NOT SEND E-MAIL
    }

    if(get_current_form() === "עריכת חוקר") {
            return true; // DO NOT SEND E-MAIL
        }
}
add_filter('wpcf7_skip_mail','my_skip_mail');