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

var registerBlockType = wp.blocks.registerBlockType;
var _wp$components = wp.components,
    TextControl = _wp$components.TextControl,
    NumberControl = _wp$components.__experimentalNumberControl;
var _wp$blockEditor = wp.blockEditor,
    InspectorControls = _wp$blockEditor.InspectorControls,
    useBlockProps = _wp$blockEditor.useBlockProps;
var __ = wp.i18n.__;


registerBlockType('custom/scholar', {
    title: __('Scholar'),
    icon: 'admin-users',
    category: 'text',
    attributes: {},
    edit: function edit() {
        var scholarObj = scholar.scholar;
        console.log(scholarObj);

        return wp.element.createElement(
            'div',
            useBlockProps(),
            wp.element.createElement(
                'div',
                null,
                wp.element.createElement(
                    'div',
                    null,
                    wp.element.createElement(
                        'div',
                        { style: { gridTemplateColumns: 'repeat(' + columns + ', 1fr)' } },
                        wp.element.createElement(
                            'div',
                            { className: 'scholar-component', key: scholarObj.ID },
                            wp.element.createElement(
                                'div',
                                null,
                                wp.element.createElement(
                                    'a',
                                    null,
                                    wp.element.createElement('div', { dangerouslySetInnerHTML: { __html: scholarObj.thumbnail } })
                                )
                            ),
                            wp.element.createElement(
                                'div',
                                null,
                                wp.element.createElement(
                                    'h4',
                                    { className: 'scholar-title' },
                                    wp.element.createElement(
                                        'a',
                                        null,
                                        scholarObj.degree && scholarObj.degree.map(function (degree) {
                                            return wp.element.createElement(
                                                'span',
                                                { className: 'scholar-degree' },
                                                degree.post_title
                                            );
                                        }),
                                        scholarObj.degree && " ",
                                        scholarObj.post_title
                                    )
                                ),
                                scholarObj.university && wp.element.createElement(
                                    'p',
                                    { className: 'scholar-univerisy' },
                                    scholarObj.university.map(function (university) {
                                        return wp.element.createElement(
                                            'a',
                                            null,
                                            university.post_title
                                        );
                                    })
                                ),
                                scholarObj.disciplines && wp.element.createElement(
                                    'p',
                                    { className: 'scholar-discipline' },
                                    scholarObj.disciplines.map(function (discipline) {
                                        return wp.element.createElement(
                                            'a',
                                            null,
                                            discipline.post_title
                                        );
                                    })
                                )
                            )
                        )
                    )
                ),
                wp.element.createElement('div', { dangerouslySetInnerHTML: { __html: scholarObj.post_content } })
            )
        );
    },
    save: function save() {
        return null; // Dynamic block, content is rendered server-side
    }
});

/***/ })
/******/ ]);