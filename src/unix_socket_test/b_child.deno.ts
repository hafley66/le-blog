import { UnixDomainSocket$ } from "~/lib/unix_socket_test/a_parent.deno.ts";
import { TAG } from "~/lib/lib.dual.ts";
import { lastValueFrom } from "rxjs";

const it = UnixDomainSocket$("/tmp/derp");

const wait = lastValueFrom(it.output$.pipe(
  TAG("Read B_CHILD"),
));

it.input$.next("DERP C");
console.log("Hmm");
await wait;
