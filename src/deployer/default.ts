import { UDC } from '../global/constants';
import {
  ValidateType,
  type BigNumberish,
  type DeployContractUDCResponse,
  type InvokeTransactionReceiptResponse,
  type UniversalDeployerContractPayload,
} from '../types';
import { CallData } from '../utils/calldata';
import { starkCurve } from '../utils/ec';
import { calculateContractAddressFromHash } from '../utils/hash';
import { toCairoBool, toHex } from '../utils/num';
import { randomAddress } from '../utils/stark';
import { getCompiledCalldata } from '../utils/transaction/getCompiledCalldata';
import type { DeployerInterface } from './interface';
import type { DeployerCall } from './types/index.type';

export class Deployer implements DeployerInterface {
  public readonly address: BigNumberish;

  public readonly entryPoint: string;

  constructor(address?: BigNumberish, entryPoint?: string) {
    this.address = address ?? UDC.ADDRESS;
    this.entryPoint = entryPoint ?? UDC.ENTRYPOINT;
  }

  public buildDeployerCall(
    payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[],
    address: string
  ): DeployerCall {
    const params = [].concat(payload as []).map((it) => {
      const {
        classHash,
        salt,
        unique = true, // not_from_zero on v.2.0.0 but same function. When false v.1 address != v.2 address
        constructorCalldata = [],
        abi,
      } = it as UniversalDeployerContractPayload;

      const compiledConstructorCallData = getCompiledCalldata(constructorCalldata, () => {
        // compile with abi
        if (abi) {
          const calldataClass = new CallData(abi);
          // Array-shaped calldata is already positional: validate its length up front.
          // Object-shaped calldata must keep its field names until `compile()`, which
          // orders them by ABI name — flattening here first would make that ordering
          // depend on JS insertion order instead.
          if (Array.isArray(constructorCalldata)) {
            calldataClass.validate(ValidateType.DEPLOY, 'constructor', constructorCalldata);
          }
          return calldataClass.compile('constructor', constructorCalldata);
        }
        // compile without abi
        return CallData.compile(constructorCalldata);
      });

      const deploySalt = salt ?? randomAddress();

      return {
        call: {
          contractAddress: toHex(this.address),
          entrypoint: this.entryPoint,
          calldata: [
            classHash,
            deploySalt,
            toCairoBool(unique),
            compiledConstructorCallData.length,
            ...compiledConstructorCallData,
          ],
        },
        address: calculateContractAddressFromHash(
          unique ? starkCurve.pedersen(address, deploySalt) : deploySalt,
          classHash,
          compiledConstructorCallData,
          unique ? this.address : 0
        ),
      };
    });

    return {
      calls: params.map((it) => it.call),
      addresses: params.map((it) => it.address),
    };
  }

  public parseDeployerEvent(
    txReceipt: InvokeTransactionReceiptResponse
  ): DeployContractUDCResponse {
    if (!txReceipt.events?.length) {
      throw new Error('Deployer emitted event is empty');
    }
    const event = txReceipt.events.find(
      (it: any) => toHex(it.from_address) === toHex(this.address)
    ) || {
      data: [],
    };
    return {
      transaction_hash: txReceipt.transaction_hash,
      contract_address: event.data[0],
      address: event.data[0],
      deployer: event.data[1],
      unique: event.data[2],
      classHash: event.data[3],
      calldata_len: event.data[4],
      calldata: event.data.slice(5, 5 + parseInt(event.data[4], 16)),
      salt: event.data[event.data.length - 1],
    };
  }
}
