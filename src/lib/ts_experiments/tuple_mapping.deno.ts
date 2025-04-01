export function mapTS55<
  const T extends readonly unknown[],
  const NNN extends string,
  const NN extends {
    [N in keyof T & `${number}`]: any
  },
>(
  it: T,
  mapper: <TT extends keyof T & `${number}`>(
    x: T[TT],
    index: TT,
  ) => NN[TT],
): {
  [K in keyof T & `${number}`]: `${K}-${
    ReturnType<typeof mapper<K>> // as `${ReturnType<typeof mapper<T[K]>>}`
  }`
  //   Extract<
  //   T[keyof T & `${number}`],
  //   T[K]
  // >
} {
  return Object.fromEntries(
    it.map((n, i) => [mapper(n, i as any), n]),
  ) as any
}

const wtf55 = mapTS55(
  [{ id: "a" }, { id: "b" }] as const,
  (x, index) => x.id,
)

export function mapTS<T extends any[], NN extends string>(
  it: T,
  mapper: <
    N extends T[number] = T[number],
    K extends keyof T = any,
  >(
    x: N,
    index?: K,
  ) => NN,
): {
  [K in keyof T &
    `${number}` as `${ReturnType<typeof mapper<T[K], K>>}`]: T[Extract<
    keyof T,
    K
  >]
} {
  //[`${ReturnType<typeof mapper<T[keyof T], keyof T & `${number}`>>}`]
  // @ts-ignore
  return Object.fromEntries(
    it.map((n, i) => [mapper(n, i), n] as const),
  )
}

const wtf = mapTS55(
  [{ id: "a" }, { id: "b" }] as const,
  x => x.id,
)

// export function mapTS2<
//   const T extends readonly any[],
//   R extends readonly [PropertyKey, any][],
// >(
//   it: T,
//   fn: <I extends T[number]>(item: I, index: number) => [PropertyKey, I]
// ): R {
//   return it.map(fn) as unknown as R;
// }

export function mapTS2<
  const T extends ReadonlyArray<{ id: PropertyKey }>,
>(
  it: T,
  mapper: <I extends T[number]>(
    x: I,
    index: number,
  ) => readonly [I["id"], I],
): {
  [K in T[number] as K["id"]]: Extract<
    T[number],
    { id: K["id"] }
  >
} {
  return Object.fromEntries(it.map(mapper)) as any
}

export function map3<
  const T extends readonly unknown[],
  R extends { [K in keyof T]: unknown },
>(
  input: T,
  fn: <I extends keyof T>(item: T[I], index: I) => R[I],
): R {
  // @ts-ignore
  return input.map((item, idx) =>
    fn(item as T[number], idx as keyof T),
  ) as R
}

function map4<
  const T extends readonly unknown[],
  R extends { [K in keyof T]: unknown },
>(
  input: T,
  fn: <I extends keyof T>(item: T[I], index: I) => R[I],
): R {
  // @ts-ignore
  return input.map((item, idx) =>
    fn(item as T[number], idx as keyof T),
  ) as R
}

// const result = mapTS2(
//   [{ id: "a" }, { id: "b" }] as const,
//   x => [x.id, x] as const,
// )

// const result = map3(xs, (item, idx) => {
//   if ("x" in item) return item.x + 1
//   return item.y + 10
// })
// result is typed as: [number, number]
