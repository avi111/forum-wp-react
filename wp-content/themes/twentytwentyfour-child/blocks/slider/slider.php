<?php
function slider_init_block() {
    $args = array(
        'taxonomy'   => 'slider',   // The taxonomy name
        'hide_empty' => false,      // Set to true to hide terms without posts
    );

    $terms = new WP_Term_Query( $args );

    wp_register_script(
        'slider_js',
        get_stylesheet_directory_uri() . '/blocks/slider/block.build.js', // Adjust the path if you're using a plugin
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n'),
        filemtime(get_stylesheet_directory() . '/blocks/slider/block.build.js')
    );

    wp_localize_script( 'slider_js', 'data', array(
        'query' => $terms,
    ) );

    wp_register_style(
        'slider-editor',
        get_stylesheet_directory_uri() . '/blocks/slider/slider-editor.css', // Adjust the path if you're using a plugin
        array('wp-edit-blocks'),
        filemtime(get_stylesheet_directory() . '/blocks/slider/slider-editor.css')
    );

    wp_register_style(
        'slider_js',
        get_stylesheet_directory_uri() . '/blocks/slider/slider.css', // Adjust the path if you're using a plugin
        array(),
        filemtime(get_stylesheet_directory() . '/blocks/slider/slider.css')
    );

    register_block_type('custom/slider', array(
            'editor_script' => 'slider_js',
            'editor_style'  => 'slider-editor',
            'style'         => 'slider_js',
            'render_callback' => 'render_slider_js',
            'attributes'      => array(
                        'term' => array(
                                                        'type' => 'number',
                                                        'default' => 0,
                                                    ),
                    ),
        ));
}

add_action('init', 'slider_init_block');

function render_slider_js($attributes) {
    $id = get_the_ID();
    extract($attributes);

    $args = array(
        'post_type'   => 'slide',
        'tax_query' => array(
            array(
                'taxonomy' => 'slider',
                'field' => 'term_id',
                'terms' => $term,
            ),
        ),
    );

    $query = new WP_Query( $args );

    $posts = $query->posts;

    ob_start();
    ?>
       <div class="CSSgal" style="direction: ltr;">

         <div class="slider">
                    <?php
                    foreach ($posts as $post) {
                    ?>
                                            <div class="slide" id="slide<?php echo $post->ID; ?>" style="direction: rtl;">
                                            <?php
                                                ?>
                                                <div class="slide-content">
                                                    <?php echo apply_filters('the_content', $post->post_content); ?>
                                                </div>
                                                <?php
                                            ?>
                                            </div>
                                        <?php
                    }
                    ?>
         </div>


 <div class="prevNext">
        <a href="#" class="prev">←</a>
        <a href="#" class="next">→</a>
    </div>

  <div class="bullets">
  <?php
    foreach($posts as $key => $post) {
        ?>
        <a href="#s<?php echo $post->ID; ?>"><?php echo $key + 1; ?></a>
        <?php
    }
    ?>
  </div>


</div>
         <script>
         document.addEventListener('DOMContentLoaded', function () {
             let currentIndex = 0;
             const slides = document.querySelectorAll('.slide');
             const totalSlides = slides.length;

             // Function to show a specific slide
             function showSlide(index) {
                 const slider = document.querySelector('.slider');
                 const percentage = -index * 100;
                 slider.style.transform = `translateX(${percentage}%)`;
                 updateBullets(index);
             }

             // Update bullets to show active slide
             function updateBullets(index) {
                 const bullets = document.querySelectorAll('.bullets a');
                 bullets.forEach((bullet, i) => {
                     bullet.style.background = (i === index) ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.5)';
                 });
             }

             // Show the next slide
             document.querySelector('.next').addEventListener('click', function (e) {
                 e.preventDefault();
                 currentIndex = (currentIndex + 1) % totalSlides;
                 showSlide(currentIndex);
             });

             // Show the previous slide
             document.querySelector('.prev').addEventListener('click', function (e) {
                 e.preventDefault();
                 currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                 showSlide(currentIndex);
             });

             // Bullet navigation
             document.querySelectorAll('.bullets a').forEach((bullet, index) => {
                 bullet.addEventListener('click', function (e) {
                     e.preventDefault();
                     currentIndex = index;
                     showSlide(currentIndex);
                 });
             });

             // Initialize first slide
             showSlide(currentIndex);
         });
            </script>
       <style>
       .CSSgal {
           position: relative;
           overflow: hidden;
           height: 100%; /* Or set a fixed height */
       }

       .slider {
           height: 100%;
           display: flex;
           transition: transform 0.8s ease-in-out;
           width: 100%; /* Ensure slides take the full width */
       }

       /* Individual slide */
       .slide {
           min-width: 100%;
           height: 100%;
           background: none 50% no-repeat;
           background-size: cover;
       }

       /* Navigation buttons */
       .prevNext a {
           position: absolute;
           top: 50%;
           width: 60px;
           height: 60px;
           line-height: 60px;
           text-align: center;
           opacity: 0.7;
           background-color: #fff;
           cursor: pointer;
           transform: translateY(-50%);
       }

       .prevNext .prev {
           left: 10px;
       }

       .prevNext .next {
           right: 10px;
       }

       .prevNext a:hover {
           opacity: 1;
       }

       /* Bullet navigation */
       .bullets {
           position: absolute;
           z-index: 2;
           bottom: 0;
           width: 100%;
           text-align: center;
           padding: 10px 0;
       }

       .bullets a {
           display: inline-block;
           width: 30px;
           height: 30px;
           line-height: 30px;
           text-align: center;
           background: rgba(255, 255, 255, 0.5);
           margin: 0 5px;
           cursor: pointer;
       }

       .bullets a:hover {
           background: rgba(255, 255, 255, 0.7);
       }


       </style>
    <?php
     return ob_get_clean();
}

