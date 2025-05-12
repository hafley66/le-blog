import { SyntheticEvent } from "react"
import { SignalCreator } from "~/lib/Signal2/0_SignalCreator.deno.ts"

type SignalControllerProps<T> = {
  // render: (props: )
}

type SignalFieldData<T> = {
  validators?: ((val: T) => string | string[] | { warnings: string[] })[]
  errors: string[]
  isInvalid: boolean
  warnings: string[]

  isDisabled: boolean
  isDirty: boolean
  isTouched: boolean
  name: string
  ref: React.Ref<HTMLElement>
  value: T
}

type SignalFieldFunctions<T> = {
  onChange: (e: SyntheticEvent) => void
  onBlur: (e: SyntheticEvent) => void
}

type SignalFieldReactFunctions<T> = {
  Controller: (props: SignalControllerProps<T>) => React.ReactNode
  ArrayController: (props: SignalControllerProps<T>) => React.ReactNode
}

type SignalField<T> = SignalFieldData<T> & SignalFieldFunctions<T> & SignalFieldReactFunctions<T>

const SigEv = SignalCreator.dispatch

function FormSignal<T>(opts: {
  initialState?: T
  defaultState?: T
  validateEvent?: "submit" | "change" | "blur"
  revalidateEvent?: "submit" | "change" | "blur"
  config: {}
}) {
  const { initialState, validateEvent, revalidateEvent } = opts
}
