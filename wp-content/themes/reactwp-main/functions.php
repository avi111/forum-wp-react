<?php
add_theme_support('menus');
add_theme_support('title-tag');

// Include API endpoints and Toolset setup
require_once get_template_directory() . '/inc/api-endpoints.php';
require_once get_template_directory() . '/inc/toolset-setup.php';

function my_theme_enqueue_scripts()
{
  wp_enqueue_style('default-style', get_stylesheet_uri(), [], '1.0.0', 'all'); //default styles.css
}

add_action('wp_enqueue_scripts', 'my_theme_enqueue_scripts');

// Enqueue styles for the Block Editor (Gutenberg)
function my_theme_enqueue_editor_scripts() {
    // Load Tailwind CSS from CDN for the editor
    wp_enqueue_script(
        'tailwindcss-cdn',
        'https://cdn.tailwindcss.com',
        [],
        '3.4.1',
        false
    );
    
    // Optional: Configure Tailwind to work correctly in the editor if needed
    // wp_add_inline_script('tailwindcss-cdn', "tailwind.config = { ... }");
}
add_action('enqueue_block_editor_assets', 'my_theme_enqueue_editor_scripts');

// Register Custom Blocks
add_action('init', 'iprf_register_blocks');
function iprf_register_blocks() {
    register_block_type( get_template_directory() . '/blocks/home-feature' );
    register_block_type( get_template_directory() . '/blocks/features-container' );
}

function get_data_map()
{
  $site_options = array(
    'site_name' => get_option('blogname'),
    'site_description' => get_option('blogdescription'),
    'site_url' => get_option('siteurl'),
    'home_url' => get_option('home'),
    'admin_email' => get_option('admin_email'),
    'charset' => get_option('blog_charset'),
    'timezone' => get_option('timezone_string'),
    'date_format' => get_option('date_format'),
    'time_format' => get_option('time_format'),
    'start_of_week' => get_option('start_of_week'),
    'language' => get_option('WPLANG'),
  );

  if (!$site_options['language']) {
    $site_options['language'] = '';
  }
  // Add the admin AJAX URL
  $site_options['admin_ajax_url'] = admin_url('admin-ajax.php');
  $site_options['admin_url'] = admin_url(); // Added admin_url for dashboard link


  $map = array(
    'site' => $site_options,
  );

  return $map;
}

function displayReactApp()
{
  $current_user = (array)wp_get_current_user()->roles;
  ?>
  <div id="root"></div>
  <?php
}

// register shortcode
add_shortcode('app', 'displayReactApp');

add_action('wp_enqueue_scripts', 'enq_react');

function enq_react()
{
  wp_register_script(
    'app',
    get_stylesheet_directory_uri() . '/dist/index.js',
    ['wp-element'],
    null,
    true
  );

  $data = get_data_map();

  wp_localize_script('app', 'object', $data); //localize script to pass PHP data to JS
  wp_enqueue_script('app');
  wp_enqueue_style('my-style', get_stylesheet_directory_uri() . '/dist/index.css', false, '1.0', 'all');
}
