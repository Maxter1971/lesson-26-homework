!function(){"use strict";function t(r){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(r)}function r(r){var o=function(r,o){if("object"!==t(r)||null===r)return r;var n=r[Symbol.toPrimitive];if(void 0!==n){var e=n.call(r,o);if("object"!==t(e))return e;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(r)}(r,"string");return"symbol"===t(o)?o:String(o)}var o,n;console.log((n=[],["initial","inWork","buyingSupplies"].forEach((function(t){"buyingSupplies"!==t&&"producing"!==t&&n.push(t)})),n)),console.log("buyingSupplies"),console.log(function(t,r){if(null==t)return{};var o,n,e=function(t,r){if(null==t)return{};var o,n,e={},i=Object.keys(t);for(n=0;n<i.length;n++)o=i[n],r.indexOf(o)>=0||(e[o]=t[o]);return e}(t,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(n=0;n<i.length;n++)o=i[n],r.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(t,o)&&(e[o]=t[o])}return e}({state:"buyingSupplies",sum:5,workerId:12,suppliesSum:100},["state"].map(r))),console.log("initial"===(o={state:"inWork",sum:5,workerId:6}).state||"inWork"===o.state?o:null)}();
//# sourceMappingURL=bundle.js.map