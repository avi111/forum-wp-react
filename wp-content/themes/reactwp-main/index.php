<?php
defined('ABSPATH') || exit;
?><!DOCTYPE html>
<!--[if !(IE 6) | !(IE 7) | !(IE 8)  ]><!-->
<html <?php language_attributes(); ?> class="no-js">
<!--<![endif]-->
<head>
  <meta charset="<?php bloginfo('charset'); ?>" />
  <meta name="viewport" content="initial-scale=1, width=device-width" />

  <link rel="profile" href="https://gmpg.org/xfn/11" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;700;900&family=Assistant:wght@300;400;600;700&display=swap"
    rel="stylesheet">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php
do_shortcode('[app]');
wp_footer();
?>
<script src="https://cdn.tailwindcss.com"></script>
</body>
</html>
