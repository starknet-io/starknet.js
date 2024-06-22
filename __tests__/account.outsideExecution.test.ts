// import { Provider, Account, Contract, num, typedData } from '../src';
import { getStarkKey, utils } from '@scure/starknet';
import { Provider, Account, cairo } from '../src';
import { SNIP9_V1_INTERFACE_ID } from '../src/types/outsideExecution';
import { OutsideExecution } from '../src/utils/outsideExecution';
import { randomAddress } from '../src/utils/stark';
import {
  compiledArgentAccount,
  compiledArgentAccountCasm,
  getTestAccount,
  getTestProvider,
} from './config/fixtures';

const { uint256 } = cairo;

describe('Account and OutsideExecution', () => {
  const devnetERC20Address = '0x49D36570D4E46F48E99674BD3FCC84644DDD6B96F7C741B1562B82F9E004DC7';
  const provider = new Provider(getTestProvider());
  const sender = getTestAccount(provider);
  let target: Account;
  const targetPK = utils.randomPrivateKey();
  const targetOwner = getStarkKey(targetPK);
  // For ERC20 transfer outside call
  const recipient = randomAddress();
  const transferAmount = 100;

  beforeAll(async () => {
    // Deploy the target account:
    const response = await sender.declareAndDeploy(
      {
        contract: compiledArgentAccount,
        casm: compiledArgentAccountCasm,
        constructorCalldata: [targetOwner, 0],
      },
      { maxFee: 1e18 }
    );
    const targetAddress = response.deploy.contract_address;
    target = new Account(provider, targetAddress, targetPK);

    // Transfer some tokens to the target account
    const transferCall = {
      contractAddress: devnetERC20Address,
      entrypoint: 'transfer',
      calldata: {
        recipient: targetAddress,
        amount: uint256(transferAmount),
      },
    };

    const { transaction_hash } = await sender.execute(transferCall, undefined, { maxFee: 1e18 });
    await provider.waitForTransaction(transaction_hash);
  });

  it('target account should support SNIP-9', async () => {
    const res = await sender.callContract({
      contractAddress: target.address,
      entrypoint: 'supports_interface',
      calldata: [SNIP9_V1_INTERFACE_ID],
    });

    expect(res[0]).toBe('0x1');
  });

  it('should execute OutsideExecution flow', async () => {
    // Create calls to ERC20 contract: transfer 100 tokens to random address
    const calls = [
      {
        contractAddress: devnetERC20Address,
        entrypoint: 'transfer',
        calldata: {
          recipient,
          amount: uint256(transferAmount),
        },
      },
    ];

    // Prepare time bounds
    const now_seconds = Math.floor(Date.now() / 1000);
    const hour_ago = (now_seconds - 3600).toString();
    const hour_later = (now_seconds + 3600).toString();

    // Create OutsideExecution object
    const options = {
      caller: sender.address,
      nonce: await sender.getNonce(),
      execute_after: hour_ago,
      execute_before: hour_later,
    };

    const outsideExecution = new OutsideExecution(calls, options);

    // Get supported SNIP-9 version of target account
    const snip9Version = await target.getSnip9Version();
    expect(snip9Version).toBeDefined();

    // Sign the outside execution
    const data = outsideExecution.getTypedData(await sender.getChainId(), snip9Version!);
    const signature = await target.signMessage(data);

    // Execute OutsideExecution from sender account
    const response = await sender.executeFromOutside(
      outsideExecution,
      signature,
      target.address,
      {},
      snip9Version
    );
    await provider.waitForTransaction(response.transaction_hash);

    // Check recipient's balance
    const balanceRes = await provider.callContract({
      contractAddress: devnetERC20Address,
      entrypoint: 'balanceOf',
      calldata: {
        user: recipient,
      },
    });
    // TODO Check balance correctly
    expect(balanceRes[0]).toBe('0x64'); // 100 tokens
  });
});
