import { Observable, ObservableInput } from "rxjs";
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
export declare function mergeByKey<T extends Record<string, Observable<any>>>(rec: T): Observable<{
    [K in keyof T]: {
        key: K;
        value: T[K] extends Observable<infer U> ? U : never;
    };
}[keyof T]>;
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
export declare function mergeByTup<T extends Record<string, Observable<any>>>(rec: T): Observable<{
    readonly [K in keyof T]: [
        K,
        T[K] extends Observable<infer U> ? U : never
    ];
}[keyof T]>;
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
export declare function mergeByKeyScan<T extends Record<string, Observable<any>>>(rec: T, defaultVal: {
    [K in keyof T]: T[K] extends Observable<infer U> ? U : never;
}): Observable<{
    [K in keyof T]: T[K] extends Observable<infer U> ? U : never;
}>;
/**
 * An observable that emits a tick value at each animation frame.
 *
 * @example
 * drawTick.subscribe(tick => {
 *   console.log(tick);
 * });
 */
export declare const drawTick: Observable<number>;
export declare function shareLatest<T>(): (source: Observable<T>) => Observable<T>;
export declare function TAG<T>(TAG_PREFIX: string | number): (source: Observable<T>) => Observable<T>;
export declare function deferFrom<T>(factory: () => ObservableInput<T>): Observable<T>;
/**
 * Partial combineLatest, where we are waiting for FIRST next from ANY, not at least FIRST from EVERY
 * @param sources
 * @returns
 */
export declare function combinePartialArray<T extends Observable<any>[]>(sources: T): Observable<{
    [K in keyof T]: T[K] extends Observable<infer U> ? U | undefined : never;
}>;
export declare function combinePartialRecord<T extends Record<string, Observable<any>>>(sources: T): Observable<{
    [K in keyof T]: T[K] extends Observable<infer U> ? U | undefined : never;
}>;
