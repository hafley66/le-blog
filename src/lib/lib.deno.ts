import { finalize, merge, Observable, Subject, takeUntil } from "rxjs";

export const SIGINT$ = new Subject<void>();
export const SIGTERM$ = new Subject<void>();

export const UNTIL_SIGEXIT = merge(SIGINT$, SIGTERM$);
export const TAKE_UNTIL_EXIT =
  <T>() => (source: Observable<T>): Observable<T> =>
    source.pipe(takeUntil(UNTIL_SIGEXIT.pipe(finalize(() => {
      setTimeout(() => process.exit(), 1000);
    }))));

Deno.addSignalListener("SIGINT", () => {
  console.log("interrupted!");
  SIGINT$.next();
});

Deno.addSignalListener("SIGTERM", () => {
  console.log("interrupted!");
  SIGTERM$.next();
});
