"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawTick = void 0;
exports.mergeByKey = mergeByKey;
exports.mergeByTup = mergeByTup;
exports.mergeByKeyScan = mergeByKeyScan;
exports.shareLatest = shareLatest;
exports.TAG = TAG;
exports.deferFrom = deferFrom;
exports.combinePartialArray = combinePartialArray;
exports.combinePartialRecord = combinePartialRecord;
var rxjs_1 = require("rxjs");
/**
 * Merges multiple observables into a single observable, while preserving the key-value pairs of the original observables.
 *
 * @param rec An object containing observables as values.
 * @returns An observable that emits the key-value pairs of the original observables.
 *
 * @example
 * const observable1 = of(1);
 * const observable2 = of("hello");
 * const observable3 = of(true);
 *
 * const mergedObservable = mergeByKey({ observable1, observable2, observable3 });
 *
 * mergedObservable.subscribe(value => {
 *   console.log(value.key, value.value);
 * });
 *
 * // Output:
 * // observable1 1
 * // observable2 hello
 * // observable3 true
 */
function mergeByKey(rec) {
    return rxjs_1.merge.apply(void 0, Object.keys(rec).map(function (key) {
        return rec[key].pipe((0, rxjs_1.map)(function (value) { return ({
            key: key,
            value: value,
        }); }));
    }));
}
/**
 * Merges multiple observables into a single observable, while preserving the key-value pairs of the original observables as tuples.
 *
 * @param rec An object containing observables as values.
 * @returns An observable that emits the key-value pairs of the original observables as tuples.
 *
 * @example
 * const observable1 = of(1);
 * const observable2 = of("hello");
 * const observable3 = of(true);
 *
 * const mergedObservable = mergeByTup({ observable1, observable2, observable3 });
 *
 * mergedObservable.subscribe(value => {
 *   console.log(value[0], value[1]);
 * });
 *
 * // Output:
 * // observable1 1
 * // observable2 hello
 * // observable3 true
 */
function mergeByTup(rec) {
    // @ts-ignore
    return rxjs_1.merge.apply(void 0, Object.keys(rec).map(function (key) {
        return rec[key].pipe((0, rxjs_1.map)(function (value) { return [key, value]; }));
    }));
}
/**
 * Merges multiple observables into a single observable, while preserving the key-value pairs of the original observables.
 *
 * @param rec An object containing observables as values.
 * @param defaultVal An object containing default values for each key.
 * @returns An observable that emits the key-value pairs of the original observables.
 *
 * @example
 * const observable1 = of(1);
 * const observable2 = of("hello");
 * const observable3 = of(true);
 *
 * const mergedObservable = mergeByKeyScan({ observable1, observable2, observable3 }, { observable1: 0, observable2: "", observable3: false });
 *
 * mergedObservable.subscribe(value => {
 *   console.log(value.observable1, value.observable2, value.observable3);
 * });
 *
 * // Output:
 * // 1 hello true
 */
function mergeByKeyScan(rec, defaultVal) {
    return mergeByKey(rec).pipe((0, rxjs_1.scan)(function (state, next) {
        var _a;
        return (__assign(__assign({}, state), (_a = {}, _a[next.key] = next.value, _a)));
    }, defaultVal), (0, rxjs_1.startWith)(defaultVal));
}
/**
 * An observable that emits a tick value at each animation frame.
 *
 * @example
 * drawTick.subscribe(tick => {
 *   console.log(tick);
 * });
 */
exports.drawTick = (0, rxjs_1.interval)(0, rxjs_1.animationFrameScheduler).pipe(function (s$) {
    return new rxjs_1.Observable(function (s) {
        var start = performance.now();
        var u = s$
            .pipe((0, rxjs_1.map)(function () { return performance.now() - start; }))
            .subscribe(s);
        return function () {
            u.unsubscribe();
        };
    });
});
function shareLatest() {
    return function (source) {
        return (0, rxjs_1.shareReplay)({ bufferSize: 1, refCount: true })(source);
    };
}
function TAG(TAG_PREFIX) {
    return function (source) {
        return (0, rxjs_1.tap)({
            next: function (n) { return console.log("".concat(TAG_PREFIX, "/next"), n); },
            error: function (e) { return console.log("".concat(TAG_PREFIX, "/error"), e); },
            complete: function () { return console.log("".concat(TAG_PREFIX, "/complete")); },
            finalize: function () { return console.log("".concat(TAG_PREFIX, "/finalize")); },
            subscribe: function () {
                return console.log("".concat(TAG_PREFIX, "/subscribe"));
            },
            unsubscribe: function () {
                return console.log("".concat(TAG_PREFIX, "/unsubscribe"));
            },
        })(source);
    };
}
function deferFrom(factory) {
    return (0, rxjs_1.defer)(function () { return (0, rxjs_1.from)(factory()); });
}
/**
 * Partial combineLatest, where we are waiting for FIRST next from ANY, not at least FIRST from EVERY
 * @param sources
 * @returns
 */
function combinePartialArray(sources) {
    var isArray = sources;
    // @ts-ignore im done fighting you TS
    return rxjs_1.merge.apply(void 0, isArray.map(function (source, index) {
        return source.pipe((0, rxjs_1.map)(function (value) { return ({ index: index, value: value }); }));
    })).pipe((0, rxjs_1.scan)(function (acc, _a) {
        var index = _a.index, value = _a.value;
        var newAcc = __spreadArray([], acc, true);
        newAcc[index] = value;
        return newAcc;
    }, Array(isArray.length).fill(undefined)));
}
function combinePartialRecord(sources) {
    var asObject = !Array.isArray(sources) ? sources : null;
    if (!asObject)
        throw new Error("not possible mergeCollect");
    var keys = Object.keys(asObject);
    return rxjs_1.merge.apply(void 0, keys.map(function (key) {
        return asObject[key].pipe((0, rxjs_1.map)(function (value) { return ({ key: key, value: value }); }));
    })).pipe((0, rxjs_1.scan)(function (acc, _a) {
        var _b;
        var key = _a.key, value = _a.value;
        return __assign(__assign({}, acc), (_b = {}, _b[key] = value, _b));
    }, {}));
}
