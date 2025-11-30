<?php
function add_import_scholars_button( $which ) {
    global $typenow;

    // Only add the button on the scholar post type page
    if ( 'scholar' === $typenow && 'top' === $which ) {
        echo '<div class="alignleft actions">';
        echo '<button type="button" class="button" id="import-scholars-button">Import Scholars</button>';
        echo '</div>';
    }
}
add_action( 'manage_posts_extra_tablenav', 'add_import_scholars_button', 20, 1 );

function scholar_import_modal() {
    ?>
       <div id="import-scholars-modal" style="display:none;">
           <div class="modal-content">
               <h2>Upload CSV to Import Scholars</h2>
               <form id="import-scholars-form" enctype="multipart/form-data">
                   <input type="file" name="scholar_csv" id="scholar-csv-file" accept=".csv" required>
                   <input type="hidden" name="action" value="import_scholars_from_csv">
                   <button type="submit" class="button button-primary">Import</button>
               </form>
           </div>
       </div>

       <style>
           #import-scholars-modal {
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
           }
       </style>

       <script>
       jQuery(document).ready(function($) {
           $('#import-scholars-button').click(function() {
               $('#import-scholars-modal').show();
           });

           $('#import-scholars-form').submit(function(e) {
               e.preventDefault();

               var formData = new FormData(this);

               $.ajax({
                   url: ajaxurl,
                   type: 'POST',
                   data: formData,
                   contentType: false,
                   processData: false,
                   success: function(response) {
                       $('#import-scholars-modal').hide();
                       alert('Scholars imported successfully!');
                       location.reload();
                   },
                   error: function() {
                       alert('Error importing scholars. Please try again.');
                   }
               });
           });
       });
       </script>
       <?php
}

add_action( 'admin_footer', 'scholar_import_modal' );

function import_scholars_from_csv() {
    if ( ! current_user_can( 'manage_options' ) ) {
        wp_send_json_error( 'Unauthorized', 401 );
        return;
    }

    if ( ! isset( $_FILES['scholar_csv'] ) || ! is_uploaded_file( $_FILES['scholar_csv']['tmp_name'] ) ) {
        wp_send_json_error( 'No file uploaded', 400 );
        return;
    }

    $csv_file = $_FILES['scholar_csv']['tmp_name'];
    $csv_data = array_map('str_getcsv', file($csv_file));

    if ( empty( $csv_data ) ) {
        wp_send_json_error( 'Empty CSV file', 400 );
        return;
    }

    $headers = array_shift( $csv_data ); // Remove the first row (headers)

    foreach ( $csv_data as $row ) {
        if(count($row) != count($headers)) {
            continue;
        }
        $row_data = array_combine( $headers, $row );

        // Add scholar from CSV
        add_scholar_from_csv( $row_data );
    }

    wp_send_json_success( 'Scholars imported successfully' );
}
add_action( 'wp_ajax_import_scholars_from_csv', 'import_scholars_from_csv' );

function map_academic_status($input) {
    // Define the mapping as an associative array
    $mapping = [
        'דוקטורנט' => 'דוקטורנט',
        'דוקטורנט.ית' => 'דוקטורנט',
        'מאסטרנט' => 'מאסטרנט',
        'מאסטרנט.ית' => 'מאסטרנט',
        'חוקר' => 'חוקר',
        'חוקר.ת' => 'חוקר',
        'אחר' => 'אחר',
        'ד"ר' => 'ד"ר',
        'פרופ׳' => 'פרופ׳'
    ];

    // Return the mapped value or the input if it's not found in the mapping
    return isset($mapping[$input]) ? $mapping[$input] : $input;
}

function get_key_by_substring($array, $substring) {
    foreach ($array as $key => $value) {
        // Check if the key contains the substring
        if (strpos($key, $substring) !== false) {
            return $value; // Substring found in the key
        }
    }
    return ''; // No match found
}

function add_scholar_from_csv( $data ) {
    $post_data = array(
        'post_title'    => $data['שם פרטי'] . ' ' . $data['שם משפחה'],
        'post_type'     => 'scholar',
        'post_status'   => 'publish',
    );

    $first_name = $data['שם פרטי'];
    $last_name = $data['שם משפחה'];
    $email = $data['כתובת מייל'];
    $phone = $data['טלפון'];
    $affiliation = get_key_by_substring($data, 'affiliation');
    $research_summary = $data['תקציר המחקר'];

//    print_r($data);
//            wp_send_json_error( 'die', 400 );
//            die();
    $additional_info = $data['עוד משהו שתרצו שנדע?'];
    $academic_status =map_academic_status( $data['סטטוס אקדמי']);
    $discipline_id = $data['דיסציפלינה אקדמית'];

    if(!email_exists($email)) {
            $scholar_id = wp_insert_post( $post_data );
            if ( ! is_wp_error( $post_id ) ) {
                    $created = create_user_to_scholar($first_name, $last_name, $email);
                    if(!$created) {
                        wp_delete_post($post_id, true); // Force delete
                        return;
                    }
            }
    }  else {
        $scholar_id = get_page_by_title($data['שם פרטי'] . ' ' . $data['שם משפחה'], OBJECT, 'scholar')->ID;
    }

    if ( $scholar_id ) {

           $post_data = array(
                       'ID'           => $scholar_id,      // Post ID to update
                       'post_content' => '',  // New content
                   );

                   // Update the post in the database
            wp_update_post($post_data);

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
}
