(function (blocks, element, blockEditor, components) {
  var el = element.createElement;
  var RichText = blockEditor.RichText;
  var InspectorControls = blockEditor.InspectorControls;
  var PanelBody = components.PanelBody;
  var TextareaControl = components.TextareaControl;

  blocks.registerBlockType('iprf/chip', {
    edit: function (props) {
      var attributes = props.attributes;
      var setAttributes = props.setAttributes;

      return el(
        'div',
        {
          className:
            'inline-flex items-center px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-sm font-bold mb-4',
        },
        el(InspectorControls, null,
          el(PanelBody, { title: 'הגדרות שבב' },
            el(TextareaControl, {
              label: 'קוד SVG של האייקון',
              value: attributes.iconSvg,
              onChange: function (newSvg) {
                setAttributes({ iconSvg: newSvg });
              },
            })
          )
        ),
        el(
          'div',
          {
            className: 'w-4 h-4 ml-2',
            dangerouslySetInnerHTML: { __html: attributes.iconSvg },
          }
        ),
        el(RichText, {
          tagName: 'span',
          value: attributes.text,
          onChange: function (newText) {
            setAttributes({ text: newText });
          },
          placeholder: 'טקסט...',
        })
      );
    },
    save: function () {
      return null;
    },
  });
})(
  window.wp.blocks,
  window.wp.element,
  window.wp.blockEditor,
  window.wp.components
);
