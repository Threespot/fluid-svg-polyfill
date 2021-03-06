module.exports =
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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (el, opts) {\n  if (!needsPolyfill) {\n    return false;\n  }\n\n  // Make sure element is an SVG\n  if (el.tagName.toLowerCase() !== \"svg\") {\n    console.warn(\"fluidSVGPolyfill() only works on SVG elements\", el);\n    return false;\n  }\n\n  // Use Object.assign() to merge “opts” object with default values in “options”\n  // Note: There’s only one option for now, but this approach makes it easy to add others in the future.\n  var options = Object.assign({}, {\n    moveClasses: false, // move classes from SVG to wrapper\n    svgClass: false, // optional class string added to SVG\n    wrapperClass: false // optional class string added to wrapper\n  }, opts);\n\n  var aspectRatioPadding = null;\n\n  // Check if SVG has a “viewBox” attribute\n  if (el.hasAttribute(\"viewBox\")) {\n    var viewBox = el.getAttribute(\"viewBox\").split(\" \"); // => [0, 0, width, height]\n\n    // Calculate aspect ratio\n    // Note: JS will automatically convert number strings to integers\n    // http://2ality.com/2013/04/quirk-implicit-conversion.html\n    aspectRatioPadding = viewBox[3] / viewBox[2] * 100;\n  } else if (el.getAttribute(\"height\") && el.getAttribute(\"width\")) {\n    // If no “viewBox”, check for height/width attributes to calculate aspect ratio\n    aspectRatioPadding = el.getAttribute(\"height\") / el.getAttribute(\"width\") * 100;\n  } else {\n    console.warn(\"Couldn’t determine SVG’s aspect ratio\", el);\n    return false;\n  }\n\n  // Wrap SVG in div\n  var wrapper = document.createElement(\"div\");\n\n  // Move SVG classes to wrapper\n  if (options.moveClasses) {\n    wrapper.className = el.getAttribute(\"class\");\n    // Remove classes from SVG\n    el.removeAttribute(\"class\");\n  }\n\n  // Add custom SVG class\n  // Note: If we want to drop IE 9 support, we could use classList.add() instead\n  if (options.svgClass) {\n    el.className.baseVal += (el.className.baseVal.length ? \" \" : \"\") + options.svgClass;\n  }\n\n  // Add custom wrapper class\n  if (options.wrapperClass) {\n    wrapper.className = options.wrapperClass;\n  }\n\n  wrapper.style.paddingTop = round(aspectRatioPadding, 3) + \"%\";\n  wrapper.style.position = \"relative\";\n  wrapper.style.width = \"100%\";\n\n  // Wrap SVG with the div\n  el.parentNode.insertBefore(wrapper, el);\n  wrapper.appendChild(el);\n\n  // Stretch SVG to fill parent\n  // Merge any existing inline styles https://stackoverflow.com/a/34490573/673457\n  Object.assign(el.style, {\n    height: \"100%\",\n    left: \"0\",\n    position: \"absolute\",\n    top: \"0\",\n    width: \"100%\"\n  });\n};\n\n__webpack_require__(/*! mdn-polyfills/Object.assign */ \"./node_modules/mdn-polyfills/Object.assign.js\");\n\n\"use strict\";\n\n// Check if the browser requires this polyfill (IE 11-)\n// https://philipnewcomer.net/2014/04/target-internet-explorer-10-11-css/\n// Object.assign polyfill for IE 11- support\n// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Browser_compatibility\nvar needsPolyfill = document.documentElement.className.indexOf(\"old-ie\") > -1 || window.matchMedia(\"(-ms-high-contrast: none), (-ms-high-contrast: active)\").matches;\n\n/**\n * Rounding function that accounts for floating point errors\n * @param {number} value - Number to round\n * @param {number} decimals - Decimals places to round to\n */\n// http://www.jacklmoore.com/notes/rounding-in-javascript/\n// https://stackoverflow.com/a/29101013/673457\n// http://floating-point-gui.de\nfunction round(value, decimals) {\n  return Number(Math.round(value + \"e\" + decimals) + \"e-\" + decimals);\n}\n\n/**\n * Preserve the aspect ratio of fluid-width SVGs in IE 11 and below\n * @param {HTMLElement} el - SVG element\n * @param {Object} opts - Options\n * @param {string} [opts.classes=\"\"] - Class(es) to add to the wrapper or iframe (depends on wrap option)\n */\n\n//# sourceURL=webpack://%5Bname%5DLink/./index.js?");

/***/ }),

/***/ "./node_modules/mdn-polyfills/Object.assign.js":
/*!*****************************************************!*\
  !*** ./node_modules/mdn-polyfills/Object.assign.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\"function\"!=typeof Object.assign&&(Object.assign=function(n){if(null==n)throw new TypeError(\"Cannot convert undefined or null to object\");for(var r=Object(n),t=1;t<arguments.length;t++){var e=arguments[t];if(null!=e)for(var o in e)e.hasOwnProperty(o)&&(r[o]=e[o])}return r});\n\n\n//# sourceURL=webpack://%5Bname%5DLink/./node_modules/mdn-polyfills/Object.assign.js?");

/***/ })

/******/ });
//# sourceMappingURL=fluid-svg-polyfill.commonjs2.js.map