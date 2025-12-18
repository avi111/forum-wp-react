(function (blocks, element, blockEditor) {
  var el = element.createElement;
  var RichText = blockEditor.RichText;

  blocks.registerBlockType('iprf/header-section', {
    edit: function (props) {
      var attributes = props.attributes;
      var setAttributes = props.setAttributes;

      return el(
        'div',
        {
          className:
            'bg-slate-900 text-white relative py-12 overflow-hidden',
        },
        el(
          'div',
          { className: 'max-w-4xl mx-auto px-4 relative z-10 text-center' },
          el(RichText, {
            tagName: 'h1',
            className: 'text-4xl md:text-5xl font-bold font-heebo mb-6',
            value: attributes.title,
            onChange: function (newTitle) {
              setAttributes({ title: newTitle });
            },
            placeholder: 'הזן כותרת...',
          }),
          el(RichText, {
            tagName: 'p',
            className: 'text-xl text-slate-300 max-w-2xl mx-auto',
            value: attributes.subtitle,
            onChange: function (newSubtitle) {
              setAttributes({ subtitle: newSubtitle });
            },
            placeholder: 'הזן תת-כותרת...',
          })
        )
      );
    },
    save: function () {
      return null;
    },
  });
})(window.wp.blocks, window.wp.element, window.wp.blockEditor);
