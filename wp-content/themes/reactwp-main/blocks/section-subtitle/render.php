<?php
/**
 * Section Subtitle Block Template.
 */

$text = $attributes['text'] ?? 'כותרת משנה';

?>
<h2 class="text-3xl font-bold text-slate-900 mb-6">
    <?php echo esc_html($text); ?>
</h2>
