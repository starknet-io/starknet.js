import { AbiEntry, AbiEnums, AbiStructs, CairoEnum, RawArgsObject } from '../../types';
import { CairoUint256 } from '../cairoDataTypes/uint256';
import { CairoUint512 } from '../cairoDataTypes/uint512';
import {
  getArrayType,
  isCairo1Type,
  isLen,
  isTypeArray,
  isTypeByteArray,
  isTypeEnum,
  isTypeEthAddress,
  isTypeOption,
  isTypeResult,
  isTypeSecp256k1Point,
  isTypeStruct,
  isTypeTuple,
} from './cairo';
import {
  CairoCustomEnum,
  CairoOption,
  CairoOptionVariant,
  CairoResult,
  CairoResultVariant,
} from './enum';
import extractTupleMemberTypes from './tuple';

import { isString } from '../shortString';

/**
 * Creates a new Error object indicating that the provided key in the object includes an Uint256 object without the 'low' and 'high' keys.
 * @param {string} key - The key indicating the property in the object.
 * @return - The Error object indicating the missing 'low' and 'high' keys.
 */
function errorU256(key: string) {
  return Error(
    `Your object includes the property : ${key}, containing an Uint256 object without the 'low' and 'high' keys.`
  );
}

function errorU512(key: string) {
  return Error(
    `Your object includes the property : ${key}, containing an Uint512 object without the 'limb0' to 'limb3' keys.`
  );
}

export default function orderPropsByAbi(
  unorderedObject: RawArgsObject,
  abiOfObject: AbiEntry[],
  structs: AbiStructs,
  enums: AbiEnums
): object {
  /**
   * Orders an input item based on its ABI type.
   *
   * @param {any} unorderedItem - The unordered item to be ordered.
   * @param {string} abiType - The ABI type of the item.
   * @returns - The ordered item.
   */
  const orderInput = (unorderedItem: any, abiType: string): any => {
    if (isTypeArray(abiType)) {
      return orderArray(unorderedItem, abiType);
    }
    if (isTypeEnum(abiType, enums)) {
      const abiObj = enums[abiType];
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return orderEnum(unorderedItem, abiObj);
    }
    if (isTypeTuple(abiType)) {
      return orderTuple(unorderedItem, abiType);
    }
    if (isTypeEthAddress(abiType)) {
      return unorderedItem;
    }
    if (isTypeByteArray(abiType)) {
      return unorderedItem;
    }
    if (isTypeSecp256k1Point(abiType)) {
      return unorderedItem;
    }
    if (CairoUint256.isAbiType(abiType)) {
      const u256 = unorderedItem;
      if (typeof u256 !== 'object') {
        // BigNumberish --> just copy
        return u256;
      }
      if (!('low' in u256 && 'high' in u256)) {
        throw errorU256(abiType);
      }
      return { low: u256.low, high: u256.high };
    }
    if (CairoUint512.isAbiType(abiType)) {
      const u512 = unorderedItem;
      if (typeof u512 !== 'object') {
        // BigNumberish --> just copy
        return u512;
      }
      if (!['limb0', 'limb1', 'limb2', 'limb3'].every((key) => key in u512)) {
        throw errorU512(abiType);
      }
      return { limb0: u512.limb0, limb1: u512.limb1, limb2: u512.limb2, limb3: u512.limb3 };
    }
    if (isTypeStruct(abiType, structs)) {
      const abiOfStruct = structs[abiType].members;
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return orderStruct(unorderedItem, abiOfStruct);
    }
    // literals
    return unorderedItem;
  };

  /**
   * Orders the properties of the input object based on the given ABI entries.
   *
   * @param {object} unorderedObject2 - The input object whose properties need to be ordered.
   * @param {Array<object>} abiObject - An array of ABI entries representing the desired order of properties.
   * @returns - The ordered object with properties based on the given ABI entries.
   * @throws {Error} If the input object is missing a required property or if a property has an invalid value.
   */
  const orderStruct = (unorderedObject2: RawArgsObject, abiObject: AbiEntry[]): object => {
    const orderedObject2 = abiObject.reduce((orderedObject, abiParam) => {
      const setProperty = (value?: any) =>
        Object.defineProperty(orderedObject, abiParam.name, {
          enumerable: true,
          value: value ?? unorderedObject2[abiParam.name],
        });

      if (unorderedObject2[abiParam.name] === 'undefined') {
        if (isCairo1Type(abiParam.type) || !isLen(abiParam.name)) {
          throw Error(`Your object needs a property with key : ${abiParam.name} .`);
        }
      }
      setProperty(orderInput(unorderedObject2[abiParam.name], abiParam.type));
      return orderedObject;
    }, {});
    return orderedObject2;
  };

  /**
   * Orders the elements in the array according to the given ABI parameter.
   *
   * @param {Array<any> | string} myArray - The array to be ordered. Can be either an array of any type or a string.
   * @param {string} abiParam - The ABI parameter used to determine the order of the elements.
   *
   * @return - The ordered array or the input string if it is not an array.
   */
  function orderArray(myArray: Array<any> | string, abiParam: string): Array<any> | string {
    const typeInArray = getArrayType(abiParam);
    if (isString(myArray)) {
      return myArray; // longstring
    }
    return myArray.map((myElem) => orderInput(myElem, typeInArray));
  }

  /**
   * Orders the properties of the input object based on the provided ABI parameter.
   *
   * @param {object} unorderedObject2 - The input object with unordered properties.
   * @param {string} abiParam - The ABI parameter for ordering the properties.
   * @return - The ordered object with properties arranged according to ABI parameter.
   */
  function orderTuple(unorderedObject2: RawArgsObject, abiParam: string): object {
    const typeList = extractTupleMemberTypes(abiParam);
    const orderedObject2 = typeList.reduce((orderedObject: object, abiTypeCairoX: any, index) => {
      const myObjKeys: string[] = Object.keys(unorderedObject2);
      const setProperty = (value?: any) =>
        Object.defineProperty(orderedObject, index.toString(), {
          enumerable: true,
          value: value ?? unorderedObject2[myObjKeys[index]],
        });
      const abiType: string = abiTypeCairoX?.type ? abiTypeCairoX.type : abiTypeCairoX; // Named tuple, or tuple
      setProperty(orderInput(unorderedObject2[myObjKeys[index]], abiType));
      return orderedObject;
    }, {});
    return orderedObject2;
  }

  /**
   * Applies a specific order to the given unordered object based on the provided ABI entry.
   * @param {CairoEnum} unorderedObject2 - The unordered object.
   * @param {AbiEntry} abiObject - The ABI entry.
   * @returns {CairoEnum} The ordered object.
   */
  const orderEnum = (unorderedObject2: CairoEnum, abiObject: AbiEntry): CairoEnum => {
    if (isTypeResult(abiObject.name)) {
      const unorderedResult = unorderedObject2 as CairoResult<any, any>;
      const resultOkType: string = abiObject.name.substring(
        abiObject.name.indexOf('<') + 1,
        abiObject.name.lastIndexOf(',')
      );
      const resultErrType: string = abiObject.name.substring(
        abiObject.name.indexOf(',') + 1,
        abiObject.name.lastIndexOf('>')
      );
      if (unorderedResult.isOk()) {
        return new CairoResult<any, any>(
          CairoResultVariant.Ok,
          orderInput(unorderedObject2.unwrap(), resultOkType)
        );
      }
      return new CairoResult<any, any>(
        CairoResultVariant.Err,
        orderInput(unorderedObject2.unwrap(), resultErrType)
      );
    }
    if (isTypeOption(abiObject.name)) {
      const unorderedOption = unorderedObject2 as CairoOption<any>;
      const resultSomeType: string = abiObject.name.substring(
        abiObject.name.indexOf('<') + 1,
        abiObject.name.lastIndexOf('>')
      );
      if (unorderedOption.isSome()) {
        return new CairoOption<any>(
          CairoOptionVariant.Some,
          orderInput(unorderedOption.unwrap(), resultSomeType)
        );
      }
      // none(())
      return new CairoOption<any>(CairoOptionVariant.None, {});
    }
    // custom Enum
    const unorderedCustomEnum = unorderedObject2 as CairoCustomEnum;
    const variants = Object.entries(unorderedCustomEnum.variant);
    const newEntries = variants.map((variant) => {
      if (typeof variant[1] === 'undefined') {
        return variant;
      }
      const variantType: string = abiObject.type.substring(
        abiObject.type.lastIndexOf('<') + 1,
        abiObject.type.lastIndexOf('>')
      );
      if (variantType === '()') {
        return variant;
      }
      return [variant[0], orderInput(unorderedCustomEnum.unwrap(), variantType)];
    });
    return new CairoCustomEnum(Object.fromEntries(newEntries));
  };

  // Order Call Parameters
  const finalOrderedObject = abiOfObject.reduce((orderedObject, abiParam) => {
    const setProperty = (value: any) =>
      Object.defineProperty(orderedObject, abiParam.name, {
        enumerable: true,
        value,
      });
    if (isLen(abiParam.name) && !isCairo1Type(abiParam.type)) {
      return orderedObject;
    }
    setProperty(orderInput(unorderedObject[abiParam.name], abiParam.type));
    return orderedObject;
  }, {});
  return finalOrderedObject;
}
