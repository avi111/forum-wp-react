<?php
global $post;
if (!$post || !$post->ID) {
    global $wp_query;

    $args = [
        "post_type" => "scholar",
        "posts_per_page" => 1,
        "orderby" => "rand",
    ];

    $query = new WP_Query($args);

    $post = $query->posts[0];
}

function get_scholar($id)
{
    $post = get_post($id);

    $post->degree = get_post_meta($post->ID, "wpcf-academic_status", false);
    $post->university = explode(',',get_post_meta($post->ID, "wpcf-university", true));
    $post->papers = toolset_get_related_posts($post->ID, "paper-scholar", [
        "query_by_role" => "child",
        "return" => "post_object",
        "limit" => -1,
    ]);
    $post->events = toolset_get_related_posts($post->ID, "event-scholar", [
        "query_by_role" => "child",
        "return" => "post_object",
        "limit" => -1,
    ]);
    $post->phone = get_post_meta($post->ID, "wpcf-phone", true);
    $post->email = get_post_meta($post->ID, "wpcf-email", true);
    $post->affiliation = get_post_meta($post->ID, "wpcf-affiliation", true);
    $post->research_summary = get_post_meta($post->ID, "wpcf-research_summary", true);
    $post->disciplines = explode(',',get_post_meta($post->ID, "wpcf-discipline", true));
    $post->thumbnail = get_the_post_thumbnail($post->ID);

    if (!$post->thumbnail) {
        $post->thumbnail =
            '<img src="' .
            get_stylesheet_directory_uri() .
            "/images/default_thumbnail.png" .
            '" alt="משתמש ללא תמונה" />';
    }

    return $post;
}

function scholar_init()
{
    global $post;
    wp_register_script(
        basename(__DIR__) . "-block",
        get_stylesheet_directory_uri() .
            "/blocks/" .
            basename(__DIR__) .
            "/block.build.js", // Adjust the path if you're using a plugin
        ["wp-blocks", "wp-element", "wp-editor", "wp-components", "wp-i18n"],
        filemtime(
            get_stylesheet_directory() .
                "/blocks/" .
                basename(__DIR__) .
                "/block.build.js"
        )
    );

    wp_localize_script(basename(__DIR__) . "-block", basename(__DIR__), [
        "scholar" => get_scholar($post->ID),
    ]);

    wp_register_style(
        basename(__DIR__) . "-editor",
        get_stylesheet_directory_uri() .
            "/blocks/" .
            basename(__DIR__) .
            "/style-editor.css", // Adjust the path if you're using a plugin
        ["wp-edit-blocks"],
        filemtime(
            get_stylesheet_directory() .
                "/blocks/" .
                basename(__DIR__) .
                "/style-editor.css"
        )
    );

    wp_register_style(
        basename(__DIR__),
        get_stylesheet_directory_uri() .
            "/blocks/" .
            basename(__DIR__) .
            "/style.css", // Adjust the path if you're using a plugin
        [],
        filemtime(
            get_stylesheet_directory() .
                "/blocks/" .
                basename(__DIR__) .
                "/style.css"
        )
    );

    register_block_type("custom/" . str_replace("_", "-", basename(__DIR__)), [
        "editor_script" => basename(__DIR__) . "-block",
        "editor_style" => basename(__DIR__) . "-editor",
        "style" => basename(__DIR__),
        "render_callback" => "render_" . basename(__DIR__),
        "attributes" => [
            "scholarId" => [
                "columns" => [
                    "type" => "integer",
                    "default" => 3,
                ],
                "title" => [
                    "type" => "string",
                    "default" => "",
                ],
                "subTitle" => [
                    "type" => "string",
                    "default" => "",
                ],
            ],
        ],
    ]);
}

add_action("init", basename(__DIR__) . "_init");

function render_scholar()
{
    global $post;
    $scholar = get_scholar($post->ID);
    ob_start();
    ?>
         <div>
            <?php $scholars_link = get_permalink($scholar->ID); ?>
                <div class="scholar-component">
                <div>
                    <a href="<?php echo $scholars_link; ?>">
                        <?php echo $scholar->thumbnail; ?>
                    </a>
                    </div>
                    <div>
                <?php
                 if(!empty($scholar->degree) && is_array($scholar->degree) && $scholar->degree[0]) {
                         $degree = implode(",", $scholar->degree);
                           if ($degree==="אחר") {
                                            $degree="";
                                        }
                    } else {
                        $degree = "";
                    }


                ?>
                    <h1 class="scholars-title">
                                    <a href="<?php echo esc_url(
                                        $scholars_link
                                    ); ?>"><span class="scholars-degree"><?php echo $scholar->post_title; ?></span><?php
if ($degree) {
    echo ", ";
}
echo esc_html($degree);
?></a>
                                </h1>
                                <div class="scholars-contact">
                                פרטי קשר:
                                    <div class="scholars-phone">
                                    טלפון:
                                    <a href="tel:<?php echo esc_html($scholar->phone); ?>"><?php echo esc_html($scholar->phone); ?></a>
                                    </div>
                                    <div class="scholars-email">
                                    דוא"ל:
                                    <a href="mailto:<?php echo esc_html($scholar->email); ?>"><?php echo esc_html($scholar->email); ?></a>
                                    </div>
                                </div>

                                </div>
                </div>
                <div class="scholars-university">
                                                אוניברסיטה:
                                                <?php
                                                if(!empty($scholar->university) && is_array($scholar->university) && $scholar->university[0]) {
                                                    foreach (
                                                        $scholar->university
                                                        as $key=>$university
                                                    ) {
                                                        $args = [
                                                            "post_type" =>
                                                                "university", // Specify the custom post type
                                                            "title" => $university, // Search by title
                                                            "post_status" =>
                                                                "publish", // Ensure the post is published
                                                            "posts_per_page" => -1, // Limit the result to 1 post
                                                        ];

                                                        // Query the post
                                                        $query = new WP_Query(
                                                            $args
                                                        );

                                                        echo '<a href="' .
                                                            get_permalink(
                                                                $query->post->ID
                                                            ) .
                                                            '">' .
                                                            $query->post
                                                                ->post_title .
                                                            "</a>";

                                                        if ($key !== count($scholar->university) - 1) {
                                                            echo ", ";
                                                        }
                                                    }
                                                }
                                                ?>


                                                </div>
                                                <div class="scholars-disciplines">
                                                דיסציפלינה:
                                                <?php
                                                    if(!is_array($scholar->disciplines)) {
                                                           $scholar->disciplines = [$scholar->disciplines];
                                                        }
                                                        else {
                                                           if(!empty($scholar->disciplines) && is_array($scholar->disciplines) && $scholar->disciplines[0]) {
                                                                                                        $disciplines = $scholar->disciplines;
                                                                                                    } else {
                                                                                                        $disciplines = [""];
                                                                                                    }
                                                    }

                                                foreach (
                                                    $disciplines
                                                    as $key => $discipline
                                                ) {
                                                    $args = [
                                                        "post_type" =>
                                                            "discipline", // Specify the custom post type
                                                        "title" => $discipline, // Search by title
                                                        "post_status" =>
                                                            "publish", // Ensure the post is published
                                                        "posts_per_page" => -1, // Limit the result to 1 post
                                                    ];

                                                    // Query the post
                                                    $query = new WP_Query(
                                                        $args
                                                    );


                                                    if($query->post) {


                                                    echo '<a href="' .
                                                        get_permalink(
                                                            $query->post->ID
                                                        ) .
                                                        '">' .
                                                        $query->post
                                                            ->post_title .
                                                        "</a>";
                                                    } else {
                                                        echo $discipline;
                                                    }

                                                      if (
                                                                                                            $key !==
                                                                                                                count(
                                                                                                                    $scholar->disciplines
                                                                                                                ) -
                                                                                                                    1
                                                                                                        ) {
                                                                                                            echo ", ";
                                                                                                        }
                                                } ?>
                                                </div>
                                                <div class="scholars-affiliation">
                                                שיוך ארגוני:
                                                <?php echo esc_html(
                                                    $scholar->affiliation
                                                ); ?>
                                                </div>
                                                  <div class="research_summary">
                                                                                תקציר המחקר:
                                                                                <?php echo esc_html(
                                                                                    $scholar->research_summary
                                                                                ); ?>
                                                                                </div>
                <div>
                <hr>
                <div class="scholars-additional-info">
                מידע נוסף:
                <?php echo apply_filters(
                    "the_content",
                    $scholar->post_content
                ); ?>
                </div>
                </div>
                <div class="scholars-events">
                                                אירועים:
                                                <?php foreach (
                                                    $scholar->events
                                                    as $key => $event
                                                ) {
                                                    if (
                                                        $key > 0 &&
                                                        $key !==
                                                            count(
                                                                $scholar->events
                                                            ) -
                                                                1
                                                    ) {
                                                        echo ", ";
                                                    }
                                                    echo '<a href="' .
                                                        get_permalink(
                                                            $event->ID
                                                        ) .
                                                        '">' .
                                                        $event->post_title .
                                                        "</a>";
                                                } ?>
                                                </div>
                                                <div class="scholars-papers">
                                                מאמרים:
                                                <?php foreach (
                                                    $scholar->papers
                                                    as $key => $paper
                                                ) {
                                                    if (
                                                        $key > 0 &&
                                                        $key !==
                                                            count(
                                                                $scholar->papers
                                                            ) -
                                                                1
                                                    ) {
                                                        echo ", ";
                                                    }
                                                    echo '<a href="' .
                                                        get_permalink(
                                                            $paper->ID
                                                        ) .
                                                        '">' .
                                                        $paper->post_title .
                                                        "</a>";
                                                } ?>
                                                </div>
    </div>
    <?php
    $associated_user = get_post_meta($scholar->ID, "_associated_user_id", true);
    $user = get_current_user_id();

    if ($associated_user == $user) {

        $args = [
            "post_type" => "page",
            "title" => "עריכת חוקר",
            "post_status" => "publish",
            "posts_per_page" => 1,
        ];

        $query = new WP_Query($args);
        $id = $query->posts[0]->ID;
        $edit_scholar_link = get_permalink($id);
        ?>
        <form method="post" action=<?php echo $edit_scholar_link; ?> class="form-group">
            <input type="hidden" name="scholar_id" value="<?php echo $scholar->ID; ?>" />
            <input type="submit" name="edit_scholar" class="submit-button" value="ערוך" />
        </form>
        <?php
    }

    return ob_get_clean();
}
