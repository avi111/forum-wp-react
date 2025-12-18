<?php
/**
 * Decorative Box Block Template.
 */

$is_absolute = $attributes['isAbsolute'] ?? true;
$classes = 'bg-teal-500 rounded-2xl transform rotate-3 opacity-10';

if ($is_absolute) {
    $classes .= ' absolute inset-0';
} else {
    $classes .= ' h-full w-full'; // Example for non-absolute
}

?>
<div class="<?php echo esc_attr($classes); ?>"></div>
