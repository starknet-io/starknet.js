import { Provider } from '../src';
import { SupportedRpcVersion } from '../src/global/constants';
import { getDefaultNodes } from '../src/utils/provider';
import { describeIfTestnet } from './config/fixtures';

describeIfTestnet('Default RPC Nodes', () => {
  test('All Default RPC Nodes support Spec Versions', async () => {
    const finalResult = await Promise.all(
      Object.keys(SupportedRpcVersion).map(async (rpcv) => {
        const rpcNodes = getDefaultNodes(rpcv as SupportedRpcVersion);

        const result = await Promise.all(
          Object.keys(rpcNodes).map(async (network: any) => {
            return Promise.all(
              rpcNodes[network as keyof typeof rpcNodes].map(async (it: any) => {
                const provider = new Provider({ nodeUrl: it });
                let version;
                try {
                  version = await provider.getSpecVersion();
                } catch (error) {
                  version = undefined;
                }

                return {
                  network,
                  nodeUrl: provider.channel.nodeUrl,
                  version,
                };
              })
            );
          })
        );

        console.table(result.flat());
        return result
          .flat()
          .map((it) => it.version)
          .includes(undefined);
      })
    );

    expect(finalResult.includes(true)).toBeFalsy();
  });
});
