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

add_action('wp_enqueue_scripts', function() {

  // קבלת נתיב התיקייה של ערכת הנושא
  $theme_uri = get_stylesheet_directory_uri();

  // 1. טעינת הסטייל עבור טאבים של ה-Editor (Visual/Text)
  // אנחנו מוסיפים את 'editor-buttons' כתלות (Dependency) כדי לוודא סדר טעינה נכון
  wp_enqueue_style(
    'tailwind-wp-editor',
    $theme_uri . '/wp-editor-tailwind.css',
    array('editor-buttons', 'dashicons'),
    '1.0.0'
  );

  // 2. טעינת הסטייל עבור שדות Toolset (Repetitive fields, buttons)
  wp_enqueue_style(
    'tailwind-toolset-forms',
    $theme_uri . '/toolset-tailwind-custom.css',
    array(),
    '1.0.0'
  );

}, 20);

remove_action( 'login_init', 'send_frame_options_header', 10 );
remove_action( 'admin_init', 'send_frame_options_header', 10 );

// הוספת Header שמאפשר הצגה (בדפדפנים מודרניים משתמשים ב-CSP)
add_action( 'send_headers', function() {
  header_remove('X-Frame-Options');

  header("Content-Security-Policy: frame-ancestors 'self' https://psyforum.co.il");
}, 10 );

define('ZEROBOUNCE_API_KEY', '77acd04b7abb4d66929b669635ebdd5d');
define('ZERUH','2dbb19d80ce73fd5bf443736f81e93527860c0e8c3c97c3c0abc50fb570a4f11')
define('ADMIN_EMAIL', 'psyresforum@gmail.com');
define('SECRET', '23uhg26g4#4fqfqw44h');

add_filter('cred_form_validate', 'validate_user_with_ai', 10, 2);
function validate_user_with_ai($error_fields, $form_data) {

  echo '<pre>';
  print_r($_POST);
  echo '</pre>';
  die();
  $field_id = 6287; // ה-ID של הטופס שלך
  if ($form_data['id'] == $field_id) {
    if($_POST['pot']!=="") {
      $error_fields['pot'] = 'מלכודת.';
    }

    if(!$_POST['אישור']) {
      $error_fields['אישור'] = 'זהו שדה חובה.';
    }



    $email_to_validate = $_POST['user_email'];

    $url = "https://api.zeruh.com/v1/verify?api_key=" . ZERUH . "&email_address=" . urlencode($email_to_validate);

    $response = wp_remote_get($url, array('timeout' => 15));

    if (is_wp_error($response)) {
      $error_fields['user_email'] = 'שגיאה.';
    } else {
      $result = json_decode(wp_remote_retrieve_body($response), true);

      $is_valid = (isset($result['status']) && $result['status'] === 'valid');

      if (!$is_valid) {
        $subject = "התראה: ניסיון הרשמה עם אימייל לא אותנטי";
        $status = $result['status'] ?? 'unknown';

        $body = "שלום,\n\nהתקבל ניסיון הרשמה עם כתובת אימייל שנמצאה כלא אותנטית.\n\n" .
          "אימייל: {$email_to_validate}\n" .
          "סטטוס: {$status}\n\n" .
          "מערכת האתר.";

        wp_mail(ADMIN_EMAIL, $subject, $body);

        $error_fields['user_email'] = 'הפרטים נראים לא אותנטיים, אנא נסה שוב.';
      }
    }
  }

  return $error_fields;
}