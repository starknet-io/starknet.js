import { encodeShortString } from '../src/utils/shortString';
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

    expect(declareTx).toHaveProperty('class_hash');
    expect(declareTx.class_hash).toEqual(erc20ClassHash);
  });

  test('UDC Deploy', async () => {
    const deployment = await account.deploy({
      classHash: erc20ClassHash,
      constructorCalldata: [
        encodeShortString('Token'),
        encodeShortString('ERC20'),
        account.address,
      ],
      salt: '123',
      unique: true, // Using true here so as not to clash with normal erc20 deploy in account and provider test
      isDevnet: IS_DEVNET,
    });
    expect(deployment).toHaveProperty('transaction_hash');
  });
});
