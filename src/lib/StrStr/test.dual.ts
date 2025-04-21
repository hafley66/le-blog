import {
  StrStr,
  StrStrType,
} from "~/lib/StrStr/index.dual.ts"

function testStrStrSystem() {
  const log = console.log

  // Basic path building
  const a = StrStr("users/{id}/card")
  console.assert(
    a.to.url() === "users/{id}/card",
    "url path",
  )
  console.assert(
    a.to.css.id() === "#users-{id}-card",
    "css id",
  )

  // .join
  console.assert(
    a.join(".") === "users.{id}.card",
    "dot join",
  )

  // Template key extraction
  type AKeys = typeof a extends StrStrType<any, infer K>
    ? K
    : never
  console.assert(
    true as AKeys extends "id" ? true : false,
    "keys extracted",
  )

  // .x extension and chaining
  const b = a.x("delete-button")
  console.assert(
    b.to.css.class() === ".users-{id}-card-delete-button",
    "x + css class",
  )

  // .with() resolution
  const bResolved = b.with({ id: "123" })
  console.assert(
    bResolved.to.css.id() ===
      "#users-123-card-delete-button",
    "with resolved id",
  )

  // .next() + callable
  const bWithValue = bResolved.next("somePayload")
  console.assert(
    bWithValue() === "somePayload",
    "next returns value",
  )
  console.assert(
    bWithValue._ === "somePayload",
    "next _.value matches",
  )
  console.assert(
    bWithValue.__.to.url() ===
      "users/123/card/delete-button",
    "next __ structure",
  )

  // .declare
  const root = StrStr(["form"])
  const decl = root.declare({
    email: k => k.next("user@example.com"),
    submit: k => k,
  })

  console.assert(
    decl.email()() === "user@example.com",
    "declare email value",
  )
  console.assert(
    decl.submit.__.to.css.id() === "#form-submit",
    "declare structure preserved",
  )

  // .$
  const eventTarget = document.createElement("button")
  eventTarget.id = "users-321-card-delete-button"
  document.body.appendChild(eventTarget)

  const clickStream = b.$.click.subscribe(e => {
    console.assert(
      e.delegateElement === eventTarget,
      "delegateElement match",
    )
    console.assert(
      e.params.id === "321",
      "params extracted",
    )
    log("✅ click observable params:", e.params)
    clickStream.unsubscribe()
  })

  eventTarget.dispatchEvent(
    new MouseEvent("click", { bubbles: true }),
  )

  log("✅ All StrStr tests passed")
  return null
}

export default () => testStrStrSystem()
