(function (blocks, element, blockEditor, components) {
  var el = element.createElement;
  var RichText = blockEditor.RichText;
  var InspectorControls = blockEditor.InspectorControls;
  var PanelBody = components.PanelBody;
  var TextareaControl = components.TextareaControl;
  var SelectControl = components.SelectControl;

  blocks.registerBlockType('iprf/core-pillar-item', {
    edit: function (props) {
      var attributes = props.attributes;
      var setAttributes = props.setAttributes;

      return el(
        'div',
        { className: 'bg-white p-6 rounded-xl shadow-sm border border-slate-200' },
        el(
          InspectorControls,
          null,
          el(
            PanelBody,
            { title: 'הגדרות עמוד תווך', initialOpen: true },
            el(TextareaControl, {
              label: 'קוד SVG של האייקון',
              value: attributes.iconSvg,
              onChange: function (newSvg) {
                setAttributes({ iconSvg: newSvg });
              },
              help: 'ודא שה-SVG מכיל width="24" ו-height="24".',
            }),
            el(SelectControl, {
              label: 'צבע',
              value: attributes.color,
              options: [
                { label: 'Indigo', value: 'indigo' },
                { label: 'Teal', value: 'teal' },
                { label: 'Purple', value: 'purple' },
                { label: 'Amber', value: 'amber' },
              ],
              onChange: function (newColor) {
                setAttributes({ color: newColor });
              },
            })
          )
        ),
        el(
          'div',
          {
            className:
              'w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-' +
              attributes.color +
              '-100 text-' +
              attributes.color +
              '-600',
            dangerouslySetInnerHTML: { __html: attributes.iconSvg },
          }
        ),
        el(RichText, {
          tagName: 'h3',
          className: 'text-xl font-bold text-slate-900 mb-3',
          value: attributes.title,
          onChange: function (newTitle) {
            setAttributes({ title: newTitle });
          },
          placeholder: 'כותרת...',
        }),
        el(RichText, {
          tagName: 'p',
          className: 'text-slate-600 text-sm',
          value: attributes.description,
          onChange: function (newDescription) {
            setAttributes({ description: newDescription });
          },
          placeholder: 'תיאור...',
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
