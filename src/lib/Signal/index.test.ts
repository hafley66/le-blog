import { firstValueFrom, take, takeUntil, timer, toArray } from "rxjs"
import { describe, expect, test } from "vitest"
import { Signal } from "./index.deno"

describe("Signal$", () => {
  test("derp", async () => {
    const x = {
      a: Signal(null),
      b: Signal(123),
      c: Signal(true),
      d: Signal(""),
      e: Signal({}),
      f: Signal(null as null | {} | "c" | []),
      x: Signal<"a" | "b" | "c" | null>("a"),
      ff: Signal(null as null | { a: number; b: { x: number } | null }),
      g: Signal(null as null | []),
      gg: Signal(null as null | { a: number; b?: null | { x: 123 }; c?: { z: ""; zz?: string }[] }[]),
    }

    expect(x.a()).toEqual(null)
    expect(x.b()).toEqual(123)
    expect(x.b(456)).toEqual(x.b)
    expect(x.b()).toEqual(456)

    expect(x.c()).toEqual(true)

    expect(x.d()).toEqual("")
    expect(x.d("hello world")()).toEqual("hello world")
    expect(x.f()).toEqual(null)
    expect(x.x()).toEqual("a")
    console.log("AAA")
    const memo = Signal(() => {
      console.log("wtf amte")
      return (x.ff()?.a ?? 0) + 123
    })
    console.log("BBB")
    expect(memo()).toEqual(123)
    console.log("CCC")
    memo(456)
    console.log("DDD")
    expect(memo()).toEqual(456)
    console.log("EEE")
    x.ff({ a: 999, b: null })
    console.log("FFF")
    expect(memo()).toEqual(456)
    console.log("GGG")
    const sub = firstValueFrom(memo.pipe(takeUntil(timer(500)), toArray()))
    console.log("HHH")
    expect(memo()).toEqual(999 + 123)
    console.log("JJJ")
    x.ff.subscribe(n => console.log("x.ff.WAT", n))
    // this is suppose to trigger a change
    x.ff({ a: 555, b: null })

    console.log("KK")
    expect(await sub).toEqual([1122, 555 + 123])

    expect(x.gg._.length()).toEqual(undefined)
    expect(x.gg([]))
    expect(x.gg._.length()).toEqual(0)

    expect(x.gg._[12]({ a: 123, b: null }))

    expect(x.gg()?.[12]).toEqual({ a: 123, b: null })
    expect(x.gg()?.[12]).toEqual({ a: 123, b: null })
    expect(x.gg._[12]()).toEqual({ a: 123, b: null })
    const spec = x.gg._[12]._.c
    spec([])
    expect(x.gg._[12]()).toEqual({ a: 123, b: null, c: [] })
    spec._[0]({ z: "" })
    expect(spec._[0]()).toEqual({ z: "" })
    expect(spec()).toEqual([{ z: "" }])
    x.gg._[12](undefined)
    expect(spec()).toEqual(undefined)
    expect(spec._[0]()).toEqual(undefined)
    x.gg(undefined)
    expect(x.gg._[12]()).toEqual(undefined)
  })
})
