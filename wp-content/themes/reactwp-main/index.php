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
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;700;900&family=Assistant:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Assistant', sans-serif;
        }
        h1, h2, h3, h4, h5, h6 {
            font-family: 'Heebo', sans-serif;
        }

        /* Animation for Marquee */
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(50%); }
        }

        @keyframes marquee-rtl {
            0% { transform: translateX(0); }
            100% { transform: translateX(50%); }
        }

        .animate-marquee {
            animation: marquee-rtl 40s linear infinite;
        }

        .animate-marquee:hover {
            animation-play-state: paused;
        }

        /* Custom animations */
        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
        }

        @keyframes slide-up {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
            animation: slide-up 0.5s ease-out forwards;
        }

        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
        }
        .animate-float {
            animation: float 6s ease-in-out infinite;
        }

        @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
            animation: blob 7s infinite;
        }
        .animation-delay-2000 {
            animation-delay: 2s;
        }
    </style>
    <script type="importmap">
        {
          "imports": {
            "lucide-react": "https://aistudiocdn.com/lucide-react@^0.555.0",
            "react/": "https://aistudiocdn.com/react@^19.2.0/",
            "react": "https://aistudiocdn.com/react@^19.2.0",
            "@google/genai": "https://aistudiocdn.com/@google/genai@^1.30.0",
            "react-dom/": "https://aistudiocdn.com/react-dom@^19.2.0/",
            "lucide-react/": "https://aistudiocdn.com/lucide-react@^0.555.0/",
            "react-router-dom": "https://aistudiocdn.com/react-router-dom@^6.22.3",
            "react-router": "https://aistudiocdn.com/react-router@^6.22.3",
            "@tanstack/react-query": "https://aistudiocdn.com/@tanstack/react-query@^5.28.4"
          }
        }
    </script>

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
