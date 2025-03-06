/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/math-random";
exports.ids = ["vendor-chunks/math-random"];
exports.modules = {

/***/ "(ssr)/./node_modules/math-random/crypto.js":
/*!********************************************!*\
  !*** ./node_modules/math-random/crypto.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! crypto */ \"crypto\")\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbWF0aC1yYW5kb20vY3J5cHRvLmpzIiwibWFwcGluZ3MiOiJBQUFBLDREQUFrQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NoYXRfYXBwLy4vbm9kZV9tb2R1bGVzL21hdGgtcmFuZG9tL2NyeXB0by5qcz82MDQzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnY3J5cHRvJylcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/math-random/crypto.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/math-random/node.js":
/*!******************************************!*\
  !*** ./node_modules/math-random/node.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = random\n\nvar crypto = __webpack_require__(/*! ./crypto */ \"(ssr)/./node_modules/math-random/crypto.js\")\nvar max = Math.pow(2, 32)\n\nfunction random () {\n  return crypto\n    .randomBytes(4)\n    .readUInt32BE(0) / max\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbWF0aC1yYW5kb20vbm9kZS5qcyIsIm1hcHBpbmdzIjoiQUFBQTs7QUFFQSxhQUFhLG1CQUFPLENBQUMsNERBQVU7QUFDL0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2NoYXRfYXBwLy4vbm9kZV9tb2R1bGVzL21hdGgtcmFuZG9tL25vZGUuanM/ZjgzNCJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJhbmRvbVxuXG52YXIgY3J5cHRvID0gcmVxdWlyZSgnLi9jcnlwdG8nKVxudmFyIG1heCA9IE1hdGgucG93KDIsIDMyKVxuXG5mdW5jdGlvbiByYW5kb20gKCkge1xuICByZXR1cm4gY3J5cHRvXG4gICAgLnJhbmRvbUJ5dGVzKDQpXG4gICAgLnJlYWRVSW50MzJCRSgwKSAvIG1heFxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/math-random/node.js\n");

/***/ })

};
;