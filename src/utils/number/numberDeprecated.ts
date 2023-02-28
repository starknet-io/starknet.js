import { felt } from '../calldata/cairo';
import { BigNumberish } from './number';

/**
 * convert a BigNumberish to a cairo felt.
 * @deprecated Only for migration V4 -> V5.
 * Do not use in new code using V5 onwards.
 * Replaced by cairo.felt
 * @param num - if num is a ShortText ("myUrl", <32 characters), converted to numeric string.
 * @returns Numeric string, like "38519".
 */
export function toFelt(num: BigNumberish): string {
  // only created for the deprecation tag
  return felt(num);
}
