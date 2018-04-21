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
/******/ 	return __webpack_require__(__webpack_require__.s = "./chrome-ext/devtools.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./chrome-ext/devtools.js":
/*!********************************!*\
  !*** ./chrome-ext/devtools.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//NOTES:\n// This script is ran as soon as the chrome devtools is open.\nconsole.log(\"hello from devtools\");\n\n//create the initial panel.\nchrome.devtools.panels.create(\n    \"Reactext\",\n    \"icon.png\",\n    \"devtools.html\",  //html that is injected into the tab's content\n    function (panel) {  //panel returns a panel object panel: {\"onShown\":{},\"onHidden\":{},\"onSearch\":{}}\n        console.log(`from the panel CB... panel: ${JSON.stringify(panel.onShow)}`);\n    });\n\n\n////////////////////////////////////////////////////////////////////////\n\n//This pulls the recousrces that build the page.\n//This gets the url for the bundle.\n\nchrome.devtools.inspectedWindow.getResources((resources) => {\n    console.log(resources, '<=== im the resources');\n    let res = resources.filter((e) => {\n        return e.url.includes('/bundle.js');\n    });\n    let url = res[0].url;\n    console.log(url, '<=== url');\n\n\n///////////////\n/////fetch/////\n///////////////\n//NOTES: fetch doesnt seem to work properly to get data\n\n    // const options = {\n    //     //options for fetch go here\n    //     'credentials': 'same-origin',\n    //     headers:{\n    //         'content-type': 'application/json',\n    //     },\n    // }\n\n    // fetch(url, options)\n\n    // ///////////////////////////////////////////////////////////\n    // .then(res => {\n    //     console.log(JSON.parse(res), 'here!!!');\n    //     return res.json();\n    // })\n\n    // ///////////////////////////////////////////////////////////\n    // .then(data => {\n    //     console.log('made it to 2nd .then');\n    //     console.log(data);\n    // })\n\n    // ///////////////////////////////////////////////////////////\n    // .catch(err => {\n    //     console.log('im the err from the catch', err);\n    // })\n\n\n});\n\n\n//# sourceURL=webpack:///./chrome-ext/devtools.js?");

/***/ })

/******/ });