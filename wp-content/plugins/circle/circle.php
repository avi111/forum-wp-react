<?php
/**
 * Plugin Name: My Basic Plugin
 * Plugin URI:  https://example.com
 * Description: תוסף בסיסי לדוגמה – מוסיף קיצור דרך שמציג הודעה פשוטה.
 * Version:     1.0.0
 * Author:      Maya
 * Author URI:  https://example.com
 * License:     GPL2
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // יציאה אם נקרא ישירות
}

/**
 * פונקציה שמחזירה טקסט פשוט להצגה בתוכן.
 */
function mbp_users_slider() {
    $message = 'זהו פלאגין בסיסי שעובד! ✨';
    return '<div class="my-basic-plugin-message" style="padding:10px;border:1px solid #ddd;background:#f9f9f9;">'
        . esc_html( $message ) .
        '</div>';
}

function mbp_register_shortcode() {
    add_shortcode( 'users_slider', 'mbp_users_slider' );
}
add_action( 'init', 'mbp_register_shortcode' );

function es_editor_slider_shortcode() {

    // שאיבת כל המשתמשים בעלי תפקיד editor
    $contributors = get_users( array(
        'role'   => 'contributor',
        'orderby'=> 'display_name',
        'order'  => 'ASC'
    ));

    if ( empty( $contributors ) ) {
        return '<p>לא נמצאו משתמשים מסוג contributor.</p>';
    }

    ob_start();
?>

<div class="es-inf-container" data-rtl="<?php echo $is_rtl; ?>">
    <div class="es-inf-track">

        <?php foreach ($contributors as $user):
            $avatar = get_avatar_url($user->ID, ['size' => 300]);
            $first  = get_user_meta($user->ID, 'first_name', true);
            $last   = get_user_meta($user->ID, 'last_name', true);
            $link   = get_author_posts_url($user->ID);
        ?>
            <div class="es-inf-slide">
                <a href="<?php echo esc_url($link); ?>">
                    <img src="<?php echo esc_url($avatar); ?>" class="es-inf-avatar" />
                    <div class="es-inf-name"><?php echo esc_html("$first $last"); ?></div>
                </a>
            </div>
        <?php endforeach; ?>

    </div>

    <button class="es-inf-arrow es-inf-left">&lsaquo;</button>
    <button class="es-inf-arrow es-inf-right">&rsaquo;</button>
</div>


<style>
.es-inf-container {
    position: relative;
    width: 100%;
    max-width: 900px;
    margin: 40px auto;
    overflow: hidden;
    direction: ltr; /* כדי שהאנימציה לא תשתגע */
}

.es-inf-track {
    display: flex;
    transition: transform 0.45s ease;
    will-change: transform;
}

/* 4 בשורה = כל סלייד 25% */
.es-inf-slide {
    width: 25%;
    min-width: 25%;
    box-sizing: border-box;
    text-align: center;
    padding: 10px;
}

.es-inf-avatar {
    width: 120px;
    height: 120px;
    border-radius: 100%;
    object-fit: cover;
    border: 3px solid #ddd;
}

.es-inf-name {
    margin-top: 8px;
    font-size: 18px;
    font-weight: bold;
}

.es-inf-arrow {
    position: absolute;
    top: 45%;
    transform: translateY(-50%);
    background: #fff;
    border: 1px solid #ccc;
    padding: 6px 10px;
    cursor: pointer;
    font-size: 28px;
    border-radius: 6px;
}

.es-inf-left { left: 0; }
.es-inf-right { right: 0; }

.es-inf-arrow:hover { background: #eee; }
</style>


<script>
document.addEventListener("DOMContentLoaded", function () {

    const container = document.querySelector(".es-inf-container");
    const isRTL = container.dataset.rtl === "true";

    const track = container.querySelector(".es-inf-track");
    let slides = Array.from(container.querySelectorAll(".es-inf-slide"));

    const left = container.querySelector(".es-inf-left");
    const right = container.querySelector(".es-inf-right");

    const SLIDES_TO_SHOW = 4;
    let slideWidth = container.clientWidth / SLIDES_TO_SHOW;

    /** ---- Infinite clones ---- **/
    slides.forEach(slide => track.appendChild(slide.cloneNode(true)));
    slides.forEach(slide => track.insertBefore(slide.cloneNode(true), track.firstChild));

    slides = Array.from(track.children);
    let index = slides.length / 3;
    let allow = true;

    function updatePosition(animate = true) {
        if (!animate) track.style.transition = "none";
        else track.style.transition = "transform 0.45s ease";

        track.style.transform = "translateX(" + (-slideWidth * index) + "px)";
    }

    updatePosition(false);

    /** ---- Infinite reposition logic ---- **/
    function normalizePosition() {
        const total = slides.length;
        const loopStart = total / 3;
        const loopEnd = loopStart * 2;

        if (index < loopStart) {
            index += loopStart;
            updatePosition(false);
        }
        if (index >= loopEnd) {
            index -= loopStart;
            updatePosition(false);
        }
    }

    /** ---- Next / Prev ---- **/
    function moveNext() {
        if (!allow) return;
        allow = false;

        index = isRTL ? index - 1 : index + 1;
        updatePosition(true);

        setTimeout(() => {
            normalizePosition();
            allow = true;
        }, 470);
    }

    function movePrev() {
        if (!allow) return;
        allow = false;

        index = isRTL ? index + 1 : index - 1;
        updatePosition(true);

        setTimeout(() => {
            normalizePosition();
            allow = true;
        }, 470);
    }

    right.addEventListener("click", moveNext);
    left.addEventListener("click", movePrev);

    /** ---- DRAG & TOUCH SUPPORT ---- **/
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    function startDrag(clientX) {
        isDragging = true;
        startX = clientX;
        prevTranslate = -slideWidth * index;
        track.style.transition = "none";
    }

    function doDrag(clientX) {
        if (!isDragging) return;
        const diff = clientX - startX;
        track.style.transform = `translateX(${prevTranslate + diff}px)`;
    }

    function endDrag(clientX) {
        if (!isDragging) return;
        isDragging = false;

        const diff = clientX - startX;

        if (Math.abs(diff) > slideWidth * 0.2) {
            if (diff < 0) moveNext();
            else movePrev();
        } else {
            updatePosition(true);
        }
    }

    /** Mouse events **/
    track.addEventListener("mousedown", e => startDrag(e.clientX));
    window.addEventListener("mousemove", e => doDrag(e.clientX));
    window.addEventListener("mouseup", e => endDrag(e.clientX));

    /** Touch events **/
    track.addEventListener("touchstart", e => startDrag(e.touches[0].clientX));
    track.addEventListener("touchmove", e => doDrag(e.touches[0].clientX));
    track.addEventListener("touchend", e => endDrag(e.changedTouches[0].clientX));

    /** Resize recalculation **/
    window.addEventListener("resize", () => {
        slideWidth = container.clientWidth / SLIDES_TO_SHOW;
        updatePosition(false);
    });
});
</script>
<?php
    return ob_get_clean();
}
add_shortcode( 'contributor_slider', 'es_editor_slider_shortcode' );
