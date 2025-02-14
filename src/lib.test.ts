import { describe, it, expect, beforeEach, vi } from "vitest";
import { of } from "rxjs";
import {
  mergeByKey,
  mergeByTup,
  mergeByKeyScan,
  drawTick,
  fromEventDelegate,
  fromInputNumber,
} from "./lib";

describe("mergeByKey", () => {
  it("should merge key-value pairs from observables", done => {
    const observable1 = of(1);
    const observable2 = of("hello");
    const observables = { observable1, observable2 };

    const expected = [
      { key: "observable1", value: 1 },
      { key: "observable2", value: "hello" },
    ];

    const actual: any[] = [];
    mergeByKey(observables).subscribe({
      next: value => actual.push(value),
      error: done,
      complete: () => {
        expect(actual).toEqual(expected);
        done();
      },
    });
  });
});

describe("mergeByTup", () => {
  it("should merge as tuples from observables", done => {
    const observable1 = of(1);
    const observable2 = of("hello");
    const observables = { observable1, observable2 };

    const expected = [
      ["observable1", 1],
      ["observable2", "hello"],
    ];

    const actual: any[] = [];
    mergeByTup(observables).subscribe({
      next: value => actual.push(value),
      error: done,
      complete: () => {
        expect(actual).toEqual(expected);
        done();
      },
    });
  });
});

describe("mergeByKeyScan", () => {
  it("should merge with default values as state", done => {
    const observable1 = of(1);
    const observable2 = of("hello");
    const observables = { observable1, observable2 };
    const defaultValues = { observable1: 0, observable2: "" };

    const expected = [
      { observable1: 1, observable2: "" },
      { observable1: 1, observable2: "hello" },
    ];

    const actual: any[] = [];
    mergeByKeyScan(observables, defaultValues).subscribe({
      next: value => actual.push(value),
      error: done,
      complete: () => {
        expect(actual).toEqual(expected);
        done();
      },
    });
  });
});

describe("drawTick", () => {
  it("should emit a sequence of numbers", () => {
    // This test needs a specialized environment like @vitest/browser
    // or can be substituted with a browser-based test environment.
  });
});

describe("fromEventDelegate", () => {
  let container: HTMLElement;
  let button: HTMLButtonElement;

  beforeEach(() => {
    container = document.createElement("div");
    button = document.createElement("button");
    button.textContent = "Click me";
    container.appendChild(button);
  });

  it("should subscribe to button click events", done => {
    const event$ = fromEventDelegate("button", "click", container);
    const handler = vi.fn();

    const subscription = event$.subscribe(handler);

    button.click();

    setTimeout(() => {
      expect(handler).toHaveBeenCalled();
      subscription.unsubscribe();
      done();
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

  it("should emit the numeric value from input", done => {
    const defaultValue = 0;
    const number$ = fromInputNumber("input", defaultValue);
    const handler = vi.fn();

    const subscription = number$.subscribe(handler);

    input.value = "42";
    input.dispatchEvent(new Event("input"));

    setTimeout(() => {
      expect(handler).toHaveBeenCalledWith(42);
      subscription.unsubscribe();
      done();
    }, 0);
  });
});
