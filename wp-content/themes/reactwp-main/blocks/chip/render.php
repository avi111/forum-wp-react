<?php
/**
 * Chip Block Template.
 */

$text = $attributes['text'] ?? 'החזון שלנו';
$icon_svg = $attributes['iconSvg'] ?? '';

?>
<div class="inline-flex items-center px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-sm font-bold mb-4">
    <div class="w-4 h-4 ml-2">
        <?php echo $icon_svg; ?>
    </div>
    <?php echo esc_html($text); ?>
</div>
