import {
  from,
  isObservable,
  MonoTypeOperatorFunction,
  repeat,
  RepeatConfig,
  timer,
} from "rxjs"
import {
  lifeEvents,
  o,
  registerObservable,
  withCurrentRefScope,
  wrapOperatorFunction,
} from "~/lib/tagPipe/core.2.dual.ts"

export function repeat_<T>(
  countOrConfig?: number | RepeatConfig,
): MonoTypeOperatorFunction<T> {
  let count = Infinity
  let delay: RepeatConfig["delay"]

  if (countOrConfig != null) {
    if (typeof countOrConfig === "object") {
      ;({ count = Infinity, delay } = countOrConfig)
    } else {
      count = countOrConfig
    }
  }

  if (delay) {
    const it = wrapOperatorFunction(
      repeat({
        count,
        delay: (...args) => {
          const url = `${it.parentUrl}/${it.index}/${it.opName}`
          if (typeof delay === "number") {
            return registerObservable(
              timer(delay),
              url + "/<delay>",
            )
          }
          const out_ = delay(...args)
          const out = !isObservable(out_)
            ? from(out_)
            : out_

          const _ = registerObservable(
            out,
            url + "/<delay>",
          )

          lifeEvents.next(["dynamic-ref", url])
        },
      }),
    )
    return it
  } else {
    const it = wrapOperatorFunction(repeat(countOrConfig))
    return it
  }
}

type PathParts = readonly string[]

// type KHelper<K extends string, P extends PathParts> = {
//   toString(): K
//   path: `${Join<P, "/">}/${K}`
//   dirname: Join<P, "/">
//   filename: K
// }

type Join<
  T extends readonly string[],
  D extends string,
> = T extends []
  ? ""
  : T extends [infer F extends string]
    ? F
    : T extends [
          infer F extends string,
          ...infer R extends string[],
        ]
      ? `${F}${D}${Join<R, D>}`
      : string

// type StrStrType<P extends PathParts> = {
//   path: P
//   x<N extends string>(next: N): StrStrType<[...P, N]>
//   join<D extends string>(
//     delimiter: D,
//   ): {
//     path: Join<P, D>
//     parts: P
//   }
//   declare<
//     T extends {
//       [K in keyof T]: (k: KHelper<K & string, P>) => any
//     },
//   >(
//     defs: T,
//   ): {
//     [K in keyof T]: {
//       (): ReturnType<T[K]>
//       _: ReturnType<T[K]>
//       __: KHelper<K & string, P>
//     }
//   } & {
//     _: {
//       [K in keyof T]: ReturnType<T[K]>
//     }
//   }
// }

// function StrStr<const P extends PathParts>(
//   ...path: P
// ): StrStrType<P> {
//   return {
//     path,
//     x<N extends string>(next: N) {
//       return StrStr(...path, next) as any
//     },
//     declare(defs) {
//       const basePath = path
//       const obj: any = {}
//       const underscore: any = {}

//       for (const key in defs) {
//         const helper: KHelper<any, typeof path> = {
//           toString: () => key,
//           path: [...basePath, key],
//           dirname: basePath as any,
//           filename: key,
//           join<D extends string>(delimiter: D) {
//             return path.join(delimiter) as Join<
//               typeof path,
//               D
//             > as any
//           },
//         }

//         const val = defs[key](helper)
//         obj[key] = () => val
//         obj[key].__ = helper
//         obj[key]._ = val
//         underscore[key] = val
//       }

//       obj._ = underscore
//       return obj
//     },
//     join<D extends string>(delimiter: D) {
//       return path.join(delimiter) as Join<
//         typeof path,
//         D
//       > as any
//     },
//   }
// }
const S = StrStr("src", "file", "a")

const hmm = S.x("add-form")
const x = hmm.declare({
  firstname: k => `${k.head}-lol` as const,
  lastname: k => `${k.join("/")}-lol` as const,
  age: k => k,
})

console.log(x.firstname()) // "firstname-lol"
console.log(x.lastname()) // "src/file/a/add-form/lastname-lol"

console.log(x.age()) // { path, dirname, filename }
console.log(x.lastname.__.to.css.id()) // Raw values
// Helper for asserting type equality
type AssertEqual<A, B> = (<T>() => T extends A
  ? 1
  : 2) extends <T>() => T extends B ? 1 : 2
  ? true
  : never

// Test cases
type T1 = AssertEqual<Join<[], "/">, "">
type T2 = AssertEqual<Join<["a"], "/">, "a">
type T3 = AssertEqual<Join<["a", "b"], "/">, "a/b">
type T4 = AssertEqual<Join<["x", "y", "z"], ".">, "x.y.z">
type T5 = AssertEqual<
  Join<["hello", "world"], "-">,
  "hello-world"
>
type T6 = AssertEqual<Join<["onlyone"], "_">, "onlyone">
type T7 = AssertEqual<
  Join<["src", "file", "a"], "/">,
  "src/file/a"
>

type PathLike<P extends PathParts> = {
  path: P
  head: P extends [...string[], infer Head] ? Head : ""
  join<D extends string>(delimiter: D): Join<P, D>
}

type StrStrType<P extends PathParts> = PathLike<P> & {
  x<N extends string>(next: N): StrStrType<[...P, N]>
  declare<
    T extends {
      [K in keyof T]: (
        k: StrStrType<[...P, K & string]>,
      ) => any
    },
  >(
    defs: T,
  ): {
    [K in keyof T]: {
      (): ReturnType<T[K]>
      _: ReturnType<T[K]>
      __: StrStrType<[...P, K & string]>
    }
  } & {
    _: {
      [K in keyof T]: ReturnType<T[K]>
    }
  }
  to: {
    url(): Join<P, "/">
    dot(): Join<P, ".">
    debug(): Join<P, ":">
    css: {
      (): Join<P, "-">
      id(): `#${Join<P, "-">}`
      class(): `.${Join<P, "-">}`
    }
    lodash(): `[${Join<P, "][">}]`
    props: {
      input: {
        name: string
        id: string
      }
      inputBoolean: {
        name: string
        id: string
      }
      label: {
        htmlFor: string
        id: string
      }
    }
  }
}

function StrStr<const P extends PathParts>(
  ...path: P
): StrStrType<P> {
  const to = {
    url: () => path.join("/"),
    dot: () => path.join("."),
    css: () => path.join("-"),
    debug: () => path.join(":"),
    lodash: () => `[${path.join("][")}]`,
  }

  to.css.id = () => `#${path.join("-")}`
  to.css.class = () => `.${path.join("-")}`

  return {
    path,
    to,
    head: path.at(-1) ?? "",
    join(delimiter) {
      return path.join(delimiter) as Join<
        P,
        typeof delimiter
      >
    },
    // @ts-ignore
    x(next) {
      return StrStr(...path, next)
    },
    declare(defs) {
      const obj: any = {}
      const underscore: any = {}

      for (const key in defs) {
        const subInstance = StrStr(...path, key)
        const val = defs[key](
          // @ts-ignore
          subInstance,
        )

        obj[key] = () => val
        obj[key]._ = val
        obj[key].__ = subInstance
        underscore[key] = val
      }

      obj._ = underscore
      return obj
    },
  }
}
