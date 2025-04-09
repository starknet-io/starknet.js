export interface INVALID_ADDRESS {
  code: 150;
  message: 'An error occurred (INVALID_ADDRESS)';
}
export interface TOKEN_NOT_SUPPORTED {
  code: 151;
  message: 'An error occurred (TOKEN_NOT_SUPPORTED)';
}
export interface INVALID_SIGNATURE {
  code: 153;
  message: 'An error occurred (INVALID_SIGNATURE)';
}
export interface MAX_AMOUNT_TOO_LOW {
  code: 154;
  message: 'An error occurred (MAX_AMOUNT_TOO_LOW)';
}
export interface CLASS_HASH_NOT_SUPPORTED {
  code: 155;
  message: 'An error occurred (CLASS_HASH_NOT_SUPPORTED)';
}
export interface TRANSACTION_EXECUTION_ERROR {
  code: 156;
  message: 'An error occurred (TRANSACTION_EXECUTION_ERROR)';
  data: ContractExecutionError;
}
export interface DetailedContractExecutionError {
  contract_address: string;
  class_hash: string;
  selector: string;
  error: ContractExecutionError;
}
export type SimpleContractExecutionError = string;
export type ContractExecutionError = DetailedContractExecutionError | SimpleContractExecutionError;
export interface INVALID_TIME_BOUNDS {
  code: 157;
  message: 'An error occurred (INVALID_TIME_BOUNDS)';
}
export interface INVALID_DEPLOYMENT_DATA {
  code: 158;
  message: 'An error occurred (INVALID_DEPLOYMENT_DATA)';
}
export interface INVALID_CLASS_HASH {
  code: 159;
  message: 'An error occurred (INVALID_CLASS_HASH)';
}
export interface INVALID_ID {
  code: 160;
  message: 'An error occurred (INVALID_ID)';
}
export interface UNKNOWN_ERROR {
  code: 163;
  message: 'An error occurred (UNKNOWN_ERROR)';
  data: string;
}
