// @ts-nocheck
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.asyncComputed = void 0;
var vue_1 = require("vue");
var AsyncStatus;
(function (AsyncStatus) {
    AsyncStatus["ERROR"] = "error";
    AsyncStatus["SUCCESS"] = "success";
    AsyncStatus["LOADING"] = "loading";
})(AsyncStatus || (AsyncStatus = {}));
function asyncComputed(func, options) {
    if (options === void 0) { options = {}; }
    var optionsWithDefaults = __assign({ "default": undefined, lazy: false }, options);
    var state = (0, vue_1.reactive)({
        result: undefined,
        status: AsyncStatus.LOADING,
        error: null,
        hasEverRun: false
    });
    var hasEverRequested = false;
    var result = (0, vue_1.computed)(function () {
        if (!hasEverRequested) {
            retry();
        }
        if (state.hasEverRun) {
            return state.result;
        }
        else {
            return options["default"];
        }
    });
    var lastRetryCalled = null;
    var stopLast = null;
    var retry = function () {
        hasEverRequested = true;
        if (stopLast) {
            stopLast();
            stopLast = null;
        }
        stopLast = (0, vue_1.watchEffect)(function () {
            var me = Symbol('retry');
            lastRetryCalled = me;
            state.status = AsyncStatus.LOADING;
            state.error = null;
            func().then(function (value) {
                if (lastRetryCalled === me) {
                    state.status = AsyncStatus.SUCCESS;
                    state.result = value;
                    state.error = null;
                    state.hasEverRun = true;
                }
            }, function (error) {
                if (lastRetryCalled === me) {
                    state.status = AsyncStatus.ERROR;
                    state.error = error;
                    state.hasEverRun = true;
                }
            });
        });
    };
    if (!optionsWithDefaults.lazy) {
        retry();
    }
    Object.defineProperty(result, 'status', {
        value: (0, vue_1.computed)(function () { return state.status; })
    });
    Object.defineProperty(result, 'error', {
        value: (0, vue_1.computed)(function () { return state.error; })
    });
    Object.defineProperty(result, 'retry', {
        value: retry
    });
    return result;
}
exports.asyncComputed = asyncComputed;
