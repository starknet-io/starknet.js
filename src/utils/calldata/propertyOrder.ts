import { AbiEntry, AbiEnum, AbiEnums, AbiStructs, CairoEnum, RawArgsObject } from '../../types';
import { CairoUint256 } from '../cairoDataTypes/uint256';
import { CairoUint512 } from '../cairoDataTypes/uint512';
import {
  getArrayType,
  isCairo1Type,
  isLen,
  isTypeArray,
  isTypeEnum,
  isTypeEthAddress,
  isTypeNonZero,
  isTypeOption,
  isTypeResult,
  isTypeSecp256k1Point,
  isTypeStruct,
  isTypeTuple,
  isTypeU96,
} from './cairo';
import {
  CairoCustomEnum,
  CairoOption,
  CairoOptionVariant,
  CairoResult,
  CairoResultVariant,
} from './enum';
import extractTupleMemberTypes from './tuple';
import { isUndefined, isString } from '../typed';
import { CairoFixedArray } from '../cairoDataTypes/fixedArray';
import { CairoByteArray } from '../cairoDataTypes/byteArray';
import { isCairoType } from '../cairoDataTypes/cairoType.interface';

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

/**
 * Get from the abi the type of the value that an enum variant holds.
 *
 * The type is read in the abi entry of the variant, not guessed from the name of the enum.
 * @param {AbiEnum} abiEnum the abi definition of the enum
 * @param {string} variantName the name of the variant
 * @returns {string} the Cairo type of the variant, or an empty string when the abi does not list
 * this variant. With an empty string, the value is not reordered.
 * @example
 * ```typescript
 * const abiEnum: AbiEnum = {
 *   type: 'enum',
 *   name: 'test::Shape',
 *   variants: [
 *     { name: 'Dot', type: 'test::Point' },
 *     { name: 'Nothing', type: '()' },
 *   ],
 * };
 * const result = getVariantType(abiEnum, 'Dot');
 * // result = "test::Point"
 * const result2 = getVariantType(abiEnum, 'Unknown');
 * // result2 = ""
 * ```
 */
function getVariantType(abiEnum: AbiEnum, variantName: string): string {
  // an abi written by hand may have no `variants` list
  return abiEnum.variants?.find((abiVariant) => abiVariant.name === variantName)?.type ?? '';
}

export default function orderPropsByAbi(
  unorderedObject: RawArgsObject,
  abiOfObject: AbiEntry[],
  structs: AbiStructs,
  enums: AbiEnums
): object {
  const orderInput = (unorderedItem: any, abiType: string): any => {
    if (CairoFixedArray.isTypeFixedArray(abiType)) {
      return orderFixedArray(unorderedItem, abiType);
    }
    // a Cairo type instance (CairoStruct, CairoArray...) is already built, in the right order.
    // Do not open it: its inner fields are not the values to send. A fixed array instance is
    // handled above, to check its size.
    if (isCairoType(unorderedItem)) {
      return unorderedItem;
    }
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
    if (isTypeNonZero(abiType)) {
      return unorderedItem;
    }
    if (CairoByteArray.isAbiType(abiType)) {
      return unorderedItem;
    }
    if (isTypeU96(abiType)) {
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

  function orderArray(myArray: Array<any> | string, abiParam: string): Array<any> | string {
    const typeInArray = getArrayType(abiParam);
    if (isString(myArray)) {
      return myArray; // longstring
    }
    return myArray.map((myElem) => orderInput(myElem, typeInArray));
  }

  function orderFixedArray(input: Array<any> | Record<string, any>, abiParam: string): Array<any> {
    const typeInFixedArray = CairoFixedArray.getFixedArrayType(abiParam);
    const arraySize = CairoFixedArray.getFixedArraySize(abiParam);
    // an instance holds its items in `content`; its two fields are not the items. Reading them
    // here also hands a plain array to everything downstream
    if (input instanceof CairoFixedArray) {
      return orderFixedArray(input.content, abiParam);
    }
    if (Array.isArray(input)) {
      if (arraySize !== input.length) {
        throw new Error(
          `ABI type ${abiParam}: array provided do not includes  ${arraySize} items. ${input.length} items provided.`
        );
      }
      return input.map((myElem) => orderInput(myElem, typeInFixedArray));
    }
    if (arraySize !== Object.keys(input).length) {
      throw new Error(
        `ABI type ${abiParam}: object provided do not includes  ${arraySize} properties. ${Object.keys(input).length} items provided.`
      );
    }
    return orderInput(input, typeInFixedArray);
  }

  function orderTuple(unorderedObject2: RawArgsObject, abiParam: string): object {
    const typeList = extractTupleMemberTypes(abiParam);
    const orderedObject2 = typeList.reduce((orderedObject: object, abiTypeCairoX: any, index) => {
      const myObjKeys: string[] = Object.keys(unorderedObject2);
      const setProperty = (value?: any) =>
        Object.defineProperty(orderedObject, index.toString(), {
          enumerable: true,
          value: value ?? unorderedObject2[myObjKeys[index]],
        });
      // Cairo 0 specific: when Cairo 0 support is dropped, keep only `abiTypeCairoX`.
      // A member written `{ name, type }` comes from a Cairo 0 named tuple.
      const abiType: string = abiTypeCairoX?.type ? abiTypeCairoX.type : abiTypeCairoX; // Named tuple, or tuple
      setProperty(orderInput(unorderedObject2[myObjKeys[index]], abiType));
      return orderedObject;
    }, {});
    return orderedObject2;
  }

  const orderEnum = (unorderedObject2: CairoEnum, abiObject: AbiEnum): CairoEnum => {
    if (isTypeResult(abiObject.name)) {
      const unorderedResult = unorderedObject2 as CairoResult<any, any>;
      const resultOkType: string = getVariantType(abiObject, 'Ok');
      const resultErrType: string = getVariantType(abiObject, 'Err');
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
      const resultSomeType: string = getVariantType(abiObject, 'Some');
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
      if (isUndefined(variant[1])) {
        return variant;
      }
      const variantType: string = getVariantType(abiObject, variant[0]);
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
