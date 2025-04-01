import { mapValues, omitBy, pickBy } from "lodash"
import { z, ZodError } from "zod"
import jsx, {
  RxJSXComponent,
} from "~/lib/rxjs-vhtml/v2/jsx-runtime"
import {
  AND_THEN,
  shareLatest,
  TAG,
} from "~/lib/lib.dual.ts"
import {
  InputValue$,
  InputValue$_GetStartWith,
  SpecialInputTaggedDual,
  SpecialInputTaggedDual_asEntry,
  WithInputConfig,
} from "./types.dual"
import { withId } from "./with.dom"
import { event$, pre } from "../lib.dom"
import {
  filter,
  isObservable,
  map,
  merge,
  mergeWith,
  Observable,
  of,
  repeat,
  share,
  switchMap,
  withLatestFrom,
} from "rxjs"

export const InputConfig = <
  ID extends string = "",
  Input extends RxJSXComponent = RxJSXComponent,
  Label extends RxJSXComponent = RxJSXComponent,
  Value extends keyof InputValue$ = keyof InputValue$,
>(
  config: WithInputConfig<ID, Input, Label, Value>,
) => config

const FORM_RESET = event$("form")("reset").pipe(
  TAG("reset"),
  share(),
)

export function withInput<
  ID extends string = "",
  Input extends RxJSXComponent = RxJSXComponent,
  Label extends RxJSXComponent = RxJSXComponent,
  Value extends keyof InputValue$ = keyof InputValue$,
>(
  config: WithInputConfig<ID, Input, Label, Value>,
): SpecialInputTaggedDual_asEntry<ID, Input, Label, Value> {
  const {
    id,
    input,
    label,
    valueType,
    startsWith,
    validator,
    extraProps,
    debug,
  } = config
  const input$ = withId(input || "input", id, {
    name: id,
    type:
      valueType === "commaString"
        ? "text"
        : valueType === "multiSelect" ||
            valueType === "selectNumber"
          ? "select"
          : valueType,
    ...extraProps,
  })
  let __ = {} as any

  // @ts-ignore there is no pleasing you eh?
  const it: SpecialInputTaggedDual<
    ID,
    Input,
    Label,
    Value
  > = {
    // @ts-ignore
    input: input$,
    // @ts-ignore
    label: withId(
      typeof label === "string" && label !== "label"
        ? "label"
        : (label ?? "label"),
      `label-for-${id}` as const,
      {
        for: id,
        ...(typeof label === "string" && label !== "label"
          ? { children: [label] }
          : label == null
            ? { children: [id] }
            : {}),
      },
    ),
    validator: validator ?? z.any(),
    // @ts-ignore
    get value$() {
      // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
      return (__["value$"] ||= input$.value$[
        valueType || "text"
      ](
        // @ts-ignore
        startsWith.pipe(
          switchMap(nextDefault => {
            return of(nextDefault).pipe(
              repeat({
                delay: () =>
                  FORM_RESET.pipe(
                    filter(
                      i =>
                        (input$.ref() as HTMLInputElement)
                          ?.form === i.target,
                    ),
                  ),
              }),
            )
          }),
        ),
      )).pipe(debug ? TAG(config.id + " VALUE$") : i => i)
    },
    // @ts-ignore there is no pleasing you eh?
    get error$() {
      // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
      return (__["error$"] ||= it.value$.pipe(
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        // @ts-ignore there is no pleasing you eh?
        map((v: any) => validator?.safeParse(v)?.error),
        // TAG(config.id + "ERROR"),
        shareLatest(),
      ))
    },
    config,
    id: input$.id,
    selector: input$.selector,
  }
  return {
    ...it,
    asEntry() {
      return [id, it] as const
    },
  }
}

export function withForm<
  ID extends string = string,
  Form extends RxJSXComponent = RxJSXComponent,
  SubmitButton extends RxJSXComponent = RxJSXComponent,
  ResetButton extends RxJSXComponent = RxJSXComponent,
>(
  id: ID,
  config: {
    form?: Form
    submitButton?: SubmitButton
    resetButton?: ResetButton
  } = {},
) {
  const { form = "form" } = config

  const N = pre(id)
  const out = {
    id,
    Form: withId(form, id),
    SubmitButton: withId(
      config.submitButton ?? "button",
      N("submit"),
      { type: "submit", name: N("submit") },
    ),
    ResetButton: withId(
      config.resetButton ?? "button",
      N("reset"),
    ),
    ns: N,
  }
  function withInputs<
    const T extends Record<
      string,
      WithInputConfig<
        string,
        RxJSXComponent,
        RxJSXComponent,
        keyof InputValue$
      >
    >,
  >(items: T) {
    const defaults$ = AND_THEN(
      mapValues(items, v =>
        isObservable(v.startsWith) ? v : of(v),
      ),
    ) as Observable<{
      [K in keyof T]: InputValue$_GetStartWith<
        T[K]["valueType"]
      >
    }>
    const index = mapValues(items, v =>
      withInput({
        ...v,
        id: `${id}--${v.id}`,
        label: v.label ?? v.id,
      }),
    ) as {
      [K in keyof T &
        string]: SpecialInputTaggedDual_asEntry<
        `${ID}--${T[K]["id"]}`,
        T[K]["input"] extends RxJSXComponent
          ? T[K]["input"]
          : "input",
        T[K]["label"] extends RxJSXComponent
          ? T[K]["label"]
          : "label",
        T[K]["valueType"]
      >
    }

    // const hmm = Object.fromEntries(
    //   inputs.map(i => [i.id, i]),
    // ) as {
    //   [K in (typeof inputs)[number]["id"]]: Extract<
    //     (typeof inputs)[number],
    //     { id: K }
    //   >
    // }

    const value$ = AND_THEN(
      mapValues(index, i => i.value$),
    ) as Observable<{
      [K in keyof T]: InputValue$_GetStartWith<
        T[K]["valueType"]
      >
    }>

    const out2 = {
      ...out,
      items,
      _: index,
      value$,
      defaults$,
      error$: AND_THEN(
        mapValues(index, i => i.error$),
      ).pipe(
        map(i =>
          Object.entries(i).some(i => !!i[1])
            ? i
            : undefined,
        ),
        shareLatest(),
      ) as Observable<
        | {
            [K in keyof T]:
              | ZodError<
                  InputValue$_GetStartWith<
                    T[K]["valueType"]
                  >
                >
              | undefined
          }
        | undefined
      >,
      get disabled$(): Observable<boolean> {
        return this.error$.pipe(map(Boolean))
      },
      validator: z.object(
        // @ts-ignore
        pickBy(
          mapValues(index, i => i.validator),
          Boolean,
        ) as {
          [K in keyof typeof index]: (typeof index)[K]["validator"]
        },
      ),
      standard: () =>
        Object.entries(index).flatMap(
          ([k, Val]: [string, any], index) => {
            return [
              jsx(
                Val.label,
                {},
                Val.id + "::label::" + index,
              ),
              jsx(
                Val.input,
                {},
                Val.id + "::input::" + index,
              ),
              jsx("ul", {
                className: "with-form-error",
                children: [
                  Val.error$.pipe(
                    map(
                      (
                        i: ZodError<any> | undefined,
                        index,
                      ) => (!i ? null : i),
                      // : ii.issues.map((ii, index) =>
                      //     jsx(
                      //       "li",
                      //       { children: [ii] },
                      //       index + "",
                      //     ),
                      //   ),
                    ),
                  ),
                ],
              }),
            ]
          },
        ),
    }

    return {
      ...out2,
      get submit$() {
        return out.Form.$.submit.pipe(
          withLatestFrom(
            AND_THEN({
              value: out2.value$,
              error: out2.error$,
            }),
          ),
          map(i => ({
            id: out.id,
            submit: i[0],
            ...i[1],
          })),
        )
      },
    }
  }
  return {
    ...out,
    withInputs,
  }
}
