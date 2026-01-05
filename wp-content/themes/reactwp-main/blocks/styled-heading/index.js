(function (blocks, element, components) {
  var el = element.createElement;
  var Fragment = element.Fragment;
  var TextControl = components.TextControl;
  var Button = components.Button;
  var PanelBody = components.PanelBody;
  var InspectorControls = window.wp.blockEditor.InspectorControls;

  blocks.registerBlockType('iprf/styled-heading', {
    edit: function (props) {
      var attributes = props.attributes;
      var setAttributes = props.setAttributes;
      var items = attributes.items || [];

      var addItem = function (type) {
        var newItems = items.concat([
          {
            id: Date.now(),
            type: type, // 'word' or 'break'
            text: '',
            className: '',
          },
        ]);
        setAttributes({ items: newItems });
      };

      var updateItem = function (index, key, value) {
        var newItems = items.slice();
        newItems[index] = Object.assign({}, newItems[index], { [key]: value });
        setAttributes({ items: newItems });
      };

      var removeItem = function (index) {
        var newItems = items.slice();
        newItems.splice(index, 1);
        setAttributes({ items: newItems });
      };

      var moveItem = function (index, direction) {
        if (
          (direction === -1 && index === 0) ||
          (direction === 1 && index === items.length - 1)
        ) {
          return;
        }
        var newItems = items.slice();
        var temp = newItems[index];
        newItems[index] = newItems[index + direction];
        newItems[index + direction] = temp;
        setAttributes({ items: newItems });
      };

      return el(
        Fragment,
        null,
        el(
          InspectorControls,
          null,
          el(
            PanelBody,
            { title: 'Heading Content', initialOpen: true },
            items.map(function (item, index) {
              return el(
                'div',
                {
                  key: item.id,
                  style: {
                    border: '1px solid #ccc',
                    padding: '10px',
                    marginBottom: '10px',
                    borderRadius: '4px',
                    background: '#f0f0f0'
                  },
                },
                [
                  el(
                    'div',
                    {
                      style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '5px',
                        alignItems: 'center'
                      },
                    },
                    [
                      el('strong', null, item.type === 'break' ? 'Line Break' : 'Word'),
                      el(
                        'div',
                        { style: { display: 'flex', gap: '5px' } },
                        [
                          el(Button, { icon: 'arrow-up', isSmall: true, onClick: function() { moveItem(index, -1); } }),
                          el(Button, { icon: 'arrow-down', isSmall: true, onClick: function() { moveItem(index, 1); } }),
                          el(Button, { icon: 'trash', isSmall: true, isDestructive: true, onClick: function() { removeItem(index); } })
                        ]
                      ),
                    ]
                  ),
                  item.type === 'word' &&
                    el(TextControl, {
                      label: 'Text',
                      value: item.text,
                      onChange: function (val) {
                        updateItem(index, 'text', val);
                      },
                    }),
                  item.type === 'word' &&
                    el(TextControl, {
                      label: 'CSS Classes',
                      value: item.className,
                      onChange: function (val) {
                        updateItem(index, 'className', val);
                      },
                    }),
                ]
              );
            }),
            el(
              'div',
              { style: { display: 'flex', gap: '10px', marginTop: '10px' } },
              [
                el(Button, { isPrimary: true, onClick: function() { addItem('word'); } }, 'Add Word'),
                el(Button, { isSecondary: true, onClick: function() { addItem('break'); } }, 'Add Line Break'),
              ]
            )
          )
        ),
        el(
          'div',
          { className: 'text-5xl font-bold text-white leading-tight' },
          items.length === 0 ? 'Add words in the sidebar...' : items.map(function (item, index) {
            if (item.type === 'break') {
              return el('br', { key: index });
            }
            return el(
              'span',
              {
                key: index,
                className: item.className ? item.className : '',
                style: { margin: '0 4px' }
              },
              item.text
            );
          })
        )
      );
    },
    save: function () {
      return null;
    },
  });
})(window.wp.blocks, window.wp.element, window.wp.components);
