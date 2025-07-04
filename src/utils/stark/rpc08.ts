/** Implementation for RPC 0.8 */

import { ResourceBoundsOverheadRPC08 } from '../../provider/types/spec.type';
import type { EstimateFee, FeeEstimate, ResourceBounds } from '../../types';
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

/**
 * Define the fee resource bounds from the result of an `estimateFee` function.
 * - Without `pricePercentage`: `percentage` is applied everywhere (prices and max_amount).
 * - With `pricePercentage`: `percentage` is applied on `max_amount` parameters,
 * and `pricePercentage` is applied on `price` parameters.
 * @param {EstimateFee} estimate - The result of an estimateFee function.
 * @param {number} percentage 50 means +50%, 0 means unchanged, -50 means -50%. TIP: `pricePercentage` can be low: 10-20%.
 * @param {number} pricePercentage 50 means +50%, 0 means unchanged, -50 means -50%. TIP: `percentage` needs to be much higher if you use an exotic signature.
 * @returns {ResourceBounds} Can be used in any function using `UniversalDetails`
 * @example
 * ```ts
 * const estimate = await account0.estimateInvokeFee(myCall);
 * const resourceBounds = stark.setResourceBounds(estimate, 40, 10);
 * const response = await account0.execute(myCall, { resourceBounds });
 * // resourceBounds = estimated max amounts increased by 40%, and estimated max prices increased by 10%.
 * // resourceBounds = {
 * //  l2_gas: { max_amount: '0x29a00c', max_price_per_unit: '0x22974a9c4' },
 * //  l1_gas: { max_amount: '0x0', max_price_per_unit: '0x412f1029cc9d' },
 * //  l1_data_gas: { max_amount: '0x180', max_price_per_unit: '0xd0e' }
 * // }
 * ```
 */
export function setResourceBounds(
  estimate: EstimateFee,
  percentage: number,
  pricePercentage?: number
): ResourceBounds {
  const fe: FeeEstimate = {
    l1_data_gas_consumed: Number(estimate.l1_data_gas_consumed),
    l1_data_gas_price: Number(estimate.l1_data_gas_price),
    l1_gas_consumed: Number(estimate.l1_gas_consumed),
    l1_gas_price: Number(estimate.l1_gas_price),
    l2_gas_consumed: Number(estimate.l2_gas_consumed),
    l2_gas_price: Number(estimate.l2_gas_price),
    overall_fee: Number(estimate.overall_fee),
    unit: estimate.unit,
  };
  const overHead: ResourceBoundsOverheadRPC08 = {
    l1_data_gas: { max_amount: percentage, max_price_per_unit: pricePercentage ?? percentage },
    l1_gas: { max_amount: percentage, max_price_per_unit: pricePercentage ?? percentage },
    l2_gas: { max_amount: percentage, max_price_per_unit: pricePercentage ?? percentage },
  };
  return estimateFeeToBounds(fe, overHead);
}
