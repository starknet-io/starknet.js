import {
  ACCOUNT_DEPLOYMENT_DATA,
  ADDRESS,
  CALL,
  OUTSIDE_EXECUTION_TYPED_DATA,
  SIGNATURE,
  TIME_BOUNDS,
  TOKEN_DATA,
} from './components';
import * as Errors from './errors';
import { BuildTypedDataResponse, ExecuteResponse } from './nonspec';

type ReadMethods = {
  // Returns the status of the paymaster service
  paymaster_isAvailable: {
    params: [];
    result: boolean;
  };

  // Receives the array of calls that the user wishes to make, along with token data. Returns a typed object for the user to sign and, optionally, data about token amount and rate
  paymaster_buildTypedData: {
    params: {
      user_address: ADDRESS;
      deployment_data?: ACCOUNT_DEPLOYMENT_DATA;
      calls: CALL[];
      time_bounds?: TIME_BOUNDS;
      gas_token_address?: ADDRESS;
    };
    result: BuildTypedDataResponse;
    errors:
      | Errors.INVALID_ADDRESS
      | Errors.CLASS_HASH_NOT_SUPPORTED
      | Errors.INVALID_DEPLOYMENT_DATA
      | Errors.TOKEN_NOT_SUPPORTED
      | Errors.INVALID_TIME_BOUNDS
      | Errors.UNKNOWN_ERROR;
  };

  // Get a list of the tokens that the paymaster supports, together with their prices in STRK
  paymaster_getSupportedTokensAndPrices: {
    params: {};
    result: TOKEN_DATA[];
  };
};

type WriteMethods = {
  // Sends the signed typed data to the paymaster service for execution
  paymaster_execute: {
    params: {
      user_address: ADDRESS;
      deployment_data?: ACCOUNT_DEPLOYMENT_DATA;
      typed_data: OUTSIDE_EXECUTION_TYPED_DATA;
      signature: SIGNATURE;
    };
    result: ExecuteResponse;
    errors:
      | Errors.INVALID_ADDRESS
      | Errors.CLASS_HASH_NOT_SUPPORTED
      | Errors.INVALID_DEPLOYMENT_DATA
      | Errors.INVALID_SIGNATURE
      | Errors.UNKNOWN_ERROR
      | Errors.MAX_AMOUNT_TOO_LOW
      | Errors.TRANSACTION_EXECUTION_ERROR;
  };
};

export type Methods = ReadMethods & WriteMethods;
