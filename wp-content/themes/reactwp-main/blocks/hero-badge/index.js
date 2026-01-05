(function (blocks, element, blockEditor) {
  var el = element.createElement;
  var RichText = blockEditor.RichText;

  blocks.registerBlockType('iprf/hero-badge', {
    title: 'Hero Badge (Chip)',
    icon: 'tag',
    category: 'common',
    attributes: {
      text: {
        type: 'string',
        default: 'הפורום הרשמי למחקר אקדמי בישראל',
      },
    },
    edit: function (props) {
      var attributes = props.attributes;
      var setAttributes = props.setAttributes;

      return el(
        'div',
        {
          className:
            'inline-flex items-center px-4 py-2 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-300 text-sm font-medium backdrop-blur-sm cursor-text',
        },
        [
          el('span', {
            className: 'w-2 h-2 rounded-full bg-teal-400 ml-2 animate-pulse',
          }),
          el(RichText, {
            tagName: 'span',
            value: attributes.text,
            onChange: function (newText) {
              setAttributes({ text: newText });
            },
            placeholder: 'הכנס טקסט...',
            allowedFormats: [], // מונע הדגשות/נטיות כדי לשמור על העיצוב הנקי
          }),
        ]
      );
    },
    save: function () {
      return null; // הרינדור מתבצע ב-PHP
    },
  });
})(window.wp.blocks, window.wp.element, window.wp.blockEditor);
