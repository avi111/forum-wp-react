(function (blocks, element, blockEditor) {
  var el = element.createElement;
  var InnerBlocks = blockEditor.InnerBlocks;

  blocks.registerBlockType('iprf/main-content-container', {
    edit: function () {
      return el(
        'div',
        { className: 'max-w-7xl mx-auto px-4 py-16 space-y-20' },
        el(InnerBlocks, {})
      );
    },
    save: function () {
      return el(InnerBlocks.Content, {});
    },
  });
})(window.wp.blocks, window.wp.element, window.wp.blockEditor);
