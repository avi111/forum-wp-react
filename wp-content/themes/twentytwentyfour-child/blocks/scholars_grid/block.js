const {registerBlockType} = wp.blocks;
const {TextControl, __experimentalNumberControl: NumberControl} = wp.components;
const {InspectorControls, useBlockProps} = wp.blockEditor;
const {__} = wp.i18n;

const formatDate = (inputDate) => {
    let date = new Date(inputDate);

// Format the date
    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-based
    let year = date.getFullYear();

// Combine the formatted parts
    return `${day}/${month}/${year}`;
}

registerBlockType('custom/scholars-grid', {
    title: __('Scholars grid', 'scholars-grid'),
    icon: 'admin-users',
    category: 'text',
    attributes: {
        title: {
            type: 'string',
            default: 'scholars grid'
        },
        subTitle: {
            type: 'string',
            default: 'scholars grid subtitle'
        },
        columns: {
            type: 'number',
            default: 3
        },
    },
    edit: ({attributes, setAttributes}) => {
        const {title, subTitle, columns} = attributes;
        const displayedScholars = scholars_grid.scholars.posts;
        return (
            <div className="scholars-grid" {...useBlockProps()}>
                <InspectorControls>
                    <TextControl
                        label={__('Title')}
                        value={title}
                        onChange={(title) => setAttributes({title})}
                    />
                    <TextControl
                        label={__('SubTitle')}
                        value={subTitle}
                        onChange={(subTitle) => setAttributes({subTitle})}
                    />
                    <NumberControl
                        label={__('Columns')}
                        value={columns}
                        onChange={(columns) => setAttributes({columns})}
                        min={1}
                    />
                </InspectorControls>
                <div style={{textAlign: "center"}}>
                    <div className="welcome">
                        <h3 {...useBlockProps()}>{title}</h3>
                        <p {...useBlockProps()}>{subTitle}</p>
                    </div>
                    <div className="scholars-grid">
                        <div style={{gridTemplateColumns: `repeat(${columns}, 1fr)`}}>
                            {displayedScholars.map((scholar) => (
                                <div className="scholar" key={scholar.id}>
                                    <a>
                                        <div dangerouslySetInnerHTML={{__html: scholar.thumbnail}}/>
                                    </a>
                                    <h4 className="scholar-title">
                                        <a>{scholar.degree && scholar.degree.map((degree) => (
                                            <span className="scholar-degree">{degree.post_title}</span>
                                            ))}{scholar.degree && " "}{scholar.post_title}</a>
                                    </h4>
                                    {scholar.university && <p className="scholar-univerisy">
                                        {scholar.university.map((university) => (
                                            <a>{university.post_title}</a>
                                        ))}
                                    </p>}
                                    {scholar.disciplines && <p className="scholar-discipline">
                                        {scholar.disciplines.map((discipline) => (
                                            <a>{discipline.post_title}</a>
                                        ))}
                                    </p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    save: () => {
        return null; // Dynamic block, content is rendered server-side
    },
});