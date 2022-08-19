import { computeHashOnElements, getSelectorFromName } from '../hash';
import { MerkleTree } from '../merkle';
import { BigNumberish, isHex, toBN, toHex } from '../number';
import { encodeShortString } from '../shortString';
import { StarkNetMerkleType, StarkNetType, TypedData } from './types';
import { validateTypedData } from './utils';

export * from './types';

function getHex(value: BigNumberish): string {
  try {
    return toHex(toBN(value));
  } catch (e) {
    if (typeof value === 'string') {
      return toHex(toBN(encodeShortString(value)));
    }
    throw new Error(`Invalid BigNumberish: ${value}`);
  }
}

export function prepareSelector(selector: string): string {
  return isHex(selector) ? selector : getSelectorFromName(selector);
}

export function isMerkleTreeType(type: StarkNetType): type is StarkNetMerkleType {
  return type.type === 'merkletree';
}

interface Context {
  parent?: string;
  key?: string;
}

/**
 * Get the dependencies of a struct type. If a struct has the same dependency multiple times, it's only included once
 * in the resulting array.
 *
 * @param {TypedData} typedData
 * @param {string} type
 * @param {string[]} [dependencies]
 * @return {string[]}
 */
export const getDependencies = (
  types: TypedData['types'],
  type: string,
  dependencies: string[] = []
): string[] => {
  // Include pointers (struct arrays)
  if (type[type.length - 1] === '*') {
    // eslint-disable-next-line no-param-reassign
    type = type.slice(0, -1);
  }

  if (dependencies.includes(type)) {
    return dependencies;
  }

  if (!types[type]) {
    return dependencies;
  }

  return [
    type,
    ...types[type].reduce<string[]>(
      (previous, t) => [
        ...previous,
        ...getDependencies(types, t.type, previous).filter(
          (dependency) => !previous.includes(dependency)
        ),
      ],
      []
    ),
  ];
};

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
 * Encode a type to a string. All dependant types are alphabetically sorted.
 *
 * @param {TypedData} typedData
 * @param {string} type
 * @return {string}
 */
export const encodeType = (types: TypedData['types'], type: string): string => {
  const [primary, ...dependencies] = getDependencies(types, type);
  const newTypes = !primary ? [] : [primary, ...dependencies.sort()];

  return newTypes
    .map((dependency) => {
      return `${dependency}(${types[dependency].map((t) => `${t.name}:${t.type}`)})`;
    })
    .join('');
};

/**
 * Get a type string as hash.
 *
 * @param {TypedData} typedData
 * @param {string} type
 * @return {string}
 */
export const getTypeHash = (types: TypedData['types'], type: string): string => {
  return getSelectorFromName(encodeType(types, type));
};

/**
 * Encodes a single value to an ABI serialisable string, number or Buffer. Returns the data as tuple, which consists of
 * an array of ABI compatible types, and an array of corresponding values.
 *
 * @param {TypedData} typedData
 * @param {string} type
 * @param {any} data
 * @returns {[string, string]}
 */
export const encodeValue = (
  types: TypedData['types'],
  type: string,
  data: unknown,
  ctx: Context = {}
): [string, string] => {
  if (types[type]) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return [type, getStructHash(types, type, data as Record<string, unknown>)];
  }

  if (
    Object.keys(types)
      .map((x) => `${x}*`)
      .includes(type)
  ) {
    const structHashes: string[] = (data as unknown[]).map((struct) => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return getStructHash(types, type.slice(0, -1), struct as Record<string, unknown>);
    });
    return [type, computeHashOnElements(structHashes)];
  }

  if (type === 'merkletree') {
    const merkleTreeType = getMerkleTreeType(types, ctx);
    const structHashes: string[] = (data as unknown[]).map((struct) => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return encodeValue(types, merkleTreeType, struct as Record<string, unknown>)[1];
    });
    const { root } = new MerkleTree(structHashes as string[]);
    return ['felt', root];
  }

  if (type === 'felt*') {
    return ['felt*', computeHashOnElements(data as string[])];
  }

  if (type === 'selector') {
    return ['felt', prepareSelector(data as string)];
  }

  return [type, getHex(data as string)];
};

/**
 * Encode the data to an ABI encoded Buffer. The data should be a key -> value object with all the required values. All
 * dependant types are automatically encoded.
 *
 * @param {TypedData} typedData
 * @param {string} type
 * @param {Record<string, any>} data
 */
export const encodeData = <T extends TypedData>(
  types: T['types'],
  type: string,
  data: T['message']
) => {
  const [returnTypes, values] = types[type].reduce<[string[], string[]]>(
    ([ts, vs], field) => {
      if (data[field.name] === undefined || data[field.name] === null) {
        throw new Error(`Cannot encode data: missing data for '${field.name}'`);
      }

      const value = data[field.name];
      const [t, encodedValue] = encodeValue(types, field.type, value, {
        parent: type,
        key: field.name,
      });

      return [
        [...ts, t],
        [...vs, encodedValue],
      ];
    },
    [['felt'], [getTypeHash(types, type)]]
  );

  return [returnTypes, values];
};

/**
 * Get encoded data as a hash. The data should be a key -> value object with all the required values. All dependant
 * types are automatically encoded.
 *
 * @param {TypedData} typedData
 * @param {string} type
 * @param {Record<string, any>} data
 * @return {Buffer}
 */
export const getStructHash = <T extends TypedData>(
  types: T['types'],
  type: string,
  data: T['message']
) => {
  return computeHashOnElements(encodeData(types, type, data)[1]);
};

/**
 * Get the EIP-191 encoded message to sign, from the typedData object.
 *
 * @param {TypedData} typedData
 * @param {BigNumberish} account
 * @return {string}
 */
export const getMessageHash = (typedData: TypedData, account: BigNumberish): string => {
  if (!validateTypedData(typedData)) {
    throw new Error('Typed data does not match JSON schema');
  }

  const message = [
    encodeShortString('StarkNet Message'),
    getStructHash(typedData.types, 'StarkNetDomain', typedData.domain),
    account,
    getStructHash(typedData.types, typedData.primaryType, typedData.message),
  ];

  return computeHashOnElements(message);
};
