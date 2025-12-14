(function (blocks, element, blockEditor, components) {
  var el = element.createElement;
  var RichText = blockEditor.RichText;
  var InspectorControls = blockEditor.InspectorControls;
  var PanelBody = components.PanelBody;
  var TextareaControl = components.TextareaControl;
  var SelectControl = components.SelectControl;

  blocks.registerBlockType('iprf/home-feature', {
    edit: function (props) {
      var attributes = props.attributes;
      var setAttributes = props.setAttributes;

      return el(
        'div',
        { className: 'p-8 rounded-2xl bg-slate-50 border border-slate-200' },
        // Inspector Controls (Sidebar)
        el(
          InspectorControls,
          null,
          el(
            PanelBody,
            { title: 'הגדרות פיצ\'ר', initialOpen: true },
            el(TextareaControl, {
              label: 'קוד SVG של האייקון',
              value: attributes.iconSvg,
              onChange: function (newSvg) {
                setAttributes({ iconSvg: newSvg });
              },
            }),
            el(SelectControl, {
              label: 'צבע האייקון',
              value: attributes.iconColor,
              options: [
                { label: 'Teal', value: 'teal' },
                { label: 'Indigo', value: 'indigo' },
                { label: 'Purple', value: 'purple' },
              ],
              onChange: function (newColor) {
                setAttributes({ iconColor: newColor });
              },
            })
          )
        ),

        // Block Content (Editor View)
        el(
          'div',
          { className: 'text-center' },
          el(
            'div',
            {
              className:
                'w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-' +
                attributes.iconColor +
                '-100',
            },
            el(
              'div',
              {
                className: 'w-8 h-8 text-' + attributes.iconColor + '-600',
                dangerouslySetInnerHTML: { __html: attributes.iconSvg },
              }
            )
          ),
          el(RichText, {
            tagName: 'h3',
            className: 'text-2xl font-bold mb-3 text-slate-900',
            value: attributes.title,
            onChange: function (newTitle) {
              setAttributes({ title: newTitle });
            },
            placeholder: 'הזן כותרת...',
          }),
          el(RichText, {
            tagName: 'p',
            className: 'text-slate-600 leading-relaxed',
            value: attributes.description,
            onChange: function (newDescription) {
              setAttributes({ description: newDescription });
            },
            placeholder: 'הזן תיאור...',
          })
        )
      );
    },
    save: function () {
      // Because this is a dynamic block, save() returns null.
      // The rendering is handled by render.php on the server side.
      return null;
    },
  });
})(
  window.wp.blocks,
  window.wp.element,
  window.wp.blockEditor,
  window.wp.components
);
