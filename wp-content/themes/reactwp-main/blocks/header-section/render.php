<?php
/**
 * Header Section Block Template.
 */

$title = $attributes['title'] ?? 'כותרת העמוד';
$subtitle = $attributes['subtitle'] ?? 'תיאור קצר.';

?>
<div class="bg-slate-900 text-white relative py-20 overflow-hidden">
    <div class="absolute inset-0 bg-pattern opacity-10"></div>
    <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/90 to-teal-900/40"></div>
    
    <div class="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <h1 class="text-4xl md:text-5xl font-bold font-heebo mb-6">
            <?php echo esc_html($title); ?>
        </h1>
        <p class="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            <?php echo esc_html($subtitle); ?>
        </p>
    </div>
</div>
