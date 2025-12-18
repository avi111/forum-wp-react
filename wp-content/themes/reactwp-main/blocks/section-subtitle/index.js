(function (blocks, element, blockEditor) {
  var el = element.createElement;
  var RichText = blockEditor.RichText;

  blocks.registerBlockType('iprf/section-subtitle', {
    edit: function (props) {
      var attributes = props.attributes;
      var setAttributes = props.setAttributes;

      return el(RichText, {
        tagName: 'h2',
        className: 'text-3xl font-bold text-slate-900 mb-6',
        value: attributes.text,
        onChange: function (newText) {
          setAttributes({ text: newText });
        },
        placeholder: 'הזן כותרת משנה...',
      });
    },
    save: function () {
      return null;
    },
  });
})(window.wp.blocks, window.wp.element, window.wp.blockEditor);
