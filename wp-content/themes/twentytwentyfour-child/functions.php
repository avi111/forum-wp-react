<?php
// Enqueue the parent and child theme styles
function twentytwentyfour_child_enqueue_styles() {
    wp_enqueue_style('twentytwentyfour-parent-style', get_stylesheet_directory_uri() . '/style.css', array(), filemtime(get_stylesheet_directory() . '/style.css'));
    wp_enqueue_style('twentytwentyfour-child-style', get_stylesheet_uri(), array('twentytwentyfour-parent-style'));
}
add_action('wp_enqueue_scripts', 'twentytwentyfour_child_enqueue_styles');

require_once('includes/blocks.php');
require_once('includes/associate_user.php');
require_once('includes/subscribe.php');
require_once('includes/subscriptions_table.php');
require_once('includes/edit_scholar.php');
require_once('includes/add_papers.php');
require_once('includes/import_csv.php');

function mytheme_custom_logo_setup() {
    add_theme_support('custom-logo');
    add_theme_support('site-icon');
}
add_action('after_setup_theme', 'mytheme_custom_logo_setup');

function mytheme_customize_register( $wp_customize ) {

}
add_action('customize_register', 'mytheme_customize_register');

function my_theme_setup() {
    // Register theme support for menus
    register_nav_menus( array(
        'primary_menu' => __( 'Primary Menu', 'textdomain' ),
        'footer_menu'  => __( 'Footer Menu', 'textdomain' ),
    ));
}
add_action( 'after_setup_theme', 'my_theme_setup' );

// שורטקוד לשם האתר
function site_name_shortcode() {
    ob_start();
    ?>
    <p><strong><?php echo get_bloginfo('name'); ?></strong></p>
    <?php
    return ob_get_clean();
}
add_shortcode('site_name', 'site_name_shortcode');

// שורטקוד לטאגליין של האתר
function site_tagline_shortcode() {
  ob_start();
    ?>
    <p><strong><?php echo get_bloginfo('description'); ?></strong></p>
    <?php
    return ob_get_clean();
}
add_shortcode('site_tagline', 'site_tagline_shortcode');

function add_dir_rtl_to_language_attributes( $output ) {
    if(!is_admin()) {
        $output .= ' dir="rtl"';
    }
    return $output;
}
add_filter( 'language_attributes', 'add_dir_rtl_to_language_attributes' );

