import { Calldata, Signature } from '../types';
import { OutsideExecution } from '../types/outsideExecution';
import { CallData } from './calldata';
import { formatSignature } from './stark';

// Builds a CallData for the execute_from_outside() entrypoint.
export function buildExecuteFromOutsideCallData(
  outsideExecution: OutsideExecution,
  signature: Signature
): Calldata {
  const abiData = outsideExecution.getABIData();
  const formattedSignature = formatSignature(signature);
  return CallData.compile({
    outside_execution: abiData, // TODO we should encode it field by field most likely
    signature: formattedSignature,
  });
}
