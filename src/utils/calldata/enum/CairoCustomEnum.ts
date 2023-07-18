export type CairoEnumRaw = {
  [key: string]: any;
};

/**
 * Class to handle Cairo custom Enum
 * @param enumContent object containing the variants and its content. Example :
 *  {Success: 234, Warning: undefined, Error: undefined}.
 *  Only one variant with a value, object, array.
 * @returns an instance representing a Cairo custom Enum.
 * @example ```typescript
 * const myCairoEnum = new CairoCustomEnum( {Success: undefined, Warning: "0x7f32ea", Error: undefined})
 * ```
 */
export class CairoCustomEnum {
  /**
   * direct readonly access to variants of the Cairo Custom Enum.
   * @returns a value of type any
   * @example ```typescript
   * const successValue = myCairoEnum.variant.Success;
   */
  readonly variant: CairoEnumRaw;

  constructor(enumContent: CairoEnumRaw) {
    // TODO for request Parser : add checks of validity of enumContent
    this.variant = enumContent;
  }

  /**
   *
   * @returns the content of the valid variant of a Cairo custom Enum.
   */
  public unwrap(): any {
    const variants = Object.entries(this.variant);
    const activeVariant = variants.find((item) => typeof item[1] !== 'undefined');
    if (typeof activeVariant === 'undefined') {
      return undefined;
    }
    return activeVariant[1];
  }

  /**
   *
   * @returns the name of the valid variant of a Cairo custom Enum.
   */
  public activeVariant(): string {
    const variants = Object.entries(this.variant);
    const activeVariant = variants.find((item) => typeof item[1] !== 'undefined');
    if (typeof activeVariant === 'undefined') {
      return '';
    }
    return activeVariant[0];
  }
}
