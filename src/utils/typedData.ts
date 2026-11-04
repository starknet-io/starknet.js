/* eslint-disable no-param-reassign */
import {
  PRIME,
  RANGE_FELT,
  RANGE_I128,
  RANGE_U128,
  TEXT_TO_FELT_MAX_LEN,
  TYPED_DATA_MAX_HASHED_FELTS,
  TYPED_DATA_MAX_TYPES,
} from '../global/constants';
import {
  BigNumberish,
  TypedDataRevision as Revision,
  StarknetEnumType,
  StarknetMerkleType,
  StarknetType,
  TypedData,
  type Signature,
} from '../types';
import assert from './assert';
import { byteArrayFromString } from './calldata/byteArray';
import { CairoBytes31 } from './cairoDataTypes/bytes31';
import { starkCurve } from './ec';
import { utf8ToBigInt } from './encode';
import {
  computePedersenHash,
  computePedersenHashOnElements,
  computePoseidonHash,
  computePoseidonHashOnElements,
  getSelectorFromName,
} from './hash';
import { MerkleTree } from './merkle';
import { isBigNumberish, isHex, toHex } from './num';
import { isBoolean, isString } from './typed';

interface Context {
  parent?: string;
  key?: string;
}

interface Configuration {
  domain: string;
  hashMethod: (data: BigNumberish[]) => string;
  hashMerkleMethod: (a: BigNumberish, b: BigNumberish) => string;
  escapeTypeString: (s: string) => string;
  presetTypes: TypedData['types'];
}

const presetTypes: TypedData['types'] = {
  u256: JSON.parse('[{ "name": "low", "type": "u128" }, { "name": "high", "type": "u128" }]'),
  TokenAmount: JSON.parse(
    '[{ "name": "token_address", "type": "ContractAddress" }, { "name": "amount", "type": "u256" }]'
  ),
  NftId: JSON.parse(
    '[{ "name": "collection_address", "type": "ContractAddress" }, { "name": "token_id", "type": "u256" }]'
  ),
};

const revisionConfiguration: Record<Revision, Configuration> = {
  [Revision.ACTIVE]: {
    domain: 'StarknetDomain',
    hashMethod: computePoseidonHashOnElements,
    hashMerkleMethod: computePoseidonHash,
    escapeTypeString: (s) => `"${s}"`,
    presetTypes,
  },
  [Revision.LEGACY]: {
    domain: 'StarkNetDomain',
    hashMethod: computePedersenHashOnElements,
    hashMerkleMethod: computePedersenHash,
    escapeTypeString: (s) => s,
    presetTypes: {},
  },
};

/** What is left of the budget of the hash in progress. `undefined` when no hash is in progress. */
let feltsLeft: number | undefined;

/**
 * Spend `felts` from the budget of the hash in progress. Throw an error when the budget runs out.
 *
 * When no hash is in progress, do nothing. This happens when a low-level function, such as
 * `encodeType`, is called on its own.
 *
 * @param {number} felts - The felts about to be hashed.
 *
 * @throws Will throw an error when the hash needs more than `TYPED_DATA_MAX_HASHED_FELTS` felts.
 *
 * @example
 * ```typescript
 * withBudget(() => spend(13_501));
 * // throws Error: 'Cannot encode data: more than 13500 felts to hash'
 * ```
 */
function spend(felts: number): void {
  if (feltsLeft === undefined) return;
  feltsLeft -= felts;
  if (feltsLeft < 0) {
    throw new Error(`Cannot encode data: more than ${TYPED_DATA_MAX_HASHED_FELTS} felts to hash`);
  }
}

/**
 * Run `encode` as one hash, with one budget of `TYPED_DATA_MAX_HASHED_FELTS` felts.
 *
 * The hash functions call each other. For example, `getMessageHash` ends up calling `encodeData`,
 * which calls `encodeValue` for each field, and `encodeValue` calls `encodeData` again for a nested
 * struct. Only the first of these calls opens a budget. The calls made inside it spend from the same
 * budget. When the first call ends, even with an error, the budget is closed, so the next hash gets
 * a full budget.
 *
 * @param {() => T} encode - The hash work to run.
 *
 * @returns {T} The value that `encode` returns.
 *
 * @example
 * ```typescript
 * const result = withBudget(() => {
 *   spend(2);
 *   return 'done';
 * });
 * // result = 'done'
 * ```
 */
function withBudget<T>(encode: () => T): T {
  if (feltsLeft !== undefined) return encode();
  feltsLeft = TYPED_DATA_MAX_HASHED_FELTS;
  try {
    return encode();
  } finally {
    feltsLeft = undefined;
  }
}

function assertRange(data: unknown, type: string, { min, max }: { min: bigint; max: bigint }) {
  const value = BigInt(data as string);
  assert(value >= min && value <= max, `${value} (${type}) is out of bounds [${min}, ${max}]`);
}

function identifyRevision({ types, domain }: TypedData) {
  if (
    revisionConfiguration[Revision.ACTIVE].domain in types &&
    domain.revision?.toString() === Revision.ACTIVE
  )
    return Revision.ACTIVE;

  if (
    revisionConfiguration[Revision.LEGACY].domain in types &&
    (domain.revision ?? Revision.LEGACY) === Revision.LEGACY
  )
    return Revision.LEGACY;

  return undefined;
}

function getHex(value: BigNumberish): string {
  try {
    return toHex(value);
  } catch (e) {
    if (isString(value)) {
      return toHex(CairoBytes31.fromText(value).toBigInt());
    }
    throw new Error(`Invalid BigNumberish: ${value}`);
  }
}

/**
 * Validates that `data` matches the EIP-712 JSON schema, and that it does not redefine any
 * of the active revision's preset type names (SNIP-12 reserves those names and requires such
 * a request to be rejected).
 */
export function validateTypedData(data: unknown): data is TypedData {
  const typedData = data as TypedData;
  if (!(typedData.message && typedData.primaryType && typedData.types)) {
    return false;
  }
  const revision = identifyRevision(typedData);
  if (!revision) {
    return false;
  }
  const presetNames = Object.keys(revisionConfiguration[revision].presetTypes);
  return Object.keys(typedData.types).every((name) => !presetNames.includes(name));
}

/**
 * Prepares the selector for later use, if it's not already in correct format.
 * The selector in correct format is the starknet_keccak hash of the function name, encoded in ASCII.
 *
 * @param {string} selector - The selector to be prepared.
 * @returns {string} The prepared selector.
 *
 * @example
 * ```typescript
 * const result1 = prepareSelector('0xc14cfe23f3fa7ce7b1f8db7d7682305b1692293f71a61cc06637f0d8d8b6c8');
 * // result1 = '0xc14cfe23f3fa7ce7b1f8db7d7682305b1692293f71a61cc06637f0d8d8b6c8'
 *
 * const result2 =  prepareSelector('myFunction');
 * // result2 = '0xc14cfe23f3fa7ce7b1f8db7d7682305b1692293f71a61cc06637f0d8d8b6c8'
 * ```
 */
export function prepareSelector(selector: string): string {
  return isHex(selector) ? selector : getSelectorFromName(selector);
}

/**
 * Checks if the given Starknet type is a Merkle tree type.
 *
 * @param {StarknetType} type - The StarkNet type to check.
 *
 * @returns {boolean} - True if the type is a Merkle tree type, false otherwise.
 *
 * @example
 * ```typescript
 * const type = { name: 'test', type: 'merkletree',};
 * const result1 = isMerkleTreeType(type);
 * // result1 = true
 *
 * const type2 = {name: 'test', type: 'non-merkletree',};
 * const result2 =  isMerkleTreeType(type2);
 * // result2 = false
 * ```
 */
export function isMerkleTreeType(type: StarknetType): type is StarknetMerkleType {
  return type.type === 'merkletree';
}

/**
 * Get the dependencies of a struct type. If a struct has the same dependency multiple times, it's only included once
 * in the resulting array.
 *
 * The walk visits each type once, even when several types point to it, so its cost follows the size of the type
 * graph.
 *
 * @param {TypedData['types']} types - The types object containing all defined types.
 * @param {string} type - The name of the type to get dependencies for.
 * @param {string[]} [dependencies=[]] - The type names to leave out when `type` points to them.
 * @param {string} [contains=''] - The type contained within the struct.
 * @param {Revision} [revision=Revision.Legacy] - The revision of the TypedData.
 *
 * @returns {string[]} The array of dependencies.
 * @throws Will throw an error if a type refers to itself, directly or through other types.
 */
export function getDependencies(
  types: TypedData['types'],
  type: string,
  dependencies: string[] = [],
  contains: string = '',
  revision: Revision = Revision.LEGACY
): string[] {
  // The type names that a field type points to: the type itself, the element of a struct array,
  // the enum that the field contains, or the parameters of an enum variant.
  const pointedTypes = (fieldType: string, fieldContains: string = ''): string[] => {
    if (fieldType.endsWith('*')) return [fieldType.slice(0, -1)];
    if (revision === Revision.ACTIVE && fieldType === 'enum') return [fieldContains];
    if (revision === Revision.ACTIVE && /^\(.*\)$/.test(fieldType)) {
      return fieldType
        .slice(1, -1)
        .split(',')
        .map((param) => (param.endsWith('*') ? param.slice(0, -1) : param));
    }
    return [fieldType];
  };

  // One list for the whole walk, so that a type reached by several branches is visited once.
  const found = new Set<string>();
  const inProgress = new Set<string>();
  const visit = (depType: string) => {
    if (inProgress.has(depType)) {
      throw new Error(`Cannot encode type ${depType}: it refers to itself`);
    }
    if (!types[depType] || found.has(depType)) return;
    found.add(depType);
    inProgress.add(depType);
    (types[depType] as StarknetEnumType[]).forEach((field) =>
      pointedTypes(field.type, field.contains).forEach(visit)
    );
    inProgress.delete(depType);
  };

  pointedTypes(type, contains)
    .filter((depType) => !dependencies.includes(depType))
    .forEach(visit);
  return Array.from(found);
}

function getMerkleTreeType(types: TypedData['types'], ctx: Context) {
  if (ctx.parent && ctx.key) {
    const parentType = types[ctx.parent];
    const merkleType = parentType.find((t) => t.name === ctx.key)!;
    const isMerkleTree = isMerkleTreeType(merkleType);
    if (!isMerkleTree) {
      throw new Error(`${ctx.key} is not a merkle tree`);
    }
    if (merkleType.contains.endsWith('*')) {
      throw new Error(`Merkle tree contain property must not be an array but was given ${ctx.key}`);
    }
    return merkleType.contains;
  }
  return 'raw';
}

/**
 * Encode a type to a string. All dependent types are alphabetically sorted.
 *
 * @param {TypedData['types']} types - The types object containing all defined types.
 * @param {string} type - The name of the type to encode.
 * @param {Revision} [revision=Revision.Legacy] - The revision of the TypedData.
 *
 * @returns {string} The encoded string.
 * @throws Will throw an error if the types declare more than `constants.TYPED_DATA_MAX_TYPES` types, or if a type refers to itself, directly or through other types.
 *
 * @example
 * ```typescript
 * import typedDataExample from '../../__mocks__/typedData/baseExample.json';
 *
 * const result = encodeType(typedDataExample.types, 'Mail');
 * // result = "Mail(from:Person,to:Person,contents:felt)Person(name:felt,wallet:felt)";
 * ```
 */
export function encodeType(
  types: TypedData['types'],
  type: string,
  revision: Revision = Revision.LEGACY
): string {
  // A message with many types makes each struct cost more to hash: refuse it before any work.
  if (Object.keys(types).length > TYPED_DATA_MAX_TYPES) {
    throw new Error(
      `Cannot encode type ${type}: more than ${TYPED_DATA_MAX_TYPES} types are declared`
    );
  }
  const allTypes =
    revision === Revision.ACTIVE
      ? { ...types, ...revisionConfiguration[revision].presetTypes }
      : types;
  const [primary, ...dependencies] = getDependencies(
    allTypes,
    type,
    undefined,
    undefined,
    revision
  );
  const newTypes = !primary ? [] : [primary, ...dependencies.sort()];

  const esc = revisionConfiguration[revision].escapeTypeString;

  const encoded = newTypes
    .map((dependency) => {
      const dependencyElements = allTypes[dependency].map((t) => {
        const targetType =
          t.type === 'enum' && revision === Revision.ACTIVE
            ? (t as StarknetEnumType).contains
            : t.type;
        // parentheses handling for enum variant types
        const typeString = targetType.match(/^\(.*\)$/)
          ? `(${targetType
              .slice(1, -1)
              .split(',')
              .map((e) => (e ? esc(e) : e))
              .join(',')})`
          : esc(targetType);
        return `${esc(t.name)}:${typeString}`;
      });
      return `${esc(dependency)}(${dependencyElements})`;
    })
    .join('');

  // The type string is hashed as one felt per 31 characters, once for each struct of the message.
  spend(Math.ceil(encoded.length / TEXT_TO_FELT_MAX_LEN));
  return encoded;
}

/**
 * Get a type string as hash.
 *
 * @param {TypedData['types']} types - The types object containing all defined types.
 * @param {string} type - The name of the type to hash.
 * @param {Revision} [revision=Revision.Legacy] - The revision of the TypedData.
 *
 * @returns {string} The hash.
 * @throws Will throw an error if the types declare more than `constants.TYPED_DATA_MAX_TYPES` types, or if a type refers to itself, directly or through other types.
 *
 * @example
 * ```typescript
 * import typedDataExample from '../../__mocks__/typedData/baseExample.json';
 *
 * const result = getTypeHash(typedDataExample.types, 'StarkNetDomain');
 * // result = "0x1bfc207425a47a5dfa1a50a4f5241203f50624ca5fdf5e18755765416b8e288";
 * ```
 */
export function getTypeHash(
  types: TypedData['types'],
  type: string,
  revision: Revision = Revision.LEGACY
): string {
  return getSelectorFromName(encodeType(types, type, revision));
}

/**
 * Encodes a single value to an ABI serialisable string, number or Buffer. Returns the data as a tuple, which consists of
 * an array of ABI compatible types, and an array of corresponding values.
 *
 * @param {TypedData['types']} types - The types object containing all defined types.
 * @param {string} type - The name of the type to encode.
 * @param {unknown} data - The data to encode.
 * @param {Context} [ctx={}] - The context of the encoding process.
 * @param {Revision} [revision=Revision.Legacy] - The revision of the TypedData.
 *
 * @returns {[string, string]} The ABI compatible type and corresponding value.
 * @throws Will throw an error if the types declare more than `constants.TYPED_DATA_MAX_TYPES` types, if the data needs more than `constants.TYPED_DATA_MAX_HASHED_FELTS` felts to hash, or if a type refers to itself.
 *
 * @example
 * ```typescript
 * import { getSelectorFromName } from '../../src/utils/hash';
 *
 * const selector = 'transfer';
 * const selectorHash = getSelectorFromName(selector);
 * const result1 = encodeValue({}, 'felt', selectorHash);
 *
 * // result1 = ['felt', '0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e']
 * ```
 */
export function encodeValue(
  types: TypedData['types'],
  type: string,
  data: unknown,
  ctx: Context = {},
  revision: Revision = Revision.LEGACY
): [string, string] {
  return withBudget((): [string, string] => {
    // Every value is one felt to hash. A text is hashed 31 characters at a time, so it costs one
    // felt for each 31 characters: a string, a selector name, or a number written in digits.
    // The first two felts are free, so that a felt written in hex (66 characters) or in digits
    // (up to 78) costs one felt, like any other felt.
    spend(
      typeof data === 'string' ? Math.max(1, Math.ceil(data.length / TEXT_TO_FELT_MAX_LEN) - 2) : 1
    );

    if (types[type]) {
      return [type, getStructHash(types, type, data as TypedData['message'], revision)];
    }

    if (revisionConfiguration[revision].presetTypes[type]) {
      return [
        type,
        getStructHash(
          revisionConfiguration[revision].presetTypes,
          type,
          data as TypedData['message'],
          revision
        ),
      ];
    }

    if (type.endsWith('*')) {
      const hashes: string[] = (data as Array<TypedData['message']>).map(
        (entry) => encodeValue(types, type.slice(0, -1), entry, undefined, revision)[1]
      );
      return [type, revisionConfiguration[revision].hashMethod(hashes)];
    }

    switch (type) {
      case 'enum': {
        if (revision === Revision.ACTIVE) {
          const [variantKey, variantData] = Object.entries(data as TypedData['message'])[0];

          const parentType = types[ctx.parent as string].find((t) => t.name === ctx.key);
          const enumType = types[(parentType as StarknetEnumType).contains];
          const variantType = enumType.find((t) => t.name === variantKey) as StarknetType;
          const variantIndex = enumType.indexOf(variantType);

          const encodedSubtypes = variantType.type
            .slice(1, -1)
            .split(',')
            .map((subtype, index) => {
              if (!subtype) return subtype;
              const subtypeData = (variantData as unknown[])[index];
              return encodeValue(types, subtype, subtypeData, undefined, revision)[1];
            });
          return [
            type,
            revisionConfiguration[revision].hashMethod([variantIndex, ...encodedSubtypes]),
          ];
        } // else fall through to default
        return [type, getHex(data as string)];
      }
      case 'merkletree': {
        const merkleTreeType = getMerkleTreeType(types, ctx);
        const structHashes: string[] = (data as Array<TypedData['message']>).map((struct) => {
          return encodeValue(types, merkleTreeType, struct, undefined, revision)[1];
        });
        const { root } = new MerkleTree(
          structHashes as string[],
          revisionConfiguration[revision].hashMerkleMethod
        );
        return ['felt', root];
      }
      case 'selector': {
        return ['felt', prepareSelector(data as string)];
      }
      case 'string': {
        if (revision === Revision.ACTIVE) {
          const byteArray = byteArrayFromString(data as string);
          const elements = [
            byteArray.data.length,
            ...byteArray.data,
            byteArray.pending_word,
            byteArray.pending_word_len,
          ];
          return [type, revisionConfiguration[revision].hashMethod(elements)];
        } // else fall through to default
        return [type, getHex(data as string)];
      }
      case 'i128': {
        if (revision === Revision.ACTIVE) {
          const value = BigInt(data as string);
          assertRange(value, type, RANGE_I128);
          return [type, getHex(value < 0n ? PRIME + value : value)];
        } // else fall through to default
        return [type, getHex(data as string)];
      }
      case 'timestamp':
      case 'u128': {
        if (revision === Revision.ACTIVE) {
          assertRange(data, type, RANGE_U128);
        } // else fall through to default
        return [type, getHex(data as string)];
      }
      case 'felt':
      case 'shortstring': {
        // TODO: should 'shortstring' diverge into directly using CairoBytes31.fromText()?
        if (revision === Revision.ACTIVE) {
          assertRange(getHex(data as string), type, RANGE_FELT);
        } // else fall through to default
        return [type, getHex(data as string)];
      }
      case 'ClassHash':
      case 'ContractAddress': {
        if (revision === Revision.ACTIVE) {
          assertRange(data, type, RANGE_FELT);
        } // else fall through to default
        return [type, getHex(data as string)];
      }
      case 'bool': {
        if (revision === Revision.ACTIVE) {
          assert(isBoolean(data), `Type mismatch for ${type} ${data}`);
        } // else fall through to default
        return [type, getHex(data as string)];
      }
      default: {
        if (revision === Revision.ACTIVE) {
          throw new Error(`Unsupported type: ${type}`);
        }
        return [type, getHex(data as string)];
      }
    }
  });
}

/**
 * Encode the data to an ABI encoded Buffer. The data should be a key -> value object with all the required values.
 * All dependent types are automatically encoded.
 *
 * @param {TypedData['types']} types - The types object containing all defined types.
 * @param {string} type - The name of the type to encode.
 * @param {TypedData['message']} data - The data to encode.
 * @param {Revision} [revision=Revision.Legacy] - The revision of the TypedData.
 *
 * @returns {[string[], string[]]} The ABI compatible types and corresponding values.
 * @throws Will throw an error if the types declare more than `constants.TYPED_DATA_MAX_TYPES` types, if the data needs more than `constants.TYPED_DATA_MAX_HASHED_FELTS` felts to hash, or if a type refers to itself.
 */
export function encodeData<T extends TypedData>(
  types: T['types'],
  type: string,
  data: T['message'],
  revision: Revision = Revision.LEGACY
): [string[], string[]] {
  // Open the budget here too, so that all the fields of a struct spend from one budget.
  return withBudget((): [string[], string[]] => {
    const targetType = types[type] ?? revisionConfiguration[revision].presetTypes[type];
    const [returnTypes, values] = targetType.reduce<[string[], string[]]>(
      ([ts, vs], field) => {
        if (
          data[field.name as keyof T['message']] === undefined ||
          (data[field.name as keyof T['message']] === null && field.type !== 'enum')
        ) {
          throw new Error(`Cannot encode data: missing data for '${field.name}'`);
        }

        const value = data[field.name as keyof T['message']];
        const ctx = { parent: type, key: field.name };
        const [t, encodedValue] = encodeValue(types, field.type, value, ctx, revision);

        return [
          [...ts, t],
          [...vs, encodedValue],
        ];
      },
      [['felt'], [getTypeHash(types, type, revision)]]
    );

    return [returnTypes, values];
  });
}

/**
 * Get encoded data as a hash. The data should be a key -> value object with all the required values.
 * All dependent types are automatically encoded.
 *
 * @param {TypedData['types']} types - The types object containing all defined types.
 * @param {string} type - The name of the type to hash.
 * @param {TypedData['message']} data - The data to hash.
 * @param {Revision} [revision=Revision.Legacy] - The revision of the TypedData.
 *
 * @returns {string} The hash of the encoded data.
 * @throws Will throw an error if the types declare more than `constants.TYPED_DATA_MAX_TYPES` types, if the data needs more than `constants.TYPED_DATA_MAX_HASHED_FELTS` felts to hash, or if a type refers to itself.
 *
 * @example
 * ```typescript
 * import exampleBaseTypes from '../../__mocks__/typedData/example_baseTypes.json';
 *
 * const result = getStructHash(
 *    exampleBaseTypes.types,
 *    'StarknetDomain',
 *    exampleBaseTypes.domain as StarknetDomain,
 *    TypedDataRevision.ACTIVE
 *  );
 *  // result = "0x555f72e550b308e50c1a4f8611483a174026c982a9893a05c185eeb85399657";
 * ```
 */
export function getStructHash<T extends TypedData>(
  types: T['types'],
  type: string,
  data: T['message'],
  revision: Revision = Revision.LEGACY
): string {
  return revisionConfiguration[revision].hashMethod(encodeData(types, type, data, revision)[1]);
}

/**
 * Get the SNIP-12 encoded message to sign, from the typedData object.
 *
 * @param {TypedData} typedData - The TypedData object.
 * @param {BigNumberish} accountAddress - The account address to sign the message.
 *
 * @returns {string} The hash of the message to sign.
 * @throws Will throw an error if the typedData does not match the JSON schema.
 * @throws Will throw an error if the typed data declares more than `constants.TYPED_DATA_MAX_TYPES` types, if the message needs more than `constants.TYPED_DATA_MAX_HASHED_FELTS` felts to hash, or if a type refers to itself.
 *
 * @example
 * ```typescript
 * const exampleAddress = "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826";
 * const typedDataStringExample = {
 *  types: {
 *    StarkNetDomain: [
 *      { name: 'name', type: 'felt' },
 *      { name: 'version', type: 'felt' },
 *      { name: 'chainId', type: 'felt' },
 *    ],
 *    Person: [
 *      { name: 'name', type: 'felt' },
 *      { name: 'wallet', type: 'felt' },
 *    ],
 *    String: [
 *      { name: 'len', type: 'felt' },
 *      { name: 'data', type: 'felt*' },
 *    ],
 *    Mail: [
 *      { name: 'from', type: 'Person' },
 *      { name: 'to', type: 'Person' },
 *      { name: 'contents', type: 'String' },
 *    ],
 *  },
 *  primaryType: 'Mail',
 *  domain: {
 *    name: 'StarkNet Mail',
 *    version: '1',
 *    chainId: 1,
 *  },
 *  message: {
 *    from: {
 *      name: 'Cow',
 *      wallet: exampleAddress,
 *    },
 *    to: {
 *      name: 'Bob',
 *      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
 *    },
 *    contents: stringToStringStruct(
 *      'this is way longer than just 32 characters, to test if that is possible within a typedData struct.'
 *    ),
 *  },
 * };
 *
 * const result = getMessageHash(typedDataStringExample, exampleAddress);
 * // result = "0x70338fb11b8f70b68b261de8a322bcb004bd85e88ac47d9147982c7f5ac66fd"
 * ```
 */
export function getMessageHash(typedData: TypedData, accountAddress: BigNumberish): string {
  if (!validateTypedData(typedData)) {
    throw new Error('Typed data does not match JSON schema');
  }

  const revision = identifyRevision(typedData) as Revision;
  const { domain, hashMethod } = revisionConfiguration[revision];

  // One budget for the whole message: the domain and the message spend from the same budget.
  return withBudget(() => {
    const message = [
      utf8ToBigInt('StarkNet Message'),
      getStructHash(typedData.types, domain, typedData.domain, revision),
      accountAddress,
      getStructHash(typedData.types, typedData.primaryType, typedData.message, revision),
    ];

    return hashMethod(message);
  });
}

/**
 * Checks if a signed EIP712 message is related to an account.
 * Valid for a standard Starknet signature.
 * @param {BigNumberish | TypedData} message a TypedMessage message, or the hash of an EIP712 message (SNIP-12).
 * @param {Signature} signature a WeierstrassSignatureType signature, or an array of 2 strings.
 * @param {BigNumberish} fullPublicKey a number coded on 520 bits (from ec.getFullPublicKey()).
 * @param {BigNumberish} [accountAddress] address of the account that has signed the message. Not needed with a message hash is provided in `message`
 * @returns {boolean} true if the message is verified.
 * @throws Will throw an error if `message` is a TypedData that declares more than `constants.TYPED_DATA_MAX_TYPES` types, needs more than `constants.TYPED_DATA_MAX_HASHED_FELTS` felts to hash, or has a type which refers to itself.
 * @example
 * ```typescript
 * const myTypedMessage: TypedMessage = .... ;
 * const sign: Signature = ["0x123...abc", "0x345...def"];
 * const fullPubK = "0x0400b730bd22358612b5a67f8ad52ce80f9e8e893639ade263537e6ef35852e5d3057795f6b090f7c6985ee143f798608a53b3659222c06693c630857a10a92acf";
 * const accountAddress = "0x43b7240d227aa2fb8434350b3321c40ac1b88c7067982549e7609870621b535";
 * const result1 = typedData.verifyMessage(myTypedMessage, sign, fullPubK, accountAddress);
 * const result2 = typedData.verifyMessage(messageHash, sign, fullPubK);
 * // result1 = result2 = true
 * ```
 */
export function verifyMessage(
  message: TypedData,
  signature: Signature,
  fullPublicKey: BigNumberish,
  accountAddress: BigNumberish
): boolean;
export function verifyMessage(
  message: BigNumberish,
  signature: Signature,
  fullPublicKey: BigNumberish
): boolean;
export function verifyMessage(
  message: BigNumberish | TypedData,
  signature: Signature,
  fullPublicKey: BigNumberish,
  accountAddress?: BigNumberish
): boolean {
  const isTypedData = validateTypedData(message);
  if (!isBigNumberish(message) && !isTypedData) {
    throw new Error('message has a wrong format.');
  }
  if (isTypedData && accountAddress === undefined) {
    throw new Error(
      'When providing a TypedData in message parameter, the accountAddress parameter has to be provided.'
    );
  }
  if (isTypedData && !isBigNumberish(accountAddress)) {
    throw new Error('accountAddress shall be a BigNumberish');
  }
  const messageHash = isTypedData
    ? getMessageHash(message, accountAddress as BigNumberish)
    : toHex(message);
  const sign = Array.isArray(signature)
    ? new starkCurve.Signature(BigInt(signature[0]), BigInt(signature[1]))
    : signature;
  const fullPubKey = toHex(fullPublicKey);
  const isValid = starkCurve.verify(sign, messageHash, fullPubKey);
  return isValid;
}
