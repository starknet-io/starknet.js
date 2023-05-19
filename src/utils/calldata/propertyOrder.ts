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
  throw Error(
    `Your object includes the property : ${key}, containing an Uint256 object without the 'low' and 'high' keys.`
  );
}
export default function orderPropsByAbi(
  myInputObj: RawArgsObject,
  abiOfObject: AbiEntry[],
  structs: AbiStructs
): object {
  const orderStruct = (myObj: RawArgsObject, abiObject: AbiEntry[]): object => {
    const paramProperty = { enumerable: true };
    const newObj2 = abiObject.reduce((newObj, abiParam) => {
      const copyProperty2struct = () =>
        Object.defineProperty(newObj, abiParam.name, {
          ...paramProperty,
          value: myObj[abiParam.name],
        });

      if (myObj[abiParam.name] === 'undefined') {
        if (
          isCairo1Type(abiParam.type) ||
          (!isCairo1Type(abiParam.type) && !isLen(abiParam.name))
        ) {
          throw Error(`Your object needs a property with key : ${abiParam.name} .`);
        }
      }
      switch (true) {
        case isTypeStruct(abiParam.type, structs):
          Object.defineProperty(newObj, abiParam.name, {
            ...paramProperty,
            value: orderStruct(
              myObj[abiParam.name] as RawArgsObject,
              structs[abiParam.type].members
            ),
          });
          break;
        case isTypeUint256(abiParam.type):
          {
            const u256 = myObj[abiParam.name];
            if (typeof u256 === 'object') {
              if ('low' in u256 && 'high' in u256) {
                Object.defineProperty(newObj, abiParam.name, {
                  ...paramProperty,
                  value: { low: u256.low, high: u256.high },
                });
              } else {
                // object without 'low' & 'high'
                errorU256(abiParam.name);
              }
            } else {
              // BigNumberish --> just copy
              copyProperty2struct();
            }
          }
          break;
        case isTypeTuple(abiParam.type):
          Object.defineProperty(newObj, abiParam.name, {
            ...paramProperty,
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            value: orderTuple(myObj[abiParam.name] as RawArgsObject, abiParam),
          });

          break;
        case isTypeArray(abiParam.type):
          Object.defineProperty(newObj, abiParam.name, {
            ...paramProperty,
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            value: orderArray(myObj[abiParam.name] as Array<any>, abiParam),
          });

          break;
        case !isCairo1Type(abiParam.type) && isLen(abiParam.name):
          // Cairo 0 array_len. Nothing to do, go to next abi item
          break;
        default: // do not needs recursion --> just copy
          copyProperty2struct();
      }
      return newObj;
    }, {});
    return newObj2;
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
            errorU256(abiParam.name);
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

  const orderTuple = (myObj: RawArgsObject, abiParam: AbiEntry): object => {
    const paramProperty = { enumerable: true };
    const typeList = extractTupleMemberTypes(abiParam.type);
    const newObj2 = typeList.reduce((newObj: object, abiTypeCairoX: any, index) => {
      const myObjKeys: string[] = Object.keys(myObj);
      const copyProperty2Tuple = () =>
        Object.defineProperty(newObj, index.toString(), {
          ...paramProperty,
          value: myObj[myObjKeys[index]],
        });
      const abiType: string = abiTypeCairoX?.type ? abiTypeCairoX.type : abiTypeCairoX; // Named tuple, or tuple

      switch (true) {
        case isTypeStruct(abiType, structs):
          Object.defineProperty(newObj, index.toString(), {
            ...paramProperty,
            value: orderStruct(myObj[myObjKeys[index]] as RawArgsObject, structs[abiType].members),
          });
          break;
        case isTypeUint256(abiType):
          {
            const u256 = myObj[myObjKeys[index]];
            if (typeof u256 === 'object') {
              if ('low' in u256 && 'high' in u256) {
                Object.defineProperty(newObj, index.toString(), {
                  ...paramProperty,
                  value: { low: u256.low, high: u256.high },
                });
              } else {
                // object without 'low' & 'high'
                errorU256(abiParam.name);
              }
            } else {
              // BigNumberish --> just copy
              copyProperty2Tuple();
            }
          }
          break;
        case isTypeTuple(abiType):
          Object.defineProperty(newObj, index.toString(), {
            ...paramProperty,
            value: orderTuple(myObj[myObjKeys[index]] as RawArgsObject, {
              name: '0',
              type: abiType,
            }),
          });
          break;
        case isTypeArray(abiType):
          Object.defineProperty(newObj, index.toString(), {
            ...paramProperty,
            value: orderArray(myObj[myObjKeys[index]] as Array<any>, {
              name: '0',
              type: abiType,
            }),
          });
          break;
        default: // litterals, do not needs recursion --> just copy
          copyProperty2Tuple();
      }
      return newObj;
    }, {});
    return newObj2;
  };
  return orderStruct(myInputObj, abiOfObject);
}
