import { Hex } from "~/lib/Hex/index.dual.tsx"

export type LayoutProps = {
  url: string
  title?: string
  description?: string
  date_created?: string
  author?: string
  tags?: string[]
  disable_toc?: boolean
  slots?: Partial<{
    belowH1: React.ReactNode
  }>
  children?: React.ReactNode
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
    <>
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
              className="hex-content"
              href={`/tags/${it}`}
              // role="button"
              style={{ ...Hex.getColor(index) }}
            >
              <Hex value={it} />
            </a>
          ))}
        </div>
      </div>
      <style
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{
          __html: `
  .hex-content {
    background: var(--hex-color);
    text-align: center;
    color: white;
    padding: 2px 2px;
    position: relative;
    margin-right: 4px;
    font-weight: 700;
    transition: 200ms transform ease;

    &:not(.hex-shadow) {
      z-index: 10;
      cursor: pointer;
    }

    > .hex-content-amoeba {
      container: derp / size;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      z-index: -2;

      &::after {
        content: " ";
        width: 0px;
        height: 0px;
        position: absolute;
        top: 0;
        right: 100%;
        border-top: 50cqh solid transparent;
        border-bottom: 50cqh solid transparent;

        border-right: 50cqh solid var(--hex-color);
      }

      &::before {
        content: " ";
        width: 0px;
        height: 0px;
        position: absolute;
        top: 0;
        left: 100%;
        border-top: 50cqh solid transparent;
        border-bottom: 50cqh solid transparent;

        border-left: 50cqh solid var(--hex-color);
      }
    }
  }

  .hex-shadow {
    --hex-color: var(--color-shadow);
    color: var(--hex-color);
    position: absolute;
    top: 4px;
    left: 2px;
    width: 100%;
    height: 100%;
    z-index: -10;
    pointer-events: none;
  }

  .hex-content:not(.hex-shadow):hover {
    transform: translate(2px, 4px);
    text-decoration: underline;
    .hex-shadow {
      transform: translate(-2px, -4px) scaleX(1.02) scaleY(1.1);
    }
  }`,
        }}
      />
    </>
  )
}

export const PrimaryNavigation = (props: {
  url: string
}) => {
  const links = [
    { href: "/", label: "Home" },
    { href: "/resume", label: "Resume" },
    { href: "/blog", label: "Blog" },
    { href: "/snippets", label: "Snipts" },
    { href: "/tags", label: "Tags" },
  ]

  const { pathname } = URL.parse(
    "http://localhost" + props.url,
  ) || {
    pathname: "",
  }

  console.log(props.url, { pathname })

  const isCurrentPage = (href: string) => {
    if (href === "/") {
      return pathname === href
    }
    return pathname.startsWith(href)
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
            className={`nav-link ${isCurrentPage(href) ? "active" : ""}`}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  )
}

export const Layout = (props: LayoutProps) => {
  return (
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
        <link rel="stylesheet" href="/styles/colors.css" />
        <link rel="stylesheet" href="/styles/fonts.css" />
        <link rel="stylesheet" href="/styles/global.css" />
        <title>{props.title}</title>
      </head>
      <body>
        <header>
          <PrimaryNavigation url={props.url} />
        </header>
        <main
        // class:list={[{ "body-markdown": Astro.props.enableMarkdownTocStyles }]}
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
                <p id="h1-desc">{props.description}</p>
              ) : null}
              {props.tags ? (
                <Tags items={props.tags} />
              ) : null}
            </section>
          ) : null}
          <div id="main-content-middle">
            {props.children}
          </div>
        </main>
        <footer />
      </body>
    </html>
  )
}

export type HeaderFlat = {
  depth: 1 | 2 | 3 | 4 | 5 | 6
  value: string
  id: string
}

export type HeaderProps = HeaderFlat & {
  index: number
  parent: null | HeaderProps
  children: HeaderProps[]
  address: string
}

export const TOC = (props: { tocRoot: HeaderProps }) => {
  return (
    <details open id="section-table-of-contents">
      <summary id="toc-header-contents">
        <h2 id="table-of-contents">
          &nbsp;Table of Contents
        </h2>
        <input
          type="checkbox"
          id="toc-toggle"
          onload="this.checked = localStorage.checked"
          onchange="localStorage.checked = event.target.checked"
        />
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
