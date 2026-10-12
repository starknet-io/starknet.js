import { Account, Contract, ProviderInterface, hash } from '../src';
import { CONTRACTS, createTestProvider, getTestAccount } from './config';

// The test contract stores 42 in its storage variable `value`. It takes a StorageAddress as an
// argument and returns one, so both directions go through a real node.
describe('StorageAddress Contract Integration Tests', () => {
  let provider: ProviderInterface;
  let account: Account;
  let storageAddressContract: Contract;

  beforeAll(async () => {
    provider = await createTestProvider();
    account = getTestAccount(provider);

    storageAddressContract = await Contract.factory({
      contract: CONTRACTS.StorageAddress.sierra,
      casm: CONTRACTS.StorageAddress.casm,
      account,
      constructorCalldata: [42],
    });
  }, 60000);

  test('should read a StorageAddress returned by the contract', async () => {
    // the address of a simple storage variable is the sn_keccak of its name
    const address = await storageAddressContract.value_address();
    expect(address).toBe(hash.starknetKeccak('value'));
  });

  test('should send a StorageAddress to the contract, which reads its storage there', async () => {
    const address = hash.starknetKeccak('value');
    const value = await storageAddressContract.read_at(address);
    expect(value).toBe(42n);

    // the node reads the same slot
    const stored = await provider.getStorageAt(storageAddressContract.address, address);
    expect(BigInt(stored.value)).toBe(42n);
  });

  test('should send and read back the largest StorageAddress', async () => {
    const result = await storageAddressContract.echo(2n ** 251n - 1n);
    expect(result).toBe(2n ** 251n - 1n);
  });

  test('should refuse an out-of-range StorageAddress before sending it', async () => {
    await expect(storageAddressContract.read_at(2n ** 251n)).rejects.toThrow(
      'Value is out of StorageAddress range [0, 3618502788666131106986593281521497120414687020801267626233049500247285301247]'
    );
  });
});
