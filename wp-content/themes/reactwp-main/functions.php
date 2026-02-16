<?php
add_theme_support('menus');
add_theme_support('title-tag');


if (file_exists(__DIR__ . '/vendor/autoload.php')) {
  require_once __DIR__ . '/vendor/autoload.php';
}

use Google\Client;
use Google\Service\Sheets;

// Include API endpoints and Toolset setup
require_once get_template_directory() . '/inc/api-endpoints.php';
require_once get_template_directory() . '/inc/toolset-setup.php';

function my_theme_enqueue_scripts()
{
  wp_enqueue_style('default-style', get_stylesheet_uri(), [], '1.0.0', 'all'); //default styles.css
}

add_action('wp_enqueue_scripts', 'my_theme_enqueue_scripts');

function filter_custom_post_type_by_author( $query ) {
  // בדוק אם אנחנו ב-Admin Area, במסך עריכה של CPT, ושהמשתמש הוא Contributor
  if ( is_admin() && $query->is_main_query() && ( 'research-paper' == $query->get('post_type') ) && current_user_can('contributor') ) {
    // הגדר את השאילתה להציג רק פוסטים של המשתמש הנוכחי
    $query->set( 'author', get_current_user_id() );
  }
}
// חבר את הפונקציה ל-hook של pre_get_posts
add_action( 'pre_get_posts', 'filter_custom_post_type_by_author' );

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
}
add_action('enqueue_block_editor_assets', 'my_theme_enqueue_editor_scripts');

// Register Custom Blocks
add_action('init', 'iprf_register_blocks');
function iprf_register_blocks() {
    register_block_type( get_template_directory() . '/blocks/home-feature' );
    register_block_type( get_template_directory() . '/blocks/features-container' );
    register_block_type( get_template_directory() . '/blocks/core-pillar-item' );
    register_block_type( get_template_directory() . '/blocks/core-pillars' );
    register_block_type( get_template_directory() . '/blocks/header-section' );
    register_block_type( get_template_directory() . '/blocks/main-content-container' );
    register_block_type( get_template_directory() . '/blocks/chip' );
    register_block_type( get_template_directory() . '/blocks/section-subtitle' );
    register_block_type( get_template_directory() . '/blocks/content-paragraph' );
    register_block_type( get_template_directory() . '/blocks/decorative-box' );
    register_block_type( get_template_directory() . '/blocks/grid-container' );
    
    // New Hero Blocks
    register_block_type( get_template_directory() . '/blocks/hero-container' );
    register_block_type( get_template_directory() . '/blocks/hero-subtitle' );
    register_block_type( get_template_directory() . '/blocks/styled-heading' );
    register_block_type( get_template_directory() . '/blocks/hero-badge' );
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
  // Add WordPress URLs
  $site_options['admin_ajax_url'] = admin_url('admin-ajax.php');
  $site_options['admin_url'] = admin_url();
  $site_options['rest_url'] = rest_url();


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

// Add 'Research Papers' column to Users table
function iprf_add_research_papers_column( $columns ) {
    $columns['research_papers'] = 'מאמרי מחקר';
    return $columns;
}
add_filter( 'manage_users_columns', 'iprf_add_research_papers_column' );

function iprf_show_research_papers_column_content( $value, $column_name, $user_id ) {
    if ( 'research_papers' == $column_name ) {
        $count = count_user_posts( $user_id, 'research-paper' );
        return $count;
    }
    return $value;
}
add_action( 'manage_users_custom_column', 'iprf_show_research_papers_column_content', 10, 3 );
