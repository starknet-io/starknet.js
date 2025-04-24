import {
  USER_TRANSACTION,
  TOKEN_DATA,
  EXECUTION_PARAMETERS,
  EXECUTABLE_USER_TRANSACTION,
} from './components';
import * as Errors from './errors';
import { BuildTransactionResponse, ExecuteResponse } from './nonspec';

type ReadMethods = {
  // Returns the status of the paymaster service
  paymaster_isAvailable: {
    params: [];
    result: boolean;
  };

  // Receives the transaction the user wants to execute. Returns the typed data along with the estimated gas cost and the maximum gas cost suggested to ensure execution
  paymaster_buildTransaction: {
    params: {
      transaction: USER_TRANSACTION;
      parameters: EXECUTION_PARAMETERS;
    };
    result: BuildTransactionResponse;
    errors:
      | Errors.INVALID_ADDRESS
      | Errors.CLASS_HASH_NOT_SUPPORTED
      | Errors.INVALID_DEPLOYMENT_DATA
      | Errors.TOKEN_NOT_SUPPORTED
      | Errors.INVALID_TIME_BOUNDS
      | Errors.UNKNOWN_ERROR
      | Errors.TRANSACTION_EXECUTION_ERROR;
  };

  // Get a list of the tokens that the paymaster supports, together with their prices in STRK
  paymaster_getSupportedTokens: {
    params: {};
    result: TOKEN_DATA[];
  };
};

type WriteMethods = {
  // Sends the signed typed data to the paymaster service for execution
  paymaster_executeTransaction: {
    params: {
      transaction: EXECUTABLE_USER_TRANSACTION;
      parameters: EXECUTION_PARAMETERS;
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
