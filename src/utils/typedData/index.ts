import { computeHashOnElements, getSelectorFromName } from '../hash';
import { BigNumberish, toBN, toHex } from '../number';
import { encodeShortString } from '../shortString';
import { TypedData } from './types';
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
  typedData: TypedData,
  type: string,
  dependencies: string[] = []
): string[] => {
  // `getDependencies` is called by most other functions, so we validate the JSON schema here
  if (!validateTypedData(typedData)) {
    throw new Error('Typed data does not match JSON schema');
  }

  if (dependencies.includes(type)) {
    return dependencies;
  }

  if (!typedData.types[type]) {
    return dependencies;
  }

  return [
    type,
    ...typedData.types[type].reduce<string[]>(
      (previous, t) => [
        ...previous,
        ...getDependencies(typedData, t.type, previous).filter(
          (dependency) => !previous.includes(dependency)
        ),
      ],
      []
    ),
  ];
};

/**
 * Encode a type to a string. All dependant types are alphabetically sorted.
 *
 * @param {TypedData} typedData
 * @param {string} type
 * @return {string}
 */
export const encodeType = (typedData: TypedData, type: string): string => {
  const [primary, ...dependencies] = getDependencies(typedData, type);
  const types = [primary, ...dependencies.sort()];

  return types
    .map((dependency) => {
      return `${dependency}(${typedData.types[dependency].map((t) => `${t.name}:${t.type}`)})`;
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
export const getTypeHash = (typedData: TypedData, type: string): string => {
  return getSelectorFromName(encodeType(typedData, type));
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
const encodeValue = (typedData: TypedData, type: string, data: unknown): [string, string] => {
  if (typedData.types[type]) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return [type, getStructHash(typedData, type, data as Record<string, unknown>)];
  }

  if (type === 'felt*') {
    return ['felt*', computeHashOnElements(data as string[])];
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
export const encodeData = <T extends TypedData>(typedData: T, type: string, data: T['message']) => {
  const [types, values] = typedData.types[type].reduce<[string[], string[]]>(
    ([ts, vs], field) => {
      if (data[field.name] === undefined || data[field.name] === null) {
        throw new Error(`Cannot encode data: missing data for '${field.name}'`);
      }

      const value = data[field.name];
      const [t, encodedValue] = encodeValue(typedData, field.type, value);

      return [
        [...ts, t],
        [...vs, encodedValue],
      ];
    },
    [['felt'], [getTypeHash(typedData, type)]]
  );

  return [types, values];
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
  typedData: T,
  type: string,
  data: T['message']
) => {
  return computeHashOnElements(encodeData(typedData, type, data)[1]);
};

/**
 * Get the EIP-191 encoded message to sign, from the typedData object. If `hash` is enabled, the message will be hashed
 * with Keccak256.
 *
 * @param {TypedData} typedData
 * @param {BigNumberish} account
 * @return {string}
 */
export const getMessageHash = (typedData: TypedData, account: BigNumberish): string => {
  const message = [
    encodeShortString('StarkNet Message'),
    getStructHash(typedData, 'StarkNetDomain', typedData.domain),
    account,
    getStructHash(typedData, typedData.primaryType, typedData.message),
  ];

  return computeHashOnElements(message);
};
