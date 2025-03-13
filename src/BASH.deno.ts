import { $, ProcessPromise } from "zx";
import { Observable } from "rxjs";

export const $$ = (pieces: TemplateStringsArray, ...args: any[]) => {
  return new Observable<string>((subscriber) => {
    const process = $(pieces, ...args) as ProcessPromise;
    process.then(
      (next) => {
        subscriber.next(next.toString());
      },
    ).catch((err) => {
      subscriber.error(err);
    })
      .finally(() => {
        subscriber.complete();
      });

    return () => {
      process.kill();
    };
  });
};

export const $$$ = (pieces: TemplateStringsArray, ...args: any[]) => {
  return new Observable<string>((subscriber) => {
    let process: ProcessPromise | null = null;
    try {
      process = $(pieces, ...args) as ProcessPromise;
      process.catch((err) => subscriber.error(err));
    } catch (e) {
      subscriber.error(e);
    }

    if (!process) {
      if (!subscriber.closed) {
        subscriber.complete();
      }
    } else {
      const run = async () => {
        try {
          for await (const it of process) {
            subscriber.next(it);
          }
          subscriber.complete();
        } catch (e) {
          console.log("ZX ERROR");
          console.error(e);
          if (!subscriber.closed) {
            subscriber.error(e);
          }
        } finally {
          if (!subscriber.closed) {
            subscriber.unsubscribe();
          }
        }
      };

      run();
    }
    // process.stdout.on("error", (error) => {
    //   subscriber.error(error);
    // });

    // process.stdout.on("end", () => {
    //   subscriber.complete();
    // });

    return () => {
      if (
        process &&
        !(process?.stage === "fulfilled" || process?.stage === "rejected")
      ) {
        process.kill();
      }
    };
  });
};

$$.test = () => {
  // Example usage
  $$`echo "Hello, World!"`.subscribe({
    next: console.log,
    error: console.error,
    complete: () => console.log("Completed"),
  });

  $$$`echo "Hello,
  World!" derpy deroo`.subscribe({
    next: (i) => console.log({ i }),
    error: console.error,
    complete: () => console.log("Completed2"),
  });

  $$$`echo "Hello,
World! derpy deroo`.subscribe({
    next: (i) => console.log({ i }),
    error: (error) => console.error({ error }),
    complete: () => console.log("Completed2"),
  });
};

// const p = $({
//   stdio: ["pipe", "inherit", "inherit"],
// })`while read; do echo $REPLY; done`;
// p.stdin.write("Hello, za warudo\n");
// p.stdin.write("what a nice day we are having\n");
// p.stdin.end();
// // $$.test();
// // await p.then((i) => i.stdout);
