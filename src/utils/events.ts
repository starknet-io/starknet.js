import { UDC } from '../constants';
import { InvokeTransactionReceiptResponse } from '../types/provider';
import { cleanHex } from './number';

/**
 * Parse Transaction Receipt Event from UDC invoke transaction and
 * create DeployContractResponse compatibile response with adition of UDC Event data
 *
 * @param txReceipt
 * @returns DeployContractResponse | UDC Event Response data
 */
export function parseUDCEvent(txReceipt: InvokeTransactionReceiptResponse) {
  if (!txReceipt.events) {
    throw new Error('UDC emited event is empty');
  }
  const event = txReceipt.events.find(
    (it) => cleanHex(it.from_address) === cleanHex(UDC.ADDRESS)
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
