/**
 * Exclusive one of types (no intersection allowed)
 *  OneOf<[A, B]> = exclusive A OR B, where (all props of A) OR (all props of B)
 *  A | B = inclusive A OR B, where all prop of A and any prop of B  and vice versa
 */
export type OneOf<
  TypesArray extends any[],
  Res = never,
  AllProperties = MergeTypes<TypesArray>,
> = TypesArray extends [infer Head, ...infer Rem]
  ? OneOf<Rem, Res | OnlyFirst<Head, AllProperties>, AllProperties>
  : Res;

export type SimpleOneOf<F, S> = OnlyFirst<F, S> | OnlyFirst<S, F>;

type MergeTypes<TypesArray extends any[], Res = {}> = TypesArray extends [infer Head, ...infer Rem]
  ? MergeTypes<Rem, Res & Head>
  : Res;

type OnlyFirst<F, S> = F & { [Key in keyof Omit<S, keyof F>]?: undefined }; // ?: never collapse to : undefined

/**
 * set all lvl1 props to never
 */

export type AllNever<T> = Record<keyof T, never>;
