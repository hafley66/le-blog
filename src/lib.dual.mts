import {
  Observable,
  ObservableInput,
  animationFrameScheduler,
  defer,
  from,
  interval,
  map,
  merge,
  scan,
  shareReplay,
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
    scan((state, next) => ({ ...state, [next.key]: next.value }), defaultVal),
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

export function shareLatest<T>() {
  return (source: Observable<T>) =>
    shareReplay<T>({ bufferSize: 1, refCount: true })(source);
}

export function TAG<T>(TAG_PREFIX: string | number) {
  return (source: Observable<T>) =>
    tap<T>({
      next: n => console.log(`${TAG_PREFIX}/next`, n),
      error: e => console.log(`${TAG_PREFIX}/error`, e),
      complete: () => console.log(`${TAG_PREFIX}/complete`),
      finalize: () => console.log(`${TAG_PREFIX}/finalize`),
      subscribe: () => console.log(`${TAG_PREFIX}/subscribe`),
      unsubscribe: () => console.log(`${TAG_PREFIX}/unsubscribe`),
    })(source);
}

export function deferFrom<T>(factory: () => ObservableInput<T>): Observable<T> {
  return defer(() => from(factory()));
}
