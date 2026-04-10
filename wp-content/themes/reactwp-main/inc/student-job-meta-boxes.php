<?php

if (!defined('ABSPATH')) {
  exit; // Exit if accessed directly
}

/**
 * Adds the meta box to the student-job post type.
 */
function iprf_add_student_job_meta_boxes()
{
  add_meta_box(
    'iprf_student_job_details',
    __('פרטי משרת סטודנט', 'iprf-theme'),
    'iprf_render_student_job_meta_box',
    'student-job',
    'normal',
    'high'
  );
}

add_action('add_meta_boxes', 'iprf_add_student_job_meta_boxes');

/**
 * Renders the content of the meta box.
 *
 * @param WP_Post $post The post object.
 */
function iprf_render_student_job_meta_box($post)
{
  // Add a nonce field so we can check it later.
  wp_nonce_field('iprf_save_student_job_meta_box_data', 'iprf_student_job_meta_box_nonce');
  // Get existing meta values using the 'wpcf-' prefix as used by Toolset
  $company_name = get_post_meta($post->ID, 'wpcf-company-name', true);
  $job_type = get_post_meta($post->ID, 'wpcf-job-type', true);
  $location = get_post_meta($post->ID, 'wpcf-location', true);
  $apply_link = get_post_meta($post->ID, 'wpcf-apply-link', true);
  ?>
  <table class="form-table">
    <tbody>
    <tr>
      <th><label for="iprf_company_name"><?php _e('שם חברה', 'iprf-theme'); ?></label></th>
      <td>
        <input type="text" id="iprf_company_name" name="iprf_company_name"
               value="<?php echo esc_attr($company_name); ?>" class="large-text" />
      </td>
    </tr>
    <tr>
      <th><label for="iprf_job_type"><?php _e('סוג משרה', 'iprf-theme'); ?></label></th>
      <td>
        <input type="text" id="iprf_job_type" name="iprf_job_type" value="<?php echo esc_attr($job_type); ?>"
               class="large-text" />
      </td>
    </tr>
    <tr>
      <th><label for="iprf_location"><?php _e('מיקום', 'iprf-theme'); ?></label></th>
      <td>
        <input type="text" id="iprf_location" name="iprf_location" value="<?php echo esc_attr($location); ?>"
               class="large-text" />
      </td>
    </tr>
    <tr>
      <th><label for="iprf_apply_link"><?php _e('לינק להגשה', 'iprf-theme'); ?></label></th>
      <td>
        <input type="url" id="iprf_apply_link" name="iprf_apply_link" value="<?php echo esc_url($apply_link); ?>"
               class="large-text" />
      </td>
    </tr>
    </tbody>
  </table>
  <?php
}

/**
 * Saves the meta box data when the post is saved.
 *
 * @param int $post_id The ID of the post being saved.
 */
function iprf_save_student_job_meta_box_data($post_id)
{
  // Check if our nonce is set.
  if (!isset($_POST['iprf_student_job_meta_box_nonce'])) {
    return;
  }

  // Verify that the nonce is valid.
  if (!wp_verify_nonce($_POST['iprf_student_job_meta_box_nonce'], 'iprf_save_student_job_meta_box_data')) {
    return;
  }

  // If this is an autosave, our form has not been submitted, so we don't want to do anything.
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
    return;
  }

  // Check the user's permissions.
  if (isset($_POST['post_type']) && 'student-job' == $_POST['post_type']) {
    if (!current_user_can('edit_post', $post_id)) {
      return;
    }
  } else {
    return;
  }

  // Sanitize and save the data using the 'wpcf-' prefix
  if (isset($_POST['iprf_company_name'])) {
    update_post_meta($post_id, 'wpcf-company-name', sanitize_text_field($_POST['iprf_company_name']));
  }
  if (isset($_POST['iprf_job_type'])) {
    update_post_meta($post_id, 'wpcf-job-type', sanitize_text_field($_POST['iprf_job_type']));
  }
  if (isset($_POST['iprf_location'])) {
    update_post_meta($post_id, 'wpcf-location', sanitize_text_field($_POST['iprf_location']));
  }
  if (isset($_POST['iprf_apply_link'])) {
    update_post_meta($post_id, 'wpcf-apply-link', esc_url_raw($_POST['iprf_apply_link']));
  }
}

add_action('save_post', 'iprf_save_student_job_meta_box_data');
