<?php
defined( 'ABSPATH' ) || exit;
?><!DOCTYPE html>
<!--[if !(IE 6) | !(IE 7) | !(IE 8)  ]><!-->
<html <?php language_attributes(); ?> class="no-js">
<!--<![endif]-->
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="initial-scale=1, width=device-width" />

	<link rel="profile" href="https://gmpg.org/xfn/11" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />

	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <div id="header-placeholder">
            <header>
                <?php
                $site_title = get_bloginfo( 'name' );
                $site_url = network_site_url( '/' );
                $site_description = get_bloginfo( 'description' );
                ?>
                        <h1><a href="<?php echo $site_url ?>"><?php echo $site_title ?></a></h1>
                        <p><?php echo $site_description ?></p>
       <?php
       $menu = wp_get_nav_menu_object('Main Menu');
       wp_nav_menu( array(
                   'menu' => $menu->term_id,
                   'echo' => true,
               ) )
       ?>
       </header>
     </div>
<?php
do_shortcode('[app]');
wp_footer(); 
?>
</body>
</html>
