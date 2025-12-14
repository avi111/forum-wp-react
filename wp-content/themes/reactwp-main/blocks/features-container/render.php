<?php
/**
 * Features Container Block Template.
 *
 * @param   array $attributes - The block attributes.
 * @param   string $content - The block inner content (rendered from InnerBlocks).
 * @param   WP_Block $block - The block instance.
 *
 * @package IPRF
 */

// The 'align' attribute is handled by the wrapper Gutenberg adds.
// We just need to create the inner structure.
?>
<div class="py-24 bg-white relative overflow-hidden border-t border-slate-100">
    <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10">
        <?php echo $content; ?>
    </div>
</div>
