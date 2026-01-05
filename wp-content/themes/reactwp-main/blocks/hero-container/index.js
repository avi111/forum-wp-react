(function (blocks, element, blockEditor, components) {
  var el = element.createElement;
  var InnerBlocks = blockEditor.InnerBlocks;
  var MediaUpload = blockEditor.MediaUpload;
  var Button = components.Button;
  var PanelBody = components.PanelBody;
  var InspectorControls = blockEditor.InspectorControls;

  blocks.registerBlockType("iprf/hero-container", {
    attributes: {
      backgroundImageUrl: { type: "string" },
      backgroundImageId: { type: "number" },
      sideImageUrl: { type: "string" },
      sideImageId: { type: "number" },
    },
    edit: function (props) {
      var attributes = props.attributes;
      var setAttributes = props.setAttributes;

      var onSelectBackgroundImage = function (media) {
        setAttributes({
          backgroundImageUrl: media.url,
          backgroundImageId: media.id,
        });
      };

      var onSelectSideImage = function (media) {
        setAttributes({
          sideImageUrl: media.url,
          sideImageId: media.id,
        });
      };

      return el(
        element.Fragment,
        null,
        el(
          InspectorControls,
          null,
          el(
            PanelBody,
            { title: "Background Image", initialOpen: true },
            el(MediaUpload, {
              onSelect: onSelectBackgroundImage,
              allowedTypes: ["image"],
              value: attributes.backgroundImageId,
              render: function (obj) {
                return el(
                  Button,
                  {
                    className: "is-primary",
                    onClick: obj.open,
                  },
                  !attributes.backgroundImageUrl
                    ? "Upload Background Image"
                    : "Replace Background Image",
                );
              },
            }),
            attributes.backgroundImageUrl &&
              el(
                Button,
                {
                  className: "is-secondary",
                  style: { marginTop: "10px" },
                  onClick: function () {
                    setAttributes({
                      backgroundImageUrl: "",
                      backgroundImageId: 0,
                    });
                  },
                },
                "Remove Background Image",
              ),
          ),
          el(
            PanelBody,
            { title: "Side Image", initialOpen: true },
            el(MediaUpload, {
              onSelect: onSelectSideImage,
              allowedTypes: ["image"],
              value: attributes.sideImageId,
              render: function (obj) {
                return el(
                  Button,
                  {
                    className: "is-primary",
                    onClick: obj.open,
                  },
                  !attributes.sideImageUrl
                    ? "Upload Side Image"
                    : "Replace Side Image",
                );
              },
            }),
            attributes.sideImageUrl &&
              el(
                Button,
                {
                  className: "is-secondary",
                  style: { marginTop: "10px" },
                  onClick: function () {
                    setAttributes({ sideImageUrl: "", sideImageId: 0 });
                  },
                },
                "Remove Side Image",
              ),
          ),
        ),
        el(
          "div",
          {
            className:
              "relative w-full min-h-[500px] bg-slate-900 overflow-hidden flex items-center",
          },
          [
            attributes.backgroundImageUrl &&
              el("img", {
                src: attributes.backgroundImageUrl,
                className:
                  "absolute inset-0 w-full h-full object-cover opacity-20",
                style: {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.2,
                },
              }),
            el("div", {
              className:
                "absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent",
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              },
            }),
            el(
              "div",
              {
                className:
                  "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center gap-12 w-full",
              },
              [
                el(
                  "div",
                  { className: "flex-1 text-center md:text-right space-y-8" },
                  el(InnerBlocks, {
                    template: [
                      ["iprf/hero-badge", {}],
                      ["iprf/styled-heading", {}],
                      ["core/paragraph", { placeholder: "Add description..." }],
                    ],
                  }),
                ),
                attributes.sideImageUrl &&
                  el(
                    "div",
                    { className: "hidden md:block flex-1 relative" },
                    el(
                      "div",
                      {
                        className:
                          "relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-slate-700",
                      },
                      el("img", {
                        src: attributes.sideImageUrl,
                        className: "w-full h-auto opacity-90",
                      }),
                    ),
                  ),
              ],
            ),
          ],
        ),
      );
    },
    save: function () {
      return el(InnerBlocks.Content);
    },
  });
})(
  window.wp.blocks,
  window.wp.element,
  window.wp.blockEditor,
  window.wp.components,
);
