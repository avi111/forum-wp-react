<?php
/**
 * Core Pillar Item Block Template.
 */

$title = $attributes['title'] ?? 'כותרת';
$description = $attributes['description'] ?? 'תיאור.';
$icon_svg = $attributes['iconSvg'] ?? '';
$color = $attributes['color'] ?? 'indigo';

$bg_color_class = "bg-{$color}-100";
$text_color_class = "text-{$color}-600";

?>
<div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div class="w-12 h-12 <?php echo esc_attr($bg_color_class); ?> rounded-lg flex items-center justify-center <?php echo esc_attr($text_color_class); ?> mb-4">
        <?php echo $icon_svg; ?>
    </div>
    <h3 class="text-xl font-bold text-slate-900 mb-3"><?php echo esc_html($title); ?></h3>
    <p class="text-slate-600 text-sm"><?php echo esc_html($description); ?></p>
</div>
