/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var registerBlockType = wp.blocks.registerBlockType;
var _wp$components = wp.components,
    TextControl = _wp$components.TextControl,
    NumberControl = _wp$components.__experimentalNumberControl;
var _wp$blockEditor = wp.blockEditor,
    InspectorControls = _wp$blockEditor.InspectorControls,
    useBlockProps = _wp$blockEditor.useBlockProps;
var __ = wp.i18n.__;


var formatDate = function formatDate(inputDate) {
    var date = new Date(inputDate);

    // Format the date
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-based
    var year = date.getFullYear();

    // Combine the formatted parts
    return day + "/" + month + "/" + year;
};

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
        }
    },
    edit: function edit(_ref) {
        var attributes = _ref.attributes,
            setAttributes = _ref.setAttributes;
        var title = attributes.title,
            subTitle = attributes.subTitle,
            columns = attributes.columns;

        var displayedScholars = scholars_grid.scholars.posts;
        return wp.element.createElement(
            "div",
            _extends({ className: "scholars-grid" }, useBlockProps()),
            wp.element.createElement(
                InspectorControls,
                null,
                wp.element.createElement(TextControl, {
                    label: __('Title'),
                    value: title,
                    onChange: function onChange(title) {
                        return setAttributes({ title: title });
                    }
                }),
                wp.element.createElement(TextControl, {
                    label: __('SubTitle'),
                    value: subTitle,
                    onChange: function onChange(subTitle) {
                        return setAttributes({ subTitle: subTitle });
                    }
                }),
                wp.element.createElement(NumberControl, {
                    label: __('Columns'),
                    value: columns,
                    onChange: function onChange(columns) {
                        return setAttributes({ columns: columns });
                    },
                    min: 1
                })
            ),
            wp.element.createElement(
                "div",
                { style: { textAlign: "center" } },
                wp.element.createElement(
                    "div",
                    { className: "welcome" },
                    wp.element.createElement(
                        "h3",
                        useBlockProps(),
                        title
                    ),
                    wp.element.createElement(
                        "p",
                        useBlockProps(),
                        subTitle
                    )
                ),
                wp.element.createElement(
                    "div",
                    { className: "scholars-grid" },
                    wp.element.createElement(
                        "div",
                        { style: { gridTemplateColumns: "repeat(" + columns + ", 1fr)" } },
                        displayedScholars.map(function (scholar) {
                            return wp.element.createElement(
                                "div",
                                { className: "scholar", key: scholar.id },
                                wp.element.createElement(
                                    "a",
                                    null,
                                    wp.element.createElement("div", { dangerouslySetInnerHTML: { __html: scholar.thumbnail } })
                                ),
                                wp.element.createElement(
                                    "h4",
                                    { className: "scholar-title" },
                                    wp.element.createElement(
                                        "a",
                                        null,
                                        scholar.degree && scholar.degree.map(function (degree) {
                                            return wp.element.createElement(
                                                "span",
                                                { className: "scholar-degree" },
                                                degree.post_title
                                            );
                                        }),
                                        scholar.degree && " ",
                                        scholar.post_title
                                    )
                                ),
                                scholar.university && wp.element.createElement(
                                    "p",
                                    { className: "scholar-univerisy" },
                                    scholar.university.map(function (university) {
                                        return wp.element.createElement(
                                            "a",
                                            null,
                                            university.post_title
                                        );
                                    })
                                ),
                                scholar.disciplines && wp.element.createElement(
                                    "p",
                                    { className: "scholar-discipline" },
                                    scholar.disciplines.map(function (discipline) {
                                        return wp.element.createElement(
                                            "a",
                                            null,
                                            discipline.post_title
                                        );
                                    })
                                )
                            );
                        })
                    )
                )
            )
        );
    },
    save: function save() {
        return null; // Dynamic block, content is rendered server-side
    }
});

/***/ })
/******/ ]);