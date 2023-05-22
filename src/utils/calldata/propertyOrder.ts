import { AbiEntry, AbiStructs, RawArgsObject } from '../../types';
import {
  getArrayType,
  isCairo1Type,
  isLen,
  isTypeArray,
  isTypeStruct,
  isTypeTuple,
  isTypeUint256,
} from './cairo';
import extractTupleMemberTypes from './tuple';

function errorU256(key: string) {
  return Error(
    `Your object includes the property : ${key}, containing an Uint256 object without the 'low' and 'high' keys.`
  );
}
export default function orderPropsByAbi(
  unorderedObject: RawArgsObject,
  abiOfObject: AbiEntry[],
  structs: AbiStructs
): object {
  const orderStruct = (unorderedObject2: RawArgsObject, abiObject: AbiEntry[]): object => {
    const orderedObject2 = abiObject.reduce((orderedObject, abiParam) => {
      const setProperty = (value?: any) =>
        Object.defineProperty(orderedObject, abiParam.name, {
          enumerable: true,
          value: value ?? unorderedObject2[abiParam.name],
        });

      if (unorderedObject2[abiParam.name] === 'undefined') {
        if (
          isCairo1Type(abiParam.type) ||
          (!isCairo1Type(abiParam.type) && !isLen(abiParam.name))
        ) {
          throw Error(`Your object needs a property with key : ${abiParam.name} .`);
        }
      }
      switch (true) {
        case isTypeStruct(abiParam.type, structs):
          setProperty(
            orderStruct(
              unorderedObject2[abiParam.name] as RawArgsObject,
              structs[abiParam.type].members
            )
          );

          break;
        case isTypeUint256(abiParam.type): {
          const u256 = unorderedObject2[abiParam.name];
          if (typeof u256 !== 'object') {
            // BigNumberish --> just copy
            setProperty();
            break;
          }
          if (!('low' in u256 && 'high' in u256)) {
            // object without 'low' & 'high'
            throw errorU256(abiParam.name);
          } else {
            setProperty({ low: u256.low, high: u256.high });
          }
          break;
        }

        case isTypeTuple(abiParam.type):
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          setProperty(orderTuple(unorderedObject2[abiParam.name] as RawArgsObject, abiParam));

          break;
        case isTypeArray(abiParam.type):
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          setProperty(orderArray(unorderedObject2[abiParam.name] as Array<any>, abiParam));

          break;
        case !isCairo1Type(abiParam.type) && isLen(abiParam.name):
          // Cairo 0 array_len. Nothing to do, go to next abi item
          break;
        default: // do not needs recursion --> just copy
          setProperty();
      }
      return orderedObject;
    }, {});
    return orderedObject2;
  };

  const orderArray = (myArray: Array<any> | string, abiParam: AbiEntry): Array<any> | string => {
    const typeInArray = getArrayType(abiParam.type);
    if (typeof myArray === 'string') {
      return myArray; // longstring
    }
    switch (true) {
      case typeInArray in structs:
        return myArray.map((myObj) => orderStruct(myObj, structs[typeInArray].members));
      case typeInArray === 'core::integer::u256':
        return myArray.map((u256) => {
          if (typeof u256 === 'object') {
            if ('low' in u256 && 'high' in u256) {
              return { low: u256.low, high: u256.high };
            }
            // object without 'low' & 'high'
            throw errorU256(abiParam.name);
          }
          return u256;
        });
      case isTypeTuple(typeInArray):
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return myArray.map((myElem) => orderTuple(myElem, { name: '0', type: typeInArray }));
      case isTypeArray(typeInArray):
        return myArray.map((myElem) => orderArray(myElem, { name: '0', type: typeInArray }));
      default: // is an array of litterals
        return myArray;
    }
  };

  const orderTuple = (unorderedObject2: RawArgsObject, abiParam: AbiEntry): object => {
    const typeList = extractTupleMemberTypes(abiParam.type);
    const orderedObject2 = typeList.reduce((orderedObject: object, abiTypeCairoX: any, index) => {
      const myObjKeys: string[] = Object.keys(unorderedObject2);
      const setProperty = (value?: any) =>
        Object.defineProperty(orderedObject, index.toString(), {
          enumerable: true,
          value: value ?? unorderedObject2[myObjKeys[index]],
        });
      const abiType: string = abiTypeCairoX?.type ? abiTypeCairoX.type : abiTypeCairoX; // Named tuple, or tuple

      switch (true) {
        case isTypeStruct(abiType, structs):
          setProperty(
            orderStruct(
              unorderedObject2[myObjKeys[index]] as RawArgsObject,
              structs[abiType].members
            )
          );
          break;
        case isTypeUint256(abiType): {
          const u256 = unorderedObject2[myObjKeys[index]];
          if (typeof u256 !== 'object') {
            // BigNumberish --> just copy
            setProperty();
          } else if (!('low' in u256 && 'high' in u256)) {
            // object without 'low' & 'high'
            throw errorU256(abiParam.name);
          } else {
            setProperty({ low: u256.low, high: u256.high });
          }

          break;
        }
        case isTypeTuple(abiType):
          setProperty(
            orderTuple(unorderedObject2[myObjKeys[index]] as RawArgsObject, {
              name: '0',
              type: abiType,
            })
          );
          break;
        case isTypeArray(abiType):
          setProperty(
            orderArray(unorderedObject2[myObjKeys[index]] as Array<any>, {
              name: '0',
              type: abiType,
            })
          );
          break;
        default: // litterals, do not needs recursion --> just copy
          setProperty();
      }
      return orderedObject;
    }, {});
    return orderedObject2;
  };
  return orderStruct(unorderedObject, abiOfObject);
}
