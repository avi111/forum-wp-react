<?php
$text = $attributes['text'] ?? 'הפורום הרשמי למחקר אקדמי בישראל';
?>
<div class="inline-flex items-center px-4 py-2 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-300 text-sm font-medium backdrop-blur-sm">
    <span class="w-2 h-2 rounded-full bg-teal-400 ml-2 animate-pulse"></span>
    <?php echo wp_kses_post( $text ); ?>
</div>
