import type { AbiEntryType, AllowArray } from '../../../types';
import type { CairoType } from '../../cairoDataTypes/cairoType.interface';
import type { CairoOptionVariant, CairoResultVariant } from '../enum';

/**
 * Parsing map for constructors and response parsers
 * Configure parsing strategy for each abi type
 */
export type VariantType = CairoOptionVariant | CairoResultVariant | string | number;
export type ParsingStrategy = {
  constructors: Record<
    AbiEntryType,
    (
      input: Iterator<string> | unknown,
      strategy: AllowArray<ParsingStrategy>,
      type?: string,
      variant?: VariantType
    ) => CairoType
  >;
  response: Record<
    AbiEntryType,
    (instance: CairoType, strategy: AllowArray<ParsingStrategy>) => any
  >;
  dynamicSelectors: Record<string, (type: string) => boolean>;
};
