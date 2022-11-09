import { encodeShortString } from '../src/utils/shortString';
import { randomAddress } from '../src/utils/stark';
import { IS_DEVNET, compiledErc20, getTestAccount, getTestProvider } from './fixtures';

describe('Declare and UDC Deploy Flow', () => {
  const provider = getTestProvider();
  const account = getTestAccount(provider);
  const erc20ClassHash = '0x54328a1075b8820eb43caf0caa233923148c983742402dcfc38541dd843d01a';

  test('ERC20 Declare', async () => {
    const declareTx = await account.declare({
      classHash: erc20ClassHash,
      contract: compiledErc20,
    });

    await provider.waitForTransaction(declareTx.transaction_hash);

    expect(declareTx).toHaveProperty('class_hash');
    expect(declareTx.class_hash).toEqual(erc20ClassHash);
  });

  test('UDC Deploy', async () => {
    const salt = randomAddress(); // use random salt

    const deployment = await account.deploy({
      classHash: erc20ClassHash,
      constructorCalldata: [
        encodeShortString('Token'),
        encodeShortString('ERC20'),
        account.address,
      ],
      salt,
      unique: true, // Using true here so as not to clash with normal erc20 deploy in account and provider test
      isDevnet: IS_DEVNET,
    });

    await provider.waitForTransaction(deployment.transaction_hash);

    expect(deployment).toHaveProperty('transaction_hash');
  });
});
