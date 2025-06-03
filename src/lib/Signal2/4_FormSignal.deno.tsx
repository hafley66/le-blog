/** @jsxImportSource react */
import React, { JSX, SyntheticEvent } from "react"
import { SignalCreator } from "~/lib/Signal2/0_SignalCreator.deno.ts"
import { ISignal, RSignal } from "~/lib/Signal2/types.ts"
import { _RSignalGetRecursiveValue, DepthLimit, isRecursive } from "~/lib/Signal2/index.deno.ts"
import { get } from "lodash"
import { defer, from, Subject } from "rxjs"
import { Signal } from "~/lib/Signal2/2_Signal.deno.ts"

export type ValidatorResult_0 = string | { type: string; value: string } | string[] | { type: string; value: string }[]
type MaybeValidatorResult_0 = ValidatorResult_0 | Promise<ValidatorResult_0> | RSignal<ValidatorResult_0>
type _ValidatorMap_1<T> = ((val: T) => MaybeValidatorResult_0) | RSignal<string[]> | RSignal<string>
export type ValidatorMap_1<T> = _ValidatorMap_1<T> | _ValidatorMap_1<T>[]

export type FieldProps<T> = {
  id: string
  name: string
  onChange: (e: T | SyntheticEvent) => void
  onBlur: (e: any) => void
  input: {
    "data-testid": string
    name: string
    id: string
    onChange: (e: any) => void
    onBlur: (e: any) => void
    type?: string
  }
  label: {
    "data-testid": string
    name: string
    id: string
    htmlFor: string
  }
  form: {
    "data-testid": string
    name: string
    id: string
    onSubmit: (e: SyntheticEvent) => void
  }
}

export type FieldState<T> = {
  errors: string[]
  isValid: boolean
  isDisabled: boolean
  isDirty: boolean
  isTouched: boolean
  ref: null | HTMLElement
}

type SignalFieldReactFunctions<T> = {
  resetToFactoryDefaults: () => void
  reset: () => void
  commit: () => () => void
  forceValidate: () => void
}

export function FormSignal<T>(opts: {
  id: string
  initialState: T
  validateEvent?: "submit" | "change" | "blur"
  revalidateEvent?: "submit" | "change" | "blur"
}) {
  const rootConfig: RSignal<RConfig<T>> = SignalCreator<RConfig<T>>({
    initialState: {},
  })

  const rootDefaultValue = SignalCreator({
    initialState: opts.initialState,
  })

  const events = new Subject<
    | ["resetToFactoryDefaults", path: string[]]
    | ["reset", path: string[]]
    | ["commit", path: string[]]
    | ["forceValidate", path: string[]]
  >()

  const root: RSignalField<T> = SignalCreator({
    initialState: opts.initialState,
    // observable: defer(() => from()),
    createBase: (root_, path) => {
      const id = path ? `${opts.id}-${path?.join("-")}` : opts.id
      const name = path?.join("-") ?? opts.id
      const onBlur = (e: any) => {}
      const onChange = (e: T | SyntheticEvent) => {}

      const inputProps = {
        id,
        name,
        onBlur,
        onChange,
      }

      const defaultValue$ = !path ? rootDefaultValue : get(rootDefaultValue, path)
      const config$ = !path ? rootConfig : get(rootConfig, path)

      const RenderFn = Signal(() => {
        const Fun = config$.render._
        return Signal.react((props: any) => <Fun {...props} />)
      })

      const out: SignalField<T> = {
        Render: Signal.react((props: any): JSX.Element => {
          const Fn = RenderFn._
          return <Fn {...props} />
        }),
        api$: {
          commit: () => {
            const prevDefaults = (!path ? rootDefaultValue : (get(rootDefaultValue, path) as RSignal<T>))._
            rootDefaultValue._ = path ? (get(root as any, path!) as RSignal<T>)._ : root._
            return () => {
              rootDefaultValue._ = prevDefaults
            }
          },
          reset: () => {
            const base = path ? (get(root as any, path!) as RSignal<T>) : root
            const def = !path ? rootDefaultValue : (get(rootDefaultValue, path) as RSignal<T>)
            base._ = def._
          },
          forceValidate: () => {},
          resetToFactoryDefaults: () => {},
        },
        defaultValue$,
        config$,
        state$: SignalCreator({
          initialState: {
            errors: [] as string[],
            isDirty: false as boolean,
            isDisabled: false as boolean,
            isTouched: false as boolean,
            isValid: true as boolean,
            ref: null as HTMLElement | null,
          },
        }),
        props$: {
          ...inputProps,
          input: {
            ...inputProps,
            "data-testid": inputProps.id,
            onBlur,
            onChange,
          },
          label: {
            "data-testid": `label-for-${id}`,
            htmlFor: id,
            id: `label-for-${id}`,
            name: `label-for-${name}`,
          },
          form: {
            "data-testid": `form-${id}`,
            id: path ? `${opts.id}-subform-for-${path.join("-")}` : opts.id,
            name: name,
            onSubmit: e => {
              e.preventDefault()
            },
          },
        },
      }

      return out
    },
  }) as unknown as RSignalField<T>

  // on validator change, update errors with concatMap
  // on render change, update Render => auto listen to render FN
  // On default change, update dirty,
  // on change, change touch
  // on change, run validators on delay or flush on commit
  // on reset, reset sub tree
  // all dirty and touched reset
  // on commit, commit sub tree
  // all dirty and touched reset
  // On disable, all sub are disabled
  return root
}

export type SignalField<T> = {
  config$: RSignal<RConfig<T>>
  defaultValue$: RSignal<T>
  state$: RSignal<FieldState<T>>
  props$: FieldProps<T>
  api$: SignalFieldReactFunctions<T>
  Render: (props: any) => JSX.Element
}
export type RSignalField<T, Depth extends number = 5> = ISignal<T, SignalField<T>> &
  (Depth extends never
    ? never
    : isRecursive<NonNullable<T>> extends 1
      ? {
          [K in keyof NonNullable<T>]-?: RSignalField<_RSignalGetRecursiveValue<T, K>, DepthLimit[Depth]>
        } & (NonNullable<T> extends unknown[]
          ? Record<number, RSignalField<_RSignalGetRecursiveValue<T, number>, DepthLimit[Depth]>>
          : {}) // Array case, we iterate over all prototype above, but we actually get the generic of number => T mapping here
      : {})

type Config<T> = {
  validators?: ValidatorMap_1<T>
  render?: (props: ISignal<T, SignalField<T>>) => React.ReactNode
}

export type RConfig<T, Depth extends number = 5> = Config<T> &
  (isRecursive<NonNullable<T>> extends 1
    ? {
        [K in keyof NonNullable<T> as NonNullable<T>[K] extends (...args: any[]) => any ? never : K]?: RConfig<
          _RSignalGetRecursiveValue<T, K>,
          DepthLimit[Depth]
        >
      } & (NonNullable<T> extends unknown[]
        ? Record<number, RConfig<_RSignalGetRecursiveValue<T, number>, DepthLimit[Depth]>>
        : {}) // Array case, we iterate over all prototype above, but we actually get the generic of number => T mapping here
    : {})
