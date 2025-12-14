<?php
/**
 * Home Feature Block Template.
 *
 * @param   array $attributes - The block attributes.
 * @param   string $content - The block inner content (empty).
 * @param   WP_Block $block - The block instance.
 *
 * @package IPRF
 */

$title = $attributes['title'] ?? 'כותרת';
$description = $attributes['description'] ?? 'תיאור קצר.';
$icon_svg = $attributes['iconSvg'] ?? '';
$icon_color = $attributes['iconColor'] ?? 'teal';

$bg_color_class = "bg-{$icon_color}-100";
$text_color_class = "text-{$icon_color}-600";

?>
<div class="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-shadow group">
    <div class="w-16 h-16 <?php echo esc_attr($bg_color_class); ?> rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
        <div class="<?php echo esc_attr($text_color_class); ?> w-8 h-8">
            <?php echo $icon_svg; // SVGs are safe if they are controlled, otherwise use wp_kses_post() ?>
        </div>
    </div>
    <h3 class="text-2xl font-bold mb-3 text-slate-900"><?php echo esc_html($title); ?></h3>
    <p class="text-slate-600 leading-relaxed"><?php echo esc_html($description); ?></p>
</div>
