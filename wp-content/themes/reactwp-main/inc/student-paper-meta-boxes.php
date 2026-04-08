<?php
/**
 * Custom Meta Boxes for 'student-paper' custom post type.
 */

if (!defined('ABSPATH')) {
  exit; // Exit if accessed directly
}

/**
 * Add meta boxes for 'student-paper' custom post type.
 */
function iprf_add_student_paper_meta_boxes()
{
  add_meta_box(
    'iprf_student_paper_details',
    __('פרטי עבודת סטודנט', 'reactwp-main'),
    'iprf_render_student_paper_meta_box_callback',
    'student-paper',
    'normal',
    'high'
  );
}

add_action('add_meta_boxes', 'iprf_add_student_paper_meta_boxes');

/**
 * Render the meta box content.
 *
 * @param WP_Post $post The post object.
 */
function iprf_render_student_paper_meta_box_callback($post)
{
  // Add a nonce field so we can check for it later.
  wp_nonce_field('iprf_save_student_paper_meta_box_data', 'iprf_student_paper_meta_box_nonce');

  // Retrieve existing meta values
  $student_name = get_post_meta($post->ID, 'wpcf-student-name', true);
  $institution = get_post_meta($post->ID, 'wpcf-institution', true);
  $degree = get_post_meta($post->ID, 'wpcf-degree', true);
  $year = get_post_meta($post->ID, 'wpcf-year', true);
  $pdf_url = get_post_meta($post->ID, 'wpcf-pdf', true); // Assuming this stores a URL

  ?>
  <table class="form-table">
    <tbody>
    <tr>
      <th><label for="iprf_student_name"><?php _e('שם הסטודנט', 'reactwp-main'); ?></label></th>
      <td>
        <input type="text" id="iprf_student_name" name="iprf_student_name"
               value="<?php echo esc_attr($student_name); ?>" class="regular-text" />
      </td>
    </tr>
    <tr>
      <th><label for="iprf_institution"><?php _e('מוסד לימודים', 'reactwp-main'); ?></label></th>
      <td>
        <input type="text" id="iprf_institution" name="iprf_institution" value="<?php echo esc_attr($institution); ?>"
               class="regular-text" />
      </td>
    </tr>
    <tr>
      <th><label for="iprf_degree"><?php _e('תואר', 'reactwp-main'); ?></label></th>
      <td>
        <input type="text" id="iprf_degree" name="iprf_degree" value="<?php echo esc_attr($degree); ?>"
               class="regular-text" />
      </td>
    </tr>
    <tr>
      <th><label for="iprf_year"><?php _e('שנה', 'reactwp-main'); ?></label></th>
      <td>
        <input type="text" id="iprf_year" name="iprf_year" value="<?php echo esc_attr($year); ?>"
               class="regular-text" />
      </td>
    </tr>
    <tr>
      <th><label for="iprf_pdf_url"><?php _e('קישור לקובץ PDF', 'reactwp-main'); ?></label></th>
      <td>
        <input type="url" id="iprf_pdf_url" name="iprf_pdf_url" value="<?php echo esc_url($pdf_url); ?>"
               class="regular-text" />
        <p class="description"><?php _e('הכנס קישור ישיר לקובץ ה-PDF של העבודה.', 'reactwp-main'); ?></p>
      </td>
    </tr>
    </tbody>
  </table>
  <?php
}

/**
 * Save meta box data when the post is saved.
 *
 * @param int $post_id The ID of the post being saved.
 */
function iprf_save_student_paper_meta_box_data($post_id)
{
  // Check if our nonce is set.
  if (!isset($_POST['iprf_student_paper_meta_box_nonce'])) {
    return;
  }

  // Verify that the nonce is valid.
  if (!wp_verify_nonce($_POST['iprf_student_paper_meta_box_nonce'], 'iprf_save_student_paper_meta_box_data')) {
    return;
  }

  // If this is an autosave, our form has not been submitted, so we don't want to do anything.
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
    return;
  }

  // Check the user's permissions.
  if (isset($_POST['post_type']) && 'student-paper' == $_POST['post_type']) {
    if (!current_user_can('edit_post', $post_id)) {
      return;
    }
  } else {
    return;
  }

  // Sanitize and save the data.
  if (isset($_POST['iprf_student_name'])) {
    update_post_meta($post_id, 'wpcf-student-name', sanitize_text_field($_POST['iprf_student_name']));
  }
  if (isset($_POST['iprf_institution'])) {
    update_post_meta($post_id, 'wpcf-institution', sanitize_text_field($_POST['iprf_institution']));
  }
  if (isset($_POST['iprf_degree'])) {
    update_post_meta($post_id, 'wpcf-degree', sanitize_text_field($_POST['iprf_degree']));
  }
  if (isset($_POST['iprf_year'])) {
    update_post_meta($post_id, 'wpcf-year', sanitize_text_field($_POST['iprf_year']));
  }
  if (isset($_POST['iprf_pdf_url'])) {
    update_post_meta($post_id, 'wpcf-pdf', esc_url_raw($_POST['iprf_pdf_url']));
  }
}

add_action('save_post', 'iprf_save_student_paper_meta_box_data');


/**
 * Add meta box for Student Paper custom fields.
 */
function iprf_add_student_paper_meta_box()
{
  add_meta_box(
    'iprf_student_paper_details',
    __('פרטי עבודת סטודנט', 'reactwp-main'),
    'iprf_render_student_paper_meta_box',
    'student-paper',
    'normal',
    'high'
  );
}

add_action('add_meta_boxes', 'iprf_add_student_paper_meta_box');

/**
 * Render the meta box content for Student Paper.
 */
function iprf_render_student_paper_meta_box($post)
{
  // Add a nonce field so we can check it later.
  wp_nonce_field('iprf_save_student_paper_meta_box_data', 'iprf_student_paper_nonce');

  // Get existing meta values
  $student_name = get_post_meta($post->ID, 'wpcf-student-name', true);
  $institution = get_post_meta($post->ID, 'wpcf-institution', true);
  $degree = get_post_meta($post->ID, 'wpcf-degree', true);
  $year = get_post_meta($post->ID, 'wpcf-year', true);
  $pdf_url = get_post_meta($post->ID, 'wpcf-pdf', true);
  ?>
  <table class="form-table">
    <tbody>
    <tr>
      <th><label for="iprf_student_name"><?php _e('שם הסטודנט', 'reactwp-main'); ?></label></th>
      <td>
        <input type="text" id="iprf_student_name" name="iprf_student_name"
               value="<?php echo esc_attr($student_name); ?>" class="regular-text" />
      </td>
    </tr>
    <tr>
      <th><label for="iprf_institution"><?php _e('מוסד לימודים', 'reactwp-main'); ?></label></th>
      <td>
        <input type="text" id="iprf_institution" name="iprf_institution" value="<?php echo esc_attr($institution); ?>"
               class="regular-text" />
      </td>
    </tr>
    <tr>
      <th><label for="iprf_degree"><?php _e('תואר', 'reactwp-main'); ?></label></th>
      <td>
        <input type="text" id="iprf_degree" name="iprf_degree" value="<?php echo esc_attr($degree); ?>"
               class="regular-text" />
      </td>
    </tr>
    <tr>
      <th><label for="iprf_year"><?php _e('שנה', 'reactwp-main'); ?></label></th>
      <td>
        <input type="text" id="iprf_year" name="iprf_year" value="<?php echo esc_attr($year); ?>"
               class="regular-text" />
      </td>
    </tr>
    <tr>
      <th><label for="iprf_pdf_url"><?php _e('קישור לקובץ PDF', 'reactwp-main'); ?></label></th>
      <td>
        <input type="url" id="iprf_pdf_url" name="iprf_pdf_url" value="<?php echo esc_url($pdf_url); ?>"
               class="regular-text" />
        <p class="description"><?php _e('הכנס קישור ישיר לקובץ ה-PDF.', 'reactwp-main'); ?></p>
      </td>
    </tr>
    </tbody>
  </table>
  <?php
}
