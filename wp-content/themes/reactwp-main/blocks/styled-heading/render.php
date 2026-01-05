<?php
$items = $attributes['items'] ?? [];
?>
<h1 class="text-5xl font-bold text-white leading-tight">
    <?php foreach ($items as $item): ?>
        <?php if (isset($item['type']) && $item['type'] === 'break'): ?>
            <br />
        <?php else: ?>
            <?php 
                $text = $item['text'] ?? '';
                $className = $item['className'] ?? '';
            ?>
            <?php if ($className): ?>
                <span class="<?php echo esc_attr($className); ?>"><?php echo esc_html($text); ?></span>
            <?php else: ?>
                <?php echo esc_html($text); ?>
            <?php endif; ?>
            <?php echo ' '; // Add space between words ?>
        <?php endif; ?>
    <?php endforeach; ?>
</h1>
