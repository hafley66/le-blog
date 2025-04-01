import { Observable } from "rxjs"
import {
  ZodArray,
  ZodBoolean,
  ZodDate,
  ZodError,
  ZodNull,
  ZodNumber,
  ZodString,
  ZodType,
} from "zod"
import { RxJSXComponent } from "~/lib/rxjs-vhtml/v2/jsx-runtime.tsx"
import { HtmlEventIndex$ } from "~/lib/rxjs-vhtml/v2/types.dom.events.dom.ts"

export interface TaggedComponent<
  T extends RxJSXComponent = RxJSXComponent,
  Selector extends string = string,
> {
  (
    props: T extends (...args: any[]) => any
      ? Parameters<T>[0]
      : any,
  ): Observable<string>
  selector: Selector
  $: HtmlEventIndex$ & {}
  value$: InputValue$
  $capture: HtmlEventIndex$
  ref: () =>
    | (T extends "form"
        ? HTMLFormElement
        : T extends "button"
          ? HTMLButtonElement
          : T extends "dialog"
            ? HTMLDialogElement
            : HTMLElement)
    | null
}

export type InputValue$ = {
  text: (
    startWith: Observable<string>,
  ) => Observable<string>
  checkbox: (
    startWith: Observable<boolean>,
  ) => Observable<boolean>
  radio: (
    startWith: Observable<string>,
  ) => Observable<string>
  select: (
    startWith: Observable<string>,
  ) => Observable<string>
  selectNumber: (
    startWith: Observable<number>,
  ) => Observable<number>
  multiSelect: (
    startWith: Observable<string>,
  ) => Observable<string[]>
  number: (
    startWith: Observable<number>,
  ) => Observable<number>
  open: (
    startWith: Observable<boolean>,
  ) => Observable<boolean>
  date: (
    startWith: Observable<Date | null>,
  ) => Observable<Date | null>
  commaString: (
    startWith: Observable<string[]>,
  ) => Observable<string[]>
}

export type InputValue$Zod = {
  text: ZodString
  checkbox: ZodBoolean
  radio: ZodString
  select: ZodString
  selectNumber: ZodNumber
  multiSelect: ZodArray<ZodString>
  number: ZodNumber
  open: ZodBoolean
  date: ZodDate | ZodNull
  commaString: ZodArray<ZodString>
}

export type InputValue$_GetStartWith<
  T extends keyof InputValue$,
> = NonNullable<
  Parameters<InputValue$[T]>[0]
> extends Observable<infer U>
  ? U
  : never

export type SpecialInputTaggedDual<
  ID extends string = "",
  Input extends RxJSXComponent = RxJSXComponent,
  Label extends RxJSXComponent = RxJSXComponent,
  Value extends keyof InputValue$ = keyof InputValue$,
> = {
  label: TaggedComponent<Label, `#label-for-${ID}`> & {
    id: `label-for-${ID}`
  }
  input: TaggedComponent<Input, `#${ID}`> & { id: ID }
  id: ID
  selector: `#${ID}`
  value$: ReturnType<InputValue$[Value]>
  error$: Observable<
    ZodError<InputValue$_GetStartWith<Value>> | undefined
  >
  validator: InputValue$Zod[Value]
  config: WithInputConfig<ID, Input, Label, Value>
}

export type SpecialInputTaggedDual_asEntry<
  ID extends string = "",
  Input extends RxJSXComponent = RxJSXComponent,
  Label extends RxJSXComponent = RxJSXComponent,
  Value extends keyof InputValue$ = never,
> = SpecialInputTaggedDual<ID, Input, Label, Value> & {
  asEntry: () => [
    id: ID,
    out: SpecialInputTaggedDual<ID, Input, Label, Value>,
  ]
}

export type WithInputConfig<
  ID extends string = "",
  Input extends RxJSXComponent = RxJSXComponent,
  Label extends RxJSXComponent = RxJSXComponent,
  Value extends keyof InputValue$ = never,
> = {
  id: ID
  input?: Input
  label?: Label
  valueType: Value
  startsWith: Observable<InputValue$_GetStartWith<Value>>
  validator: ZodType<InputValue$_GetStartWith<Value>>
  extraProps?: any
}
