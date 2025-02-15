// @vitest-environment jsdom

import { describe, it, expect, beforeEach, vi } from "vitest";
import { of, firstValueFrom, toArray, tap, take, delay } from "rxjs";
import {
  mergeByKey,
  mergeByTup,
  mergeByKeyScan,
  drawTick,
  fromEventDelegate,
  fromInputNumber,
} from "./lib";

describe("mergeByKey", () => {
  it("should merge key-value pairs from observables", async () => {
    const observable1 = of(1);
    const observable2 = of("hello");
    const observables = { observable1, observable2 };

    const expected = [
      { key: "observable1", value: 1 },
      { key: "observable2", value: "hello" },
    ];

    const actual = await firstValueFrom(
      mergeByKey(observables).pipe(toArray()),
    );
    expect(actual).toEqual(expected);
  });
});

describe("mergeByTup", () => {
  it("should merge as tuples from observables", async () => {
    const observable1 = of(1);
    const observable2 = of("hello");
    const observables = { observable1, observable2 };

    const expected = [
      ["observable1", 1],
      ["observable2", "hello"],
    ];

    const actual = await firstValueFrom(
      mergeByTup(observables).pipe(toArray()),
    );
    expect(actual).toEqual(expected);
  });
});

describe("mergeByKeyScan", () => {
  it("should merge with default values as state", async () => {
    const observable1 = of(1).pipe(delay(100));
    const observable2 = of("hello").pipe(delay(200));
    const observables = { observable1, observable2 };
    const defaultValues = { observable1: 0, observable2: "" };

    const expected = [
      { observable1: 0, observable2: "" },
      { observable1: 1, observable2: "" },
      { observable1: 1, observable2: "hello" },
    ];

    // Since startWith adds the initial state, we adjust the expectation
    const actual = await firstValueFrom(
      mergeByKeyScan(observables, defaultValues).pipe(toArray()),
    );
    expect(actual).toEqual(expected);
  });
});

// drawTick test can remain similar, this test needs a specialized environment.

describe("fromEventDelegate", () => {
  let container: HTMLElement;
  let button: HTMLButtonElement;

  beforeEach(() => {
    container = document.createElement("div");
    button = document.createElement("button");
    button.textContent = "Click me";
    container.appendChild(button);
  });

  it("should subscribe to button click events", async () => {
    const event$ = fromEventDelegate("button", "click", container);
    const handler = vi.fn();

    const subscription = event$.subscribe(handler);
    button.click();

    setTimeout(() => {
      expect(handler).toHaveBeenCalled();
      subscription.unsubscribe(); // Clean up the subscription
    }, 0);
  });
});

describe("fromInputNumber", () => {
  let container: HTMLElement;
  let input: HTMLInputElement;

  beforeEach(() => {
    container = document.createElement("div");
    input = document.createElement("input");
    input.type = "number";
    container.appendChild(input);
  });

  it.only("should emit the numeric value from input", async () => {
    const defaultValue = 0;
    const number$ = fromInputNumber("input", defaultValue).pipe(
      tap(console.log),
      take(2),
      toArray(),
    );
    const output = firstValueFrom(number$);
    input.value = "42";
    input.dispatchEvent(new InputEvent("input"));
    const out = await output;

    // Wait for event to propagate
    console.log({ out });
    expect(out).toContain(0); // Default value
    expect(out).toContain(42); // Changed value
  });
});
