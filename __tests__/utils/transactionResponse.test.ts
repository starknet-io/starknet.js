import {
  Call,
  Contract,
  DeclareDeployUDCResponse,
  RevertedTransactionReceiptResponse,
  SuccessfulTransactionReceiptResponse,
  TransactionExecutionStatus,
  transactionResponse,
} from '../../src';
import {
  compiledTestRejectCasm,
  compiledTestRejectSierra,
  getTestAccount,
  getTestProvider,
} from '../fixtures';

describe('transactionResponse', () => {
  const provider = getTestProvider();
  const account = getTestAccount(provider);
  describe('TxResponse', () => {
    let dd: DeclareDeployUDCResponse;
    let contract: Contract;

    beforeAll(async () => {
      dd = await account.declareAndDeploy({
        contract: compiledTestRejectSierra,
        casm: compiledTestRejectCasm,
      });
      await provider.waitForTransaction(dd.deploy.transaction_hash);
      contract = new Contract(compiledTestRejectSierra.abi, dd.deploy.contract_address, account);
      contract.connect(account);
    });

    test('test for Success variant', async () => {
      const myCall: Call = contract.populate('test_fail', { p1: 100 });
      const res = await account.execute(myCall, undefined, { maxFee: 1 * 10 ** 15 }); // maxFee needed to not throw error in getEstimateFee
      const transacReceipt = await provider.waitForTransaction(res.transaction_hash);
      const txR = transactionResponse(transacReceipt);
      expect(
        'execution_status' in txR.content &&
          txR.content.execution_status === TransactionExecutionStatus.SUCCEEDED
      ).toBe(true);
      expect(txR.status).toBe('Success');
      expect(txR.isSuccess()).toBe(true);
      expect(txR.isRejected()).toBe(false);
      expect(txR.isReverted()).toBe(false);
      expect(txR.isError()).toBe(false);
      let isSuccess: boolean = false;
      txR.match({
        Success: (_resp: SuccessfulTransactionReceiptResponse) => {
          isSuccess = true;
        },
        _: () => {
          isSuccess = false;
        },
      });
      expect(isSuccess).toBe(true);
    });

    test('test for Reverted variant', async () => {
      const myCall: Call = contract.populate('test_fail', { p1: 10 }); // reverted if not 100
      const res = await account.execute(myCall, undefined, { maxFee: 1 * 10 ** 15 }); // maxFee needed to not throw error in getEstimateFee
      const txReceipt = await provider.waitForTransaction(res.transaction_hash);
      const txR = transactionResponse(txReceipt);
      expect(
        'execution_status' in txR.content &&
          txR.content.execution_status === TransactionExecutionStatus.REVERTED
      ).toBe(true);
      expect(txR.status).toBe('Reverted');
      expect(txR.isSuccess()).toBe(false);
      expect(txR.isRejected()).toBe(false);
      expect(txR.isReverted()).toBe(true);
      expect(txR.isError()).toBe(false);
      let isReverted: boolean = false;
      txR.match({
        Reverted: (_resp: RevertedTransactionReceiptResponse) => {
          isReverted = true;
        },
        _: () => {
          isReverted = false;
        },
      });
      expect(isReverted).toBe(true);
    });
    // no rejected test : impossible to trigger a 'rejected' from a node/devnet.
    // no declare test due to slow process (result is very similar to Invoke).
    test('test for deploy Success variant', async () => {
      const res = await account.deployContract(
        { classHash: dd.declare.class_hash },
        { maxFee: 1 * 10 ** 15 }
      ); // maxFee needed to not throw error in getEstimateFee
      const txReceipt = await provider.waitForTransaction(res.transaction_hash);
      const txR = transactionResponse(txReceipt);
      expect(
        'execution_status' in txR.content &&
          txR.content.execution_status === TransactionExecutionStatus.SUCCEEDED
      ).toBe(true);
      expect(txR.status).toBe('Success');
      expect(txR.isSuccess()).toBe(true);
      expect(txR.isRejected()).toBe(false);
      expect(txR.isReverted()).toBe(false);
      expect(txR.isError()).toBe(false);
      let isSuccess: boolean = false;
      txR.match({
        Success: (_resp: SuccessfulTransactionReceiptResponse) => {
          isSuccess = true;
        },
        _: () => {
          isSuccess = false;
        },
      });
      expect(isSuccess).toBe(true);
    });
  });
});
