<?php
/**
 * Grid Container Block Template.
 */

$columns = $attributes['columns'] ?? 2;
$breakpoint = $attributes['breakpoint'] ?? 'md';
$gap = $attributes['gap'] ?? 12;

$grid_class = "grid {$breakpoint}:grid-cols-{$columns} gap-{$gap} items-center";

?>
<section class="<?php echo esc_attr($grid_class); ?>">
    <?php echo $content; ?>
</section>
