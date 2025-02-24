/** Implementation for RPC 0.8 */

import { ResourceBoundsOverheadRPC08 } from '../../provider/types/spec.type';
import { RPCSPEC08 } from '../../types/api';
import { addPercent, toHex } from '../num';

export function estimateFeeToBounds(
  estimate: RPCSPEC08.FeeEstimate,
  overhead: ResourceBoundsOverheadRPC08
): RPCSPEC08.ResourceBounds {
  return {
    l2_gas: {
      max_amount: toHex(addPercent(estimate.l2_gas_consumed, overhead.l2_gas.max_amount)),
      max_price_per_unit: toHex(
        addPercent(estimate.l2_gas_price, overhead.l2_gas.max_price_per_unit)
      ),
    },
    l1_gas: {
      max_amount: toHex(addPercent(estimate.l1_gas_consumed, overhead.l1_gas.max_amount)),
      max_price_per_unit: toHex(
        addPercent(estimate.l1_gas_price, overhead.l1_gas.max_price_per_unit)
      ),
    },
    l1_data_gas: {
      max_amount: toHex(addPercent(estimate.l1_data_gas_consumed, overhead.l1_data_gas.max_amount)),
      max_price_per_unit: toHex(
        addPercent(estimate.l1_data_gas_price, overhead.l1_data_gas.max_price_per_unit)
      ),
    },
  };
}
