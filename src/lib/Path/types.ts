export type ParamType =
  | "string"
  | "number"
  | "boolean"
  | "json"
  | "json64"
type EntriesToObject<T extends [string, any][]> = {
  [K in T[number] as K[0]]: K[1]
}

export type ExtractTypedArgsTuples<
  Path extends string,
  Acc extends [string, any][] = [],
> = Path extends `:${infer Raw}/${infer Rest}`
  ? ParseArg<Raw> extends [
      infer Name extends string,
      infer Type extends string,
    ]
    ? ExtractTypedArgsTuples<
        Rest,
        [...Acc, [Name, MapType<Type>]]
      >
    : ExtractTypedArgsTuples<Rest, Acc>
  : Path extends `:${infer Raw}`
    ? ParseArg<Raw> extends [
        infer Name extends string,
        infer Type extends string,
      ]
      ? [...Acc, [Name, MapType<Type>]]
      : Acc
    : Path extends `${string}/${infer Rest}`
      ? ExtractTypedArgsTuples<Rest, Acc>
      : Acc

export type ExtractTypedArgs<Path extends string> =
  EntriesToObject<ExtractTypedArgsTuples<Path>>

type ParseArg<Segment extends string> =
  Segment extends `{${infer Name} as ${infer Type}}`
    ? [Name, Type]
    : [Segment, "string"]

type MapType<T extends string> = T extends "string"
  ? string
  : T extends "number"
    ? number
    : T extends "boolean"
      ? boolean
      : T extends "json"
        ? object
        : T extends "json64"
          ? object
          : string

type Merge<A, B> = {
  [K in keyof A | keyof B]: K extends keyof B
    ? B[K]
    : K extends keyof A
      ? A[K]
      : never
}

// export type ExtractTypedArgs<
//   Path extends string,
//   Acc = {},
// > = Path extends `:${infer Raw}/${infer Rest}`
//   ? ParseArg<Raw> extends [
//       infer Name extends string,
//       infer Type extends string,
//     ]
//     ? ExtractTypedArgs<
//         Rest,
//         Merge<Acc, { [K in Name]: MapType<Type> }>
//       >
//     : ExtractTypedArgs<Rest, Acc>
//   : Path extends `:${infer Raw}`
//     ? ParseArg<Raw> extends [
//         infer Name extends string,
//         infer Type extends string,
//       ]
//       ? Merge<Acc, { [K in Name]: MapType<Type> }>
//       : Acc
//     : Path extends `${string}/${infer Rest}`
//       ? ExtractTypedArgs<Rest, Acc>
//       : Acc
