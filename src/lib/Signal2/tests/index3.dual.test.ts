import { Subject, timer, of, defer } from "rxjs"
import { describe, expect, test, vi } from "vitest"
import { Signal } from "../index.deno.ts" // Adjust path as needed

// Helper to allow microtasks and short timers to flush
const tick = (ms = 0) => timer(ms).toPromise()

describe("Signal.MEMO - Advanced Scenarios", () => {
  describe("Conditional Dependencies with External Observables", () => {
    test("Memo should subscribe/unsubscribe to Signal(Subject) based on condition", async () => {
      const condition = Signal(true)
      const sourceA$ = new Subject<number>()
      const signalA = Signal(sourceA$) // No default, initially undefined
      const sourceB$ = new Subject<string>()
      const signalB = Signal(sourceB$)

      const memoComputeFn = vi.fn(() => {
        if (condition.$()) {
          return `A: ${signalA.$()}`
        }
        return `B: ${signalB.$()}`
      })
      const memo = Signal(memoComputeFn)

      const collectedValues: string[] = []
      const sub = memo.$.subscribe(v => collectedValues.push(v))

      // Initial state: condition is true, signalA is undefined
      await tick()
      expect(memo.$()).toBe("A: undefined")
      expect(memoComputeFn).toHaveBeenCalledTimes(1) // Initial computation

      sourceA$.next(1)
      await tick()
      expect(memo.$()).toBe("A: 1")
      expect(collectedValues.at(-1)).toBe("A: 1")
      expect(memoComputeFn).toHaveBeenCalledTimes(2)

      // Switch condition
      memoComputeFn.mockClear()
      condition.$(false)
      await tick()
      // signalB is undefined initially
      expect(memo.$()).toBe("B: undefined")
      expect(collectedValues.at(-1)).toBe("B: undefined")
      // The condition change itself triggers re-evaluation.
      // The first call to memoComputeFn after condition change might still see old signalA value if not careful with timing.
      // The dependency tracking mechanism should re-evaluate due to condition change.
      expect(memoComputeFn).toHaveBeenCalledTimes(1)

      sourceB$.next("hello")
      await tick()
      expect(memo.$()).toBe("B: hello")
      expect(collectedValues.at(-1)).toBe("B: hello")
      expect(memoComputeFn).toHaveBeenCalledTimes(2)

      // IMPORTANT: Test that signalA is no longer listened to by the memo's core dependency tracking
      // This is hard to test directly without internal spies on Signal.MEMO's subscription handling.
      // We infer it: if sourceA emits, memoComputeFn should NOT be called again while condition is false.
      memoComputeFn.mockClear()
      sourceA$.next(2) // sA emits, but memo shouldn't care
      await tick(50) // Give ample time for any incorrect reaction
      expect(memo.$()).toBe("B: hello") // Value should not change
      expect(memoComputeFn).not.toHaveBeenCalled() // Computation should not run due to sourceA

      // Switch back
      condition.$(true)
      await tick()
      // signalA's last value was 2, which Signal(sourceA$) holds due to its internal BehaviorSubject
      expect(memo.$()).toBe("A: 2")
      expect(collectedValues.at(-1)).toBe("A: 2")

      sourceA$.next(3)
      await tick()
      expect(memo.$()).toBe("A: 3")

      sub.unsubscribe()
    })

    test("Memo with Signal(Observable, defaultValue)", async () => {
      const condition = Signal(true)
      const sourceA$ = new Subject<number>()
      // signalA will have '5' until sourceA$ emits, then undefined if sourceA$ completes without new value.
      const signalA = Signal(sourceA$, 5)
      const memo = Signal(() => (condition.$() ? signalA.$() : "fallback"))

      const collectedValues: (string | number)[] = []
      const sub = memo.$.subscribe(v => collectedValues.push(v))

      await tick()
      expect(memo.$()).toBe(5) // Default value from signalA

      sourceA$.next(10)
      await tick()
      expect(memo.$()).toBe(10)

      condition.$(false)
      await tick()
      expect(memo.$()).toBe("fallback")

      // sourceA$ emits, but condition is false, so memo shouldn't update to it
      sourceA$.next(20)
      await tick()
      expect(memo.$()).toBe("fallback")

      condition.$(true)
      await tick()
      // signalA holds the last value from sourceA$ (20)
      expect(memo.$()).toBe(20)

      sub.unsubscribe()
    })
  })

  describe("Signal.MEMO with Synchronous Observables (rxjs 'of')", () => {
    test("Memo with Signal(of(value)) should update correctly and not thrash", async () => {
      const sStatic = Signal(of("static")) // Resolves immediately to "static"
      const sDynamic = Signal(0)

      const memoComputeFn = vi.fn(() => {
        // sStatic.$() will be "static" after Signal initializes, or undefined briefly before
        const staticVal = sStatic.$() ?? "default_static"
        return `${staticVal}-${sDynamic.$()}`
      })
      const memo = Signal(memoComputeFn)

      const collectedValues: string[] = []
      const sub = memo.$.subscribe(v => collectedValues.push(v))

      // Allow Signal(of(...)) to initialize its internal state
      await tick()
      expect(memo.$()).toBe("static-0")
      // Initial computation + potential re-runs as Signal(of) resolves.
      // The exact count can be tricky due to microtask timing of BehaviorSubject in Signal.
      // Let's focus on the final state and subsequent updates.
      const initialCalls = memoComputeFn.mock.calls.length
      expect(initialCalls).toBeGreaterThanOrEqual(1)

      memoComputeFn.mockClear()
      sDynamic.$(1)
      await tick()
      expect(memo.$()).toBe("static-1")
      expect(collectedValues.at(-1)).toBe("static-1")
      // Should be called once for the change in sDynamic
      expect(memoComputeFn).toHaveBeenCalledTimes(1)

      memoComputeFn.mockClear()
      sDynamic.$(2)
      sDynamic.$(3) // Set multiple times synchronously
      await tick()
      expect(memo.$()).toBe("static-3")
      expect(collectedValues.at(-1)).toBe("static-3")
      // sDynamic changes from 1 -> 2, then 2 -> 3.
      // Each distinct value change in sDynamic that leads to a distinct memo output
      // will cause a computation.
      // The memo's distinctUntilChanged applies to its *output*.
      // The BehaviorSubject within sDynamic will emit for 2, then for 3.
      // So, the memo's computation function will be called for sDynamic=2 and sDynamic=3.
      expect(memoComputeFn).toHaveBeenCalledTimes(2) // Once for 2, once for 3

      sub.unsubscribe()
    })
  })

  describe("Signal.MEMO and Observable Lifetimes within Signal() wrapper", () => {
    test("Signal(defer(obs)) used in memo: underlying obs re-subscribes on memo re-evaluation if memo is sole keeper-alive", async () => {
      const trigger = Signal(0)
      const obsSource$ = new Subject<number>()
      let subscribeCount = 0
      const deferredObs$ = defer(() => {
        subscribeCount++
        return obsSource$
      })
      const sObs = Signal(deferredObs$) // Wrapped observable

      const memoComputeFn = vi.fn(() => {
        trigger.$() // Dependency to force re-evaluation
        return sObs.$() // Dependency on the Signal(deferredObs$)
      })
      const memo = Signal(memoComputeFn)

      const collectedValues: (number | undefined)[] = []
      const sub = memo.$.subscribe(v => collectedValues.push(v))

      await tick()
      // Initial evaluation of memo, sObs.$() is accessed.
      // Signal(deferredObs$) subscribes to deferredObs$, subscribeCount becomes 1.
      // sObs.$() is initially undefined.
      expect(memo.$()).toBeUndefined()
      expect(subscribeCount).toBe(1)
      expect(memoComputeFn).toHaveBeenCalledTimes(1)

      obsSource$.next(10)
      await tick()
      expect(memo.$()).toBe(10)
      expect(collectedValues.at(-1)).toBe(10)
      expect(memoComputeFn).toHaveBeenCalledTimes(2) // Called due to sObs.$ emitting

      memoComputeFn.mockClear()
      trigger.$(1) // Force memo re-evaluation by changing another dependency
      await tick()
      // Memo re-evaluates. Accesses sObs.$() again.
      // The previous subscription from memo to sObs.$ was terminated by `takeUntil(end)`.
      // If memo was the only thing keeping sObs.$ "alive", sObs's refCount for deferredObs$ would drop to 0, then back to 1.
      // This causes defer to run again.
      expect(subscribeCount).toBe(2) // Re-subscribed to deferredObs$
      expect(memo.$()).toBe(10) // sObs replayed its last value (10)
      expect(memoComputeFn).toHaveBeenCalledTimes(1) // Called once for trigger change

      obsSource$.next(20) // Emit on the *same* obsSource$ instance
      await tick()
      expect(memo.$()).toBe(20)
      expect(subscribeCount).toBe(2) // No new subscription to deferredObs$, just new value on existing one
      expect(memoComputeFn).toHaveBeenCalledTimes(2) // Called due to sObs.$ emitting 20

      sub.unsubscribe()
    })

    test("Signal(obs) lifetime: stable Signal instance doesn't re-init its source if continuously used by memo", async () => {
      // This test is similar to above, but emphasizes that if the Signal *instance* (sObs)
      // remains the same and is continuously part of the memo's dependencies,
      // its internal shareReplay handles the source observable's subscription.
      // The key is that `defer` runs when the observable *passed to Signal()* is subscribed to.
      // `Signal` itself uses `shareReplay({ refCount: true })` on this observable.

      const trigger = Signal(0)
      const source$ = new Subject<string>()
      let sourceSubscriptionCount = 0

      // We create the Signal instance *outside* and reuse it.
      const sWrappedSource = Signal(
        defer(() => {
          sourceSubscriptionCount++
          return source$
        }),
        "initial",
      )

      const memo = Signal(() => {
        trigger.$() // To trigger re-evaluations of the memo
        return sWrappedSource.$() // Always depends on the same sWrappedSource instance
      })

      const values: string[] = []
      const subscription = memo.$.subscribe(v => values.push(v!))

      await tick()
      expect(sWrappedSource.$()).toBe("initial")
      expect(memo.$()).toBe("initial")
      expect(sourceSubscriptionCount).toBe(1) // Initial subscription by sWrappedSource due to memo

      source$.next("first")
      await tick()
      expect(memo.$()).toBe("first")
      expect(sourceSubscriptionCount).toBe(1) // Still 1, source$ is hot

      trigger.$(1) // Memo re-evaluates, re-subscribes to sWrappedSource.$
      await tick()
      // Because sWrappedSource.$ is continuously subscribed to by the memo (old sub ends, new one begins in same tick essentially),
      // and sWrappedSource uses shareReplay, the subscription to the deferred source$
      // might not be fully torn down and re-established if the timing is tight.
      // However, the more robust view is that `takeUntil(end)` in memo WILL terminate its subscription to `sWrappedSource.$`.
      // If the memo is the ONLY subscriber to `sWrappedSource.$`, then `sWrappedSource`'s `refCount` WILL drop to 0,
      // causing unsubscription from `defer(...)`, and then re-subscription, incrementing `sourceSubscriptionCount`.
      expect(memo.$()).toBe("first") // sWrappedSource replays last value
      expect(sourceSubscriptionCount).toBe(2) // Re-subscribed due to refCount behavior

      source$.next("second")
      await tick()
      expect(memo.$()).toBe("second")
      expect(sourceSubscriptionCount).toBe(2) // No new subscription, just value propagation

      subscription.unsubscribe()
    })

    test("Memo conditionally using different Signal(obs) instances", async () => {
      const condition = Signal(true)
      let subCount1 = 0
      let subCount2 = 0
      const source1$ = new Subject<string>()
      const source2$ = new Subject<string>()

      // Create Signal instances outside if they are meant to be stable *themselves*
      const s1 = Signal(
        defer(() => {
          subCount1++
          return source1$
        }),
        "s1_default",
      )
      const s2 = Signal(
        defer(() => {
          subCount2++
          return source2$
        }),
        "s2_default",
      )

      const memo = Signal(() => {
        return condition.$() ? s1.$() : s2.$()
      })

      const values: string[] = []
      const sub = memo.$.subscribe(v => values.push(v!))

      await tick() // Initial evaluation
      expect(memo.$()).toBe("s1_default")
      expect(subCount1).toBe(1) // s1 is used
      expect(subCount2).toBe(0) // s2 is not used

      source1$.next("s1_val1")
      await tick()
      expect(memo.$()).toBe("s1_val1")
      expect(subCount1).toBe(1)

      condition.$(false) // Switch to s2
      await tick()
      expect(memo.$()).toBe("s2_default")
      expect(subCount1).toBe(1) // s1's source subscription might be closed by refCount if memo was only sub
      expect(subCount2).toBe(1) // s2 is now used, its defer runs

      source2$.next("s2_val1")
      await tick()
      expect(memo.$()).toBe("s2_val1")
      expect(subCount2).toBe(1)

      source1$.next("s1_val2") // s1 emits, but memo doesn't care
      await tick(50)
      expect(memo.$()).toBe("s2_val1") // Stays on s2's value
      expect(subCount1).toBe(1) // No new subscription to s1's source

      condition.$(true) // Switch back to s1
      await tick()
      // s1 replays its last known value "s1_val2" because source1$ is a Subject
      // and s1 (the Signal instance) caches its state.
      // The defer for s1 runs again because its refCount went to 0 and now back to 1.
      expect(memo.$()).toBe("s1_val2")
      expect(subCount1).toBe(2) // s1's defer re-runs
      expect(subCount2).toBe(1) // s2's count remains

      sub.unsubscribe()
    })
  })
})
