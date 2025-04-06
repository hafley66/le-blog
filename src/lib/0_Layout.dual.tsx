import { mkdirSync } from "node:fs"
import { mkdir } from "node:fs/promises"
import { writeFile } from "node:fs/promises"
import path from "node:path"
import {
  firstValueFrom,
  lastValueFrom,
  Observable,
  tap,
} from "rxjs"
import { FS } from "~/SITEMAP.deno.ts"
import { Hex } from "~/lib/Hex/index.dual.tsx"
import { RxJSXNode } from "~/lib/rxjs-vhtml/v2/jsx-runtime.tsx"

export type LayoutProps = {
  url: string
  title?: string
  description?: RxJSXNode
  date_created?: string
  author?: string
  tags?: string[]
  disable_toc?: boolean
  slots?: Partial<{
    belowH1: RxJSXNode
  }>
  children?: RxJSXNode
  toc?: RxJSXNode
}

export type FootnoteFlat = {
  id?: string
  value: string
}

export type FooterProps = {
  index: number
  value: string
  id?: string
}

export const Tags = (props: { items: string[] }) => {
  return (
    <div
      className="f-col f-a-center"
      id="tags"
      style={{ marginBottom: "24px" }}
    >
      <div
        className="responsive-hex-grid-3"
        // style={{ "--n": +props.items.length }}
      >
        {props.items.map((it, index) => (
          <a
            key={it}
            className="hex-content caption"
            href={`/tags/${it}`}
            // role="button"
            style={{ ...Hex.getColor(index) }}
          >
            <Hex value={it} />
          </a>
        ))}
      </div>
    </div>
  )
}

export const PrimaryNavigation = (props: {
  url: string
}) => {
  const links = [
    { href: "/home/index.html", label: "Home" },
    { href: "/resume/index.html", label: "Resume" },
    { href: "/blog/index.html", label: "Blog" },
    // { href: "/snippets", label: "Snipts" },
    // { href: "/tags", label: "Tags" },
  ]

  const { pathname } = URL.parse(
    `http://localhost${props.url}`,
  ) || {
    pathname: "",
  }

  const isCurrentPage = (href: string) => {
    if (href === "/") {
      return pathname === href
    }
    return pathname.includes(
      href.replace("/index.html", ""),
    )
  }
  return (
    <nav id="primary-nav" aria-label="Primary navigation">
      <div className="nav-links" role="tablist">
        {links.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            role="tab"
            aria-selected={isCurrentPage(href)}
            className="nav-link-anchor"
          >
            <span
              className={`nav-link ${isCurrentPage(href) ? "active" : ""}`}
            >
              {label}
            </span>
          </a>
        ))}
      </div>
    </nav>
  )
}

export const Layout = (
  props: LayoutProps,
): Observable<string> & LayoutProps => {
  const it = (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta charSet="UTF-8" />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/favicon.svg"
        />
        <script>
          {`window.resizeIframe = function resizeIframe(obj) {
          obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
          }`}
        </script>
        <link rel="stylesheet" href="/styles/colors.css" />
        <link rel="stylesheet" href="/styles/fonts.css" />
        <link rel="stylesheet" href="/styles/global.css" />
        <link
          rel="stylesheet"
          href="/styles/nav_and_toc.css"
        />
        <link rel="stylesheet" href="/styles/btn.css" />
        <link rel="stylesheet" href="/styles/hex.css" />
        <link rel="stylesheet" href="/styles/code.css" />
        <link rel="stylesheet" href="/styles/img.css" />
        <link rel="stylesheet" href="/shiki-twoslash.css" />

        <title>{props.title}</title>
        <script
          type="module"
          src="/lib/remark_rehype/demo-runner.daemon.dom.ts"
          defer
        ></script>
      </head>
      <body className={props.disable_toc ? "ready" : ""}>
        <header>
          <PrimaryNavigation url={props.url} />
        </header>
        <main
          className={
            props.disable_toc ? "" : "body-markdown"
          }
        >
          {props.title ||
          props.tags ||
          props.date_created ? (
            <section id="title-and-description">
              {props.title ? <h1>{props.title}</h1> : null}
              {props.slots?.belowH1 ?? null}
              {props.date_created ? (
                <sub>
                  {props.date_created} by Chris Hafley
                </sub>
              ) : null}
              {props.description ? (
                <div id="h1-desc">{props.description}</div>
              ) : null}
              {props.tags ? (
                <Tags items={props.tags} />
              ) : null}
            </section>
          ) : null}
          {props.disable_toc ? null : props.toc}

          <div id="main-content-middle">
            {props.children}
          </div>
        </main>
        <footer />
        {String.raw`<script>${[
          !props.disable_toc &&
            FS[
              "src/lib/client/TOC_intersection_polyfill.js"
            ],
          !props.disable_toc &&
            FS["src/lib/client/checkbox.init.dom.js"],
          FS["src/lib/client/code-copy.init.dom.js"],
          FS["src/lib/client/img-onclick.dom.js"],
        ]
          .filter(Boolean)
          // biome-ignore lint/complexity/useOptionalChain: ts
          .map(i => i && i.readSync())
          .join(";\n;")}</script>`}
        {FS["src/lib/client/invokers.dom.js"].demoScript()}
        {FS[
          "src/lib/client/dialog-closeby-attribute-polyfill.dom.js"
        ].demoScript()}
        {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
        <script
          type="module"
          src="/lib/client/on-click-scroll.dom.ts"
          defer
        ></script>
        {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
      </body>
    </html>
  )
  Object.assign(it, props)
  // @ts-ignore
  return it
}

export type HeaderFlat = {
  depth: number
  value: string
  body: string
  id: string
}

export type HeaderProps = HeaderFlat & {
  index: number
  parent: null | HeaderProps
  children: HeaderProps[]
  address: string
}

export const TOC = (props: {
  tocRoot: HeaderProps
}): Observable<string> => {
  return (
    <details open id="section-table-of-contents">
      <summary id="toc-header-contents">
        <h2 id="table-of-contents">Table of Contents</h2>
        <input type="checkbox" id="toc-toggle" />
      </summary>
      <div className="fancy-hr">
        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 60 20"
        >
          <circle
            cx="10"
            cy="10"
            r="7"
            style={{ fill: "var(--color-text)" }}
            stroke-width="2"
          />
          <circle
            cx="30"
            cy="10"
            r="9"
            style={{ fill: "var(--color-text)" }}
            stroke-width="2"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="10"
            r="7"
            style={{ fill: "var(--color-text)" }}
            stroke-width="2"
          />
        </svg>
      </div>
      <nav id="toc-nav">
        <ol>
          {props.tocRoot.children.map(
            function renderTocItem(item: HeaderProps) {
              return (
                <li key={item.id}>
                  <a href={`#section-${item.id}`}>
                    {item.value}
                  </a>
                  {item.children.length ? (
                    <ol>
                      {item.children.map(child =>
                        renderTocItem(child),
                      )}
                    </ol>
                  ) : null}
                </li>
              )
            },
          )}
        </ol>
      </nav>
    </details>
  )
}

export function toDemoLayoutHtml(src: string) {
  return firstValueFrom(
    <html style="height: fit-content;">
      <head>
        <link rel="stylesheet" href="/styles/colors.css" />
        <link rel="stylesheet" href="/styles/fonts.css" />
        <link rel="stylesheet" href="/styles/global.css" />
        <link
          rel="stylesheet"
          href="/styles/nav_and_toc.css"
        />
        <link rel="stylesheet" href="/styles/hex.css" />
        <link rel="stylesheet" href="/styles/code.css" />
        <link rel="stylesheet" href="/styles/img.css" />
        <link rel="stylesheet" href="/shiki-twoslash.css" />
      </head>
      <body style="margin: 4px; height: fit-content;"></body>
      <script type="module" src={src}></script>
      <script>
        {`(function() {
      const observer = new MutationObserver(() => {
        // Adjust the height of the parent iframe based on the body's height
        window.frameElement.style.height = (document.documentElement.offsetHeight + 1) +'px';
      });

      // Start observing changes in the body element
      observer.observe(document.body, { childList: true, subtree: true, attributes: true });

      // Initial setting of height
      window.frameElement.style.height = (document.documentElement.offsetHeight + 1) + 'px';
    })();`}
      </script>
    </html>,
  )
    .then(val => {
      val
      const dir = `${process.cwd()}/src/lib/remark_rehype/__demo_iframes__${path.dirname(src)}`
      const file = `${process.cwd()}/src/lib/remark_rehype/__demo_iframes__${path.dirname(src)}/${path.basename(src)}.vite.html`
      mkdirSync(dir, { recursive: true })
      return writeFile(file, val)
    })
    .catch(err => console.error(err))
}
