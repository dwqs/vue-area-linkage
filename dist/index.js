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
/******/ 	return __webpack_require__(__webpack_require__.s = 35);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(24)('wks');
var uid = __webpack_require__(26);
var Symbol = __webpack_require__(4).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var core = __webpack_require__(0);
var ctx = __webpack_require__(28);
var hide = __webpack_require__(10);
var has = __webpack_require__(9);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(11);
var IE8_DOM_DEFINE = __webpack_require__(49);
var toPrimitive = __webpack_require__(50);
var dP = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(12)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(13);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(44);
var enumBugKeys = __webpack_require__(27);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(5);
var createDesc = __webpack_require__(18);
module.exports = __webpack_require__(6) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(17);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(21);
var defined = __webpack_require__(13);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(24)('keys');
var uid = __webpack_require__(26);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(42), __esModule: true };

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(22);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(15);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var global = __webpack_require__(4);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(25) ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 26 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(48);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(17);
var document = __webpack_require__(4).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(51), __esModule: true };

/***/ }),
/* 31 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(54);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, module) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991,
    MAX_INTEGER = 1.7976931348623157e+308,
    NAN = 0 / 0;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object),
    nativeMax = Math.max;

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  this.__data__ = new ListCache(entries);
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  return this.__data__['delete'](key);
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache) {
    var pairs = cache.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString.call(value);
}

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {boolean} [bitmask] The bitmask of comparison flags.
 *  The bitmask may be composed of the following flags:
 *     1 - Unordered comparison
 *     2 - Partial comparison
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, bitmask, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = getTag(object);
    objTag = objTag == argsTag ? objectTag : objTag;
  }
  if (!othIsArr) {
    othTag = getTag(other);
    othTag = othTag == argsTag ? objectTag : othTag;
  }
  var objIsObj = objTag == objectTag && !isHostObject(object),
      othIsObj = othTag == objectTag && !isHostObject(other),
      isSameTag = objTag == othTag;

  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
  }
  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
}

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
}

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
  };
}

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

/**
 * Creates a `_.find` or `_.findLast` function.
 *
 * @private
 * @param {Function} findIndexFunc The function to find the collection index.
 * @returns {Function} Returns the new find function.
 */
function createFind(findIndexFunc) {
  return function(collection, predicate, fromIndex) {
    var iterable = Object(collection);
    if (!isArrayLike(collection)) {
      var iteratee = baseIteratee(predicate, 3);
      collection = keys(collection);
      predicate = function(key) { return iteratee(iterable[key], key, iterable); };
    }
    var index = findIndexFunc(collection, predicate, fromIndex);
    return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
  };
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!seen.has(othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
              return seen.add(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, customizer, bitmask, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= UNORDERED_COMPARE_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = isKey(path, object) ? [path] : castPath(path);

  var result,
      index = -1,
      length = path.length;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result) {
    return result;
  }
  var length = object ? object.length : 0;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize(function(string) {
  string = toString(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * This method is like `_.find` except that it returns the index of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @static
 * @memberOf _
 * @since 1.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [predicate=_.identity]
 *  The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * _.findIndex(users, function(o) { return o.user == 'barney'; });
 * // => 0
 *
 * // The `_.matches` iteratee shorthand.
 * _.findIndex(users, { 'user': 'fred', 'active': false });
 * // => 1
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findIndex(users, ['active', false]);
 * // => 0
 *
 * // The `_.property` iteratee shorthand.
 * _.findIndex(users, 'active');
 * // => 2
 */
function findIndex(array, predicate, fromIndex) {
  var length = array ? array.length : 0;
  if (!length) {
    return -1;
  }
  var index = fromIndex == null ? 0 : toInteger(fromIndex);
  if (index < 0) {
    index = nativeMax(length + index, 0);
  }
  return baseFindIndex(array, baseIteratee(predicate, 3), index);
}

/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to inspect.
 * @param {Function} [predicate=_.identity]
 *  The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': true },
 *   { 'user': 'fred',    'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1,  'active': true }
 * ];
 *
 * _.find(users, function(o) { return o.age < 40; });
 * // => object for 'barney'
 *
 * // The `_.matches` iteratee shorthand.
 * _.find(users, { 'age': 1, 'active': true });
 * // => object for 'pebbles'
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.find(users, ['active', false]);
 * // => object for 'fred'
 *
 * // The `_.property` iteratee shorthand.
 * _.find(users, 'active');
 * // => object for 'barney'
 */
var find = createFind(findIndex);

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = find;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(57), __webpack_require__(58)(module)))

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(5).f;
var has = __webpack_require__(9);
var TAG = __webpack_require__(1)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./src/index.less
var src = __webpack_require__(36);
var src_default = /*#__PURE__*/__webpack_require__.n(src);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/keys.js
var keys = __webpack_require__(20);
var keys_default = /*#__PURE__*/__webpack_require__.n(keys);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/values.js
var values = __webpack_require__(30);
var values_default = /*#__PURE__*/__webpack_require__.n(values);

// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(32);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/lodash.find/index.js
var lodash_find = __webpack_require__(33);
var lodash_find_default = /*#__PURE__*/__webpack_require__.n(lodash_find);

// CONCATENATED MODULE: ./src/utils.js
function contains(root, target) {
    // root 节点是否包含 target 节点
    var isElement = Object.prototype.toString.call(root).includes('Element') && Object.prototype.toString.call(target).includes('Element');
    if (!isElement) {
        return false;
    }
    var node = target;
    while (node) {
        if (node === root) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

function assert(condition) {
    var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    if (!condition) {
        // throw new Error(`[vue-area-linkage]: ${msg}`);
        // fix #27
        console.error('[vue-area-linkage]: ' + msg);
    }
}

function isArray(param) {
    return Object.prototype.toString.call(param) === '[object Array]';
}

function scrollIntoView(container, target) {
    if (!target) {
        container.scrollTop = 0;
        return;
    }

    // refrence: https://github.com/ElemeFE/element/blob/dev/src/utils/scroll-into-view.js
    var top = target.offsetTop;
    var bottom = target.offsetTop + target.offsetHeight;
    var viewRectTop = container.scrollTop;
    var viewRectBottom = viewRectTop + container.clientHeight;

    if (top < viewRectTop) {
        container.scrollTop = top;
    } else if (bottom > viewRectBottom) {
        container.scrollTop = bottom - container.clientHeight;
    }
}

function setPanelPosition(panelHeight, wrapRect) {
    var wrapHeight = wrapRect.height;
    var wrapTop = wrapRect.top;

    var docHeight = document.documentElement.clientHeight;
    var panelDefTop = wrapTop + wrapHeight;

    var diff = docHeight - panelDefTop;
    if (diff < panelHeight) {
        if (wrapTop > panelHeight) {
            return -(panelHeight + 10);
        } else {
            return diff - panelHeight;
        }
    } else {
        return wrapHeight;
    }
}


// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./components/area-select/select/index.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var area_select_select = ({
    provide: function provide() {
        return {
            'select': this
        };
    },

    props: {
        value: {
            type: [String, Number, Boolean]
        },
        disabled: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: '请选择'
        },
        icon: {
            type: String,
            default: 'area-select-icon'
        },
        size: {
            type: String,
            default: 'medium',
            validator: function validator(val) {
                return ['small', 'medium', 'large'].indexOf(val) > -1;
            }
        }
    },

    data: function data() {
        return {
            shown: false,
            options: [],
            label: '',
            val: '',

            areaRect: null,
            top: 32
        };
    },


    watch: {
        value: function value(val) {
            this.setDef();
        },
        options: function options(val) {
            this.setDef();
        }
    },

    methods: {
        setDef: function setDef() {
            var _this = this;

            if (this.value) {
                var option = this.options.filter(function (opt) {
                    return opt.value === _this.value;
                });
                this.label = option[0] ? option[0].label : '';
                this.val = option[0] ? option[0].value : '';
            } else {
                this.label = '';
                this.val = '';
            }
        },
        handleTriggerClick: function handleTriggerClick() {
            if (this.disabled) {
                return;
            }
            this.shown = !this.shown;
        },
        setPosition: function setPosition() {
            var panelHeight = parseInt(window.getComputedStyle(this.$refs.wrap, null).getPropertyValue('height'));
            this.top = setPanelPosition(panelHeight, this.areaRect);
        },
        handleDocClick: function handleDocClick(e) {
            var target = e.target;
            if (!contains(this.$el, target) && this.shown) {
                this.shown = false;
            }
        },
        handleDocResize: function handleDocResize() {
            var _this2 = this;

            this.areaRect = this.$refs.area.getBoundingClientRect();
            this.$nextTick(function () {
                _this2.setPosition();
            });
        },
        setSelectedValue: function setSelectedValue(option) {
            this.label = option.label;
            this.val = option.value;
            this.$emit('input', option.value);
            this.shown = false;
            this.$emit('change', option.value);
        },
        scrollToSelectedOption: function scrollToSelectedOption() {
            var _this3 = this;

            this.setPosition();
            var seletedOption = this.options.filter(function (option) {
                return option.value === _this3.val;
            });
            if (seletedOption.length) {
                var target = seletedOption[0].$el;
                var container = this.$el.querySelector('.area-selectable-list-wrap');

                scrollIntoView(container, target);
            }
        },
        handleListEnter: function handleListEnter() {
            var _this4 = this;

            this.$nextTick(function () {
                return _this4.scrollToSelectedOption();
            });
        }
    },

    mounted: function mounted() {
        var _this5 = this;

        this.areaRect = this.$refs.area.getBoundingClientRect();
        this.top = this.areaRect.height;
        window.document.addEventListener('scroll', this.handleDocResize, false);
        window.addEventListener('resize', this.handleDocResize, false);

        window.document.addEventListener('click', this.handleDocClick, false);
        this.$nextTick(function () {
            _this5.setDef();
        });
    },
    beforeDestroy: function beforeDestroy() {
        window.document.removeEventListener('scroll', this.handleDocResize, false);
        window.removeEventListener('resize', this.handleDocResize, false);

        window.document.removeEventListener('click', this.handleDocClick, false);
    }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-46d7a82d","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./components/area-select/select/index.vue
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      ref: "area",
      staticClass: "area-select",
      class: {
        medium: _vm.size === "medium",
        small: _vm.size === "small",
        large: _vm.size === "large",
        "is-disabled": _vm.disabled
      }
    },
    [
      _c(
        "span",
        {
          ref: "trigger",
          staticClass: "area-selected-trigger",
          on: { click: _vm.handleTriggerClick }
        },
        [_vm._v(_vm._s(_vm.label ? _vm.label : _vm.placeholder))]
      ),
      _vm._v(" "),
      _c("i", {
        class: [_vm.icon, { active: _vm.shown }],
        on: {
          click: function($event) {
            $event.stopPropagation()
            return _vm.handleTriggerClick($event)
          }
        }
      }),
      _vm._v(" "),
      _c(
        "transition",
        {
          attrs: { name: "area-zoom-in-top" },
          on: { "before-enter": _vm.handleListEnter }
        },
        [
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.shown,
                  expression: "shown"
                }
              ],
              ref: "wrap",
              staticClass: "area-selectable-list-wrap",
              style: { top: _vm.top + "px" }
            },
            [
              _c(
                "ul",
                { staticClass: "area-selectable-list" },
                [_vm._t("default")],
                2
              )
            ]
          )
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var selectortype_template_index_0_components_area_select_select = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-46d7a82d", esExports)
  }
}
// CONCATENATED MODULE: ./components/area-select/select/index.vue
var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  area_select_select,
  selectortype_template_index_0_components_area_select_select,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components/area-select/select/index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-46d7a82d", Component.options)
  } else {
    hotAPI.reload("data-v-46d7a82d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ var components_area_select_select = (Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./components/area-select/select/option.vue
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var select_option = ({
    inject: ['select'],
    props: {
        value: {
            type: [String, Number, Boolean],
            required: true
        },
        label: [String, Number]
    },

    data: function data() {
        return {
            hover: false,
            isSelected: false
        };
    },


    computed: {
        curSelected: function curSelected() {
            return this.select.val;
        }
    },

    methods: {
        leaveItem: function leaveItem() {
            this.hover = false;
        },
        hoverItem: function hoverItem() {
            this.hover = true;
        },
        selectOptionClick: function selectOptionClick() {
            this.select.setSelectedValue(this);
        }
    },

    created: function created() {
        this.select.options.push(this);
    }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-87d7a9ac","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./components/area-select/select/option.vue
var option_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "li",
    {
      class: [
        "area-select-option",
        {
          hover: _vm.hover,
          selected: _vm.curSelected === _vm.value
        }
      ],
      attrs: { value: _vm.value },
      on: {
        click: function($event) {
          $event.stopPropagation()
          return _vm.selectOptionClick($event)
        },
        mouseleave: _vm.leaveItem,
        mouseenter: _vm.hoverItem
      }
    },
    [_vm._v("\n    " + _vm._s(_vm.label) + "\n")]
  )
}
var option_staticRenderFns = []
option_render._withStripped = true
var option_esExports = { render: option_render, staticRenderFns: option_staticRenderFns }
/* harmony default export */ var area_select_select_option = (option_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-87d7a9ac", option_esExports)
  }
}
// CONCATENATED MODULE: ./components/area-select/select/option.vue
var option_disposed = false
var option_normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var option___vue_template_functional__ = false
/* styles */
var option___vue_styles__ = null
/* scopeId */
var option___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var option___vue_module_identifier__ = null
var option_Component = option_normalizeComponent(
  select_option,
  area_select_select_option,
  option___vue_template_functional__,
  option___vue_styles__,
  option___vue_scopeId__,
  option___vue_module_identifier__
)
option_Component.options.__file = "components/area-select/select/option.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-87d7a9ac", option_Component.options)
  } else {
    hotAPI.reload("data-v-87d7a9ac", option_Component.options)
  }
  module.hot.dispose(function (data) {
    option_disposed = true
  })
})()}

/* harmony default export */ var components_area_select_select_option = (option_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./components/area-select/index.vue



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ var area_select = ({
    name: 'area-select',
    components: {
        'v-select': components_area_select_select,
        'v-option': components_area_select_select_option
    },
    props: {
        value: {
            type: Array,
            required: true
        },
        type: {
            type: String,
            default: 'code', //  code-返回行政区域代码 text-返回文本 all-返回 code 和 text
            validator: function validator(val) {
                return ['all', 'code', 'text'].indexOf(val) > -1;
            }
        },
        placeholders: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        level: {
            type: Number,
            default: 1, // 0-->一联 1->二联 2->三联
            validator: function validator(val) {
                return [0, 1, 2].indexOf(val) > -1;
            }
        },
        size: {
            type: String,
            default: 'medium',
            validator: function validator(val) {
                return ['small', 'medium', 'large'].indexOf(val) > -1;
            }
        },
        disabled: {
            type: Boolean,
            default: false
        },

        data: {
            type: Object,
            required: true
        },
        disableLinkage: {
            type: Boolean,
            default: false
        }
    },

    data: function data() {
        if (!this.data || !this.data['86']) {
            throw new Error('[vue-area-linkage]: 需要提供地区数据，格式参考见：https://github.com/dwqs/area-data');
        }

        return {
            // 区域数据
            provinces: this.data['86'],
            citys: {},
            areas: {},

            curProvince: '', // text
            curProvinceCode: '', // code
            curCity: '',
            curCityCode: '',
            curArea: '',
            curAreaCode: '',

            // 设置默认值的判断
            defaults: [],
            isCode: false,
            isSetDefault: false
        };
    },


    watch: {
        curProvinceCode: function curProvinceCode(val, oldVal) {
            this.curProvince = this.provinces[val];
            this.provinceChange(val, oldVal === val);
        },
        curCityCode: function curCityCode(val, oldVal) {
            this.curCity = this.citys[val];
            this.cityChange(val, oldVal === val);
        },
        curAreaCode: function curAreaCode(val, oldVal) {
            this.curArea = this.areas[val];
            this.areaChange(val, oldVal === val);
        },
        value: function value(val) {
            if (!this.isSetDefault && isArray(val) && val.length === this.level + 1) {
                this.beforeSetDefault();
                this.setDefaultValue();
            }

            if (!this.isSetDefault && isArray(val) && val.length && val.length !== this.level + 1) {
                assert(false, '\u8BBE\u7F6E\u7684\u9ED8\u8BA4\u503C\u548C level \u503C\u4E0D\u5339\u914D');
            }
        }
    },

    methods: {
        provinceChange: function provinceChange(val, isEqual) {
            var _this = this;

            if (this.level === 0) {
                this.selectChange();
            } else if (this.level >= 1) {
                this.citys = this.data[val];
                if (!this.citys) {
                    this.citys = defineProperty_default()({}, this.curProvinceCode, this.curProvince);
                    if (!this.disableLinkage) {
                        this.curCity = this.curProvince;
                        this.curCityCode = this.curCityCode;
                    }
                    return;
                }

                var curCity = values_default()(this.citys)[0];
                var curCityCode = keys_default()(this.citys)[0];

                if (this.defaults[1]) {
                    if (this.isCode) {
                        curCityCode = lodash_find_default()(keys_default()(this.citys), function (item) {
                            return item === _this.defaults[1];
                        });
                        assert(curCityCode, '\u57CE\u5E02 ' + this.defaults[1] + ' \u4E0D\u5B58\u5728\u4E8E\u7701\u4EFD ' + this.defaults[0] + ' \u4E2D');
                        curCity = this.citys[curCityCode];
                    } else {
                        curCity = lodash_find_default()(this.citys, function (item) {
                            return item === _this.defaults[1];
                        });
                        assert(curCity, '\u57CE\u5E02 ' + this.defaults[1] + ' \u4E0D\u5B58\u5728\u4E8E\u7701\u4EFD ' + this.defaults[0] + ' \u4E2D');
                        curCityCode = lodash_find_default()(keys_default()(this.citys), function (item) {
                            return _this.citys[item] === _this.defaults[1];
                        });
                    }
                }

                if (!this.disableLinkage) {
                    this.curCity = curCity;
                    this.curCityCode = curCityCode;
                } else if (!isEqual) {
                    this.curCity = '';
                    this.curCityCode = '';
                    this.curArea = '';
                    this.curAreaCode = '';
                    this.selectChange();
                }
            }
        },
        cityChange: function cityChange(val, isEqual) {
            var _this2 = this;

            if (this.level === 1) {
                this.selectChange();
            } else if (this.level === 2) {
                this.areas = this.data[val];
                if (!this.areas) {
                    // fix 市级下不存在城区(#7)
                    this.areas = defineProperty_default()({}, this.curCityCode, this.curCity);
                    if (!this.disableLinkage) {
                        this.curArea = this.curCity;
                        this.curAreaCode = this.curCityCode;
                    }
                    return;
                }

                var curArea = values_default()(this.areas)[0];
                var curAreaCode = keys_default()(this.areas)[0];

                if (this.defaults[2]) {
                    if (this.isCode) {
                        curAreaCode = lodash_find_default()(keys_default()(this.areas), function (item) {
                            return item === _this2.defaults[2];
                        });
                        assert(curAreaCode, '\u53BF\u533A ' + this.defaults[2] + ' \u4E0D\u5B58\u5728\u4E8E\u57CE\u5E02 ' + this.defaults[1] + ' \u4E2D');
                        curArea = this.areas[curAreaCode];
                    } else {
                        curArea = lodash_find_default()(this.areas, function (item) {
                            return item === _this2.defaults[2];
                        });
                        assert(curArea, '\u53BF\u533A ' + this.defaults[2] + ' \u4E0D\u5B58\u5728\u4E8E\u57CE\u5E02 ' + this.defaults[1] + ' \u4E2D');
                        curAreaCode = lodash_find_default()(keys_default()(this.areas), function (item) {
                            return _this2.areas[item] === _this2.defaults[2];
                        });
                    }
                }

                if (!this.disableLinkage) {
                    this.curArea = curArea;
                    this.curAreaCode = curAreaCode;
                } else if (!isEqual) {
                    this.curArea = '';
                    this.curAreaCode = '';
                    this.selectChange();
                }
            }
        },
        areaChange: function areaChange(val) {
            this.curAreaCode = val;
            this.selectChange();
        },
        getAreaCode: function getAreaCode() {
            var codes = [];

            switch (this.level) {
                case 0:
                    codes = [this.curProvinceCode];
                    break;
                case 1:
                    codes = [this.curProvinceCode, this.curCityCode];
                    break;
                case 2:
                    // fix #32 710000是台湾省
                    codes = [this.curProvinceCode, this.curProvinceCode === '710000' ? this.curProvinceCode : this.curCityCode, this.curAreaCode];
                    break;
            }

            return codes;
        },
        getAreaText: function getAreaText() {
            var texts = [];

            switch (this.level) {
                case 0:
                    texts = [this.curProvince];
                    break;
                case 1:
                    // fix #32 710000是台湾省
                    texts = [this.curProvince, this.curProvinceCode === '710000' ? this.curProvince : this.curCity];
                    break;
                case 2:
                    texts = [this.curProvince, this.curProvinceCode === '710000' ? this.curProvince : this.curCity, this.curArea];
                    break;
            }

            return texts;
        },
        getAreaCodeAndText: function getAreaCodeAndText(selected) {
            var textCodes = [];

            switch (this.level) {
                case 0:
                    textCodes = [defineProperty_default()({}, this.curProvinceCode, this.curProvince)];
                    break;
                case 1:

                    textCodes = [defineProperty_default()({}, this.curProvinceCode, this.curProvince), defineProperty_default()({}, this.curCityCode, this.curCity)];
                    break;
                case 2:
                    var cityCode = this.curProvinceCode === '710000' ? this.curProvinceCode : this.curCityCode;
                    var cityText = this.curProvinceCode === '710000' ? this.curProvince : this.curCity;
                    textCodes = [defineProperty_default()({}, this.curProvinceCode, this.curProvince), defineProperty_default()({}, cityCode, cityText), defineProperty_default()({}, this.curAreaCode, this.curArea)];
                    break;
            }

            return textCodes;
        },
        beforeSetDefault: function beforeSetDefault() {
            var chinese = /^[\u4E00-\u9FA5\uF900-\uFA2D]{2,}$/;
            var num = /^\d{6,}$/;
            var isCode = num.test(this.value[0]);
            var isValid = void 0;

            if (!isCode) {
                isValid = this.value.every(function (item) {
                    return chinese.test(item);
                });
            } else {
                isValid = this.value.every(function (item) {
                    return num.test(item);
                });
            }

            assert(isValid, '传入的默认值参数有误');
            // 映射默认值，避免直接更改props
            this.defaults = [].concat(this.value);
            this.isCode = isCode;
            this.isSetDefault = true;
        },
        setDefaultValue: function setDefaultValue() {
            var _this3 = this;

            var provinceCode = '';

            if (this.isCode) {
                provinceCode = this.defaults[0];
            } else {
                var province = lodash_find_default()(this.provinces, function (item) {
                    return item === _this3.defaults[0];
                });
                assert(province, '\u7701\u4EFD ' + this.defaults[0] + ' \u4E0D\u5B58\u5728');
                provinceCode = lodash_find_default()(keys_default()(this.provinces), function (item) {
                    return _this3.provinces[item] === _this3.defaults[0];
                });
            }
            this.curProvinceCode = provinceCode;
            // 还原默认值，避免用户选择出错
            this.$nextTick(function () {
                _this3.defaults = [];
                // this.isCode = false;
                _this3.isSetDefault = false;
            });
        },
        selectChange: function selectChange() {
            this.isSetDefault = true;
            var res = [];

            if (this.type === 'code') {
                res = this.getAreaCode();
            } else if (this.type === 'text') {
                res = this.getAreaText();
            } else if (this.type === 'all') {
                res = this.getAreaCodeAndText();
            }
            this.$emit('input', res);
            this.$emit('change', res);
        }
    },

    created: function created() {
        if (isArray(this.value) && this.value.length === this.level + 1) {
            this.beforeSetDefault();
            this.setDefaultValue();
        }

        if (isArray(this.value) && this.value.length && this.value.length !== this.level + 1) {
            assert(false, '\u8BBE\u7F6E\u7684\u9ED8\u8BA4\u503C\u548C level \u503C\u4E0D\u5339\u914D');
        }
    }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-d41a8fd8","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./components/area-select/index.vue
var area_select_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "area-select-wrap" },
    [
      _c(
        "v-select",
        {
          attrs: {
            placeholder: _vm.placeholders[0] ? _vm.placeholders[0] : "请选择",
            size: _vm.size,
            disabled: _vm.disabled
          },
          model: {
            value: _vm.curProvinceCode,
            callback: function($$v) {
              _vm.curProvinceCode = $$v
            },
            expression: "curProvinceCode"
          }
        },
        _vm._l(_vm.provinces, function(val, key) {
          return _c("v-option", { key: key, attrs: { label: val, value: key } })
        })
      ),
      _vm._v(" "),
      _vm.level >= 1
        ? _c(
            "v-select",
            {
              attrs: {
                placeholder: _vm.placeholders[1]
                  ? _vm.placeholders[1]
                  : "请选择",
                size: _vm.size,
                disabled: _vm.disabled
              },
              model: {
                value: _vm.curCityCode,
                callback: function($$v) {
                  _vm.curCityCode = $$v
                },
                expression: "curCityCode"
              }
            },
            [
              !Object.keys(_vm.citys).length
                ? _c("p", { staticClass: "area-select-empty" }, [
                    _vm._v("暂无数据")
                  ])
                : _vm._l(_vm.citys, function(val, key) {
                    return _c("v-option", {
                      key: key,
                      attrs: { label: val, value: key }
                    })
                  })
            ],
            2
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.level >= 2
        ? _c(
            "v-select",
            {
              attrs: {
                placeholder: _vm.placeholders[2]
                  ? _vm.placeholders[2]
                  : "请选择",
                size: _vm.size,
                disabled: _vm.disabled
              },
              model: {
                value: _vm.curAreaCode,
                callback: function($$v) {
                  _vm.curAreaCode = $$v
                },
                expression: "curAreaCode"
              }
            },
            [
              !Object.keys(_vm.areas).length
                ? _c("p", { staticClass: "area-select-empty" }, [
                    _vm._v("暂无数据")
                  ])
                : _vm._l(_vm.areas, function(val, key) {
                    return _c("v-option", {
                      key: key,
                      attrs: { label: val, value: key }
                    })
                  })
            ],
            2
          )
        : _vm._e()
    ],
    1
  )
}
var area_select_staticRenderFns = []
area_select_render._withStripped = true
var area_select_esExports = { render: area_select_render, staticRenderFns: area_select_staticRenderFns }
/* harmony default export */ var selectortype_template_index_0_components_area_select = (area_select_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-d41a8fd8", area_select_esExports)
  }
}
// CONCATENATED MODULE: ./components/area-select/index.vue
var area_select_disposed = false
function injectStyle (ssrContext) {
  if (area_select_disposed) return
  __webpack_require__(38)
}
var area_select_normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var area_select___vue_template_functional__ = false
/* styles */
var area_select___vue_styles__ = injectStyle
/* scopeId */
var area_select___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var area_select___vue_module_identifier__ = null
var area_select_Component = area_select_normalizeComponent(
  area_select,
  selectortype_template_index_0_components_area_select,
  area_select___vue_template_functional__,
  area_select___vue_styles__,
  area_select___vue_scopeId__,
  area_select___vue_module_identifier__
)
area_select_Component.options.__file = "components/area-select/index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d41a8fd8", area_select_Component.options)
  } else {
    hotAPI.reload("data-v-d41a8fd8", area_select_Component.options)
  }
  module.hot.dispose(function (data) {
    area_select_disposed = true
  })
})()}

/* harmony default export */ var components_area_select = (area_select_Component.exports);

// CONCATENATED MODULE: ./src/bus.js
var Bus = {
    _Vue: null,
    createEventBus: function createEventBus() {
        return new this._Vue();
    },
    saveVueRef: function saveVueRef(Vue) {
        this._Vue = Vue;
    }
};

/* harmony default export */ var bus = (Bus);
// CONCATENATED MODULE: ./components/area-cascader/mixins/emitter.js
function _broadcast(componentName, eventName, params) {
    this.$children.forEach(function (child) {
        var name = child.$options.name;

        if (name === componentName) {
            child.$emit.apply(child, [eventName].concat(params));
        } else {
            _broadcast.apply(child, [componentName, eventName].concat([params]));
        }
    });
}
/* harmony default export */ var emitter = ({
    methods: {
        // dispatch (componentName, eventName, params) {
        //     let parent = this.$parent || this.$root;
        //     let name = parent.$options.name;

        //     while (parent && (!name || name !== componentName)) {
        //         parent = parent.$parent;

        //         if (parent) {
        //             name = parent.$options.name;
        //         }
        //     }
        //     if (parent) {
        //         parent.$emit.apply(parent, [eventName].concat(params));
        //     }
        // },
        broadcast: function broadcast(componentName, eventName, params) {
            _broadcast.call(this, componentName, eventName, params);
        }
    }
});
// EXTERNAL MODULE: ./node_modules/babel-runtime/helpers/toConsumableArray.js
var toConsumableArray = __webpack_require__(59);
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray);

// EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/assign.js
var object_assign = __webpack_require__(78);
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./components/area-cascader/cascader/caspanel.vue


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




var key = 0;

/* harmony default export */ var caspanel = ({
    name: 'Caspanel',
    inject: ['cascader'],
    mixins: [emitter],

    props: {
        data: {
            type: Array,
            default: function _default() {
                return [];
            }
        }
    },

    data: function data() {
        return {
            sublist: [],
            val: '', // 当前选中的值
            list: null
        };
    },


    watch: {
        data: function data() {
            this.sublist = [];
        }
    },

    methods: {
        getUniqueKey: function getUniqueKey() {
            return key++;
        },
        getBaseItem: function getBaseItem(item) {
            var backItem = assign_default()({}, item);
            if (backItem.children) {
                delete backItem.children;
            }
            return backItem;
        },
        handleClickItem: function handleClickItem(item) {
            this.cascader.handleMenuItemClick(item);
            if (!item.children) {
                this.sublist = [];
                this.cascader.eventBus.$emit('selected');
            } else {
                this.sublist = [].concat(item.children);
            }
        },
        triggerItem: function triggerItem(item, from) {
            var base = this.getBaseItem(item);
            this.cascader.handleMenuItemClick(item);

            if (!item.children) {
                this.sublist = [];
                this.cascader.eventBus.$emit('selected');
            } else {
                this.sublist = [].concat(item.children);
            }
        },
        initCaspanel: function initCaspanel(params) {
            var _this = this;

            var val = params.value;
            var value = [].concat(toConsumableArray_default()(val));

            for (var i = 0; i < value.length; i++) {
                for (var j = 0; j < this.data.length; j++) {
                    if (value[i] === this.data[j].value) {
                        this.triggerItem(this.data[j], params.from);
                        this.val = value[i];
                        value.splice(0, 1);
                        this.$nextTick(function () {
                            _this.broadcast('Caspanel', 'update-selected', {
                                value: value
                            });
                        });
                        break;
                    }
                }
            }
        },
        scrollToSelectedOption: function scrollToSelectedOption() {
            var _this2 = this;

            if (!this.list) {
                this.list = this.$refs.list;
            }
            var seletedOption = this.data.filter(function (item) {
                return item.value === _this2.val;
            });
            if (seletedOption.length) {
                var target = this.list.querySelector('.selected');
                scrollIntoView(this.list, target);
            }
        }
    },

    mounted: function mounted() {
        // 保存 ul
        this.list = this.$refs.list;
        // 根据 value 初始化选择数据
        this.$on('update-selected', this.initCaspanel);
        this.cascader.eventBus.$on('set-scroll-top', this.scrollToSelectedOption);
    }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-674f29c4","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./components/area-cascader/cascader/caspanel.vue
var caspanel_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "span",
    [
      _c(
        "ul",
        { ref: "list", staticClass: "cascader-menu-list" },
        _vm._l(_vm.data, function(item, index) {
          return _c(
            "li",
            {
              key: _vm.getUniqueKey(index),
              class: {
                "cascader-menu-option": true,
                "cascader-menu-extensible": item["children"],
                selected: _vm.cascader.activeValues.includes(item.value) //cascader.useTmp ? cascader.tmpVals.includes(item.value) : cascader.vals.includes(item.value)
              },
              on: {
                click: function($event) {
                  $event.stopPropagation()
                  _vm.handleClickItem(item)
                }
              }
            },
            [_vm._v("\n            " + _vm._s(item.label) + "\n        ")]
          )
        })
      ),
      _vm._v(" "),
      _vm.sublist && _vm.sublist.length
        ? _c("caspanel", { attrs: { data: _vm.sublist } })
        : _vm._e()
    ],
    1
  )
}
var caspanel_staticRenderFns = []
caspanel_render._withStripped = true
var caspanel_esExports = { render: caspanel_render, staticRenderFns: caspanel_staticRenderFns }
/* harmony default export */ var cascader_caspanel = (caspanel_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-674f29c4", caspanel_esExports)
  }
}
// CONCATENATED MODULE: ./components/area-cascader/cascader/caspanel.vue
var caspanel_disposed = false
var caspanel_normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var caspanel___vue_template_functional__ = false
/* styles */
var caspanel___vue_styles__ = null
/* scopeId */
var caspanel___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var caspanel___vue_module_identifier__ = null
var caspanel_Component = caspanel_normalizeComponent(
  caspanel,
  cascader_caspanel,
  caspanel___vue_template_functional__,
  caspanel___vue_styles__,
  caspanel___vue_scopeId__,
  caspanel___vue_module_identifier__
)
caspanel_Component.options.__file = "components/area-cascader/cascader/caspanel.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-674f29c4", caspanel_Component.options)
  } else {
    hotAPI.reload("data-v-674f29c4", caspanel_Component.options)
  }
  module.hot.dispose(function (data) {
    caspanel_disposed = true
  })
})()}

/* harmony default export */ var area_cascader_cascader_caspanel = (caspanel_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./components/area-cascader/cascader/index.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ var cascader = ({
    provide: function provide() {
        return {
            'cascader': this
        };
    },

    mixins: [emitter],
    props: {
        options: {
            type: Array,
            required: true
        },

        data: {
            type: Object,
            required: true
        },

        defaultsAreaCodes: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        disabled: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: '请选择'
        },
        size: {
            type: String,
            default: 'medium',
            validator: function validator(val) {
                return ['small', 'medium', 'large'].indexOf(val) > -1;
            }
        },
        icon: {
            type: String,
            default: 'area-select-icon'
        },
        separator: {
            type: String,
            default: '/'
        }
    },

    components: {
        'caspanel': area_cascader_cascader_caspanel
    },

    data: function data() {
        return {
            // 计算位置
            areaRect: null,
            top: 32,

            shown: false,
            eventBus: null,
            activeValues: [], // 当前激活项
            values: [], // 当前选择项
            labels: [], // 地区的文本
            label: '',
            isClickOutSide: false
        };
    },


    watch: {
        defaultsAreaCodes: function defaultsAreaCodes(val) {
            val.length && this.initValue();
        }
    },

    methods: {
        initValue: function initValue() {
            this.broadcast('Caspanel', 'update-selected', {
                value: this.defaultsAreaCodes
            });
            this.values = [].concat(this.defaultsAreaCodes);
        },
        getActiveLabels: function getActiveLabels(codes) {
            var provinces = this.data['86'];
            var citys = this.data[codes[0]];
            var l = codes.length;

            if (l < 2) {
                return [];
            }

            var labels = [];

            if (l === 2) {
                labels = [provinces[codes[0]], citys[codes[1]]];
            } else if (l === 3) {
                // fix #7
                var areas = this.data[codes[1]];
                labels = [provinces[codes[0]], citys[codes[1]], areas ? areas[codes[2]] : citys[codes[2]]];
            }

            return labels;
        },
        resetActiveVal: function resetActiveVal() {
            this.activeValues = [].concat(this.values);
            this.labels = this.getActiveLabels(this.values);
            if (!this.shown && this.values.length) {
                this.broadcast('Caspanel', 'update-selected', {
                    value: this.values
                });
            }
        },
        handleTriggerClick: function handleTriggerClick() {
            if (this.disabled) {
                return;
            }
            this.$emit('set-default');
            var tmp = this.shown;
            this.shown = !this.shown;

            if (!tmp) {
                this.isClickOutSide = false;
            } else {
                this.isClickOutSide = true;
                this.resetActiveVal();
            }
        },
        setPosition: function setPosition() {
            var panelHeight = parseInt(window.getComputedStyle(this.$refs.wrap, null).getPropertyValue('height'));
            this.top = setPanelPosition(panelHeight, this.areaRect);
        },
        handleDocClick: function handleDocClick(e) {
            var target = e.target;
            if (!contains(this.$el, target) && this.shown) {
                this.shown = false;
                this.isClickOutSide = true;
                this.resetActiveVal();
            }
        },
        handleDocResize: function handleDocResize() {
            var _this = this;

            this.areaRect = this.$refs.area.getBoundingClientRect();
            this.$nextTick(function () {
                _this.setPosition();
            });
        },
        handleMenuItemClick: function handleMenuItemClick(item, oldItem) {
            var label = item.label,
                value = item.value,
                children = item.children,
                panelIndex = item.panelIndex;


            var activeValues = this.activeValues;
            var labels = this.labels;

            activeValues = activeValues.slice(0, panelIndex + 1);
            activeValues[panelIndex] = value;
            labels = labels.slice(0, panelIndex + 1);
            labels[panelIndex] = label;

            this.activeValues = [].concat(activeValues);
            this.labels = [].concat(labels);
        },
        handleSelectedChange: function handleSelectedChange() {
            this.shown = false;
            this.values = [].concat(this.activeValues);
            this.label = this.labels.join(this.separator);
            if (!this.isClickOutSide) {
                this.$emit('change', this.values, this.labels);
            }
        },
        handleListEnter: function handleListEnter() {
            var _this2 = this;

            this.$nextTick(function () {
                _this2.setPosition();
                _this2.eventBus.$emit('set-scroll-top');
            });
        }
    },

    created: function created() {
        if (!bus._Vue) {
            throw new Error('[area-cascader]: Must be call Vue.use(VueAreaLinkage) before used');
        }
        this.eventBus = bus.createEventBus();
        this.eventBus.$on('selected', this.handleSelectedChange);
    },
    mounted: function mounted() {
        this.areaRect = this.$refs.area.getBoundingClientRect();
        this.top = this.areaRect.height;

        window.document.addEventListener('scroll', this.handleDocResize, false);
        window.addEventListener('resize', this.handleDocResize, false);
        window.document.addEventListener('click', this.handleDocClick, false);

        if (this.defaultsAreaCodes && this.defaultsAreaCodes.length) {
            this.initValue();
        }
    },
    beforeDestroy: function beforeDestroy() {
        window.document.removeEventListener('scroll', this.handleDocResize, false);
        window.removeEventListener('resize', this.handleDocResize, false);
        window.document.removeEventListener('click', this.handleDocClick, false);
    }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-2f7dcfa6","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./components/area-cascader/cascader/index.vue
var cascader_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      ref: "area",
      staticClass: "area-select",
      class: {
        medium: _vm.size === "medium",
        small: _vm.size === "small",
        large: _vm.size === "large",
        "is-disabled": _vm.disabled
      }
    },
    [
      _c(
        "span",
        {
          ref: "trigger",
          staticClass: "area-selected-trigger",
          on: {
            click: function($event) {
              $event.stopPropagation()
              return _vm.handleTriggerClick($event)
            }
          }
        },
        [_vm._v(_vm._s(_vm.label ? _vm.label : _vm.placeholder))]
      ),
      _vm._v(" "),
      _c("i", {
        class: [_vm.icon, { active: _vm.shown }],
        on: {
          click: function($event) {
            $event.stopPropagation()
            return _vm.handleTriggerClick($event)
          }
        }
      }),
      _vm._v(" "),
      _c(
        "transition",
        {
          attrs: { name: "area-zoom-in-top" },
          on: { "before-enter": _vm.handleListEnter }
        },
        [
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.shown,
                  expression: "shown"
                }
              ],
              ref: "wrap",
              staticClass: "cascader-menu-list-wrap",
              style: { top: _vm.top + "px" }
            },
            [_c("caspanel", { attrs: { data: _vm.options } })],
            1
          )
        ]
      )
    ],
    1
  )
}
var cascader_staticRenderFns = []
cascader_render._withStripped = true
var cascader_esExports = { render: cascader_render, staticRenderFns: cascader_staticRenderFns }
/* harmony default export */ var area_cascader_cascader = (cascader_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2f7dcfa6", cascader_esExports)
  }
}
// CONCATENATED MODULE: ./components/area-cascader/cascader/index.vue
var cascader_disposed = false
var cascader_normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var cascader___vue_template_functional__ = false
/* styles */
var cascader___vue_styles__ = null
/* scopeId */
var cascader___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var cascader___vue_module_identifier__ = null
var cascader_Component = cascader_normalizeComponent(
  cascader,
  area_cascader_cascader,
  cascader___vue_template_functional__,
  cascader___vue_styles__,
  cascader___vue_scopeId__,
  cascader___vue_module_identifier__
)
cascader_Component.options.__file = "components/area-cascader/cascader/index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2f7dcfa6", cascader_Component.options)
  } else {
    hotAPI.reload("data-v-2f7dcfa6", cascader_Component.options)
  }
  module.hot.dispose(function (data) {
    cascader_disposed = true
  })
})()}

/* harmony default export */ var components_area_cascader_cascader = (cascader_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./components/area-cascader/index.vue



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ var area_cascader = ({
    name: 'area-cascader',
    components: {
        'v-cascader': components_area_cascader_cascader
    },
    props: {
        value: {
            required: true
        },
        placeholder: {
            type: String,
            default: '请选择'
        },
        type: {
            type: String,
            default: 'code', //  code-返回行政区域代码 text-返回文本 all-返回 code 和 text
            validator: function validator(val) {
                return ['all', 'code', 'text'].indexOf(val) > -1;
            }
        },
        level: {
            type: Number,
            default: 0, // 0->二联 1->三联
            validator: function validator(val) {
                return [0, 1].indexOf(val) > -1;
            }
        },
        size: {
            type: String,
            default: 'large',
            validator: function validator(val) {
                return ['small', 'medium', 'large'].indexOf(val) > -1;
            }
        },
        separator: {
            type: String,
            default: '/'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object,
            required: true
        }
    },

    data: function data() {
        if (!this.data || !this.data['86']) {
            throw new Error('[vue-area-linkage]: 需要提供地区数据：https://github.com/dwqs/area-data');
        }
        return {
            provinces: this.data['86'],
            citys: {},
            areas: {},
            // only array
            options: [],

            curProvince: '', // text
            curProvinceCode: '', // code
            curCity: '',
            curCityCode: '',
            curArea: '',
            curAreaCode: '',

            // 设置默认值的判断
            defaultsAreaCodes: [], // 默认值对应的 code
            defaults: [],
            isCode: false,
            isSetDefault: false
        };
    },


    watch: {
        value: function value(val) {
            if (!this.isSetDefault && isArray(val) && val.length === this.level + 2) {
                this.beforeSetDefault();
                this.setDefaultValue();
            }

            if (!this.isSetDefault && isArray(val) && val.length && val.length !== this.level + 2) {
                assert(false, '\u8BBE\u7F6E\u7684\u9ED8\u8BA4\u503C\u548C level \u503C\u4E0D\u5339\u914D');
            }
        },
        curProvinceCode: function curProvinceCode(val) {
            var _this = this;

            this.curProvince = this.provinces[val];
            this.citys = this.data[val];

            if (!this.citys) {
                this.citys = defineProperty_default()({}, this.curProvinceCode, this.curProvince);
                this.curCity = this.curProvince;
                this.curCityCode = this.curCityCode;
                return;
            }

            var curCity = values_default()(this.citys)[0];
            var curCityCode = keys_default()(this.citys)[0];

            if (this.defaults[1]) {
                if (this.isCode) {
                    curCityCode = lodash_find_default()(keys_default()(this.citys), function (item) {
                        return item === _this.defaults[1];
                    });
                    assert(curCityCode, '\u57CE\u5E02 ' + this.defaults[1] + ' \u4E0D\u5B58\u5728\u4E8E\u7701\u4EFD ' + this.defaults[0] + ' \u4E2D');
                    curCity = this.citys[curCityCode];
                } else {
                    curCity = lodash_find_default()(this.citys, function (item) {
                        return item === _this.defaults[1];
                    });
                    assert(curCity, '\u57CE\u5E02 ' + this.defaults[1] + ' \u4E0D\u5B58\u5728\u4E8E\u7701\u4EFD ' + this.defaults[0] + ' \u4E2D');
                    curCityCode = lodash_find_default()(keys_default()(this.citys), function (item) {
                        return _this.citys[item] === _this.defaults[1];
                    });
                }
            }

            this.curCity = curCity;
            this.curCityCode = curCityCode;
        },
        curCityCode: function curCityCode(val) {
            var _this2 = this;

            this.curCity = this.citys[val];
            if (this.level === 0) {
                this.setDefaultsCodes();
            } else if (this.level === 1) {
                this.areas = this.data[val];
                if (!this.areas) {
                    this.areas = defineProperty_default()({}, this.curCityCode, this.curCity);
                    this.curArea = this.curCity;
                    this.curAreaCode = this.curCityCode;
                    return;
                }

                var curArea = values_default()(this.areas)[0];
                var curAreaCode = keys_default()(this.areas)[0];

                if (this.defaults[2]) {
                    if (this.isCode) {
                        curAreaCode = lodash_find_default()(keys_default()(this.areas), function (item) {
                            return item === _this2.defaults[2];
                        });
                        assert(curAreaCode, '\u53BF\u533A ' + this.defaults[2] + ' \u4E0D\u5B58\u5728\u4E8E\u57CE\u5E02 ' + this.defaults[1] + ' \u4E2D');
                        curArea = this.areas[curAreaCode];
                    } else {
                        curArea = lodash_find_default()(this.areas, function (item) {
                            return item === _this2.defaults[2];
                        });
                        assert(curArea, '\u53BF\u533A ' + this.defaults[2] + ' \u4E0D\u5B58\u5728\u4E8E\u57CE\u5E02 ' + this.defaults[1] + ' \u4E2D');
                        curAreaCode = lodash_find_default()(keys_default()(this.areas), function (item) {
                            return _this2.areas[item] === _this2.defaults[2];
                        });
                    }
                }

                this.curArea = curArea;
                this.curAreaCode = curAreaCode;
            }
        },
        curAreaCode: function curAreaCode(val) {
            this.curArea = this.areas[val];
            this.curAreaCode = val;
            this.setDefaultsCodes();
        }
    },

    methods: {
        beforeSetDefault: function beforeSetDefault() {
            var chinese = /^[\u4E00-\u9FA5\uF900-\uFA2D]{2,}$/;
            var num = /^\d{6,}$/;
            var isCode = num.test(this.value[0]);
            var isValid = void 0;

            if (!isCode) {
                isValid = this.value.every(function (item) {
                    return chinese.test(item);
                });
            } else {
                isValid = this.value.every(function (item) {
                    return num.test(item);
                });
            }
            assert(isValid, '传入的默认值参数有误');

            // 映射默认值，避免直接更改props
            this.defaults = [].concat(this.value);
            this.isCode = isCode;
        },
        setDefaultValue: function setDefaultValue() {
            var _this3 = this;

            var provinceCode = '';

            if (this.isCode) {
                provinceCode = this.defaults[0];
            } else {
                var province = lodash_find_default()(this.provinces, function (item) {
                    return item === _this3.defaults[0];
                });
                assert(province, '\u7701\u4EFD ' + this.defaults[0] + ' \u4E0D\u5B58\u5728');
                provinceCode = lodash_find_default()(keys_default()(this.provinces), function (item) {
                    return _this3.provinces[item] === _this3.defaults[0];
                });
            }
            this.curProvinceCode = provinceCode;

            // 还原默认值，避免用户选择出错
            this.$nextTick(function () {
                _this3.defaults = [];
                // this.isCode = false;
            });
        },
        handleChange: function handleChange(codes, labels) {
            var res = [];
            if (this.isSetDefault) {
                // this.emitter.emit('set-def-values', codes, labels);
            }
            this.isSetDefault = true;

            if (labels[0] === labels[1]) {
                // 纠正台湾省的 code 返回
                codes[1] = codes[0];
            }

            if (this.type === 'code') {
                res = [].concat(codes);
            } else if (this.type === 'text') {
                res = [].concat(labels);
            } else if (this.type === 'all') {
                res = codes.map(function (code, index) {
                    return defineProperty_default()({}, code, labels[index]);
                });
            }
            this.$emit('input', res);
            this.$emit('change', res);
        },
        iterate: function iterate(obj, panelIndex) {
            // panelIndex 表示所在 panel 的索引
            var temp = [];
            for (var key in obj) {
                temp.push({
                    label: obj[key],
                    value: key,
                    panelIndex: panelIndex
                });
            }
            return temp;
        },
        iterateCities: function iterateCities() {
            var temp = [];
            var provinces = this.iterate(this.data['86'], 0);

            for (var i = 0, l = provinces.length; i < l; i++) {
                var item = {};
                item['label'] = provinces[i].label;
                item['value'] = provinces[i].value;
                item['panelIndex'] = provinces[i].panelIndex;

                item['children'] = this.iterate(this.data[provinces[i].value], 1);
                temp.push(item);
            }

            return temp;
        },
        iterateAreas: function iterateAreas() {
            var temp = [];
            var cities = this.iterateCities();

            for (var i = 0, c = cities.length; i < c; i++) {
                var city = cities[i];
                for (var j = 0, l = city.children.length; j < l; j++) {
                    var item = city.children[j];
                    var areas = this.iterate(this.data[city.children[j].value], 2);
                    // fix #7
                    if (areas.length) {
                        item['children'] = areas;
                    } else {
                        item['children'] = [{
                            label: item.label,
                            value: item.value,
                            panelIndex: 2
                        }];
                    }
                }
                temp.push(city);
            }
            return temp;
        },
        setDefaultsCodes: function setDefaultsCodes() {
            if (this.isSetDefault) {
                return;
            }
            this.isSetDefault = true;

            var codes = [];
            switch (this.level) {
                case 0:
                    codes = [this.curProvinceCode, this.curCityCode];
                    break;
                case 1:
                    codes = [this.curProvinceCode, this.curCityCode, this.curAreaCode];
                    break;
            }
            this.defaultsAreaCodes = [].concat(codes);
        }
    },

    created: function created() {
        if (this.level === 0) {
            this.options = this.iterateCities();
        } else if (this.level === 1) {
            this.options = this.iterateAreas();
        } else {
            assert(false, '\u8BBE\u7F6E\u7684 level \u503C\u53EA\u652F\u6301 0/1');
        }

        if (isArray(this.value) && this.value.length === this.level + 2) {
            this.beforeSetDefault();
            this.setDefaultValue();
        }

        if (isArray(this.value) && this.value.length && this.value.length !== this.level + 2) {
            assert(false, '\u8BBE\u7F6E\u7684\u9ED8\u8BA4\u503C\u548C level \u503C\u4E0D\u5339\u914D');
        }
    }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-ad7644d4","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./components/area-cascader/index.vue
var area_cascader_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "area-cascader-wrap" },
    [
      _c("v-cascader", {
        attrs: {
          placeholder: _vm.placeholder,
          options: _vm.options,
          defaultsAreaCodes: _vm.defaultsAreaCodes,
          size: _vm.size,
          disabled: _vm.disabled,
          separator: _vm.separator,
          data: _vm.data
        },
        on: {
          setDefault: function($event) {
            _vm.isSetDefault = true
          },
          change: _vm.handleChange
        }
      })
    ],
    1
  )
}
var area_cascader_staticRenderFns = []
area_cascader_render._withStripped = true
var area_cascader_esExports = { render: area_cascader_render, staticRenderFns: area_cascader_staticRenderFns }
/* harmony default export */ var selectortype_template_index_0_components_area_cascader = (area_cascader_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-ad7644d4", area_cascader_esExports)
  }
}
// CONCATENATED MODULE: ./components/area-cascader/index.vue
var area_cascader_disposed = false
var area_cascader_normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var area_cascader___vue_template_functional__ = false
/* styles */
var area_cascader___vue_styles__ = null
/* scopeId */
var area_cascader___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var area_cascader___vue_module_identifier__ = null
var area_cascader_Component = area_cascader_normalizeComponent(
  area_cascader,
  selectortype_template_index_0_components_area_cascader,
  area_cascader___vue_template_functional__,
  area_cascader___vue_styles__,
  area_cascader___vue_scopeId__,
  area_cascader___vue_module_identifier__
)
area_cascader_Component.options.__file = "components/area-cascader/index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ad7644d4", area_cascader_Component.options)
  } else {
    hotAPI.reload("data-v-ad7644d4", area_cascader_Component.options)
  }
  module.hot.dispose(function (data) {
    area_cascader_disposed = true
  })
})()}

/* harmony default export */ var components_area_cascader = (area_cascader_Component.exports);

// CONCATENATED MODULE: ./src/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "AreaSelect", function() { return components_area_select; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "AreaCascader", function() { return components_area_cascader; });







var components = [components_area_select, components_area_cascader];

function install(Vue) {
    bus.saveVueRef(Vue);
    components.map(function (component) {
        Vue.component(component.name, component);
    });
}



var VueAreaLinkage = {
    install: install,
    AreaSelect: components_area_select,
    AreaCascader: components_area_cascader
};

/* harmony default export */ var src_0 = __webpack_exports__["default"] = (VueAreaLinkage);

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

/***/ }),
/* 36 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 37 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(39);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(40)("c518b0fe", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d41a8fd8\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d41a8fd8\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(37)(false);
// imports


// module
exports.push([module.i, "\n.area-select-wrap .area-select{\n    margin-left: 10px;\n}\n.area-select-wrap .area-select-empty{\n    padding: 4px 0;\n    margin: 0;\n    text-align: center;\n    color: #999;\n    font-size: 14px;\n}\n", ""]);

// exports


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(41)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 41 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(43);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(7);
var $keys = __webpack_require__(8);

__webpack_require__(47)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(9);
var toIObject = __webpack_require__(14);
var arrayIndexOf = __webpack_require__(45)(false);
var IE_PROTO = __webpack_require__(16)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(14);
var toLength = __webpack_require__(23);
var toAbsoluteIndex = __webpack_require__(46);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(15);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(3);
var core = __webpack_require__(0);
var fails = __webpack_require__(12);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(12)(function () {
  return Object.defineProperty(__webpack_require__(29)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(17);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(52);
module.exports = __webpack_require__(0).Object.values;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(3);
var $values = __webpack_require__(53)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(8);
var toIObject = __webpack_require__(14);
var isEnum = __webpack_require__(31).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(55), __esModule: true };

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(56);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(3);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperty: __webpack_require__(5).f });


/***/ }),
/* 57 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(60);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(61), __esModule: true };

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(62);
__webpack_require__(71);
module.exports = __webpack_require__(0).Array.from;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(63)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(64)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(15);
var defined = __webpack_require__(13);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(25);
var $export = __webpack_require__(3);
var redefine = __webpack_require__(65);
var hide = __webpack_require__(10);
var Iterators = __webpack_require__(19);
var $iterCreate = __webpack_require__(66);
var setToStringTag = __webpack_require__(34);
var getPrototypeOf = __webpack_require__(70);
var ITERATOR = __webpack_require__(1)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(67);
var descriptor = __webpack_require__(18);
var setToStringTag = __webpack_require__(34);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(10)(IteratorPrototype, __webpack_require__(1)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(11);
var dPs = __webpack_require__(68);
var enumBugKeys = __webpack_require__(27);
var IE_PROTO = __webpack_require__(16)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(29)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(69).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(5);
var anObject = __webpack_require__(11);
var getKeys = __webpack_require__(8);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(4).document;
module.exports = document && document.documentElement;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(9);
var toObject = __webpack_require__(7);
var IE_PROTO = __webpack_require__(16)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(28);
var $export = __webpack_require__(3);
var toObject = __webpack_require__(7);
var call = __webpack_require__(72);
var isArrayIter = __webpack_require__(73);
var toLength = __webpack_require__(23);
var createProperty = __webpack_require__(74);
var getIterFn = __webpack_require__(75);

$export($export.S + $export.F * !__webpack_require__(77)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(11);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(19);
var ITERATOR = __webpack_require__(1)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(5);
var createDesc = __webpack_require__(18);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(76);
var ITERATOR = __webpack_require__(1)('iterator');
var Iterators = __webpack_require__(19);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(22);
var TAG = __webpack_require__(1)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(1)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(79), __esModule: true };

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(80);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(3);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(81) });


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(8);
var gOPS = __webpack_require__(82);
var pIE = __webpack_require__(31);
var toObject = __webpack_require__(7);
var IObject = __webpack_require__(21);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(12)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 82 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ })
/******/ ]);