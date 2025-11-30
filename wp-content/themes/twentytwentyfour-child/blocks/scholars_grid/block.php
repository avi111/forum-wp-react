<?php
function get_scholars() {
    $args = array(
        'post_type' => 'scholar',
        'posts_per_page' => -1,
        'meta_query' => array(
                'relation' => 'OR',
                array(
                    'key' => 'wpcf-hide',
                    'value' => '1',
                    'compare' => '!='
                ),
                array(
                    'key' => 'wpcf-hide',
                    'compare' => 'NOT EXISTS'
                )
            )
    );

    $query = new WP_Query($args);

    foreach($query->posts as $post) {
        $post->degree=get_post_meta($post->ID, 'wpcf-academic_status', false);
        $post->university=explode(',',get_post_meta($post->ID, 'wpcf-university', true));
        $post->papers=toolset_get_related_posts($post->ID, 'paper-scholar', ['query_by_role' => 'child', 'return' => 'post_object', 'limit' => -1 ]);
        $post->events=toolset_get_related_posts($post->ID, 'event-scholar', ['query_by_role' => 'child', 'return' => 'post_object', 'limit' => -1 ]);
        $post->disciplines=explode(',',get_post_meta($post->ID, 'wpcf-discipline', true));
        $post->thumbnail=get_the_post_thumbnail($post->ID);

        if(!$post->thumbnail) {
            $post->thumbnail='<img src="'.get_stylesheet_directory_uri().'/images/default_thumbnail.png'.'" alt="משתמש ללא תמונה" />';
        }
    }

    return $query;
}

function enqueue_owl_carousel_assets() {
    if(!is_front_page()) {
        return;
    }
    // Owl Carousel CSS
    wp_enqueue_style('owl-carousel-css', 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css');
    wp_enqueue_style('owl-carousel-theme-css', 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css');

    // Owl Carousel JS
    wp_enqueue_script('owl-carousel-js', 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js', array('jquery'), null, true);

    // Custom JS to initialize Owl Carousel
    wp_enqueue_script('custom-carousel-js', get_template_directory_uri() . '/js/custom-carousel.js', array('owl-carousel-js'), null, true);
}
add_action('wp_enqueue_scripts', 'enqueue_owl_carousel_assets');

function scholars_grid_init() {
    wp_register_script(
        basename(__DIR__).'-block',
        get_stylesheet_directory_uri() . '/blocks/'.basename(__DIR__).'/block.build.js', // Adjust the path if you're using a plugin
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n'),
        filemtime(get_stylesheet_directory() . '/blocks/'.basename(__DIR__).'/block.build.js')
    );

    wp_localize_script(basename(__DIR__).'-block', basename(__DIR__), array(
        'scholars' => get_scholars(),
    ));

    wp_register_style(
        basename(__DIR__).'-editor',
        get_stylesheet_directory_uri() . '/blocks/'.basename(__DIR__).'/style-editor.css', // Adjust the path if you're using a plugin
        array('wp-edit-blocks'),
        filemtime(get_stylesheet_directory() . '/blocks/'.basename(__DIR__).'/style-editor.css')
    );

    wp_register_style(
        basename(__DIR__),
        get_stylesheet_directory_uri() . '/blocks/'.basename(__DIR__).'/style.css', // Adjust the path if you're using a plugin
        array(),
        filemtime(get_stylesheet_directory() . '/blocks/'.basename(__DIR__).'/style.css')
    );

    register_block_type('custom/'.str_replace('_', '-', basename(__DIR__)), array(
        'editor_script' => basename(__DIR__).'-block',
        'editor_style'  => basename(__DIR__).'-editor',
        'style'         => basename(__DIR__),
        'render_callback' => 'render_' . basename(__DIR__),
        'attributes'      => array(
            'scholarId' => array(
                                        'columns' => array(
                                            'type' => 'integer',
                                            'default' => 3,
                                        ),
                                        'title' => array(
                                            'type' => 'string',
                                            'default' => '',
                                        ),
                                        'subTitle' => array(
                                            'type' => 'string',
                                            'default' => '',
                                            ),
                                    ),
        ),
    ));
}

add_action('init', basename(__DIR__).'_init');

function render_scholars_grid($attributes) {
    $query = get_scholars();
    extract($attributes);

    ob_start();
    if ( $query->have_posts() ) : ?>
         <div style="text-align: center">
                     <div class="welcome">
                        <h3><?php echo $title; ?></h3>
                        <p><?php echo $subTitle; ?></p>
                        </div>
            <div<?php
                        if(!is_front_page()) {
                            $cols = isset($columns)?$columns:3;
                            echo ' class="scholars-grid" style="display: grid; grid-template-columns: repeat('.$cols.', 1fr)"';
                        } else {
                            echo ' class="owl-carousel owl-theme scholars-grid"';
                        }
                    ?>>
            <?php foreach($query->posts as $key=>$post) {
                            $scholars_link=get_permalink($post->ID);
             ?>
                <div class="item scholar">
                    <a href="<?php echo $scholars_link; ?>">
                        <?php echo $post->thumbnail; ?>
                    </a>
                <?php
                $degree=implode(",", $post->degree);
                if ($degree==="אחר") {
                    $degree="";
                }
                        ?>
                    <div class="scholars-title">
                                    <a href="<?php echo esc_url($scholars_link); ?>"><span class="scholars-degree"><?php echo $post->post_title; ?></span><?php
                                    if($degree) {
                                        echo ', ';
                                    }
                                    echo esc_html($degree);
                                     ?></a>
                                </div>
                                <div class="scholars-university">
                                <?php

                                if(!empty($post->university) && is_array($post->university) && $post->university[0]) {
                                    foreach($post->university as $key=>$university) {
                                           $args = array(
                                                'post_type' => 'university',  // Specify the custom post type
                                                'title'     => $university,        // Search by title
                                                'post_status' => 'publish',   // Ensure the post is published
                                                'posts_per_page' => -1         // Limit the result to 1 post
                                            );

                                            // Query the post

                                            $query = new WP_Query($args);
                                            echo '<a href="'.get_permalink($query->post->ID).'">'.$query->post->post_title.'</a>';
                                              if($key!==count($post->university)-1) {
                                                                                                                        echo ', ';
                                                                                                                    }
                                    }
                                }
                                ?>
                                </div>
                                <div class="scholars-disciplines">
                                <?php
                                foreach($post->disciplines as $key=>$discipline) {
                                                                       $args = array(
                                                                            'post_type' => 'discipline',  // Specify the custom post type
                                                                            'title'     => $discipline,        // Search by title
                                                                            'post_status' => 'publish',   // Ensure the post is published
                                                                            'posts_per_page' => -1         // Limit the result to 1 post
                                                                        );

                                                                        // Query the post
                                                                        $query = new WP_Query($args);
                                                                    echo '<a href="'.get_permalink($query->post->ID).'">'.$query->post->post_title.'</a>';
                                                                        if($key!==count($post->disciplines)-1) {
                                                                                                                                                echo ', ';
                                                                                                                                            }
                                                                }
                                ?>
                                </div>
                </div>
            <?php } ?>
            </div>
        </div>
    </div>
    <?php if(is_front_page()) : ?>
    <style>
    .owl-carousel .item {
        background: #fff;
        padding: 15px;
        border-radius: 5px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        text-align: center;
    }

    .owl-carousel {
        direction: rtl;
    }

    .owl-nav {
        display: flex;
        justify-content: space-between;
    }

    .owl-nav .owl-prev {
        transform: rotate(180deg); /* Flip the previous button for RTL */
    }

    .owl-nav .owl-next {
        transform: rotate(180deg); /* Flip the next button for RTL */
    }

    </style>
    <script>
    jQuery(document).ready(function($) {
        $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 10,
            nav: false,
            dots: false,
            autoplay: true,
            autoplayTimeout: 3000,
            rtl: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            }
        });
    });
    </script>
    <?php endif; ?>
    <?php else : ?>
        <p><?php esc_html_e( 'No products found.' ); ?></p>
    <?php endif;
     return ob_get_clean();
}

function redirect_from_scholar_page() {
    global $post;
    if(is_singular('scholar') && get_post_meta($post->ID, 'wpcf-hide', true)) {
            if(get_post_meta($post->ID, '_associated_user_id', true) == get_current_user_id()) {
                $args = array(
                    'post_type' => 'page',
                    'title'     => 'עריכת חוקר',
                    'posts_per_page' => 1
                );

                $query = new WP_Query($args);
                $permalink = get_permalink($query->post->ID);
                wp_redirect($permalink);
                exit;
            }

            wp_redirect(home_url());
            exit;
        }

    if(is_singular('scholar') && !get_post_meta($post->ID, '_associated_user_id', true)) {
        wp_redirect(home_url());
        exit;
    }
}

// Hook into the template_redirect action
add_action('template_redirect', 'redirect_from_scholar_page');