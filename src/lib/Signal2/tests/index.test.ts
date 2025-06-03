import { combineLatest, defer, delay, firstValueFrom, of, take, takeUntil, tap, timer, toArray } from "rxjs"
import { describe, expect, test } from "vitest"
import { Signal } from "../index.deno.ts"
import { FormSignal } from "../4_FormSignal.deno.tsx"

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

    x.gg.push._?.({ a: 123, b: null })
    expect(x.gg._).toEqual([
      {
        a: 123,
        b: null,
      },
    ])
    // delete x.gg._[0]
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

    const m = Signal(() => (it.a._ ? `${it.a._}${it.b._}` : it.b._)).$.id("t1")
    expect(m._).toEqual(undefined)
    const mArr = firstValueFrom(m.$.pipe(takeUntil(timer(200)), toArray()))
    expect(await mArr).toEqual([undefined, "3x", "3y", "3z"])
  })
})

describe("FormSignal", () => {
  test("basics", async () => {
    const it = FormSignal({
      id: "test-form",
      initialState: {
        a: 1,
        b: 2,
        c: { x: [1, 2, 3] } as { x: number[] } | null,
      },
    })

    expect(it.$()).toEqual({
      a: 1,
      b: 2,
      c: {
        x: [1, 2, 3],
      },
    })

    expect(it.defaultValue$.$()).toEqual({
      a: 1,
      b: 2,
      c: {
        x: [1, 2, 3],
      },
    })

    expect(it.state$.$()).toEqual({
      errors: [],
      isDirty: false,
      isValid: true,
      isTouched: false,
      isDisabled: false,
      ref: null,
    })

    expect(it.props$.id).toEqual("test-form")
    expect(it.props$.label).toEqual({
      "data-testid": "label-for-test-form",
      htmlFor: "test-form",
      id: "label-for-test-form",
      name: "label-for-test-form",
    })
    expect(it.props$).toMatchObject({
      form: {
        "data-testid": "form-test-form",
        id: "test-form",
        name: "test-form",
      },
      id: "test-form",
      input: {
        "data-testid": "test-form",
        id: "test-form",
        name: "test-form",
      },
      label: {
        "data-testid": "label-for-test-form",
        htmlFor: "test-form",
        id: "label-for-test-form",
        name: "label-for-test-form",
      },
      name: "test-form",
    })
    expect(it.c.props$.id).toEqual("test-form-c")
    expect(it.c.x.props$.id).toEqual("test-form-c-x")
    expect(it.c.x[0].props$.id).toEqual("test-form-c-x-0")
    expect(it.c.x[0].props$.name).toEqual("c-x-0")
    expect(it.c.props$.id).toEqual("test-form-c")
    expect(it.a.props$.name).toEqual("a")
    expect(it.c.x[0].props$).toMatchObject({
      form: {
        "data-testid": "form-test-form-c-x-0",
        id: "test-form-subform-for-c-x-0",
        name: "c-x-0",
      },
      id: "test-form-c-x-0",
      input: {
        "data-testid": "test-form-c-x-0",
        id: "test-form-c-x-0",
        name: "c-x-0",
      },
      label: {
        "data-testid": "label-for-test-form-c-x-0",
        htmlFor: "test-form-c-x-0",
        id: "label-for-test-form-c-x-0",
        name: "label-for-c-x-0",
      },
      name: "c-x-0",
    })

    it.config$._ = {
      // render: () => {
      //   return null
      // },
      // validators: [next => (next.a + next.b > 100 ? "cannot be over 100" : "")],
      a: {
        validators: [],
      },
      b: {
        validators: [],
      },
      c: {
        x: {
          // validators: [
          //   Signal(() => (it.a.$() + it.b.$() < 0 ? ("a+b cannot be less than zero" as string) : ("" as string))),
          // ],
          // render: props => {
          //   props
          //   return null
          // },
          [0]: {},
        },
      },
    }

    expect(it.config$._).toEqual({
      a: { validators: [] },
      b: { validators: [] },
      c: {
        x: {
          [0]: {},
        },
      },
    })
  })
})
