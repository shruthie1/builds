/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../packages/tg-core/src/utils/logger.ts"
/*!**************************************************!*\
  !*** ../../packages/tg-core/src/utils/logger.ts ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Logger: () => (/* binding */ Logger)
/* harmony export */ });
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chalk */ "chalk");
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chalk__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);


// ─── Level gating (consistent across all apps via the LOG_LEVEL env var) ──────
// Ordered least→most verbose. A message emits only if its level's rank is
// <= the configured threshold. Default "debug" preserves prior behavior
// (everything except verbose was always emitting; verbose now gated too).
// Set LOG_LEVEL=info in prod to silence debug/verbose hot-path spam.
const LEVEL_RANK = {
    error: 0,
    warn: 1,
    success: 2,
    info: 3,
    log: 4,
    debug: 5,
    verbose: 6,
};
function resolveThreshold() {
    const raw = (process.env.LOG_LEVEL || "").trim().toLowerCase();
    if (raw && raw in LEVEL_RANK)
        return LEVEL_RANK[raw];
    return LEVEL_RANK.debug; // default: emit everything (backward-compatible)
}
// Colors ON by default (PM2 captures our stdout and renders these colors in
// `pm2 logs` — the original behavior). isTTY is false under PM2, so we must NOT
// gate on it or all output collapses to one color. Opt OUT only via the standard
// NO_COLOR convention (or FORCE_COLOR=0) when a plain-text sink is required.
function resolveChalkLevel() {
    if (process.env.NO_COLOR)
        return 0;
    if (process.env.FORCE_COLOR === "0")
        return 0;
    return 3;
}
(chalk__WEBPACK_IMPORTED_MODULE_0___default().level) = resolveChalkLevel();
class Logger {
    constructor(contextFile) {
        try {
            if (contextFile && typeof contextFile === "string") {
                // Extract filename without extension
                this.context = path__WEBPACK_IMPORTED_MODULE_1___default().basename(contextFile, path__WEBPACK_IMPORTED_MODULE_1___default().extname(contextFile));
            }
            else {
                this.context = contextFile;
            }
            // Edge case: empty result
            if (!this.context || this.context.trim() === "") {
                this.context = "Unknown";
            }
        }
        catch (err) {
            // Last fallback
            this.context = "Unknown";
        }
    }
    /** True if a message at `level` should emit under the current LOG_LEVEL. */
    enabled(level) {
        return (LEVEL_RANK[level] ?? 99) <= Logger.threshold;
    }
    log(message, data = "") {
        if (!this.enabled("log"))
            return;
        const line = this.formatMessage("LOG", message, this.getLogColors(), data);
        process.stdout.write(line + "\n");
    }
    info(message, data = "") {
        if (!this.enabled("info"))
            return;
        const line = this.formatMessage("INFO", message, this.getInfoColors(), data);
        process.stdout.write(line + "\n");
    }
    error(message, data = "", trace) {
        if (!this.enabled("error"))
            return;
        const line = this.formatMessage("ERROR", message, this.getErrorColors(), data);
        process.stderr.write(line + (trace ? "\n" + chalk__WEBPACK_IMPORTED_MODULE_0___default().red.bold(trace) : "") + "\n");
    }
    warn(message, data = "") {
        if (!this.enabled("warn"))
            return;
        const line = this.formatMessage("WARN", message, this.getWarnColors(), data);
        process.stdout.write(line + "\n");
    }
    debug(message, data = "") {
        if (!this.enabled("debug"))
            return;
        const line = this.formatMessage("DEBUG", message, this.getDebugColors(), data);
        process.stdout.write(line + "\n");
    }
    verbose(message, data = "") {
        if (!this.enabled("verbose"))
            return;
        const line = this.formatMessage("VERBOSE", message, this.getVerboseColors(), data);
        process.stdout.write(line + "\n");
    }
    success(message, data = "") {
        if (!this.enabled("success"))
            return;
        const line = this.formatMessage("SUCCESS", message, this.getSuccessColors(), data);
        process.stdout.write(line + "\n");
    }
    /** ---------- COLORS ---------- */
    getLogColors() {
        return { level: (chalk__WEBPACK_IMPORTED_MODULE_0___default().green), message: (chalk__WEBPACK_IMPORTED_MODULE_0___default().green), context: (chalk__WEBPACK_IMPORTED_MODULE_0___default().cyan).bold };
    }
    getInfoColors() {
        return { level: (chalk__WEBPACK_IMPORTED_MODULE_0___default().blue), message: (chalk__WEBPACK_IMPORTED_MODULE_0___default().blue), context: (chalk__WEBPACK_IMPORTED_MODULE_0___default().blue).bold };
    }
    getErrorColors() {
        return { level: (chalk__WEBPACK_IMPORTED_MODULE_0___default().red), message: (chalk__WEBPACK_IMPORTED_MODULE_0___default().red), context: (chalk__WEBPACK_IMPORTED_MODULE_0___default().red).bold };
    }
    getWarnColors() {
        return { level: (chalk__WEBPACK_IMPORTED_MODULE_0___default().yellow), message: (chalk__WEBPACK_IMPORTED_MODULE_0___default().yellow), context: (chalk__WEBPACK_IMPORTED_MODULE_0___default().yellow).bold };
    }
    getDebugColors() {
        return { level: (chalk__WEBPACK_IMPORTED_MODULE_0___default().magenta), message: (chalk__WEBPACK_IMPORTED_MODULE_0___default().grey), context: (chalk__WEBPACK_IMPORTED_MODULE_0___default().magenta).bold };
    }
    getVerboseColors() {
        return { level: (chalk__WEBPACK_IMPORTED_MODULE_0___default().gray), message: (chalk__WEBPACK_IMPORTED_MODULE_0___default().magenta), context: (chalk__WEBPACK_IMPORTED_MODULE_0___default().white).dim };
    }
    getSuccessColors() {
        return { level: (chalk__WEBPACK_IMPORTED_MODULE_0___default().greenBright), message: (chalk__WEBPACK_IMPORTED_MODULE_0___default().green).bold, context: (chalk__WEBPACK_IMPORTED_MODULE_0___default().green).bold };
    }
    /** ---------- FORMATTERS ---------- */
    formatMessage(level, message, colors, data) {
        const safeLevel = typeof level === "string" && level.trim() !== "" ? level : "UNKNOWN";
        const safeColors = {
            level: typeof colors?.level === "function" ? colors.level : (txt) => txt,
            message: typeof colors?.message === "function" ? colors.message : (txt) => txt,
        };
        const formattedMessage = message !== undefined && message !== null
            ? this.formatMultiColorMessage(message, safeColors.message)
            : safeColors.message("[EMPTY MESSAGE]");
        const serviceCtx = this.context ? chalk__WEBPACK_IMPORTED_MODULE_0___default().yellow(`[${this.context}]`) : "";
        let extraCtx = "";
        if (typeof data === "object" && data !== null) {
            try {
                extraCtx = this.formatObjectMessage(data);
            }
            catch {
                extraCtx = chalk__WEBPACK_IMPORTED_MODULE_0___default().red("[Invalid Context Object]");
            }
        }
        else if (typeof data === "string") {
            extraCtx = this.parseColoredContext(data);
        }
        else if (data !== "" && data !== undefined) {
            extraCtx = chalk__WEBPACK_IMPORTED_MODULE_0___default().yellow.bold(String(data));
        }
        if (extraCtx)
            extraCtx = " " + extraCtx;
        const levelFormatted = safeColors.level(`[${safeLevel}]`);
        return `${levelFormatted} ${serviceCtx} ${formattedMessage}${extraCtx}`;
    }
    formatMultiColorMessage(message, levelColor) {
        if (typeof message === "object" && message !== null) {
            return "\n" + this.formatObjectMessage(message);
        }
        let formatted = String(message);
        formatted = formatted.replace(/\[([^\]]+)\]/g, chalk__WEBPACK_IMPORTED_MODULE_0___default().cyan.bold("[$1]"));
        formatted = formatted.replace(/\*\*([^*]+)\*\*/g, chalk__WEBPACK_IMPORTED_MODULE_0___default().white.bold("$1"));
        formatted = formatted.replace(/\*([^*]+)\*/g, chalk__WEBPACK_IMPORTED_MODULE_0___default().yellow("$1"));
        // formatted = formatted.replace(/_([^_]+)_/g, chalk.underline("$1"));
        return levelColor(formatted);
    }
    formatObjectMessage(obj, indent = 2, seen = new WeakSet()) {
        if (obj === null)
            return chalk__WEBPACK_IMPORTED_MODULE_0___default().gray.bold("null");
        if (typeof obj !== "object") {
            if (typeof obj === "string")
                return chalk__WEBPACK_IMPORTED_MODULE_0___default().blueBright.bold(`"${obj}"`);
            if (typeof obj === "number")
                return chalk__WEBPACK_IMPORTED_MODULE_0___default().yellow.bold(obj);
            if (typeof obj === "boolean")
                return chalk__WEBPACK_IMPORTED_MODULE_0___default().magenta.bold(obj);
            return chalk__WEBPACK_IMPORTED_MODULE_0___default().cyanBright.bold(String(obj));
        }
        if (seen.has(obj))
            return chalk__WEBPACK_IMPORTED_MODULE_0___default().red("[Circular]");
        seen.add(obj);
        if (Array.isArray(obj)) {
            return ("[\n" +
                obj.map((el) => " ".repeat(indent) + this.formatObjectMessage(el, indent + 2, seen)).join(",\n") +
                "\n" +
                " ".repeat(indent - 2) +
                "]");
        }
        const entries = Object.entries(obj).map(([key, value]) => {
            const coloredKey = chalk__WEBPACK_IMPORTED_MODULE_0___default().cyan(`"${key}"`) + chalk__WEBPACK_IMPORTED_MODULE_0___default().white(": ");
            const formattedValue = this.formatObjectMessage(value, indent + 2, seen);
            return " ".repeat(indent) + coloredKey + formattedValue;
        });
        return "{\n" + entries.join(",\n") + "\n" + " ".repeat(indent - 2) + "}";
    }
    parseColoredContext(context) {
        if (/^\d+$/.test(context))
            return chalk__WEBPACK_IMPORTED_MODULE_0___default().magentaBright.bold(context);
        if (context === context.toUpperCase())
            return chalk__WEBPACK_IMPORTED_MODULE_0___default().yellow.bold(context);
        return chalk__WEBPACK_IMPORTED_MODULE_0___default().cyanBright.bold(context);
    }
    /** ---------- STATIC SHORTHANDS ---------- */
    // context names the logger instance only; it is NOT passed as the data arg.
    static log(message, context) {
        new Logger(context).log(message);
    }
    static error(message, trace, context) {
        new Logger(context).error(message, "", trace);
    }
    static warn(message, context) {
        new Logger(context).warn(message);
    }
    static debug(message, context) {
        new Logger(context).debug(message);
    }
    static verbose(message, context) {
        new Logger(context).verbose(message);
    }
    static success(message, context) {
        new Logger(context).success(message);
    }
    /** ---------- CONSOLE OVERRIDES ---------- */
    static overrideConsole(serviceName = "Console") {
        const instance = new Logger(serviceName);
        console.log = (...args) => instance.log(args[0], args[1]);
        console.info = (...args) => instance.info(args[0], args[1]);
        console.error = (...args) => instance.error(args[0], args[1], args[2]);
        console.warn = (...args) => instance.warn(args[0], args[1]);
        console.debug = (...args) => instance.debug(args[0], args[1]);
        console.success = (...args) => instance.success(args[0], args[1]);
    }
}
Logger.threshold = resolveThreshold();
const logger = new Logger();


/***/ },

/***/ "@google/genai"
/*!********************************!*\
  !*** external "@google/genai" ***!
  \********************************/
(module) {

module.exports = require("@google/genai");

/***/ },

/***/ "axios"
/*!************************!*\
  !*** external "axios" ***!
  \************************/
(module) {

module.exports = require("axios");

/***/ },

/***/ "big-integer"
/*!******************************!*\
  !*** external "big-integer" ***!
  \******************************/
(module) {

module.exports = require("big-integer");

/***/ },

/***/ "chalk"
/*!************************!*\
  !*** external "chalk" ***!
  \************************/
(module) {

module.exports = require("chalk");

/***/ },

/***/ "cors"
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
(module) {

module.exports = require("cors");

/***/ },

/***/ "dotenv"
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
(module) {

module.exports = require("dotenv");

/***/ },

/***/ "express"
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
(module) {

module.exports = require("express");

/***/ },

/***/ "form-data"
/*!****************************!*\
  !*** external "form-data" ***!
  \****************************/
(module) {

module.exports = require("form-data");

/***/ },

/***/ "heapdump"
/*!***************************!*\
  !*** external "heapdump" ***!
  \***************************/
(module) {

module.exports = require("heapdump");

/***/ },

/***/ "ioredis"
/*!**************************!*\
  !*** external "ioredis" ***!
  \**************************/
(module) {

module.exports = require("ioredis");

/***/ },

/***/ "mongodb"
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
(module) {

module.exports = require("mongodb");

/***/ },

/***/ "node-fetch"
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
(module) {

module.exports = require("node-fetch");

/***/ },

/***/ "node-schedule-tz"
/*!***********************************!*\
  !*** external "node-schedule-tz" ***!
  \***********************************/
(module) {

module.exports = require("node-schedule-tz");

/***/ },

/***/ "path"
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
(module) {

module.exports = require("path");

/***/ },

/***/ "socks"
/*!************************!*\
  !*** external "socks" ***!
  \************************/
(module) {

module.exports = require("socks");

/***/ },

/***/ "telegram"
/*!***************************!*\
  !*** external "telegram" ***!
  \***************************/
(module) {

module.exports = require("telegram");

/***/ },

/***/ "telegram/Helpers"
/*!***********************************!*\
  !*** external "telegram/Helpers" ***!
  \***********************************/
(module) {

module.exports = require("telegram/Helpers");

/***/ },

/***/ "telegram/crypto/AuthKey"
/*!******************************************!*\
  !*** external "telegram/crypto/AuthKey" ***!
  \******************************************/
(module) {

module.exports = require("telegram/crypto/AuthKey");

/***/ },

/***/ "telegram/events"
/*!**********************************!*\
  !*** external "telegram/events" ***!
  \**********************************/
(module) {

module.exports = require("telegram/events");

/***/ },

/***/ "telegram/extensions/Logger"
/*!*********************************************!*\
  !*** external "telegram/extensions/Logger" ***!
  \*********************************************/
(module) {

module.exports = require("telegram/extensions/Logger");

/***/ },

/***/ "telegram/network/MTProtoState"
/*!************************************************!*\
  !*** external "telegram/network/MTProtoState" ***!
  \************************************************/
(module) {

module.exports = require("telegram/network/MTProtoState");

/***/ },

/***/ "telegram/sessions"
/*!************************************!*\
  !*** external "telegram/sessions" ***!
  \************************************/
(module) {

module.exports = require("telegram/sessions");

/***/ },

/***/ "telegram/tl"
/*!******************************!*\
  !*** external "telegram/tl" ***!
  \******************************/
(module) {

module.exports = require("telegram/tl");

/***/ },

/***/ "child_process"
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
(module) {

module.exports = require("child_process");

/***/ },

/***/ "fs"
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
(module) {

module.exports = require("fs");

/***/ },

/***/ "fs/promises"
/*!******************************!*\
  !*** external "fs/promises" ***!
  \******************************/
(module) {

module.exports = require("fs/promises");

/***/ },

/***/ "http"
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
(module) {

module.exports = require("http");

/***/ },

/***/ "https"
/*!************************!*\
  !*** external "https" ***!
  \************************/
(module) {

module.exports = require("https");

/***/ },

/***/ "url"
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
(module) {

module.exports = require("url");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; (typeof current == 'object' || typeof current == 'function') && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".index.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = {
/******/ 			"main": 1
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		var installChunk = (chunk) => {
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 1;
/******/ 		
/******/ 		};
/******/ 		
/******/ 		// require() chunk loading for javascript
/******/ 		__webpack_require__.f.require = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					var installedChunk = require("./" + __webpack_require__.u(chunkId));
/******/ 					if (!installedChunks[chunkId]) {
/******/ 						installChunk(installedChunk);
/******/ 					}
/******/ 				} else installedChunks[chunkId] = 1;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildClientConfigUrl: () => (/* binding */ buildClientConfigUrl),
/* harmony export */   buildSharedConfigUrl: () => (/* binding */ buildSharedConfigUrl),
/* harmony export */   getDataAndSetEnvVariables: () => (/* binding */ getDataAndSetEnvVariables),
/* harmony export */   getRuntimeConfigBase: () => (/* binding */ getRuntimeConfigBase),
/* harmony export */   installPackage: () => (/* binding */ installPackage),
/* harmony export */   modifyPackageJson: () => (/* binding */ modifyPackageJson),
/* harmony export */   readPackageJson: () => (/* binding */ readPackageJson),
/* harmony export */   setEnv: () => (/* binding */ setEnv),
/* harmony export */   writePackageJson: () => (/* binding */ writePackageJson)
/* harmony export */ });
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! child_process */ "child_process");
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dotenv */ "dotenv");
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! node-fetch */ "node-fetch");
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! url */ "url");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _tg_core_utils_logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @tg/core/utils/logger */ "../../packages/tg-core/src/utils/logger.ts");







const logger = new _tg_core_utils_logger__WEBPACK_IMPORTED_MODULE_6__.Logger("index");
dotenv__WEBPACK_IMPORTED_MODULE_1___default().config();
const __filename = (0,url__WEBPACK_IMPORTED_MODULE_5__.fileURLToPath)("file:///home/runner/work/tg-plat/tg-plat/apps/promote-clients/src/index.ts");
const __dirname = path__WEBPACK_IMPORTED_MODULE_4___default().dirname(__filename);
// Enable garbage collection for heapdump functionality
if (typeof global.gc !== 'function') {
    logger.warn('⚠️  Garbage collection not exposed. Run with --expose-gc flag for full heapdump functionality');
}
const readPackageJson = () => {
    try {
        const packageJsonPath = path__WEBPACK_IMPORTED_MODULE_4___default().resolve(__dirname, '../package.json');
        const packageJsonContent = fs__WEBPACK_IMPORTED_MODULE_3___default().readFileSync(packageJsonPath, 'utf-8');
        return JSON.parse(packageJsonContent);
    }
    catch (error) {
        logger.error('Error reading package.json:', error.message);
        throw error;
    }
};
// Function to write package.json
const writePackageJson = (data) => {
    try {
        const packageJsonPath = path__WEBPACK_IMPORTED_MODULE_4___default().resolve(__dirname, '../package.json');
        const packageJsonContent = JSON.stringify(data, null, 2);
        fs__WEBPACK_IMPORTED_MODULE_3___default().writeFileSync(packageJsonPath, packageJsonContent, 'utf-8');
    }
    catch (error) {
        logger.error('Error writing package.json:', error.message);
        throw error;
    }
};
// Function to modify package.json
const modifyPackageJson = (action, packageName, version, dev = false) => {
    let packageJson;
    try {
        packageJson = readPackageJson();
    }
    catch (error) {
        logger.error('Failed to load package.json. Exiting...');
        return;
    }
    const section = dev ? 'devDependencies' : 'dependencies';
    switch (action) {
        case 'add':
            if (!version) {
                logger.error('Version is required to add a package.');
                return;
            }
            if (!packageJson[section])
                packageJson[section] = {};
            packageJson[section][packageName] = version;
            break;
        case 'remove':
            if (packageJson[section] && packageJson[section][packageName]) {
                delete packageJson[section][packageName];
            }
            else {
                logger.error(`Package ${packageName} not found in ${section}.`);
                return;
            }
            break;
        case 'change':
            if (packageJson[section] && packageJson[section][packageName]) {
                if (!version) {
                    logger.error('Version is required to change a package.');
                    return;
                }
                packageJson[section][packageName] = version;
            }
            else {
                logger.error(`Package ${packageName} not found in ${section}.`);
                return;
            }
            break;
        default:
            logger.error(`Unknown action: ${action}`);
            return;
    }
    try {
        writePackageJson(packageJson);
        logger.info(`Package ${packageName} has been ${action}ed successfully!`);
    }
    catch (error) {
        logger.error('Failed to update package.json.');
    }
};
// modifyPackageJson('add', 'lodash', '^4.17.21');
// modifyPackageJson('remove', 'lodash');
// modifyPackageJson('change', 'telegram', '2.18.26');
// modifyPackageJson('add', 'cors', '^2.8.5');
// installPackage()
async function installPackage() {
    logger.info(" executing npm i");
    (0,child_process__WEBPACK_IMPORTED_MODULE_0__.execSync)("npm i");
    // const installProcess = spawn('npm', ['install']);
    // installProcess.stdout.on('data', (data) => logger.info(data.toString()));
    // installProcess.stderr.on('data', (data) => logger.error(data.toString()));
    // await new Promise((resolve) => installProcess.on('close', resolve));
}
// Whitelist of expected env keys from remote API
const ALLOWED_ENV_KEYS = new Set([
    'mobile', 'link', 'repl', 'username', 'name', 'clientId',
    'tgcms', 'tgmanager', 'updatesChannel', 'notifChannel', 'logsChannel2',
    'accountsChannel', 'warningsChannel', 'httpFailuresChannel', 'FailedPaymentsChannel',
    'logsChatId', 'BOT_TOKENS', 'REDIS_HOST', 'REDIS_URL', 'RUNTIME_CONFIG_BASE',
    'mongodburi', 'mongouri', 'MONGO_URI', 'MONGODB_URI', 'DB_URI', 'dbcoll', 'session',
    'API_ID', 'API_HASH', 'apiId', 'apiHash',
    'X_API_KEY', 'API_KEY', 'TG_2FA_PASSWORD', 'GMAIL_ADD', 'GMAIL_PASS',
    'promoteLink', 'botToken', 'chatId',
    'promoteMsg', 'promoteChannel', 'promoteGroup',
]);
function isAllowedRuntimeEnvKey(key) {
    return ALLOWED_ENV_KEYS.has(key) || key.startsWith('TELEGRAM_CHANNEL_CONFIG_') || process.env[key] !== undefined;
}
function getRuntimeConfigBase() {
    const base = (process.env.RUNTIME_CONFIG_BASE || process.env.tgmanager || process.env.tgcms || '').trim().replace(/\/$/, '');
    if (!base) {
        throw new Error('Missing runtime config base. Set RUNTIME_CONFIG_BASE or tgmanager/tgcms.');
    }
    return base;
}
function buildClientConfigUrl(clientId = process.env.clientId) {
    if (!clientId) {
        throw new Error('Missing clientId for runtime configuration fetch');
    }
    return `${getRuntimeConfigBase()}/clients/${clientId}`;
}
function buildSharedConfigUrl() {
    return `${getRuntimeConfigBase()}/configuration`;
}
async function getDataAndSetEnvVariables(url) {
    try {
        const response = await node_fetch__WEBPACK_IMPORTED_MODULE_2___default()(url, { headers: { 'x-api-key': process.env.X_API_KEY || process.env.API_KEY || "santoor" } });
        if (!response.ok) {
            throw new Error(`Runtime configuration request failed with status ${response.status}`);
        }
        const jsonData = await response.json();
        for (const key in jsonData) {
            if (isAllowedRuntimeEnvKey(key)) {
                process.env[key] = jsonData[key];
                logger.info('setting key: ', key);
            }
            else {
                logger.warn(`Skipping unexpected env key from remote API: ${key}`);
            }
        }
        logger.info('Environment variables set successfully!');
    }
    catch (error) {
        logger.error('Error retrieving data or setting environment variables:', error);
    }
}
async function setEnv() {
    // await getDataAndSetEnvVariables(`https://checker-production-c3c0.up.railway.app/forward/clients/${process.env.clientId}`);
    // await getDataAndSetEnvVariables(`https://mychatgpt-xk3y.onrender.com/forward/configuration`);
    // await getDataAndSetEnvVariables(`https://api.npoint.io/cc57d60feea67e47b6c4`);
    await getDataAndSetEnvVariables(buildClientConfigUrl());
    await getDataAndSetEnvVariables(buildSharedConfigUrl());
    // await getDataAndSetEnvVariables(`https://mychatgpt-xk3y.onrender.com/forward/clients/${process.env.clientId}`);
    // await getDataAndSetEnvVariables(`https://api.npoint.io/7c2682f37bb93ef486ba/${process.env.clientId}`);
    // await getDataAndSetEnvVariables(`https://ums.paidgirls.site/configuration`);
    logger.info("Env Mobile : ", process.env.mobile);
    await __webpack_require__.e(/*! import() */ "src_express_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./express */ "./src/express.ts"));
}
setEnv().catch((error) => {
    logger.error('Failed to initialize environment:', error);
});

})();

var __webpack_export_target__ = exports;
for(var __webpack_i__ in __webpack_exports__) __webpack_export_target__[__webpack_i__] = __webpack_exports__[__webpack_i__];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=index.js.map