(function (blocks, element, blockEditor, components) {
  var el = element.createElement;
  var InspectorControls = blockEditor.InspectorControls;
  var PanelBody = components.PanelBody;
  var ToggleControl = components.ToggleControl;

  blocks.registerBlockType('iprf/decorative-box', {
    edit: function (props) {
      var attributes = props.attributes;
      var setAttributes = props.setAttributes;

      return el(
        'div',
        {
          className:
            'bg-teal-500 rounded-lg p-4 text-white text-center text-sm',
        },
        el(InspectorControls, null,
          el(PanelBody, { title: 'הגדרות קופסה' },
            el(ToggleControl, {
              label: 'מיקום אבסולוטי (מכסה את כל האזור)',
              checked: attributes.isAbsolute,
              onChange: function (newValue) {
                setAttributes({ isAbsolute: newValue });
              },
            })
          )
        ),
        'קופסה דקורטיבית'
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
