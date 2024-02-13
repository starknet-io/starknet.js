import { Account, AccountInstance, BigNumberish, LibraryError, RpcProvider } from '../src';

describe('Account instantiated from provider instance', () => {
  const rpc = new RpcProvider();

  const customNonce = async function (contractAddress: BigNumberish) {
    return `my custom implementation of get nonce for address ${contractAddress}`;
  };
  rpc.getNonceForAddress = customNonce;

  test('Account to throw on extended custom methods for using re-instantiation on provider', () => {
    const acc = new Account(rpc, '0x0', '0x1');

    return expect(acc.getNonceForAddress('0x0')).rejects.toThrow(LibraryError);
  });

  test('AccountInstance to pass on extending', async () => {
    const acc = new AccountInstance(rpc, '0x0', '0x1');
    const result = await acc.getNonceForAddress('0x0');
    expect(result).toBe('my custom implementation of get nonce for address 0x0');
  });

  test('Account to pass on extended custom methods for using instance on provider', async () => {
    const acc = new Account(rpc, '0x0', '0x1', undefined, undefined, true);
    const result = await acc.getNonceForAddress('0x0');
    expect(result).toBe('my custom implementation of get nonce for address 0x0');
  });
});
