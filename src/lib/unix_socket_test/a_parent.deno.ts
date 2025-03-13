import { iterateReader } from "@std/io/iterate-reader";
import { existsSync } from "@std/fs/exists";
import {
  combineLatest,
  concatMap,
  filter,
  finalize,
  from,
  interval,
  map,
  merge,
  Observable,
  of,
  share,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
} from "rxjs";
import { $$$ } from "~/BASH.deno.ts";
import { combinePartialRecord, deferFrom, TAG } from "~/lib/lib.dual.ts";

export const UnixDomainSocketServer$ = (name: string) =>
  new Observable<
    ({ id: number } & ReturnType<typeof UnixDomainSocket$>)[]
  >((S) => {
    let server: Deno.UnixListener | null = null;
    let conns = [] as ({ id: number } & ReturnType<typeof UnixDomainSocket$>)[];
    try {
      if (existsSync(name)) {
        console.log("Removing the socket you fucker", name);
        Deno.removeSync(name);
      }
    } catch (e) {
      console.log(e);
      S.error(e);
    }
    try {
      server = Deno.listen({ path: name, transport: "unix" });
      (async () => {
        let next: Deno.UnixConn;
        try {
          let id = 0;
          while (next = await server.accept()) {
            const _id = id++;
            conns.push({ ...UnixDomainSocket$(name, next), id: _id });
            console.log({ next });
            conns.at(-1)?.output$.pipe(finalize(() => {
              const index = conns.findIndex((it) => it.id === _id);
              if (index > -1) {
                conns.splice(index, 1);
                S.next(conns);
              }
            }));
            S.next(conns);
          }
        } catch (e) {
          console.error(e);
          S.error(e);
        } finally {
          console.log("Loop over");
        }
      })();
      return () => {
        if (server) server.close();
      };
    } catch (e) {
      console.error(e);
      S.error(e);
      if (server) server.close();
    }

    return () => {
      if (server) server.close();
    };
  });

export const UnixDomainSocket$ = (
  name: string,
  conn?: Deno.UnixConn,
  // listenOrConnect: "listen" | "connect" = "connect",
) => {
  const encoder = new TextEncoder();
  const conn$ = (deferFrom(async () => {
    try {
      const it = conn ||
        (await Deno.connect({ path: name, transport: "unix" }));
      console.log({ it });
      return it;
    } catch (e) {
      console.log(e);
      throw e;
    }
  })).pipe(
    share(),
  );

  const input$ = new Subject<string>();
  input$.pipe(
    take(1),
    switchMap((i) => {
      return combineLatest([conn$, merge(of(i), input$)]).pipe(
        concatMap(async ([conn, input], index) => {
          const encoded = encoder.encode(input);
          const bytesWritten = await conn.write(encoded); // 11
          return {
            // conn,
            // input,
            encoded,
            // bytesWritten,
            // index,
          };
        }),
      );
    }),
    takeUntil(
      // Poll the connection every 0.5s
      combineLatest([interval(500), conn$]).pipe(
        filter(([_, conn]) => !conn.writable && !conn.readable),
        tap(([_, conn]) =>
          console.log("UNREADABLE UNWRITABLE socket", conn, _)
        ),
      ),
    ),
  ).subscribe();

  const output$ = conn$.pipe(
    switchMap((i) => {
      const decoder = new TextDecoder();
      return from((async function* () {
        try {
          for await (const chunk of iterateReader(i)) {
            // do something with chunk.
            yield chunk;
          }
        } catch (e) {
          console.log(e);
        } finally {
          console.log("WAT");
        }
      })()).pipe(map(
        (bytesRead, index) => {
          return {
            text: decoder.decode(bytesRead),
            // bytesRead,
            index,
          };
        },
      ));
    }),
  );
  return {
    conn$,
    input$,
    output$,
  };
};

export const UnixParentTest = () => {
  const it = UnixDomainSocketServer$("/tmp/derp");
  return combinePartialRecord({
    me: it.pipe(
      tap((i) => {
        console.log("[0]", i.text);
        it.input$.next("I received:" + i.text);
      }),
    ),
    a: $$$`deno run --watch-hmr --allow-all ${import.meta.dirname}/b_child.deno.ts`
      .pipe(
        TAG("[1]"),
      ),
    b: $$$`deno run --watch-hmr --allow-all ${import.meta.dirname}/c_child.deno.ts`
      .pipe(
        TAG("[2]"),
      ),
  });
};
