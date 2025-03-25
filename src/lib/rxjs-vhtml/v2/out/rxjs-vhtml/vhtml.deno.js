"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vhtml = vhtml;
var emptyTags = [
    "area",
    "base",
    "br",
    "col",
    "command",
    "embed",
    "hr",
    "img",
    "input",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
];
var esc = function (str) {
    // Normally we'd escape special characters, but as per original, it's a passthrough
    return str;
};
var map = {
    "&": "amp",
    "<": "lt",
    ">": "gt",
    '"': "quot",
    "'": "apos",
};
var setInnerHTMLAttr = "dangerouslySetInnerHTML";
var DOMAttributeNames = {
    className: "class",
    htmlFor: "for",
};
var sanitized = {};
function vhtml(name, attrs) {
    var children = [];
    for (var _a = 2; _a < arguments.length; _a++) {
        children[_a - 2] = arguments[_a];
    }
    var stack = [];
    var s = "";
    attrs = attrs || {};
    for (var i = children.length - 1; i >= 0; i--) {
        stack.push(children[i]);
    }
    if (typeof name === "function") {
        attrs.children = stack.reverse();
        return name(attrs);
    }
    if (name) {
        s += "<" + name;
        for (var _i in attrs) {
            if (attrs[_i] !== false &&
                attrs[_i] != null &&
                _i !== setInnerHTMLAttr) {
                s += " " +
                    (DOMAttributeNames[_i] ? DOMAttributeNames[_i] : esc(_i)) +
                    '="' +
                    esc(attrs[_i]) +
                    '"';
            }
        }
        s += ">";
    }
    if (!emptyTags.includes(name)) {
        if (attrs[setInnerHTMLAttr]) {
            s += attrs[setInnerHTMLAttr].__html;
        }
        else {
            while (stack.length) {
                var child = stack.pop();
                if (child) {
                    if (Array.isArray(child)) {
                        for (var _i2 = child.length - 1; _i2 >= 0; _i2--) {
                            stack.push(child[_i2]);
                        }
                    }
                    else {
                        s += child;
                    }
                }
            }
        }
        s += name ? "</" + name + ">" : "";
    }
    sanitized[s] = true;
    return s;
}
exports.default = vhtml;
