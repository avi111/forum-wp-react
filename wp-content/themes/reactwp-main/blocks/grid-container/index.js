(function (blocks, element, blockEditor, components) {
  var el = element.createElement;
  var InnerBlocks = blockEditor.InnerBlocks;
  var InspectorControls = blockEditor.InspectorControls;
  var PanelBody = components.PanelBody;
  var RangeControl = components.RangeControl;
  var SelectControl = components.SelectControl;

  blocks.registerBlockType('iprf/grid-container', {
    edit: function (props) {
      var attributes = props.attributes;
      var setAttributes = props.setAttributes;

      return el(
        'div',
        {},
        el(
          InspectorControls,
          null,
          el(
            PanelBody,
            { title: 'הגדרות גריד' },
            el(RangeControl, {
              label: 'מספר עמודות',
              value: attributes.columns,
              onChange: function (newColumns) {
                setAttributes({ columns: newColumns });
              },
              min: 1,
              max: 4,
            }),
            el(SelectControl, {
              label: 'נקודת שבירה',
              value: attributes.breakpoint,
              options: [
                { label: 'Small (sm)', value: 'sm' },
                { label: 'Medium (md)', value: 'md' },
                { label: 'Large (lg)', value: 'lg' },
                { label: 'Extra Large (xl)', value: 'xl' },
              ],
              onChange: function (newBreakpoint) {
                setAttributes({ breakpoint: newBreakpoint });
              },
            }),
            el(RangeControl, {
              label: 'מרווח (Gap)',
              value: attributes.gap,
              onChange: function (newGap) {
                setAttributes({ gap: newGap });
              },
              min: 0,
              max: 16,
            })
          )
        ),
        el(
          'div',
          {
            className:
              'grid grid-cols-' +
              attributes.columns +
              ' gap-' +
              attributes.gap,
          },
          el(InnerBlocks, {})
        )
      );
    },
    save: function () {
      return el(InnerBlocks.Content, {});
    },
  });
})(
  window.wp.blocks,
  window.wp.element,
  window.wp.blockEditor,
  window.wp.components
);
