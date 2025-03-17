import { assertEquals } from "@std/assert"
import { expect } from "@std/expect"

import { firstValueFrom, Observable, toArray } from "rxjs"

const Derp = (props: { value: string }) => {
  console.log({ props })
  return <div>Fudge</div>
}

// (<Derp value="derp"/>).subscribe(a => console.log({a}));
Derp({ value: "darp" }).subscribe(b => console.log({ b }))
// (jsx(Derp, {value: "darp"})).subscribe(c => console.log({c}))
const { test } = Deno

test("small elements", async () => {
  const collect = (it: Observable<string>) =>
    firstValueFrom(it.pipe(toArray()))

  expect(await collect(<div>Hello world</div>)).toMatch([
    "<div>Hello World</div>",
  ])
})
