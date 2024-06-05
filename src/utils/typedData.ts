/* eslint-disable no-param-reassign */
import { PRIME, RANGE_FELT, RANGE_I128, RANGE_U128 } from '../constants';
import {
  BigNumberish,
  TypedDataRevision as Revision,
  StarknetEnumType,
  StarknetMerkleType,
  StarknetType,
  TypedData,
} from '../types';
import assert from './assert';
import { byteArrayFromString } from './calldata/byteArray';
import {
  computePedersenHash,
  computePedersenHashOnElements,
  computePoseidonHash,
  computePoseidonHashOnElements,
  getSelectorFromName,
} from './hash';
import { MerkleTree } from './merkle';
import { isHex, toHex } from './num';
import { encodeShortString, isString } from './shortString';

/** @deprecated prefer importing from 'types' over 'typedData' */
export * from '../types/typedData';

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
  [Revision.Active]: {
    domain: 'StarknetDomain',
    hashMethod: computePoseidonHashOnElements,
    hashMerkleMethod: computePoseidonHash,
    escapeTypeString: (s) => `"${s}"`,
    presetTypes,
  },
  [Revision.Legacy]: {
    domain: 'StarkNetDomain',
    hashMethod: computePedersenHashOnElements,
    hashMerkleMethod: computePedersenHash,
    escapeTypeString: (s) => s,
    presetTypes: {},
  },
};

function assertRange(data: unknown, type: string, { min, max }: { min: bigint; max: bigint }) {
  const value = BigInt(data as string);
  assert(value >= min && value <= max, `${value} (${type}) is out of bounds [${min}, ${max}]`);
}

function identifyRevision({ types, domain }: TypedData) {
  if (revisionConfiguration[Revision.Active].domain in types && domain.revision === Revision.Active)
    return Revision.Active;

  if (
    revisionConfiguration[Revision.Legacy].domain in types &&
    (domain.revision ?? Revision.Legacy) === Revision.Legacy
  )
    return Revision.Legacy;

  return undefined;
}

function getHex(value: BigNumberish): string {
  try {
    return toHex(value);
  } catch (e) {
    if (isString(value)) {
      return toHex(encodeShortString(value));
    }
    throw new Error(`Invalid BigNumberish: ${value}`);
  }
}
/**
 * Validates that `data` matches the EIP-712 JSON schema.
 */
function validateTypedData(data: unknown): data is TypedData {
  const typedData = data as TypedData;
  return Boolean(
    typedData.message && typedData.primaryType && typedData.types && identifyRevision(typedData)
  );
}

/**
 * Prepares the selector for use.
 *
 * @param {string} selector - The selector to be prepared.
 * @returns {string} The prepared selector.
 *
 * @example
 * ```typescript
 * const result1;
 * const preparedSelector1 = prepareSelector('0x1');
 * result1 = preparedSelector1;
 * // result1 = '0x1'
 *
 * const result2;
 * const preparedSelector2 = prepareSelector('myFunction');
 * result2 = preparedSelector2;
 * // result2 = '0x8bb83e7e'
 * ```
 */
export function prepareSelector(selector: string): string {
  return isHex(selector) ? selector : getSelectorFromName(selector);
}

/**
 * Checks if the given Starknet type is a Merkle tree type.
 *
 * @param {StarknetType} type - The StarkNet type to check.
 * @returns {boolean} True if the type is a Merkle tree type, false otherwise.
 *
 * @example
 * ```typescript
 * const result1;
 * const merkleType = {
 *   name: 'MerkleTree',
 *   fields: [
 *     { name: 'root', type: 'felt' },
 *     { name: 'leaves', type: 'felt[]' }
 *   ]
 * };
 * const isMerkle1 = isMerkleTreeType(merkleType);
 * result1 = isMerkle1;
 * // result1 = true
 *
 * const result2;
 * const nonMerkleType = {
 *   name: 'RegularStruct',
 *   fields: [
 *     { name: 'id', type: 'felt' },
 *     { name: 'value', type: 'felt' }
 *   ]
 * };
 * const isMerkle2 = isMerkleTreeType(nonMerkleType);
 * result2 = isMerkle2;
 * // result2 = false
 * ```
 */
export function isMerkleTreeType(type: StarknetType): type is StarknetMerkleType {
  return type.type === 'merkletree';
}

/**
 * Get the dependencies of a struct type. If a struct has the same dependency multiple times, it's only included once in the resulting array.
 *
 * @param {TypedData['types']} types - The types object containing all defined types.
 * @param {string} type - The name of the type to get dependencies for.
 * @param {string[]} [dependencies=[]] - The array to store dependencies.
 * @param {string} [contains=''] - The type contained within the struct.
 * @param {Revision} [revision=Revision.Legacy] - The revision of the TypedData.
 * @returns {string[]} The array of dependencies.
 *
 * @example
 * ```typescript
 * const types = {
 *   MyStruct: [
 *     { name: 'field1', type: 'felt' },
 *     { name: 'field2', type: 'AnotherStruct' }
 *   ],
 *   AnotherStruct: [
 *     { name: 'fieldA', type: 'felt' }
 *   ]
 * };
 *
 * const result;
 * const deps = getDependencies(types, 'MyStruct');
 * result = deps;
 * // result = ['MyStruct', 'AnotherStruct']
 * ```
 */
export function getDependencies(
  types: TypedData['types'],
  type: string,
  dependencies: string[] = [],
  contains: string = '',
  revision: Revision = Revision.Legacy
): string[] {
  // Include pointers (struct arrays)
  if (type[type.length - 1] === '*') {
    type = type.slice(0, -1);
  } else if (revision === Revision.Active) {
    // enum base
    if (type === 'enum') {
      type = contains;
    }
    // enum element types
    else if (type.match(/^\(.*\)$/)) {
      type = type.slice(1, -1);
    }
  }

  if (dependencies.includes(type) || !types[type]) {
    return dependencies;
  }

  return [
    type,
    ...(types[type] as StarknetEnumType[]).reduce<string[]>(
      (previous, t) => [
        ...previous,
        ...getDependencies(types, t.type, previous, t.contains, revision).filter(
          (dependency) => !previous.includes(dependency)
        ),
      ],
      []
    ),
  ];
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
 * @returns {string} The encoded type string.
 *
 * @example
 * ```typescript
 * const typedData = {
 *   types: {
 *     MyStruct: [
 *       { name: 'field1', type: 'felt' },
 *       { name: 'field2', type: 'AnotherStruct' }
 *     ],
 *     AnotherStruct: [
 *       { name: 'fieldA', type: 'felt' }
 *     ]
 *   }
 * };
 *
 * const result;
 * const encodedType = encodeType(typedData.types, 'MyStruct');
 * result = encodedType;
 * // result = 'MyStruct(field1:felt,field2:AnotherStruct)'
 * ```
 */
export function encodeType(
  types: TypedData['types'],
  type: string,
  revision: Revision = Revision.Legacy
): string {
  const allTypes =
    revision === Revision.Active
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

  return newTypes
    .map((dependency) => {
      const dependencyElements = allTypes[dependency].map((t) => {
        const targetType =
          t.type === 'enum' && revision === Revision.Active
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
}

/**
 * Get a type string as hash.
 *
 * @param {TypedData['types']} types - The types object containing all defined types.
 * @param {string} type - The name of the type to hash.
 * @param {Revision} [revision=Revision.Legacy] - The revision of the TypedData.
 * @returns {string} The hash of the type string.
 *
 * @example
 * ```typescript
 * const typedData = {
 *   types: {
 *     MyStruct: [
 *       { name: 'field1', type: 'felt' },
 *       { name: 'field2', type: 'AnotherStruct' }
 *     ],
 *     AnotherStruct: [
 *       { name: 'fieldA', type: 'felt' }
 *     ]
 *   }
 * };
 *
 * const result;
 * const typeHash = getTypeHash(typedData.types, 'MyStruct');
 * result = typeHash;
 * // result = '0x5f3cfe24eb9cba5f0e80bcacb8b2d8cdccb1c71f9ff71ec7e02a77c0cbe32e61'
 * ```
 */
export function getTypeHash(
  types: TypedData['types'],
  type: string,
  revision: Revision = Revision.Legacy
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
 * @returns {[string, string]} The ABI compatible type and corresponding value.
 *
 * @example
 * ```typescript
 * const typedData = {
 *   types: {
 *     MyStruct: [
 *       { name: 'field1', type: 'felt' },
 *       { name: 'field2', type: 'AnotherStruct' }
 *     ],
 *     AnotherStruct: [
 *       { name: 'fieldA', type: 'felt' }
 *     ]
 *   }
 * };
 *
 * const result1;
 * const encodedValue1 = encodeValue(typedData.types, 'u256', '12345');
 * result1 = encodedValue1;
 * // result1 = ['u256', '0x3039']
 *
 * const result2;
 * const encodedValue2 = encodeValue(typedData.types, 'string', 'Hello');
 * result2 = encodedValue2;
 * // result2 = ['string', '0x48656c6c6f']
 * ```
 */
export function encodeValue(
  types: TypedData['types'],
  type: string,
  data: unknown,
  ctx: Context = {},
  revision: Revision = Revision.Legacy
): [string, string] {
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
      if (revision === Revision.Active) {
        const [variantKey, variantData] = Object.entries(data as TypedData['message'])[0];

        const parentType = types[ctx.parent as string][0] as StarknetEnumType;
        const enumType = types[parentType.contains];
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
      if (revision === Revision.Active) {
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
      if (revision === Revision.Active) {
        const value = BigInt(data as string);
        assertRange(value, type, RANGE_I128);
        return [type, getHex(value < 0n ? PRIME + value : value)];
      } // else fall through to default
      return [type, getHex(data as string)];
    }
    case 'timestamp':
    case 'u128': {
      if (revision === Revision.Active) {
        assertRange(data, type, RANGE_U128);
      } // else fall through to default
      return [type, getHex(data as string)];
    }
    case 'felt':
    case 'shortstring': {
      // TODO: should 'shortstring' diverge into directly using encodeShortString()?
      if (revision === Revision.Active) {
        assertRange(getHex(data as string), type, RANGE_FELT);
      } // else fall through to default
      return [type, getHex(data as string)];
    }
    case 'ClassHash':
    case 'ContractAddress': {
      if (revision === Revision.Active) {
        assertRange(data, type, RANGE_FELT);
      } // else fall through to default
      return [type, getHex(data as string)];
    }
    case 'bool': {
      if (revision === Revision.Active) {
        assert(typeof data === 'boolean', `Type mismatch for ${type} ${data}`);
      } // else fall through to default
      return [type, getHex(data as string)];
    }
    default: {
      if (revision === Revision.Active) {
        throw new Error(`Unsupported type: ${type}`);
      }
      return [type, getHex(data as string)];
    }
  }
}

/**
 * Encode the data to an ABI encoded Buffer. The data should be a key -> value object with all the required values.
 * All dependent types are automatically encoded.
 *
 * @param {TypedData['types']} types - The types object containing all defined types.
 * @param {string} type - The name of the type to encode.
 * @param {TypedData['message']} data - The data to encode.
 * @param {Revision} [revision=Revision.Legacy] - The revision of the TypedData.
 * @returns {[string[], string[]]} The ABI compatible types and corresponding values.
 *
 * @example
 * ```typescript
 * const typedData = {
 *   types: {
 *     MyStruct: [
 *       { name: 'field1', type: 'felt' },
 *       { name: 'field2', type: 'AnotherStruct' }
 *     ],
 *     AnotherStruct: [
 *       { name: 'fieldA', type: 'felt' }
 *     ]
 *   },
 *   message: {
 *     field1: '0x123',
 *     field2: { fieldA: '0x456' }
 *   }
 * };
 *
 * const result1;
 * const encodedData1 = encodeData(typedData.types, 'MyStruct', typedData.message);
 * result1 = encodedData1;
 * // result1 = [['felt', 'AnotherStruct'], ['0x123', '0x456']]
 *
 * const result2;
 * const encodedData2 = encodeData(typedData.types, 'AnotherStruct', { fieldA: '0x789' });
 * result2 = encodedData2;
 * // result2 = [['felt'], ['0x789']]
 * ```
 */

export function encodeData<T extends TypedData>(
  types: T['types'],
  type: string,
  data: T['message'],
  revision: Revision = Revision.Legacy
) {
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
}

/**
 * Get encoded data as a hash. The data should be a key -> value object with all the required values.
 * All dependent types are automatically encoded.
 *
 * @param {TypedData['types']} types - The types object containing all defined types.
 * @param {string} type - The name of the type to hash.
 * @param {TypedData['message']} data - The data to hash.
 * @param {Revision} [revision=Revision.Legacy] - The revision of the TypedData.
 * @returns {string} The hash of the encoded data.
 *
 * @example
 * ```typescript
 * const structHash = getStructHash(typedData.types, 'MyStruct', typedData.message);
 * const result;
 * result = structHash;
 * // result = '0xabc123...'
 * ```
 */
export function getStructHash<T extends TypedData>(
  types: T['types'],
  type: string,
  data: T['message'],
  revision: Revision = Revision.Legacy
) {
  return revisionConfiguration[revision].hashMethod(encodeData(types, type, data, revision)[1]);
}

/**
 * Get the SNIP-12 encoded message to sign, from the typedData object.
 *
 * @param {TypedData} typedData - The TypedData object.
 * @param {BigNumberish} account - The account to sign the message.
 * @returns {string} The hash of the message to sign.
 * @throws Will throw an error if the typedData does not match the JSON schema.
 *
 * @example
 * ```typescript
 * const result1;
 * try {
 *     const messageHash1 = getMessageHash(typedData, '0x123');
 *     result1 = messageHash1;
 * } catch (error) {
 *     result1 = error.message;
 * }
 * // result1 = '0xabc123...'
 *
 * const result2;
 * try {
 *     const messageHash2 = getMessageHash(invalidTypedData, '0x123');
 *     result2 = messageHash2;
 * } catch (error) {
 *     result2 = error.message;
 * }
 * // result2 = 'Typed data does not match JSON schema'
 * ```
 */
export function getMessageHash(typedData: TypedData, account: BigNumberish): string {
  if (!validateTypedData(typedData)) {
    throw new Error('Typed data does not match JSON schema');
  }

  const revision = identifyRevision(typedData) as Revision;
  const { domain, hashMethod } = revisionConfiguration[revision];

  const message = [
    encodeShortString('StarkNet Message'),
    getStructHash(typedData.types, domain, typedData.domain, revision),
    account,
    getStructHash(typedData.types, typedData.primaryType, typedData.message, revision),
  ];

  return hashMethod(message);
}
