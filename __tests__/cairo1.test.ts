import { CallData, Contract, SequencerProvider } from '../src';
import { toBigInt } from '../src/utils/num';
import {
  compiledHelloSierra,
  compiledHelloSierraCasm,
  describeIfDevnetSequencer,
  getTestAccount,
  getTestProvider,
} from './fixtures';
import { initializeMatcher } from './schema';

// Testnet will not accept declare v2 with same compiledClassHash,
// aka. we can't redeclare same contract
describeIfDevnetSequencer('Cairo 1', () => {
  describe('Sequencer API', () => {
    const provider = getTestProvider() as SequencerProvider;
    const account = getTestAccount(provider);
    let classHash: any;
    let contractAddress: any;
    let declareV2Tx: any;
    let cairo1Contract: Contract;
    initializeMatcher(expect);

    beforeAll(async () => {
      declareV2Tx = await account.declare({
        contract: compiledHelloSierra,
        casm: compiledHelloSierraCasm,
      });
      classHash = declareV2Tx.class_hash;
      await provider.waitForTransaction(declareV2Tx.transaction_hash);
      const { transaction_hash, contract_address } = await account.deploy({ classHash });
      [contractAddress] = contract_address;
      await provider.waitForTransaction(transaction_hash);

      cairo1Contract = new Contract(compiledHelloSierra.abi, contractAddress, account);
    });

    test('Declare v2 - Hello Cairo 1 contract', async () => {
      expect(declareV2Tx).toMatchSchemaRef('DeclareContractResponse');
    });

    xtest('declareAndDeploy Cairo 1', async () => {
      // Can't test due to redeployment not allowed
      await account.declareAndDeploy({
        contract: compiledHelloSierra,
        casm: compiledHelloSierraCasm,
      });
    });

    test('getCompiledClassByClassHash', async () => {
      const compiledClass = await provider.getCompiledClassByClassHash(classHash);
      expect(compiledClass).toMatchSchemaRef('CompiledClass');
    });

    test('GetClassByHash', async () => {
      const classResponse = await provider.getClassByHash(classHash);
      expect(classResponse).toMatchSchemaRef('SierraContractClass');
    });

    xtest('GetClassAt', async () => {
      const classResponse = await provider.getClassAt(contractAddress);
      expect(classResponse).toMatchSchemaRef('SierraContractClass');
    });

    test('Cairo 1 Contract Interaction - skip invoke validation & call parsing', async () => {
      const tx = await cairo1Contract.increase_balance(
        CallData.compile({
          amount: 100,
        })
      );
      await account.waitForTransaction(tx.transaction_hash);

      const balance = await cairo1Contract.get_balance({
        parseRequest: false,
        parseResponse: false,
      });

      expect(toBigInt(balance[0])).toBe(100n);
    });

    test('Cairo 1 Contract Interaction - felt252', async () => {
      const tx = await cairo1Contract.increase_balance(100);
      await account.waitForTransaction(tx.transaction_hash);
      const balance = await cairo1Contract.get_balance();
      expect(toBigInt(balance[0])).toBe(200n);
    });

    test('Cairo 1 Contract Interaction - uint', async () => {
      const tx = await cairo1Contract.increase_balance_u8(255);
      await account.waitForTransaction(tx.transaction_hash);
      const balance = await cairo1Contract.get_balance_u8();
      expect(toBigInt(balance[0])).toBe(255n);
    });

    test('Cairo 1 Contract Interaction - bool', async () => {
      let tx = await cairo1Contract.set_status(true);
      await account.waitForTransaction(tx.transaction_hash);
      let status = await cairo1Contract.get_status();

      expect(status[0]).toBe(true);

      tx = await cairo1Contract.set_status(false);
      await account.waitForTransaction(tx.transaction_hash);
      status = await cairo1Contract.get_status();

      expect(status[0]).toBe(false);

      tx = await cairo1Contract.set_status(true);
      await account.waitForTransaction(tx.transaction_hash);
      status = await cairo1Contract.get_status();

      expect(status[0]).toBe(true);
    });
  });
});
