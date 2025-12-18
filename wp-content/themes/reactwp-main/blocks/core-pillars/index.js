(function (blocks, element, blockEditor) {
  var el = element.createElement;
  var InnerBlocks = blockEditor.InnerBlocks;

  blocks.registerBlockType('iprf/core-pillars', {
    edit: function () {
      var allowedBlocks = ['iprf/core-pillar-item'];

      return el(
        'div',
        { className: 'bg-slate-50 p-4' },
        el('h2', { className: 'text-center text-2xl font-bold mb-4' }, 'עמודי התווך של הפעילות'),
        el(
          'div',
          {
            className:
              'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4',
          },
          el(InnerBlocks, {
            allowedBlocks: allowedBlocks,
            template: [
                ['iprf/core-pillar-item'],
                ['iprf/core-pillar-item', {color: 'teal'}],
                ['iprf/core-pillar-item', {color: 'purple'}],
                ['iprf/core-pillar-item', {color: 'amber'}],
            ]
          })
        )
      );
    },
    save: function () {
      return el(InnerBlocks.Content, {});
    },
  });
})(window.wp.blocks, window.wp.element, window.wp.blockEditor);
