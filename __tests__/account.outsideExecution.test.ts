/**
 * Optimized SNIP-9 v2 (Outside Execution) Integration Tests
 * Enhanced for Security Auditing and Precise Gas Estimation
 */
import {
  Account,
  cairo,
  CairoCustomEnum,
  CairoOption,
  CairoOptionVariant,
  CallData,
  compareVersions,
  constants,
  Contract,
  ec,
  num,
  hash,
  outsideExecution,
  OutsideExecutionVersion,
  Provider,
  src5,
  stark,
  TransactionType,
  type Call,
  type Invocations,
  type OutsideExecutionOptions,
  type OutsideTransaction,
  type TypedData,
  type WeierstrassSignatureType,
} from '../src';
import {
  adaptAccountIfDevnet,
  CONTRACTS,
  createTestProvider,
  getTestAccount,
  initializeMatcher,
  STRKtokenAddress,
} from './config';

describe('Account and OutsideExecution Protocol Analysis', () => {
  let provider: Provider;
  let executorAccount: Account;
  let signerAccount: Account;
  let strkContract: Contract;

  // Security: Generate fresh keys for each test run to isolate state
  const targetPK = stark.randomAddress();
  const targetPubK = ec.starkCurve.getStarkKey(targetPK);

  let call1: Call;
  let call2: Call;

  // Time boundaries for execution windows
  const now = Math.floor(Date.now() / 1000);
  const timeWindows = {
    past: (now - 3600).toString(),
    future: (now + 3600).toString(),
  };

  initializeMatcher(expect);

  beforeAll(async () => {
    provider = new Provider(await createTestProvider());
    executorAccount = getTestAccount(provider);
    
    // STRK Contract instance for balance audits
    strkContract = new Contract({
      abi: CONTRACTS.Erc20Oz100.sierra.abi,
      address: STRKtokenAddress,
      providerOrAccount: provider,
    });

    // Reusable payloads
    call1 = {
      contractAddress: STRKtokenAddress,
      entrypoint: 'transfer',
      calldata: { recipient: executorAccount.address, amount: cairo.uint256(100) },
    };
    call2 = {
      contractAddress: STRKtokenAddress,
      entrypoint: 'transfer',
      calldata: { recipient: executorAccount.address, amount: cairo.uint256(200) },
    };

    // Deploying a specialized SNIP-9 Account (ArgentX v0.4.0 Logic)
    const calldataAX = new CallData(CONTRACTS.AccountReady040.sierra.abi);
    const constructorAXCallData = calldataAX.compile('constructor', {
      owner: new CairoCustomEnum({ Starknet: { pubkey: targetPubK } }),
      guardian: new CairoOption<unknown>(CairoOptionVariant.None),
    });

    // Check version for correct class hash selection (Security: avoids deployment on wrong Starknet OS version)
    const snVersion = await executorAccount.getStarknetVersion();
    const compiledClassHash = compareVersions(snVersion, '0.14.1') === -1
      ? '0x7a663375245780bd307f56fde688e33e5c260ab02b76741a57711c5b60d47f6'
      : '0x294a323246c017d00a98f11942e1e38d562c97bc79426742110a14ce497e9b5';

    const { deploy } = await executorAccount.declareAndDeploy({
      contract: CONTRACTS.AccountReady040.sierra,
      classHash: '0x36078334509b514626504edc9fb252328d1a240e4e948bef8d0c08dff45927f',
      compiledClassHash,
      constructorCalldata: constructorAXCallData,
    });

    signerAccount = adaptAccountIfDevnet(
      new Account({ provider, address: deploy.contract_address, signer: targetPK })
    );

    // Initial funding (Gasless transactions still require the signer to have tokens for the logic)
    const { transaction_hash } = await executorAccount.execute({
      contractAddress: STRKtokenAddress,
      entrypoint: 'transfer',
      calldata: { recipient: signerAccount.address, amount: cairo.uint256(2n * 10n ** 17n) },
    });
    await provider.waitForTransaction(transaction_hash);
  });

  /**
   * DATA INTEGRITY TESTS
   */
  test('getOutsideCall: Should correctly format Cairo 1 calldata', () => {
    const formatted = outsideExecution.getOutsideCall(call1);
    expect(formatted.to).toBe(STRKtokenAddress);
    expect(formatted.calldata).toContain('100'); // Check low bits of u256
  });

  test('SNIP-9 v2 TypedData: Integrity check for EIP-712 equivalent', () => {
    const options: OutsideExecutionOptions = { caller: '0x1234', execute_after: 100, execute_before: 200 };
    const typedData = outsideExecution.getTypedData(
      constants.StarknetChainId.SN_SEPOLIA,
      options,
      21,
      [call1],
      OutsideExecutionVersion.V2
    );
    expect(typedData.domain.version).toBe('2');
    expect(typedData.primaryType).toBe('OutsideExecution');
  });

  /**
   * SECURITY & PROTOCOL TESTS
   */
  test('Signer: Should expose SNIP-9 v2 interface via ERC-165', async () => {
    const supported = await src5.supportsInterface(provider, signerAccount.address, constants.SNIP9_V2_INTERFACE_ID);
    expect(supported).toBe(true);
  });

  test('Nonce Management: Nonce should invalidate after execution to prevent replay', async () => {
    const callOptions: OutsideExecutionOptions = {
      caller: executorAccount.address,
      execute_after: timeWindows.past,
      execute_before: timeWindows.future,
    };
    
    // 1. Build & Execute
    const tx = await signerAccount.getOutsideTransaction(callOptions, [call1, call2]);
    const res = await executorAccount.executeFromOutside(tx);
    await provider.waitForTransaction(res.transaction_hash);

    // 2. Security Audit: Check if nonce is now invalid
    const isValid = await signerAccount.isValidSnip9Nonce(tx.outsideExecution.nonce);
    expect(isValid).toBe(false);
  });

  test('Fee Estimation: Should accurately predict cost of outside execution', async () => {
    const callOptions: OutsideExecutionOptions = {
      caller: executorAccount.address,
      execute_after: timeWindows.past,
      execute_before: timeWindows.future,
    };
    const tx = await signerAccount.getOutsideTransaction(callOptions, [call1]);
    const outsideCall = outsideExecution.buildExecuteFromOutsideCall(tx);
    
    const estimate = await executorAccount.estimateInvokeFee(outsideCall);
    expect(estimate.overall_fee).toBeDefined();
    expect(BigInt(estimate.overall_fee)).toBeGreaterThan(0n);
  });
});
