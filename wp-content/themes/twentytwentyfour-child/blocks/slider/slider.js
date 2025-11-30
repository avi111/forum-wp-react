const {registerBlockType} = wp.blocks;
const {SelectControl} = wp.components;
const {InspectorControls, useBlockProps} = wp.blockEditor;
const {__} = wp.i18n;


registerBlockType('custom/slider', {
    title: __('Slider', 'slider'),
    icon: 'admin-users',
    category: 'text',
    attributes: {
        term: {
            type: 'number',
            default: 0,
        },
    },
    edit: ({attributes, setAttributes}) => {
        const {term} = attributes;
        const terms = [...data.query.terms.map((term) => {
            return {label: term.name, value: term.term_id};
        }), {
            label: 'choose term',
            value: 0,
        }];

        return (
            <div {...useBlockProps()}>
                <InspectorControls>
                    <div {...useBlockProps()}>
                        <SelectControl
                            label="Slider"
                            value={term}
                            onChange={(term) => setAttributes({term})}
                            __nextHasNoMarginBottom
                        >
                            {terms.map((term) => {
                                return <option value={term.value}>{term.label}</option>
                            })}
                        </SelectControl>
                    </div>
                </InspectorControls>
                <div style={{
                    textAlign: "center",
                }}>
                    Slider goes here
                </div>
            </div>
        )
    },
    save: () => {
        return null; // Dynamic block, content is rendered server-side
    },
});
