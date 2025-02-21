import { merge, fromEvent, map } from "rxjs";

const events = merge(
  fromEvent(document, "click").pipe(
    map(i => ({ type: "click", target: i.target }) as const),
  ),
);
events;
//  ^?
