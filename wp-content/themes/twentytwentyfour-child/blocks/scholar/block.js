const {registerBlockType} = wp.blocks;
const {TextControl, __experimentalNumberControl: NumberControl} = wp.components;
const {InspectorControls, useBlockProps} = wp.blockEditor;
const {__} = wp.i18n;


registerBlockType('custom/scholar', {
    title: __('Scholar'),
    icon: 'admin-users',
    category: 'text',
    attributes: {},
    edit: () => {
        const scholarObj = scholar.scholar;
        console.log(scholarObj);

        return (
            <div {...useBlockProps()}>
                <div>
                    <div>
                        <div style={{gridTemplateColumns: `repeat(${columns}, 1fr)`}}>
                            <div className="scholar-component" key={scholarObj.ID}>
                                <div>
                                    <a>
                                        <div dangerouslySetInnerHTML={{__html: scholarObj.thumbnail}}/>
                                    </a>
                                </div>
                                <div>
                                    <h4 className="scholar-title">
                                        <a>{scholarObj.degree && scholarObj.degree.map((degree) => (
                                            <span className="scholar-degree">{degree.post_title}</span>
                                        ))}{scholarObj.degree && " "}{scholarObj.post_title}</a>
                                    </h4>
                                    {scholarObj.university && <p className="scholar-univerisy">
                                        {scholarObj.university.map((university) => (
                                            <a>{university.post_title}</a>
                                        ))}
                                    </p>}
                                    {scholarObj.disciplines && <p className="scholar-discipline">
                                        {scholarObj.disciplines.map((discipline) => (
                                            <a>{discipline.post_title}</a>
                                        ))}
                                    </p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: scholarObj.post_content}}/>
                </div>
            </div>
        )
    },
    save: () => {
        return null; // Dynamic block, content is rendered server-side
    },
});