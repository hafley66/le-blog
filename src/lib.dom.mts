import {
  filter,
  fromEvent,
  map,
  Observable,
  pairwise,
  scan,
  shareReplay,
  startWith,
  tap,
} from "rxjs";

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
export function fromEventDelegate<K extends keyof HTMLElementEventMap>(
  selector: string,
  eventName: K,
  root = document.body,
): Observable<HTMLElementEventMap[K]> {
  return fromEvent<HTMLElementEventMap[K]>(root, eventName).pipe(
    filter(event => {
      const target = event.target as HTMLElement;
      return target?.matches(selector);
    }),
  );
}

export function fromInputDelegate(selector: string) {
  return fromEventDelegate(selector, "input").pipe(
    map(e => (e.target as HTMLInputElement).value),
  );
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

export const mouseMove$ = fromEvent<MouseEvent>(document, "mousemove").pipe(
  map(e => ({ x: e.clientX, y: e.clientY, timestamp: e.timeStamp })),
  pairwise(),
  map(([prev, curr]) => {
    const dt = curr.timestamp - prev.timestamp;
    return {
      x: (curr.x - prev.x) / dt,
      y: (curr.y - prev.y) / dt,
      currentX: curr.x,
      currentY: curr.y,
    };
  }),
  scan(
    (acc, curr) => ({
      x: acc.x * 0.8 + curr.x * 0.2,
      y: acc.y * 0.8 + curr.y * 0.2,
      currentX: curr.currentX,
      currentY: curr.currentY,
    }),
    { x: 0, y: 0, currentX: 0, currentY: 0 },
  ),
  startWith({ x: 0, y: 0, currentX: 0, currentY: 0 }),
  shareReplay({ refCount: true, bufferSize: 1 }),
);
