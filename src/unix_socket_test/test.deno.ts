import { lastValueFrom } from "rxjs";
import { UnixParentTest } from "./a_parent.deno.ts";

await lastValueFrom(UnixParentTest());
