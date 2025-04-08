/**
 * Types that are not in spec but required for UX
 */
import {
  ACCOUNT_DEPLOYMENT_DATA,
  OUTSIDE_EXECUTION_TYPED_DATA,
  TIME_BOUNDS,
  TRACKING_ID,
  TRANSACTION_HASH,
  u256,
} from './components';

// METHOD RESPONSES
// response paymaster_buildTypedData
export type BuildTypedDataResponse = {
  typed_data: OUTSIDE_EXECUTION_TYPED_DATA;
  token_amount_and_price: {
    estimated_amount: u256;
    price_in_strk: u256;
  };
};
// response paymaster_execute
export type ExecuteResponse = {
  tracking_id: TRACKING_ID;
  transaction_hash: TRANSACTION_HASH;
};

export type AccountDeploymentData = ACCOUNT_DEPLOYMENT_DATA;
export type OutsideExecutionTypedData = OUTSIDE_EXECUTION_TYPED_DATA;
export type TimeBounds = TIME_BOUNDS;
