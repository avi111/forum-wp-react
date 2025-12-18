(function (blocks, element, blockEditor) {
  var el = element.createElement;
  var InnerBlocks = blockEditor.InnerBlocks;

  blocks.registerBlockType('iprf/content-paragraph', {
    edit: function () {
      return el(
        'div',
        { className: 'space-y-4 text-slate-600 text-lg' },
        el(InnerBlocks, {
          allowedBlocks: ['core/paragraph'],
        })
      );
    },
    save: function () {
      return el(InnerBlocks.Content, {});
    },
  });
})(window.wp.blocks, window.wp.element, window.wp.blockEditor);
