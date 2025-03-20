"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOC = exports.Layout = exports.PrimaryNavigation = exports.Tags = void 0;
var index_dual_tsx_1 = require("~/lib/Hex/index.dual.tsx");
var SITEMAP_deno_ts_1 = require("~/SITEMAP.deno.ts");
var Tags = function (props) {
    return (<div className="f-col f-a-center" id="tags" style={{ marginBottom: "24px" }}>
      <div className="responsive-hex-grid-3">
        {props.items.map(function (it, index) { return (<a key={it} className="hex-content caption" href={"/tags/".concat(it)} 
        // role="button"
        style={__assign({}, index_dual_tsx_1.Hex.getColor(index))}>
            <index_dual_tsx_1.Hex value={it}/>
          </a>); })}
      </div>
    </div>);
};
exports.Tags = Tags;
var PrimaryNavigation = function (props) {
    var links = [
        { href: "/home", label: "Home" },
        { href: "/resume", label: "Resume" },
        { href: "/blog", label: "Blog" },
        // { href: "/snippets", label: "Snipts" },
        { href: "/tags", label: "Tags" },
    ];
    var pathname = (URL.parse("http://localhost".concat(props.url)) || {
        pathname: "",
    }).pathname;
    var isCurrentPage = function (href) {
        if (href === "/") {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };
    return (<nav id="primary-nav" aria-label="Primary navigation">
      <div className="nav-links" role="tablist">
        {links.map(function (_a) {
            var href = _a.href, label = _a.label;
            return (<a key={href} href={href} role="tab" aria-selected={isCurrentPage(href)} className="nav-link-anchor">
            <span className={"nav-link ".concat(isCurrentPage(href) ? "active" : "")}>
              {label}
            </span>
          </a>);
        })}
      </div>
    </nav>);
};
exports.PrimaryNavigation = PrimaryNavigation;
var Layout = function (props) {
    var _a, _b;
    var it = (<html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta charSet="UTF-8"/>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
        <link rel="stylesheet" href="/styles/colors.css"/>
        <link rel="stylesheet" href="/styles/fonts.css"/>
        <link rel="stylesheet" href="/styles/global.css"/>
        <link rel="stylesheet" href="/styles/nav_and_toc.css"/>
        <link rel="stylesheet" href="/styles/hex.css"/>
        <link rel="stylesheet" href="/styles/code.css"/>
        <link rel="stylesheet" href="/styles/img.css"/>
        <link rel="stylesheet" href="/shiki-twoslash.css"/>

        <title>{props.title}</title>
      </head>
      <body className={props.disable_toc ? "ready" : ""}>
        <header>
          <exports.PrimaryNavigation url={props.url}/>
        </header>
        <main className={props.disable_toc ? "" : "body-markdown"}>
          {props.title ||
            props.tags ||
            props.date_created ? (<section id="title-and-description">
              {props.title ? <h1>{props.title}</h1> : null}
              {(_b = (_a = props.slots) === null || _a === void 0 ? void 0 : _a.belowH1) !== null && _b !== void 0 ? _b : null}
              {props.date_created ? (<sub>
                  {props.date_created} by Chris Hafley
                </sub>) : null}
              {props.description ? (<div id="h1-desc">{props.description}</div>) : null}
              {props.tags ? (<exports.Tags items={props.tags}/>) : null}
            </section>) : null}
          {props.disable_toc ? null : props.toc}

          <div id="main-content-middle">
            {props.children}
          </div>
        </main>
        <footer />
        {String.raw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<script>", "</script>"], ["<script>", "</script>"])), [
            !props.disable_toc &&
                SITEMAP_deno_ts_1.FS["src/lib/client/TOC_intersection_polyfill.js"],
            !props.disable_toc &&
                SITEMAP_deno_ts_1.FS["src/lib/client/checkbox.init.dom.js"],
            SITEMAP_deno_ts_1.FS["src/lib/client/code-copy.init.dom.js"],
            SITEMAP_deno_ts_1.FS["src/lib/client/img-onclick.dom.js"],
        ]
            .filter(Boolean)
            // biome-ignore lint/complexity/useOptionalChain: ts
            .map(function (i) { return i && i.readSync(); })
            .join(";\n;"))}
      </body>
    </html>);
    Object.assign(it, props);
    // @ts-ignore
    return it;
};
exports.Layout = Layout;
var TOC = function (props) {
    return (<details open id="section-table-of-contents">
      <summary id="toc-header-contents">
        <h2 id="table-of-contents">Table of Contents</h2>
        <input type="checkbox" id="toc-toggle"/>
      </summary>
      <div className="fancy-hr">
        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 20">
          <circle cx="10" cy="10" r="7" style={{ fill: "var(--color-text)" }} stroke-width="2"/>
          <circle cx="30" cy="10" r="9" style={{ fill: "var(--color-text)" }} stroke-width="2" fill="transparent"/>
          <circle cx="50" cy="10" r="7" style={{ fill: "var(--color-text)" }} stroke-width="2"/>
        </svg>
      </div>
      <nav id="toc-nav">
        <div className="debug-slider"></div>
        <ol debug>
          {props.tocRoot.children.map(function renderTocItem(item) {
            return (<li key={item.id} debug>
                  <a href={"#section-".concat(item.id)}>
                    {item.value}
                  </a>
                  {item.children.length ? (<ol>
                      {item.children.map(function (child) {
                        return renderTocItem(child);
                    })}
                    </ol>) : null}
                </li>);
        })}
        </ol>
      </nav>
    </details>);
};
exports.TOC = TOC;
var templateObject_1;
