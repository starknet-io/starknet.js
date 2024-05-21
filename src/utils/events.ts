import { UDC } from '../constants';
import { InvokeTransactionReceiptResponse } from '../types/provider';
import { cleanHex } from './num';

/**
 * Parse Transaction Receipt Event from UDC invoke transaction and
 * create DeployContractResponse compatible response with addition of the UDC Event data
 *
 * @param {InvokeTransactionReceiptResponse} txReceipt
 * @return {object} Object including DeployContractResponse and UDC Event data
 * @example
 * ```typescript
 * const deployment = await account.deploy({
 *   classHash,
 *   constructorCalldata: [
 *     encodeShortString('Token'),
 *     encodeShortString('ERC20'),
 *     account.address,
 *   ],
 *   salt,
 *   unique: true,
 * });
 * const txReceipt = await provider.waitForTransaction(deployment.transaction_hash);
 * const udcEvent = parseUDCEvent(txReceipt as any);
 * ```
 */
export function parseUDCEvent(txReceipt: InvokeTransactionReceiptResponse) {
  if (!txReceipt.events) {
    throw new Error('UDC emitted event is empty');
  }
  const event = txReceipt.events.find(
    (it: any) => cleanHex(it.from_address) === cleanHex(UDC.ADDRESS)
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
