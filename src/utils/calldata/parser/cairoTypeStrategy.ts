import { CairoBool } from '../../cairoDataTypes/bool';
import { CairoByteArray } from '../../cairoDataTypes/byteArray';
import { CairoBytes31 } from '../../cairoDataTypes/bytes31';
import { CairoClassHash } from '../../cairoDataTypes/classHash';
import { CairoContractAddress } from '../../cairoDataTypes/contractAddress';
import { CairoEthAddress } from '../../cairoDataTypes/ethAddress';
import { CairoFelt252 } from '../../cairoDataTypes/felt';
import { CairoInt8 } from '../../cairoDataTypes/int8';
import { CairoInt16 } from '../../cairoDataTypes/int16';
import { CairoInt32 } from '../../cairoDataTypes/int32';
import { CairoInt64 } from '../../cairoDataTypes/int64';
import { CairoInt128 } from '../../cairoDataTypes/int128';
import { CairoSecp256k1Point } from '../../cairoDataTypes/secp256k1Point';
import { CairoUint8 } from '../../cairoDataTypes/uint8';
import { CairoUint16 } from '../../cairoDataTypes/uint16';
import { CairoUint32 } from '../../cairoDataTypes/uint32';
import { CairoUint64 } from '../../cairoDataTypes/uint64';
import { CairoUint96 } from '../../cairoDataTypes/uint96';
import { CairoUint128 } from '../../cairoDataTypes/uint128';
import { CairoUint256 } from '../../cairoDataTypes/uint256';
import { CairoUint512 } from '../../cairoDataTypes/uint512';
import { CairoArray } from '../../cairoDataTypes/array';
import { CairoStruct } from '../../cairoDataTypes/cairoStruct';
import { CairoTypeCustomEnum } from '../../cairoDataTypes/cairoTypeCustomEnum';
import { CairoTypeFixedArray } from '../../cairoDataTypes/cairoTypeFixedArray';
import { CairoTypeOption } from '../../cairoDataTypes/cairoTypeOption';
import { CairoTypeResult } from '../../cairoDataTypes/cairoTypeResult';
import { CairoNonZero } from '../../cairoDataTypes/nonZero';
import { CairoTuple } from '../../cairoDataTypes/tuple';
import type { AbiEnum, AbiStruct, AllowArray } from '../../../types';
import type { CairoType } from '../../cairoDataTypes/cairoType.interface';
import type { CairoTypeStrategy, VariantType } from './cairoTypeStrategy.type';
import assert from '../../assert';

/**
 * Is this the response iterator rather than a value a caller passed?
 *
 * The two directions share one entry per type, so each constructor has to tell them apart. An
 * iterator is the only input carrying a `next`, and no Cairo value is built from one.
 * @param {unknown} input the value handed to a constructor
 * @returns {boolean} true when the input is the felts of a response
 * @example
 * ```typescript
 * const result = isResponseIterator(['0x1'].values());
 * // result = true
 * const result2 = isResponseIterator(44);
 * // result2 = false
 * ```
 */
function isResponseIterator(input: unknown): input is Iterator<string> {
  return typeof input === 'object' && input !== null && 'next' in input;
}

/**
 * Build one entry of the map from a Cairo type class.
 *
 * Every leaf answers the two directions the same way — its constructor for a value, its
 * `factoryFromApiResponse` for the felts of a response — so the entry is the same shape each
 * time and is written once here rather than nineteen times below.
 * @param {object} cairoType the class to wrap
 * @returns {Function} the constructor entry for that class
 * @example
 * ```typescript
 * const entry = leafConstructor(CairoUint8);
 * const result = entry(44).toApiRequest();
 * // result = ["44"]
 * const result2 = entry(['0x2c'].values()).toApiRequest();
 * // result2 = ["44"]
 * ```
 */
function leafConstructor(cairoType: {
  new (input: any): CairoType;
  factoryFromApiResponse(responseIterator: Iterator<string>): CairoType;
}): (input: Iterator<string> | unknown) => CairoType {
  return (input) =>
    isResponseIterator(input)
      ? cairoType.factoryFromApiResponse(input)
      : // eslint-disable-next-line new-cap
        new cairoType(input);
}

/**
 * The Cairo types that occupy a known number of felts and are built from a value of their own.
 *
 * Listed together because the entry is identical for each: the class knows how to read itself in
 * both directions, and nothing here needs the strategy back — only a composite does, to build the
 * elements it holds.
 */
const LEAF_TYPES = [
  CairoFelt252,
  CairoBool,
  CairoEthAddress,
  CairoClassHash,
  CairoContractAddress,
  CairoBytes31,
  CairoByteArray,
  CairoSecp256k1Point,
  CairoUint8,
  CairoUint16,
  CairoUint32,
  CairoUint64,
  CairoUint96,
  CairoUint128,
  CairoUint256,
  CairoUint512,
  CairoInt8,
  CairoInt16,
  CairoInt32,
  CairoInt64,
  CairoInt128,
] as const;

/**
 * The strategy the composite classes drive.
 *
 * It carries the leaf types only for now : a composite adds itself to `dynamicSelectors` as it is
 * written, because its abi type is a family rather than one string. Nothing in the library reads
 * this map yet — the parsers still run on {@link hdParsingStrategy}, and moving them over is the
 * next step, not this one.
 * @example
 * ```typescript
 * const felts = cairoTypeStrategy.constructors['core::integer::u8'](44, cairoTypeStrategy)
 *   .toApiRequest();
 * // felts = ["44"]
 * ```
 */
export const cairoTypeStrategy: CairoTypeStrategy = {
  constructors: {
    ...Object.fromEntries(
      LEAF_TYPES.map((cairoType) => [cairoType.abiSelector, leafConstructor(cairoType)])
    ),
    // A composite is keyed by its selector name rather than by an abi type, and needs the type
    // back : the selector matched a family, and only the caller knows which member of it.
    [CairoTuple.dynamicSelector]: (input, strategy, type) => {
      assert(type !== undefined, 'A CairoTuple cannot be built without the abi type it stands for');
      return new CairoTuple(input, type, strategy);
    },
    [CairoArray.dynamicSelector]: (input, strategy, type) => {
      assert(type !== undefined, 'A CairoArray cannot be built without the abi type it stands for');
      return new CairoArray(input, type, strategy);
    },
    // the one entry that forwards the fourth argument: which branch of the enum is meant cannot
    // be read off the value, so whoever knows it has to say so
    [CairoTypeOption.dynamicSelector]: (input, strategy, type, variant) => {
      assert(
        type !== undefined,
        'A CairoTypeOption cannot be built without the abi type it stands for'
      );
      return new CairoTypeOption(input, type, strategy, variant as number | undefined);
    },
    [CairoTypeResult.dynamicSelector]: (input, strategy, type, variant) => {
      assert(
        type !== undefined,
        'A CairoTypeResult cannot be built without the abi type it stands for'
      );
      return new CairoTypeResult(input, type, strategy, variant as number | undefined);
    },
    [CairoNonZero.dynamicSelector]: (input, strategy, type) => {
      assert(
        type !== undefined,
        'A CairoNonZero cannot be built without the abi type it stands for'
      );
      return new CairoNonZero(input, type, strategy);
    },
    [CairoTypeFixedArray.dynamicSelector]: (input, strategy, type) => {
      assert(
        type !== undefined,
        'A CairoTypeFixedArray cannot be built without the abi type it stands for'
      );
      return new CairoTypeFixedArray(input, type, strategy);
    },
  },
  response: {
    [CairoFelt252.abiSelector]: (instance) => (instance as CairoFelt252).toBigInt(),
    [CairoBool.abiSelector]: (instance) => (instance as CairoBool).toBoolean(),
    [CairoEthAddress.abiSelector]: (instance) => (instance as CairoEthAddress).toBigInt(),
    [CairoClassHash.abiSelector]: (instance) => (instance as CairoClassHash).toBigInt(),
    [CairoContractAddress.abiSelector]: (instance) => (instance as CairoContractAddress).toBigInt(),
    [CairoBytes31.abiSelector]: (instance) => (instance as CairoBytes31).decodeUtf8(),
    [CairoByteArray.abiSelector]: (instance) => (instance as CairoByteArray).decodeUtf8(),
    [CairoSecp256k1Point.abiSelector]: (instance) => (instance as CairoSecp256k1Point).toBigInt(),
    [CairoUint8.abiSelector]: (instance) => (instance as CairoUint8).toBigInt(),
    [CairoUint16.abiSelector]: (instance) => (instance as CairoUint16).toBigInt(),
    [CairoUint32.abiSelector]: (instance) => (instance as CairoUint32).toBigInt(),
    [CairoUint64.abiSelector]: (instance) => (instance as CairoUint64).toBigInt(),
    [CairoUint96.abiSelector]: (instance) => (instance as CairoUint96).toBigInt(),
    [CairoUint128.abiSelector]: (instance) => (instance as CairoUint128).toBigInt(),
    [CairoUint256.abiSelector]: (instance) => (instance as CairoUint256).toBigInt(),
    [CairoUint512.abiSelector]: (instance) => (instance as CairoUint512).toBigInt(),
    [CairoInt8.abiSelector]: (instance) => (instance as CairoInt8).toBigInt(),
    [CairoInt16.abiSelector]: (instance) => (instance as CairoInt16).toBigInt(),
    [CairoInt32.abiSelector]: (instance) => (instance as CairoInt32).toBigInt(),
    [CairoInt64.abiSelector]: (instance) => (instance as CairoInt64).toBigInt(),
    [CairoInt128.abiSelector]: (instance) => (instance as CairoInt128).toBigInt(),
    // A composite reads itself back by decomposing, which is what walks the members it holds.
    [CairoTuple.dynamicSelector]: (instance, strategy) =>
      (instance as CairoTuple).decompose(strategy),
    [CairoArray.dynamicSelector]: (instance, strategy) =>
      (instance as CairoArray).decompose(strategy),
    [CairoTypeOption.dynamicSelector]: (instance, strategy) =>
      (instance as CairoTypeOption).decompose(strategy),
    [CairoTypeResult.dynamicSelector]: (instance, strategy) =>
      (instance as CairoTypeResult).decompose(strategy),
    [CairoNonZero.dynamicSelector]: (instance, strategy) =>
      (instance as CairoNonZero).decompose(strategy),
    [CairoTypeFixedArray.dynamicSelector]: (instance, strategy) =>
      (instance as CairoTypeFixedArray).decompose(strategy),
  },
  dynamicSelectors: {
    [CairoTuple.dynamicSelector]: (type) => CairoTuple.isAbiType(type),
    [CairoArray.dynamicSelector]: (type) => CairoArray.isAbiType(type),
    [CairoTypeOption.dynamicSelector]: (type) => CairoTypeOption.isAbiType(type),
    [CairoTypeResult.dynamicSelector]: (type) => CairoTypeResult.isAbiType(type),
    [CairoNonZero.dynamicSelector]: (type) => CairoNonZero.isAbiType(type),
    [CairoTypeFixedArray.dynamicSelector]: (type) => CairoTypeFixedArray.isAbiType(type),
  },
};

/**
 * The strategy for the structs an abi declares, to be used beside {@link cairoTypeStrategy}.
 *
 * A struct is the one Cairo type with no shape to recognize : its abi type is the name the
 * contract chose, which looks like any other. So it cannot be a dynamic selector — one that
 * matched by name would have to know every name in advance, and one that matched anything would
 * shadow every other type. Instead each struct becomes an ordinary entry keyed by its own name,
 * which is what a lookup tries first.
 *
 * That is what the second argument of every composite is for : the strategies are searched in
 * order, so a call passes `[cairoTypeStrategy, structStrategy(structs)]` and gets the language's
 * types from the first and the contract's from the second.
 * @param {AbiStruct[]} structs the struct definitions an abi declares
 * @returns {CairoTypeStrategy} a strategy carrying one entry per struct
 * @example
 * ```typescript
 * const point: AbiStruct = {
 *   type: 'struct',
 *   name: 'test::Point',
 *   members: [
 *     { name: 'x', type: 'core::integer::u8' },
 *     { name: 'y', type: 'core::integer::u32' },
 *   ],
 * };
 * const strategies = [cairoTypeStrategy, structStrategy([point])];
 * const felts = strategies[1].constructors['test::Point']({ x: 1, y: 2 }, strategies)
 *   .toApiRequest();
 * // felts = ["1", "2"]
 * ```
 */
/**
 * The strategy for the custom enums an abi declares, to be used beside {@link cairoTypeStrategy}.
 *
 * Built exactly like {@link structStrategy}, and for the same reason : a custom enum's abi type is
 * the name the contract chose, so it is keyed by that name rather than recognized by a pattern.
 *
 * Its constructors forward the variant, which for an enum is the index of the active branch — the
 * one thing a raw value cannot say about itself.
 * @param {AbiEnum[]} enums the enum definitions an abi declares
 * @returns {CairoTypeStrategy} a strategy carrying one entry per enum
 * @example
 * ```typescript
 * const abiEnum: AbiEnum = {
 *   type: 'enum',
 *   name: 'test::MyEnum',
 *   variants: [
 *     { name: 'Empty', type: '()' },
 *     { name: 'Number', type: 'core::integer::u8' },
 *   ],
 * };
 * const strategies = [cairoTypeStrategy, enumStrategy([abiEnum])];
 * const felts = strategies[1].constructors['test::MyEnum'](7, strategies, 'test::MyEnum', 1)
 *   .toApiRequest();
 * // felts = ["1", "7"]
 * ```
 */
export function enumStrategy(enums: AbiEnum[]): CairoTypeStrategy {
  return {
    constructors: Object.fromEntries(
      enums.map((abiEnum) => [
        abiEnum.name,
        (
          input: Iterator<string> | unknown,
          strategy: AllowArray<CairoTypeStrategy>,
          _type?: string,
          variant?: VariantType
        ) => new CairoTypeCustomEnum(input, abiEnum, strategy, variant as number | undefined),
      ])
    ),
    response: Object.fromEntries(
      enums.map((abiEnum) => [
        abiEnum.name,
        (instance: CairoType, strategy: AllowArray<CairoTypeStrategy>) =>
          (instance as CairoTypeCustomEnum).decompose(strategy),
      ])
    ),
    dynamicSelectors: {},
  };
}

export function structStrategy(structs: AbiStruct[]): CairoTypeStrategy {
  return {
    constructors: Object.fromEntries(
      structs.map((abiStruct) => [
        abiStruct.name,
        (input: Iterator<string> | unknown, strategy: AllowArray<CairoTypeStrategy>) =>
          new CairoStruct(input, abiStruct, strategy),
      ])
    ),
    response: Object.fromEntries(
      structs.map((abiStruct) => [
        abiStruct.name,
        (instance: CairoType, strategy: AllowArray<CairoTypeStrategy>) =>
          (instance as CairoStruct).decompose(strategy),
      ])
    ),
    dynamicSelectors: {},
  };
}
