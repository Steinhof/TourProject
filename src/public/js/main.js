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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "js/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/client/modules/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/client/modules/main.ts":
/*!************************************!*\
  !*** ./src/client/modules/main.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// import func from './tesss';\r\n//\r\n// func();\r\n//\r\n// function WASMModuleLoad(): void {\r\n//     const imports = {\r\n//         env: {\r\n//             abort() {\r\n//                 console.error('abort called');\r\n//             },\r\n//         },\r\n//     };\r\n//\r\n//     WebAssembly.instantiateStreaming(fetch('./js/wasm.wasm'), imports).then(\r\n//         module => {\r\n//             const { exports } = module.instance;\r\n//\r\n//             // Add function here\r\n//             const addFunc = exports.add;\r\n//             console.log(addFunc(10, 10));\r\n//         },\r\n//     );\r\n// }\r\n//\r\n// WASMModuleLoad();\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L21vZHVsZXMvbWFpbi50cz8yYjcxIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsVUFBVTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiIuL3NyYy9jbGllbnQvbW9kdWxlcy9tYWluLnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IGZ1bmMgZnJvbSAnLi90ZXNzcyc7XHJcbi8vXHJcbi8vIGZ1bmMoKTtcclxuLy9cclxuLy8gZnVuY3Rpb24gV0FTTU1vZHVsZUxvYWQoKTogdm9pZCB7XHJcbi8vICAgICBjb25zdCBpbXBvcnRzID0ge1xyXG4vLyAgICAgICAgIGVudjoge1xyXG4vLyAgICAgICAgICAgICBhYm9ydCgpIHtcclxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2Fib3J0IGNhbGxlZCcpO1xyXG4vLyAgICAgICAgICAgICB9LFxyXG4vLyAgICAgICAgIH0sXHJcbi8vICAgICB9O1xyXG4vL1xyXG4vLyAgICAgV2ViQXNzZW1ibHkuaW5zdGFudGlhdGVTdHJlYW1pbmcoZmV0Y2goJy4vanMvd2FzbS53YXNtJyksIGltcG9ydHMpLnRoZW4oXHJcbi8vICAgICAgICAgbW9kdWxlID0+IHtcclxuLy8gICAgICAgICAgICAgY29uc3QgeyBleHBvcnRzIH0gPSBtb2R1bGUuaW5zdGFuY2U7XHJcbi8vXHJcbi8vICAgICAgICAgICAgIC8vIEFkZCBmdW5jdGlvbiBoZXJlXHJcbi8vICAgICAgICAgICAgIGNvbnN0IGFkZEZ1bmMgPSBleHBvcnRzLmFkZDtcclxuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coYWRkRnVuYygxMCwgMTApKTtcclxuLy8gICAgICAgICB9LFxyXG4vLyAgICAgKTtcclxuLy8gfVxyXG4vL1xyXG4vLyBXQVNNTW9kdWxlTG9hZCgpO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/client/modules/main.ts\n");

/***/ })

/******/ });