import { constants, RPC09, RPC0104, RpcProvider } from '../../src';

describe('RpcProvider & RpcChannel nodeName / nodeUrl configuration', () => {
  test('resolves nodeUrl from nodeName using NetworkName', () => {
    const provider = new RpcProvider({ nodeName: constants.NetworkName.SN_MAIN });
    expect(provider.channel.nodeUrl).toContain('mainnet');

    const channel09 = new RPC09.RpcChannel({ nodeName: constants.NetworkName.SN_SEPOLIA });
    expect(channel09.nodeUrl).toContain('sepolia');

    const channel010 = new RPC0104.RpcChannel({ nodeName: constants.NetworkName.SN_MAIN });
    expect(channel010.nodeUrl).toContain('mainnet');
  });

  test('prioritizes explicit nodeName when both nodeName and nodeUrl are provided', () => {
    const channel = new RPC09.RpcChannel({
      nodeName: constants.NetworkName.SN_SEPOLIA,
      nodeUrl: 'https://custom.rpc.node',
    });
    expect(channel.nodeUrl).toContain('sepolia');
  });

  test('preserves backwards compatibility with NetworkName passed as nodeUrl', () => {
    const provider = new RpcProvider({ nodeUrl: constants.NetworkName.SN_MAIN });
    expect(provider.channel.nodeUrl).toContain('mainnet');
  });

  test('uses explicit URL string passed as nodeUrl', () => {
    const customUrl = 'https://my-custom-rpc-node.example.com/rpc/v0_9';
    const provider = new RpcProvider({ nodeUrl: customUrl });
    expect(provider.channel.nodeUrl).toBe(customUrl);
  });
});
