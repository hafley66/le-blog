import { Subject, filter, firstValueFrom, take, takeUntil, timer, toArray } from "rxjs"
import { afterEach, describe, expect, test, vi } from "vitest"
import { ISignal, Signal, SignalCreator } from "../index.deno.ts" // Assuming your compiled output or direct source

// Helper to capture dispatched actions
const getDispatchedActions = (
  actionType: "get" | "set" | "BAD_SET",
  count: number = 1,
  timeout: number = 100, // Short timeout for quick tests
) => {
  return firstValueFrom(
    SignalCreator.dispatch.pipe(
      filter(action => action.type === actionType),
      take(count),
      toArray(),
      takeUntil(timer(timeout)), // Prevent test hanging
    ),
    { defaultValue: [] }, // Return empty array if timeout occurs before count is met
  )
}

describe("Reactive Signal System", () => {
  afterEach(() => {
    // Reset any global state if necessary, though SignalCreator.dispatch is global.
    // For robust testing, you might want to mock or re-initialize it per test,
    // but for legibility, we'll manage expectations carefully.
  })

  describe("Signal Creation and Basic Operations", () => {
    test("Signal() should create a nullish signal undefined by default", () => {
      const s = Signal()
      expect(s._).toBeUndefined()
      expect(s.$()).toBeUndefined()
      expect(s.$.value).toBeUndefined()
    })

    test("Signal(initialValue) should set initial state", () => {
      const s = Signal("hello")
      expect(s._).toBe("hello")
      expect(s.$()).toBe("hello")
    })

    test("Signal(null) should create a nullish signal with null", () => {
      const s = Signal(null)
      expect(s._).toBeNull()
    })

    test("Setting and getting root value", () => {
      const s = Signal(10)
      s.$(20)
      expect(s._).toBe(20)
      expect(s.$()).toBe(20)
      expect(s.$.value).toBe(20) // Test ASignal.value
      s.$.next(30) // Test ASignal.next
      expect(s._).toBe(30)
    })

    test("Calling $(value) should return the ASignal instance", () => {
      const s = Signal(0)
      expect(s.$(10)).toBe(s.$)
    })

    test("ASignal 'id' property should be settable and gettable", () => {
      const s = Signal(0)
      expect(s.$.id()).toBe("") // Default ID
      s.$.id("mySignal")
      expect(s.$.id()).toBe("mySignal")
      s.$.id("anotherID")
      expect(s.$.id()).toBe("anotherID")
    })

    test("ASignal 'use()' method should return current value", () => {
      const s = Signal(42)
      expect(s.$.use()).toBe(42)
      s.$(43)
      expect(s.$.use()).toBe(43)
    })
  })

  describe("Nested Properties", () => {
    test("Should get and set nested properties", () => {
      const s = Signal({ a: { b: 1 } })
      expect(s.a.b.$()).toBe(1)
      s.a.b.$(2)
      expect(s.a._).toEqual({ b: 2 })
      expect(s.a._).toEqual({ b: 2 })
      expect(s.a.b._).toBe(2)
    })

    test("Setting a nested path creates intermediate objects", () => {
      const s = Signal<{ a?: { b?: { c?: number } } }>({})
      s.a.b.c.$(100)
      expect(s.a.b.c.$()).toBe(100)
      expect(s._).toEqual({ a: { b: { c: 100 } } })
    })

    test("Accessing non-existent deep path should return undefined", () => {
      const s = Signal<{ a?: { b?: number } }>({})
      // @ts-expect-error Testing potential runtime access to non-existent prop
      expect(s.a.b.c.$()).toBeUndefined()
    })

    test("Immutability: Setting nested property should create new parent objects", () => {
      const initial = { a: { b: 1 }, x: { y: "test" } }
      const s = Signal(initial)
      const originalA = s.a._
      const originalX = s.x._

      s.a.b.$(2)

      expect(s.a._).not.toBe(originalA) // 'a' object should be new
      expect(s._).not.toBe(initial) // root object should be new
      expect(s.x._).toBe(originalX) // 'x' object should be the same instance
      expect(s._).toEqual({ a: { b: 2 }, x: { y: "test" } })
    })
  })

  describe("Observable Integration", () => {
    test("Signal(observable) should update from observable when subscribed at least once", async () => {
      const source$ = new Subject<number>()
      const s = Signal(source$)

      expect(s._).toBeUndefined() // Initial before emission

      source$.next(1)
      expect(s._).toBe(undefined)
      const sub = s.$.subscribe()

      source$.next(2)
      await timer(0).toPromise() // allow microtask queue to flush for tap in SignalCreator
      expect(s._).toBe(2)

      const collectedValues = firstValueFrom(s.$.pipe(take(2), toArray()))
      source$.next(3)
      source$.next(4)
      source$.complete() // Test completion
      expect(await collectedValues).toEqual([3, 4]) // s.$ should still emit cached + new values
      expect(s._).toBe(4) // Should hold the last value
    })

    test("Signal(observable, initialState) should use initialState", async () => {
      const source$ = new Subject<string>()
      const s = Signal(source$, "initial")

      expect(s._).toBe("initial")
      const sub = s.$.subscribe()
      source$.next("first")
      await timer(0).toPromise()
      expect(s._).toBe("first")
      sub.unsubscribe()
    })

    test("Signal's observable ($) should emit current value on subscription and then new values", async () => {
      const s = Signal(100)
      const subValues: (number | undefined)[] = []
      const subscription = s.$.subscribe(val => subValues.push(val))

      expect(subValues).toEqual([100]) // BehaviorSubject nature

      s.$(101)
      expect(subValues).toEqual([100, 101])

      s.$(102)
      expect(subValues).toEqual([100, 101, 102])

      subscription.unsubscribe()
    })
  })

  describe("SignalCreator.dispatch", () => {
    test("Should dispatch 'get' action on value access", async () => {
      const s = Signal(5)
      const dispatchPromise = getDispatchedActions("get")
      s.$() // Access value
      const actions = await dispatchPromise
      expect(actions.length).toBe(1)
      expect(actions[0].type).toBe("get")
      expect((actions[0].value as ISignal<any>)._).toBe(5)
    })

    test("Should dispatch 'set' action on value change", async () => {
      const s = Signal(10)
      const dispatchPromise = getDispatchedActions("set")
      s.$(15) // Set value
      const actions = await dispatchPromise
      expect(actions.length).toBe(1)
      expect(actions[0].type).toBe("set")
      expect((actions[0].value as ISignal<any>)._).toBe(15)
    })
  })

  describe("Signal.MEMO (Derived Signals)", () => {
    test("Memo should compute value based on dependencies", () => {
      const s1 = Signal(10)
      const s2 = Signal(5)
      const memo = Signal(() => s1.$() + s2.$())
      expect(memo.$()).toBe(15)
    })

    test("Memo should update when dependencies change", async () => {
      // Note: MEMO updates can be slightly delayed due to async dispatch and RxJS scheduling.
      // Using timers or firstValueFrom can help stabilize tests.
      const s1 = Signal(10)
      const s2 = Signal(5)
      const memo = Signal(() => {
        const val1 = s1.$()
        const val2 = s2.$()
        return val1 + val2
      })

      expect(memo.$()).toBe(15) // Initial calculation

      // Subscribe to memo to ensure it's "live" for dependency tracking activation
      const memoSub = vi.fn()
      const subscription = memo.$.subscribe(memoSub)

      // Clear console logs for cleaner test output if Signal.MEMO has them
      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {})

      s1.$(20)
      // Wait for the reactive system to propagate and memo to recompute
      await firstValueFrom(
        memo.$.pipe(
          filter(val => val === 25),
          take(1),
          takeUntil(timer(500)),
        ),
      )
      expect(memo.$()).toBe(25)

      s2.$(10)
      await firstValueFrom(
        memo.$.pipe(
          filter(val => val === 30),
          take(1),
          takeUntil(timer(500)),
        ),
      )
      expect(memo.$()).toBe(30)

      subscription.unsubscribe()
      consoleSpy.mockRestore()
    })

    test("Memo should not re-emit if computed value is deeply equal (distinctUntilChanged)", async () => {
      const s1 = Signal({ count: 0 })
      const memo = Signal(() => ({ value: s1.count.$() }))
      const collectedValues: any[] = []
      const sub = memo.$.subscribe(v => collectedValues.push(v))

      // Initial value
      await timer(10).toPromise() // Allow memo to stabilize if it has async init
      expect(collectedValues.length).toBeGreaterThanOrEqual(1)
      const initialLength = collectedValues.length

      s1.count.$(0) // Set to the same value, should not trigger memo re-emission
      await timer(50).toPromise() // Allow time for potential incorrect emission

      expect(collectedValues.length).toBe(initialLength) // No new emission

      s1.count.$(1) // Change the value
      await timer(50).toPromise() // Allow time for emission

      expect(collectedValues.length).toBe(initialLength + 1)
      expect(collectedValues[collectedValues.length - 1]).toEqual({ value: 1 })

      sub.unsubscribe()
    })

    test("Memo can be directly set, overriding computation temporarily", async () => {
      const s1 = Signal(1)
      let renderCount = 0
      const memo = Signal(() => (renderCount++, s1.$() * 10))

      expect(memo.$()).toBe(10) // Initial computation

      memo.$(999) // Direct set
      expect(memo.$()).toBe(999)

      // Now, if a dependency changes, it should recompute and overwrite the direct set
      // For this to happen, Signal.MEMO's `run$` needs to be triggered by a dependency change.
      // This involves SignalCreator.dispatch emitting a 'get' that `run$` picks up.

      // We need the memo to be "active" (subscribed to) for the dependency tracking to re-engage fully.
      const valPromise = firstValueFrom(memo.$.pipe(takeUntil(timer(200)), toArray()))

      s1.$(2) // Trigger re-computation
      expect(await valPromise).toEqual([10, 20]) // Should recompute to 2 * 10
      expect(memo.$()).toBe(20)
    })

    test("Memo dependency tracking should re-evaluate when a used signal changes", async () => {
      const condition = Signal(true)
      const sA = Signal(10)
      const sB = Signal(100)
      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {})

      const memo = Signal(() => {
        if (condition.$()) {
          return sA.$()
        } else {
          return sB.$()
        }
      })

      const collected: number[] = []
      const sub = memo.$.subscribe(v => collected.push(v))

      await timer(10).toPromise() // allow initial compute
      expect(memo.$()).toBe(10) // Depends on sA

      sB.$(200) // sB changes, but memo doesn't depend on it yet
      await timer(50).toPromise()
      expect(memo.$()).toBe(10) // Should not change

      condition.$(false) // Now memo depends on sB
      await timer(50).toPromise() // allow re-evaluation
      expect(memo.$()).toBe(200)

      sA.$(20) // sA changes, but memo no longer depends on it
      await timer(50).toPromise()
      expect(memo.$()).toBe(200) // Should not change

      sB.$(300) // sB changes, and memo depends on it
      await timer(50).toPromise()
      expect(memo.$()).toBe(300)

      expect(collected).toEqual(expect.arrayContaining([10, 200, 300]))

      sub.unsubscribe()
      consoleSpy.mockRestore()
    })
  })
})
