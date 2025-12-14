(function (blocks, element, blockEditor) {
  var el = element.createElement;
  var InnerBlocks = blockEditor.InnerBlocks;

  blocks.registerBlockType('iprf/features-container', {
    edit: function () {
      // Define which blocks are allowed inside this container.
      // This improves the user experience in the editor.
      var allowedBlocks = ['iprf/home-feature'];

      return el(
        'div',
        {
          className:
            'py-12 bg-white relative border-t border-slate-200',
        },
        el(
          'div',
          {
            className:
              'max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative',
          },
          el(InnerBlocks, {
            allowedBlocks: allowedBlocks,
          })
        )
      );
    },
    save: function () {
      // The content is saved from InnerBlocks, so we return null.
      // Rendering is handled by render.php.
      return el(InnerBlocks.Content, {});
    },
  });
})(window.wp.blocks, window.wp.element, window.wp.blockEditor);
