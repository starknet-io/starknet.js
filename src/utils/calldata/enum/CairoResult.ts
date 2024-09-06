import { ValuesType } from '../../../types/helpers/valuesType';
import { isUndefined } from '../../typed';

export const CairoResultVariant = {
  Ok: 0,
  Err: 1,
} as const;

export type CairoResultVariant = ValuesType<typeof CairoResultVariant>;

/**
 * Class to handle Cairo Result
 * @param variant CairoResultVariant.Ok or CairoResultVariant.Err
 * @param resultContent value of type T or U.
 * @returns an instance representing a Cairo Result.
 * @example
 * ```typescript
 * const myOption = new CairoResult<BigNumberish, CustomError>(CairoResultVariant.Ok, "0x54dda8");
 * ```
 */
export class CairoResult<T, U> {
  readonly Ok?: T;

  readonly Err?: U;

  constructor(variant: CairoResultVariant | number, resultContent: T | U) {
    if (!(variant in Object.values(CairoResultVariant))) {
      throw new Error('Wrong variant! It should be CairoResultVariant.Ok or .Err.');
    }
    if (variant === CairoResultVariant.Ok) {
      this.Ok = resultContent as T;
      this.Err = undefined;
    } else {
      this.Ok = undefined;
      this.Err = resultContent as U;
    }
  }

  /**
   *
   * @returns the content of the valid variant of a Cairo Result.
   */
  public unwrap(): T | U {
    if (!isUndefined(this.Ok)) {
      return this.Ok;
    }
    if (!isUndefined(this.Err)) {
      return this.Err;
    }
    throw new Error('Both Result.Ok and .Err are undefined. Not authorized.');
  }

  /**
   *
   * @returns true if the valid variant is 'Ok'.
   */
  public isOk(): boolean {
    return !isUndefined(this.Ok);
  }

  /**
   *
   * @returns true if the valid variant is 'isErr'.
   */
  public isErr(): boolean {
    return !isUndefined(this.Err);
  }
}
