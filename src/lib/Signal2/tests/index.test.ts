import { combineLatest, defer, delay, firstValueFrom, of, take, takeUntil, tap, timer, toArray } from "rxjs"
import { describe, expect, test } from "vitest"
import { Signal } from "../index.deno.ts"

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
      gg: Signal(null as null | { a: number; b: null | { x: 123 } }[]),
    }

    expect(x.a.$()).toEqual(null)
    expect(x.b.$()).toEqual(123)
    x.b.$(456)
    expect(x.b._).toEqual(456)
    expect(x.b.$(456)).toEqual(x.b.$)
    expect(x.b.$()).toEqual(456)
    expect(x.c.$()).toEqual(true)

    expect(x.d.$()).toEqual("")
    expect(x.d.$("hello world")()).toEqual("hello world")
    expect(x.f.$()).toEqual(null)
    expect(x.x.$()).toEqual("a")
    console.log("AAA")
    const memo = Signal(() => {
      console.log("wtf amte")
      return (x.ff.$()?.a ?? 0) + 123
    })
    console.log("BBB")
    expect(memo.$()).toEqual(123)
    console.log("CCC")
    memo.$(456)
    console.log("DDD")
    expect(memo.$()).toEqual(456)
    console.log("EEE")
    x.ff.$({ a: 999, b: null })
    console.log("FFF")
    expect(memo.$()).toEqual(456)
    console.log("GGG")
    const sub = firstValueFrom(memo.$.pipe(takeUntil(timer(500)), toArray()))
    console.log("HHH")
    expect(memo.$()).toEqual(999 + 123)
    console.log("JJJ")
    x.ff.$.subscribe(n => console.log("x.ff.WAT", n))
    // this is suppose to trigger a change
    x.ff.$({ a: 555, b: null })

    console.log("KK")
    expect(await sub).toEqual([1122, 555 + 123])

    expect(x.gg.$()).toEqual(null)
    expect(x.gg.length._).toEqual(undefined)
    expect(x.gg.$([]))
    expect(x.gg.length.$()).toEqual(0)
  })
})

describe("Signal(observable) + Signal(memo) tests: Advanced use cases", () => {
  test("When given synchronous observables, memo would exhaust all of them", async () => {
    const it = Signal(
      combineLatest({
        a: of(1, 2, 3),
        b: of("x", "y", "z"),
      }).pipe(delay(1)),
    ).$.id("main")

    const m = Signal(() => (it.a._ ? it.a._ + "" + it.b._ : it.b._)).$.id("t1")
    expect(m._).toEqual(undefined)
    const mArr = firstValueFrom(m.$.pipe(takeUntil(timer(200)), toArray()))
    expect(await mArr).toEqual([undefined, "3x", "3y", "3z"])
  })
})
