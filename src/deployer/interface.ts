import type {
  BigNumberish,
  DeployContractDCResponse,
  InvokeTransactionReceiptResponse,
  UniversalDeployerContractPayload,
} from '../types/index';
import type { DeployerCall } from './types/index.type';

export abstract class DeployerInterface {
  /** address of the deployer contract */
  abstract readonly address: BigNumberish;

  /** ascii name of the function that deploy a contract */
  abstract readonly entryPoint: string;

  /**
   * Build a Deployer Call with payload and address
   * @param {UniversalDeployerContractPayload | UniversalDeployerContractPayload[]} payload the payload data for the deployer Call. Can be a single payload object or an array of payload objects.
   * @param {string} address the address to be used in the deployer Call
   * @returns {DeployerCall} an object with Calls & addresses
   */
  public abstract buildDeployerCall(
    payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[],
    address: string
  ): DeployerCall;

  /**
   * Parse Transaction Receipt Event from a Deployer contract transaction and
   * create DeployContractResponse compatible response with addition of the Deployer Event data
   * @param {InvokeTransactionReceiptResponse} txReceipt Transaction receipt
   * @param {DeployerDefinition} deployer Deployer contract definition
   *
   * @returns {DeployContractDCResponse} parsed Deployer event data
   */
  public abstract parseDeployerEvent(
    txReceipt: InvokeTransactionReceiptResponse
  ): DeployContractDCResponse;
}
