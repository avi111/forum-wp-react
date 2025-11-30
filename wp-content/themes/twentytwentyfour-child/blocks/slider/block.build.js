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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var registerBlockType = wp.blocks.registerBlockType;
var SelectControl = wp.components.SelectControl;
var _wp$blockEditor = wp.blockEditor,
    InspectorControls = _wp$blockEditor.InspectorControls,
    useBlockProps = _wp$blockEditor.useBlockProps;
var __ = wp.i18n.__;


registerBlockType('custom/slider', {
    title: __('Slider', 'slider'),
    icon: 'admin-users',
    category: 'text',
    attributes: {
        term: {
            type: 'number',
            default: 0
        }
    },
    edit: function edit(_ref) {
        var attributes = _ref.attributes,
            setAttributes = _ref.setAttributes;
        var term = attributes.term;

        var terms = [].concat(_toConsumableArray(data.query.terms.map(function (term) {
            return { label: term.name, value: term.term_id };
        })), [{
            label: 'choose term',
            value: 0
        }]);

        return wp.element.createElement(
            'div',
            useBlockProps(),
            wp.element.createElement(
                InspectorControls,
                null,
                wp.element.createElement(
                    'div',
                    useBlockProps(),
                    wp.element.createElement(
                        SelectControl,
                        {
                            label: 'Slider',
                            value: term,
                            onChange: function onChange(term) {
                                return setAttributes({ term: term });
                            },
                            __nextHasNoMarginBottom: true
                        },
                        terms.map(function (term) {
                            return wp.element.createElement(
                                'option',
                                { value: term.value },
                                term.label
                            );
                        })
                    )
                )
            ),
            wp.element.createElement(
                'div',
                { style: {
                        textAlign: "center"
                    } },
                'Slider goes here'
            )
        );
    },
    save: function save() {
        return null; // Dynamic block, content is rendered server-side
    }
});

/***/ })
/******/ ]);