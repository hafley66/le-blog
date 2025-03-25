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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fragment = exports.jsxs = void 0;
exports.jsx = jsx;
var lodash_1 = __importDefault(require("lodash"));
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var lib_dual_ts_1 = require("../../lib.dual.ts");
var vhtml_deno_ts_1 = require("../vhtml.deno.ts");
var isEmpty = lodash_1.default.isEmpty;
function styleToString(style) {
    return Object.entries(style)
        .filter(function (_a) {
        var _ = _a[0], value = _a[1];
        return value !== undefined && value !== "";
    })
        .map(function (_a) {
        var key = _a[0], value = _a[1];
        return "".concat(key.replace(/[A-Z]/g, function (match) { return "-".concat(match.toLowerCase()); }), ":").concat(value, ";");
    })
        .join(" ");
}
function jsx(tag, propsWithChildren) {
    function resolveObservable(value, meta) {
        if ((0, rxjs_1.isObservable)(value)) {
            return value.pipe((0, operators_1.map)(function (v) {
                return v == null
                    ? ""
                    : Array.isArray(v)
                        ? (console.log(tag, meta),
                            (0, lib_dual_ts_1.combinePartialArray)(v.map(function (i) { return ((0, rxjs_1.isObservable)(i) ? i : (0, rxjs_1.of)(i)); }))).pipe((0, operators_1.map)(function (partial) { return partial.join(""); }))
                        : String(v);
            }));
        }
        return (0, rxjs_1.of)(value == null ? "" : String(value));
    }
    try {
        if (typeof tag === "function") {
            // @ts-ignore
            return tag(propsWithChildren);
        }
        var _a = propsWithChildren || {}, _children = _a.children, debug = _a.debug, props = __rest(_a, ["children", "debug"]);
        var childrenn_1 = (!_children
            ? []
            : Array.isArray(_children)
                ? _children
                : [_children])
            .filter(Boolean)
            .flat();
        var children$$ = new rxjs_1.Observable(function (S) {
            var subs = [];
            var latest = [];
            var isObservableChildren = false;
            childrenn_1.forEach(function (it, index) {
                if (typeof it === "string") {
                    latest[index] = it;
                }
                else if ((0, rxjs_1.isObservable)(it)) {
                    isObservableChildren = true;
                    subs.push(it.pipe((0, rxjs_1.delay)(1)).subscribe(function (next) {
                        latest[index] = next;
                        S.next(latest.filter(Boolean).join(""));
                    }));
                }
            });
            if (!isObservableChildren) {
                S.next(latest.join(""));
            }
            return function () {
                subs.forEach(function (i) { return i.unsubscribe(); });
            };
        });
        var attrObservables = {};
        if (props) {
            for (var key in props) {
                var value = props[key];
                if (key === "style") {
                    if ((0, rxjs_1.isObservable)(value)) {
                        // @ts-ignore boo shutup it works omg it works wow
                        attrObservables[key] = value.pipe((0, operators_1.map)(function (v) {
                            return typeof v === "string"
                                ? v
                                : typeof v === "object" && !isEmpty(v)
                                    ? styleToString(v)
                                    : "";
                        }));
                    }
                    else if (typeof value === "object" &&
                        !Array.isArray(value) &&
                        !isEmpty(value)) {
                        attrObservables[key] = (0, rxjs_1.of)(styleToString(value));
                    }
                    else {
                        attrObservables[key] = (0, rxjs_1.of)(value);
                    }
                }
                else if ((0, rxjs_1.isObservable)(value)) {
                    attrObservables[key] = resolveObservable(value, key);
                }
                else {
                    attrObservables[key] = (0, rxjs_1.of)(value);
                }
            }
        }
        var attrs$ = Object.keys(attrObservables).length
            ? (0, lib_dual_ts_1.combinePartialRecord)(attrObservables)
            : (0, rxjs_1.of)({});
        var children$ = childrenn_1.length ? children$$ : (0, rxjs_1.of)();
        var hasProps_1 = !!Object.keys(attrObservables).length;
        var hasChildren_1 = !!childrenn_1.length;
        if (debug) {
            console.log(tag, { hasProps: hasProps_1, hasChildren: hasChildren_1 });
        }
        return (0, rxjs_1.merge)(attrs$.pipe((0, operators_1.map)(function (i) { return ["props", i]; })), children$.pipe((0, operators_1.map)(function (i) { return ["children", i]; }))).pipe(debug ? (0, lib_dual_ts_1.TAG)(tag + "") : function (i) { return i; }, (0, operators_1.scan)(function (state, event) { return ({
            props: event[0] === "props" ? event[1] : state.props,
            children: event[0] === "children"
                ? event[1]
                : state.children,
            propCount: state.propCount + Number(event[0] === "props"),
            childrenCount: state.childrenCount +
                Number(event[0] === "children"),
        }); }, {
            props: {},
            children: "",
            propCount: 0,
            childrenCount: 0,
        }), (0, operators_1.filter)(function (i) {
            return !!(hasChildren_1
                ? i.childrenCount
                : hasProps_1
                    ? i.propCount
                    : true);
        }), (0, operators_1.switchMap)(function (i) {
            return (0, rxjs_1.of)((0, vhtml_deno_ts_1.vhtml)(tag, __assign({}, i.props), i.children));
        }));
    }
    catch (e) {
        console.error(e);
        return (0, rxjs_1.of)("");
    }
}
exports.jsxs = jsx;
exports.default = jsx;
exports.Fragment = jsx;
