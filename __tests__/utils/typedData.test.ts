import { getMessageHash, getStructHash } from '../../src/utils/typedData';

const typedDataExample = {
  types: {
    StarkNetDomain: [
      { name: 'name', type: 'felt' },
      { name: 'version', type: 'felt' },
      { name: 'chainId', type: 'felt' },
    ],
    Person: [
      { name: 'name', type: 'felt' },
      { name: 'wallet', type: 'felt' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'felt' },
    ],
  },
  primaryType: 'Mail',
  domain: {
    name: 'Ether Mail',
    version: '1',
    chainId: 1,
  },
  message: {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
};

describe('typedData', () => {
  test('should get right hash for StarkNetDomain', () => {
    const hash = getStructHash(typedDataExample, 'StarkNetDomain', typedDataExample.domain as any);
    expect(hash).toMatchInlineSnapshot(
      `"0x3a53775bb506be3f4f84619cd2d063a9408ba2b2e7fe134b82b04a62783eef9"`
    );
  });
  test('should get right hash for entire message', () => {
    const hash = getMessageHash(typedDataExample, '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826');
    expect(hash).toMatchInlineSnapshot(
      `"0x214aad847084997443f3bace488411e46dfff96dce13f0356107d0fc12b1219"`
    );
  });
});
