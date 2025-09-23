import {
  AbiEntry,
  AbiEnums,
  AbiStructs,
  CairoEnum,
  RawArgsObject,
  type CairoTypeEnum,
} from '../../types';
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
import { isUndefined, isString } from '../typed';
import { CairoFixedArray } from '../cairoDataTypes/fixedArray';
import { CairoArray } from '../cairoDataTypes/array';
import { CairoTuple } from '../cairoDataTypes/tuple';
import { CairoByteArray } from '../cairoDataTypes/byteArray';
import { CairoSecp256k1Point } from '../cairoDataTypes/secp256k1Point';
import { CairoTypeOption } from '../cairoDataTypes/cairoTypeOption';
import { type ParsingStrategy } from './parser';
import { CairoTypeResult } from '../cairoDataTypes/cairoTypeResult';
import { CairoStruct } from '../cairoDataTypes/cairoStruct';

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
  enums: AbiEnums,
  parseStrategy: ParsingStrategy
): object {
  const orderInput = (unorderedItem: any, abiType: string): any => {
    if (CairoFixedArray.isAbiType(abiType)) {
      return orderFixedArray(unorderedItem, abiType);
    }
    if (isTypeArray(abiType)) {
      return orderArray(unorderedItem, abiType);
    }
    if (isTypeEnum(abiType, enums)) {
      const abiObj = enums[abiType];
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return orderEnum(unorderedItem, abiObj);
    }
    if (unorderedItem instanceof CairoTuple) {
      return unorderedItem;
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
    if (CairoSecp256k1Point.isAbiType(abiType)) {
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
    if (CairoStruct.isAbiType(abiType)) {
      return unorderedItem;
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

  function orderArray(
    myArray: Array<any> | string | CairoArray,
    abiParam: string
  ): Array<any> | string | CairoArray {
    // If myArray is already a CairoArray instance, return it as-is
    if (myArray instanceof CairoArray) {
      return myArray;
    }

    const typeInArray = getArrayType(abiParam);
    if (isString(myArray)) {
      return myArray; // longstring
    }
    return myArray.map((myElem) => orderInput(myElem, typeInArray));
  }

  function orderFixedArray(
    input: Array<any> | Record<string, any> | CairoFixedArray,
    abiParam: string
  ): Array<any> | CairoFixedArray {
    // If input is already a CairoFixedArray instance, return it as-is
    if (input instanceof CairoFixedArray) {
      return input;
    }

    const typeInFixedArray = CairoFixedArray.getFixedArrayType(abiParam);
    const arraySize = CairoFixedArray.getFixedArraySize(abiParam);
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
    const typeList = CairoTuple.getTupleElementTypes(abiParam);
    const orderedObject2 = typeList.reduce(
      (orderedObject: object, abiTypeCairoX: any, index: number) => {
        const myObjKeys: string[] = Object.keys(unorderedObject2);
        const setProperty = (value?: any) =>
          Object.defineProperty(orderedObject, index.toString(), {
            enumerable: true,
            value: value ?? unorderedObject2[myObjKeys[index]],
          });
        const abiType: string = abiTypeCairoX?.type ? abiTypeCairoX.type : abiTypeCairoX; // Named tuple, or tuple
        setProperty(orderInput(unorderedObject2[myObjKeys[index]], abiType));
        return orderedObject;
      },
      {}
    );
    return orderedObject2;
  }

  const orderEnum = (
    unorderedObject2: CairoEnum | CairoTypeEnum,
    abiObject: AbiEntry
  ): CairoTypeEnum => {
    if (isTypeResult(abiObject.name)) {
      if (unorderedObject2 instanceof CairoResult) {
        const unorderedResult = unorderedObject2 as CairoResult<any, any>;
        const resultType: string = CairoTypeResult.getVariantTypes(abiObject.name)[
          unorderedResult.isOk() ? CairoResultVariant.Ok : CairoResultVariant.Err
        ];
        return new CairoTypeResult(
          orderInput(unorderedResult.unwrap(), resultType),
          abiObject.name,
          parseStrategy,
          unorderedResult.isOk() ? CairoResultVariant.Ok : CairoResultVariant.Err
        );
      }
      const unorderedResult = unorderedObject2 as CairoTypeResult;
      return new CairoTypeResult(
        orderInput(
          unorderedResult.content,
          CairoTypeResult.getVariantTypes(abiObject.name)[
            unorderedResult.isVariantOk ? CairoResultVariant.Ok : CairoResultVariant.Err
          ]
        ),
        abiObject.name,
        parseStrategy,
        unorderedResult.isVariantOk ? CairoResultVariant.Ok : CairoResultVariant.Err
      );
    }
    if (isTypeOption(abiObject.name)) {
      if (unorderedObject2 instanceof CairoOption) {
        const unorderedOption = unorderedObject2 as CairoOption<Object>;
        if (unorderedOption.isSome()) {
          const resultSomeType: string = CairoTypeOption.getVariantSomeType(abiObject.name);
          return new CairoTypeOption(
            orderInput(unorderedOption.unwrap(), resultSomeType),
            abiObject.name,
            parseStrategy,
            CairoOptionVariant.Some
          );
        }
        // none(())
        return new CairoTypeOption(
          undefined,
          abiObject.type,
          parseStrategy,
          CairoOptionVariant.None
        );
      }
      const unorderedOption = unorderedObject2 as CairoTypeOption;
      if (unorderedOption.isVariantSome) {
        const resultSomeType: string = CairoTypeOption.getVariantSomeType(abiObject.name);
        return new CairoTypeOption(
          orderInput(unorderedOption.content, resultSomeType),
          abiObject.name,
          parseStrategy,
          CairoOptionVariant.Some
        );
      }
      // none(())
      return new CairoTypeOption(undefined, abiObject.type, parseStrategy, CairoOptionVariant.None);
    }
    // custom Enum
    const unorderedCustomEnum = unorderedObject2 as CairoCustomEnum;
    const variants = Object.entries(unorderedCustomEnum.variant);
    const newEntries = variants.map((variant) => {
      if (isUndefined(variant[1])) {
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
