import { UnixDomainSocket$ } from "~/lib/unix_socket_test/a_parent.deno.ts";
import { TAG } from "~/lib/lib.dual.ts";
import { lastValueFrom, tap } from "rxjs";

const it = UnixDomainSocket$("/tmp/derp");

const wait = lastValueFrom(it.output$.pipe(
  TAG("Read C_CHILD"),
  tap((i) => i.text.includes("DERP C") ? it.input$.next("Gotcha") : ""),
));

it.input$.next("DERP B");

await wait;
