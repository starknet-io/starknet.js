import { Account, CallData, Contract, SequencerProvider, cairo, ec, hash, stark } from '../src';
import { tuple } from '../src/utils/calldata/cairo';
import { toBigInt } from '../src/utils/num';
import { decodeShortString } from '../src/utils/shortString';
import { bnToUint256 } from '../src/utils/uint256';
import {
  compiledC1Account,
  compiledC1AccountCasm,
  compiledHelloSierra,
  compiledHelloSierraCasm,
  describeIfDevnetSequencer,
  describeIfSequencerTestnet2,
  getTestAccount,
  getTestProvider,
} from './fixtures';
import { initializeMatcher } from './schema';

// Testnet will not accept declare v2 with same compiledClassHash,
// aka. we can't redeclare same contract
describeIfDevnetSequencer('Cairo 1 Devnet Sequencer', () => {
  describe('Sequencer API &  Contract interactions', () => {
    const provider = getTestProvider() as SequencerProvider;
    const account = getTestAccount(provider);
    let classHash: any; // = '0x2daf503eec96f469b6069b3294be67ef7ffc1dce89c09535d400550d884e82e';
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

    test('deployContract Cairo 1 with false cairoVersion UDC parameter', async () => {
      const deploy = await account.deployContract(
        {
          classHash,
        },
        { cairoVersion: '1' }
      );
      expect(deploy).toHaveProperty('address');
    });

    test('getCompiledClassByClassHash', async () => {
      const compiledClass = await provider.getCompiledClassByClassHash(classHash);
      expect(compiledClass).toMatchSchemaRef('CompiledClass');
    });

    test('GetClassByHash', async () => {
      const classResponse = await provider.getClassByHash(classHash);
      expect(classResponse).toMatchSchemaRef('SierraContractClass');
    });

    test('GetClassAt', async () => {
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
        parseResponse: false,
      });

      expect(toBigInt(balance[0])).toBe(100n);
    });

    test('Cairo 1 Contract Interaction - felt252', async () => {
      const tx = await cairo1Contract.increase_balance(100);
      await account.waitForTransaction(tx.transaction_hash);
      const balance = await cairo1Contract.get_balance();
      expect(balance).toBe(200n);
    });

    test('Cairo 1 Contract Interaction - uint 8, 16, 32, 64, 128', async () => {
      const tx = await cairo1Contract.increase_balance_u8(255n);
      await account.waitForTransaction(tx.transaction_hash);
      const balance = await cairo1Contract.get_balance_u8();
      expect(balance).toBe(255n);

      let result = await cairo1Contract.test_u16(255n);
      expect(result).toBe(256n);
      result = await cairo1Contract.test_u32(255n);
      expect(result).toBe(256n);
      result = await cairo1Contract.test_u64(255n);
      expect(result).toBe(256n);
      result = await cairo1Contract.test_u128(255n);
      expect(result).toBe(256n);
    });

    test('Cairo 1 - uint256', async () => {
      const result = await cairo1Contract.test_u256(2n ** 256n - 2n);
      expect(result).toBe(2n ** 256n - 1n);
    });

    test('Cairo 1 Contract Interaction - bool', async () => {
      const cdata = CallData.compile({ false: false, true: true });
      expect(cdata).toEqual(['0', '1']);

      let tx = await cairo1Contract.set_status(true);
      await account.waitForTransaction(tx.transaction_hash);
      let status = await cairo1Contract.get_status();

      expect(status).toBe(true);

      tx = await cairo1Contract.set_status(false);
      await account.waitForTransaction(tx.transaction_hash);
      status = await cairo1Contract.get_status();

      expect(status).toBe(false);

      tx = await cairo1Contract.set_status(true);
      await account.waitForTransaction(tx.transaction_hash);
      status = await cairo1Contract.get_status();

      expect(status).toBe(true);
    });

    test('Cairo 1 Contract Interaction - ContractAddress', async () => {
      const tx = await cairo1Contract.set_ca('123');
      await account.waitForTransaction(tx.transaction_hash);
      const status = await cairo1Contract.get_ca();

      expect(status).toBe(123n);
    });

    test('Cairo 1 Contract Interaction - echo flat un-named un-nested tuple', async () => {
      const status = await cairo1Contract.echo_un_tuple(tuple(77, 123));
      expect(Object.values(status)).toEqual([77n, 123n]);
    });

    test('Cairo 1 Contract Interaction - echo flat un-nested Array u8, uint256, bool', async () => {
      const status = await cairo1Contract.echo_array([123, 55, 77, 255]);
      expect(status).toEqual([123n, 55n, 77n, 255n]);

      const status1 = await cairo1Contract.echo_array_u256([123, 55, 77, 255]);
      expect(status1).toEqual([123n, 55n, 77n, 255n]);

      const status2 = await cairo1Contract.echo_array_bool([true, true, false, false]);
      expect(status2).toEqual([true, true, false, false]);
    });

    test('Cairo 1 Contract Interaction - echo flat un-nested Struct', async () => {
      const status = await cairo1Contract.echo_struct({
        val: 'simple',
      });
      expect(decodeShortString(status.val)).toBe('simple');
    });

    test('Cairo 1 more complex structs', async () => {
      const tx = await cairo1Contract.set_bet();
      await account.waitForTransaction(tx.transaction_hash);
      const status = await cairo1Contract.get_bet(1, {
        formatResponse: { name: 'string', description: 'string' },
      });

      const expected = {
        name: 'test',
        description: 'dec',
        expire_date: 1n,
        creation_time: 1n,
        creator: 3562055384976875123115280411327378123839557441680670463096306030682092229914n,
        is_cancelled: false,
        is_voted: false,
        bettor: {
          address: 3562055384976875123115280411327378123839557441680670463096306030682092229914n,
          is_claimed: false,
        },
        counter_bettor: {
          address: 3562055384976875123115280411327378123839557441680670463096306030682092229914n,
          is_claimed: false,
        },
        winner: false,
        pool: 10n,
        amount: 1000n,
      };
      expect(expected).toEqual(status);
    });
  });

  describe('Cairo1 Account contract', () => {
    const provider = getTestProvider() as SequencerProvider;
    const account = getTestAccount(provider);
    let accountC1: Account;

    beforeAll(async () => {
      // Deploy Cairo 1 Account
      const priKey = stark.randomAddress();
      const pubKey = ec.starkCurve.getStarkKey(priKey);

      const calldata = { publicKey: pubKey };

      // declare account
      const declareAccount = await account.declare({
        contract: compiledC1Account,
        casm: compiledC1AccountCasm,
      });
      await account.waitForTransaction(declareAccount.transaction_hash);
      const accountClassHash = declareAccount.class_hash;

      // fund new account
      const toBeAccountAddress = hash.calculateContractAddressFromHash(
        pubKey,
        accountClassHash,
        calldata,
        0
      );
      const devnetERC20Address =
        '0x49D36570D4E46F48E99674BD3FCC84644DDD6B96F7C741B1562B82F9E004DC7';
      const { transaction_hash } = await account.execute({
        contractAddress: devnetERC20Address,
        entrypoint: 'transfer',
        calldata: {
          recipient: toBeAccountAddress,
          amount: cairo.uint256(1_000_000_000_000_000),
        },
      });
      await account.waitForTransaction(transaction_hash);

      // deploy account
      accountC1 = new Account(provider, toBeAccountAddress, priKey);
      const deployed = await accountC1.deploySelf({
        classHash: accountClassHash,
        constructorCalldata: calldata,
        addressSalt: pubKey,
      });
      const receipt = await account.waitForTransaction(deployed.transaction_hash);
      expect(receipt).toMatchSchemaRef('GetTransactionReceiptResponse');
    });

    test('deploy Cairo1 Account from Cairo0 Account', () => {
      expect(accountC1 instanceof Account);
    });
  });
});

describeIfSequencerTestnet2('Cairo1 Testnet2', () => {
  describe('Sequencer API', () => {
    const provider = getTestProvider() as SequencerProvider;
    const account = getTestAccount(provider);
    const classHash: any = '0x028b6f2ee9ae00d55a32072d939a55a6eb522974a283880f3c73a64c2f9fd6d6';
    const contractAddress: any =
      '0x771bbe2ba64fa5ab52f0c142b4296fc67460a3a2372b4cdce752c620e3e8194';
    let cairo1Contract: Contract;
    initializeMatcher(expect);

    beforeAll(async () => {
      const cairoClass = await provider.getClassByHash(classHash);
      cairo1Contract = new Contract(cairoClass.abi, contractAddress, account);
    });

    test('getCompiledClassByClassHash', async () => {
      const compiledClass = await provider.getCompiledClassByClassHash(classHash);
      expect(compiledClass).toMatchSchemaRef('CompiledClass');
    });

    test('GetClassByHash', async () => {
      const classResponse = await provider.getClassByHash(classHash);
      expect(classResponse).toMatchSchemaRef('SierraContractClass');
    });

    test('GetClassAt', async () => {
      const classResponse = await provider.getClassAt(contractAddress);
      expect(classResponse).toMatchSchemaRef('SierraContractClass');
    });

    test('Cairo 1 Contract Interaction - felt252', async () => {
      const result = await cairo1Contract.test_felt252(100);
      expect(result).toBe(101n);
    });

    test('Cairo 1 Contract Interaction - uint 8, 16, 32, 64, 128', async () => {
      let result = await cairo1Contract.test_u8(100n);
      expect(result).toBe(107n);
      result = await cairo1Contract.test_u16(100n);
      expect(result).toBe(106n);
      result = await cairo1Contract.test_u32(100n);
      expect(result).toBe(104n);
      result = await cairo1Contract.test_u64(255n);
      expect(result).toBe(258n);
      result = await cairo1Contract.test_u128(255n);
      expect(result).toBe(257n);
    });

    test('Cairo 1 - uint256 struct', async () => {
      const myUint256 = bnToUint256(2n ** 256n - 2n);
      const result = await cairo1Contract.test_u256(myUint256);
      expect(result).toBe(2n ** 256n - 1n);
    });

    test('Cairo 1 - uint256 by a bignumber', async () => {
      const result = await cairo1Contract.test_u256(2n ** 256n - 2n);
      expect(result).toBe(2n ** 256n - 1n);
    });

    test('Cairo 1 Contract Interaction - bool', async () => {
      const tx = await cairo1Contract.test_bool();
      expect(tx).toBe(true);
    });
  });
});
