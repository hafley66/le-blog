import { readFileSync } from "node:fs"
import jsx from "~/lib/rxjs-vhtml/v2/jsx-runtime.tsx"
type Imploder<T> = T[keyof T]

export class Path<
  Path extends string,
  Dir extends string,
  File extends string,
  Ext extends string,
> {
  constructor(
    public path: Path,
    public dir: Dir,
    public filename: File,
    public ext: Ext,
  ) {}

  readSync = () => readFileSync(this.path).toString()

  get publicPath() {
    return this.path.replace("src/", "/")
  }

  get importPath() {
    return this.path.replace("src/", "~/")
  }

  linkTag = (alt?: string) =>
    this.ext === "css"
      ? `<link rel='stylesheet' href='${this.publicPath}'/>`
      : ["png", "jpg", "jpeg", "gif"].includes(this.ext)
        ? `<img alt="${alt}" src='${this.publicPath}' />`
        : ""
}

export class JSPath<
  Path extends string,
  Dir extends string,
  File extends string,
  Ext extends string,
  Import extends () => Promise<any>,
> extends Path<Path, Dir, File, Ext> {
  constructor(
    override path: Path,
    override dir: Dir,
    override filename: File,
    override ext: Ext,
    public dynamicImport: Import,
  ) {
    super(path, dir, filename, ext)
  }

  markdownDemo = (diffName: string = this.filename) => `

~~~${this.ext}
// @@eval
// @@filename ${diffName}
${this.readSync()}
~~~

`
  frontendDemo = (diffName: string = this.filename) => `

~~~${this.ext}
// @@filename ${diffName}
// @@src ${this.publicPath}
${this.readSync()}
~~~

<script type='module' src='${this.publicPath}' demo-for='${this.filename}'></script>

`
  override linkTag = (alt?: string) =>
    `<script type='module' src='${this.publicPath}'></script>`

  demoScript = () => {
    return `
    
    <script type='module' src='${this.publicPath}' demo-for='${this.filename}'></script>
    
    `
  }

  demoScript$ = () => {
    return jsx("script", {
      type: "module",
      src: this.publicPath,
      "demo-for": this.filename,
      children: [],
    })
  }
}

export class SITEMAP_PART<
  FILESYSTEM extends Record<
    string,
    Path<any, any, any, any>
  >,
> {
  constructor(public fs: FILESYSTEM) {}
  startsWith<T extends string>(it: T) {
    return Object.entries(this.fs)
      .filter(([k, v]) => k.startsWith(it))
      .map(i => i[1]) as unknown as Imploder<{
      [K in keyof FILESYSTEM as K extends `${T}${string}`
        ? K
        : never]: FILESYSTEM[K]
    }>[]
  }
  endsWith<T extends string>(it: T) {
    return Object.entries(this.fs)
      .filter(([k, v]) => k.endsWith(it))
      .map(i => i[1]) as unknown as Imploder<{
      [K in keyof FILESYSTEM as K extends `${string}${T}`
        ? K
        : never]: FILESYSTEM[K]
    }>[]
  }
  includes<T extends string>(it: T | RegExp) {
    return Object.entries(this.fs)
      .filter(([k, v]) =>
        it instanceof RegExp ? k.match(it) : k.includes(it),
      )
      .map(i => i[1]) as unknown as Imploder<{
      [K in keyof FILESYSTEM as K extends `${string}${T}${string}`
        ? K
        : never]: FILESYSTEM[K]
    }>[]
  }
  subFolder<T extends string>(it: T) {
    return new SITEMAP_PART(
      Object.fromEntries(
        Object.entries(this.fs)
          .filter(([k, v]) => k.startsWith(it))
          .map(i => [i[0].replace(it, ""), i[1]] as const),
      ) as unknown as {
        [K in keyof FILESYSTEM as K extends `${T}${infer U}`
          ? U
          : never]: FILESYSTEM[K]
      },
    )
  }
}
