import {
  Observable,
  animationFrameScheduler,
  interval,
  map,
  merge,
  scan,
  startWith,
  tap,
} from "rxjs";

/**
 * Merges multiple observables into a single observable, while preserving the key-value pairs of the original observables.
 *
 * @param rec An object containing observables as values.
 * @returns An observable that emits the key-value pairs of the original observables.
 *
 * @example
 * const observable1 = of(1);
 * const observable2 = of("hello");
 * const observable3 = of(true);
 *
 * const mergedObservable = mergeByKey({ observable1, observable2, observable3 });
 *
 * mergedObservable.subscribe(value => {
 *   console.log(value.key, value.value);
 * });
 *
 * // Output:
 * // observable1 1
 * // observable2 hello
 * // observable3 true
 */
export function mergeByKey<T extends Record<string, Observable<any>>>(
  rec: T,
): Observable<
  {
    [K in keyof T]: {
      key: K;
      value: T[K] extends Observable<infer U> ? U : never;
    };
  }[keyof T]
> {
  return merge(
    ...Object.keys(rec).map(key =>
      rec[key].pipe(
        map(value => ({
          key,
          value,
        })),
      ),
    ),
  );
}

/**
 * Merges multiple observables into a single observable, while preserving the key-value pairs of the original observables as tuples.
 *
 * @param rec An object containing observables as values.
 * @returns An observable that emits the key-value pairs of the original observables as tuples.
 *
 * @example
 * const observable1 = of(1);
 * const observable2 = of("hello");
 * const observable3 = of(true);
 *
 * const mergedObservable = mergeByTup({ observable1, observable2, observable3 });
 *
 * mergedObservable.subscribe(value => {
 *   console.log(value[0], value[1]);
 * });
 *
 * // Output:
 * // observable1 1
 * // observable2 hello
 * // observable3 true
 */
export function mergeByTup<T extends Record<string, Observable<any>>>(
  rec: T,
): Observable<
  {
    readonly [K in keyof T]: [K, T[K] extends Observable<infer U> ? U : never];
  }[keyof T]
> {
  // @ts-ignore
  return merge(
    ...Object.keys(rec).map(key =>
      rec[key].pipe(map(value => [key, value] as const)),
    ),
  );
}

/**
 * Merges multiple observables into a single observable, while preserving the key-value pairs of the original observables.
 *
 * @param rec An object containing observables as values.
 * @param defaultVal An object containing default values for each key.
 * @returns An observable that emits the key-value pairs of the original observables.
 *
 * @example
 * const observable1 = of(1);
 * const observable2 = of("hello");
 * const observable3 = of(true);
 *
 * const mergedObservable = mergeByKeyScan({ observable1, observable2, observable3 }, { observable1: 0, observable2: "", observable3: false });
 *
 * mergedObservable.subscribe(value => {
 *   console.log(value.observable1, value.observable2, value.observable3);
 * });
 *
 * // Output:
 * // 1 hello true
 */
export function mergeByKeyScan<T extends Record<string, Observable<any>>>(
  rec: T,
  defaultVal: { [K in keyof T]: T[K] extends Observable<infer U> ? U : never },
): Observable<{
  [K in keyof T]: T[K] extends Observable<infer U> ? U : never;
}> {
  return mergeByKey(rec).pipe(
    scan((state, next) => ((state[next.key] = next.value), state), defaultVal),
    startWith(defaultVal),
  );
}

/**
 * An observable that emits a tick value at each animation frame.
 *
 * @example
 * drawTick.subscribe(tick => {
 *   console.log(tick);
 * });
 */
export const drawTick = interval(0, animationFrameScheduler).pipe(
  s$ =>
    new Observable<number>(s => {
      let start = performance.now();
      let u = s$.pipe(map(() => performance.now() - start)).subscribe(s);
      return () => {
        u.unsubscribe();
      };
    }),
);

/**
 * Creates an observable that emits events of a specific type from elements matching a selector.
 *
 * @param selector The selector to match elements against.
 * @param event The type of event to listen for.
 * @param container The container element to attach the event listener to. Defaults to `document.body`.
 * @returns An observable that emits events of the specified type from matching elements.
 *
 * @example
 * const buttonClicks = fromEventDelegate("button", "click");
 *
 * buttonClicks.subscribe(event => {
 *   console.log("Button clicked:", event);
 * });
 */
export function fromEventDelegate<Event extends keyof HTMLElementEventMap>(
  selector: string,
  event: Event,
  container = document.body,
) {
  return new Observable<HTMLElementEventMap[Event]>(subscriber => {
    const handler = (e: HTMLElementEventMap[Event]) => {
      if (e.target instanceof HTMLElement && e.target.matches(selector))
        subscriber.next(e);
    };
    container.addEventListener(event, handler);
    return () => container.removeEventListener(event, handler);
  });
}

/**
 * Creates an observable that emits the numeric value of an input element.
 *
 * @param selector The selector of the input element.
 * @param defaultValue The default value to emit if the input element's value is not available. Defaults to `undefined`.
 * @returns An observable that emits the numeric value of the input element.
 *
 * @example
 * const inputNumber = fromInputNumber("#myInput", 0);
 *
 * inputNumber.subscribe(value => {
 *   console.log("Input value:", value);
 * });
 */
export function fromInputNumber(selector: string, defaultValue?: number) {
  return fromEventDelegate(selector, "input").pipe(
    map(e => +(e.target as HTMLInputElement).value),
    startWith(defaultValue),
    tap(console.log),
  );
}
